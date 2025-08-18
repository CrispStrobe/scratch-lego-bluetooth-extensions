/**
 * Register an extension in the local Scratch environment.
 */
const path = require('path');
const fs = require('fs-extra');
const { execSync } = require('child_process');

function copyDirRobust(source, destination) {
    try {
        if (!fs.existsSync(source)) {
            console.error(`Source directory does not exist: ${source}`);
            return;
        }
        fs.rmSync(destination, { recursive: true, force: true });
        fs.cpSync(source, destination, { recursive: true });
        console.log(`Copied directory: ${source} -> ${destination}`);
    } catch (error) {
        console.error(`Failed to copy directory from ${source} to ${destination}.`);
        console.error(error);
        process.exit(1);
    }
}

function makeSymbolicLinkOrCopy(target, linkPath) {
    try {
        if (!fs.existsSync(target)) {
            console.error(`Target for symlink does not exist: ${target}`);
            return;
        }
        fs.rmSync(linkPath, { recursive: true, force: true });
        fs.symlinkSync(target, linkPath, 'dir');
        console.log(`Created link: ${linkPath} -> ${target}`);
    } catch (error) {
        console.warn(`WARN: Failed to create symbolic link. Falling back to a copy.`);
        copyDirRobust(target, linkPath);
    }
}

function getArgs() {
    const args = {};
    process.argv.slice(2).forEach(arg => {
        if (arg.slice(0, 2) === '--') {
            const [key, value] = arg.slice(2).split('=');
            args[key] = value === undefined ? true : value;
        } else if (arg[0] === '-') {
            arg.slice(1).split('').forEach(flag => {
                args[flag] = true;
            });
        }
    });
    return args;
}

const args = getArgs();
if (!args['id']) {
    console.error('Error: "--id <extensionID>" is a required argument.');
    process.exit(1);
}

const ExtId = args['id'];
const ExtDirName = args['dir'] || ExtId;

const Cwd = process.cwd();
const GuiRoot = args['gui'] ? path.resolve(Cwd, args['gui']) : path.resolve(Cwd, '../scratch-gui');

// Dynamically resolve the path to the installed 'scratch-vm' package.
let VmRoot;
try {
    // Force the search to start from the scratch-gui directory
    const vmPackagePath = require.resolve('scratch-vm/package.json', { paths: [GuiRoot] });
    VmRoot = path.dirname(vmPackagePath);
    console.log(`Found scratch-vm at: ${VmRoot}`);
} catch (e) {
    console.error("Fatal: Could not find the 'scratch-vm' package inside 'scratch-gui/node_modules'.");
    console.error(e);
    process.exit(1);
}

const ExtBlockPath = args['block'] ? path.resolve(Cwd, args['block']) : path.resolve(Cwd, './src/block');
const ExtEntryPath = args['entry'] ? path.resolve(Cwd, args['entry']) : path.resolve(Cwd, './src/entry');

const VmExtDirPath = path.resolve(VmRoot, `src/extensions/scratch3_${ExtDirName}`);
const GuiExtDirPath = path.resolve(GuiRoot, `src/lib/libraries/extensions/${ExtDirName}`);

if (args['link']) {
    makeSymbolicLinkOrCopy(ExtBlockPath, VmExtDirPath);
    makeSymbolicLinkOrCopy(ExtEntryPath, GuiExtDirPath);
} else {
    copyDirRobust(ExtBlockPath, VmExtDirPath);
    copyDirRobust(ExtEntryPath, GuiExtDirPath);
}

const EntryFile = path.resolve(GuiExtDirPath, './index.jsx');
const BlockFile = path.resolve(VmExtDirPath, './index.js');
const VmExtManagerFile = path.resolve(VmRoot, './src/extension-support/extension-manager.js');
const VmVirtualMachineFile = path.resolve(VmRoot, './src/virtual-machine.js');
const GuiExtIndexFile = path.resolve(GuiRoot, './src/lib/libraries/extensions/index.jsx');

if (args['url']) {
    const url = args['url'];
    let entryCode = fs.readFileSync(EntryFile, 'utf-8');
    entryCode = entryCode.replace(/extensionURL:\s*[^,]+,/m, `extensionURL: '${url}',`);
    fs.writeFileSync(EntryFile, entryCode);

    let blockCode = fs.readFileSync(BlockFile, 'utf-8');
    blockCode = blockCode.replace(/let\s+extensionURL\s+=\s+[^;]+;/m, `let extensionURL = '${url}';`);
    fs.writeFileSync(BlockFile, blockCode);
}

let managerCode = fs.readFileSync(VmExtManagerFile, 'utf-8');
if (!managerCode.includes(ExtId)) {
    fs.copyFileSync(VmExtManagerFile, `${VmExtManagerFile}.orig`);
    managerCode = managerCode.replace(/builtinExtensions = {[\s\S]*?};/, `$&\n\nbuiltinExtensions.${ExtId} = () => require('../extensions/scratch3_${ExtDirName}');`);
    fs.writeFileSync(VmExtManagerFile, managerCode);
    console.log(`Registered in manager: ${ExtId}`);
} else {
    console.log(`Already registered in manager: ${ExtId}`);
}

if (args['C']) {
    let vmCode = fs.readFileSync(VmVirtualMachineFile, 'utf-8');
    if (!vmCode.includes(ExtId)) {
        fs.copyFileSync(VmVirtualMachineFile, `${VmVirtualMachineFile}.orig`);
        vmCode = vmCode.replace(/CORE_EXTENSIONS = \[[\s\S]*?\];/, `$&\n\nCORE_EXTENSIONS.push('${ExtId}');`);
        fs.writeFileSync(VmVirtualMachineFile, vmCode);
        console.log(`Add as a core extension: ${ExtId}`);
    } else {
        console.log(`Already added as a core extension: ${ExtId}`);
    }
}

let indexCode = fs.readFileSync(GuiExtIndexFile, 'utf-8');
if (!indexCode.includes(ExtId)) {
    fs.copyFileSync(GuiExtIndexFile, `${GuiExtIndexFile}.orig`);
    const immutableDefault = /^\s*export\s+default\s+\[/m
    if (immutableDefault.test(indexCode)) {
        indexCode = indexCode.replace(immutableDefault, 'const extensions = [');
        indexCode += '\nexport default extensions;';
    }
    indexCode += `\n// Injected for extra extension ${ExtId}`;
    indexCode += `\nimport ${ExtId} from './${ExtDirName}/index.jsx';`;
    indexCode += `\nextensions.unshift(${ExtId});`;
    indexCode += '\n';
    fs.writeFileSync(GuiExtIndexFile, indexCode);
    console.log(`Added to extrnsion list: ${ExtId}`);
} else {
    console.log(`Already added to extrnsion list: ${ExtId}`);
}