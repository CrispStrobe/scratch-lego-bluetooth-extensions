# scratch-lego-bluetooth-extensions
Scratch 3.0 extensions, mostly for LEGO Bluetooth devices.
This builds on bricklife's excellent work. It adds a few more Xcratch extensions which support LEGO Devices, both for Legacy Bluetooth Classic (as for EV3 or Spike Prime Hub / Mindstorms Robot Inventor Hub with 2.x firmware), as for (newer) BLE bluetooth (as for Spike Prime Hub with new firmware, as it comes with LEGO Spike Prime App).
Also there are non-LEGO-related Scratch extensions, which might came in handy, like for Gamepad Controllers, or for Maths operations.

Intended usage is to load these extensions (their .mjs files, which reside in the dist/ folder, which can be loaded per prefixing https://cdn.jsdelivr.net/gh/CrispStrobe/scratch-lego-bluetooth-extensions@master/dist/ e.g.) from the "Extension Loader" that the xcratch environment (https://xcratch.github.io/ or (https://crispstrobe.github.io/scratch-gui/ e.g.) provides (click on the bottom left corner icon there, click on Extension Loader, enter the url, like https://cdn.jsdelivr.net/gh/CrispStrobe/scratch-lego-bluetooth-extensions@master/dist/gamepad9.mjs e.g.).

Note that for most of these to work, you need the Scratch Link app running, or a wrapping Apps, like Scrub on iOS devices. But these will not work in all web browsers, and especially not with non-Apple-approved devices, like EV3 over Bluetooth Classic, or Spime Prime Hub with legacy firmware. (You could only make these work per your own Xcode debug builds of Scrub, or other variants.)

(Technical note: Some of these extensions are multilingual, by leveraging a translations.json file, both for the gui as for the vm part of the extension. For these to work, the package.json was changed to leverage not the official xcratch-build but a slightly modified scripts/build.js. TODO: Adapt to the newer Scratch/Xcratch framework, like scratch-editor and xcratch-create.)

## Extension List
Bluetooth LE (BLE)
- [x] LEGO Powered UP Hub
- [x] LEGO Powered UP Remote Control
- [x] LEGO Technic CONTROL+ Hub
- [x] LEGO DUPLO Train
- [x] LEGO Mario
- [x] LEGO Luigi
- [x] LEGO Peach
- [x] LEGO Education SPIKE Essential Hub
- [x] General LEGO BLE Device

Bluetooth Classic (SPP)
- [x] LEGO Education SPIKE Prime Hub (Legacy) (old firmware)
- [x] LEGO MINDSTORMS Robot Inventor Hub

## (Original) Scratch 3.0 installed LEGO Bluetooth extensions
- https://bricklife.com/scratch-gui/ (Stable version)
- https://bricklife.com/scratch-lego-bluetooth-extensions/ (Development version)

## Xcratch
[Xcratch](https://xcratch.github.io) is an extendable Scratch programming environment. You can load LEGO Bluetooth extensions into Xcratch from the following URLs:
- LEGO Powered UP Hub https://bricklife.com/scratch-gui/xcratch/poweredup.mjs
- LEGO Powered UP Remote Control https://bricklife.com/scratch-gui/xcratch/legoremote.mjs
- LEGO Technic CONTROL+ Hub https://bricklife.com/scratch-gui/xcratch/controlplus.mjs
- LEGO DUPLO Train https://bricklife.com/scratch-gui/xcratch/duplotrain.mjs
- LEGO Mario https://bricklife.com/scratch-gui/xcratch/legomario.mjs
- LEGO Luigi https://bricklife.com/scratch-gui/xcratch/legoluigi.mjs
- LEGO Peach https://bricklife.com/scratch-gui/xcratch/legopeach.mjs
- LEGO Education SPIKE Essential Hub https://bricklife.com/scratch-gui/xcratch/spikeessential.mjs
- General LEGO BLE Device https://bricklife.com/scratch-gui/xcratch/legoble.mjs
- LEGO Education SPIKE Prime Hub (work in progress...)
  - (v. 2 - legacy, bluetooth classic!) / Robot Inventor Hub https://cdn.jsdelivr.net/gh/CrispStrobe/scratch-lego-bluetooth-extensions@master/dist/spikeprime_legacy.mjs (original bricklife's version) or (work in progress) my extended version: https://cdn.jsdelivr.net/gh/CrispStrobe/scratch-lego-bluetooth-extensions@master/dist/spikeprime_btc7.mjs (tested and working on Windows 10 in Chrome Browser with Scratch Link 1.4.3.0 App installed) or
  - (v. 3 - not bluetooth classic but bluetooth low energy (ble), even more work in progress) several (in different states of broken/untested/promising...) in dist directory (note that you can switch firmwares by running *upgrade* from spike prime app, or *downgrade* from mindstorms app or https://spikelegacy.legoeducation.com/hubdowngrade/#step-1)

also (not LEGO but useful):
- Gamepad (universal controller support): https://cdn.jsdelivr.net/gh/CrispStrobe/scratch-lego-bluetooth-extensions@master/dist/gamepad9.mjs
- Planet Maths (from CodePM by https://www.ac-grenoble.fr/maths): https://cdn.jsdelivr.net/gh/CrispStrobe/scratch-lego-bluetooth-extensions@master/dist/planetemaths26.mjs
