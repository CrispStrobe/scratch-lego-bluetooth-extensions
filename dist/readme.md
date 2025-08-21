# Building the LEGO Bluetooth Extensions

This guide provides the steps to build the `.mjs` module files for the extensions in this project on Windows, macOS, and Linux. The process requires a specific environment setup and administrator privileges for one of the steps on Windows.

## Prerequisites

* [Git](https://git-scm.com/downloads)
* [Node.js](https://nodejs.org/) (v14 was used in the original project workflow)

## Build Instructions

### 1. Setup Project Directory

The build scripts require `scratch-gui` and `scratch-lego-bluetooth-extensions` to be in the same parent folder.

```bash
# Create a parent directory for the projects
mkdir code
cd code

# 1. Clone this repository
git clone https://github.com/CrispStrobe/scratch-lego-bluetooth-extensions.git

# 2. Clone the specific branch of the scratch-gui fork
git clone --branch lego-bluetooth-extensions https://github.com/CrispStrobe/scratch-gui.git
```

### 2. Install Dependencies

Both repositories have their own dependencies that need to be installed using `npm`.

```bash
# 1. Install dependencies for scratch-gui
cd scratch-gui
npm install

# 2. Install dependencies for this project
cd ..
cd scratch-lego-bluetooth-extensions
npm install
```

Note that some libraries imported in the project sources, especially Babel and Rollup related, are outdated. You might have to use `npm ci` instead and/or tweak around the specific versions and configs for the build script (originally from xcratch-build, we modified a few things only).

### 3. Fix Shared Libraries

Several extensions in this project reuse code from the `legoble` extension by using what might result, on Windows, as merely a text-based reference file named `lib`. In this case, this file must be replaced with an actual copy of the library directory for the build to succeed.

**Windows (PowerShell):**
```powershell
# Define which extensions need their 'lib' directory fixed
$extensions = "controlplus", "duplotrain", "legoluigi", "legomario", "legopeach", "legoremote", "poweredup", "spikeessential", "spikeprime"

# Loop through each one and replace the placeholder file with the actual directory
foreach ($ext in $extensions) {
    $extPath = ".\scratch-vm\src\extensions\scratch3_$ext"
    if (Test-Path "$extPath\lib") {
        Write-Host "Fixing library for $ext..."
        Remove-Item "$extPath\lib"
        Copy-Item -Path ".\scratch-vm\src\extensions\scratch3_legoble\lib" -Destination $extPath -Recurse
    }
}
```

**macOS/Linux (Bash):**

This should *not* be necessary on other platforms, but if so, you might try something like

```bash
# Define which extensions need their 'lib' directory fixed
extensions=("controlplus" "duplotrain" "legoluigi" "legomario" "legopeach" "legoremote" "poweredup" "spikeessential" "spikeprime")

# Loop through each one and replace the placeholder file with the actual directory
for ext in "${extensions[@]}"; do
    extPath="./scratch-vm/src/extensions/scratch3_$ext"
    if [ -e "$extPath/lib" ]; then
        echo "Fixing library for $ext..."
        rm -rf "$extPath/lib"
        cp -r "./scratch-vm/src/extensions/scratch3_legoble/lib" "$extPath/"
    fi
done
```

### 4. Register Extensions

This step modifies the local `scratch-gui` and `scratch-vm` to recognize the new extensions.

**Windows (Admin Privileges Required):**

On Windows, this step **must** be run from a terminal with **Administrator Privileges** to prevent `EPERM: operation not permitted` errors when creating symbolic links.

```powershell
# 1. Open a new terminal as Administrator
# 2. Navigate to the project root:
#    cd C:\path\to\your\code\scratch-lego-bluetooth-extensions
# 3. Run the register script
npm run register
```

**macOS/Linux:**

On macOS and Linux, you can run this from a regular terminal:

```bash
npm run register
```

> **Note for macOS:** If you encounter permission errors, you might need to run the command with `sudo`:
> ```bash
> sudo npm run register
> ```

### 5. Build the Extension Modules

After the registration is complete, you can build the `.mjs` files. You can run this from a regular (non-admin) terminal.

```bash
# To build all extensions at once
npm run build

# To build only the SPIKE Prime extension
npm run build:spikeprime
```

The compiled module files will be located in the `dist/` directory. For example, the SPIKE Prime file will be at `dist/spikeprime.mjs`.

## Platform-Specific Notes

### Windows
- PowerShell is recommended for running the scripts
- Administrator privileges are required for the registration step due to symbolic link creation
- Use backslashes (`\`) or forward slashes (`/`) for paths

### macOS
- The default Terminal app works fine
- You might need to use `sudo` for the registration step if you encounter permission errors
- Ensure you have Xcode Command Line Tools installed (`xcode-select --install`)

### Linux
- Any standard terminal emulator will work
- Usually no special privileges are needed, but use `sudo` if you encounter permission errors
- Make sure you have build-essential packages installed for native module compilation