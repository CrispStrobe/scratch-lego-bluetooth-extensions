#!/usr/bin/env node
'use strict'

/**
 * Build a module from the code using a local Scratch
 */
const projectJson = require('../package.json');
const path = require('path');
const fs = require('fs-extra');
const commandLineArgs = require('command-line-args');
const rollup = require('rollup');
const babel = require('@rollup/plugin-babel').default;
const commonjs = require('@rollup/plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve').default;
const nodeGlobals = require('rollup-plugin-node-globals');
const nodePolifills = require('rollup-plugin-polyfill-node');
const importImage = require('@rollup/plugin-image');
const multi = require('@rollup/plugin-multi-entry');
const json = require('@rollup/plugin-json');

const optionDefinitions = [
    {
        name: 'version',
        alias: 'V',
        type: Boolean
    },
    {
        name: 'module',
        type: String
    },
    {
        name: 'url',
        type: String
    },
    {
        name: 'block',
        type: String,
        defaultValue: path.resolve(process.cwd(), './src/vm/extensions/block')
    },
    {
        name: 'entry',
        type: String,
        defaultValue: path.resolve(process.cwd(), './src/gui/lib/libraries/extensions/entry')
    },
    {
        name: 'vm',
        type:String
    },
    {
        name: 'gui',
        type:String,
        defaultValue: path.resolve(process.cwd(), '../scratch-gui')
    },
    {
        name: 'output',
        type:String,
        defaultValue: path.resolve(process.cwd(), './dist')
    },
    {
        name: 'moduleDirectories',
        type:String,
        multiple: true,
        defaultValue: []
    },
    {
        name: 'debug',
        type:Boolean
    }
];

// Read options
const options = commandLineArgs(optionDefinitions);
if (options['version']) {
    process.stdout.write(`v${projectJson.version}\n`);
    process.exit(0);
}
if (!options['module']) {
    throw('set --module <module name>');
}
const moduleName = options['module'];
const extSrcDir = path.resolve(process.cwd(), options['block']);
const entrySrcDir = path.resolve(process.cwd(), options['entry']);
const GuiRoot = path.resolve(process.cwd(), options['gui']);
console.log(`gui = ${GuiRoot}`);
const VmRoot = options['vm'] ?
    path.resolve(process.cwd(), options['vm']):
    path.resolve(GuiRoot, './node_modules/scratch-vm');
console.log(`vm = ${VmRoot}`);
const outputDir = path.resolve(process.cwd(), options['output']);
console.log(`output = ${outputDir}`);
fs.ensureDirSync(outputDir);

const blockWorkingDir = path.resolve(VmRoot, `src/extensions/_${moduleName}`);
const blockFile = path.resolve(blockWorkingDir, 'index.js');

const entryWorkingDir = path.resolve(GuiRoot, `src/lib/libraries/extensions/_${moduleName}`);
const entryFile = path.resolve(entryWorkingDir, 'index.jsx');

const moduleFile = path.resolve(outputDir, `${moduleName}.mjs`);

const rollupOptions = {
    inputOptions: {
        input: [entryFile, blockFile],
        plugins: [
            multi(),
            json(),
            importImage(),
            commonjs(),
            nodeGlobals(),
            nodePolifills(),
            nodeResolve({
                browser: true,
                preferBuiltins: true,
                moduleDirectories: [
                    'node_modules'  // Only directory names here
                ],
                modulePaths: [     // Absolute paths go here
                    path.resolve(process.cwd(), './node_modules'),
                    path.resolve(__dirname, '../node_modules'),
                    ...options['moduleDirectories']  // These might be absolute paths from CLI
                ]
            }),
            babel({
                babelrc: false,
                presets: [
                    ['@babel/preset-env',
                        {
                            "modules": false,
                            targets: {
                                browsers: [
                                    'last 3 versions',
                                    'Safari >= 8',
                                    'iOS >= 8']
                            }
                        }
                    ],
                    '@babel/preset-react'
                ],
                babelHelpers: 'runtime',
                plugins: [
                    '@babel/plugin-transform-react-jsx',
                    ["@babel/plugin-transform-runtime",
                        { "regenerator": true }]
                ]
            }),
        ]
    },
    outputOptions: {
        file: moduleFile,
        format: 'es',
    }
}

async function build() {
    // Copy module sources
    fs.copySync(extSrcDir, blockWorkingDir, { dereference: true });
    fs.copySync(entrySrcDir, entryWorkingDir);
    console.log('\ncopy source to working dir');
    console.log(blockWorkingDir);
    console.log(entryWorkingDir);

    const blockFile = path.resolve(blockWorkingDir, './index.js');
    console.log(`Block: file = ${blockFile}`);
    let blockCode = fs.readFileSync(blockFile, 'utf-8');
    
    // --- Step 1: Handle translations.json BEFORE other transformations ---
    const translationsFile = path.resolve(blockWorkingDir, './translations.json');
    if (fs.existsSync(translationsFile)) {
        const translationsContent = fs.readFileSync(translationsFile, 'utf-8');
        const translationsCode = `const translations = ${translationsContent};`;
        // Find and replace the specific require statement for translations.json
        blockCode = blockCode.replace(
            /const\s+translations\s*=\s*require\(['"]\.\/translations\.json['"]\);?/,
            translationsCode
        );
    }

    // --- Step 2: Use the ORIGINAL script's logic for exports ---
    // This is the key line from the original script. It prepares the file for the commonjs plugin.
    blockCode = blockCode.replace(/^\s*module\.exports\s*=\s*([^;]+);/gm, 'exports.blockClass = $1;');
    
    fs.writeFileSync(blockFile, blockCode);

    // --- The rest of the script remains the same ---

    // Replace URL in entry and block code.
    if (options['url']) {
        const url = options['url'];
        // Replace URL in entry
        const entryFile = path.resolve(entryWorkingDir, './index.jsx');
        console.log(`Entry: file = ${entryFile}`);
        let entryCode = fs.readFileSync(entryFile, 'utf-8');
        entryCode = entryCode.replace(/extensionURL:\s*[^,]+,/gm, `extensionURL: '${url}',`);
        fs.writeFileSync(entryFile, entryCode);
        console.log(`Entry: extensionURL = ${url}`);

        // Replace URL in block
        blockCode = fs.readFileSync(blockFile, 'utf-8'); // Re-read the file after previous changes
        blockCode = blockCode.replace(/let\s+extensionURL\s+=\s+[^;]+;/gm, `let extensionURL = '${url}';`);
        fs.writeFileSync(blockFile, blockCode);
        console.log(`Block: extensionURL = ${url}`);
    }

    // Build module.
    console.log('\nstart to build module ...');
    process.chdir(path.resolve(__dirname, '../'));
    const bundle = await rollup.rollup(rollupOptions.inputOptions);
    
    // write the bundle to disk
    await bundle.write(rollupOptions.outputOptions);
    console.log(`\n✅ Success to build module: ${moduleFile}`);

    // Clean up
    fs.removeSync(blockWorkingDir);
    fs.removeSync(entryWorkingDir);
    console.log('\nworking dir removed');
}

try {
    build();
} catch (err) {
    console.error(err)
}