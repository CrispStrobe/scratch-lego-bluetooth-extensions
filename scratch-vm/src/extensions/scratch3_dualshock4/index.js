const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAORJREFUeF7t2DEKwjAYQOG/qIMH8BbewNvY1Vt4A2/hDXQV3EQHwQOIOgiCiIODiIOLiCCCiAgOjooHD/BvhLyEjxmSH5CEJCRJkiRJkiRJkiRJkiSNB0mSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJGlSSJIkSZIkSZIkSZIkSZL+A2ggCAwANDVJREFUeF7t1jcQAAA=';

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
        
        // Controller state - using same approach as working version
        this.activeController = null;
        this.previousButtons = [];
        
        // Virtual cursor for advanced features
        this.virtualCursor = {
            x: 0,
            y: 0,
            maxX: 240,
            minX: -240,
            maxY: 180,
            minY: -180
        };

        console.log('🎮 Universal Gamepad extension initialized');
        
        // Start the polling loop - same as working version
        this._pollGamepads();
    }

    getInfo() {
        return {
            id: 'gamepad',
            name: 'Universal Gamepad',
            blockIconURI: blockIconURI,
            showStatusButton: true, // Show connection status
            blocks: [
                // Connection blocks
                {
                    opcode: 'isConnected',
                    text: 'gamepad connected?',
                    blockType: BlockType.BOOLEAN
                },

                {
                    opcode: 'getControllerInfo',
                    text: 'controller name',
                    blockType: BlockType.REPORTER
                },

                '---',

                // Button blocks - using same pattern as working version
                {
                    opcode: 'whenButtonPressed',
                    text: 'when [BUTTON] pressed',
                    blockType: BlockType.HAT,
                    arguments: {
                        BUTTON: {
                            type: ArgumentType.STRING,
                            menu: 'BUTTONS',
                            defaultValue: 'A'
                        }
                    }
                },

                {
                    opcode: 'isButtonPressed',
                    text: '[BUTTON] pressed?',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        BUTTON: {
                            type: ArgumentType.STRING,
                            menu: 'BUTTONS',
                            defaultValue: 'A'
                        }
                    }
                },

                '---',

                // Analog stick blocks - keeping better axis handling
                {
                    opcode: 'getStickValue',
                    text: '[STICK] stick [AXIS]',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        STICK: {
                            type: ArgumentType.STRING,
                            menu: 'STICKS',
                            defaultValue: 'left'
                        },
                        AXIS: {
                            type: ArgumentType.STRING,
                            menu: 'AXES',
                            defaultValue: 'x'
                        }
                    }
                },

                {
                    opcode: 'getStickDirection',
                    text: '[STICK] stick direction',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        STICK: {
                            type: ArgumentType.STRING,
                            menu: 'STICKS',
                            defaultValue: 'left'
                        }
                    }
                },

                '---',

                // Virtual cursor blocks
                {
                    opcode: 'getCursorX',
                    text: 'cursor x',
                    blockType: BlockType.REPORTER
                },

                {
                    opcode: 'getCursorY',
                    text: 'cursor y', 
                    blockType: BlockType.REPORTER
                },

                {
                    opcode: 'setCursorPosition',
                    text: 'set cursor to x: [X] y: [Y]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },

                '---',

                // Vibration blocks
                {
                    opcode: 'vibrate',
                    text: 'vibrate for [DURATION] ms at [INTENSITY]%',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        DURATION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 200
                        },
                        INTENSITY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50
                        }
                    }
                },

                '---',

                // Debug blocks
                {
                    opcode: 'showDebugInfo',
                    text: 'show gamepad debug info',
                    blockType: BlockType.COMMAND
                }
            ],
            menus: {
                BUTTONS: {
                    acceptReporters: true,
                    items: [
                        'A', 'B', 'X', 'Y',
                        'LB', 'RB', 'LT', 'RT',
                        'SELECT', 'START', 'LS', 'RS',
                        'UP', 'DOWN', 'LEFT', 'RIGHT',
                        'HOME'
                    ]
                },
                STICKS: {
                    acceptReporters: true,
                    items: ['left', 'right']
                },
                AXES: {
                    acceptReporters: true,
                    items: ['x', 'y']
                }
            }
        };
    }

    // Polling loop - same as working version
    _pollGamepads() {
        try {
            const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
            this.activeController = null;
            for (const gamepad of gamepads) {
                if (gamepad) {
                    this.activeController = gamepad;
                    this._updateVirtualCursor(gamepad); // Update cursor with right stick
                    break; // Use the first available controller
                }
            }
        } catch (e) {
            console.error('Gamepad polling error:', e);
        }
        
        // Request the next frame
        requestAnimationFrame(this._pollGamepads.bind(this));
    }

    // Update virtual cursor using right stick - improved version
    _updateVirtualCursor(gamepad) {
        if (gamepad.axes.length >= 4) {
            const rightX = this._normalizeAxis(gamepad.axes[2]); // Right stick X
            const rightY = this._normalizeAxis(gamepad.axes[3]); // Right stick Y
            
            const sensitivity = 2;
            this.virtualCursor.x += rightX * sensitivity;
            this.virtualCursor.y -= rightY * sensitivity; // Invert Y for natural feel
            
            // Clamp to bounds
            this.virtualCursor.x = Math.max(this.virtualCursor.minX, 
                Math.min(this.virtualCursor.maxX, this.virtualCursor.x));
            this.virtualCursor.y = Math.max(this.virtualCursor.minY, 
                Math.min(this.virtualCursor.maxY, this.virtualCursor.y));
        }
    }

    // Improved axis normalization with deadzone
    _normalizeAxis(value) {
        const deadzone = 0.15;
        if (Math.abs(value) < deadzone) return 0;
        
        // Scale to full range accounting for deadzone
        const sign = value < 0 ? -1 : 1;
        const normalized = (Math.abs(value) - deadzone) / (1 - deadzone);
        return sign * normalized;
    }

    // Button handling - same working logic as simple version
    whenButtonPressed(args) {
        if (!this.activeController) return false;
        
        const buttonIndex = GAMEPAD_BUTTONS[args.BUTTON];
        if (buttonIndex === undefined) return false;

        const wasPressed = this.previousButtons[buttonIndex] || false;
        const isPressed = this.activeController.buttons[buttonIndex]?.pressed || false;

        // Update the previous state for the next check
        this.previousButtons[buttonIndex] = isPressed;

        // Trigger the HAT block only on the rising edge (when it was not pressed, but now is)
        return !wasPressed && isPressed;
    }

    isButtonPressed(args) {
        if (!this.activeController) return false;
        
        const buttonIndex = GAMEPAD_BUTTONS[args.BUTTON];
        if (buttonIndex === undefined) return false;

        const isPressed = this.activeController.buttons[buttonIndex]?.pressed || false;
        
        // We still need to update the previous state even for boolean blocks
        this.previousButtons[buttonIndex] = isPressed;

        return isPressed;
    }

    // Connection status
    isConnected() {
        return !!this.activeController;
    }

    getControllerInfo() {
        if (!this.activeController) return 'No controller';
        return this.activeController.id;
    }

    // Improved stick handling
    getStickValue(args) {
        if (!this.activeController) return 0;
        
        const stick = Cast.toString(args.STICK).toLowerCase();
        const axis = Cast.toString(args.AXIS).toLowerCase();
        
        const stickMap = {
            'left': { 'x': 0, 'y': 1 },
            'right': { 'x': 2, 'y': 3 }
        };

        const stickAxes = stickMap[stick];
        if (!stickAxes) return 0;

        const axisIndex = stickAxes[axis];
        if (axisIndex === undefined) return 0;

        const rawValue = this.activeController.axes[axisIndex] || 0;
        const normalizedValue = this._normalizeAxis(rawValue);
        
        // Scale to Scratch's -100 to 100 range
        return Math.round(normalizedValue * 100);
    }

    getStickDirection(args) {
        if (!this.activeController) return 0;
        
        const stick = Cast.toString(args.STICK).toLowerCase();
        
        const stickMap = {
            'left': { 'x': 0, 'y': 1 },
            'right': { 'x': 2, 'y': 3 }
        };

        const stickAxes = stickMap[stick];
        if (!stickAxes) return 0;

        const x = this._normalizeAxis(this.activeController.axes[stickAxes.x] || 0);
        const y = this._normalizeAxis(this.activeController.axes[stickAxes.y] || 0);
        
        // Convert to degrees (0 = right, 90 = up, 180 = left, 270 = down)
        const radians = Math.atan2(-y, x);
        const degrees = (radians * 180 / Math.PI + 360) % 360;
        
        return Math.round(degrees);
    }

    // Virtual cursor blocks
    getCursorX() {
        return Math.round(this.virtualCursor.x);
    }

    getCursorY() {
        return Math.round(this.virtualCursor.y);
    }

    setCursorPosition(args) {
        const x = Cast.toNumber(args.X);
        const y = Cast.toNumber(args.Y);
        
        this.virtualCursor.x = Math.max(this.virtualCursor.minX,
            Math.min(this.virtualCursor.maxX, x));
        this.virtualCursor.y = Math.max(this.virtualCursor.minY,
            Math.min(this.virtualCursor.maxY, y));
    }

    // Vibration support
    vibrate(args) {
        if (!this.activeController) return;
        
        const duration = Cast.toNumber(args.DURATION);
        const intensity = Cast.toNumber(args.INTENSITY) / 100;
        
        if (!this.activeController.vibrationActuator) {
            console.log('⚠️ Vibration not supported on this controller');
            return;
        }

        try {
            this.activeController.vibrationActuator.playEffect('dual-rumble', {
                duration: duration,
                weakMagnitude: intensity,
                strongMagnitude: intensity
            });
            console.log(`📳 Vibration: ${duration}ms at ${Math.round(intensity*100)}%`);
        } catch (error) {
            console.log('⚠️ Vibration failed:', error);
        }
    }

    // Debug information
    showDebugInfo() {
        console.log('🎮 UNIVERSAL GAMEPAD DEBUG INFO');
        console.log('===============================');
        console.log('');
        console.log('🔍 Connection Status:');
        console.log(`   Connected: ${this.isConnected() ? '✅ YES' : '❌ NO'}`);
        
        if (this.activeController) {
            console.log(`   Controller: ${this.activeController.id}`);
            console.log(`   Index: ${this.activeController.index}`);
            console.log(`   Buttons: ${this.activeController.buttons.length}`);
            console.log(`   Axes: ${this.activeController.axes.length}`);
            console.log(`   Vibration: ${this.activeController.vibrationActuator ? 'Supported' : 'Not supported'}`);
            
            console.log('');
            console.log('🎮 Current Button States:');
            Object.entries(GAMEPAD_BUTTONS).forEach(([name, index]) => {
                if (this.activeController.buttons[index]?.pressed) {
                    console.log(`   ${name}: PRESSED`);
                }
            });
            
            console.log('');
            console.log('🕹️ Analog Stick Values:');
            const sticks = [
                { name: 'Left X', index: 0 },
                { name: 'Left Y', index: 1 },
                { name: 'Right X', index: 2 },
                { name: 'Right Y', index: 3 }
            ];
            
            sticks.forEach(stick => {
                if (this.activeController.axes[stick.index] !== undefined) {
                    const raw = this.activeController.axes[stick.index];
                    const normalized = this._normalizeAxis(raw);
                    if (Math.abs(normalized) > 0.01) {
                        console.log(`   ${stick.name}: ${normalized.toFixed(2)} (raw: ${raw.toFixed(2)})`);
                    }
                }
            });
            
            console.log('');
            console.log('🖱️ Virtual Cursor:');
            console.log(`   X: ${this.virtualCursor.x.toFixed(1)}`);
            console.log(`   Y: ${this.virtualCursor.y.toFixed(1)}`);
        } else {
            console.log('');
            console.log('💡 To use a gamepad:');
            console.log('   1. Connect any USB or Bluetooth controller');
            console.log('   2. Press any button to activate it');
            console.log('   3. Use the gamepad blocks in your project');
            console.log('');
            console.log('✅ Supported Controllers:');
            console.log('   • Xbox controllers (wired/wireless)');
            console.log('   • PlayStation controllers (DualShock, DualSense)');
            console.log('   • Nintendo Pro Controller');
            console.log('   • Most 3rd party USB/Bluetooth gamepads');
        }

        // Show all detected controllers
        try {
            const allGamepads = navigator.getGamepads();
            const detectedControllers = Array.from(allGamepads).filter(g => g !== null);
            
            if (detectedControllers.length > 0) {
                console.log('');
                console.log('🎮 All Detected Controllers:');
                detectedControllers.forEach(gamepad => {
                    console.log(`   ${gamepad.index}: ${gamepad.id}`);
                });
            }
        } catch (e) {
            console.log('⚠️ Error detecting controllers:', e);
        }
    }
}

module.exports = Scratch3GamepadBlocks;
