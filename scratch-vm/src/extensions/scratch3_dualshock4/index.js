const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const translations = require('./translations.json');

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAORJREFUeF7t2DEKwjAYQOG/qIMH8BbewNvY1Vt4A2/hDXQV3EQHwQOIOgiCiIODiIOLiCCCiAgOjooHD/BvhLyEjxmSH5CEJCRJkiRJkiRJkiRJkiSNB0mSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJGlSSJIkSZIkSZIkSZIkSZL+A2ggCAwANDVJREFUeF7t1jcQAAA=';

const GAMEPAD_BUTTONS = {
    A: 0, B: 1, X: 2, Y: 3, LB: 4, RB: 5, LT: 6, RT: 7, SELECT: 8, START: 9,
    LS: 10, RS: 11, UP: 12, DOWN: 13, LEFT: 14, RIGHT: 15, HOME: 16
};

class Scratch3GamepadBlocks {
    constructor(runtime) {
        this.runtime = runtime;

        this.activeController = null;
        this.previousButtons = [];
        this.virtualCursor = { x: 0, y: 0, maxX: 240, minX: -240, maxY: 180, minY: -180 };

        this.runtime.on('PROJECT_RUN_START', () => { this._startPolling(); });
        this.runtime.on('PROJECT_STOP_ALL', () => { this._stopPolling(); });
    }

    getInfo() {
        // --- This is the working "blueprint" for your build system ---
        let formatMessage = messageData => messageData.defaultMessage;
        if (this.runtime.formatMessage) {
            formatMessage = this.runtime.formatMessage;
            try {
                const localeSetup = formatMessage.setup();
                if (localeSetup && localeSetup.translations && localeSetup.translations[localeSetup.locale]) {
                    Object.assign(
                        localeSetup.translations[localeSetup.locale],
                        translations[localeSetup.locale]
                    );
                }
            } catch (e) { /* Fails silently, which is fine */ }
        }
        // --- End of translation setup ---

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
        this._pollInterval = setInterval(() => { this._pollGamepads(); }, 16);
    }
    
    _stopPolling() {
        if (!this._pollInterval) return;
        clearInterval(this._pollInterval);
        this._pollInterval = null;
    }

    _pollGamepads() {
        try {
            const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
            this.activeController = Array.from(gamepads).find(g => g) || null;
            if (this.activeController) {
                this._updateVirtualCursor(this.activeController);
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
        this.virtualCursor.y -= leftY * speed; // Y is inverted

        this.virtualCursor.x = Math.max(this.virtualCursor.minX, Math.min(this.virtualCursor.maxX, this.virtualCursor.x));
        this.virtualCursor.y = Math.max(this.virtualCursor.minY, Math.min(this.virtualCursor.maxY, this.virtualCursor.y));
    }
    
    _normalizeAxis(value) {
        const deadzone = 0.1;
        if (Math.abs(value) < deadzone) return 0;
        return (value - (Math.sign(value) * deadzone)) / (1 - deadzone);
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

    isConnected() { return !!this.activeController; }
    getControllerInfo() { return this.activeController ? this.activeController.id : 'No controller'; }

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
        let degrees = radians * (180 / Math.PI);
        if (degrees < 0) degrees += 360;
        return Math.round(degrees);
    }

    getCursorX() { return Math.round(this.virtualCursor.x); }
    getCursorY() { return Math.round(this.virtualCursor.y); }

    setCursorPosition(args) {
        const x = Cast.toNumber(args.X);
        const y = Cast.toNumber(args.Y);
        this.virtualCursor.x = Math.max(this.virtualCursor.minX, Math.min(this.virtualCursor.maxX, x));
        this.virtualCursor.y = Math.max(this.virtualCursor.minY, Math.min(this.virtualCursor.maxY, y));
    }

    vibrate(args) {
        if (!this.activeController || !this.activeController.vibrationActuator) return;
        const duration = Cast.toNumber(args.DURATION);
        const intensity = Cast.toNumber(args.INTENSITY) / 100;
        try {
            this.activeController.vibrationActuator.playEffect('dual-rumble', {
                duration: duration,
                weakMagnitude: intensity,
                strongMagnitude: intensity
            });
        } catch (error) {
            // Silently fail if vibration is not supported or fails
        }
    }
}

module.exports = Scratch3GamepadBlocks;