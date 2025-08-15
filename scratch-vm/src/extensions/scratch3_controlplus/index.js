const BleBaseBlocks = require('./lib/ble-base-blocks');
const Hub = require('./lib/hub');

// 1. All translations are defined here in a single object.
// The keys (e.g., "controlplus.turnMotor") are unique IDs.
const translations = {
    // English
    en: {
        'controlplus.name': 'CONTROL+',
        'controlplus.turnMotor': 'turn motor [PORT] for [TIME] seconds',
        'controlplus.isReady': 'hub is ready?',
        'controlplus.port.A': 'A',
        'controlplus.port.B': 'B'
    },
    // German
    de: {
        'controlplus.name': 'CONTROL+',
        'controlplus.turnMotor': 'drehe Motor [PORT] für [TIME] Sekunden',
        'controlplus.isReady': 'Hub ist bereit?',
        'controlplus.port.A': 'A',
        'controlplus.port.B': 'B'
    }
    // Add other languages here...
};

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAAx4ExPAAAD6UlEQVR4Ae2aPWgUURDHZy93XhIjSTaFBILaWFhFK9FCghZaCnbaWFlYWEYEixSCaGlhLYIEEcEyIEIUPxpFIqKghRASosjlEvN5l7tdd3bzlr3lZvdld72Lyf8V997Omzcz77eze8PdI0IDARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAgZ1PwIja4tidp0M1q3KXyB5x9AajdHfB3ByRMZnPFUfHrl+YUfsVATK8ul2Zsm3bVMroHYSGMd9hFIcVxLwEZTPzzANDAzRy4gj17C02Vb03UaI339Yo39VLXeZBWi/P0MbqPB091ElXTvfTQE9H03XPX36m7z9+UZz9pos1hJJ9SR5ncnmlQpPvvtL0TMms2fxU0kVek5MXuo9tJDxe+2W24ppgeLmOAtUrS+51FDxWmP1ZdvWibo6rkPBDsi/J49xwAnGsXvPY8FjMQGfOfedJmecZIiqvWO6Q4XGz6htuL2WeO+l8rK5V3aGyf//BCzXVtL96+Ywr19UL21dGJbmaj+pVrI6O/30QkYFRpjCnCERloNJpaX9yuL/B39sp71FvEDoXunrhdVlfIwNTEm3IwFDdtyXTi9MftqSvlPlbUb3YWSZlXPjdp6sXXqf8ZtX7AFXd5xTNLa37uJT5n5sPMFz3PXzyWmtfj68NaelJSuE6MGmdJtn/1/LAO1Cv7ss6oHAdqB7nsDxrv1nZ8zPQMdhQ96m6KytHYTuS/TR1WthHK64DGdgKdzvPBwCmvKcAmBKgcfP2IzvOhtnXQ+fPHaPOzj1xqpHz6+tVejbxkeYXliP1kkxK71TJVlaxaGUgb5g3zk6TtqwCTuo/uC7LWPwMLM+9Cvrwx7lcgfYNDFMu3+3L0gys2iotlabIsrxfbdLY4rX9g6cSm+BY1L6k/UvGld/YDOSN/il9InaWtmUNL008KpY0NnhtsA4UbdlWlRZ/vxfnt8PEVjMoq5hjMzArRzvVjp+B6plu151UgFUc6rpVfVK/yMCUd8j/W1PVg9slA9sdh8RVZeqtG5dcdshAiZSmHAA1QUlqACiR0ZQDoCYoSQ0AJTKacgDUBCWpAaBERlMOgJqgJDUAlMhoygFQE5SkBoASGU15EKBzBtg5cZlrfhJV015qNavu/W3Q7jiabSQQk8uKdQIAjUkWdPcdbivEWnWBw2h7HG4QgQ+Gx2y85rHisf97IJ8+dw6Vny0UTbN3//FNxfZ1Thy0HeIIE9g8ZD6q5H4G8qlzPn3unEMfdyb9FFWK6JmJMR48oQ8mIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACILBbCPwFpqc7sJw6T5QAAAAASUVORK5CYII=';
const extensionURL = 'https://bricklife.com/scratch-gui/xcratch/controlplus.mjs';

// 2. We no longer need the 'format-message' library here.
// The GUI will provide a working function.

class Scratch3ControlPlusBlocks extends BleBaseBlocks {

    static get EXTENSION_ID() {
        return 'controlplus';
    }

    constructor(runtime) {
        // 3. The constructor is now much simpler.
        // We don't need to manage `formatMessage` ourselves.
        super(new Hub(runtime, Scratch3ControlPlusBlocks.EXTENSION_ID, 0x80));
    }

    getInfo() {
        // We no longer call `this.setupTranslations()` here.
        return {
            id: Scratch3ControlPlusBlocks.EXTENSION_ID,
            // The `name` property should use the translation ID from our object above.
            name: translations.en['controlplus.name'],
            extensionURL: extensionURL,
            blockIconURI: blockIconURI,
            showStatusButton: true,

            // Define blocks and menus directly.
            // This is cleaner and easier to read.
            blocks: [
                {
                    opcode: 'turnMotor',
                    blockType: 'command',
                    // 4. The 'text' property uses the default English message directly.
                    // The Scratch GUI uses this exact string to look up the translation.
                    text: 'turn motor [PORT] for [TIME] seconds',
                    arguments: {
                        PORT: {
                            type: 'string',
                            menu: 'PORT', // We define this menu below
                            defaultValue: 'A'
                        },
                        TIME: {
                            type: 'number',
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'isReady',
                    blockType: 'Boolean',
                    text: 'hub is ready?'
                }
            ],
            menus: {
                PORT: {
                    acceptReporters: true,
                    items: [
                        {
                           text: translations.en['controlplus.port.A'], // Use translation ID
                           value: 'A'
                        },
                        {
                           text: translations.en['controlplus.port.B'], // Use translation ID
                           value: 'B'
                        }
                    ]
                }
            },

            // 5. The magic happens here. We provide the entire translation object to the GUI.
            // The GUI will automatically handle switching languages.
            translationMap: translations
        };
    }

    // Dummy functions for the example to work
    turnMotor(args) {
        console.log(`Turning motor ${args.PORT} for ${args.TIME} seconds.`);
    }

    isReady() {
        // In a real extension, this would return the hub's connection state.
        return true;
    }
}

exports.blockClass = Scratch3ControlPlusBlocks;
module.exports = Scratch3ControlPlusBlocks;