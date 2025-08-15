#!/usr/bin/env node
'use strict';

/**
 * Build a module from the code using a local Scratch environment.
 * This script is designed to be robust, with clear logging, path validation,
 * and proper CommonJS to ES Module conversion.
 */
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

// --- Helper for structured logging ---
const logStep = (message) => {
    console.log(`\n🔵 --- ${message} ---`);
};

// --- Command-line option definitions ---
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
    console.error('🔴 ERROR: The --module <module_name> argument is required.');
    process.exit(1);
}

// --- Main build function ---
async function build() {
    logStep(`1/5: RESOLVING PATHS for module: "${options.module}"`);

    const moduleName = options['module'];
    const GuiRoot = path.resolve(process.cwd(), options['gui']);
    const VmRoot = options['vm'] ? path.resolve(process.cwd(), options['vm']) : path.resolve(GuiRoot, './node_modules/scratch-vm');
    const outputDir = path.resolve(process.cwd(), options['output']);
    const extSrcDir = path.resolve(process.cwd(), options['block']);
    const entrySrcDir = path.resolve(process.cwd(), options['entry']);

    // --- Path Validation ---
    const pathsToValidate = {
        'GUI Root (--gui)': GuiRoot,
        'VM Root (--vm)': VmRoot,
        'Extension Block Source (--block)': extSrcDir,
        'Extension Entry Source (--entry)': entrySrcDir,
    };

    for (const [name, dirPath] of Object.entries(pathsToValidate)) {
        console.log(`Checking for ${name} at: ${dirPath}`);
        if (!fs.existsSync(dirPath)) {
            console.error(`🔴 ERROR: Required directory not found! ${name} is missing.`);
            console.error(`🔴 Path does not exist: ${dirPath}`);
            process.exit(1);
        }
    }
    console.log('✅ All required paths found.');

    fs.ensureDirSync(outputDir);

    const blockWorkingDir = path.resolve(VmRoot, `src/extensions/_${moduleName}`);
    const entryWorkingDir = path.resolve(GuiRoot, `src/lib/libraries/extensions/_${moduleName}`);
    const blockFile = path.resolve(blockWorkingDir, 'index.js');
    const entryFile = path.resolve(entryWorkingDir, 'index.jsx');
    const moduleFile = path.resolve(outputDir, `${moduleName}.mjs`);

    logStep('2/5: PREPARING SOURCE FILES FOR BUILD');
    try {
        fs.copySync(extSrcDir, blockWorkingDir, { dereference: true });
        fs.copySync(entrySrcDir, entryWorkingDir);
        console.log('Copied source files to temporary working directories.');
    } catch (error) {
        console.error('🔴 ERROR: Failed to copy source files.');
        throw error;
    }
    
    logStep('3/5: TRANSFORMING SOURCE CODE');
    try {
        let blockCode = fs.readFileSync(blockFile, 'utf-8');
        let entryCode = fs.readFileSync(entryFile, 'utf-8');

        // Replace URL placeholders if provided
        if (options['url']) {
            const url = options['url'];
            console.log(`Replacing extensionURL with: ${url}`);
            entryCode = entryCode.replace(/extensionURL:\s*[^,]+,/gm, `extensionURL: '${url}',`);
            blockCode = blockCode.replace(/let\s+extensionURL\s+=\s+[^;]+;/gm, `let extensionURL = '${url}';`);
        }

        // ** THIS IS THE CRITICAL FIX **
        // Manually transform `module.exports` before Rollup runs.
        // This handles cases where the main input file is a CommonJS module.
        blockCode = blockCode.replace(/^\s*module\.exports\s*=\s*([^;]+);/gm, 'export default $1;');
        console.log('Transformed module.exports to export default.');

        fs.writeFileSync(blockFile, blockCode);
        fs.writeFileSync(entryFile, entryCode);
        console.log('✅ Source code transformations complete.');
    } catch (error) {
        console.error('🔴 ERROR: Failed during source code transformation.');
        throw error;
    }

    logStep('4/5: BUILDING MODULE WITH ROLLUP');
    const rollupOptions = {
        inputOptions: {
            input: [entryFile, blockFile],
            plugins: [
                multi(),
                json(),
                importImage(),
                commonjs({
                    transformMixedEsModules: true,
                }),
                nodeGlobals(),
                nodePolifills(),
                nodeResolve({
                    browser: true,
                    preferBuiltins: true,
                    moduleDirectories: [
                        ...options['moduleDirectories'],
                        path.resolve(process.cwd(), './node_modules'),
                        path.resolve(__dirname, '../node_modules'),
                        'node_modules'
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
                }),
            ]
        },
        outputOptions: {
            file: moduleFile,
            format: 'es',
        }
    };

    try {
        process.chdir(path.resolve(__dirname, '../'));
        const bundle = await rollup.rollup(rollupOptions.inputOptions);
        await bundle.write(rollupOptions.outputOptions);
        console.log(`✅ Successfully built module: ${moduleFile}`);
    } catch (error) {
        console.error('🔴 ERROR: Rollup build failed.');
        throw error;
    }

    logStep('5/5: CLEANING UP');
    try {
        fs.removeSync(blockWorkingDir);
        fs.removeSync(entryWorkingDir);
        console.log('✅ Removed temporary working directories.');
    } catch (error) {
        console.warn('⚠️  Warning: Failed to clean up temporary directories.');
        console.warn(error.message);
    }
}

// --- Run the build ---
build().catch(err => {
    console.error('\n🔴 BUILD FAILED WITH AN UNHANDLED ERROR:');
    console.error(err);
    process.exit(1);
});
