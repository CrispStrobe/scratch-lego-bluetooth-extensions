const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const MathUtil = require('../../util/math-util');

// Use the common BLE/LPF2 library components
const BleBaseBlocks = require('./lib/ble-base-blocks');
const Hub = require('./lib/hub');
const Color = require('./lib/color');
const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAASKG51AAAEUUlEQVR4Ae2cTWgTURDHZxORatUeFLUeqtaThSDFHopQ1HoQhB4LigjWq3pTEbUXK+LHUb2qICrYkwiCF7UUpYdq0UA9iFVbaFXqoWq1CMm6/022SZNsnsmb3X2kM7Dp5s17k5lf5r15KewjEhECQkAICAEhIASEgBBYjAQs7qB7r9zvoLR90rbtNsd2I7f9Ku1NWZY1TDHrat+pA4NV2ig5jBVg76W7Z2yyLpBts9ot6XkVjY5TabKot+/0wYtVDC85hC1QN/NS6efxeDzW2ZGg1kQzraivK/mhYTf+mp2jkeQYPR1MUiqVSlM8tosrE2NswWDaErnwOtpbjIGH+PBFwid8sfARSwxX3GwAs2uem3lcznHbwayAeL5y2F/CYSRrwy0YUU3b77NEt4aIkpMZbxIbiHraiVbX5yLM842tuHECzHka8h3gHe8n+jmX++CB90SvJ4iudS+EmOvBc8c2hXncqc4KMg/w2pqIbh/KXLhHG3RBSk0A9KbtsZ2ZbMO0xT3E02Xe8b/WBEB+LP9vsSYAomBArg8QYT3EhXuIp8u843+tiSKCaouCMTxOdPhODtJKZx8PXZBSEwCx5qHaqrYxQYCsCYAAA4gn9gSBqLzNmlgDy4cYrFYAavKNfgqPFvxDqMX5uV9OKu1fzhaDTjJQE6IAFICaBDSHR78Gqta8wgAr7V84nvm9TGFNoOFloF/1DLpdE5BquGSgipBCLwAVgFRqAagipNCHtwb6Vc+g2xUAdNWSgZoEw8vAoKutn31NQKrhkoEqQgq9AFQAUqkFoIqQQh/eGhh0tfWzrwCgq5YM1CQYXgb6OepXPStt97MfcLtkoCZgASgANQloDo9+DfSrnpW2a4KodrhM4WrJZcdFn4F+AfhVYb/+EbVLBmqCF4ACUJOA5nBz10C/KqwZMPdwmcKaRAWgANQkoDncyDXw1ZsPhOvb9Iwb3to1DbR92xb30oyXfbhRAPFYav+jlzT26cuCQCcmpwnX23efqbtrh1FPghoF0IPXsGo57d3dSpub1rkgP45/pSfPRlyw6NOzv3MB4CjfGFNEMGWReYB39Mg+Smzd6GYanrDEPdqgQx/0NUWMAggoyLxldUuL+KANOogALMJD8wXDm7YlusxPaa+4lOoTdpsxGRh24FyfZwxAbFUgKBh+4um8vn79wmw3BiD2eRBU2z9zf4sYoA06iNe3qFMEDUYBbN60nmZ+/KYbNx9T0tnzYV+IC/dogw59TAJo1D4Qm2RvL/jg4YuifAI89DFJOAFOOYE1ImPyTseoKFaMwyYZ2xRcXrXl+ikH37ICX1mEDSDOpnLOY+nCCUE45EZHgvrdC98g7jlaOg7mjeVbA52DvZzHBtM4XmlwaNRdu/I+J9JbZB58gm/wEYeQcTlU8Kikntlzl++dtdL2efd4JT1TgYx24Zl6+JgX8WI7/s6LW/4KASEgBISAEBACQkAILC4C/wDBL1fytvgQdgAAAABJRU5ErkJggg==';

let formatMessage = require('format-message');
let extensionURL = 'https://bricklife.com/scratch-gui/xcratch/spikeprime.mjs';

// Device Types (from LPF2 protocol)
const DeviceType = {
    // SPIKE Prime Motors  
    TECHNIC_LARGE_MOTOR: 0x2e,
    TECHNIC_XL_MOTOR: 0x2f,
    TECHNIC_MEDIUM_ANGULAR_MOTOR: 0x30,
    TECHNIC_LARGE_ANGULAR_MOTOR: 0x31,
    TECHNIC_SMALL_ANGULAR_MOTOR: 0x41,
    TECHNIC_MEDIUM_ANGULAR_MOTOR_GRAY: 0x4b,
    TECHNIC_LARGE_ANGULAR_MOTOR_GRAY: 0x4c,
    
    // Lights
    LIGHT: 0x08,
    RGB_LIGHT: 0x17,
    
    // Sensors
    MOTION_SENSOR: 0x23,
    COLOR_DISTANCE_SENSOR: 0x25,
    TILT_SENSOR: 0x22,
    TECHNIC_COLOR_SENSOR: 0x3d,
    TECHNIC_DISTANCE_SENSOR: 0x3e,
    TECHNIC_FORCE_SENSOR: 0x3f,
    TECHNIC_3X3_COLOR_LIGHT_MATRIX: 0x40,
    TECHNIC_MEDIUM_HUB_TILT_SENSOR: 0x3b
};

// Sensor Modes (from LPF2 protocol)
const SensorMode = {
    COLOR_SENSOR: {
        COLOR: 0x00,
        REFLECTIVITY: 0x01,
        AMBIENT_LIGHT: 0x02,
        LIGHT_SET: 0x03,
        RGB_INTENSITY: 0x06
    },
    DISTANCE_SENSOR: {
        DISTANCE: 0x00,
        FAST_DISTANCE: 0x01,
        LIGHT_SET: 0x05
    },
    FORCE_SENSOR: {
        FORCE: 0x00,
        TOUCHED: 0x01,
        TAPPED: 0x02
    },
    MOTOR: {
        ROTATION: 0x02,
        ABSOLUTE: 0x03
    },
    LIGHT: {
        BRIGHTNESS: 0x00
    },
    MATRIX: {
        LEVEL_OUTPUT: 0x00,
        COLOR_OUTPUT: 0x01,
        PIXEL_OUTPUT: 0x02,
        TRANSITION: 0x03
    }
};

class Scratch3SpikePrimeBlocks extends BleBaseBlocks {

    static get EXTENSION_ID() {
        return 'spikeprime';
    }

    static get extensionURL() {
        return extensionURL;
    }

    static set extensionURL(url) {
        extensionURL = url;
    }

    constructor(runtime) {
        const LWP3_SERVICE_UUID = '00001623-1212-efde-1623-785feabcd123';
        super(new Hub(runtime, Scratch3SpikePrimeBlocks.EXTENSION_ID, LWP3_SERVICE_UUID));

        if (runtime.formatMessage) {
            formatMessage = runtime.formatMessage;
        }

        this._pixelBrightness = 100;
        this._matrixStates = {};
        this._matrixColors = {
            off: 0, magenta: 1, violet: 2, blue: 3, turquoise: 4,
            mint: 5, green: 6, yellow: 7, orange: 8, red: 9, white: 10
        };
        
        this._matrixPresets = {
            smiley: '101010111',
            heart: '010111101',
            arrow: '010010111',
            cross: '010111010',
            diamond: '010101010',
            checkmark: '001010100'
        };

        this._hubType = 0x81; // Default to SPIKE Prime
    }

    // Proper LWP3 message builder with length encoding
    _buildLwp3Message(payload) {
        const totalLength = payload.length + 1;
        
        if (totalLength <= 127) {
            return Buffer.concat([Buffer.from([totalLength]), payload]);
        } else {
            // Extended length encoding for messages > 127 bytes
            const lsb = 0x80 | (totalLength & 0x7F);
            const msb = (totalLength >> 7) & 0xFF;
            return Buffer.concat([Buffer.from([lsb, msb]), payload]);
        }
    }

    // Dynamic port configuration
    get externalPorts() {
        const hubType = this._getConnectedHubType();
        if (hubType === 0x80) {
            return ['A', 'B', 'C', 'D']; // 4-port Technic Hub
        } else {
            return ['A', 'B', 'C', 'D', 'E', 'F']; // 6-port SPIKE Prime
        }
    }

    getInfo() {
        this.setupTranslations(formatMessage);
        return {
            id: Scratch3SpikePrimeBlocks.EXTENSION_ID,
            name: 'SPIKE Prime',
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: [
                // Inherit all standard motor and sensor blocks from the base class
                ...this.getBaseBlocks(),
                '---',
                // Basic Hub Status (LWP3 Compatible)
                {
                    opcode: 'getHubBatteryLevel',
                    text: formatMessage({
                        id: 'legobluetooth.getHubBatteryLevel',
                        default: 'hub battery level (%)'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getHubName',
                    text: formatMessage({
                        id: 'legobluetooth.getHubName',
                        default: 'hub name'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getHubFirmwareVersion',
                    text: formatMessage({
                        id: 'legobluetooth.getHubFirmwareVersion',
                        default: 'hub firmware version'
                    }),
                    blockType: BlockType.REPORTER
                },
                '---',
                // Basic Hub Button Controls (LWP3 Compatible)
                {
                    opcode: 'whenHubButtonPressed',
                    blockType: BlockType.HAT,
                    text: formatMessage({
                        id: 'legobluetooth.whenHubButtonPressed',
                        default: 'when hub [BUTTON] button pressed'
                    }),
                    arguments: {
                        BUTTON: {
                            type: ArgumentType.STRING,
                            menu: 'HUB_BUTTON',
                            defaultValue: 'center'
                        }
                    }
                },
                {
                    opcode: 'isHubButtonPressed',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'legobluetooth.isHubButtonPressed',
                        default: 'hub [BUTTON] button pressed?'
                    }),
                    arguments: {
                        BUTTON: {
                            type: ArgumentType.STRING,
                            menu: 'HUB_BUTTON',
                            defaultValue: 'center'
                        }
                    }
                },
                {
                    opcode: 'setCenterButtonLED',
                    text: formatMessage({
                        id: 'legobluetooth.setCenterButtonLED',
                        default: 'set center button LED to [COLOR]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        COLOR: {
                            type: ArgumentType.STRING,
                            menu: 'CENTER_LED_COLOR',
                            defaultValue: 'green'
                        }
                    }
                },
                '---',
                // Basic Sound (LWP3 Compatible - Beep Only)
                {
                    opcode: 'playBeepTone',
                    text: formatMessage({
                        id: 'legobluetooth.playBeepTone',
                        default: 'play beep [FREQUENCY] Hz for [DURATION] ms'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        FREQUENCY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 440
                        },
                        DURATION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1000
                        }
                    }
                },
                '---',
                // Enhanced Motor Controls (LWP3 Compatible)
                {
                    opcode: 'motorGoDirectionToPosition',
                    text: formatMessage({
                        id: 'legobluetooth.motorGoDirectionToPosition',
                        default: '[PORT] go [DIRECTION] to position [POSITION]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'POSITION_DIRECTION',
                            defaultValue: 'shortest'
                        },
                        POSITION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'getMotorPosition',
                    text: formatMessage({
                        id: 'legobluetooth.getMotorPosition',
                        default: '[PORT] position'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        }
                    }
                },
                {
                    opcode: 'resetMotorPosition',
                    text: formatMessage({
                        id: 'legobluetooth.resetMotorPosition',
                        default: 'reset [PORT] position to [POSITION]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        POSITION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                '---',
                // Color Sensor Blocks (LWP3 Compatible)
                {
                    opcode: 'whenColorDetected',
                    blockType: BlockType.HAT,
                    text: formatMessage({
                        id: 'legobluetooth.whenColorDetected',
                        default: 'when [PORT] detects [COLOR] color'
                    }),
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        COLOR: {
                            type: ArgumentType.NUMBER,
                            menu: 'COLOR_ID',
                            defaultValue: 9
                        }
                    }
                },
                {
                    opcode: 'getColorValue',
                    text: formatMessage({
                        id: 'legobluetooth.getColorValue',
                        default: '[PORT] detected color'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        }
                    }
                },
                {
                    opcode: 'getColorReflection',
                    text: formatMessage({
                        id: 'legobluetooth.getColorReflection',
                        default: '[PORT] color reflection %'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        }
                    }
                },
                '---',
                // Distance Sensor Blocks (LWP3 Compatible)
                {
                    opcode: 'getDistanceValue',
                    text: formatMessage({
                        id: 'legobluetooth.getDistanceValue',
                        default: '[PORT] distance (cm)'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        }
                    }
                },
                {
                    opcode: 'setDistanceLights',
                    text: formatMessage({
                        id: 'legobluetooth.setDistanceLights',
                        default: 'set [PORT] distance sensor eyes [TOP_LEFT] [TOP_RIGHT] [BOTTOM_LEFT] [BOTTOM_RIGHT] %'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        TOP_LEFT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        },
                        TOP_RIGHT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        },
                        BOTTOM_LEFT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        },
                        BOTTOM_RIGHT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    }
                },
                '---',
                // Force Sensor Blocks (LWP3 Compatible)
                {
                    opcode: 'getForceSensorValue',
                    text: formatMessage({
                        id: 'legobluetooth.getForceSensorValue',
                        default: '[PORT] force (N)'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        }
                    }
                },
                '---',
                // Hub 5x5 LED Matrix (LWP3 Compatible)
                {
                    opcode: 'displayImage',
                    text: formatMessage({
                        id: 'legobluetooth.displayImage',
                        default: 'show [MATRIX] on hub display'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MATRIX: {
                            type: ArgumentType.MATRIX,
                            defaultValue: '1101111011000001000101110'
                        }
                    }
                },
                {
                    opcode: 'displayText',
                    text: formatMessage({
                        id: 'legobluetooth.displayText',
                        default: 'show text [TEXT] on hub display'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Hello'
                        }
                    }
                },
                {
                    opcode: 'displayClear',
                    text: formatMessage({
                        id: 'legobluetooth.displayClear',
                        default: 'clear hub display'
                    }),
                    blockType: BlockType.COMMAND
                },
                '---',
                // External 3x3 Color Matrix (LWP3 Compatible)
                {
                    opcode: 'setMatrixLED',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'legobluetooth.setMatrixLED',
                        default: 'set 3x3 matrix on port [PORT] LED [POSITION] to [COLOR] brightness [BRIGHTNESS]'
                    }),
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        POSITION: {
                            type: ArgumentType.STRING,
                            menu: 'MATRIX_POSITION',
                            defaultValue: '5'
                        },
                        COLOR: {
                            type: ArgumentType.STRING,
                            menu: 'MATRIX_COLOR',
                            defaultValue: 'red'
                        },
                        BRIGHTNESS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        }
                    }
                },
                {
                    opcode: 'setMatrixAll',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'legobluetooth.setMatrixAll',
                        default: 'set all 3x3 matrix on port [PORT] to [COLOR] brightness [BRIGHTNESS]'
                    }),
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        COLOR: {
                            type: ArgumentType.STRING,
                            menu: 'MATRIX_COLOR',
                            defaultValue: 'blue'
                        },
                        BRIGHTNESS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        }
                    }
                },
                {
                    opcode: 'clearMatrix',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'legobluetooth.clearMatrix',
                        default: 'turn off all LEDs on 3x3 matrix at port [PORT]'
                    }),
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        }
                    }
                }
            ],
            menus: {
                PORT: {
                    acceptReporters: true,
                    items: this.externalPorts
                },
                POSITION_DIRECTION: {
                    acceptReporters: false,
                    items: [
                        { text: formatMessage({ id: 'legobluetooth.shortestPath', default: 'shortest path' }), value: 'shortest' },
                        { text: formatMessage({ id: 'legobluetooth.clockwise', default: 'clockwise' }), value: 'clockwise' },
                        { text: formatMessage({ id: 'legobluetooth.counterclockwise', default: 'counter-clockwise' }), value: 'counter-clockwise' }
                    ]
                },
                HUB_BUTTON: {
                    acceptReporters: false,
                    items: [
                        { text: formatMessage({ id: 'legobluetooth.button.center', default: 'center' }), value: 'center' },
                        { text: formatMessage({ id: 'legobluetooth.button.connect', default: 'connect' }), value: 'connect' }
                    ]
                },
                CENTER_LED_COLOR: {
                    acceptReporters: false,
                    items: [
                        { text: formatMessage({ id: 'legobluetooth.centerled.off', default: 'off' }), value: 'off' },
                        { text: formatMessage({ id: 'legobluetooth.centerled.green', default: 'green' }), value: 'green' },
                        { text: formatMessage({ id: 'legobluetooth.centerled.red', default: 'red' }), value: 'red' },
                        { text: formatMessage({ id: 'legobluetooth.centerled.blue', default: 'blue' }), value: 'blue' }
                    ]
                },
                COLOR_ID: {
                    acceptReporters: false,
                    items: [
                        { text: formatMessage({ id: 'legobluetooth.color.red', default: 'red' }), value: 9 },
                        { text: formatMessage({ id: 'legobluetooth.color.green', default: 'green' }), value: 6 },
                        { text: formatMessage({ id: 'legobluetooth.color.blue', default: 'blue' }), value: 3 },
                        { text: formatMessage({ id: 'legobluetooth.color.yellow', default: 'yellow' }), value: 7 }
                    ]
                },
                MATRIX_POSITION: {
                    acceptReporters: true,
                    items: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
                },
                MATRIX_COLOR: {
                    acceptReporters: false,
                    items: [
                        { text: formatMessage({ id: 'legobluetooth.matrixcolor.off', default: 'off' }), value: 'off' },
                        { text: formatMessage({ id: 'legobluetooth.matrixcolor.red', default: 'red' }), value: 'red' },
                        { text: formatMessage({ id: 'legobluetooth.matrixcolor.green', default: 'green' }), value: 'green' },
                        { text: formatMessage({ id: 'legobluetooth.matrixcolor.blue', default: 'blue' }), value: 'blue' },
                        { text: formatMessage({ id: 'legobluetooth.matrixcolor.yellow', default: 'yellow' }), value: 'yellow' }
                    ]
                }
            }
        };
    }

    //
    // --- LWP3 COMPATIBLE MOTOR CONTROL ---
    //

    motorGoDirectionToPosition(args) {
        const direction = args.DIRECTION;
        const position = Math.round(Cast.toNumber(args.POSITION));
        const ports = this._validatePorts(Cast.toString(args.PORT));

        const promises = ports.map(port => {
            const portId = this.externalPorts.indexOf(port);
            if (portId === -1) return Promise.resolve();

            let speed = 75; // Default for 'shortest'
            if (direction === 'clockwise') {
                speed = 75;
            } else if (direction === 'counter-clockwise') {
                speed = -75;
            }
            
            const maxPower = 100;
            const endState = 0x7E; // HOLD (126)
            const useProfile = 0x01; // Use acceleration/deceleration profiles

            // Proper 13-byte command payload
            const commandPayload = Buffer.alloc(13);
            commandPayload.writeUInt8(0x00, 0);  // Hub ID
            commandPayload.writeUInt8(0x81, 1);  // Port Output Command
            commandPayload.writeUInt8(portId, 2); // Port ID
            commandPayload.writeUInt8(0x11, 3);  // Startup/Completion Info (Execute immediately + Command feedback)
            commandPayload.writeUInt8(0x0d, 4);  // Sub Command: GoToAbsolutePosition
            commandPayload.writeInt32LE(position, 5); // 4 bytes: Absolute position
            commandPayload.writeInt8(Math.abs(speed), 9); // 1 byte: Speed (always positive for this command)
            commandPayload.writeUInt8(maxPower, 10);      // 1 byte: Max power
            commandPayload.writeUInt8(endState, 11);      // 1 byte: End state
            commandPayload.writeUInt8(useProfile, 12);    // 1 byte: Use profile

            const finalMessage = this._buildLwp3Message(commandPayload);
            return this._peripheral.write(finalMessage);
        });

        return Promise.all(promises);
    }

    getMotorPosition(args) {
        const portName = Cast.toString(args.PORT).toUpperCase();
        const portId = this.externalPorts.indexOf(portName);
        if (portId === -1) return 0;

        // Subscribe to motor position data
        this._subscribeToPortValue(portId, SensorMode.MOTOR.ABSOLUTE);
        return this._peripheral.inputValue(portId, 'position') || 0;
    }

    resetMotorPosition(args) {
        const portName = Cast.toString(args.PORT).toUpperCase();
        const portId = this.externalPorts.indexOf(portName);
        if (portId === -1) return Promise.resolve();

        const newPosition = Math.round(Cast.toNumber(args.POSITION));

        // Proper preset encoder command using WriteDirectModeData
        const commandPayload = Buffer.alloc(10);
        commandPayload.writeUInt8(0x00, 0);  // Hub ID
        commandPayload.writeUInt8(0x81, 1);  // Port Output Command
        commandPayload.writeUInt8(portId, 2); // Port ID
        commandPayload.writeUInt8(0x11, 3);  // Startup/Completion Info
        commandPayload.writeUInt8(0x51, 4);  // Sub Command: WriteDirectModeData
        commandPayload.writeUInt8(0x02, 5);  // Mode: 2 (Position mode)
        commandPayload.writeInt32LE(newPosition, 6); // 4 bytes: New position value

        const finalMessage = this._buildLwp3Message(commandPayload);
        return this._peripheral.write(finalMessage);
    }

    //
    // --- LWP3 COMPATIBLE SENSOR METHODS ---
    //

    whenColorDetected(args) {
        const detectedColor = this.getColorValue(args);
        const expectedColor = Cast.toNumber(args.COLOR);
        return detectedColor === expectedColor;
    }

    getColorValue(args) {
        const portName = Cast.toString(args.PORT).toUpperCase();
        const portId = this.externalPorts.indexOf(portName);
        if (portId === -1) return 0;

        this._subscribeToPortValue(portId, SensorMode.COLOR_SENSOR.COLOR);
        return this._peripheral.inputValue(portId, 'color') || 0;
    }

    getColorReflection(args) {
        const portName = Cast.toString(args.PORT).toUpperCase();
        const portId = this.externalPorts.indexOf(portName);
        if (portId === -1) return 0;

        this._subscribeToPortValue(portId, SensorMode.COLOR_SENSOR.REFLECTIVITY);
        return this._peripheral.inputValue(portId, 'reflect') || 0;
    }

    getDistanceValue(args) {
        const portName = Cast.toString(args.PORT).toUpperCase();
        const portId = this.externalPorts.indexOf(portName);
        if (portId === -1) return 0;

        this._subscribeToPortValue(portId, SensorMode.DISTANCE_SENSOR.DISTANCE);
        const distanceRaw = this._peripheral.inputValue(portId, 'distance') || 0;
        return Math.round(distanceRaw / 10); // Convert mm to cm
    }

    setDistanceLights(args) {
        const portName = Cast.toString(args.PORT).toUpperCase();
        const portId = this.externalPorts.indexOf(portName);
        if (portId === -1) return Promise.resolve();

        const topLeft = MathUtil.clamp(Cast.toNumber(args.TOP_LEFT), 0, 100);
        const topRight = MathUtil.clamp(Cast.toNumber(args.TOP_RIGHT), 0, 100); 
        const bottomLeft = MathUtil.clamp(Cast.toNumber(args.BOTTOM_LEFT), 0, 100);
        const bottomRight = MathUtil.clamp(Cast.toNumber(args.BOTTOM_RIGHT), 0, 100);

        // Set distance sensor illumination using WriteDirectModeData
        const commandPayload = Buffer.alloc(10);
        commandPayload.writeUInt8(0x00, 0);  // Hub ID
        commandPayload.writeUInt8(0x81, 1);  // Port Output Command
        commandPayload.writeUInt8(portId, 2); // Port ID
        commandPayload.writeUInt8(0x11, 3);  // Startup/Completion Info
        commandPayload.writeUInt8(0x51, 4);  // Sub Command: WriteDirectModeData
        commandPayload.writeUInt8(SensorMode.DISTANCE_SENSOR.LIGHT_SET, 5); // Mode
        commandPayload.writeUInt8(topLeft, 6);
        commandPayload.writeUInt8(topRight, 7);
        commandPayload.writeUInt8(bottomLeft, 8);
        commandPayload.writeUInt8(bottomRight, 9);

        const finalMessage = this._buildLwp3Message(commandPayload);
        return this._peripheral.write(finalMessage);
    }

    getForceSensorValue(args) {
        const portName = Cast.toString(args.PORT).toUpperCase();
        const portId = this.externalPorts.indexOf(portName);
        if (portId === -1) return 0;

        this._subscribeToPortValue(portId, SensorMode.FORCE_SENSOR.FORCE);
        const forceRaw = this._peripheral.inputValue(portId, 'force') || 0;
        return Math.round(forceRaw / 10 * 100) / 100; // Convert to Newtons
    }

    //
    // --- LWP3 COMPATIBLE HUB DISPLAY (5x5 Matrix) ---
    //

    displayImage(args) {
        const imagePayload = this._get5x5MatrixPayload(args.MATRIX);
        
        // Use Hub Properties to control internal display
        const commandPayload = Buffer.concat([
            Buffer.from([
                0x00, // Hub ID
                0x81, // Port Output Command
                0x32, // Internal display port (hub display)
                0x11, // Startup/Completion Info
                0x51, // WriteDirectModeData
                0x00  // Mode 0: Image mode
            ]),
            imagePayload
        ]);

        const finalMessage = this._buildLwp3Message(commandPayload);
        return this._peripheral.write(finalMessage);
    }

    displayText(args) {
        const text = Cast.toString(args.TEXT);
        const textBytes = Buffer.from(text, 'utf8').slice(0, 20);
        
        const commandPayload = Buffer.concat([
            Buffer.from([
                0x00, // Hub ID
                0x81, // Port Output Command
                0x32, // Internal display port
                0x11, // Startup/Completion Info
                0x51, // WriteDirectModeData
                0x01  // Mode 1: Text mode
            ]),
            textBytes
        ]);

        const finalMessage = this._buildLwp3Message(commandPayload);
        return this._peripheral.write(finalMessage);
    }

    displayClear() {
        const payload = Buffer.alloc(25); // 25 zero bytes
        
        const commandPayload = Buffer.concat([
            Buffer.from([
                0x00, // Hub ID
                0x81, // Port Output Command
                0x32, // Internal display port
                0x11, // Startup/Completion Info
                0x51, // WriteDirectModeData
                0x00  // Mode 0: Image mode
            ]),
            payload
        ]);

        const finalMessage = this._buildLwp3Message(commandPayload);
        return this._peripheral.write(finalMessage);
    }

    //
    // --- LWP3 COMPATIBLE 3x3 MATRIX CONTROL ---
    //

    setMatrixLED(args) {
        const portName = Cast.toString(args.PORT).toUpperCase();
        const portId = this.externalPorts.indexOf(portName);
        if (portId === -1) return Promise.resolve();

        const position = Cast.toNumber(args.POSITION) - 1; // Convert 1-9 to 0-8
        if (position < 0 || position > 8) return Promise.resolve();

        const colorName = Cast.toString(args.COLOR);
        const colorId = this._matrixColors[colorName] || 0;
        const brightness = MathUtil.clamp(Cast.toNumber(args.BRIGHTNESS), 1, 10);

        // Get current matrix state or initialize
        let currentMatrix = this._getCurrentMatrixState(portId);
        if (!currentMatrix) {
            currentMatrix = new Array(9).fill(0);
        }

        // Use proper formula: (brightness << 4) | color_id
        const byteValue = colorId === 0 ? 0 : (brightness << 4) | colorId;
        currentMatrix[position] = byteValue;
        this._updateMatrixState(portId, currentMatrix);

        // Send using Mode 2 (Pixel Output)
        const commandPayload = Buffer.concat([
            Buffer.from([
                0x00, // Hub ID
                0x81, // Port Output Command
                portId, // Port ID
                0x11, // Startup/Completion Info
                0x51, // WriteDirectModeData
                SensorMode.MATRIX.PIXEL_OUTPUT // Mode 2: Individual pixel control
            ]),
            Buffer.from(currentMatrix)
        ]);

        const finalMessage = this._buildLwp3Message(commandPayload);
        return this._peripheral.write(finalMessage);
    }

    setMatrixAll(args) {
        const portName = Cast.toString(args.PORT).toUpperCase();
        const portId = this.externalPorts.indexOf(portName);
        if (portId === -1) return Promise.resolve();

        const colorName = Cast.toString(args.COLOR);
        const colorId = this._matrixColors[colorName] || 0;
        const brightness = MathUtil.clamp(Cast.toNumber(args.BRIGHTNESS), 1, 10);

        if (colorId === 0) {
            return this.clearMatrix(args);
        } else {
            // Use Mode 1 (Color Output) - single color for all LEDs
            const commandPayload = Buffer.from([
                0x00, // Hub ID
                0x81, // Port Output Command
                portId, // Port ID
                0x11, // Startup/Completion Info
                0x51, // WriteDirectModeData
                SensorMode.MATRIX.COLOR_OUTPUT, // Mode 1: All LEDs same color
                colorId
            ]);

            // Update state tracking
            const byteValue = (brightness << 4) | colorId;
            this._updateMatrixState(portId, new Array(9).fill(byteValue));

            const finalMessage = this._buildLwp3Message(commandPayload);
            return this._peripheral.write(finalMessage);
        }
    }

    clearMatrix(args) {
        const portName = Cast.toString(args.PORT).toUpperCase();
        const portId = this.externalPorts.indexOf(portName);
        if (portId === -1) return Promise.resolve();

        // Use Mode 1 with color 0 (off)
        const commandPayload = Buffer.from([
            0x00, // Hub ID
            0x81, // Port Output Command
            portId, // Port ID
            0x11, // Startup/Completion Info
            0x51, // WriteDirectModeData
            SensorMode.MATRIX.COLOR_OUTPUT, // Mode 1
            0 // Color: off
        ]);

        this._updateMatrixState(portId, new Array(9).fill(0));
        
        const finalMessage = this._buildLwp3Message(commandPayload);
        return this._peripheral.write(finalMessage);
    }

    //
    // --- LWP3 COMPATIBLE HUB FUNCTIONS ---
    //

    getHubBatteryLevel() {
        // Request battery level via Hub Properties
        const commandPayload = Buffer.from([
            0x00, // Hub ID
            0x01, // Hub Properties
            0x06, // Property: Battery Voltage
            0x05  // Operation: Request Update
        ]);

        const finalMessage = this._buildLwp3Message(commandPayload);
        this._peripheral.write(finalMessage);
        
        return this._peripheral.batteryLevel || 0;
    }

    getHubName() {
        // Request hub name via Hub Properties
        const commandPayload = Buffer.from([
            0x00, // Hub ID
            0x01, // Hub Properties
            0x01, // Property: Advertising Name
            0x05  // Operation: Request Update
        ]);

        const finalMessage = this._buildLwp3Message(commandPayload);
        this._peripheral.write(finalMessage);
        
        return this._peripheral.name || '';
    }

    getHubFirmwareVersion() {
        // Request firmware version via Hub Properties
        const commandPayload = Buffer.from([
            0x00, // Hub ID
            0x01, // Hub Properties
            0x03, // Property: FW Version
            0x05  // Operation: Request Update
        ]);

        const finalMessage = this._buildLwp3Message(commandPayload);
        this._peripheral.write(finalMessage);
        
        return this._peripheral.firmwareVersion || '';
    }

    whenHubButtonPressed(args) {
        return this.isHubButtonPressed(args);
    }

    isHubButtonPressed(args) {
        const button = Cast.toString(args.BUTTON);
        
        // Request button state via Hub Properties
        const commandPayload = Buffer.from([
            0x00, // Hub ID
            0x01, // Hub Properties
            0x02, // Property: Button
            0x05  // Operation: Request Update
        ]);

        const finalMessage = this._buildLwp3Message(commandPayload);
        this._peripheral.write(finalMessage);
        
        return this._peripheral.buttonPressed === true;
    }

    setCenterButtonLED(args) {
        const color = Cast.toString(args.COLOR);
        
        // Map color names to LWP3 color values
        const colorMap = {
            'off': 0,
            'green': 6,
            'red': 9,
            'blue': 3
        };
        
        const colorValue = colorMap[color] || 0;
        
        // Control center button LED via WriteDirectModeData
        const commandPayload = Buffer.from([
            0x00, // Hub ID
            0x81, // Port Output Command
            0x32, // Internal LED port
            0x11, // Startup/Completion Info
            0x51, // WriteDirectModeData
            0x00, // Mode 0: Color mode
            colorValue
        ]);

        const finalMessage = this._buildLwp3Message(commandPayload);
        return this._peripheral.write(finalMessage);
    }

    playBeepTone(args) {
        const frequency = MathUtil.clamp(Cast.toNumber(args.FREQUENCY), 20, 20000);
        const duration = MathUtil.clamp(Cast.toNumber(args.DURATION), 1, 10000);
        
        // Use Hub Actions command for beep
        const commandPayload = Buffer.alloc(6);
        commandPayload.writeUInt8(0x00, 0); // Hub ID
        commandPayload.writeUInt8(0x02, 1); // Hub Actions
        commandPayload.writeUInt8(0x03, 2); // Action: Beep
        commandPayload.writeUInt16LE(frequency, 3);
        commandPayload.writeUInt16LE(duration, 5);

        const finalMessage = this._buildLwp3Message(commandPayload);
        return this._peripheral.write(finalMessage);
    }

    //
    // --- UTILITY METHODS ---
    //

    _validatePorts(text) {
        return text.toUpperCase().replace(/[^ABCDEF]/g, '')
            .split('')
            .filter((x, i, self) => self.indexOf(x) === i)
            .sort();
    }

    _getConnectedHubType() {
        if (this._peripheral && this._peripheral.hubType) {
            return this._peripheral.hubType;
        }
        return this._hubType;
    }

    _get5x5MatrixPayload(matrixString, brightnessPercent = this._pixelBrightness) {
        const brightness = Math.round(MathUtil.clamp(brightnessPercent, 0, 100) * 9 / 100);
        const symbol = (Cast.toString(matrixString).replace(/[^01]/g, '') + '0'.repeat(25)).slice(0, 25);
        
        const payload = [];
        for (let i = 0; i < 25; i++) {
            payload.push(symbol[i] === '1' ? brightness : 0);
        }
        return Buffer.from(payload);
    }

    _getCurrentMatrixState(portId) {
        return this._matrixStates[portId] || null;
    }

    _updateMatrixState(portId, matrixData) {
        this._matrixStates[portId] = [...matrixData];
    }

    _subscribeToPortValue(portId, mode) {
        // Port Input Format Setup (Single) - Subscribe to sensor data
        const commandPayload = Buffer.from([
            0x00, // Hub ID
            0x41, // Port Input Format Setup (Single)
            portId, // Port ID
            mode, // Mode
            0x01, 0x00, 0x00, 0x00, // Delta Interval (1)
            0x01 // Enable notifications
        ]);
        
        const finalMessage = this._buildLwp3Message(commandPayload);
        this._peripheral.write(finalMessage);
    }

    // Helper to get base blocks if available
    getBaseBlocks() {
        try {
            return super.getBlocks ? super.getBlocks(formatMessage) : [];
        } catch (error) {
            console.warn('Base blocks not available:', error);
            return [];
        }
    }
}

module.exports = Scratch3SpikePrimeBlocks;
