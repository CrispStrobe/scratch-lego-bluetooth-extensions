const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const translations = require('./translations.json');

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAORJREFUeF7t2DEKwjAYQOG/qIMH8BbewNvY1Vt4A2/hDXQV3EQHwQOIOgiCiIODiIOLiCCCiAgOjooHD/BvhLyEjxmSH5CEJCRJkiRJkiRJkiRJkiSNB0mSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJGlSSJIkSZIkSZIkSZIkSZL+A2ggCAwANDVJREFUeF7t1jcQAAA=';

// Global variables for locale management
var currentLocale = 'en'; // Start with fallback
var runtimeRef = null; // Store runtime reference for locale detection

// Enhanced locale detection that tries multiple methods
function detectLocale(runtime) {
    console.log('🔍 === ENHANCED LOCALE DETECTION START ===');
    
    var detectionMethods = [];
    var detectedLocale = 'en'; // fallback
    
    // Method 1: Check if runtime has locale information
    if (runtime) {
        console.log('🎯 Method 1: Checking runtime object...');
        console.log('📊 Runtime keys:', Object.keys(runtime));
        
        // Check various possible runtime properties for locale
        var possibleLocaleProps = [
            'locale', 'language', 'currentLocale', 'selectedLocale', 
            'userLocale', 'interfaceLanguage', 'lang'
        ];
        
        for (var i = 0; i < possibleLocaleProps.length; i++) {
            var prop = possibleLocaleProps[i];
            if (runtime[prop]) {
                console.log('✅ Found runtime.' + prop + ':', runtime[prop]);
                detectionMethods.push('runtime.' + prop + ': ' + runtime[prop]);
                detectedLocale = runtime[prop];
                break;
            }
        }
        
        // Check runtime.formatMessage for locale info
        if (runtime.formatMessage) {
            console.log('🔧 Method 1.1: Testing runtime.formatMessage...');
            try {
                // Try to get locale info from formatMessage setup
                if (typeof runtime.formatMessage.setup === 'function') {
                    var setup = runtime.formatMessage.setup();
                    console.log('📋 formatMessage.setup() result:', setup);
                    if (setup && setup.locale) {
                        console.log('✅ Found formatMessage locale: ' + setup.locale);
                        detectionMethods.push('formatMessage.setup().locale: ' + setup.locale);
                        detectedLocale = setup.locale;
                    }
                }
            } catch (e) {
                console.log('❌ formatMessage.setup() failed:', e);
            }
        }
        
        // Check runtime.vm for locale
        if (runtime.vm) {
            console.log('🔧 Method 1.2: Checking runtime.vm...');
            console.log('📊 runtime.vm keys:', Object.keys(runtime.vm));
            
            var vmLocaleProps = ['locale', 'language', 'currentLocale'];
            for (var j = 0; j < vmLocaleProps.length; j++) {
                var vmProp = vmLocaleProps[j];
                if (runtime.vm[vmProp]) {
                    console.log('✅ Found runtime.vm.' + vmProp + ':', runtime.vm[vmProp]);
                    detectionMethods.push('runtime.vm.' + vmProp + ': ' + runtime.vm[vmProp]);
                    detectedLocale = runtime.vm[vmProp];
                    break;
                }
            }
        }
    }
    
    // Method 2: Check global Scratch objects
    console.log('🌐 Method 2: Checking global objects...');
    
    if (typeof window !== 'undefined') {
        var globalChecks = [
            'window.ScratchBlocks', 'window.Scratch', 'window.vm',
            'window.Blockly', 'window.scratchConfig'
        ];
        
        for (var k = 0; k < globalChecks.length; k++) {
            var check = globalChecks[k];
            try {
                var obj;
                if (check === 'window.ScratchBlocks') obj = window.ScratchBlocks;
                else if (check === 'window.Scratch') obj = window.Scratch;
                else if (check === 'window.vm') obj = window.vm;
                else if (check === 'window.Blockly') obj = window.Blockly;
                else if (check === 'window.scratchConfig') obj = window.scratchConfig;
                
                if (obj) {
                    var objKeys = Object.keys(obj);
                    console.log('📋 Found ' + check + ':', objKeys.slice(0, 10)); // First 10 keys
                    
                    // Check for locale properties
                    var localeProps = ['locale', 'language', 'currentLocale', 'lang'];
                    for (var l = 0; l < localeProps.length; l++) {
                        var prop = localeProps[l];
                        if (obj[prop]) {
                            console.log('✅ Found ' + check + '.' + prop + ':', obj[prop]);
                            detectionMethods.push(check + '.' + prop + ': ' + obj[prop]);
                            detectedLocale = obj[prop];
                            break;
                        }
                    }
                }
            } catch (e) {
                console.log('❌ ' + check + ' not available:', e.message);
            }
        }
    }
    
    // Method 3: Check document/DOM for locale hints
    console.log('📄 Method 3: Checking DOM for locale hints...');
    
    if (typeof document !== 'undefined') {
        // Check html lang attribute
        var htmlLang = document.documentElement.lang;
        if (htmlLang) {
            console.log('✅ Found document.documentElement.lang: ' + htmlLang);
            detectionMethods.push('document.documentElement.lang: ' + htmlLang);
            detectedLocale = htmlLang.split('-')[0]; // Extract language part
        }
        
        // Check for Scratch-specific DOM elements with locale info
        var metaElements = document.querySelectorAll('meta[name*="locale"], meta[name*="language"]');
        for (var m = 0; m < metaElements.length; m++) {
            var meta = metaElements[m];
            console.log('✅ Found meta element:', meta.name, '=', meta.content);
            detectionMethods.push('meta[' + meta.name + ']: ' + meta.content);
            detectedLocale = meta.content.split('-')[0];
        }
    }
    
    // Method 4: Check for stored preferences
    console.log('💾 Method 4: Checking stored preferences...');
    
    if (typeof localStorage !== 'undefined') {
        var storageKeys = [
            'scratch-locale', 'scratch-language', 'locale', 'language',
            'scratch-gui-locale', 'scratchLanguage'
        ];
        
        for (var n = 0; n < storageKeys.length; n++) {
            var key = storageKeys[n];
            try {
                var value = localStorage.getItem(key);
                if (value) {
                    console.log('✅ Found localStorage.' + key + ': ' + value);
                    detectionMethods.push('localStorage.' + key + ': ' + value);
                    detectedLocale = value.split('-')[0];
                    break;
                }
            } catch (e) {
                console.log('❌ localStorage.' + key + ' check failed:', e.message);
            }
        }
    }
    
    // Method 5: Browser locale as final fallback
    console.log('🌍 Method 5: Browser locale fallback...');
    var browserLocale = 
        navigator.language ||           
        navigator.userLanguage ||       
        navigator.browserLanguage ||    
        'en';                          
    
    console.log('🌍 Browser locale: ' + browserLocale);
    detectionMethods.push('navigator.language: ' + browserLocale);
    
    // If no other method worked, use browser locale
    if (detectedLocale === 'en' && browserLocale !== 'en') {
        detectedLocale = browserLocale.split('-')[0];
    }
    
    // Validate detected locale
    var normalizedLocale = detectedLocale.split('-')[0].toLowerCase();
    var isSupported = translations.hasOwnProperty(normalizedLocale);
    
    console.log('📊 === LOCALE DETECTION SUMMARY ===');
    console.log('🔍 Detection methods tried:', detectionMethods);
    console.log('🎯 Raw detected locale:', detectedLocale);
    console.log('🔄 Normalized locale:', normalizedLocale);
    console.log('✅ Locale supported:', isSupported);
    console.log('📚 Available locales:', Object.keys(translations));
    
    var finalLocale = isSupported ? normalizedLocale : 'en';
    console.log('🏁 Final locale:', finalLocale);
    console.log('🔍 === ENHANCED LOCALE DETECTION END ===');
    
    return finalLocale;
}

// Robust fallback formatMessage that uses detected locale
var formatMessage = function(messageData, args) {
    console.log('💬 formatMessage called with:', messageData, 'args:', args);
    console.log('🌐 Current locale:', currentLocale);
    console.log('📚 Available translations:', Object.keys(translations));
    
    // Handle string input
    if (typeof messageData === 'string') {
        console.log('📝 String input, returning as-is:', messageData);
        return messageData;
    }
    
    // Handle null/undefined
    if (!messageData) {
        console.log('❌ Null/undefined input, returning Missing text');
        return 'Missing text';
    }
    
    // Handle object input
    if (typeof messageData === 'object') {
        var message;
        
        console.log('🎯 Object input, ID:', messageData.id);
        console.log('✅ Translations for current locale exist:', !!(translations[currentLocale]));
        
        if (translations[currentLocale]) {
            console.log('📋 Available translation keys for ' + currentLocale + ':', Object.keys(translations[currentLocale]));
            console.log('🔍 Looking for key:', messageData.id);
            console.log('✅ Key exists:', !!(translations[currentLocale][messageData.id]));
            if (translations[currentLocale][messageData.id]) {
                console.log('💡 Found translation:', translations[currentLocale][messageData.id]);
            }
        }
        
        // Try to get translation first
        if (messageData.id && translations[currentLocale] && translations[currentLocale][messageData.id]) {
            message = translations[currentLocale][messageData.id];
            console.log('✅ Found translation for ' + messageData.id + ' :', message);
        } else {
            // Fall back to defaultMessage, then default, then id
            message = messageData.defaultMessage || messageData.default || messageData.id || 'Missing text';
            console.log('❌ No translation found, using fallback:', message);
            console.log('🔄 Fallback sources - defaultMessage:', messageData.defaultMessage, 'default:', messageData.default, 'id:', messageData.id);
        }
        
        // Simple placeholder replacement: [KEY] -> args.KEY
        if (args && typeof message === 'string') {
            var originalMessage = message;
            message = message.replace(/\[([^\]]+)\]/g, function(match, key) {
                var replacement = args.hasOwnProperty(key) ? String(args[key]) : match;
                console.log('🔄 Placeholder replacement:', match, '->', replacement);
                return replacement;
            });
            if (originalMessage !== message) {
                console.log('📝 Message after placeholder replacement:', message);
            }
        }
        
        console.log('🎯 Final message returned:', message);
        return message;
    }
    
    console.log('❌ Unknown input type, returning Missing text');
    return 'Missing text';
};

// Enhanced setup function for the fallback formatMessage
formatMessage.setup = function(options) {
    console.log('⚙️ formatMessage.setup called with:', options);
    
    // Re-detect locale if runtime is available
    if (runtimeRef) {
        console.log('🔄 Re-detecting locale with runtime...');
        currentLocale = detectLocale(runtimeRef);
    }
    
    if (options && options.locale) {
        console.log('🔧 Setting locale from options:', currentLocale, '->', options.locale);
        currentLocale = options.locale;
    }
    
    console.log('✅ Setup complete. Current locale:', currentLocale);
    return {
        locale: currentLocale,
        translations: translations
    };
};

// Enhanced setup translations function
var setupTranslations = function() {
    console.log('🔧 === SETUP TRANSLATIONS START ===');
    console.log('📊 Current locale before setup:', currentLocale);
    console.log('🛠 formatMessage.setup exists:', typeof formatMessage.setup);
    
    try {
        // Re-detect locale if we have runtime reference
        if (runtimeRef) {
            console.log('🔄 Re-detecting locale during setup...');
            var newLocale = detectLocale(runtimeRef);
            if (newLocale !== currentLocale) {
                console.log('🔄 Locale changed from ' + currentLocale + ' to ' + newLocale);
                currentLocale = newLocale;
            }
        }
        
        var localeSetup = formatMessage.setup();
        console.log('📋 formatMessage.setup() returned:', localeSetup);
        
        if (localeSetup && localeSetup.translations && localeSetup.translations[localeSetup.locale]) {
            console.log('🎯 Trying to assign translations for locale:', localeSetup.locale);
            console.log('📚 Available translation locales:', Object.keys(translations));
            
            if (translations[localeSetup.locale]) {
                console.log('📝 Translation keys to assign:', Object.keys(translations[localeSetup.locale]));
                
                Object.assign(
                    localeSetup.translations[localeSetup.locale],
                    translations[localeSetup.locale]
                );
                console.log('✅ Translations assigned successfully');
            } else {
                console.log('❌ No translations available for locale:', localeSetup.locale);
            }
        } else {
            console.log('❌ No translation setup possible - localeSetup:', localeSetup);
        }
    } catch (e) {
        console.log('❌ setupTranslations failed with error:', e);
        // Fails silently, which is fine.
    }
    
    console.log('📊 Final locale after setup:', currentLocale);
    console.log('🔧 === SETUP TRANSLATIONS END ===');
};

// Universal button mappings for different controller types
var GAMEPAD_BUTTONS = {
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
        runtimeRef = runtime; // Store global reference for locale detection
        
        console.log('🚀 === GAMEPAD EXTENSION CONSTRUCTOR START ===');
        console.log('📊 Runtime object keys:', Object.keys(runtime));
        console.log('🔧 Runtime.formatMessage available:', !!runtime.formatMessage);
        
        // Enhanced locale detection
        currentLocale = detectLocale(runtime);
        
        // Test if runtime.formatMessage works properly before using it
        if (runtime.formatMessage) {
            console.log('🧪 Testing runtime.formatMessage...');
            try {
                var testResult = runtime.formatMessage({id: 'test', defaultMessage: 'test'});
                console.log('🧪 Test result:', testResult);
                
                // If it returns the ID instead of defaultMessage, it's broken
                if (testResult === 'test' || (testResult && testResult.indexOf('test') !== -1)) {
                    formatMessage = runtime.formatMessage;
                    console.log('✅ Using runtime.formatMessage');
                    
                    // Try to get locale from runtime.formatMessage
                    if (typeof runtime.formatMessage.setup === 'function') {
                        try {
                            var setup = runtime.formatMessage.setup();
                            if (setup && setup.locale) {
                                console.log('🎯 Got locale from runtime.formatMessage:', setup.locale);
                                currentLocale = setup.locale;
                            }
                        } catch (e) {
                            console.log('❌ Could not get locale from runtime.formatMessage:', e);
                        }
                    }
                } else {
                    console.log('❌ runtime.formatMessage is broken (returns IDs), using fallback');
                }
            } catch (e) {
                console.log('❌ runtime.formatMessage test failed, using fallback:', e);
            }
        } else {
            console.log('⚠️ No runtime.formatMessage available, using fallback');
        }

        console.log('🏁 Final locale selected:', currentLocale);
        console.log('📚 Available translations:', Object.keys(translations));
        if (translations[currentLocale]) {
            console.log('✅ Translations available for ' + currentLocale + ':', Object.keys(translations[currentLocale]).length, 'keys');
        } else {
            console.log('❌ No translations available for ' + currentLocale + ', using English fallback');
        }

        this.activeController = null;
        this.previousButtons = [];
        this.virtualCursor = { x: 0, y: 0, maxX: 240, minX: -240, maxY: 180, minY: -180 };

        var self = this;
        this.runtime.on('PROJECT_RUN_START', function() {
            self._startPolling();
        });
        this.runtime.on('PROJECT_STOP_ALL', function() {
            self._stopPolling();
        });
        
        console.log('🚀 === GAMEPAD EXTENSION CONSTRUCTOR END ===');
    }

    getInfo() {
        console.log('📋 === getInfo() called ===');
        console.log('🌐 Current locale at getInfo:', currentLocale);
        
        setupTranslations();
        
        // Test current locale translations
        console.log('🧪 Testing current locale translations...');
        if (translations[currentLocale]) {
            var keys = Object.keys(translations[currentLocale]);
            console.log('✅ ' + currentLocale + ' translations available:', keys.slice(0, 5).concat(['...']));
            console.log('🎯 gamepad.name in ' + currentLocale + ':', translations[currentLocale]['gamepad.name']);
        } else {
            console.log('❌ No ' + currentLocale + ' translations available');
        }
        
        // Test formatMessage with current settings
        var testName = formatMessage({id: 'gamepad.name', defaultMessage: 'Universal Gamepad'});
        console.log('🧪 Test formatMessage result for gamepad.name:', testName);
        
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
                },
                {
                    opcode: 'forceLocaleDetection',
                    text: formatMessage({id: 'gamepad.forceLocaleDetection', defaultMessage: 'force locale detection'}),
                    blockType: BlockType.REPORTER
                }
            ],
            menus: {
                BUTTONS: {
                    acceptReporters: true,
                    items: Object.keys(GAMEPAD_BUTTONS).map(function(key) {
                        return {
                            text: formatMessage({id: 'gamepad.buttons.' + key, defaultMessage: key}),
                            value: key
                        };
                    })
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
        var self = this;
        this._pollInterval = setInterval(function() {
            self._pollGamepads();
        }, 16); // ~60 FPS
    }
    
    _stopPolling() {
        if (!this._pollInterval) return;
        clearInterval(this._pollInterval);
        this._pollInterval = null;
    }

    _pollGamepads() {
        try {
            var gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
            var firstActive = Array.from(gamepads).find(function(g) { return g; });
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

        var leftX = this._normalizeAxis(gamepad.axes[0] || 0);
        var leftY = this._normalizeAxis(gamepad.axes[1] || 0);
        
        var speed = 5; // Adjust speed as needed
        this.virtualCursor.x += leftX * speed;
        this.virtualCursor.y -= leftY * speed; // Y is often inverted

        this.virtualCursor.x = Math.max(this.virtualCursor.minX, Math.min(this.virtualCursor.maxX, this.virtualCursor.x));
        this.virtualCursor.y = Math.max(this.virtualCursor.minY, Math.min(this.virtualCursor.maxY, this.virtualCursor.y));
    }
    
    _normalizeAxis(value) {
        var deadzone = 0.1;
        if (Math.abs(value) < deadzone) return 0;
        return (value - Math.sign(value) * deadzone) / (1 - deadzone);
    }

    whenButtonPressed(args) {
        if (!this.activeController) return false;
        
        var buttonIndex = GAMEPAD_BUTTONS[args.BUTTON];
        if (buttonIndex === undefined) return false;

        var wasPressed = this.previousButtons[buttonIndex] || false;
        var isPressed = this.activeController.buttons[buttonIndex] && this.activeController.buttons[buttonIndex].pressed || false;

        this.previousButtons[buttonIndex] = isPressed;

        return !wasPressed && isPressed;
    }

    isButtonPressed(args) {
        if (!this.activeController) return false;
        
        var buttonIndex = GAMEPAD_BUTTONS[args.BUTTON];
        if (buttonIndex === undefined) return false;

        var isPressed = this.activeController.buttons[buttonIndex] && this.activeController.buttons[buttonIndex].pressed || false;
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
        
        var stick = Cast.toString(args.STICK).toLowerCase();
        var axis = Cast.toString(args.AXIS).toLowerCase();
        
        var stickMap = { 'left': { 'x': 0, 'y': 1 }, 'right': { 'x': 2, 'y': 3 } };

        var stickAxes = stickMap[stick];
        if (!stickAxes) return 0;

        var axisIndex = stickAxes[axis];
        if (axisIndex === undefined) return 0;

        var rawValue = this.activeController.axes[axisIndex] || 0;
        var normalizedValue = this._normalizeAxis(rawValue);
        
        return Math.round(normalizedValue * 100);
    }

    getStickDirection(args) {
        if (!this.activeController) return 0;
        
        var stick = Cast.toString(args.STICK).toLowerCase();
        
        var stickMap = { 'left': { 'x': 0, 'y': 1 }, 'right': { 'x': 2, 'y': 3 } };
        var stickAxes = stickMap[stick];
        if (!stickAxes) return 0;

        var x = this._normalizeAxis(this.activeController.axes[stickAxes.x] || 0);
        var y = this._normalizeAxis(this.activeController.axes[stickAxes.y] || 0);
        
        if (x === 0 && y === 0) return 90; // Default to pointing up

        var radians = Math.atan2(-y, x);
        var degrees = radians * 180 / Math.PI;
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
        var x = Cast.toNumber(args.X);
        var y = Cast.toNumber(args.Y);
        
        this.virtualCursor.x = Math.max(this.virtualCursor.minX, Math.min(this.virtualCursor.maxX, x));
        this.virtualCursor.y = Math.max(this.virtualCursor.minY, Math.min(this.virtualCursor.maxY, y));
    }

    vibrate(args) {
        if (!this.activeController) return;
        
        var duration = Cast.toNumber(args.DURATION);
        var intensity = Cast.toNumber(args.INTENSITY) / 100;
        
        var actuator = this.activeController.vibrationActuator;
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
        
        // Enhanced translation debug info
        console.log('🌐 === TRANSLATION DEBUG INFO ===');
        console.log('📍 Current locale:', currentLocale);
        console.log('📚 Available translation locales:', Object.keys(translations));
        console.log('🔧 formatMessage type:', typeof formatMessage);
        console.log('⚙️ formatMessage.setup exists:', typeof formatMessage.setup);
        console.log('🗄 runtimeRef available:', !!runtimeRef);
        
        // Test translation lookup
        var testMessage = formatMessage({id: 'gamepad.name', defaultMessage: 'Universal Gamepad'});
        console.log('🧪 Test message result:', testMessage);
        
        if (this.activeController) {
            console.log('🎮 === CONTROLLER INFO ===');
            var buttonStates = this.activeController.buttons.map(function(b, i) {
                return i + ':' + (b.pressed ? 'P' : 'R');
            }).join(' ');
            console.log('🔘 Buttons:', buttonStates);
            var axisValues = this.activeController.axes.map(function(a) {
                return a.toFixed(2);
            }).join(', ');
            console.log('📊 Axes:', axisValues);
            console.log('🖱 Cursor: x=' + this.virtualCursor.x.toFixed(1) + ', y=' + this.virtualCursor.y.toFixed(1));
        } else {
            console.log('⚠️ Connect a controller and press a button to begin.');
        }
        
        // Runtime inspection
        if (runtimeRef) {
            console.log('🔧 === RUNTIME DEBUG INFO ===');
            console.log('📊 Runtime keys:', Object.keys(runtimeRef));
            if (runtimeRef.formatMessage) {
                console.log('💬 Runtime.formatMessage available');
                if (typeof runtimeRef.formatMessage.setup === 'function') {
                    try {
                        var setup = runtimeRef.formatMessage.setup();
                        console.log('⚙️ Runtime formatMessage setup:', setup);
                    } catch (e) {
                        console.log('❌ Runtime formatMessage setup failed:', e);
                    }
                }
            }
        }
    }
    
    // Enhanced locale setting method
    setLocale(args) {
        var locale = Cast.toString(args.LOCALE);
        console.log('🔄 Setting locale from ' + currentLocale + ' to ' + locale);
        
        var oldLocale = currentLocale;
        currentLocale = locale;
        
        // Test the new locale
        var testMessage = formatMessage({id: 'gamepad.name', defaultMessage: 'Universal Gamepad'});
        console.log('🧪 Test message with new locale:', testMessage);
        
        // Verify translation exists
        var hasTranslations = translations.hasOwnProperty(locale);
        console.log('📚 Translations available for ' + locale + ':', hasTranslations);
        
        return 'Locale: ' + oldLocale + ' → ' + locale + '. Has translations: ' + hasTranslations + '. Test: ' + testMessage;
    }
    
    // New method to force locale re-detection
    forceLocaleDetection() {
        console.log('🔄 === FORCE LOCALE DETECTION ===');
        var oldLocale = currentLocale;
        currentLocale = detectLocale(runtimeRef);
        
        var testMessage = formatMessage({id: 'gamepad.name', defaultMessage: 'Universal Gamepad'});
        
        return 'Detected: ' + oldLocale + ' → ' + currentLocale + '. Test: ' + testMessage;
    }
}

module.exports = Scratch3GamepadBlocks;