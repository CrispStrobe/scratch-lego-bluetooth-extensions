const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');
const color = require('../../util/color');
const BLE = require('../../io/ble');
const Base64Util = require('../../util/base64-util');
const MathUtil = require('../../util/math-util');
const RateLimiter = require('../../util/rateLimiter.js');
const log = require('../../util/log');

/**
 * LEGO Boost Enhanced Extension
 * 
 * This extension provides comprehensive support for LEGO Boost devices, including:
 * - All original Boost functionality (100% backward compatible)
 * - Enhanced motor control with acceleration/deceleration profiles
 * - Multi-mode color/distance sensor support
 * - SPIKE Prime Force Sensor compatibility
 * - Advanced hub monitoring and control
 * - Proper LEGO Wireless Protocol 3.0.00 compliance
 * 
 * Protocol documentation: https://lego.github.io/lego-ble-wireless-protocol-docs/
 */

// ============================================================================
// CONSTANTS AND CONFIGURATION
// ============================================================================

/**
 * Icon displayed for Boost blocks
 */
const iconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACpQTFRF////fIel5ufolZ62/2YavsPS+YZOkJmy9/j53+Hk6+zs6N/b6dfO////tDhMHAAAAA50Uk5T/////////////////wBFwNzIAAAA6ElEQVR42uzX2w6DIBAEUGDVtlr//3dLaLwgiwUd2z7MJPJg5EQWiGhGcAxBggQJEiT436CIfqXJPTn3MKNYYMSDFpoAmp24OaYgvwKnFgL2zvVTCwHrMoMi+nUQLFthaNCCa0iwclLkDgYVsQp0mzxuqXgK1MRzoCLWgkPXNN2wI/q6Kvt7u/cX0HtejN8x2sXpnpb8J8D3b0Keuhh3X975M+i0xNVbg3s1TIasgK21bQyGO+s2PykaGMYbge8KrNrssvkOWDXkErB8UuBHETjoYLkKBA8ZfuDkbwVBggQJEiR4MC8BBgDTtMZLx2nFCQAAAABJRU5ErkJggg==';

/**
 * Boost BLE communication settings
 */
const BoostBLE = {
    service: '00001623-1212-efde-1623-785feabcd123',
    characteristic: '00001624-1212-efde-1623-785feabcd123',
    sendInterval: 100,
    sendRateMax: 20
};

/**
 * Configuration constants
 */
const BoostMotorMaxPowerAdd = 10;  // Additional power for reaching target speed faster
const BoostPingInterval = 5000;    // Battery check interval
const BoostColorSampleSize = 5;    // Number of samples for stable color detection

/**
 * Supported device types (based on real-world compatibility)
 * @readonly
 * @enum {number}
 */
const BoostIO = {
    MOTOR_WEDO: 0x01,           // Legacy reference (not used in practice)
    MOTOR_SYSTEM: 0x02,         // System train motor
    BUTTON: 0x05,               // Hub button
    LIGHT: 0x08,                // Simple light
    VOLTAGE: 0x14,              // Voltage sensor
    CURRENT: 0x15,              // Current sensor
    PIEZO: 0x16,                // Piezo sound
    LED: 0x17,                  // RGB LED
    TILT_EXTERNAL: 0x22,        // External tilt sensor
    MOTION_SENSOR: 0x23,        // Motion sensor
    COLOR: 0x25,                // Boost Color & Distance Sensor
    MOTOREXT: 0x26,             // External motor with tacho
    MOTORINT: 0x27,             // Internal motor with tacho
    TILT: 0x28,                 // Internal tilt sensor
    TECHNIC_FORCE_SENSOR: 0x3f  // SPIKE Prime Force Sensor (63)
};

/**
 * Port feedback states
 * @readonly
 * @enum {number}
 */
const BoostPortFeedback = {
    IN_PROGRESS: 0x01,
    COMPLETED: 0x02,
    DISCARDED: 0x04,
    IDLE: 0x08,
    BUSY_OR_FULL: 0x10
};

/**
 * Physical port mappings (firmware version dependent)
 * @readonly
 * @enum {number}
 */
const BoostPort10000223OrOlder = {
    A: 55, B: 56, C: 1, D: 2
};

const BoostPort10000224OrNewer = {
    A: 0, B: 1, C: 2, D: 3
};

// Default to newer firmware mapping
let BoostPort = BoostPort10000224OrNewer;

/**
 * Color definitions and indices
 * @readonly
 */
const BoostColor = {
    ANY: 'any', NONE: 'none', RED: 'red', BLUE: 'blue',
    GREEN: 'green', YELLOW: 'yellow', WHITE: 'white', BLACK: 'black'
};

const BoostColorIndex = {
    [BoostColor.NONE]: 255, [BoostColor.RED]: 9, [BoostColor.BLUE]: 3,
    [BoostColor.GREEN]: 5, [BoostColor.YELLOW]: 7, [BoostColor.WHITE]: 10, [BoostColor.BLACK]: 0
};

/**
 * Protocol message types
 * @readonly
 * @enum {number}
 */
const BoostMessage = {
    HUB_PROPERTIES: 0x01,
    HUB_ACTIONS: 0x02,
    HUB_ALERTS: 0x03,
    HUB_ATTACHED_IO: 0x04,
    ERROR: 0x05,
    PORT_INPUT_FORMAT_SETUP_SINGLE: 0x41,
    PORT_INPUT_FORMAT_SETUP_COMBINED: 0x42,
    PORT_INFORMATION: 0x43,
    PORT_MODEINFORMATION: 0x44,
    PORT_VALUE: 0x45,
    PORT_VALUE_COMBINED: 0x46,
    PORT_INPUT_FORMAT: 0x47,
    PORT_INPUT_FORMAT_COMBINED: 0x48,
    OUTPUT: 0x81,
    PORT_FEEDBACK: 0x82
};

/**
 * Hub properties and operations
 * @readonly
 */
const BoostHubProperty = {
    ADVERTISEMENT_NAME: 0x01, BUTTON: 0x02, FW_VERSION: 0x03,
    HW_VERSION: 0x04, RSSI: 0x05, BATTERY_VOLTAGE: 0x06,
    BATTERY_TYPE: 0x07, MANUFACTURER_NAME: 0x08, RADIO_FW_VERSION: 0x09,
    LEGO_WP_VERSION: 0x0A, SYSTEM_TYPE_ID: 0x0B, HW_NETWORK_ID: 0x0C,
    PRIMARY_MAC: 0x0D, SECONDARY_MAC: 0x0E, HW_NETWORK_FAMILY: 0x0F
};

const BoostHubPropertyOperation = {
    SET: 0x01, ENABLE_UPDATES: 0x02, DISABLE_UPDATES: 0x03,
    RESET: 0x04, REQUEST_UPDATE: 0x05, UPDATE: 0x06
};

const BoostHubAction = {
    SWITCH_OFF_HUB: 0x01, DISCONNECT: 0x02, VCC_PORT_CONTROL_ON: 0x03,
    VCC_PORT_CONTROL_OFF: 0x04, ACTIVATE_BUSY_INDICATION: 0x05, RESET_BUSY_INDICATION: 0x06
};

const BoostAlert = {
    LOW_VOLTAGE: 0x01, HIGH_CURRENT: 0x02, LOW_SIGNAL_STRENGTH: 0x03, OVER_POWER_CONDITION: 0x04
};

const BoostAlertOperation = {
    ENABLE_UPDATES: 0x01, DISABLE_UPDATES: 0x02, REQUEST_UPDATES: 0x03, UPDATE: 0x04
};

/**
 * Motor control commands and settings
 * @readonly
 */
const BoostOutputSubCommand = {
    START_POWER: 0x01, START_POWER_PAIR: 0x02, SET_ACC_TIME: 0x05, SET_DEC_TIME: 0x06,
    START_SPEED: 0x07, START_SPEED_PAIR: 0x08, START_SPEED_FOR_TIME: 0x09,
    START_SPEED_FOR_TIME_PAIR: 0x0A, START_SPEED_FOR_DEGREES: 0x0B,
    START_SPEED_FOR_DEGREES_PAIR: 0x0C, GO_TO_ABS_POSITION: 0x0D,
    GO_TO_ABS_POSITION_PAIR: 0x0E, PRESET_ENCODER: 0x14, WRITE_DIRECT_MODE_DATA: 0x51
};

const BoostOutputExecution = {
    BUFFER_IF_NECESSARY: 0x00, EXECUTE_IMMEDIATELY: 0x10,
    NO_ACTION: 0x00, COMMAND_FEEDBACK: 0x01
};

const BoostMotorEndState = {
    FLOAT: 0, HOLD: 126, BRAKE: 127
};

const BoostMotorProfile = {
    DO_NOT_USE: 0x00, ACCELERATION: 0x01, DECELERATION: 0x02
};

const BoostIOEvent = {
    ATTACHED: 0x01, DETACHED: 0x00, ATTACHED_VIRTUAL: 0x02
};

/**
 * Sensor mode definitions
 * @readonly
 * @enum {number}
 */
const BoostMode = {
    TILT: 0,           // Tilt sensor angle mode
    LED: 1,            // LED RGB mode
    COLOR: 0,          // Color detection mode
    DISTANCE: 1,       // Distance measurement mode
    REFLECTION: 3,     // Reflection/ambient light mode
    AMBIENT: 4,        // Ambient light mode
    MOTOR_SENSOR: 2,   // Motor position/rotation mode
    FORCE: 0,          // Force measurement mode
    TOUCHED: 1,        // Touch detection mode
    UNKNOWN: 0         // Default/unknown mode
};

/**
 * Motor state tracking
 * @readonly
 * @enum {number}
 */
const BoostMotorState = {
    OFF: 0, ON_FOREVER: 1, ON_FOR_TIME: 2, ON_FOR_ROTATION: 3
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert JavaScript number to little-endian INT32 array
 * @param {number} number - Input number
 * @return {Array<number>} 4-byte array representation
 */
const numberToInt32Array = function (number) {
    const buffer = new ArrayBuffer(4);
    const dataview = new DataView(buffer);
    dataview.setInt32(0, number, true); // Little-endian
    return [
        dataview.getInt8(0), dataview.getInt8(1),
        dataview.getInt8(2), dataview.getInt8(3)
    ];
};

/**
 * Convert little-endian INT32 array to JavaScript number
 * @param {Array<number>} array - 4-byte array
 * @return {number} Converted number
 */
const int32ArrayToNumber = function (array) {
    const i = Uint8Array.from(array);
    const d = new DataView(i.buffer);
    return d.getInt32(0, true);
};

/**
 * Decode firmware version from protocol format
 * @param {number} version - Version as 32-bit integer
 * @return {string} Formatted version string
 */
const decodeVersion = function (version) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setInt32(0, version, true);
    
    const major = view.getUint8(3) >> 4;
    const minor = view.getUint8(3) & 0x0F;
    const bugfix = view.getUint8(2);
    const build = view.getUint16(0, true);
    
    return `${major}.${minor}.${bugfix.toString().padStart(2, '0')}.${build.toString().padStart(4, '0')}`;
};

// ============================================================================
// MOTOR CLASS
// ============================================================================

/**
 * Enhanced motor management with advanced control features
 */
class BoostMotor {
    constructor (parent, index) {
        this._parent = parent;
        this._index = index;
        
        // Basic motor properties
        this._direction = 1;
        this._power = 50;
        this._position = 0;
        this._status = BoostMotorState.OFF;
        
        // Advanced motor features
        this._stopMode = BoostMotorEndState.BRAKE;
        this._accelerationTime = 0;
        this._decelerationTime = 0;
        this._useProfile = BoostMotorProfile.DO_NOT_USE;
        
        // State management
        this._pendingDurationTimeoutId = null;
        this._pendingDurationTimeoutStartTime = null;
        this._pendingDurationTimeoutDelay = null;
        this._pendingRotationDestination = null;
        this._pendingRotationPromise = null;

        this.turnOff = this.turnOff.bind(this);
    }

    // Property getters and setters
    get direction () { return this._direction; }
    set direction (value) {
        this._direction = value < 0 ? -1 : 1;
    }

    get power () { return this._power; }
    set power (value) {
        if (value === 0) {
            this._power = 0;
        } else {
            // Scale power to ensure motors work under load
            this._power = MathUtil.scale(value, 1, 100, 10, 100);
        }
    }

    get position () { return this._position; }
    set position (value) { this._position = value; }

    get status () { return this._status; }
    set status (value) {
        this._clearRotationState();
        this._clearDurationTimeout();
        this._status = value;
    }

    get stopMode () { return this._stopMode; }
    set stopMode (value) { this._stopMode = value; }

    get pendingDurationTimeoutStartTime () { return this._pendingDurationTimeoutStartTime; }
    get pendingDurationTimeoutDelay () { return this._pendingDurationTimeoutDelay; }
    get pendingRotationDestination () { return this._pendingRotationDestination; }
    get pendingRotationPromise () { return this._pendingRotationPromise; }
    set pendingRotationPromise (func) { this._pendingRotationPromise = func; }

    /**
     * Set motor acceleration profile
     * @param {number} time - Acceleration time in milliseconds
     */
    setAcceleration (time) {
        this._accelerationTime = MathUtil.clamp(time, 0, 10000);
        this._useProfile |= BoostMotorProfile.ACCELERATION;
        
        const cmd = this._parent.generateOutputCommand(
            this._index,
            BoostOutputExecution.EXECUTE_IMMEDIATELY,
            BoostOutputSubCommand.SET_ACC_TIME,
            [...numberToInt32Array(this._accelerationTime).slice(0, 2), 0]
        );
        this._parent.send(BoostBLE.characteristic, cmd);
    }

    /**
     * Set motor deceleration profile
     * @param {number} time - Deceleration time in milliseconds
     */
    setDeceleration (time) {
        this._decelerationTime = MathUtil.clamp(time, 0, 10000);
        this._useProfile |= BoostMotorProfile.DECELERATION;
        
        const cmd = this._parent.generateOutputCommand(
            this._index,
            BoostOutputExecution.EXECUTE_IMMEDIATELY,
            BoostOutputSubCommand.SET_DEC_TIME,
            [...numberToInt32Array(this._decelerationTime).slice(0, 2), 0]
        );
        this._parent.send(BoostBLE.characteristic, cmd);
    }

    /**
     * Reset motor position encoder
     * @param {number} newPosition - New position value (default: 0)
     */
    resetPosition (newPosition = 0) {
        const cmd = this._parent.generateOutputCommand(
            this._index,
            BoostOutputExecution.EXECUTE_IMMEDIATELY,
            BoostOutputSubCommand.WRITE_DIRECT_MODE_DATA,
            [BoostMode.MOTOR_SENSOR, ...numberToInt32Array(newPosition)]
        );
        return this._parent.send(BoostBLE.characteristic, cmd);
    }

    /**
     * Turn motor on with current settings
     * @private
     */
    _turnOn () {
        const cmd = this._parent.generateOutputCommand(
            this._index,
            BoostOutputExecution.EXECUTE_IMMEDIATELY,
            BoostOutputSubCommand.START_SPEED,
            [
                this.power * this.direction,
                MathUtil.clamp(this.power + BoostMotorMaxPowerAdd, 0, 100),
                this._useProfile
            ]
        );
        this._parent.send(BoostBLE.characteristic, cmd);
    }

    /**
     * Turn motor on indefinitely
     */
    turnOnForever () {
        this.status = BoostMotorState.ON_FOREVER;
        this._turnOn();
    }

    /**
     * Turn motor on for specific duration
     * @param {number} milliseconds - Duration in milliseconds
     */
    turnOnFor (milliseconds) {
        milliseconds = Math.max(0, milliseconds);
        this.status = BoostMotorState.ON_FOR_TIME;
        this._turnOn();
        this._setNewDurationTimeout(this.turnOff, milliseconds);
    }

    /**
     * Turn motor on for specific rotation
     * @param {number} degrees - Rotation in degrees
     * @param {number} direction - Direction multiplier (-1 or 1)
     */
    turnOnForDegrees (degrees, direction) {
        degrees = Math.max(0, degrees);

        const cmd = this._parent.generateOutputCommand(
            this._index,
            (BoostOutputExecution.EXECUTE_IMMEDIATELY | BoostOutputExecution.COMMAND_FEEDBACK),
            BoostOutputSubCommand.START_SPEED_FOR_DEGREES,
            [
                ...numberToInt32Array(degrees),
                this.power * this.direction * direction,
                MathUtil.clamp(this.power + BoostMotorMaxPowerAdd, 0, 100),
                this._stopMode,
                this._useProfile
            ]
        );

        this.status = BoostMotorState.ON_FOR_ROTATION;
        this._pendingRotationDestination = this.position + (degrees * this.direction * direction);
        this._parent.send(BoostBLE.characteristic, cmd);
    }

    /**
     * Turn motor to absolute position
     * @param {number} position - Target position in degrees
     */
    turnToPosition (position) {
        const cmd = this._parent.generateOutputCommand(
            this._index,
            (BoostOutputExecution.EXECUTE_IMMEDIATELY | BoostOutputExecution.COMMAND_FEEDBACK),
            BoostOutputSubCommand.GO_TO_ABS_POSITION,
            [
                ...numberToInt32Array(position),
                this.power,
                MathUtil.clamp(this.power + BoostMotorMaxPowerAdd, 0, 100),
                this._stopMode,
                this._useProfile
            ]
        );

        this.status = BoostMotorState.ON_FOR_ROTATION;
        this._pendingRotationDestination = position;
        this._parent.send(BoostBLE.characteristic, cmd);
    }

    /**
     * Turn motor off
     * @param {boolean} useLimiter - Whether to use rate limiter
     */
    turnOff (useLimiter = true) {
        const cmd = this._parent.generateOutputCommand(
            this._index,
            BoostOutputExecution.EXECUTE_IMMEDIATELY,
            BoostOutputSubCommand.START_POWER,
            [this._stopMode === BoostMotorEndState.FLOAT ? BoostMotorEndState.FLOAT : 0]
        );

        this.status = BoostMotorState.OFF;
        this._parent.send(BoostBLE.characteristic, cmd, useLimiter);
    }

    /**
     * Clear duration timeout
     * @private
     */
    _clearDurationTimeout () {
        if (this._pendingDurationTimeoutId !== null) {
            clearTimeout(this._pendingDurationTimeoutId);
            this._pendingDurationTimeoutId = null;
            this._pendingDurationTimeoutStartTime = null;
            this._pendingDurationTimeoutDelay = null;
        }
    }

    /**
     * Set new duration timeout
     * @param {Function} callback - Function to call when timeout expires
     * @param {number} delay - Delay in milliseconds
     * @private
     */
    _setNewDurationTimeout (callback, delay) {
        this._clearDurationTimeout();
        const timeoutID = setTimeout(() => {
            if (this._pendingDurationTimeoutId === timeoutID) {
                this._pendingDurationTimeoutId = null;
                this._pendingDurationTimeoutStartTime = null;
                this._pendingDurationTimeoutDelay = null;
            }
            callback();
        }, delay);
        this._pendingDurationTimeoutId = timeoutID;
        this._pendingDurationTimeoutStartTime = Date.now();
        this._pendingDurationTimeoutDelay = delay;
    }

    /**
     * Clear rotation state and promises
     * @private
     */
    _clearRotationState () {
        if (this._pendingRotationPromise !== null) {
            this._pendingRotationPromise();
            this._pendingRotationPromise = null;
        }
        this._pendingRotationDestination = null;
    }
}

// ============================================================================
// BOOST PERIPHERAL CLASS
// ============================================================================

/**
 * Main Boost peripheral management class with enhanced capabilities
 */
class Boost {
    constructor (runtime, extensionId) {
        this._runtime = runtime;
        this._runtime.on('PROJECT_STOP_ALL', this.stopAll.bind(this));
        
        this._extensionId = extensionId;
        this._ble = null;
        this._rateLimiter = new RateLimiter(BoostBLE.sendRateMax);
        this._pingDeviceId = null;

        // Device state
        this._ports = [];
        this._motors = [];
        this._portModes = {};
        
        // Sensor data with organized structure
        this._sensors = {
            tiltX: 0,
            tiltY: 0,
            color: {},
            distance: {},
            reflection: {},
            ambient: {},
            force: {},
            pressed: {},
            previousColor: BoostColor.NONE
        };
        
        // Color detection state
        this._colorSamples = [];
        
        // Hub status monitoring
        this._hubStatus = {
            batteryLevel: 100,
            buttonPressed: false,
            rssi: 0,
            fwVersion: "0.0.0.0",
            hwVersion: "0.0.0.0",
            lowVoltage: false,
            highCurrent: false,
            overPower: false
        };

        this._runtime.registerPeripheralExtension(extensionId, this);
        this.reset = this.reset.bind(this);
        this._onConnect = this._onConnect.bind(this);
        this._onMessage = this._onMessage.bind(this);
        this._pingDevice = this._pingDevice.bind(this);
    }

    // Property getters for backward compatibility
    get tiltX () { return this._sensors.tiltX; }
    get tiltY () { return this._sensors.tiltY; }
    get color () {
        // Backward compatibility: return color from port C if available, otherwise first available
        return this._sensors.color[BoostPort.C] || 
               Object.values(this._sensors.color)[0] || 
               BoostColor.NONE;
    }
    get previousColor () { return this._sensors.previousColor; }
    get hubStatus () { return this._hubStatus; }

    // Enhanced sensor getters
    getColor (port) { return this._sensors.color[port] || BoostColor.NONE; }
    getDistance (port) { return this._sensors.distance[port] || 0; }
    getReflection (port) { return this._sensors.reflection[port] || 0; }
    getAmbient (port) { return this._sensors.ambient[port] || 0; }
    getForce (port) { return this._sensors.force[port] || 0; }
    isForcePressed (port) { return this._sensors.pressed[port] || false; }

    /**
     * Get motor instance by port
     * @param {number} index - Port index
     * @return {BoostMotor|null} Motor instance or null
     */
    motor (index) {
        return this._motors[index];
    }

    /**
     * Convert color index to color name
     * @param {number} index - Color index from sensor
     * @return {string} Color name
     */
    boostColorForIndex (index) {
        const colorForIndex = Object.keys(BoostColorIndex).find(key => BoostColorIndex[key] === index);
        return colorForIndex || BoostColor.NONE;
    }

    /**
     * Stop all motors immediately
     */
    stopAllMotors () {
        this._motors.forEach(motor => {
            if (motor) {
                motor.turnOff(false); // Don't use rate limiter for emergency stop
            }
        });
    }

    /**
     * Shutdown the hub
     */
    shutdown () {
        if (!this.isConnected()) return;
        const cmd = [0, BoostMessage.HUB_ACTIONS, BoostHubAction.SWITCH_OFF_HUB];
        cmd.unshift(cmd.length + 1);
        this.send(BoostBLE.characteristic, cmd, false);
    }

    /**
     * Set LED color
     * @param {number} inputRGB - RGB color as 24-bit integer
     * @return {Promise} Send operation promise
     */
    setLED (inputRGB) {
        const rgb = [
            (inputRGB >> 16) & 0x000000FF,
            (inputRGB >> 8) & 0x000000FF,
            (inputRGB) & 0x000000FF
        ];

        const ledPortIndex = this._ports.indexOf(BoostIO.LED);
        if (ledPortIndex === -1) return Promise.resolve();

        const cmd = this.generateOutputCommand(
            ledPortIndex,
            BoostOutputExecution.EXECUTE_IMMEDIATELY | BoostOutputExecution.COMMAND_FEEDBACK,
            BoostOutputSubCommand.WRITE_DIRECT_MODE_DATA,
            [BoostMode.LED, ...rgb]
        );

        return this.send(BoostBLE.characteristic, cmd);
    }

    /**
     * Set LED to RGB mode
     * @return {Promise} Send operation promise
     */
    setLEDMode () {
        const ledPortIndex = this._ports.indexOf(BoostIO.LED);
        if (ledPortIndex === -1) return Promise.resolve();

        const cmd = this.generateInputCommand(ledPortIndex, BoostMode.LED, 0, false);
        return this.send(BoostBLE.characteristic, cmd);
    }

    /**
     * Stop all activities (called by runtime)
     */
    stopAll () {
        if (!this.isConnected()) return;
        this.stopAllMotors();
    }

    /**
     * Start scanning for Boost devices
     */
    scan () {
        if (this._ble) {
            this._ble.disconnect();
        }
        this._ble = new BLE(this._runtime, this._extensionId, {
            filters: [{
                services: [BoostBLE.service],
                manufacturerData: {
                    0x0397: {
                        dataPrefix: [0x00, 0x40],
                        mask: [0x00, 0xFF]
                    }
                }
            }],
            optionalServices: []
        }, this._onConnect, this.reset);
    }

    /**
     * Connect to specific device
     * @param {number} id - Device ID
     */
    connect (id) {
        if (this._ble) {
            this._ble.connectPeripheral(id);
        }
    }

    /**
     * Disconnect from current device
     */
    disconnect () {
        if (this._ble) {
            this._ble.disconnect();
        }
        this.reset();
    }

    /**
     * Reset all state
     */
    reset () {
        this._ports = [];
        this._motors = [];
        this._portModes = {};
        this._sensors = {
            tiltX: 0,
            tiltY: 0,
            color: {},
            distance: {},
            reflection: {},
            ambient: {},
            force: {},
            pressed: {},
            previousColor: BoostColor.NONE
        };
        this._colorSamples = [];
        this._hubStatus = {
            batteryLevel: 100,
            buttonPressed: false,
            rssi: 0,
            fwVersion: "0.0.0.0",
            hwVersion: "0.0.0.0",
            lowVoltage: false,
            highCurrent: false,
            overPower: false
        };

        if (this._pingDeviceId) {
            window.clearInterval(this._pingDeviceId);
            this._pingDeviceId = null;
        }
    }

    /**
     * Check if connected to device
     * @return {boolean} Connection status
     */
    isConnected () {
        return this._ble ? this._ble.isConnected() : false;
    }

    /**
     * Send message to device
     * @param {string} uuid - Characteristic UUID
     * @param {Array} message - Message bytes
     * @param {boolean} useLimiter - Whether to use rate limiter
     * @return {Promise} Send operation promise
     */
    send (uuid, message, useLimiter = true) {
        if (!this.isConnected()) return Promise.resolve();

        if (useLimiter && !this._rateLimiter.okayToSend()) {
            return Promise.resolve();
        }

        return this._ble.write(
            BoostBLE.service,
            uuid,
            Base64Util.uint8ArrayToBase64(message),
            'base64'
        );
    }

    /**
     * Generate output command message
     * @param {number} portID - Target port
     * @param {number} execution - Execution flags
     * @param {number} subCommand - Sub-command ID
     * @param {Array} payload - Command payload
     * @return {Array} Complete message
     */
    generateOutputCommand (portID, execution, subCommand, payload) {
        const hubID = 0x00;
        const command = [hubID, BoostMessage.OUTPUT, portID, execution, subCommand, ...payload];
        command.unshift(command.length + 1);
        return command;
    }

    /**
     * Generate input format setup command
     * @param {number} portID - Target port
     * @param {number} mode - Sensor mode
     * @param {number} delta - Change threshold for notifications
     * @param {boolean} enableNotifications - Enable value notifications
     * @return {Array} Complete message
     */
    generateInputCommand (portID, mode, delta, enableNotifications) {
        const command = [
            0x00,
            BoostMessage.PORT_INPUT_FORMAT_SETUP_SINGLE,
            portID,
            mode
        ].concat(numberToInt32Array(delta)).concat([
            enableNotifications ? 1 : 0
        ]);
        command.unshift(command.length + 1);
        return command;
    }

    /**
     * Set sensor input mode with mode switching support
     * @param {number} port - Port number
     * @param {number} mode - Desired mode
     * @return {Promise} Mode switch promise
     */
    async _setInputMode (port, mode) {
        if (this._portModes[port] === mode) return Promise.resolve();
        
        this._portModes[port] = mode;
        const cmd = this.generateInputCommand(port, mode, 1, true);
        await this.send(BoostBLE.characteristic, cmd);
        
        // Wait for mode switch to complete
        return new Promise(resolve => setTimeout(resolve, 50));
    }

    /**
     * Handle successful BLE connection
     * @private
     */
    _onConnect () {
        this._ble.startNotifications(
            BoostBLE.service,
            BoostBLE.characteristic,
            this._onMessage
        );
        this._pingDeviceId = window.setInterval(this._pingDevice, BoostPingInterval);

        // Request firmware version to determine port mapping
        setTimeout(() => {
            const command = [
                0x00,
                BoostMessage.HUB_PROPERTIES,
                BoostHubProperty.FW_VERSION,
                BoostHubPropertyOperation.REQUEST_UPDATE
            ];
            command.unshift(command.length + 1);
            this.send(BoostBLE.characteristic, command, false);
        }, 500);

        // Enable comprehensive hub status monitoring
        const statusCommands = [
            [BoostMessage.HUB_PROPERTIES, BoostHubProperty.HW_VERSION, BoostHubPropertyOperation.REQUEST_UPDATE],
            [BoostMessage.HUB_PROPERTIES, BoostHubProperty.BATTERY_VOLTAGE, BoostHubPropertyOperation.ENABLE_UPDATES],
            [BoostMessage.HUB_PROPERTIES, BoostHubProperty.BUTTON, BoostHubPropertyOperation.ENABLE_UPDATES],
            [BoostMessage.HUB_PROPERTIES, BoostHubProperty.RSSI, BoostHubPropertyOperation.ENABLE_UPDATES],
            [BoostMessage.HUB_ALERTS, BoostAlert.LOW_VOLTAGE, BoostAlertOperation.ENABLE_UPDATES],
            [BoostMessage.HUB_ALERTS, BoostAlert.HIGH_CURRENT, BoostAlertOperation.ENABLE_UPDATES],
            [BoostMessage.HUB_ALERTS, BoostAlert.OVER_POWER_CONDITION, BoostAlertOperation.ENABLE_UPDATES]
        ];

        statusCommands.forEach(cmdData => {
            const cmd = [0, ...cmdData];
            cmd.unshift(cmd.length + 1);
            this.send(BoostBLE.characteristic, cmd, false);
        });
    }

    /**
     * Handle incoming BLE messages
     * @param {string} base64 - Base64 encoded message
     * @private
     */
    _onMessage (base64) {
        const data = Base64Util.base64ToUint8Array(base64);
        const messageType = data[2];
        const portID = data[3];

        switch (messageType) {
        case BoostMessage.HUB_PROPERTIES: {
            const property = data[3];
            const operation = data[4];
            
            if (operation !== BoostHubPropertyOperation.UPDATE) break;
            
            switch (property) {
            case BoostHubProperty.FW_VERSION: {
                // Determine port mapping based on firmware version
                const fwVersion10000224 = int32ArrayToNumber([0x24, 0x02, 0x00, 0x10]);
                const fwHub = int32ArrayToNumber(data.slice(5, 9));
                if (fwHub < fwVersion10000224) {
                    BoostPort = BoostPort10000223OrOlder;
                    log.info('Move Hub firmware older than version 1.0.00.0224 detected. Using old port mapping.');
                } else {
                    BoostPort = BoostPort10000224OrNewer;
                }
                this._hubStatus.fwVersion = decodeVersion(fwHub);
                break;
            }
            case BoostHubProperty.HW_VERSION: {
                const hwVersion = int32ArrayToNumber(data.slice(5, 9));
                this._hubStatus.hwVersion = decodeVersion(hwVersion);
                break;
            }
            case BoostHubProperty.BATTERY_VOLTAGE:
                this._hubStatus.batteryLevel = data[5];
                break;
            case BoostHubProperty.BUTTON:
                this._hubStatus.buttonPressed = (data[5] === 1);
                break;
            case BoostHubProperty.RSSI:
                // Handle potential missing readInt8 method
                this._hubStatus.rssi = data.readInt8 ? data.readInt8(5) : data[5];
                break;
            }
            break;
        }

        case BoostMessage.HUB_ALERTS: {
            const alertType = data[3];
            const operation = data[4];
            
            if (operation !== BoostAlertOperation.UPDATE) break;
            
            const status = data[5] === 0xFF;
            switch (alertType) {
            case BoostAlert.LOW_VOLTAGE:
                this._hubStatus.lowVoltage = status;
                break;
            case BoostAlert.HIGH_CURRENT:
                this._hubStatus.highCurrent = status;
                break;
            case BoostAlert.OVER_POWER_CONDITION:
                this._hubStatus.overPower = status;
                break;
            }
            break;
        }

        case BoostMessage.HUB_ATTACHED_IO: {
            const event = data[4];
            const typeId = data[5];

            switch (event) {
            case BoostIOEvent.ATTACHED:
                this._registerSensorOrMotor(portID, typeId);
                break;
            case BoostIOEvent.DETACHED:
                this._clearPort(portID);
                break;
            case BoostIOEvent.ATTACHED_VIRTUAL:
            default:
                // Handle virtual ports if needed
                break;
            }
            break;
        }

        case BoostMessage.PORT_VALUE: {
            const type = this._ports[portID];
            const mode = this._portModes[portID];

            switch (type) {
            case BoostIO.TILT:
                this._sensors.tiltX = data[4];
                this._sensors.tiltY = data[5];
                break;
                
            case BoostIO.COLOR:
                if (mode === BoostMode.COLOR) {
                    // Advanced color detection with sampling for stability
                    this._colorSamples.unshift(data[4]);
                    if (this._colorSamples.length > BoostColorSampleSize) {
                        this._colorSamples.pop();
                        if (this._colorSamples.every((v, i, arr) => v === arr[0])) {
                            this._sensors.previousColor = this._sensors.color[portID] || BoostColor.NONE;
                            this._sensors.color[portID] = this.boostColorForIndex(this._colorSamples[0]);
                        } else {
                            this._sensors.color[portID] = BoostColor.NONE;
                        }
                    } else {
                        this._sensors.color[portID] = BoostColor.NONE;
                    }
                } else if (mode === BoostMode.DISTANCE) {
                    this._sensors.distance[portID] = data[4] * 10; // Convert to mm
                } else if (mode === BoostMode.REFLECTION) {
                    this._sensors.reflection[portID] = data[4];
                } else if (mode === BoostMode.AMBIENT) {
                    this._sensors.ambient[portID] = data[4];
                }
                break;
                
            case BoostIO.TECHNIC_FORCE_SENSOR:
                if (mode === BoostMode.FORCE) {
                    this._sensors.force[portID] = data[4] / 10; // Convert to Newtons
                } else if (mode === BoostMode.TOUCHED) {
                    this._sensors.pressed[portID] = (data[4] > 0);
                }
                break;
                
            case BoostIO.MOTOREXT:
            case BoostIO.MOTORINT:
                if (this.motor(portID)) {
                    this.motor(portID).position = int32ArrayToNumber(data.slice(4, 8));
                }
                break;
                
            case BoostIO.CURRENT:
            case BoostIO.VOLTAGE:
            case BoostIO.LED:
                // These don't require special handling
                break;
                
            default:
                log.warn(`Unknown sensor value! Type: ${type}`);
            }
            break;
        }

        case BoostMessage.PORT_FEEDBACK: {
            const feedback = data[4];
            const motor = this.motor(portID);
            if (motor) {
                const isBusy = feedback & BoostPortFeedback.IN_PROGRESS;
                const commandCompleted = feedback & (BoostPortFeedback.COMPLETED | BoostPortFeedback.DISCARDED);
                if (!isBusy && commandCompleted) {
                    if (motor.status === BoostMotorState.ON_FOR_ROTATION) {
                        motor.status = BoostMotorState.OFF;
                    }
                }
            }
            break;
        }

        case BoostMessage.ERROR:
            log.warn(`Error reported by hub: ${Array.from(data)}`);
            break;
        }
    }

    /**
     * Ping device to maintain connection
     * @private
     */
    _pingDevice () {
        this._ble.read(
            BoostBLE.service,
            BoostBLE.characteristic,
            false
        );
    }

    /**
     * Register new sensor or motor
     * @param {number} portID - Port where device is connected
     * @param {number} type - Device type ID
     * @private
     */
    _registerSensorOrMotor (portID, type) {
        this._ports[portID] = type;

        // Create motor instances for motor devices
        if (type === BoostIO.MOTORINT || type === BoostIO.MOTOREXT) {
            this._motors[portID] = new BoostMotor(this, portID);
        }

        // Configure sensor modes and initial settings
        let mode = null;
        let delta = 1;

        switch (type) {
        case BoostIO.MOTORINT:
        case BoostIO.MOTOREXT:
            mode = BoostMode.MOTOR_SENSOR;
            break;
        case BoostIO.COLOR:
            mode = BoostMode.COLOR;
            delta = 0; // Immediate notification for color changes
            break;
        case BoostIO.TECHNIC_FORCE_SENSOR:
            mode = BoostMode.FORCE;
            break;
        case BoostIO.LED:
            mode = BoostMode.LED;
            // Set LED to blue to indicate successful connection
            this.setLEDMode();
            this.setLED(0x0000FF);
            break;
        case BoostIO.TILT:
            mode = BoostMode.TILT;
            break;
        default:
            mode = BoostMode.UNKNOWN;
        }

        const cmd = this.generateInputCommand(portID, mode, delta, true);
        this.send(BoostBLE.characteristic, cmd);
    }

    /**
     * Clear port when device is disconnected
     * @param {number} portID - Port to clear
     * @private
     */
    _clearPort (portID) {
        const type = this._ports[portID];
        
        // Clear sensor data
        if (type === BoostIO.TILT) {
            this._sensors.tiltX = this._sensors.tiltY = 0;
        }
        if (type === BoostIO.COLOR) {
            delete this._sensors.color[portID];
            delete this._sensors.distance[portID];
            delete this._sensors.reflection[portID];
            delete this._sensors.ambient[portID];
        }
        if (type === BoostIO.TECHNIC_FORCE_SENSOR) {
            delete this._sensors.force[portID];
            delete this._sensors.pressed[portID];
        }
        
        // Clear port assignments
        this._ports[portID] = 'none';
        this._motors[portID] = null;
        delete this._portModes[portID];
    }
}

// ============================================================================
// SCRATCH EXTENSION CLASS
// ============================================================================

/**
 * Enum for motor specification in blocks
 * @readonly
 */
const BoostMotorLabel = {
    A: 'A', B: 'B', C: 'C', D: 'D', AB: 'AB', ALL: 'ALL'
};

const BoostMotorDirection = {
    FORWARD: 'this way', BACKWARD: 'that way', REVERSE: 'reverse'
};

const BoostTiltDirection = {
    UP: 'up', DOWN: 'down', LEFT: 'left', RIGHT: 'right', ANY: 'any'
};

/**
 * Main Scratch extension class with comprehensive Boost support
 */
class Scratch3BoostBlocks {
    static get EXTENSION_ID () {
        return 'legoboost';
    }

    static get TILT_THRESHOLD () {
        return 15;
    }

    constructor (runtime) {
        this.runtime = runtime;
        this._peripheral = new Boost(this.runtime, Scratch3BoostBlocks.EXTENSION_ID);
    }

    getInfo () {
        return {
            id: Scratch3BoostBlocks.EXTENSION_ID,
            name: 'legoboost Enhanced',
            blockIconURI: iconURI,
            showStatusButton: true,
            blocks: [
                // Basic motor control
                {
                    opcode: 'motorOnFor',
                    text: formatMessage({
                        id: 'legoboost.motorOnFor',
                        default: 'turn motor [MOTOR_ID] for [DURATION] seconds',
                        description: 'turn a motor on for some time'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MOTOR_ID: {
                            type: ArgumentType.STRING,
                            menu: 'MOTOR_ID',
                            defaultValue: BoostMotorLabel.A
                        },
                        DURATION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'motorOnForRotation',
                    text: formatMessage({
                        id: 'legoboost.motorOnForRotation',
                        default: 'turn motor [MOTOR_ID] for [ROTATION] rotations',
                        description: 'turn a motor on for rotation'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MOTOR_ID: {
                            type: ArgumentType.STRING,
                            menu: 'MOTOR_ID',
                            defaultValue: BoostMotorLabel.A
                        },
                        ROTATION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'motorRunToPosition',
                    text: formatMessage({
                        id: 'legoboost.motorRunToPosition',
                        default: 'turn motor [MOTOR_ID] to position [POSITION]',
                        description: 'turn a motor to absolute position'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MOTOR_ID: {
                            type: ArgumentType.STRING,
                            menu: 'MOTOR_ID_SINGLE',
                            defaultValue: BoostMotorLabel.A
                        },
                        POSITION: {
                            type: ArgumentType.ANGLE,
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'motorOn',
                    text: formatMessage({
                        id: 'legoboost.motorOn',
                        default: 'turn motor [MOTOR_ID] on',
                        description: 'turn a motor on indefinitely'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MOTOR_ID: {
                            type: ArgumentType.STRING,
                            menu: 'MOTOR_ID',
                            defaultValue: BoostMotorLabel.A
                        }
                    }
                },
                {
                    opcode: 'motorOff',
                    text: formatMessage({
                        id: 'legoboost.motorOff',
                        default: 'turn motor [MOTOR_ID] off',
                        description: 'turn a motor off'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MOTOR_ID: {
                            type: ArgumentType.STRING,
                            menu: 'MOTOR_ID',
                            defaultValue: BoostMotorLabel.A
                        }
                    }
                },
                
                '---', // Separator

                // Advanced motor control
                {
                    opcode: 'setMotorPower',
                    text: formatMessage({
                        id: 'legoboost.setMotorPower',
                        default: 'set motor [MOTOR_ID] speed to [POWER] %',
                        description: 'set the motor speed without turning it on'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MOTOR_ID: {
                            type: ArgumentType.STRING,
                            menu: 'MOTOR_ID',
                            defaultValue: BoostMotorLabel.ALL
                        },
                        POWER: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    }
                },
                {
                    opcode: 'setMotorDirection',
                    text: formatMessage({
                        id: 'legoboost.setMotorDirection',
                        default: 'set motor [MOTOR_ID] direction [MOTOR_DIRECTION]',
                        description: 'set the motor turn direction without turning it on'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MOTOR_ID: {
                            type: ArgumentType.STRING,
                            menu: 'MOTOR_ID',
                            defaultValue: BoostMotorLabel.A
                        },
                        MOTOR_DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'MOTOR_DIRECTION',
                            defaultValue: BoostMotorDirection.FORWARD
                        }
                    }
                },
                {
                    opcode: 'setMotorStopAction',
                    text: formatMessage({
                        id: 'legoboost.setMotorStopAction',
                        default: 'set motor [MOTOR_ID] stop action to [ACTION]',
                        description: 'set how the motor stops'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MOTOR_ID: {
                            type: ArgumentType.STRING,
                            menu: 'MOTOR_ID',
                            defaultValue: BoostMotorLabel.A
                        },
                        ACTION: {
                            type: ArgumentType.STRING,
                            menu: 'STOP_ACTION',
                            defaultValue: 'brake'
                        }
                    }
                },
                {
                    opcode: 'setMotorAcceleration',
                    text: formatMessage({
                        id: 'legoboost.setMotorAcceleration',
                        default: 'set motor [MOTOR_ID] acceleration to [TIME] ms',
                        description: 'set motor acceleration time'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MOTOR_ID: {
                            type: ArgumentType.STRING,
                            menu: 'MOTOR_ID',
                            defaultValue: BoostMotorLabel.A
                        },
                        TIME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 300
                        }
                    }
                },
                {
                    opcode: 'setMotorDeceleration',
                    text: formatMessage({
                        id: 'legoboost.setMotorDeceleration',
                        default: 'set motor [MOTOR_ID] deceleration to [TIME] ms',
                        description: 'set motor deceleration time'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MOTOR_ID: {
                            type: ArgumentType.STRING,
                            menu: 'MOTOR_ID',
                            defaultValue: BoostMotorLabel.A
                        },
                        TIME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 300
                        }
                    }
                },
                {
                    opcode: 'resetMotorPosition',
                    text: formatMessage({
                        id: 'legoboost.resetMotorPosition',
                        default: 'reset motor [MOTOR_ID] position to [POSITION]',
                        description: 'reset motor position counter'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MOTOR_ID: {
                            type: ArgumentType.STRING,
                            menu: 'MOTOR_ID',
                            defaultValue: BoostMotorLabel.A
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
                        id: 'legoboost.getMotorPosition',
                        default: 'motor [MOTOR_REPORTER_ID] position',
                        description: 'the position returned by the motor'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        MOTOR_REPORTER_ID: {
                            type: ArgumentType.STRING,
                            menu: 'MOTOR_REPORTER_ID',
                            defaultValue: BoostMotorLabel.A
                        }
                    }
                },

                '---', // Separator

                // Color and distance sensor
                {
                    opcode: 'whenColor',
                    text: formatMessage({
                        id: 'legoboost.whenColor',
                        default: 'when [PORT] sees [COLOR] brick',
                        description: 'check for when color'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'SENSOR_PORTS',
                            defaultValue: 'C'
                        },
                        COLOR: {
                            type: ArgumentType.STRING,
                            menu: 'COLOR',
                            defaultValue: BoostColor.ANY
                        }
                    }
                },
                {
                    opcode: 'seeingColor',
                    text: formatMessage({
                        id: 'legoboost.seeingColor',
                        default: '[PORT] seeing [COLOR] brick?',
                        description: 'is the color sensor seeing a certain color?'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'SENSOR_PORTS',
                            defaultValue: 'C'
                        },
                        COLOR: {
                            type: ArgumentType.STRING,
                            menu: 'COLOR',
                            defaultValue: BoostColor.ANY
                        }
                    }
                },
                {
                    opcode: 'getDistance',
                    text: formatMessage({
                        id: 'legoboost.getDistance',
                        default: '[PORT] distance (mm)',
                        description: 'distance from color/distance sensor'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'SENSOR_PORTS',
                            defaultValue: 'C'
                        }
                    }
                },
                {
                    opcode: 'getReflection',
                    text: formatMessage({
                        id: 'legoboost.getReflection',
                        default: '[PORT] reflection (%)',
                        description: 'reflection from color/distance sensor'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'SENSOR_PORTS',
                            defaultValue: 'C'
                        }
                    }
                },

                '---', // Separator

                // Force sensor
                {
                    opcode: 'getForce',
                    text: formatMessage({
                        id: 'legoboost.getForce',
                        default: '[PORT] force (N)',
                        description: 'force from force sensor'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'SENSOR_PORTS',
                            defaultValue: 'C'
                        }
                    }
                },
                {
                    opcode: 'isForceSensorPressed',
                    text: formatMessage({
                        id: 'legoboost.isForceSensorPressed',
                        default: '[PORT] force sensor pressed?',
                        description: 'is force sensor pressed'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'SENSOR_PORTS',
                            defaultValue: 'C'
                        }
                    }
                },
                {
                    opcode: 'whenForceSensorPressed',
                    text: formatMessage({
                        id: 'legoboost.whenForceSensorPressed',
                        default: 'when [PORT] force sensor pressed',
                        description: 'when force sensor is pressed'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'SENSOR_PORTS',
                            defaultValue: 'C'
                        }
                    }
                },

                '---', // Separator

                // Tilt sensor
                {
                    opcode: 'whenTilted',
                    text: formatMessage({
                        id: 'legoboost.whenTilted',
                        default: 'when tilted [TILT_DIRECTION_ANY]',
                        description: 'check when tilted in a certain direction'
                    }),
                    func: 'isTilted',
                    blockType: BlockType.HAT,
                    arguments: {
                        TILT_DIRECTION_ANY: {
                            type: ArgumentType.STRING,
                            menu: 'TILT_DIRECTION_ANY',
                            defaultValue: BoostTiltDirection.ANY
                        }
                    }
                },
                {
                    opcode: 'isTilted',
                    text: formatMessage({
                        id: 'legoboost.isTilted',
                        default: 'tilted [TILT_DIRECTION_ANY]?',
                        description: 'is the hub tilted in a direction'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        TILT_DIRECTION_ANY: {
                            type: ArgumentType.STRING,
                            menu: 'TILT_DIRECTION_ANY',
                            defaultValue: BoostTiltDirection.ANY
                        }
                    }
                },
                {
                    opcode: 'getTiltAngle',
                    text: formatMessage({
                        id: 'legoboost.getTiltAngle',
                        default: 'tilt angle [TILT_DIRECTION]',
                        description: 'the angle returned by the tilt sensor'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        TILT_DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'TILT_DIRECTION',
                            defaultValue: BoostTiltDirection.UP
                        }
                    }
                },

                '---', // Separator

                // Hub control and monitoring
                {
                    opcode: 'setLightHue',
                    text: formatMessage({
                        id: 'legoboost.setLightHue',
                        default: 'set light color to [HUE]',
                        description: 'set the LED color'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        HUE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50
                        }
                    }
                },
                {
                    opcode: 'shutdown',
                    text: formatMessage({
                        id: 'legoboost.shutdown',
                        default: 'shutdown hub',
                        description: 'turn off the hub'
                    }),
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'whenButtonPressed',
                    text: formatMessage({
                        id: 'legoboost.whenButtonPressed',
                        default: 'when hub button pressed',
                        description: 'when the hub button is pressed'
                    }),
                    blockType: BlockType.HAT
                },
                {
                    opcode: 'isButtonPressed',
                    text: formatMessage({
                        id: 'legoboost.isButtonPressed',
                        default: 'hub button pressed?',
                        description: 'is the hub button pressed'
                    }),
                    blockType: BlockType.BOOLEAN
                },
                {
                    opcode: 'getBatteryLevel',
                    text: formatMessage({
                        id: 'legoboost.getBatteryLevel',
                        default: 'battery level (%)',
                        description: 'the hub battery level'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getFirmwareVersion',
                    text: formatMessage({
                        id: 'legoboost.getFirmwareVersion',
                        default: 'firmware version',
                        description: 'the hub firmware version'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getRSSI',
                    text: formatMessage({
                        id: 'legoboost.getRSSI',
                        default: 'Bluetooth signal strength',
                        description: 'the Bluetooth signal strength'
                    }),
                    blockType: BlockType.REPORTER
                },

                '---', // Separator

                // Hub alerts
                {
                    opcode: 'whenBatteryLow',
                    text: formatMessage({
                        id: 'legoboost.whenBatteryLow',
                        default: 'when battery is low',
                        description: 'when the battery voltage is low'
                    }),
                    blockType: BlockType.HAT
                },
                {
                    opcode: 'whenMotorOverloaded',
                    text: formatMessage({
                        id: 'legoboost.whenMotorOverloaded',
                        default: 'when motor overloaded',
                        description: 'when a motor is drawing too much current'
                    }),
                    blockType: BlockType.HAT
                }
            ],
            menus: {
                MOTOR_ID: {
                    acceptReporters: true,
                    items: [
                        { text: 'A', value: BoostMotorLabel.A },
                        { text: 'B', value: BoostMotorLabel.B },
                        { text: 'C', value: BoostMotorLabel.C },
                        { text: 'D', value: BoostMotorLabel.D },
                        { text: 'AB', value: BoostMotorLabel.AB },
                        { text: 'ALL', value: BoostMotorLabel.ALL }
                    ]
                },
                MOTOR_ID_SINGLE: {
                    acceptReporters: true,
                    items: [
                        { text: 'A', value: BoostMotorLabel.A },
                        { text: 'B', value: BoostMotorLabel.B },
                        { text: 'C', value: BoostMotorLabel.C },
                        { text: 'D', value: BoostMotorLabel.D }
                    ]
                },
                MOTOR_REPORTER_ID: {
                    acceptReporters: true,
                    items: [
                        { text: 'A', value: BoostMotorLabel.A },
                        { text: 'B', value: BoostMotorLabel.B },
                        { text: 'C', value: BoostMotorLabel.C },
                        { text: 'D', value: BoostMotorLabel.D }
                    ]
                },
                SENSOR_PORTS: {
                    acceptReporters: true,
                    items: [
                        { text: 'A', value: 'A' },
                        { text: 'B', value: 'B' },
                        { text: 'C', value: 'C' },
                        { text: 'D', value: 'D' }
                    ]
                },
                STOP_ACTION: {
                    acceptReporters: true,
                    items: [
                        {
                            text: formatMessage({
                                id: 'legoboost.stopAction.float',
                                default: 'float',
                                description: 'motor stop action'
                            }),
                            value: 'float'
                        },
                        {
                            text: formatMessage({
                                id: 'legoboost.stopAction.brake',
                                default: 'brake',
                                description: 'motor stop action'
                            }),
                            value: 'brake'
                        },
                        {
                            text: formatMessage({
                                id: 'legoboost.stopAction.hold',
                                default: 'hold',
                                description: 'motor stop action'
                            }),
                            value: 'hold'
                        }
                    ]
                },
                MOTOR_DIRECTION: {
                    acceptReporters: true,
                    items: [
                        {
                            text: formatMessage({
                                id: 'legoboost.motorDirection.forward',
                                default: 'this way',
                                description: 'label for forward element in motor direction menu'
                            }),
                            value: BoostMotorDirection.FORWARD
                        },
                        {
                            text: formatMessage({
                                id: 'legoboost.motorDirection.backward',
                                default: 'that way',
                                description: 'label for backward element in motor direction menu'
                            }),
                            value: BoostMotorDirection.BACKWARD
                        },
                        {
                            text: formatMessage({
                                id: 'legoboost.motorDirection.reverse',
                                default: 'reverse',
                                description: 'label for reverse element in motor direction menu'
                            }),
                            value: BoostMotorDirection.REVERSE
                        }
                    ]
                },
                TILT_DIRECTION: {
                    acceptReporters: true,
                    items: [
                        {
                            text: formatMessage({
                                id: 'legoboost.tiltDirection.up',
                                default: 'up',
                                description: 'label for up element in tilt direction menu'
                            }),
                            value: BoostTiltDirection.UP
                        },
                        {
                            text: formatMessage({
                                id: 'legoboost.tiltDirection.down',
                                default: 'down',
                                description: 'label for down element in tilt direction menu'
                            }),
                            value: BoostTiltDirection.DOWN
                        },
                        {
                            text: formatMessage({
                                id: 'legoboost.tiltDirection.left',
                                default: 'left',
                                description: 'label for left element in tilt direction menu'
                            }),
                            value: BoostTiltDirection.LEFT
                        },
                        {
                            text: formatMessage({
                                id: 'legoboost.tiltDirection.right',
                                default: 'right',
                                description: 'label for right element in tilt direction menu'
                            }),
                            value: BoostTiltDirection.RIGHT
                        }
                    ]
                },
                TILT_DIRECTION_ANY: {
                    acceptReporters: true,
                    items: [
                        {
                            text: formatMessage({
                                id: 'legoboost.tiltDirection.up',
                                default: 'up'
                            }),
                            value: BoostTiltDirection.UP
                        },
                        {
                            text: formatMessage({
                                id: 'legoboost.tiltDirection.down',
                                default: 'down'
                            }),
                            value: BoostTiltDirection.DOWN
                        },
                        {
                            text: formatMessage({
                                id: 'legoboost.tiltDirection.left',
                                default: 'left'
                            }),
                            value: BoostTiltDirection.LEFT
                        },
                        {
                            text: formatMessage({
                                id: 'legoboost.tiltDirection.right',
                                default: 'right'
                            }),
                            value: BoostTiltDirection.RIGHT
                        },
                        {
                            text: formatMessage({
                                id: 'legoboost.tiltDirection.any',
                                default: 'any',
                                description: 'label for any element in tilt direction menu'
                            }),
                            value: BoostTiltDirection.ANY
                        }
                    ]
                },
                COLOR: {
                    acceptReporters: true,
                    items: [
                        {
                            text: formatMessage({
                                id: 'legoboost.color.red',
                                default: 'red',
                                description: 'the color red'
                            }),
                            value: BoostColor.RED
                        },
                        {
                            text: formatMessage({
                                id: 'legoboost.color.blue',
                                default: 'blue',
                                description: 'the color blue'
                            }),
                            value: BoostColor.BLUE
                        },
                        {
                            text: formatMessage({
                                id: 'legoboost.color.green',
                                default: 'green',
                                description: 'the color green'
                            }),
                            value: BoostColor.GREEN
                        },
                        {
                            text: formatMessage({
                                id: 'legoboost.color.yellow',
                                default: 'yellow',
                                description: 'the color yellow'
                            }),
                            value: BoostColor.YELLOW
                        },
                        {
                            text: formatMessage({
                                id: 'legoboost.color.white',
                                default: 'white',
                                description: 'the color white'
                            }),
                            value: BoostColor.WHITE
                        },
                        {
                            text: formatMessage({
                                id: 'legoboost.color.black',
                                default: 'black',
                                description: 'the color black'
                            }),
                            value: BoostColor.BLACK
                        },
                        {
                            text: formatMessage({
                                id: 'legoboost.color.any',
                                default: 'any color',
                                description: 'any color'
                            }),
                            value: BoostColor.ANY
                        }
                    ]
                }
            }
        };
    }

    // ========================================================================
    // UTILITY METHODS
    // ========================================================================

    /**
     * Get port ID from motor/sensor label
     * @param {string} label - Motor or sensor label
     * @return {number|null} Port ID or null if invalid
     */
    _getPortFromLabel (label) {
        switch (label) {
        case 'A': return BoostPort.A;
        case 'B': return BoostPort.B;
        case 'C': return BoostPort.C;
        case 'D': return BoostPort.D;
        default: return null;
        }
    }

    /**
     * Execute callback for each motor specified by motor ID
     * @param {string} motorID - Motor specification
     * @param {Function} callback - Function to call for each motor
     */
    _forEachMotor (motorID, callback) {
        let motors;
        switch (motorID) {
        case BoostMotorLabel.A:
            motors = [BoostPort.A];
            break;
        case BoostMotorLabel.B:
            motors = [BoostPort.B];
            break;
        case BoostMotorLabel.C:
            motors = [BoostPort.C];
            break;
        case BoostMotorLabel.D:
            motors = [BoostPort.D];
            break;
        case BoostMotorLabel.AB:
            motors = [BoostPort.A, BoostPort.B];
            break;
        case BoostMotorLabel.ALL:
            motors = [BoostPort.A, BoostPort.B, BoostPort.C, BoostPort.D];
            break;
        default:
            log.warn(`Invalid motor ID: ${motorID}`);
            motors = [];
            break;
        }
        for (const index of motors) {
            callback(index);
        }
    }

    // ========================================================================
    // MOTOR CONTROL BLOCKS
    // ========================================================================

    /**
     * Turn specified motor(s) on for a specified duration
     */
    motorOnFor (args) {
        let durationMS = Cast.toNumber(args.DURATION) * 1000;
        durationMS = MathUtil.clamp(durationMS, 0, 15000);
        
        return new Promise(resolve => {
            this._forEachMotor(args.MOTOR_ID, motorIndex => {
                const motor = this._peripheral.motor(motorIndex);
                if (motor) motor.turnOnFor(durationMS);
            });
            // Resolve after duration even if no motors connected
            setTimeout(resolve, durationMS);
        });
    }

    /**
     * Turn specified motor(s) on for a specified rotation
     */
    motorOnForRotation (args) {
        let degrees = Cast.toNumber(args.ROTATION) * 360;
        const sign = Math.sign(degrees);
        degrees = Math.abs(MathUtil.clamp(degrees, -360000, 360000));

        const motors = [];
        this._forEachMotor(args.MOTOR_ID, motorIndex => {
            motors.push(motorIndex);
        });

        const promises = motors.map(portID => {
            const motor = this._peripheral.motor(portID);
            if (motor) {
                if (motor.power === 0) return Promise.resolve();
                return new Promise(resolve => {
                    motor.turnOnForDegrees(degrees, sign);
                    motor.pendingRotationPromise = resolve;
                });
            }
            return null;
        });
        
        return Promise.all(promises).then(() => {});
    }

    /**
     * Turn motor to absolute position
     */
    motorRunToPosition (args) {
        const position = Cast.toNumber(args.POSITION);
        const promises = [];
        
        this._forEachMotor(args.MOTOR_ID, motorIndex => {
            const motor = this._peripheral.motor(motorIndex);
            if (motor) {
                promises.push(new Promise(resolve => {
                    motor.turnToPosition(position);
                    motor.pendingRotationPromise = resolve;
                }));
            }
        });
        
        return Promise.all(promises).then(() => {});
    }

    /**
     * Turn specified motor(s) on indefinitely
     */
    motorOn (args) {
        this._forEachMotor(args.MOTOR_ID, motorIndex => {
            const motor = this._peripheral.motor(motorIndex);
            if (motor) motor.turnOnForever();
        });

        return new Promise(resolve => {
            window.setTimeout(() => {
                resolve();
            }, BoostBLE.sendInterval);
        });
    }

    /**
     * Turn specified motor(s) off
     */
    motorOff (args) {
        this._forEachMotor(args.MOTOR_ID, motorIndex => {
            const motor = this._peripheral.motor(motorIndex);
            if (motor) motor.turnOff();
        });

        return new Promise(resolve => {
            window.setTimeout(() => {
                resolve();
            }, BoostBLE.sendInterval);
        });
    }

    /**
     * Set the power level of specified motor(s)
     */
    setMotorPower (args) {
        this._forEachMotor(args.MOTOR_ID, motorIndex => {
            const motor = this._peripheral.motor(motorIndex);
            if (motor) {
                motor.power = MathUtil.clamp(Cast.toNumber(args.POWER), 0, 100);
                // Update running motors
                switch (motor.status) {
                case BoostMotorState.ON_FOREVER:
                    motor.turnOnForever();
                    break;
                case BoostMotorState.ON_FOR_TIME:
                    motor.turnOnFor(motor.pendingDurationTimeoutStartTime +
                        motor.pendingDurationTimeoutDelay - Date.now());
                    break;
                }
            }
        });
        
        return new Promise(resolve => {
            window.setTimeout(() => {
                resolve();
            }, BoostBLE.sendInterval);
        });
    }

    /**
     * Set the direction of rotation for specified motor(s)
     */
    setMotorDirection (args) {
        this._forEachMotor(args.MOTOR_ID, motorIndex => {
            const motor = this._peripheral.motor(motorIndex);
            if (motor) {
                switch (args.MOTOR_DIRECTION) {
                case BoostMotorDirection.FORWARD:
                    motor.direction = 1;
                    break;
                case BoostMotorDirection.BACKWARD:
                    motor.direction = -1;
                    break;
                case BoostMotorDirection.REVERSE:
                    motor.direction = -motor.direction;
                    break;
                default:
                    log.warn(`Unknown motor direction in setMotorDirection: ${args.MOTOR_DIRECTION}`);
                    break;
                }
                
                // Update running motors
                switch (motor.status) {
                case BoostMotorState.ON_FOREVER:
                    motor.turnOnForever();
                    break;
                case BoostMotorState.ON_FOR_TIME:
                    motor.turnOnFor(motor.pendingDurationTimeoutStartTime +
                        motor.pendingDurationTimeoutDelay - Date.now());
                    break;
                }
            }
        });
        
        return new Promise(resolve => {
            window.setTimeout(() => {
                resolve();
            }, BoostBLE.sendInterval);
        });
    }

    /**
     * Set motor stop action (float, brake, hold)
     */
    setMotorStopAction (args) {
        const stopModeMap = {
            float: BoostMotorEndState.FLOAT,
            brake: BoostMotorEndState.BRAKE,
            hold: BoostMotorEndState.HOLD
        };
        const action = stopModeMap[args.ACTION] || BoostMotorEndState.BRAKE;
        
        this._forEachMotor(args.MOTOR_ID, motorIndex => {
            const motor = this._peripheral.motor(motorIndex);
            if (motor) {
                motor.stopMode = action;
            }
        });
    }

    /**
     * Set motor acceleration time
     */
    setMotorAcceleration (args) {
        const time = Cast.toNumber(args.TIME);
        this._forEachMotor(args.MOTOR_ID, motorIndex => {
            const motor = this._peripheral.motor(motorIndex);
            if (motor) {
                motor.setAcceleration(time);
            }
        });
    }

    /**
     * Set motor deceleration time
     */
    setMotorDeceleration (args) {
        const time = Cast.toNumber(args.TIME);
        this._forEachMotor(args.MOTOR_ID, motorIndex => {
            const motor = this._peripheral.motor(motorIndex);
            if (motor) {
                motor.setDeceleration(time);
            }
        });
    }

    /**
     * Reset motor position
     */
    resetMotorPosition (args) {
        const position = Cast.toNumber(args.POSITION);
        this._forEachMotor(args.MOTOR_ID, motorIndex => {
            const motor = this._peripheral.motor(motorIndex);
            if (motor) {
                motor.resetPosition(position);
            }
        });
    }

    /**
     * Get motor position
     */
    getMotorPosition (args) {
        let portID = null;
        switch (args.MOTOR_REPORTER_ID) {
        case BoostMotorLabel.A:
            portID = BoostPort.A;
            break;
        case BoostMotorLabel.B:
            portID = BoostPort.B;
            break;
        case BoostMotorLabel.C:
            portID = BoostPort.C;
            break;
        case BoostMotorLabel.D:
            portID = BoostPort.D;
            break;
        default:
            log.warn('Asked for a motor position that doesnt exist!');
            return 0;
        }
        
        if (portID !== null && this._peripheral.motor(portID)) {
            let val = this._peripheral.motor(portID).position;
            // Boost motor A position direction is reversed by design
            if (portID === BoostPort.A) {
                val *= -1;
            }
            return MathUtil.wrapClamp(val, 0, 360);
        }
        return 0;
    }

    // ========================================================================
    // SENSOR BLOCKS
    // ========================================================================

    /**
     * Check color sensor for specific color with port support
     */
    async _checkColor (args) {
        const port = this._getPortFromLabel(args.PORT);
        if (port === null) return false;
        
        // Switch to color mode
        await this._peripheral._setInputMode(port, BoostMode.COLOR);
        
        const currentColor = this._peripheral.getColor(port);
        if (args.COLOR === BoostColor.ANY) {
            return currentColor !== BoostColor.NONE;
        }
        return currentColor === args.COLOR;
    }

    /**
     * When color detected (hat block)
     */
    whenColor (args) {
        // For backward compatibility, also check global color property
        if (args.COLOR === BoostColor.ANY) {
            return this._peripheral.color !== BoostColor.NONE &&
                this._peripheral.color !== this._peripheral.previousColor;
        }
        return args.COLOR === this._peripheral.color || this._checkColor(args);
    }

    /**
     * Check if seeing specific color (boolean block)
     */
    seeingColor (args) {
        return this._checkColor(args);
    }

    /**
     * Get distance from color/distance sensor
     */
    async getDistance (args) {
        const port = this._getPortFromLabel(args.PORT);
        if (port === null) return 0;
        
        await this._peripheral._setInputMode(port, BoostMode.DISTANCE);
        return this._peripheral.getDistance(port);
    }

    /**
     * Get reflection from color/distance sensor
     */
    async getReflection (args) {
        const port = this._getPortFromLabel(args.PORT);
        if (port === null) return 0;
        
        await this._peripheral._setInputMode(port, BoostMode.REFLECTION);
        return this._peripheral.getReflection(port);
    }

    /**
     * Get force from force sensor
     */
    async getForce (args) {
        const port = this._getPortFromLabel(args.PORT);
        if (port === null) return 0;
        
        await this._peripheral._setInputMode(port, BoostMode.FORCE);
        return this._peripheral.getForce(port);
    }

    /**
     * Check if force sensor is pressed
     */
    async isForceSensorPressed (args) {
        const port = this._getPortFromLabel(args.PORT);
        if (port === null) return false;
        
        await this._peripheral._setInputMode(port, BoostMode.TOUCHED);
        return this._peripheral.isForcePressed(port);
    }

    /**
     * When force sensor pressed (hat block)
     */
    whenForceSensorPressed (args) {
        return this.isForceSensorPressed(args);
    }

    /**
     * Test whether the tilt sensor is currently tilted (hat block)
     */
    whenTilted (args) {
        return this._isTilted(args.TILT_DIRECTION_ANY);
    }

    /**
     * Test whether the tilt sensor is currently tilted (boolean block)
     */
    isTilted (args) {
        return this._isTilted(args.TILT_DIRECTION_ANY);
    }

    /**
     * Get tilt angle in specific direction
     */
    getTiltAngle (args) {
        return this._getTiltAngle(args.TILT_DIRECTION);
    }

    /**
     * Internal tilt detection logic
     * @param {string} direction - Tilt direction
     * @return {boolean} Whether tilted in that direction
     * @private
     */
    _isTilted (direction) {
        switch (direction) {
        case BoostTiltDirection.ANY:
            return (Math.abs(this._peripheral.tiltX) >= Scratch3BoostBlocks.TILT_THRESHOLD) ||
                (Math.abs(this._peripheral.tiltY) >= Scratch3BoostBlocks.TILT_THRESHOLD);
        default:
            return this._getTiltAngle(direction) >= Scratch3BoostBlocks.TILT_THRESHOLD;
        }
    }

    /**
     * Internal tilt angle calculation
     * @param {string} direction - Tilt direction
     * @return {number} Tilt angle in degrees
     * @private
     */
    _getTiltAngle (direction) {
        switch (direction) {
        case BoostTiltDirection.UP:
            return this._peripheral.tiltY > 90 ? 256 - this._peripheral.tiltY : -this._peripheral.tiltY;
        case BoostTiltDirection.DOWN:
            return this._peripheral.tiltY > 90 ? this._peripheral.tiltY - 256 : this._peripheral.tiltY;
        case BoostTiltDirection.LEFT:
            return this._peripheral.tiltX > 90 ? this._peripheral.tiltX - 256 : this._peripheral.tiltX;
        case BoostTiltDirection.RIGHT:
            return this._peripheral.tiltX > 90 ? 256 - this._peripheral.tiltX : -this._peripheral.tiltX;
        default:
            log.warn(`Unknown tilt direction in _getTiltAngle: ${direction}`);
            return 0;
        }
    }

    // ========================================================================
    // HUB CONTROL BLOCKS
    // ========================================================================

    /**
     * Set the LED's hue
     */
    setLightHue (args) {
        let inputHue = Cast.toNumber(args.HUE);
        inputHue = MathUtil.wrapClamp(inputHue, 0, 100);
        const hue = inputHue * 360 / 100;

        const rgbObject = color.hsvToRgb({h: hue, s: 1, v: 1});
        const rgbDecimal = color.rgbToDecimal(rgbObject);

        this._peripheral.setLED(rgbDecimal);

        return new Promise(resolve => {
            window.setTimeout(() => {
                resolve();
            }, BoostBLE.sendInterval);
        });
    }

    /**
     * Shutdown the hub
     */
    shutdown () {
        this._peripheral.shutdown();
    }

    /**
     * When hub button pressed (hat block)
     */
    whenButtonPressed () {
        return this._peripheral.hubStatus.buttonPressed;
    }

    /**
     * Check if hub button is pressed (boolean block)
     */
    isButtonPressed () {
        return this._peripheral.hubStatus.buttonPressed;
    }

    /**
     * Get battery level
     */
    getBatteryLevel () {
        return this._peripheral.hubStatus.batteryLevel;
    }

    /**
     * Get firmware version
     */
    getFirmwareVersion () {
        return this._peripheral.hubStatus.fwVersion;
    }

    /**
     * Get Bluetooth signal strength
     */
    getRSSI () {
        return this._peripheral.hubStatus.rssi;
    }

    /**
     * When battery is low (hat block)
     */
    whenBatteryLow () {
        return this._peripheral.hubStatus.lowVoltage;
    }

    /**
     * When motor is overloaded (hat block)
     */
    whenMotorOverloaded () {
        return this._peripheral.hubStatus.highCurrent || this._peripheral.hubStatus.overPower;
    }
}

module.exports = Scratch3BoostBlocks;