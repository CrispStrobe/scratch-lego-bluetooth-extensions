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

// Browser-compatible utility definitions
const browserUtilities = `
// Browser-compatible Scratch VM utilities
const ArgumentType = {
    ANGLE: 'angle',
    BOOLEAN: 'Boolean',
    COLOR: 'color',
    NUMBER: 'number',
    STRING: 'string',
    MATRIX: 'matrix',
    NOTE: 'note',
    IMAGE: 'image'
};

const BlockType = {
    BOOLEAN: 'Boolean',
    BUTTON: 'button',
    COMMAND: 'command',
    CONDITIONAL: 'conditional',
    EVENT: 'event',
    HAT: 'hat',
    LOOP: 'loop',
    REPORTER: 'reporter'
};

const Cast = {
    toNumber: function(value) {
        if (typeof value === 'number') {
            if (Number.isNaN(value)) return 0;
            return value;
        }
        const n = Number(value);
        return Number.isNaN(n) ? 0 : n;
    },
    toBoolean: function(value) {
        if (typeof value === 'boolean') return value;
        if (typeof value === 'string') {
            if (value === '' || value === '0' || value.toLowerCase() === 'false') return false;
            return true;
        }
        return Boolean(value);
    },
    toString: function(value) { return String(value); }
};

const MathUtil = {
    clamp: function(n, min, max) { return Math.min(Math.max(n, min), max); }
};

const Base64Util = {
    base64ToUint8Array: function(base64) {
        const binaryString = atob(base64);
        const len = binaryString.length;
        const array = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            array[i] = binaryString.charCodeAt(i);
        }
        return array;
    }
};

class RateLimiter {
    constructor(maxRate) {
        this._maxTokens = maxRate;
        this._refillInterval = 1000 / maxRate;
        this._count = this._maxTokens;
        this._lastUpdateTime = Date.now();
    }
    okayToSend() {
        const now = Date.now();
        const timeSinceRefill = now - this._lastUpdateTime;
        const refillCount = Math.floor(timeSinceRefill / this._refillInterval);
        if (refillCount > 0) this._lastUpdateTime = now;
        this._count = Math.min(this._maxTokens, this._count + refillCount);
        if (this._count > 0) {
            this._count--;
            return true;
        }
        return false;
    }
}

class JSONRPC {
    constructor() {
        this._requestID = 0;
        this._openRequests = {};
    }
    sendRemoteRequest(method, params) {
        const requestID = this._requestID++;
        const promise = new Promise((resolve, reject) => {
            this._openRequests[requestID] = { resolve, reject };
        });
        this._sendRequest(method, params, requestID);
        return promise;
    }
    sendRemoteNotification(method, params) {
        this._sendRequest(method, params);
    }
    didReceiveCall() { throw new Error('Must override didReceiveCall'); }
    _sendMessage() { throw new Error('Must override _sendMessage'); }
    _sendRequest(method, params, id) {
        const request = { jsonrpc: '2.0', method: method, params: params };
        if (id !== null) request.id = id;
        this._sendMessage(request);
    }
    _handleMessage(json) {
        if (json.jsonrpc !== '2.0') throw new Error(\`Bad JSON-RPC version: \${json}\`);
        if (Object.prototype.hasOwnProperty.call(json, 'method')) {
            this._handleRequest(json);
        } else {
            this._handleResponse(json);
        }
    }
    _handleRequest(json) {
        const { method, params, id } = json;
        const rawResult = this.didReceiveCall(method, params);
        if (id !== null && typeof id !== 'undefined') {
            Promise.resolve(rawResult).then(
                result => this._sendResponse(id, result),
                error => this._sendResponse(id, null, error)
            );
        }
    }
    _handleResponse(json) {
        const { result, error, id } = json;
        const openRequest = this._openRequests[id];
        delete this._openRequests[id];
        if (openRequest) {
            if (error) openRequest.reject(error);
            else openRequest.resolve(result);
        }
    }
    _sendResponse(id, result, error) {
        const response = { jsonrpc: '2.0', id: id };
        if (error) response.error = error;
        else response.result = result || null;
        this._sendMessage(response);
    }
}

class BT extends JSONRPC {
    constructor(runtime, extensionId, peripheralOptions, connectCallback, resetCallback = null, messageCallback) {
        super();
        this._socket = runtime.getScratchLinkSocket('BT');
        this._socket.setOnOpen(this.requestPeripheral.bind(this));
        this._socket.setOnError(this._handleRequestError.bind(this));
        this._socket.setOnClose(this.handleDisconnectError.bind(this));
        this._socket.setHandleMessage(this._handleMessage.bind(this));
        this._sendMessage = this._socket.sendMessage.bind(this._socket);
        
        this._availablePeripherals = {};
        this._connectCallback = connectCallback;
        this._connected = false;
        this._resetCallback = resetCallback;
        this._discoverTimeoutID = null;
        this._extensionId = extensionId;
        this._peripheralOptions = peripheralOptions;
        this._messageCallback = messageCallback;
        this._runtime = runtime;
        
        this._socket.open();
    }
    
    requestPeripheral() {
        this._availablePeripherals = {};
        if (this._discoverTimeoutID) window.clearTimeout(this._discoverTimeoutID);
        this._discoverTimeoutID = window.setTimeout(this._handleDiscoverTimeout.bind(this), 15000);
        this.sendRemoteRequest('discover', this._peripheralOptions).catch(e => this._handleRequestError(e));
    }
    
    connectPeripheral(id, pin = null) {
        const params = { peripheralId: id };
        if (pin) params.pin = pin;
        this.sendRemoteRequest('connect', params).then(() => {
            this._connected = true;
            this._runtime.emit(this._runtime.constructor.PERIPHERAL_CONNECTED);
            this._connectCallback();
        }).catch(e => this._handleRequestError(e));
    }
    
    disconnect() {
        if (this._connected) this._connected = false;
        if (this._socket.isOpen()) this._socket.close();
        if (this._discoverTimeoutID) window.clearTimeout(this._discoverTimeoutID);
        this._runtime.emit(this._runtime.constructor.PERIPHERAL_DISCONNECTED);
    }
    
    isConnected() { return this._connected; }
    
    sendMessage(options) {
        return this.sendRemoteRequest('send', options).catch(e => this.handleDisconnectError(e));
    }
    
    didReceiveCall(method, params) {
        switch (method) {
            case 'didDiscoverPeripheral':
                this._availablePeripherals[params.peripheralId] = params;
                this._runtime.emit(this._runtime.constructor.PERIPHERAL_LIST_UPDATE, this._availablePeripherals);
                if (this._discoverTimeoutID) window.clearTimeout(this._discoverTimeoutID);
                break;
            case 'userDidPickPeripheral':
                this._availablePeripherals[params.peripheralId] = params;
                this._runtime.emit(this._runtime.constructor.USER_PICKED_PERIPHERAL, this._availablePeripherals);
                if (this._discoverTimeoutID) window.clearTimeout(this._discoverTimeoutID);
                break;
            case 'userDidNotPickPeripheral':
                this._runtime.emit(this._runtime.constructor.PERIPHERAL_SCAN_TIMEOUT);
                if (this._discoverTimeoutID) window.clearTimeout(this._discoverTimeoutID);
                break;
            case 'didReceiveMessage':
                this._messageCallback(params);
                break;
            default:
                return 'nah';
        }
    }
    
    handleDisconnectError() {
        if (!this._connected) return;
        this.disconnect();
        if (this._resetCallback) this._resetCallback();
        this._runtime.emit(this._runtime.constructor.PERIPHERAL_CONNECTION_LOST_ERROR, {
            message: "Scratch lost connection to",
            extensionId: this._extensionId
        });
    }
    
    _handleRequestError() {
        this._runtime.emit(this._runtime.constructor.PERIPHERAL_REQUEST_ERROR, {
            message: "Scratch lost connection to",
            extensionId: this._extensionId
        });
    }
    
    _handleDiscoverTimeout() {
        if (this._discoverTimeoutID) window.clearTimeout(this._discoverTimeoutID);
        this._runtime.emit(this._runtime.constructor.PERIPHERAL_SCAN_TIMEOUT);
    }
}

`;

const rollupOptions = {
    inputOptions: {
        input: [entryFile, blockFile],
        plugins: [
            multi(),
            json(),
            importImage(),
            commonjs({
                transformMixedEsModules: true,
                dynamicRequireTargets: []
            }),
            nodeGlobals(),
            nodePolifills(),
            nodeResolve({
                browser: true,
                preferBuiltins: false,
                moduleDirectories: ['node_modules'],
                modulePaths: [
                    path.resolve(process.cwd(), './node_modules'),
                    path.resolve(__dirname, '../node_modules'),
                    ...options['moduleDirectories']
                ]
            }),
            babel({
                babelrc: false,
                presets: [
                    ['@babel/preset-env', {
                        "modules": false,
                        targets: {
                            browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8']
                        }
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
        blockCode = blockCode.replace(
            /const\s+translations\s*=\s*require\(['"]\.\/translations\.json['"]\);?/,
            translationsCode
        );
    }

    // --- Step 2: Replace Scratch VM require statements with browser utilities ---
    const requireReplacements = [
        [/const\s+ArgumentType\s*=\s*require\([^)]+argument-type[^)]*\);?/g, ''],
        [/const\s+BlockType\s*=\s*require\([^)]+block-type[^)]*\);?/g, ''],
        [/const\s+Cast\s*=\s*require\([^)]+cast[^)]*\);?/g, ''],
        [/const\s+BT\s*=\s*require\([^)]+\/bt[^)]*\);?/g, ''],
        [/const\s+Base64Util\s*=\s*require\([^)]+base64-util[^)]*\);?/g, ''],
        [/const\s+MathUtil\s*=\s*require\([^)]+math-util[^)]*\);?/g, ''],
        [/const\s+RateLimiter\s*=\s*require\([^)]+rateLimiter[^)]*\);?/g, ''],
        [/const\s+Color\s*=\s*require\([^)]+color[^)]*\);?/g, '']
    ];

    requireReplacements.forEach(([pattern, replacement]) => {
        blockCode = blockCode.replace(pattern, replacement);
    });

    // --- Step 3: Prepend browser utilities ---
    blockCode = browserUtilities + '\n' + blockCode;

    // --- Step 4: Fix module exports for proper ES module conversion (FIXED) ---
    // Track if we've already declared ExtensionClass to avoid redeclaration
    let extensionClassDeclared = false;
    let mainExportClass = null;

    // First, find all export patterns and collect the main export class
    const moduleExportMatches = blockCode.match(/^\s*module\.exports\s*=\s*([^;]+);?\s*$/gm);
    const exportsBlockClassMatches = blockCode.match(/^\s*exports\.blockClass\s*=\s*([^;]+);?\s*$/gm);

    if (moduleExportMatches) {
        mainExportClass = moduleExportMatches[0].match(/^\s*module\.exports\s*=\s*([^;]+);?\s*$/)[1];
    } else if (exportsBlockClassMatches) {
        mainExportClass = exportsBlockClassMatches[0].match(/^\s*exports\.blockClass\s*=\s*([^;]+);?\s*$/)[1];
    }

    if (mainExportClass) {
        // Remove all existing export statements first
        blockCode = blockCode.replace(/^\s*module\.exports\s*=\s*[^;]+;?\s*$/gm, '');
        blockCode = blockCode.replace(/^\s*exports\.blockClass\s*=\s*[^;]+;?\s*$/gm, '');

        // Add a single, clean export at the end
        blockCode += `\n// Extension export for bundling\nconst ExtensionClass = ${mainExportClass};\nmodule.exports = ExtensionClass;\nexports.blockClass = ExtensionClass;\n`;
    }

    fs.writeFileSync(blockFile, blockCode);

    // Replace URL in entry and block code if specified
    if (options['url']) {
        const url = options['url'];
        
        // Replace URL in entry
        const entryFile = path.resolve(entryWorkingDir, './index.jsx');
        console.log(`Entry: file = ${entryFile}`);
        let entryCode = fs.readFileSync(entryFile, 'utf-8');
        entryCode = entryCode.replace(/extensionURL:\s*[^,]+,/gm, `extensionURL: '${url}',`);
        fs.writeFileSync(entryFile, entryCode);
        console.log(`Entry: extensionURL = ${url}`);

        // Replace URL in block (re-read after modifications)
        blockCode = fs.readFileSync(blockFile, 'utf-8');
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