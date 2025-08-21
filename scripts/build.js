#!/usr/bin/env node
'use strict';

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
    { name: 'module', type: String },
    { name: 'url', type: String },
    { name: 'block', type: String },
    { name: 'entry', type: String },
    { name: 'vm', type: String },
    { name: 'gui', type: String, defaultValue: path.resolve(process.cwd(), '../scratch-gui') },
    { name: 'output', type: String, defaultValue: path.resolve(process.cwd(), './dist') },
    { name: 'moduleDirectories', type: String, multiple: true, defaultValue: [] }
];

const options = commandLineArgs(optionDefinitions);

if (!options['module']) {
    console.error('ERROR: --module is required');
    process.exit(1);
}

async function build() {
    const moduleName = options['module'];
    const GuiRoot = path.resolve(process.cwd(), options['gui']);
    const VmRoot = options['vm'] ? path.resolve(process.cwd(), options['vm']) : path.resolve(GuiRoot, './node_modules/scratch-vm');
    const outputDir = path.resolve(process.cwd(), options['output']);
    const extSrcDir = path.resolve(process.cwd(), options['block']);
    const entrySrcDir = path.resolve(process.cwd(), options['entry']);

    fs.ensureDirSync(outputDir);

    const blockWorkingDir = path.resolve(VmRoot, `src/extensions/_${moduleName}`);
    const entryWorkingDir = path.resolve(GuiRoot, `src/lib/libraries/extensions/_${moduleName}`);
    const blockFile = path.resolve(blockWorkingDir, 'index.js');
    const entryFile = path.resolve(entryWorkingDir, 'index.jsx');
    const blockFileESM = path.resolve(blockWorkingDir, 'index.mjs'); // Use .mjs extension
    const moduleFile = path.resolve(outputDir, `${moduleName}.mjs`);

    console.log('Copying files...');
    fs.copySync(extSrcDir, blockWorkingDir, { dereference: true });
    fs.copySync(entrySrcDir, entryWorkingDir);

    console.log('Converting to pure ES modules...');
    let blockCode = fs.readFileSync(blockFile, 'utf-8');
    let entryCode = fs.readFileSync(entryFile, 'utf-8');

    // Handle translations
    const translationsFile = path.resolve(blockWorkingDir, './translations.json');
    if (fs.existsSync(translationsFile)) {
        const translationsContent = fs.readFileSync(translationsFile, 'utf-8');
        const translationsCode = `const translations = ${translationsContent};`;
        blockCode = blockCode.replace(/const\s+translations\s*=\s*require\(['"]\.\/translations\.json['"]\);?/, translationsCode);
    }

    // Replace URL if provided
    if (options['url']) {
        const url = options['url'];
        entryCode = entryCode.replace(/extensionURL:\s*[^,]+,/gm, `extensionURL: '${url}',`);
        blockCode = blockCode.replace(/let\s+extensionURL\s+=\s+[^;]+;/gm, `let extensionURL = '${url}';`);
    }

    // Find the exported class
    const exportMatch = blockCode.match(/^\s*module\.exports\s*=\s*([^;]+);?\s*$/m);
    if (!exportMatch) {
        throw new Error('Could not find module.exports in block file');
    }
    const exportedClass = exportMatch[1];

    // COMPLETELY rewrite the block file as pure ES module
    // Remove all CommonJS patterns and create clean ES module
    blockCode = blockCode.replace(/^\s*module\.exports\s*=\s*[^;]+;?\s*$/gm, '');
    blockCode = blockCode.replace(/^\s*exports\.[^=]+=\s*[^;]+;?\s*$/gm, '');
    
    // Add the exact export pattern you want
    blockCode += `\n// Generated ES Module export\nvar blockClass = ${exportedClass};\nblockClass = ${exportedClass};\nexport { blockClass };\n`;

    // Write as .mjs file to force ES module treatment
    fs.writeFileSync(blockFileESM, blockCode);
    fs.writeFileSync(entryFile, entryCode);

    console.log('Building with rollup...');
    const rollupOptions = {
        inputOptions: {
            input: [entryFile, blockFileESM], // Use the .mjs file
            plugins: [
                multi(),
                json(),
                importImage(),
                // Add CommonJS plugin back but exclude our .mjs block file
                commonjs({
                    transformMixedEsModules: true,
                    exclude: [blockFileESM] // Exclude our converted .mjs file
                }),
                nodeGlobals(),
                nodePolifills(),
                nodeResolve({
                    browser: true,
                    preferBuiltins: false,
                    modulePaths: [
                        path.resolve(process.cwd(), './node_modules'),
                        path.resolve(__dirname, '../node_modules')
                    ]
                }),
                babel({
                    babelrc: false,
                    presets: [
                        ['@babel/preset-env', {
                            "modules": false,
                            targets: { browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8'] }
                        }],
                        '@babel/preset-react'
                    ],
                    babelHelpers: 'runtime',
                    plugins: [
                        '@babel/plugin-transform-react-jsx',
                        ["@babel/plugin-transform-runtime", { "regenerator": true }]
                    ]
                })
            ]
        },
        outputOptions: {
            file: moduleFile,
            format: 'es'
        }
    };

    try {
        process.chdir(path.resolve(__dirname, '../'));
        const bundle = await rollup.rollup(rollupOptions.inputOptions);
        await bundle.write(rollupOptions.outputOptions);
        console.log(`Built: ${moduleFile}`);
    } catch (error) {
        console.error('Build failed:', error);
        throw error;
    }

    console.log('Cleaning up...');
    fs.removeSync(blockWorkingDir);
    fs.removeSync(entryWorkingDir);
}

build().catch(err => {
    console.error('BUILD FAILED:', err);
    process.exit(1);
});