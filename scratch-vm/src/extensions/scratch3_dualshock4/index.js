const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const translations = require('./translations.json');

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAORJREFUeF7t2DEKwjAYQOG/qIMH8BbewNvY1Vt4A2/hDXQV3EQHwQOIOgiCiIODiIOLiCCCiAgOjooHD/BvhLyEjxmSH5CEJCRJkiRJkiRJkiRJkiSNB0mSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJGlSSJIkSZIkSZIkSZIkSZL+A2ggCAwANDVJREFUeF7t1jcQAAA=';

// Robust fallback formatMessage that actually uses translations
// Detect browser locale automatically
let currentLocale = (function() {
    // Try multiple ways to detect locale
    const browserLocale = 
        navigator.language ||           // Most browsers
        navigator.userLanguage ||       // IE
        navigator.browserLanguage ||    // Old browsers
        'en';                          // Fallback
    
    // Extract just the language part (de-DE -> de)
    const lang = browserLocale.split('-')[0].toLowerCase();
    
    // Check if we have translations for this language
    if (translations[lang]) {
        console.log('Auto-detected locale:', lang, 'from browser locale:', browserLocale);
        return lang;
    }
    
    console.log('Browser locale', browserLocale, 'not available, using English');
    return 'en';
})();

let formatMessage = function(messageData, args) {
    console.log('formatMessage called with:', messageData, 'args:', args);
    console.log('Current locale:', currentLocale);
    console.log('Available translations:', Object.keys(translations));
    console.log('translations object:', translations); // Show the full object
    
    // Handle string input
    if (typeof messageData === 'string') {
        console.log('String input, returning as-is:', messageData);
        return messageData;
    }
    
    // Handle null/undefined
    if (!messageData) {
        console.log('Null/undefined input, returning Missing text');
        return 'Missing text';
    }
    
    // Handle object input
    if (typeof messageData === 'object') {
        let message;
        
        console.log('Object input, ID:', messageData.id);
        console.log('Translations for current locale exist:', !!(translations[currentLocale]));
        
        if (translations[currentLocale]) {
            console.log('Available translation keys for', currentLocale + ':', Object.keys(translations[currentLocale]));
            console.log('Looking for key:', messageData.id);
            console.log('Key exists:', !!(translations[currentLocale][messageData.id]));
            if (translations[currentLocale][messageData.id]) {
                console.log('Found translation:', translations[currentLocale][messageData.id]);
            }
        }
        
        // Try to get translation first
        if (messageData.id && translations[currentLocale] && translations[currentLocale][messageData.id]) {
            message = translations[currentLocale][messageData.id];
            console.log('✅ Found translation for', messageData.id, ':', message);
        } else {
            // Fall back to defaultMessage, then default, then id
            message = messageData.defaultMessage || messageData.default || messageData.id || 'Missing text';
            console.log('❌ No translation found, using fallback:', message);
            console.log('Fallback sources - defaultMessage:', messageData.defaultMessage, 'default:', messageData.default, 'id:', messageData.id);
        }
        
        // Simple placeholder replacement: [KEY] -> args.KEY
        if (args && typeof message === 'string') {
            const originalMessage = message;
            message = message.replace(/\[([^\]]+)\]/g, (match, key) => {
                const replacement = args.hasOwnProperty(key) ? String(args[key]) : match;
                console.log('Placeholder replacement:', match, '->', replacement);
                return replacement;
            });
            if (originalMessage !== message) {
                console.log('Message after placeholder replacement:', message);
            }
        }
        
        console.log('🎯 Final message returned:', message);
        return message;
    }
    
    console.log('Unknown input type, returning Missing text');
    return 'Missing text';
};

// Add setup function to the fallback formatMessage
formatMessage.setup = function(options) {
    console.log('formatMessage.setup called with:', options);
    if (options && options.locale) {
        console.log('Setting locale from', currentLocale, 'to', options.locale);
        currentLocale = options.locale;
    }
    console.log('Setup complete. Current locale:', currentLocale);
    return {
        locale: currentLocale,
        translations: translations
    };
};

// Setup translations function - tries to work with format-message if available
const setupTranslations = () => {
    console.log('setupTranslations called');
    console.log('formatMessage.setup exists:', typeof formatMessage.setup);
    
    try {
        const localeSetup = formatMessage.setup();
        console.log('formatMessage.setup() returned:', localeSetup);
        
        if (localeSetup && localeSetup.translations && localeSetup.translations[localeSetup.locale]) {
            console.log('Trying to assign translations for locale:', localeSetup.locale);
            console.log('Available translation locales:', Object.keys(translations));
            console.log('Translation keys to assign:', translations[localeSetup.locale] ? Object.keys(translations[localeSetup.locale]) : 'none');
            
            Object.assign(
                localeSetup.translations[localeSetup.locale],
                translations[localeSetup.locale]
            );
            console.log('Translations assigned successfully');
        } else {
            console.log('No translation setup possible - localeSetup:', localeSetup);
        }
    } catch (e) {
        console.log('setupTranslations failed with error:', e);
        // Fails silently, which is fine.
    }
};

// Universal button mappings for different controller types
const GAMEPAD_BUTTONS = {
    // Use standard gamepad button indices
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
        
        console.log('🚀 Gamepad extension constructor called');
        console.log('🌍 Browser locale detection:', navigator.language, navigator.userLanguage, navigator.browserLanguage);
        console.log('🎯 Selected locale:', currentLocale);
        console.log('📚 Available translation locales:', Object.keys(translations));
        console.log('🔧 translations object structure:', translations);
        
        // Test if runtime.formatMessage works properly before using it
        if (runtime.formatMessage) {
            try {
                const testResult = runtime.formatMessage({id: 'test', defaultMessage: 'test'});
                // If it returns the ID instead of defaultMessage, it's broken
                if (testResult === 'test' || (testResult && testResult.includes('test'))) {
                    formatMessage = runtime.formatMessage;
                    console.log('✅ Using runtime.formatMessage');
                } else {
                    console.log('❌ runtime.formatMessage is broken (returns IDs), using fallback');
                }
            } catch (e) {
                console.log('❌ runtime.formatMessage test failed, using fallback');
            }
        } else {
            console.log('⚠️ No runtime.formatMessage available, using fallback');
        }

        this.activeController = null;
        this.previousButtons = [];
        this.virtualCursor = { x: 0, y: 0, maxX: 240, minX: -240, maxY: 180, minY: -180 };

        this.runtime.on('PROJECT_RUN_START', () => {
            this._startPolling();
        });
        this.runtime.on('PROJECT_STOP_ALL', () => {
            this._stopPolling();
        });
    }

    getInfo() {
        console.log('=== getInfo() called ===');
        setupTranslations();
        
        // Test German translation access
        console.log('Testing German locale access...');
        console.log('German translations available:', !!(translations.de));
        if (translations.de) {
            console.log('German translation for gamepad.name:', translations.de['gamepad.name']);
        }
        
        // To test German, you can manually set locale (remove this after testing):
        // currentLocale = 'de';
        // console.log('Manually set locale to German for testing');
        
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
                },
                {
                    opcode: 'setLocale',
                    text: formatMessage({id: 'gamepad.setLocale', defaultMessage: 'set language to [LOCALE]'}),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        LOCALE: { type: ArgumentType.STRING, menu: 'LOCALES', defaultValue: 'en' }
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
                },
                LOCALES: {
                    acceptReporters: true,
                    items: [
                        {text: 'English', value: 'en'},
                        {text: 'Deutsch', value: 'de'}
                    ]
                }
            }
        };
    }

    _startPolling() {
        if (this._pollInterval) return;
        this._pollInterval = setInterval(() => this._pollGamepads(), 16); // ~60 FPS
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
        
        const speed = 5; // Adjust speed as needed
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
        
        if (x === 0 && y === 0) return 90; // Default to pointing up

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
        
        // Add translation debug info
        console.log('--- TRANSLATION DEBUG INFO ---');
        console.log('Current locale:', currentLocale);
        console.log('Available translation locales:', Object.keys(translations));
        console.log('formatMessage type:', typeof formatMessage);
        console.log('formatMessage.setup exists:', typeof formatMessage.setup);
        
        // Test translation lookup
        const testMessage = formatMessage({id: 'gamepad.name', defaultMessage: 'Universal Gamepad'});
        console.log('Test message result:', testMessage);
        
        if (this.activeController) {
            console.log('--- CONTROLLER INFO ---');
            console.log('Buttons:', this.activeController.buttons.map((b, i) => `${i}:${b.pressed ? 'P' : 'R'}`).join(' '));
            console.log('Axes:', this.activeController.axes.map(a => a.toFixed(2)).join(', '));
            console.log(`Cursor: x=${this.virtualCursor.x.toFixed(1)}, y=${this.virtualCursor.y.toFixed(1)}`);
        } else {
            console.log('Connect a controller and press a button to begin.');
        }
    }
    
    // Test method to change locale (for debugging)
    setLocale(args) {
        const locale = Cast.toString(args.LOCALE);
        console.log('Setting locale from', currentLocale, 'to', locale);
        currentLocale = locale;
        
        // Test the new locale
        const testMessage = formatMessage({id: 'gamepad.name', defaultMessage: 'Universal Gamepad'});
        console.log('Test message with new locale:', testMessage);
        
        return `Locale set to ${locale}. Test message: ${testMessage}`;
    }
}

module.exports = Scratch3GamepadBlocks;