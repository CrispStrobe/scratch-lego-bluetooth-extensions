
# Building the LEGO Bluetooth Extensions

This guide provides the steps to build the `.mjs` module files for the extensions in this project, especially if you want to do this on Windows. For the process requires a specific environment setup and administrator privileges for one of the steps on Windows.

## Prerequisites

  * [Git](https://git-scm.com/downloads)
  * [cite\_start][Node.js](https://nodejs.org/) (v14 was used in the original project workflow)

-----

## Build Instructions

### 1\. Setup Project Directory

The build scripts require `scratch-gui` and `scratch-lego-bluetooth-extensions` to be in the same parent folder.

```bash
# Create a parent directory for the projects
mkdir code
cd code

# 1. Clone this repository
git clone https://github.com/bricklife/scratch-lego-bluetooth-extensions.git

# 2. Clone the specific branch of the scratch-gui fork
git clone --branch lego-bluetooth-extensions https://github.com/bricklife/scratch-gui.git
```

### 2\. Install Dependencies

Both repositories have their own dependencies that need to be installed using `npm`.

```bash
# 1. Install dependencies for scratch-gui
cd scratch-gui
npm install

# 2. Install dependencies for this project
cd ..\scratch-lego-bluetooth-extensions
npm install
```

### 3\. Fix Shared Libraries

Several extensions in this project reuse code from the `legoble` extension by using a text-based reference file named `lib`. This must be replaced with an actual copy of the library directory for the build to succeed.

Run the following commands in a **PowerShell** terminal from the `scratch-lego-bluetooth-extensions` root directory:

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

### 4\. Register Extensions (Admin Privileges Required)

This step modifies the local `scratch-gui` and `scratch-vm` to recognize the new extensions.

**On Windows**, this step **must** be run from a terminal with **Administrator Privileges** to prevent `EPERM: operation not permitted` errors when creating symbolic links.

```powershell
# 1. Open a new terminal as Administrator
# 2. Navigate to the project root:
#    cd C:\path\to\your\code\scratch-lego-bluetooth-extensions
# 3. Run the register script
npm run register
```

### 5\. Build the Extension Modules

After the registration is complete, you can build the `.mjs` files. You can run this from a regular (non-admin) terminal.

```bash
# To build all extensions at once
npm run build

# To build only the SPIKE Prime extension
npm run build:spikeprime
```

The compiled module files will be located in the `dist/` directory. For example, the SPIKE Prime file will be at `dist/spikeprime.mjs`.
