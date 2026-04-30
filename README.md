# scratch-lego-bluetooth-extensions

Xcratch-style `.mjs` extensions for LEGO Bluetooth devices, plus a few
non-LEGO utility extensions. Builds on
[bricklife/scratch-lego-bluetooth-extensions](https://github.com/bricklife/scratch-lego-bluetooth-extensions)
and adds Spike Prime / Mindstorms Robot Inventor / Boost / Gamepad / Maths.

> **Note:** This is the older Xcratch `.mjs` distribution. The newer,
> actively-maintained TurboWarp `.js` versions (with transpilation, on-device
> bridges, and per-language i18n) live in
> [`CrispStrobe/extensions`](https://github.com/CrispStrobe/extensions/tree/main/extensions/CrispStrobe)
> and [`CrispStrobe/turbowarp-lego`](https://github.com/CrispStrobe/turbowarp-lego).

## Related repos

| Repo | Role |
|------|------|
| **`scratch-lego-bluetooth-extensions` (this)** | Xcratch `.mjs` LEGO BLE/BTC extensions. |
| [`CrispStrobe/extensions`](https://github.com/CrispStrobe/extensions) | Newer TurboWarp gallery (`.js` files). The maintained EV3/NXT/Spike work lives here. |
| [`CrispStrobe/turbowarp-lego`](https://github.com/CrispStrobe/turbowarp-lego) | Working sandbox + Python bridges for the TurboWarp extensions. |
| [`CrispStrobe/scratch-gui`](https://github.com/CrispStrobe/scratch-gui) | TurboWarp editor fork that loads the gallery above. |

## Quick start (use it)

Load any `.mjs` file via the **Extension Loader** in an Xcratch-compatible
editor (<https://xcratch.github.io/> or <https://crispstrobe.github.io/scratch-gui/>).
Click the bottom-left "Add Extension" icon → **Extension Loader** → paste a
URL like:

```
https://crispstrobe.github.io/scratch-lego-bluetooth-extensions/dist/spikeprimebtc.mjs
```

Or via jsDelivr:

```
https://cdn.jsdelivr.net/gh/CrispStrobe/scratch-lego-bluetooth-extensions@master/dist/spikeprimebtc.mjs
```

## Extension list

### BLE (Bluetooth Low Energy)

| Device | File | Status |
|--------|------|--------|
| LEGO Powered UP Hub | [`poweredup.mjs`](./dist/poweredup.mjs) | works |
| LEGO Powered UP Remote Control | [`legoremote.mjs`](./dist/legoremote.mjs) | works |
| LEGO Technic CONTROL+ Hub | [`controlplus.mjs`](./dist/controlplus.mjs) | works |
| LEGO DUPLO Train | [`duplotrain.mjs`](./dist/duplotrain.mjs) | works |
| LEGO Mario / Luigi / Peach | [`legomario.mjs`](./dist/legomario.mjs), [`legoluigi.mjs`](./dist/legoluigi.mjs), [`legopeach.mjs`](./dist/legopeach.mjs) | works |
| LEGO Education SPIKE Essential Hub | [`spikeessential.mjs`](./dist/spikeessential.mjs) | works |
| LEGO Education SPIKE Prime Hub (FW 3.x BLE) | [`spikeprimeble.mjs`](./dist/spikeprimeble.mjs) | work in progress |
| LEGO Boost (enhanced) | [`legoboost.mjs`](./dist/legoboost.mjs) | work in progress |
| Generic LEGO BLE | [`legoble.mjs`](./dist/legoble.mjs) | works |

### Bluetooth Classic (SPP)

| Device | File | Status |
|--------|------|--------|
| Spike Prime / Robot Inventor Hub (FW 2.x BTC) | [`spikeprime_legacy.mjs`](./dist/spikeprime_legacy.mjs) (bricklife's), [`spikeprime_btc32.mjs`](./dist/spikeprime_btc32.mjs) (extended) | tested on Windows 10 + Chrome + Scratch Link 1.4.3.0 |

### Non-LEGO utilities

| File | What it does |
|------|------|
| [`dualshock4.mjs`](./dist/dualshock4.mjs) / [`gamepad10.mjs`](./dist/gamepad10.mjs) | Universal gamepad / DualShock4 input |
| [`planetemaths.mjs`](./dist/planetemaths.mjs) | Math operations (rewritten from CodePM by ac-grenoble) |

## Compatibility notes

- **Most extensions need [Scratch Link](https://scratch.mit.edu/scratchlink/)**
  running on the host (macOS / Windows). Without it, the BLE / BTC sessions
  can't open.
- **iOS:** Web BT and Web Serial don't exist in Mobile Safari. The
  Scratch-Link-emulating shells [Scrub](https://github.com/bricklife/Scrub)
  or [`turbowarp-ios`](https://github.com/CrispStrobe/turbowarp-ios) are
  required. Connecting to "non-Apple-approved" hardware (e.g. EV3 BTC, FW 2.x
  Spike Prime via BTC) generally requires an Xcode debug build of one of
  those shells.
- **Switching Spike Prime firmware:** upgrade via the LEGO Spike Prime app,
  or [downgrade here](https://spikelegacy.legoeducation.com/hubdowngrade/#step-1),
  or use `dfu-util` / `pybricksdev` (backup/restore). FW 2.x is BTC; FW 3.x
  is BLE — choose the matching extension.

## Multilingual extensions

Some extensions support multiple UI languages via a `translations.json` file
applied to both the GUI strings and the VM blocks. Building those requires
the slightly-modified `scripts/build.js` in this repo (not the upstream
`xcratch-build`).

**TODOs:**
- Migrate to the newer Babel/Rollup pipeline.
- Adapt to the newer Scratch/Xcratch framework (`scratch-editor`, `xcratch-create`).

## Upstream / credits

Built on [bricklife/scratch-lego-bluetooth-extensions](https://github.com/bricklife/scratch-lego-bluetooth-extensions),
which itself extends Scratch 3.0. The original distribution lives at:

- <https://bricklife.com/scratch-gui/> — stable
- <https://bricklife.com/scratch-lego-bluetooth-extensions/> — development

## Older TurboWarp Spike Prime experiments

Two older, mostly-untested TurboWarp extensions for Spike Prime live as
gists — superseded by [`CrispStrobe/extensions`](https://github.com/CrispStrobe/extensions)
but kept here for archival reference:

- [Newer BLE firmware](https://gist.github.com/CrispStrobe/eb7a2a3a1337e016a31afb2e8852c8ea)
- [Older BTC firmware](https://gist.github.com/CrispStrobe/a0664af6bc533228b8e048115955f0fb)
