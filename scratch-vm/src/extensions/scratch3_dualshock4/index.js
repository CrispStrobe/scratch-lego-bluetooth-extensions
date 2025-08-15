const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAORJREFUeF7t2DEKwjAYQOG/qIMH8BbewNvY1Vt4A2/hDXQV3EQHwQOIOgiCiIODiIOLiCCCiAgOjooHD/BvhLyEjxmSH5CEJCRJkiRJkiRJkiRJkiSNB0mSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJGlSSJIkSZIkSZIkSZIkSZL+A2ggCAwANDVJREFUeF7t1jcQAAA=';

// Create our own complete formatMessage implementation
// This is inspired by the actual format-message library
let currentLocale = 'en';
let translations = {};

// Our complete formatMessage function
function createFormatMessage() {
    return function formatMessage(messageData, args, locales) {
        // Handle string input
        if (typeof messageData === 'string') {
            return messageData;
        }
        
        // Handle object input
        if (typeof messageData === 'object') {
            const pattern = messageData.default || messageData.defaultMessage;
            const id = messageData.id;
            
            if (!pattern) {
                return id || 'Missing text';
            }
            
            // Try to get translation
            const locale = locales || currentLocale;
            const translated = getTranslation(id, locale, pattern);
            
            // Simple placeholder replacement for args
            if (args && translated) {
                return replacePlaceholders(translated, args);
            }
            
            return translated;
        }
        
        return 'Missing text';
    };
}

function getTranslation(id, locale, defaultMessage) {
    if (translations[locale] && translations[locale][id]) {
        return translations[locale][id];
    }
    return defaultMessage || id || 'Missing text';
}

function replacePlaceholders(message, args) {
    if (!args || typeof message !== 'string') return message;
    
    return message.replace(/\[([^\]]+)\]/g, (match, key) => {
        return args[key] !== undefined ? args[key] : match;
    });
}

// Create our formatMessage instance
let formatMessage = createFormatMessage();

// Setup function to configure translations
function setupTranslations(options = {}) {
    if (options.locale) {
        currentLocale = options.locale;
    }
    if (options.translations) {
        translations = options.translations;
    }
    if (options.formatMessage) {
        // If a working formatMessage is provided, use it
        formatMessage = options.formatMessage;
    }
}

// Universal button mappings for different controller types
const GAMEPAD_BUTTONS = {
    A: 0, B: 1, X: 2, Y: 3, LB: 4, RB: 5, LT: 6, RT: 7,
    SELECT: 8, START: 9, LS: 10, RS: 11, UP: 12, DOWN: 13, LEFT: 14, RIGHT: 15, HOME: 16
};

class Scratch3GamepadBlocks {
    constructor(runtime) {
        this.runtime = runtime;
        
        // Try to detect if runtime.formatMessage works properly
        if (runtime.formatMessage) {
            try {
                const testResult = runtime.formatMessage({id: 'test', defaultMessage: 'test'});
                if (testResult && testResult !== 'test' && !testResult.includes('test')) {
                    // runtime.formatMessage is broken (returns IDs), don't use it
                    console.log('Detected broken runtime.formatMessage, using fallback');
                } else {
                    // runtime.formatMessage seems to work, use it
                    formatMessage = runtime.formatMessage;
                    console.log('Using runtime.formatMessage');
                }
            } catch (e) {
                console.log('runtime.formatMessage failed test, using fallback');
            }
        }
        
        this.activeController = null;
        this.previousButtons = [];
        this.virtualCursor = { x: 0, y: 0, maxX: 240, minX: -240, maxY: 180, minY: -180 };

        this.runtime.on('PROJECT_RUN_START', () => this._startPolling());
        this.runtime.on('PROJECT_STOP_ALL', () => this._stopPolling());
    }

    getInfo() {
        return {
            id: 'gamepad',
            name: formatMessage({id: 'gamepad.name', defaultMessage: 'Universal Gamepad'}),
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: [
                {
                    opcode: 'isConnected',
                    text: formatMessage({id: 'gamepad.isConnected', defaultMessage: 'gamepad connected?'}),
                    blockType: BlockType.BOOLEAN
                },
                {
                    opcode: 'getControllerInfo',
                    text: formatMessage({id: 'gamepad.getControllerInfo', defaultMessage: 'controller name'}),
                    blockType: BlockType.REPORTER
                },
                '---',
                {
                    opcode: 'whenButtonPressed',
                    text: formatMessage({id: 'gamepad.whenButtonPressed', defaultMessage: 'when [BUTTON] pressed'}),
                    blockType: BlockType.HAT,
                    arguments: {
                        BUTTON: { type: ArgumentType.STRING, menu: 'BUTTONS', defaultValue: 'A' }
                    }
                },
                {
                    opcode: 'isButtonPressed',
                    text: formatMessage({id: 'gamepad.isButtonPressed', defaultMessage: '[BUTTON] pressed?'}),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        BUTTON: { type: ArgumentType.STRING, menu: 'BUTTONS', defaultValue: 'A' }
                    }
                },
                '---',
                {
                    opcode: 'getStickValue',
                    text: formatMessage({id: 'gamepad.getStickValue', defaultMessage: '[STICK] stick [AXIS]'}),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        STICK: { type: ArgumentType.STRING, menu: 'STICKS', defaultValue: 'left' },
                        AXIS: { type: ArgumentType.STRING, menu: 'AXES', defaultValue: 'x' }
                    }
                },
                {
                    opcode: 'getStickDirection',
                    text: formatMessage({id: 'gamepad.getStickDirection', defaultMessage: '[STICK] stick direction'}),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        STICK: { type: ArgumentType.STRING, menu: 'STICKS', defaultValue: 'left' }
                    }
                },
                '---',
                {
                    opcode: 'getCursorX',
                    text: formatMessage({id: 'gamepad.getCursorX', defaultMessage: 'cursor x'}),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getCursorY',
                    text: formatMessage({id: 'gamepad.getCursorY', defaultMessage: 'cursor y'}),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'setCursorPosition',
                    text: formatMessage({id: 'gamepad.setCursorPosition', defaultMessage: 'set cursor to x: [X] y: [Y]'}),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        X: { type: ArgumentType.NUMBER, defaultValue: 0 },
                        Y: { type: ArgumentType.NUMBER, defaultValue: 0 }
                    }
                },
                '---',
                {
                    opcode: 'vibrate',
                    text: formatMessage({id: 'gamepad.vibrate', defaultMessage: 'vibrate for [DURATION] ms at [INTENSITY]%'}),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        DURATION: { type: ArgumentType.NUMBER, defaultValue: 200 },
                        INTENSITY: { type: ArgumentType.NUMBER, defaultValue: 50 }
                    }
                },
                '---',
                {
                    opcode: 'showDebugInfo',
                    text: formatMessage({id: 'gamepad.showDebugInfo', defaultMessage: 'show gamepad debug info'}),
                    blockType: BlockType.COMMAND
                }
            ],
            menus: {
                BUTTONS: {
                    acceptReporters: true,
                    items: Object.keys(GAMEPAD_BUTTONS).map(key => ({
                        text: formatMessage({id: `gamepad.buttons.${key}`, defaultMessage: key}),
                        value: key
                    }))
                },
                STICKS: {
                    acceptReporters: true,
                    items: [
                        {text: formatMessage({id: 'gamepad.sticks.left', defaultMessage: 'left'}), value: 'left'},
                        {text: formatMessage({id: 'gamepad.sticks.right', defaultMessage: 'right'}), value: 'right'}
                    ]
                },
                AXES: {
                    acceptReporters: true,
                    items: [
                        {text: formatMessage({id: 'gamepad.axes.x', defaultMessage: 'x-axis'}), value: 'x'},
                        {text: formatMessage({id: 'gamepad.axes.y', defaultMessage: 'y-axis'}), value: 'y'}
                    ]
                }
            }
        };
    }

    // ... rest of the methods remain the same as before ...
    
    _startPolling() {
        if (this._pollInterval) return;
        this._pollInterval = setInterval(() => this._pollGamepads(), 16);
    }
    
    _stopPolling() {
        if (!this._pollInterval) return;
        clearInterval(this._pollInterval);
        this._pollInterval = null;
    }

    _pollGamepads() {
        try {
            const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
            const firstActive = Array.from(gamepads).find(g => g);
            if (firstActive) {
                this.activeController = firstActive;
                this._updateVirtualCursor(this.activeController);
            } else {
                this.activeController = null;
            }
        } catch (e) {
            this.activeController = null;
        }
    }
    
    _updateVirtualCursor(gamepad) {
        if (!gamepad) return;
        const leftX = this._normalizeAxis(gamepad.axes[0] || 0);
        const leftY = this._normalizeAxis(gamepad.axes[1] || 0);
        const speed = 5;
        this.virtualCursor.x += leftX * speed;
        this.virtualCursor.y -= leftY * speed;
        this.virtualCursor.x = Math.max(this.virtualCursor.minX, Math.min(this.virtualCursor.maxX, this.virtualCursor.x));
        this.virtualCursor.y = Math.max(this.virtualCursor.minY, Math.min(this.virtualCursor.maxY, this.virtualCursor.y));
    }
    
    _normalizeAxis(value) {
        const deadzone = 0.1;
        if (Math.abs(value) < deadzone) return 0;
        return (value - Math.sign(value) * deadzone) / (1 - deadzone);
    }

    whenButtonPressed(args) {
        if (!this.activeController) return false;
        const buttonIndex = GAMEPAD_BUTTONS[args.BUTTON];
        if (buttonIndex === undefined) return false;
        const wasPressed = this.previousButtons[buttonIndex] || false;
        const isPressed = this.activeController.buttons[buttonIndex]?.pressed || false;
        this.previousButtons[buttonIndex] = isPressed;
        return !wasPressed && isPressed;
    }

    isButtonPressed(args) {
        if (!this.activeController) return false;
        const buttonIndex = GAMEPAD_BUTTONS[args.BUTTON];
        if (buttonIndex === undefined) return false;
        const isPressed = this.activeController.buttons[buttonIndex]?.pressed || false;
        this.previousButtons[buttonIndex] = isPressed;
        return isPressed;
    }

    isConnected() {
        return !!this.activeController;
    }

    getControllerInfo() {
        if (!this.activeController) return 'No controller';
        return this.activeController.id;
    }

    getStickValue(args) {
        if (!this.activeController) return 0;
        const stick = Cast.toString(args.STICK).toLowerCase();
        const axis = Cast.toString(args.AXIS).toLowerCase();
        const stickMap = { 'left': { 'x': 0, 'y': 1 }, 'right': { 'x': 2, 'y': 3 } };
        const stickAxes = stickMap[stick];
        if (!stickAxes) return 0;
        const axisIndex = stickAxes[axis];
        if (axisIndex === undefined) return 0;
        const rawValue = this.activeController.axes[axisIndex] || 0;
        const normalizedValue = this._normalizeAxis(rawValue);
        return Math.round(normalizedValue * 100);
    }

    getStickDirection(args) {
        if (!this.activeController) return 0;
        const stick = Cast.toString(args.STICK).toLowerCase();
        const stickMap = { 'left': { 'x': 0, 'y': 1 }, 'right': { 'x': 2, 'y': 3 } };
        const stickAxes = stickMap[stick];
        if (!stickAxes) return 0;
        const x = this._normalizeAxis(this.activeController.axes[stickAxes.x] || 0);
        const y = this._normalizeAxis(this.activeController.axes[stickAxes.y] || 0);
        if (x === 0 && y === 0) return 90;
        const radians = Math.atan2(-y, x);
        let degrees = radians * 180 / Math.PI;
        degrees = (degrees + 360) % 360;
        return Math.round(degrees);
    }

    getCursorX() {
        return Math.round(this.virtualCursor.x);
    }

    getCursorY() {
        return Math.round(this.virtualCursor.y);
    }

    setCursorPosition(args) {
        const x = Cast.toNumber(args.X);
        const y = Cast.toNumber(args.Y);
        this.virtualCursor.x = Math.max(this.virtualCursor.minX, Math.min(this.virtualCursor.maxX, x));
        this.virtualCursor.y = Math.max(this.virtualCursor.minY, Math.min(this.virtualCursor.maxY, y));
    }

    vibrate(args) {
        if (!this.activeController) return;
        const duration = Cast.toNumber(args.DURATION);
        const intensity = Cast.toNumber(args.INTENSITY) / 100;
        const actuator = this.activeController.vibrationActuator;
        if (!actuator) {
            console.log('Vibration not supported on this controller');
            return;
        }
        try {
            actuator.playEffect('dual-rumble', {
                duration: duration,
                weakMagnitude: intensity,
                strongMagnitude: intensity
            });
        } catch (error) {
            console.log('Vibration failed:', error);
        }
    }

    showDebugInfo() {
        console.log('--- UNIVERSAL GAMEPAD DEBUG INFO ---');
        console.log(`Connected: ${this.isConnected() ? `YES (${this.activeController.id})` : 'NO'}`);
        if (this.activeController) {
            console.log('Buttons:', this.activeController.buttons.map((b, i) => `${i}:${b.pressed ? 'P' : 'R'}`).join(' '));
            console.log('Axes:', this.activeController.axes.map(a => a.toFixed(2)).join(', '));
            console.log(`Cursor: x=${this.virtualCursor.x.toFixed(1)}, y=${this.virtualCursor.y.toFixed(1)}`);
        } else {
            console.log('Connect a controller and press a button to begin.');
        }
    }
}

module.exports = Scratch3GamepadBlocks;