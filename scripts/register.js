/**
 * Register an extension in the local Scratch environment.
 * This script is designed to be robust, cross-platform, and idempotent.
 * It handles existing files/symlinks by overwriting them and will fall back
 * to copying if creating a symbolic link fails.
 */

const path = require('path');
const fs = require('fs-extra');
const { execSync } = require('child_process');

/**
 * A robust, cross-platform function to recursively copy a directory.
 * It ensures the destination is clean before copying.
 * @param {string} source - The source directory path.
 * @param {string} destination - The destination directory path.
 */
function copyDirRobust(source, destination) {
    try {
        // Ensure the source directory exists before attempting to copy.
        if (!fs.existsSync(source)) {
            console.error(`Source directory does not exist: ${source}`);
            return;
        }

        // Clean the destination path completely before copying.
        // This handles both existing directories and symbolic links.
        fs.rmSync(destination, { recursive: true, force: true });

        // Use Node's modern, built-in recursive copy function.
        fs.cpSync(source, destination, { recursive: true });
        console.log(`Copied directory: ${source} -> ${destination}`);
    } catch (error) {
        console.error(`Failed to copy directory from ${source} to ${destination}.`);
        console.error(error);
        // In a build script, it's often best to exit on failure.
        process.exit(1);
    }
}

/**
 * Attempts to create a symbolic link, but gracefully falls back to copying if it fails.
 * This is crucial for environments like Windows where creating symlinks can require special permissions.
 * @param {string} target - The original directory to link to.
 * @param {string} linkPath - The path where the symbolic link should be created.
 */
function makeSymbolicLinkOrCopy(target, linkPath) {
    try {
        // First, ensure the target for the link actually exists.
        if (!fs.existsSync(target)) {
            console.error(`Target for symlink does not exist: ${target}`);
            return;
        }
        // Clean the destination path to prevent errors.
        fs.rmSync(linkPath, { recursive: true, force: true });

        // Attempt to create the symbolic link.
        fs.symlinkSync(target, linkPath, 'dir');
        console.log(`Created link: ${linkPath} -> ${target}`);
    } catch (error) {
        console.warn(`WARN: Failed to create symbolic link from ${linkPath} to ${target}.`);
        console.warn(`WARN: Error was: ${error.message}`);
        console.warn('WARN: Falling back to copying the directory instead.');
        
        // If symlinking fails, fall back to a robust copy.
        copyDirRobust(target, linkPath);
    }
}

/**
 * Parses command-line arguments into a key-value object.
 * Supports flags (-f), long args (--foo=bar), and long flags (--foo).
 */
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

// --- Main Script Execution ---

const args = getArgs();

if (!args['id']) {
    console.error('Error: "--id <extensionID>" is a required argument.');
    process.exit(1);
}

const ExtId = args['id'];
const ExtDirName = args['dir'] || ExtId;

// Resolve all necessary paths
const Cwd = process.cwd();
const GuiRoot = args['gui'] ? path.resolve(Cwd, args['gui']) : path.resolve(Cwd, '../scratch-gui');

// --- THIS IS THE FIX ---
// Dynamically resolve the path to the installed 'scratch-vm' package.
// This is robust and not dependent on a fixed node_modules structure.
const vmPackagePath = require.resolve('scratch-vm/package.json', { paths: [GuiRoot] });
const VmRoot = path.dirname(vmPackagePath);
// --- END OF FIX ---

const ExtBlockPath = args['block'] ? path.resolve(Cwd, args['block']) : path.resolve(Cwd, './src/block');
const ExtEntryPath = args['entry'] ? path.resolve(Cwd, args['entry']) : path.resolve(Cwd, './src/entry');

const VmExtDirPath = path.resolve(VmRoot, `src/extensions/scratch3_${ExtDirName}`);
const GuiExtDirPath = path.resolve(GuiRoot, `src/lib/libraries/extensions/${ExtDirName}`);

// Decide whether to link or copy based on the --link flag
if (args['link']) {
    console.log('Attempting to create symbolic links...');
    makeSymbolicLinkOrCopy(ExtBlockPath, VmExtDirPath);
    makeSymbolicLinkOrCopy(ExtEntryPath, GuiExtDirPath);
} else {
    console.log('Copying extension files...');
    copyDirRobust(ExtBlockPath, VmExtDirPath);
    copyDirRobust(ExtEntryPath, GuiExtDirPath);
}

// --- The rest of the script remains largely the same, modifying config files ---

const EntryFile = path.resolve(GuiExtDirPath, './index.jsx');
const BlockFile = path.resolve(VmExtDirPath, './index.js');
const VmExtManagerFile = path.resolve(VmRoot, './src/extension-support/extension-manager.js');
const VmVirtualMachineFile = path.resolve(VmRoot, './src/virtual-machine.js');
const GuiExtIndexFile = path.resolve(GuiRoot, './src/lib/libraries/extensions/index.jsx');

// (The following sections for patching and modifying configs are unchanged)

// Applay patch if it was not Xcratch
if (args['base'] === 'LLK') {
    try {
        execSync(`cd ${VmRoot} && patch -p1 -N -s < ${path.resolve(__dirname, 'register/LLK/scratch-vm.patch')}`);
        console.log(`Apply patch: scratch-vm.patch`);
        execSync(`cd ${GuiRoot} && patch -p1 -N -s < ${path.resolve(__dirname, 'register/LLK/scratch-gui.patch')}`);
        console.log(`Apply patch: scratch-gui.patch`);
    } catch (err) {
        console.error(err);
    }
}

// Replace URL in entry and block code.
if (args['url']) {
    const url = args['url'];
    // Replace URL in entry
    let entryCode = fs.readFileSync(EntryFile, 'utf-8');
    entryCode = entryCode.replace(/extensionURL:\s*[^,]+,/m, `extensionURL: '${url}',`);
    fs.writeFileSync(EntryFile, entryCode);
    console.log(`Entry: extensionURL = ${url}`);

    // Replace URL in entry
    let blockCode = fs.readFileSync(BlockFile, 'utf-8');
    blockCode = blockCode.replace(/let\s+extensionURL\s+=\s+[^;]+;/m, `let extensionURL = '${url}';`);
    fs.writeFileSync(BlockFile, blockCode);
    console.log(`Block: extensionURL = ${url}`);
}

// Add the extension to extension manager of scratch-vm. 
let managerCode = fs.readFileSync(VmExtManagerFile, 'utf-8');
if (managerCode.includes(ExtId)) {
    console.log(`Already registered in manager: ${ExtId}`);
} else {
    fs.copyFileSync(VmExtManagerFile, `${VmExtManagerFile}.orig`);
    managerCode = managerCode.replace(/builtinExtensions = {[\s\S]*?};/, `$&\n\nbuiltinExtensions.${ExtId} = () => require('../extensions/scratch3_${ExtDirName}');`);
    fs.writeFileSync(VmExtManagerFile, managerCode);
    console.log(`Registered in manager: ${ExtId}`);
}

if (args['C']) {
    // Add the extension as a core extension. 
    let vmCode = fs.readFileSync(VmVirtualMachineFile, 'utf-8');
    if (vmCode.includes(ExtId)) {
        console.log(`Already added as a core extension: ${ExtId}`);
    } else {
        fs.copyFileSync(VmVirtualMachineFile, `${VmVirtualMachineFile}.orig`);
        vmCode = vmCode.replace(/CORE_EXTENSIONS = \[[\s\S]*?\];/, `$&\n\nCORE_EXTENSIONS.push('${ExtId}');`);
        fs.writeFileSync(VmVirtualMachineFile, vmCode);
        console.log(`Add as a core extension: ${ExtId}`);
    }
}

// Add the extension to list of scratch-gui. 
let indexCode = fs.readFileSync(GuiExtIndexFile, 'utf-8');
if (indexCode.includes(ExtId)) {
    console.log(`Already added to extrnsion list: ${ExtId}`);
} else {
    fs.copyFileSync(GuiExtIndexFile, `${GuiExtIndexFile}.orig`);
    const immutableDefault = /^\s*export\s+default\s+\[/m
    if (immutableDefault.test(indexCode)) {
        // Make the list of extensions mutable.
        indexCode = indexCode.replace(immutableDefault, 'const extensions = [');
        indexCode += '\nexport default extensions;';
    }
    indexCode += `\n// Injected for extra extension ${ExtId}`;
    indexCode += `\nimport ${ExtId} from './${ExtDirName}/index.jsx';`;
    indexCode += `\nextensions.unshift(${ExtId});`;
    indexCode += '\n';
    fs.writeFileSync(GuiExtIndexFile, indexCode);
    console.log(`Added to extrnsion list: ${ExtId}`);
}