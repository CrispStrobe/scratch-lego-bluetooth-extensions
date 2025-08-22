const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const translations = require('./translations.json');

let formatMessage = messageData => messageData.defaultMessage;

// Simple translation setup that works with the build system
const setupTranslations = () => {
    try {
        const localeSetup = formatMessage.setup();
        if (localeSetup && localeSetup.translations && localeSetup.translations[localeSetup.locale]) {
            Object.assign(
                localeSetup.translations[localeSetup.locale],
                translations[localeSetup.locale]
            );
        }
    } catch (e) {
        // Fails silently, which is fine.
    }
};

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAORJREFUeF7t2DEKwjAYQOG/qIMH8BbewNvY1Vt4A2/hDXQV3EQHwQOIOgiCiIODiIOLiCCCiAgOjooHD/BvhLyEjxmSH5CEJCRJkiRJkiRJkiRJkiSNB0mSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJGlSSJIkSZIkSZIkSZIkSZL+A2ggCAwANDVJREFUeF7t1jcQAAA=';

// Universal button mappings for different controller types
const GAMEPAD_BUTTONS = {
    A: 0,      // Bottom face button (Cross on PS, A on Xbox)
    B: 1,      // Right face button (Circle on PS, B on Xbox)  
    X: 2,      // Left face button (Square on PS, X on Xbox)
    Y: 3,      // Top face button (Triangle on PS, Y on Xbox)
    LB: 4,     // Left bumper (L1)
    RB: 5,     // Right bumper (R1)
    LT: 6,     // Left trigger (L2)
    RT: 7,     // Right trigger (R2)
    SELECT: 8, // Select/Share/Back
    START: 9,  // Start/Options/Menu
    LS: 10,    // Left stick press (L3)
    RS: 11,    // Right stick press (R3)
    UP: 12,    // D-pad up
    DOWN: 13,  // D-pad down
    LEFT: 14,  // D-pad left
    RIGHT: 15, // D-pad right
    HOME: 16   // Home/PS/Xbox button
};

class Scratch3GamepadBlocks {
    constructor(runtime) {
        this.runtime = runtime;
        
        // Use runtime formatMessage if available
        if (runtime.formatMessage) {
            formatMessage = runtime.formatMessage;
        }

        this.activeController = null;
        this.previousButtons = [];
        this.virtualCursor = { x: 0, y: 0, maxX: 240, minX: -240, maxY: 180, minY: -180 };

        // Set up polling
        this.runtime.on('PROJECT_RUN_START', () => {
            this._startPolling();
        });
        this.runtime.on('PROJECT_STOP_ALL', () => {
            this._stopPolling();
        });
    }

    getInfo() {
        setupTranslations();
        
        return {
            id: 'dualshock4',
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

    _startPolling() {
        if (this._pollInterval) return;
        this._pollInterval = setInterval(() => {
            this._pollGamepads();
        }, 16); // ~60 FPS
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
        this.virtualCursor.y -= leftY * speed; // Y is often inverted

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
        const isPressed = this.activeController.buttons[buttonIndex] && this.activeController.buttons[buttonIndex].pressed || false;

        this.previousButtons[buttonIndex] = isPressed;

        return !wasPressed && isPressed;
    }

    isButtonPressed(args) {
        if (!this.activeController) return false;
        
        const buttonIndex = GAMEPAD_BUTTONS[args.BUTTON];
        if (buttonIndex === undefined) return false;

        const isPressed = this.activeController.buttons[buttonIndex] && this.activeController.buttons[buttonIndex].pressed || false;
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
        
        if (x === 0 && y === 0) return 90; // Default to pointing up

        const radians = Math.atan2(-y, x);
        const degrees = radians * 180 / Math.PI;
        const normalizedDegrees = (degrees + 360) % 360;
        
        return Math.round(normalizedDegrees);
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
        console.log('🔧 === UNIVERSAL GAMEPAD DEBUG INFO ===');
        console.log('🎮 Connected: ' + (this.isConnected() ? 'YES (' + this.activeController.id + ')' : 'NO'));
        
        if (this.activeController) {
            console.log('🎮 === CONTROLLER INFO ===');
            const buttonStates = this.activeController.buttons.map((b, i) => 
                i + ':' + (b.pressed ? 'P' : 'R')
            ).join(' ');
            console.log('🔘 Buttons:', buttonStates);
            const axisValues = this.activeController.axes.map(a => a.toFixed(2)).join(', ');
            console.log('📊 Axes:', axisValues);
            console.log('🖱 Cursor: x=' + this.virtualCursor.x.toFixed(1) + ', y=' + this.virtualCursor.y.toFixed(1));
        } else {
            console.log('⚠️ Connect a controller and press a button to begin.');
        }
    }
}

module.exports = Scratch3GamepadBlocks;