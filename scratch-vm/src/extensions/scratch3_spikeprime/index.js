const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const BT = require('../../io/bt');

// note: This extension supports LEGO Education SPIKE Prime Hub / Robot Inventor Hub
// with v. 2 firmware (legacy), which usese bluetooth classic (not ble)!
// you can switch firmwares by running *upgrade* from spike prime app (then you must use another extension which supports ble), 
// or *downgrade* from mindstorms app or https://spikelegacy.legoeducation.com/hubdowngrade/#step-1
// so that you can use *this* (bluetooth classic) extension here
// or you can use dfu-utils to exchange firmware: https://github.com/gpdaniels/spike-prime/

const Base64Util = require('../../util/base64-util');
const MathUtil = require('../../util/math-util');
const RateLimiter = require('../../util/rateLimiter.js');

const Color = require('./lib/color');
const setupTranslations = require('./lib/setup-translations');

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAASKG51AAAEUUlEQVR4Ae2cTWgTURDHZxORatUeFLUeqtaThSDFHopQ1HoQhB4LigjWq3pTEbUXK+LHUb2qICrYkwiCF7UUpYdq0UA9iFVbaFXqoWq1CMm6/022SZNsnsmb3X2kM7Dp5s17k5lf5r15KewjEhECQkAICAEhIASEgBBYjAQs7qB7r9zvoLR90rbtNsd2I7f9Ku1NWZY1TDHrat+pA4NV2ig5jBVg76W7Z2yyLpBts9ot6XkVjY5TabKot+/0wYtVDC85hC1QN/NS6efxeDzW2ZGg1kQzraivK/mhYTf+mp2jkeQYPR1MUiqVSlM8tosrE2NswWDaErnwOtpbjIGH+PBFwid8sfARSwxX3GwAs2uem3lcznHbwayAeL5y2F/CYSRrwy0YUU3b77NEt4aIkpMZbxIbiHraiVbX5yLM842tuHECzHka8h3gHe8n+jmX++CB90SvJ4iudS+EmOvBc8c2hXncqc4KMg/w2pqIbh/KXLhHG3RBSk0A9KbtsZ2ZbMO0xT3E02Xe8b/WBEB+LP9vsSYAomBArg8QYT3EhXuIp8u843+tiSKCaouCMTxOdPhODtJKZx8PXZBSEwCx5qHaqrYxQYCsCYAAA4gn9gSBqLzNmlgDy4cYrFYAavKNfgqPFvxDqMX5uV9OKu1fzhaDTjJQE6IAFICaBDSHR78Gqta8wgAr7V84nvm9TGFNoOFloF/1DLpdE5BquGSgipBCLwAVgFRqAagipNCHtwb6Vc+g2xUAdNWSgZoEw8vAoKutn31NQKrhkoEqQgq9AFQAUqkFoIqQQh/eGhh0tfWzrwCgq5YM1CQYXgb6OepXPStt97MfcLtkoCZgASgANQloDo9+DfSrnpW2a4KodrhM4WrJZcdFn4F+AfhVYb/+EbVLBmqCF4ACUJOA5nBz10C/KqwZMPdwmcKaRAWgANQkoDncyDXw1ZsPhOvb9Iwb3to1DbR92xb30oyXfbhRAPFYav+jlzT26cuCQCcmpwnX23efqbtrh1FPghoF0IPXsGo57d3dSpub1rkgP45/pSfPRlyw6NOzv3MB4CjfGFNEMGWReYB39Mg+Smzd6GYanrDEPdqgQx/0NUWMAggoyLxldUuL+KANOogALMJD8wXDm7YlusxPaa+4lOoTdpsxGRh24FyfZwxAbFUgKBh+4um8vn79wmw3BiD2eRBU2z9zf4sYoA06iNe3qFMEDUYBbN60nmZ+/KYbNx9T0tnzYV+IC/dogw59TAJo1D4Qm2RvL/jg4YuifAI89DFJOAFOOYE1ImPyTseoKFaMwyYZ2xRcXrXl+ikH37ICX1mEDSDOpnLOY+nCCUE45EZHgvrdC98g7jlaOg7mjeVbA52DvZzHBtM4XmlwaNRdu/I+J9JbZB58gm/wEYeQcTlU8Kikntlzl++dtdL2efd4JT1TgYx24Zl6+JgX8WI7/s6LW/4KASEgBISAEBACQkAILC4C/wDBL1fytvgQdgAAAABJRU5ErkJggg==';

let formatMessage = require('format-message');
let extensionURL = 'https://bricklife.com/scratch-gui/xcratch/spikeprime.mjs';

const BTSendRateMax = 40;

const SpikePorts = ['A', 'B', 'C', 'D', 'E', 'F'];

const SpikeMotorStopMode = {
    float: 0,
    brake: 1,
    hold: 2
};

const SpikeOrientation = {
    front: 1,
    back: 2,
    up: 3,
    down: 4,
    rightside: 5,
    leftside: 6
};

// Built-in sound files
const HubSoundFiles = [
    'menu_click', 'menu_fastback', 'menu_program_start', 
    'menu_program_stop', 'menu_shutdown', 'startup'
];

// 3x3 LED Color Matrix colors
const Matrix3x3Colors = {
    off: 0, magenta: 1, violet: 2, blue: 3, turquoise: 4,
    mint: 5, green: 6, yellow: 7, orange: 8, red: 9, white: 10
};

// Display patterns as matrices
const DisplayPatterns = {
    heart: '960000960960a60960960000960',
    smile: '760076000078000076000760',
    sad: '760076000087600076000760',
    angry: '970079000087600079000970',
    surprised: '760076000999900076000760',
    wink: '760070000078000076000760',
    arrow_up: '060060060686060606000000',
    arrow_down: '000060606068606060606000',
    arrow_left: '000060068006000060000000',
    arrow_right: '000600000680600060000000',
    check: '000000080000806080000000',
    x: '970000970000090000970000970',
    square: '979797900009900099000979797',
    triangle: '060060606996999999600000',
    diamond: '060060606906906060000600',
    plus: '060000600999996060000600',
    minus: '000000000999999000000000',
    dot: '000000000000a00000000000000',
    frame: '979797900009900099000979797',
    spiral: '979797060000900009000979797'
};

// Gestures
const aGestures = {
    DOUBLETAPPED: 'DOUBLETAPPED',
    FREEFALL: 'FREEFALL', 
    NONE: 'NONE',
    SHAKE: 'SHAKE',
    TAPPED: 'TAPPED'
};

// LED colors for center button
const CenterLEDColors = {
    OFF: 0, PINK: 1, PURPLE: 2, BLUE: 3, TEAL: 4, GREEN: 5,
    LIME: 6, YELLOW: 7, ORANGE: 8, RED: 9, WHITE: 10, GREY: 11
};

// Sound waveforms
const SoundWaveforms = {
    sin: 'hub.sound.SOUND_SIN',
    square: 'hub.sound.SOUND_SQUARE', 
    triangle: 'hub.sound.SOUND_TRIANGLE',
    sawtooth: 'hub.sound.SOUND_SAWTOOTH'
};

class SpikeMotorSetting {
    constructor() {
        this._speed = 75;
        this._stopMode = SpikeMotorStopMode.brake;
        this._stallDetection = true;
    }

    get speed() { return this._speed; }
    set speed(value) { this._speed = MathUtil.clamp(value, -100, 100); }
    
    get stopMode() { return this._stopMode; }
    set stopMode(value) { if (value >= 0 && value <= 2) this._stopMode = value; }
    
    get stallDetection() { return this._stallDetection; }
    set stallDetection(value) { this._stallDetection = value; }
}

class SpikePrime {
    constructor(runtime, extensionId) {
        this._runtime = runtime;
        this._extensionId = extensionId;

        this._remainingText = '';

        this._sensors = {
            buttons: [0, 0, 0, 0],
            angle: { pitch: 0, roll: 0, yaw: 0 },
            acceleration: { x: 0, y: 0, z: 0 },
            accelerationFiltered: { x: 0, y: 0, z: 0 },
            gyro: { x: 0, y: 0, z: 0 },
            gyroFiltered: { x: 0, y: 0, z: 0 },
            orientation: SpikeOrientation.front,
            battery: 100,
            temperature: 25,
            hubTemp: 25,
            gestures: {
                tapped: false,
                doubletapped: false,
                shake: false,
                freefall: false
            },
            hubStatus: {},
            motorPositions: {},
            buttonTiming: {}
        };

        this._portValues = {};
        this._pixelBrightness = 100;

        this._motorSettings = {
            A: new SpikeMotorSetting(),
            B: new SpikeMotorSetting(),
            C: new SpikeMotorSetting(),
            D: new SpikeMotorSetting(),
            E: new SpikeMotorSetting(),
            F: new SpikeMotorSetting()
        };

        // Movement motor pair and timer functionality
        this._movementMotors = ['A', 'B'];
        this._timer = { start: Date.now(), current: 0 };
        this._volume = 100;

        // REPL functionality
        this._replHistory = [];
        this._replVariables = {};
        this._replOutput = '';

        this._bt = null;
        this._runtime.registerPeripheralExtension(extensionId, this);
        this._runtime.on('PROJECT_STOP_ALL', this.stopAll.bind(this));

        this._rateLimiter = new RateLimiter(BTSendRateMax);

        this.reset = this.reset.bind(this);
        this._onConnect = this._onConnect.bind(this);
        this._onMessage = this._onMessage.bind(this);

        this._openRequests = {};
        
        this._pythonAvailable = false;
        this._sensorLoopRunning = false;

        // Update timer every 10ms
        setInterval(() => {
            this._timer.current = (Date.now() - this._timer.start) / 1000;
        }, 10);
    }

    // Getters
    get angle() { return this._sensors.angle; }
    get orientation() { return this._sensors.orientation; }
    get portValues() { return this._portValues; }
    get pixelBrightness() { return this._pixelBrightness; }
    set pixelBrightness(value) { this._pixelBrightness = value; }
    get motorSettings() { return this._motorSettings; }
    get acceleration() { return this._sensors.acceleration; }
    get accelerationFiltered() { return this._sensors.accelerationFiltered; }
    get gyro() { return this._sensors.gyro; }
    get gyroFiltered() { return this._sensors.gyroFiltered; }
    get battery() { return this._sensors.battery; }
    get temperature() { return this._sensors.temperature; }
    get hubTemp() { return this._sensors.hubTemp; }
    get gestures() { return this._sensors.gestures; }
    get movementMotors() { return this._movementMotors; }
    get timer() { return this._timer.current; }
    get volume() { return this._volume; }
    get replOutput() { return this._replOutput; }
    get replHistory() { return this._replHistory; }

    beep(freq, time) {
        //console.log(`freq: ${freq}, time: ${time}`);
    }

    stopAll() {
        this.stopAllMotors();
        this.stopSound();
    }

    stopSound() {
        this.sendPythonCommand('import hub; hub.sound.stop()');
    }

    stopAllMotors() {
        this.sendPythonCommand('import hub; [hub.port[p].motor.stop() for p in "ABCDEF" if hasattr(hub.port[p], "motor")]');
    }

    scan() {
        if (this._bt) {
            this._bt.disconnect();
        }
        this._bt = new BT(this._runtime, this._extensionId, {
            majorDeviceClass: 8,
            minorDeviceClass: 1
        }, this._onConnect, this.reset, this._onMessage);
    }

    connect(id) {
        if (this._bt) {
            this._bt.connectPeripheral(id);
        }
    }

    disconnect() {
        if (this._bt) {
            this._bt.disconnect();
        }
        this.reset();
    }

    reset() {
        this._remainingText = '';

        this._sensors = {
            buttons: [0, 0, 0, 0],
            angle: { pitch: 0, roll: 0, yaw: 0 },
            acceleration: { x: 0, y: 0, z: 0 },
            accelerationFiltered: { x: 0, y: 0, z: 0 },
            gyro: { x: 0, y: 0, z: 0 },
            gyroFiltered: { x: 0, y: 0, z: 0 },
            orientation: SpikeOrientation.front,
            battery: 100,
            temperature: 25,
            hubTemp: 25,
            gestures: {
                tapped: false, doubletapped: false, shake: false, freefall: false
            },
            hubStatus: {},
            motorPositions: {},
            buttonTiming: {}
        };

        this._portValues = {};
        this._pythonAvailable = false;
        this._sensorLoopRunning = false;
        
        // Reset timer and REPL
        this._timer.start = Date.now();
        this._timer.current = 0;
        this._replOutput = '';
        this._replHistory = [];
        this._replVariables = {};
    }

    isConnected() {
        let connected = false;
        if (this._bt) {
            connected = this._bt.isConnected();
        }
        return connected;
    }
    
    // Sends a JSON-RPC command (for built-in functions)
    sendJSON(json, useLimiter = false) {
        const jsonText = JSON.stringify(json);
        return this.sendRaw(`${jsonText}\r`, useLimiter, json.i);
    }

    // Sends a raw string (for Python REPL commands)
    sendRaw(text, useLimiter = false, id = null) {
        if (!this.isConnected()) return Promise.resolve();

        if (useLimiter) {
            if (!this._rateLimiter.okayToSend()) return Promise.resolve();
        }

        if (!id) {
            return this._bt.sendMessage({ message: text });
        }
        
        const promise = new Promise((resolve, reject) => {
            this._openRequests[id] = { resolve, reject };
        });

        this._bt.sendMessage({ message: text });
        return promise;
    }

    sendCommand(method, params, needsResponse = true) {
        if (needsResponse) {
            const id = Math.random().toString(36).slice(-4);
            return this.sendJSON({ i: id, m: method, p: params });
        }
        return this.sendJSON({ m: method, p: params });
    }

    // Send raw Python code to the REPL
    sendPythonCommand(pythonCode) {
        return this.sendRaw(`${pythonCode}\r\n`);
    }

    // REPL-specific command that captures output
    sendReplCommand(pythonCode) {
        this._replHistory.push(pythonCode);
        if (this._replHistory.length > 50) {
            this._replHistory.shift(); // Keep only last 50 commands
        }
        
        // Wrap command to capture output
        const wrappedCode = `
try:
    _result = eval("${pythonCode.replace(/"/g, '\\"')}")
    if _result is not None:
        print(f">>> {_result}")
    else:
        exec("${pythonCode.replace(/"/g, '\\"')}")
        print(">>> Command executed")
except Exception as e:
    print(f">>> Error: {e}")
`;
        return this.sendPythonCommand(wrappedCode);
    }

    _onConnect() {
        // Send Ctrl-C to interrupt any running program and enter the REPL
        this.sendRaw('\x03'); 
        
        setTimeout(() => {
            // Attempt to confirm Python REPL is active
            this.sendRaw('import hub\r\nprint("PYTHON_AVAILABLE")\r\n');
            // Re-request initial state data
            this.sendCommand('trigger_current_state', {}, false);
        }, 250); // Delay to allow the hub to switch to REPL mode
    }

    // Start continuous sensor monitoring
    _initializeContinuousSensorMonitoring() {
        if (!this._pythonAvailable || this._sensorLoopRunning) return;

        this._sensorLoopRunning = true;
        console.log("Starting continuous sensor monitoring script on hub...");
        
        const sensorScript = `
import hub, utime, sys
def continuous_sensor_loop():
    while True:
        try:
            # Motion sensors
            yaw_angle, pitch_angle, roll_angle = hub.motion.position()
            accel_x, accel_y, accel_z = hub.motion.accelerometer()
            orientation = hub.motion.orientation()
            # Temperatures
            battery_temp = hub.battery.temperature()
            hub_temp = hub.temperature()
            
            # Motor data
            motor_data = {}
            for port in 'ABCDEF':
                if hasattr(hub.port[port], 'motor'):
                    try:
                        speed, rel_deg, abs_deg, pwm = hub.port[port].motor.get()
                        motor_data[port] = f"{speed},{rel_deg},{abs_deg},{pwm}"
                    except: pass
            motor_str = "|".join([f"{k}:{v}" for k, v in motor_data.items()])
            
            # Print data in a single, parseable line
            print(f"SENSORS:{yaw_angle},{pitch_angle},{roll_angle}|{accel_x},{accel_y},{accel_z}|{orientation}|{battery_temp},{hub_temp}|{motor_str}")

            # Gesture detection
            for gesture in ['tapped', 'doubletapped', 'shake', 'freefall']:
                if hub.motion.was_gesture(gesture):
                    print(f"GESTURE:{gesture.upper()}")
        except Exception as e:
            pass # Ignore errors in the loop to keep it running
        utime.sleep_ms(100)
continuous_sensor_loop()
`;
        // Send the script to the REPL for execution
        this.sendPythonCommand(sensorScript);
    }
    
    _onMessage(params) {
        const message = params.message;
        const data = Base64Util.base64ToUint8Array(message);
        const text = (new TextDecoder()).decode(data);
        const responses = (this._remainingText + text).split('\r\n');
        this._remainingText = responses.pop();

        for (const responseText of responses) {
            const trimmedText = responseText.trim();
            if (!trimmedText) continue;

            // First, try to parse as JSON (for standard hub responses)
            try {
                const json = JSON.parse(trimmedText);
                if (json.hasOwnProperty('i') || json.m !== 0) {
                    //console.log('< JSON: ' + trimmedText);
                }
                this._parseResponse(json);
            } catch (error) {
                // If not JSON, treat it as raw output from our Python script
                //console.log('< RAW: ' + trimmedText);
                this._parseData(trimmedText);
            }
        }
    }

    _parseData(dataText) {
        try {
            if (dataText.startsWith('SENSORS:')) {
                const sensorData = dataText.substring(8);
                const parts = sensorData.split('|');
                
                if (parts.length >= 5) {
                    // Angles
                    const angles = parts[0].split(',').map(parseFloat);
                    if (angles.length === 3) this._sensors.angle = { yaw: angles[0], pitch: angles[1], roll: angles[2] };
                    
                    // Acceleration
                    const accel = parts[1].split(',').map(parseFloat);
                    if (accel.length === 3) this._sensors.acceleration = { x: accel[0], y: accel[1], z: accel[2] };
                    
                    // Orientation
                    this._sensors.orientation = parseInt(parts[2], 10);

                    // Temperatures
                    const temps = parts[3].split(',').map(parseFloat);
                    if (temps.length >= 2) {
                        this._sensors.temperature = temps[0];
                        this._sensors.hubTemp = temps[1];
                    }
                    
                    // Motor positions
                    if (parts[4]) {
                        const motorPairs = parts[4].split('|');
                        for (const pair of motorPairs) {
                            const [port, values] = pair.split(':');
                            if (port && values) {
                                const [speed, relDeg, absDeg, pwm] = values.split(',').map(parseFloat);
                                this._sensors.motorPositions[port] = { speed, relativePosition: relDeg, absolutePosition: absDeg, power: pwm };
                            }
                        }
                    }
                }
            } else if (dataText.startsWith('GESTURE:')) {
                const gesture = dataText.substring(8).toLowerCase();
                if (this._sensors.gestures.hasOwnProperty(gesture)) {
                    this._sensors.gestures[gesture] = true;
                    setTimeout(() => { this._sensors.gestures[gesture] = false; }, 100);
                }
            } else if (dataText.includes('PYTHON_AVAILABLE')) {
                if (!this._pythonAvailable) {
                    this._pythonAvailable = true;
                    console.log('Python REPL is available on hub.');
                    this._initializeContinuousSensorMonitoring();
                }
            } else if (dataText.startsWith('>>>')) {
                // NEW: Capture REPL output
                this._replOutput += dataText + '\n';
                // Keep only last 1000 characters to prevent memory issues
                if (this._replOutput.length > 1000) {
                    this._replOutput = this._replOutput.substring(this._replOutput.length - 1000);
                }
            }
        } catch (error) {
            console.warn('Error parsing raw data:', error, 'Data:', dataText);
        }
    }

    _parseResponse(response) {
        if (response.hasOwnProperty('m')) {
            switch (response.m) {
                case 0:
                    // Hub status - enhanced parsing
                    this._parseHubStatus(response);
                    break;
                case 1:
                    // Storage
                    break;
                case 2:
                    // Battery - enhanced
                    if (response.p && response.p.length >= 2) {
                        this._sensors.battery = Math.round(response.p[1]);
                    }
                    break;
                case 3:
                    // Button - enhanced
                    this._parseButtonEvent(response);
                    break;
                case 4:
                    // Event (Orientation, Gesture) - enhanced
                    this._parseEventResponse(response);
                    break;
                default:
                    break;
            }
        }

        if (response.hasOwnProperty('i')) {
            const openRequest = this._openRequests[response.i];
            delete this._openRequests[response.i];
            if (openRequest) {
                openRequest.resolve();
            }
        }
    }

    _parseHubStatus(response) {
        // Enhanced port parsing with more sensor types
        for (let i = 0; i < 6; i++) {
            const port = SpikePorts[i];
            const deviceId = response.p[i][0];
            const values = response.p[i][1];
            
            switch (deviceId) {
                case 48: // Large motor
                case 49: // Medium motor
                    this._portValues[port] = {
                        type: 'motor',
                        speed: values[0],
                        degreesCounted: values[1],
                        position: (values[2] + 360) % 360,
                        power: values[3],
                        relativePosition: values[1] || 0,
                        absolutePosition: values[2] || 0
                    };
                    break;
                case 61: // Color sensor
                    if (values.length >= 4) {
                        this._portValues[port] = {
                            type: 'color',
                            color: values[0],
                            reflection: values[1],
                            ambient: values[2],
                            red: values[3] || 0,
                            green: values[4] || 0,
                            blue: values[5] || 0
                        };
                    }
                    break;
                case 62: // Distance sensor
                    this._portValues[port] = {
                        type: 'distance',
                        distance: values[0] === -1 ? 0 : values[0]
                    };
                    break;
                case 63: // Force sensor
                    this._portValues[port] = {
                        type: 'force',
                        force: values[0],
                        pressed: values[1] > 0
                    };
                    break;
                default:
                    this._portValues[port] = { type: 'unknown' };
                    break;
            }
        }

        // Enhanced angle and motion parsing
        if (response.p.length > 8) {
            // Standard angle data
            if (response.p[8] && response.p[8].length >= 3) {
                this._sensors.angle = {
                    yaw: response.p[8][0],
                    pitch: response.p[8][1],
                    roll: response.p[8][2]
                };
            }
        }
    }

    _parseButtonEvent(response) {
        if (response.p && response.p.length >= 2) {
            const button = response.p[0];
            const pressed = response.p[1] === 1;
            
            const buttonIndex = { left: 0, center: 1, right: 2 }[button];
            if (buttonIndex !== undefined) {
                this._sensors.buttons[buttonIndex] = pressed ? 1 : 0;
            }
        }
    }

    _parseEventResponse(response) {
        if (SpikeOrientation.hasOwnProperty(response.p)) {
            this._sensors.orientation = SpikeOrientation[response.p];
        }
        
        // Enhanced gesture parsing
        const gestureMap = {
            'tapped': 'tapped',
            'doubletapped': 'doubletapped', 
            'shake': 'shake',
            'freefall': 'freefall'
        };
        
        if (gestureMap[response.p]) {
            this._sensors.gestures[gestureMap[response.p]] = true;
            
            // Reset gesture after short delay
            setTimeout(() => {
                this._sensors.gestures[gestureMap[response.p]] = false;
            }, 100);
        }
    }
}

class Scratch3SpikePrimeBlocks {
    static get EXTENSION_ID() {
        return 'spikeprime';
    }

    // Static flag to ensure registration only happens once.
    static fieldRegistered = false;

    static get extensionURL() {
        return extensionURL;
    }

    static set extensionURL(url) {
        extensionURL = url;
    }

    constructor(runtime) {

        this.runtime = runtime;
        this._peripheral = new SpikePrime(this.runtime, Scratch3SpikePrimeBlocks.EXTENSION_ID);

        this._playNoteForPicker = this._playNoteForPicker.bind(this);
        this.runtime.on('PLAY_NOTE', this._playNoteForPicker);

        if (runtime.formatMessage) {
            formatMessage = runtime.formatMessage;
        }
    }

    getInfo() {
        setupTranslations(formatMessage);

        return {
            id: Scratch3SpikePrimeBlocks.EXTENSION_ID,
            name: 'SPIKE Prime Ultimate',
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: [
                // ===== MOVEMENT CONTROLS (NEW) =====
                {
                    opcode: 'setMovementMotors',
                    text: 'set movement motors [PORT_A] and [PORT_B]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT_A: { type: ArgumentType.STRING, menu: 'PORT', defaultValue: 'A' },
                        PORT_B: { type: ArgumentType.STRING, menu: 'PORT', defaultValue: 'B' }
                    }
                },
                {
                    opcode: 'moveForward',
                    text: 'move [DIRECTION] for [VALUE] [UNIT]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        DIRECTION: { type: ArgumentType.STRING, menu: 'MOVE_DIRECTION', defaultValue: 'forward' },
                        VALUE: { type: ArgumentType.NUMBER, defaultValue: 10 },
                        UNIT: { type: ArgumentType.STRING, menu: 'MOVE_UNIT', defaultValue: 'cm' }
                    }
                },
                {
                    opcode: 'steer',
                    text: 'start steering [STEERING]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        STEERING: { type: ArgumentType.NUMBER, defaultValue: 50 }
                    }
                },
                {
                    opcode: 'startTank',
                    text: 'start tank drive left [LEFT_SPEED] right [RIGHT_SPEED]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        LEFT_SPEED: { type: ArgumentType.NUMBER, defaultValue: 50 },
                        RIGHT_SPEED: { type: ArgumentType.NUMBER, defaultValue: 50 }
                    }
                },
                {
                    opcode: 'setMovementSpeed',
                    text: 'set movement speed to [SPEED]%',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        SPEED: { type: ArgumentType.NUMBER, defaultValue: 50 }
                    }
                },
                {
                    opcode: 'stopMovement',
                    text: 'stop movement',
                    blockType: BlockType.COMMAND
                },
                
                '---',
                
                // ===== MOTOR CONTROL =====
                {
                    opcode: 'motorRunFor',
                    text: formatMessage({
                        id: 'legobluetooth.motorRunFor',
                        default: '[PORT] run [DIRECTION] for [VALUE] [UNIT]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'MULTIPLE_PORT',
                            defaultValue: 'A'
                        },
                        DIRECTION: {
                            type: ArgumentType.NUMBER,
                            menu: 'DIRECTION',
                            defaultValue: 1
                        },
                        VALUE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        UNIT: {
                            type: ArgumentType.STRING,
                            menu: 'MOTOR_UNIT',
                            defaultValue: 'rotations'
                        }
                    }
                },
                {
                    opcode: 'motorRunToPosition',
                    text: '[PORT] run to position [POSITION] degrees',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: { type: ArgumentType.STRING, menu: 'PORT', defaultValue: 'C' },
                        POSITION: { type: ArgumentType.ANGLE, defaultValue: 0 }
                    }
                },
                {
                    opcode: 'motorStart',
                    text: formatMessage({
                        id: 'legobluetooth.motorStart',
                        default: '[PORT] start motor [DIRECTION]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'MULTIPLE_PORT',
                            defaultValue: 'A'
                        },
                        DIRECTION: {
                            type: ArgumentType.NUMBER,
                            menu: 'DIRECTION',
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'motorStop',
                    text: formatMessage({
                        id: 'legobluetooth.motorStop',
                        default: '[PORT] stop motor'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'MULTIPLE_PORT',
                            defaultValue: 'A'
                        }
                    }
                },
                {
                    opcode: 'motorSetSpeed',
                    text: formatMessage({
                        id: 'legobluetooth.motorSetSpeed',
                        default: '[PORT] set speed to [SPEED] %'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'MULTIPLE_PORT',
                            defaultValue: 'A'
                        },
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 75
                        }
                    }
                },
                {
                    opcode: 'motorSetStopAction',
                    text: '[PORT] set stop action to [ACTION]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: { type: ArgumentType.STRING, menu: 'PORT', defaultValue: 'A' },
                        ACTION: { type: ArgumentType.STRING, menu: 'STOP_ACTION', defaultValue: 'brake' }
                    }
                },
                {
                    opcode: 'getPosition',
                    text: formatMessage({
                        id: 'legobluetooth.getPosition',
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
                
                // ===== MOTOR ENHANCEMENTS =====
                {
                    opcode: 'getRelativePosition',
                    text: '[PORT] relative position',
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
                    opcode: 'getAbsolutePosition',
                    text: '[PORT] absolute position',
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
                    opcode: 'getSpeed',
                    text: '[PORT] speed (deg/s)',
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
                    text: 'reset [PORT] motor position to [POSITION]',
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
                
                // ===== DISPLAY CONTROL =====
                {
                    opcode: 'displayText',
                    text: formatMessage({
                        id: 'legobluetooth.displayText',
                        default: 'write [TEXT]'
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
                    opcode: 'displayImage',
                    text: formatMessage({
                        id: 'legobluetooth.displayImage',
                        default: 'turn on [MATRIX]'
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
                    opcode: 'displayPattern',
                    text: 'display pattern [PATTERN]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PATTERN: {
                            type: ArgumentType.STRING,
                            menu: 'DISPLAY_PATTERN',
                            defaultValue: 'heart'
                        }
                    }
                },
                {
                    opcode: 'displayClear',
                    text: formatMessage({
                        id: 'legobluetooth.displayClear',
                        default: 'turn off pixels'
                    }),
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'setPixel',
                    text: 'set pixel [X] [Y] to [BRIGHTNESS] %',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        },
                        BRIGHTNESS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    }
                },
                {
                    opcode: 'rotateDisplay',
                    text: 'rotate display [ANGLE] degrees',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ANGLE: {
                            type: ArgumentType.STRING,
                            menu: 'ROTATION_ANGLE',
                            defaultValue: '90'
                        }
                    }
                },
                {
                    opcode: 'setCenterButtonColor',
                    text: 'set center button to [COLOR]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        COLOR: {
                            type: ArgumentType.STRING,
                            menu: 'CENTER_LED_COLOR',
                            defaultValue: 'GREEN'
                        }
                    }
                },
                
                '---',
                
                // ===== IMU & GYRO =====
                {
                    opcode: 'getAngle',
                    text: formatMessage({
                        id: 'legobluetooth.getAngle',
                        default: '[AXIS] angle'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        AXIS: {
                            type: ArgumentType.STRING,
                            menu: 'AXIS',
                            defaultValue: 'pitch'
                        }
                    }
                },
                {
                    opcode: 'getGyroRate',
                    text: 'gyro rate [AXIS] (deg/s)',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        AXIS: {
                            type: ArgumentType.STRING,
                            menu: 'AXIS',
                            defaultValue: 'yaw'
                        }
                    }
                },
                {
                    opcode: 'getFilteredGyroRate',
                    text: 'filtered gyro rate [AXIS] (deg/s)',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        AXIS: {
                            type: ArgumentType.STRING,
                            menu: 'AXIS',
                            defaultValue: 'yaw'
                        }
                    }
                },
                {
                    opcode: 'getAcceleration',
                    text: 'acceleration [AXIS] (milli-g)',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        AXIS: {
                            type: ArgumentType.STRING,
                            menu: 'AXIS_XYZ',
                            defaultValue: 'x'
                        }
                    }
                },
                {
                    opcode: 'getFilteredAcceleration',
                    text: 'filtered acceleration [AXIS] (milli-g)',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        AXIS: {
                            type: ArgumentType.STRING,
                            menu: 'AXIS_XYZ',
                            defaultValue: 'x'
                        }
                    }
                },
                {
                    opcode: 'resetYaw',
                    text: 'reset yaw angle',
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'presetYaw',
                    text: 'preset yaw to [ANGLE] degrees',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ANGLE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                
                '---',
                
                // ===== 3X3 LED COLOR MATRIX =====

                /**
                 * Interactive 3x3 LED matrix pattern designer block
                 * Features clickable grid with color picker and brightness control
                 */
                {
                    opcode: 'setMatrix3x3Custom',
                    text: 'set [PORT] 3x3 custom pattern [PATTERN]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        PATTERN: {
                            type: ArgumentType.STRING,
                            defaultValue: 'r8 g6 b4\ny7 w9 o5\nm3 v2 .1'
                        }
                    }
                },
                {
                    opcode: 'setMatrix3x3Visual',
                    text: 'set [PORT] 3x3: ╔[R1C1][R1C2][R1C3]╗ ║[R2C1][R2C2][R2C3]║ ╚[R3C1][R3C2][R3C3]╝',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        R1C1: { type: ArgumentType.STRING, defaultValue: 'r8', menu: 'MATRIX_3X3_QUICK' },
                        R1C2: { type: ArgumentType.STRING, defaultValue: '.1', menu: 'MATRIX_3X3_QUICK' },
                        R1C3: { type: ArgumentType.STRING, defaultValue: 'r8', menu: 'MATRIX_3X3_QUICK' },
                        R2C1: { type: ArgumentType.STRING, defaultValue: 'r6', menu: 'MATRIX_3X3_QUICK' },
                        R2C2: { type: ArgumentType.STRING, defaultValue: 'r10', menu: 'MATRIX_3X3_QUICK' },
                        R2C3: { type: ArgumentType.STRING, defaultValue: 'r6', menu: 'MATRIX_3X3_QUICK' },
                        R3C1: { type: ArgumentType.STRING, defaultValue: '.1', menu: 'MATRIX_3X3_QUICK' },
                        R3C2: { type: ArgumentType.STRING, defaultValue: 'r8', menu: 'MATRIX_3X3_QUICK' },
                        R3C3: { type: ArgumentType.STRING, defaultValue: '.1', menu: 'MATRIX_3X3_QUICK' }
                    }
                },
                {
                    opcode: 'generateMatrix3x3Code',
                    text: 'generate 3x3 code for pattern [PATTERN]',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        PATTERN: {
                            type: ArgumentType.STRING,
                            defaultValue: 'r8 .1 r8\nr6 r10 r6\n.1 r8 .1'
                        }
                    }
                },
                {
                    opcode: 'setMatrix3x3Color',
                    text: 'set [PORT] 3x3 matrix all [COLOR] brightness [BRIGHTNESS]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        COLOR: {
                            type: ArgumentType.STRING,
                            menu: 'MATRIX_3X3_COLOR',
                            defaultValue: 'red'
                        },
                        BRIGHTNESS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        }
                    }
                },
                {
                    opcode: 'setMatrix3x3Pixel',
                    text: 'set [PORT] 3x3 pixel [X] [Y] to [COLOR] brightness [BRIGHTNESS]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        },
                        COLOR: {
                            type: ArgumentType.STRING,
                            menu: 'MATRIX_3X3_COLOR',
                            defaultValue: 'red'
                        },
                        BRIGHTNESS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        }
                    }
                },
                {
                    opcode: 'setMatrix3x3Level',
                    text: 'set [PORT] 3x3 battery level to [LEVEL]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        LEVEL: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        }
                    }
                },
                {
                    opcode: 'setMatrix3x3Transition',
                    text: 'set [PORT] 3x3 transition [EFFECT]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        EFFECT: {
                            type: ArgumentType.STRING,
                            menu: 'MATRIX_3X3_TRANSITION',
                            defaultValue: 'none'
                        }
                    }
                },
                {
                    opcode: 'clearMatrix3x3',
                    text: 'clear [PORT] 3x3 matrix',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        }
                    }
                },
                
                '---',
                
                // ===== ENHANCED GESTURES =====
                {
                    opcode: 'whenGesture',
                    blockType: BlockType.HAT,
                    text: 'when hub [GESTURE]',
                    arguments: {
                        GESTURE: {
                            type: ArgumentType.STRING,
                            menu: 'GESTURE',
                            defaultValue: 'tapped'
                        }
                    }
                },
                {
                    opcode: 'isGesture',
                    blockType: BlockType.BOOLEAN,
                    text: 'hub [GESTURE]?',
                    arguments: {
                        GESTURE: {
                            type: ArgumentType.STRING,
                            menu: 'GESTURE',
                            defaultValue: 'tapped'
                        }
                    }
                },
                {
                    opcode: 'getOrientation',
                    text: 'orientation',
                    blockType: BlockType.REPORTER
                },
                
                '---',
                
                // ===== SOUND SYSTEM =====
                {
                    opcode: 'playHubSound',
                    text: 'play hub sound [SOUND]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        SOUND: {
                            type: ArgumentType.STRING,
                            menu: 'HUB_SOUND',
                            defaultValue: 'startup'
                        }
                    }
                },
                {
                    opcode: 'playBeep',
                    text: 'beep [FREQUENCY] Hz for [DURATION] ms',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        FREQUENCY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 440
                        },
                        DURATION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: 'playNote',
                    text: 'play note [NOTE] for [SECS] seconds',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NOTE: { type: ArgumentType.NOTE, defaultValue: 60 },
                        SECS: { type: ArgumentType.NUMBER, defaultValue: 0.5 }
                    }
                },
                {
                    opcode: 'playWaveBeep',
                    text: 'beep [WAVEFORM] [FREQUENCY] Hz for [DURATION] ms',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        WAVEFORM: {
                            type: ArgumentType.STRING,
                            menu: 'WAVEFORM',
                            defaultValue: 'sin'
                        },
                        FREQUENCY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 440
                        },
                        DURATION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 500
                        }
                    }
                },
                {
                    opcode: 'setVolume',
                    text: 'set volume to [VOLUME]%',
                    blockType: BlockType.COMMAND,
                    arguments: { 
                        VOLUME: { type: ArgumentType.NUMBER, defaultValue: 100 } 
                    }
                },
                {
                    opcode: 'stopSound',
                    text: 'stop all sounds',
                    blockType: BlockType.COMMAND
                },
                
                '---',
                
                // ===== STATUS & TEMPERATURE =====
                {
                    opcode: 'getBatteryLevel',
                    text: 'battery level %',
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getBatteryTemperature',
                    text: 'battery temperature',
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getHubTemperature',
                    text: 'hub temperature',
                    blockType: BlockType.REPORTER
                },
                
                '---',
                
                // ===== TIMER FUNCTIONALITY (NEW) =====
                {
                    opcode: 'getTimer',
                    text: 'timer',
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'resetTimer',
                    text: 'reset timer',
                    blockType: BlockType.COMMAND
                },
                
                '---',
                
                // ===== SENSOR BLOCKS (HIGH CONFIDENCE) =====
                {
                    opcode: 'getDistance',
                    text: '[PORT] distance',
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
                    text: 'set [PORT] distance lights [TL] [TR] [BL] [BR]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        TL: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 9
                        },
                        TR: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 9
                        },
                        BL: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 9
                        },
                        BR: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 9
                        }
                    }
                },
                {
                    opcode: 'getColor',
                    text: '[PORT] color',
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
                    opcode: 'getReflection',
                    text: '[PORT] reflection',
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
                    opcode: 'getAmbientLight',
                    text: '[PORT] ambient light',
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
                    opcode: 'getForce',
                    text: '[PORT] force',
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
                    opcode: 'isForceSensorPressed',
                    text: '[PORT] force sensor pressed?',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        }
                    }
                },
                
                // ===== EVENT-BASED SENSOR BLOCKS (NEW) =====
                {
                    opcode: 'whenColor',
                    blockType: BlockType.HAT,
                    text: 'when [PORT] sees [COLOR]',
                    arguments: {
                        PORT: { type: ArgumentType.STRING, menu: 'PORT', defaultValue: 'A' },
                        COLOR: { type: ArgumentType.STRING, menu: 'COLOR', defaultValue: 'red' }
                    }
                },
                {
                    opcode: 'isColor',
                    blockType: BlockType.BOOLEAN,
                    text: '[PORT] sees [COLOR]?',
                    arguments: {
                        PORT: { type: ArgumentType.STRING, menu: 'PORT', defaultValue: 'A' },
                        COLOR: { type: ArgumentType.STRING, menu: 'COLOR', defaultValue: 'red' }
                    }
                },
                {
                    opcode: 'whenForceSensor',
                    blockType: BlockType.HAT,
                    text: 'when [PORT] is [STATE]',
                    arguments: {
                        PORT: { type: ArgumentType.STRING, menu: 'PORT', defaultValue: 'A' },
                        STATE: { type: ArgumentType.STRING, menu: 'FORCE_STATE', defaultValue: 'pressed' }
                    }
                },
                
                '---',
                
                // ===== BUTTON ENHANCEMENTS =====
                {
                    opcode: 'isButtonPressed',
                    text: '[BUTTON] button pressed?',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        BUTTON: {
                            type: ArgumentType.STRING,
                            menu: 'BUTTON',
                            defaultValue: 'center'
                        }
                    }
                },
                {
                    opcode: 'whenButtonPressed',
                    blockType: BlockType.HAT,
                    text: 'when [BUTTON] button pressed',
                    arguments: {
                        BUTTON: {
                            type: ArgumentType.STRING,
                            menu: 'BUTTON',
                            defaultValue: 'center'
                        }
                    }
                },
                
                '---',
                
                // ===== PYTHON REPL (NEW) =====
                {
                    opcode: 'runReplCommand',
                    text: 'run Python REPL: [CODE]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        CODE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'print("Hello REPL!")'
                        }
                    }
                },
                {
                    opcode: 'getReplOutput',
                    text: 'REPL output',
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'clearReplOutput',
                    text: 'clear REPL output',
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'getReplHistory',
                    text: 'REPL command [INDEX]',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        INDEX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: -1
                        }
                    }
                },
                
                '---',
                
                // ===== ADVANCED PYTHON COMMANDS (HIGH CONFIDENCE) =====
                {
                    opcode: 'runPythonCommand',
                    text: 'run Python: [CODE]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        CODE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'print("Hello World")'
                        }
                    }
                },
                {
                    opcode: 'runHubCommand',
                    text: 'run hub command: [CODE]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        CODE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'hub.status()'
                        }
                    }
                },
                {
                    opcode: 'exitScript',
                    text: 'exit Python script',
                    blockType: BlockType.COMMAND
                }
            ],
            menus: {
                PORT: {
                    acceptReporters: true,
                    items: SpikePorts
                },
                MULTIPLE_PORT: {
                    acceptReporters: true,
                    items: ['A', 'B', 'C', 'D', 'E', 'F', 'A+B', 'C+D', 'E+F', 'A+B+C+D+E+F']
                },
                MOTOR_UNIT: {
                    acceptReporters: false,
                    items: [
                        { text: 'rotations', value: 'rotations' },
                        { text: 'degrees', value: 'degrees' },
                        { text: 'seconds', value: 'seconds' }
                    ]
                },
                AXIS: {
                    acceptReporters: false,
                    items: ['pitch', 'roll', 'yaw']
                },
                AXIS_XYZ: {
                    acceptReporters: false,
                    items: ['x', 'y', 'z']
                },
                DIRECTION: {
                    acceptReporters: false,
                    items: [
                        { text: '⬆︎', value: '1' },
                        { text: '⬇', value: '-1' }
                    ]
                },
                DISPLAY_PATTERN: {
                    acceptReporters: false,
                    items: Object.keys(DisplayPatterns)
                },
                ROTATION_ANGLE: {
                    acceptReporters: false,
                    items: ['90', '-90', '180', '-180']
                },
                CENTER_LED_COLOR: {
                    acceptReporters: false,
                    items: Object.keys(CenterLEDColors)
                },
                GESTURE: {
                    acceptReporters: false,
                    items: ['tapped', 'doubletapped', 'shake', 'freefall']
                },
                HUB_SOUND: {
                    acceptReporters: false,
                    items: HubSoundFiles
                },
                WAVEFORM: {
                    acceptReporters: false,
                    items: Object.keys(SoundWaveforms)
                },
                BUTTON: {
                    acceptReporters: false,
                    items: ['left', 'center', 'right', 'connect']
                },
                // NEW MENUS
                MOVE_DIRECTION: {
                    acceptReporters: false,
                    items: ['forward', 'backward']
                },
                MOVE_UNIT: {
                    acceptReporters: false,
                    items: ['cm', 'in', 'rotations', 'degrees', 'seconds']
                },
                STOP_ACTION: {
                    acceptReporters: false,
                    items: ['coast', 'brake', 'hold']
                },
                COLOR: {
                    acceptReporters: true,
                    items: ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta', 'white', 'black']
                },
                FORCE_STATE: {
                    acceptReporters: false,
                    items: ['pressed', 'hard pressed', 'released']
                },
                MATRIX_PRESET: {
                    acceptReporters: false,
                    items: [
                        { text: '❤️ Heart', value: 'heart' },
                        { text: '😊 Smile', value: 'smile' },
                        { text: '😢 Sad', value: 'sad' },
                        { text: '😠 Angry', value: 'angry' },
                        { text: '😮 Surprised', value: 'surprised' },
                        { text: '😉 Wink', value: 'wink' },
                        { text: '⬆️ Arrow Up', value: 'arrow_up' },
                        { text: '⬇️ Arrow Down', value: 'arrow_down' },
                        { text: '⬅️ Arrow Left', value: 'arrow_left' },
                        { text: '➡️ Arrow Right', value: 'arrow_right' },
                        { text: '✅ Check', value: 'check' },
                        { text: '❌ X', value: 'x' },
                        { text: '⚫ Dot', value: 'dot' },
                        { text: '🔲 Frame', value: 'frame' },
                        { text: '🌀 Spiral', value: 'spiral' }
                    ]
                },
                MATRIX_3X3_QUICK: {
                    acceptReporters: false,
                    items: [
                        '.1', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10',
                        'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10',
                        'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10',
                        'y1', 'y2', 'y3', 'y4', 'y5', 'y6', 'y7', 'y8', 'y9', 'y10',
                        'w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9', 'w10'
                    ]
                },
                MATRIX_3X3_COLOR: {
                    acceptReporters: false,
                    items: Object.keys(Matrix3x3Colors)
                },
                MATRIX_3X3_HELP: {
                    acceptReporters: false,
                    items: ['colors', 'format', 'brightness', 'heart']
                },
                MATRIX_3X3_TRANSITION: {
                    acceptReporters: false,
                    items: ['none', 'fade', 'slide']
                }
            }
        };
    }

    // ===== MOVEMENT IMPLEMENTATIONS (NEW) =====
    setMovementMotors(args) {
        this._peripheral._movementMotors = [
            Cast.toString(args.PORT_A).trim().toUpperCase(),
            Cast.toString(args.PORT_B).trim().toUpperCase()
        ];
        const [portA, portB] = this._peripheral._movementMotors;
        return this._peripheral.sendPythonCommand(`from spike import MotorPair; motors = MotorPair('${portA}', '${portB}')`);
    }

    moveForward(args) {
        const direction = Cast.toString(args.DIRECTION);
        const value = Cast.toNumber(args.VALUE);
        const unit = Cast.toString(args.UNIT);
        const [portA, portB] = this._peripheral._movementMotors;
        const speed = this._peripheral.motorSettings[portA].speed;
        const dirMultiplier = (direction === 'forward') ? 1 : -1;
        
        if (unit === 'cm') {
            // Approximate conversion: 1 rotation = 17.6 cm for standard SPIKE wheels
            const rotations = value / 17.6;
            return this._peripheral.sendPythonCommand(`motors.move(${rotations * dirMultiplier}, 'rotations', speed=${speed})`);
        } else if (unit === 'in') {
            const rotations = value / 6.93; // 1 rotation ≈ 6.93 inches
            return this._peripheral.sendPythonCommand(`motors.move(${rotations * dirMultiplier}, 'rotations', speed=${speed})`);
        } else {
            return this._peripheral.sendPythonCommand(`motors.move(${value * dirMultiplier}, '${unit}', speed=${speed})`);
        }
    }

    steer(args) {
        const steering = Cast.toNumber(args.STEERING);
        const [portA] = this._peripheral._movementMotors;
        const speed = this._peripheral.motorSettings[portA].speed;
        return this._peripheral.sendPythonCommand(`motors.start(${steering}, speed=${speed})`);
    }
    
    startTank(args) {
        const leftSpeed = Cast.toNumber(args.LEFT_SPEED);
        const rightSpeed = Cast.toNumber(args.RIGHT_SPEED);
        return this._peripheral.sendPythonCommand(`motors.start_tank(${leftSpeed}, ${rightSpeed})`);
    }

    setMovementSpeed(args) {
        const speed = Cast.toNumber(args.SPEED);
        const [portA, portB] = this._peripheral._movementMotors;
        this._peripheral.motorSettings[portA].speed = speed;
        this._peripheral.motorSettings[portB].speed = speed;
        return this._peripheral.sendPythonCommand(`motors.set_default_speed(${speed})`);
    }

    stopMovement() {
        return this._peripheral.sendPythonCommand('motors.stop()');
    }

    // ===== MOTOR IMPLEMENTATIONS =====
    
    /**
     * Run motor(s) for specified amount in specified unit
     * @param {object} args - Block arguments
     * @returns {Promise} Command execution promise
     */
    motorRunFor(args) {
        const direction = args.DIRECTION;
        const value = Cast.toNumber(args.VALUE);
        const unit = args.UNIT;
        const ports = this._validatePorts(Cast.toString(args.PORT));

        switch (unit) {
            case 'rotations':
                return this._motorRunForDegrees(ports, direction, value * 360);
            case 'degrees':
                return this._motorRunForDegrees(ports, direction, value);
            case 'seconds':
                return this._motorRunTimed(ports, direction, value);
            default:
                return Promise.resolve();
        }
    }

    motorRunToPosition(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        const position = Cast.toNumber(args.POSITION);
        const speed = this._peripheral.motorSettings[port].speed;
        return this._peripheral.sendPythonCommand(`hub.port.${port}.motor.run_to_position(${position}, speed=${speed})`);
    }

    /**
     * Run motors for specific number of degrees
     * @param {Array} ports - Array of port letters
     * @param {number} direction - Direction multiplier (1 or -1)
     * @param {number} degrees - Degrees to rotate
     * @returns {Promise} Command execution promise
     */
    _motorRunForDegrees(ports, direction, degrees) {
        const promises = ports.map(port => {
            const setting = this._peripheral.motorSettings[port];
            
            // Try both standard command and Python method
            const standardCommand = this._peripheral.sendCommand('scratch.motor_run_for_degrees', {
                port: port,
                speed: setting.speed * direction,
                degrees: Math.floor(degrees),
                stop: setting.stopMode,
                stall: setting.stallDetection
            });
            
            const altCommand = this._peripheral.sendPythonCommand(
                `import hub; hub.port.${port}.motor.run_for_degrees(${Math.floor(degrees)}, ${setting.speed * direction})`
            );
            
            return standardCommand.catch(() => altCommand);
        });
        
        return Promise.all(promises).then(() => { });
    }

    /**
     * Run motors for specific time duration
     * @param {Array} ports - Array of port letters
     * @param {number} direction - Direction multiplier (1 or -1)  
     * @param {number} seconds - Time in seconds
     * @returns {Promise} Command execution promise
     */
    _motorRunTimed(ports, direction, seconds) {
        const promises = ports.map(port => {
            const setting = this._peripheral.motorSettings[port];
            
            const standardCommand = this._peripheral.sendCommand('scratch.motor_run_timed', {
                port: port,
                speed: setting.speed * direction,
                time: Math.floor(seconds * 1000),
                stop: setting.stopMode,
                stall: setting.stallDetection
            });
            
            const altCommand = this._peripheral.sendPythonCommand(
                `import hub; hub.port.${port}.motor.run_for_time(${Math.floor(seconds * 1000)}, ${setting.speed * direction})`
            );
            
            return standardCommand.catch(() => altCommand);
        });
        
        return Promise.all(promises).then(() => { });
    }

    motorStart(args) {
        const direction = args.DIRECTION;
        const ports = this._validatePorts(Cast.toString(args.PORT));

        const promises = ports.map(port => {
            const setting = this._peripheral.motorSettings[port];
            
            const standardCommand = this._peripheral.sendCommand('scratch.motor_start', {
                port: port,
                speed: setting.speed * direction,
                stall: setting.stallDetection
            });
            
            const altCommand = this._peripheral.sendPythonCommand(
                `import hub; hub.port.${port}.motor.pwm(${Math.round(setting.speed * direction)})`
            );
            
            return standardCommand.catch(() => altCommand);
        });
        
        return Promise.all(promises).then(() => { });
    }

    motorStop(args) {
        const ports = this._validatePorts(Cast.toString(args.PORT));

        const promises = ports.map(port => {
            const setting = this._peripheral.motorSettings[port];
            
            const standardCommand = this._peripheral.sendCommand('scratch.motor_stop', {
                port: port,
                stop: setting.stopMode
            });
            
            const altCommand = this._peripheral.sendPythonCommand(
                `import hub; hub.port.${port}.motor.stop()`
            );
            
            return standardCommand.catch(() => altCommand);
        });
        
        return Promise.all(promises).then(() => { });
    }

    motorSetSpeed(args) {
        const speed = Cast.toNumber(args.SPEED);
        const ports = this._validatePorts(Cast.toString(args.PORT));

        ports.forEach(port => {
            this._peripheral.motorSettings[port].speed = speed;
        });
    }

    motorSetStopAction(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        const action = Cast.toString(args.ACTION);
        const stopModeMap = {coast: 0, brake: 1, hold: 2};
        this._peripheral.motorSettings[port].stopMode = stopModeMap[action] || 1;
        return this._peripheral.sendPythonCommand(`hub.port.${port}.motor.set_stop_action('${action}')`);
    }

    getPosition(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        return this._peripheral.portValues[port]?.position ?? 0;
    }

    // ===== MOTOR ENHANCEMENTS (FIXED - HIGH CONFIDENCE) =====
    getRelativePosition(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        
        // FIXED: Return data from continuous sensor loop, not stale local variable
        const altData = this._peripheral._sensors.motorPositions[port];
        if (altData) {
            return altData.relativePosition;
        }
        
        // Fallback to standard data
        return this._peripheral.portValues[port]?.relativePosition ?? 0;
    }

    getAbsolutePosition(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        
        // FIXED: Return data from continuous sensor loop
        const altData = this._peripheral._sensors.motorPositions[port];
        if (altData) {
            return altData.absolutePosition;
        }
        
        // Fallback to standard data
        return this._peripheral.portValues[port]?.absolutePosition ?? 0;
    }

    getSpeed(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        
        // FIXED: Use speed data directly, not conversion
        const altData = this._peripheral._sensors.motorPositions[port];
        if (altData) {
            // alt data is already in the correct format
            return Math.round(altData.speed * 9.3); // Convert to deg/s using alt factor
        }
        
        // Fallback to standard data with conversion
        const speedPercent = this._peripheral.portValues[port]?.speed ?? 0;
        return Math.round(speedPercent * 9.3);
    }

    resetMotorPosition(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        const position = Cast.toNumber(args.POSITION);
        
        // Use alt preset method
        return this._peripheral.sendPythonCommand(
            `import hub; hub.port.${port}.motor.preset(${position})`
        );
    }

    // ===== DISPLAY IMPLEMENTATIONS =====
    
    /**
     * Display text on hub's 5x5 LED matrix
     * @param {object} args - Block arguments
     * @returns {Promise} Command execution promise  
     */
    displayText(args) {
        const text = Cast.toString(args.TEXT);
        
        const standardCommand = this._peripheral.sendCommand('scratch.display_text', { text: text });
        const altCommand = this._peripheral.sendPythonCommand(
            `import hub; hub.display.show("${text.replace(/"/g, '\\"')}")`
        );
        
        return standardCommand.catch(() => altCommand);
    }

    /**
     * Display custom 5x5 image pattern on hub
     * @param {object} args - Block arguments
     * @returns {Promise} Command execution promise
     */
    displayImage(args) {
        const matrix = Cast.toString(args.MATRIX);
        
        // Standard approach
        const brightness = Math.round(9 * this._peripheral.pixelBrightness / 100);
        const symbol = (matrix.replace(/\D/g, '') + '0'.repeat(25)).slice(0, 25);
        const image = symbol.replace(/1/g, brightness).match(/.{5}/g).join(':');

        const standardCommand = this._peripheral.sendCommand('scratch.display_image', { image: image });
        
        // alt extended approach  
        const altImage = symbol.replace(/1/g, '9').replace(/0/g, '_').match(/.{5}/g).join(':');
        const altCommand = this._peripheral.sendPythonCommand(
            `import hub; hub.display.show(hub.Image("${altImage}"))`
        );
        
        return standardCommand.catch(() => altCommand);
    }

    displayPattern(args) {
        const pattern = Cast.toString(args.PATTERN);
        const patternData = DisplayPatterns[pattern];
        
        if (patternData) {
            return this.displayImage({ MATRIX: patternData });
        }
        return Promise.resolve();
    }

    displayClear() {
        const standardCommand = this._peripheral.sendCommand('scratch.display_clear', {});
        const altCommand = this._peripheral.sendPythonCommand('import hub; hub.display.show(" ")');
        
        return standardCommand.catch(() => altCommand);
    }

    setPixel(args) {
        const x = Cast.toNumber(args.X) - 1;
        const y = Cast.toNumber(args.Y) - 1;
        const brightness = Cast.toNumber(args.BRIGHTNESS);
        
        if (x < 0 || x > 4 || y < 0 || y > 4) return Promise.resolve();
        
        const standardCommand = this._peripheral.sendCommand('scratch.display_set_pixel', {
            x: x, y: y, brightness: Math.round(brightness * 9 / 100)
        });
        
        const altCommand = this._peripheral.sendPythonCommand(
            `import hub; hub.display.pixel(${x}, ${y}, ${Math.round(brightness * 9 / 100)})`
        );
        
        return standardCommand.catch(() => altCommand);
    }

    rotateDisplay(args) {
        const angle = Cast.toString(args.ANGLE);
        
        // alt rotation method
        return this._peripheral.sendPythonCommand(
            `import hub; hub.display.rotation(${angle})`
        );
    }

    setCenterButtonColor(args) {
        const colorName = Cast.toString(args.COLOR);
        const colorValue = CenterLEDColors[colorName] || 0;
        
        const standardCommand = this._peripheral.sendCommand('scratch.center_button_lights', {
            color: colorValue
        });
        
        const altCommand = this._peripheral.sendPythonCommand(
            `import hub; hub.led(${colorValue})`
        );
        
        return standardCommand.catch(() => altCommand);
    }

    // ===== IMU & GYRO =====
    getAngle(args) {
        const axis = Cast.toString(args.AXIS);
        return this._peripheral.angle[axis] || 0;
    }

    getGyroRate(args) {
        const axis = Cast.toString(args.AXIS);
        // FIXED: Return data from continuous sensor loop
        return this._peripheral.gyro[axis] || 0;
    }

    getFilteredGyroRate(args) {
        const axis = Cast.toString(args.AXIS);
        // FIXED: Return data from continuous sensor loop
        return this._peripheral.gyroFiltered[axis] || 0;
    }

    getAcceleration(args) {
        const axis = Cast.toString(args.AXIS);
        // FIXED: Return data from continuous sensor loop
        return this._peripheral.acceleration[axis] || 0;
    }

    getFilteredAcceleration(args) {
        const axis = Cast.toString(args.AXIS);
        // FIXED: Return data from continuous sensor loop
        return this._peripheral.accelerationFiltered[axis] || 0;
    }

    resetYaw() {
        this._peripheral._timer.start = Date.now(); // Also reset timer as convenience
        return this._peripheral.sendPythonCommand('import hub; hub.motion.reset_yaw()');
    }

    presetYaw(args) {
        const angle = Cast.toNumber(args.ANGLE);
        return this._peripheral.sendPythonCommand(`import hub; hub.motion.preset_yaw(${angle})`);
    }

    // ===== 3X3 LED COLOR MATRIX IMPLEMENTATIONS =====
    
    setMatrix3x3Visual(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        
        // Collect all 9 pixel values
        const pixelArgs = ['R1C1', 'R1C2', 'R1C3', 'R2C1', 'R2C2', 'R2C3', 'R3C1', 'R3C2', 'R3C3'];
        const pixelPattern = pixelArgs.map(arg => Cast.toString(args[arg]) || '.1').join(' ');
        
        // Use the same parsing logic as the custom pattern
        return this.setMatrix3x3Custom({ PORT: port, PATTERN: pixelPattern });
    }
    
    generateMatrix3x3Code(args) {
        const pattern = Cast.toString(args.PATTERN);
        
        // Parse the pattern to generate both Python code and Scratch code
        const colorCodes = {
            '.': 0, 'm': 1, 'v': 2, 'b': 3, 't': 4,
            'n': 5, 'g': 6, 'y': 7, 'o': 8, 'r': 9, 'w': 10
        };
        
        try {
            const lines = pattern.split(/\n|\|/);
            const pixels = [];
            
            for (const line of lines) {
                const pixelCodes = line.trim().split(/\s+/);
                for (const code of pixelCodes) {
                    if (code.length >= 2) {
                        const colorChar = code.charAt(0).toLowerCase();
                        const brightnessStr = code.substring(1);
                        
                        const colorId = colorCodes[colorChar] !== undefined ? colorCodes[colorChar] : 0;
                        const brightness = Math.max(1, Math.min(10, parseInt(brightnessStr) || 1));
                        
                        pixels.push(brightness * 16 + colorId);
                    }
                }
            }
            
            // Ensure we have exactly 9 pixels
            while (pixels.length < 9) pixels.push(0x01);
            pixels.splice(9);
            
            // Generate hex byte string
            const hexString = pixels.map(b => `\\x${b.toString(16).padStart(2, '0')}`).join('');
            
            // Return the code format
            return `hub.port.A.device.mode(2, b"${hexString}")`;
            
        } catch (error) {
            return 'Error parsing pattern';
        }
    }
    
    setMatrix3x3Simple(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        
        // Collect all 9 pixel values
        const pixelArgs = ['R1C1', 'R1C2', 'R1C3', 'R2C1', 'R2C2', 'R2C3', 'R3C1', 'R3C2', 'R3C3'];
        const pixelPattern = pixelArgs.map(arg => Cast.toString(args[arg]) || '.1').join(' ');
        
        // Use the same parsing logic as the custom pattern
        return this.setMatrix3x3Custom({ PORT: port, PATTERN: pixelPattern });
    }
    
    setMatrix3x3Custom(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        const pattern = Cast.toString(args.PATTERN);
        
        // Parse visual pattern format: "r8 g6 b4\ny7 w9 o5\nm3 v2 .1"
        // Color codes: .(off), m(magenta), v(violet), b(blue), t(turquoise), n(mint), g(green), y(yellow), o(orange), r(red), w(white)
        const colorCodes = {
            '.': 0, 'm': 1, 'v': 2, 'b': 3, 't': 4,
            'n': 5, 'g': 6, 'y': 7, 'o': 8, 'r': 9, 'w': 10
        };
        
        try {
            // Split by lines and parse each pixel
            const lines = pattern.split(/\n|\|/); // Support both \n and | as separators
            const pixels = [];
            
            for (const line of lines) {
                const pixelCodes = line.trim().split(/\s+/); // Split by spaces
                for (const code of pixelCodes) {
                    if (code.length >= 2) {
                        const colorChar = code.charAt(0).toLowerCase();
                        const brightnessStr = code.substring(1);
                        
                        const colorId = colorCodes[colorChar] !== undefined ? colorCodes[colorChar] : 0;
                        const brightness = Math.max(1, Math.min(10, parseInt(brightnessStr) || 1));
                        
                        pixels.push(brightness * 16 + colorId);
                    }
                }
            }
            
            // Ensure we have exactly 9 pixels, pad or truncate as needed
            while (pixels.length < 9) pixels.push(0x01); // Default: off with brightness 1
            pixels.splice(9); // Truncate to 9 pixels
            
            // Convert to hex byte string for Python
            const byteString = pixels.map(b => `\\x${b.toString(16).padStart(2, '0')}`).join('');
            
            // Use documented method
            return this._peripheral.sendPythonCommand(
                `import hub; matrix = hub.port.${port}.device; matrix.mode(2); matrix.mode(2, b"${byteString}")`
            );
            
        } catch (error) {
            console.warn('Error parsing 3x3 pattern:', error);
            // Fallback to off pattern
            return this._peripheral.sendPythonCommand(
                `import hub; matrix = hub.port.${port}.device; matrix.mode(2); matrix.mode(2, b"\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x01")`
            );
        }
    }
    
    setMatrix3x3Pattern(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        const pattern = Cast.toString(args.PATTERN);
        
        // Define 3x3 patterns (using documented color IDs: 0=off, 1=magenta, 2=violet, 3=blue, 4=turquoise, 5=mint, 6=green, 7=yellow, 8=orange, 9=red, 10=white)
        const patterns = {
            heart: [
                {color: 9, brightness: 8}, {color: 0, brightness: 1}, {color: 9, brightness: 8},
                {color: 9, brightness: 6}, {color: 9, brightness: 10}, {color: 9, brightness: 6},
                {color: 0, brightness: 1}, {color: 9, brightness: 8}, {color: 0, brightness: 1}
            ],
            smile: [
                {color: 7, brightness: 6}, {color: 0, brightness: 1}, {color: 7, brightness: 6},
                {color: 0, brightness: 1}, {color: 7, brightness: 8}, {color: 0, brightness: 1},
                {color: 7, brightness: 6}, {color: 0, brightness: 1}, {color: 7, brightness: 6}
            ],
            star: [
                {color: 0, brightness: 1}, {color: 7, brightness: 8}, {color: 0, brightness: 1},
                {color: 7, brightness: 6}, {color: 7, brightness: 10}, {color: 7, brightness: 6},
                {color: 0, brightness: 1}, {color: 7, brightness: 8}, {color: 0, brightness: 1}
            ],
            arrow_up: [
                {color: 0, brightness: 1}, {color: 6, brightness: 8}, {color: 0, brightness: 1},
                {color: 6, brightness: 6}, {color: 6, brightness: 8}, {color: 6, brightness: 6},
                {color: 0, brightness: 1}, {color: 6, brightness: 6}, {color: 0, brightness: 1}
            ],
            arrow_down: [
                {color: 0, brightness: 1}, {color: 3, brightness: 6}, {color: 0, brightness: 1},
                {color: 3, brightness: 6}, {color: 3, brightness: 8}, {color: 3, brightness: 6},
                {color: 0, brightness: 1}, {color: 3, brightness: 8}, {color: 0, brightness: 1}
            ],
            arrow_left: [
                {color: 0, brightness: 1}, {color: 8, brightness: 6}, {color: 0, brightness: 1},
                {color: 8, brightness: 8}, {color: 8, brightness: 6}, {color: 0, brightness: 1},
                {color: 0, brightness: 1}, {color: 8, brightness: 6}, {color: 0, brightness: 1}
            ],
            arrow_right: [
                {color: 0, brightness: 1}, {color: 8, brightness: 6}, {color: 0, brightness: 1},
                {color: 0, brightness: 1}, {color: 8, brightness: 6}, {color: 8, brightness: 8},
                {color: 0, brightness: 1}, {color: 8, brightness: 6}, {color: 0, brightness: 1}
            ],
            x: [
                {color: 9, brightness: 7}, {color: 0, brightness: 1}, {color: 9, brightness: 7},
                {color: 0, brightness: 1}, {color: 9, brightness: 9}, {color: 0, brightness: 1},
                {color: 9, brightness: 7}, {color: 0, brightness: 1}, {color: 9, brightness: 7}
            ],
            check: [
                {color: 0, brightness: 1}, {color: 0, brightness: 1}, {color: 6, brightness: 8},
                {color: 0, brightness: 1}, {color: 6, brightness: 8}, {color: 6, brightness: 6},
                {color: 6, brightness: 8}, {color: 0, brightness: 1}, {color: 0, brightness: 1}
            ],
            dot: [
                {color: 0, brightness: 1}, {color: 0, brightness: 1}, {color: 0, brightness: 1},
                {color: 0, brightness: 1}, {color: 10, brightness: 10}, {color: 0, brightness: 1},
                {color: 0, brightness: 1}, {color: 0, brightness: 1}, {color: 0, brightness: 1}
            ],
            frame: [
                {color: 3, brightness: 6}, {color: 3, brightness: 6}, {color: 3, brightness: 6},
                {color: 3, brightness: 6}, {color: 0, brightness: 1}, {color: 3, brightness: 6},
                {color: 3, brightness: 6}, {color: 3, brightness: 6}, {color: 3, brightness: 6}
            ]
        };
        
        const patternData = patterns[pattern] || patterns.dot;
        
        // Encode to bytes using documented method: brightness*16 + color
        const bytes = patternData.map(pixel => {
            const brightness = Math.max(1, Math.min(10, pixel.brightness));
            const color = Math.max(0, Math.min(10, pixel.color));
            return brightness * 16 + color;
        });
        
        // Convert to hex byte string for Python
        const byteString = bytes.map(b => `\\x${b.toString(16).padStart(2, '0')}`).join('');
        
        // Use documented method from the research
        return this._peripheral.sendPythonCommand(
            `import hub; matrix = hub.port.${port}.device; matrix.mode(2); matrix.mode(2, b"${byteString}")`
        );
    }
    
    setMatrix3x3Color(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        const colorName = Cast.toString(args.COLOR);
        const brightness = MathUtil.clamp(Cast.toNumber(args.BRIGHTNESS), 1, 10);
        
        // Map color names to IDs (from documentation)
        const colorMap = {
            'off': 0, 'magenta': 1, 'violet': 2, 'blue': 3, 'turquoise': 4,
            'mint': 5, 'green': 6, 'yellow': 7, 'orange': 8, 'red': 9, 'white': 10
        };
        
        const colorId = colorMap[colorName] || 0;
        
        // Use mode 1 for solid color (from documentation)
        return this._peripheral.sendPythonCommand(
            `import hub; matrix = hub.port.${port}.device; matrix.mode(1); matrix.mode(1, b"\\x${colorId.toString(16).padStart(2, '0')}")`
        );
    }
    
    setMatrix3x3Pixel(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        const x = MathUtil.clamp(Cast.toNumber(args.X) - 1, 0, 2);
        const y = MathUtil.clamp(Cast.toNumber(args.Y) - 1, 0, 2);
        const colorName = Cast.toString(args.COLOR);
        const brightness = MathUtil.clamp(Cast.toNumber(args.BRIGHTNESS), 1, 10);
        
        const colorMap = {
            'off': 0, 'magenta': 1, 'violet': 2, 'blue': 3, 'turquoise': 4,
            'mint': 5, 'green': 6, 'yellow': 7, 'orange': 8, 'red': 9, 'white': 10
        };
        
        const colorId = colorMap[colorName] || 0;
        const value = brightness * 16 + colorId;
        const index = y * 3 + x;
        
        // Get current matrix state or create new one
        const pythonCode = `
import hub
matrix = hub.port.${port}.device
matrix.mode(2)

# Create array of current values (or default to off)
current = [0x01] * 9  # Default: off with brightness 1
current[${index}] = 0x${value.toString(16).padStart(2, '0')}

# Convert to byte string
byte_string = bytes(current)
matrix.mode(2, byte_string)
`;
        
        return this._peripheral.sendPythonCommand(pythonCode);
    }
    
    setMatrix3x3Level(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        const level = MathUtil.clamp(Cast.toNumber(args.LEVEL), 0, 9);
        
        // Use mode 0 for battery level display (from documentation)
        return this._peripheral.sendPythonCommand(
            `import hub; matrix = hub.port.${port}.device; matrix.mode(0); matrix.mode(0, b"\\x${level.toString(16).padStart(2, '0')}")`
        );
    }
    
    setMatrix3x3Transition(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        const effect = Cast.toString(args.EFFECT);
        
        // Use mode 3 for transitions (from documentation)
        return this._peripheral.sendPythonCommand(
            `import hub; matrix = hub.port.${port}.device; matrix.mode(3, b"\\x${effect.padStart(2, '0')}")`
        );
    }
    
    clearMatrix3x3(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        
        // Set all pixels to off (brightness 1, color 0)
        return this._peripheral.sendPythonCommand(
            `import hub; matrix = hub.port.${port}.device; matrix.mode(2); matrix.mode(2, b"\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x01")`
        );
    }

    // ===== GESTURE IMPLEMENTATIONS (HIGH CONFIDENCE) =====
    whenGesture(args) {
        return this.isGesture(args);
    }

    isGesture(args) {
        const gesture = Cast.toString(args.GESTURE);
        return this._peripheral.gestures[gesture] || false;
    }

    getOrientation() {
        const orientationNames = ['up', 'front', 'right', 'down', 'back', 'left'];
        return orientationNames[this._peripheral.orientation] || 'unknown';
    }

    // ===== SOUND IMPLEMENTATIONS (HIGH CONFIDENCE) =====
    playHubSound(args) {
        const sound = Cast.toString(args.SOUND);
        
        // Use sound file method
        return this._peripheral.sendPythonCommand(
            `import hub; hub.sound.play("/sounds/${sound}")`
        );
    }

    playBeep(args) {
        const frequency = Cast.toNumber(args.FREQUENCY);
        const duration = Cast.toNumber(args.DURATION);
        
        const standardCommand = this._peripheral.sendCommand('scratch.sound_beep', {
            frequency: frequency, duration: duration
        });
        
        const altCommand = this._peripheral.sendPythonCommand(
            `import hub; hub.sound.beep(${frequency}, ${duration}, hub.sound.SOUND_SIN)`
        );
        
        return standardCommand.catch(() => altCommand);
    }

    playNote(args) {
        const note = Cast.toNumber(args.NOTE);
        const secs = Cast.toNumber(args.SECS);
        const freq = this._noteToFrequency(note);
        const volume = this._peripheral.volume / 100;
        return this._peripheral.sendPythonCommand(`hub.sound.beep(${Math.round(freq)}, ${Math.round(secs * 1000)}, hub.sound.SOUND_SIN, ${volume})`);
    }

    playWaveBeep(args) {
        const waveform = Cast.toString(args.WAVEFORM);
        const frequency = Cast.toNumber(args.FREQUENCY);
        const duration = Cast.toNumber(args.DURATION);
        
        const waveformCode = SoundWaveforms[waveform] || SoundWaveforms.sin;
        
        // Use advanced beep method
        return this._peripheral.sendPythonCommand(
            `import hub; hub.sound.beep(${frequency}, ${duration}, ${waveformCode})`
        );
    }

    setVolume(args) {
        const volume = Cast.toNumber(args.VOLUME);
        this._peripheral._volume = MathUtil.clamp(volume, 0, 100);
        return this._peripheral.sendPythonCommand(`hub.sound.volume(${volume})`);
    }

    stopSound() {
        return this._peripheral.stopSound();
    }

    // ===== STATUS & TEMPERATURE (FIXED - HIGH CONFIDENCE) =====
    getBatteryLevel() {
        // FIXED: Return data from continuous sensor loop
        return this._peripheral.battery || 100;
    }

    getBatteryTemperature() {
        // FIXED: Return data from continuous sensor loop
        return this._peripheral.temperature || 25;
    }

    getHubTemperature() {
        // FIXED: Return data from continuous sensor loop
        return this._peripheral.hubTemp || 25;
    }

    // ===== TIMER FUNCTIONALITY (NEW) =====
    getTimer() {
        return this._peripheral.timer;
    }

    resetTimer() {
        this._peripheral._timer.start = Date.now();
        this._peripheral._timer.current = 0;
    }

    // ===== SENSOR IMPLEMENTATIONS (HIGH CONFIDENCE) =====
    getDistance(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        const portData = this._peripheral.portValues[port];
        if (portData && portData.type === 'distance') {
            return portData.distance;
        }
        return 0;
    }

    setDistanceLights(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        const tl = MathUtil.clamp(Cast.toNumber(args.TL), 0, 9);
        const tr = MathUtil.clamp(Cast.toNumber(args.TR), 0, 9);
        const bl = MathUtil.clamp(Cast.toNumber(args.BL), 0, 9);
        const br = MathUtil.clamp(Cast.toNumber(args.BR), 0, 9);
        
        // Use distance sensor LED control
        return this._peripheral.sendPythonCommand(
            `import hub; dist_sensor = hub.port.${port}.device; dist_sensor.mode(5, bytes([${tl}, ${tr}, ${bl}, ${br}]))`
        );
    }

    getColor(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        const portData = this._peripheral.portValues[port];
        if (portData && portData.type === 'color') {
            const colorNames = ['black', 'magenta', 'purple', 'blue', 'azure', 'turquoise', 'green', 'yellow', 'orange', 'red', 'white'];
            return colorNames[portData.color] || 'none';
        }
        return 'none';
    }

    getReflection(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        const portData = this._peripheral.portValues[port];
        if (portData && portData.type === 'color') {
            return portData.reflection || 0;
        }
        return 0;
    }

    getAmbientLight(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        const portData = this._peripheral.portValues[port];
        if (portData && portData.type === 'color') {
            return portData.ambient || 0;
        }
        return 0;
    }

    getForce(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        const portData = this._peripheral.portValues[port];
        if (portData && portData.type === 'force') {
            return portData.force || 0;
        }
        return 0;
    }

    isForceSensorPressed(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        const portData = this._peripheral.portValues[port];
        if (portData && portData.type === 'force') {
            return portData.pressed || false;
        }
        return false;
    }

    // ===== EVENT-BASED SENSOR BLOCKS (NEW) =====
    whenColor(args) { 
        return this.isColor(args); 
    }
    
    isColor(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        const color = Cast.toString(args.COLOR);
        const portData = this._peripheral.portValues[port];
        if (portData && portData.type === 'color') {
            const colorNames = ['black', 'magenta', 'purple', 'blue', 'azure', 'turquoise', 'green', 'yellow', 'orange', 'red', 'white'];
            return colorNames[portData.color] === color;
        }
        return false;
    }

    whenForceSensor(args) {
        const port = Cast.toString(args.PORT).trim().toUpperCase();
        const state = Cast.toString(args.STATE);
        const portData = this._peripheral.portValues[port];

        if (portData && portData.type === 'force') {
            switch (state) {
                case 'pressed': return portData.pressed;
                case 'hard pressed': return portData.force > 8; // Force in Newtons for "hard pressed"
                case 'released': return !portData.pressed;
            }
        }
        return false;
    }

    // ===== BUTTON IMPLEMENTATIONS (HIGH CONFIDENCE) =====
    isButtonPressed(args) {
        const button = Cast.toString(args.BUTTON);
        
        const buttonIndex = { left: 0, center: 1, right: 2 }[button];
        if (buttonIndex !== undefined) {
            return this._peripheral._sensors.buttons[buttonIndex] === 1;
        }
        return false;
    }

    whenButtonPressed(args) {
        return this.isButtonPressed(args);
    }

    // ===== PYTHON REPL FUNCTIONALITY (NEW) =====
    runReplCommand(args) {
        const code = Cast.toString(args.CODE);
        return this._peripheral.sendReplCommand(code);
    }

    getReplOutput() {
        return this._peripheral.replOutput || '';
    }

    clearReplOutput() {
        this._peripheral._replOutput = '';
    }

    getReplHistory(args) {
        const index = Cast.toNumber(args.INDEX);
        const history = this._peripheral.replHistory;
        
        if (index === -1) {
            return history[history.length - 1] || '';
        } else if (index >= 0 && index < history.length) {
            return history[index] || '';
        }
        return '';
    }

    // ===== PYTHON COMMANDS (HIGH CONFIDENCE) =====
    runPythonCommand(args) {
        const code = Cast.toString(args.CODE);
        return this._peripheral.sendPythonCommand(code);
    }

    runHubCommand(args) {
        const code = Cast.toString(args.CODE);
        const pythonCode = `import hub; ${code}`;
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    exitScript() {
        // Use exit method
        return this._peripheral.sendPythonCommand('raise SystemExit');
    }

    // ===== UTILITY METHODS =====
    /**
     * Handle note playing for sound picker integration
     * @param {object} note - Note data
     * @param {string} category - Extension category
     */
    _playNoteForPicker(note, category) {
        if (category !== this.getInfo().name) return;
        this.playBeep({ FREQUENCY: this._noteToFrequency(note), DURATION: 250 });
    }

    _noteToFrequency(note) {
        return Math.pow(2, ((note - 69 + 12) / 12)) * 440;
    }

    /**
     * Validate and parse port specification string
     * @param {string} text - Port specification (e.g., "A", "A+B", "A+B+C+D+E+F")
     * @returns {Array} Array of valid port letters
     */
    _validatePorts(text) {
        return text.toUpperCase().replace(/[^ABCDEF]/g, '')
            .split('')
            .filter((x, i, self) => self.indexOf(x) === i)
            .sort();
    }
}

exports.blockClass = Scratch3SpikePrimeBlocks;
module.exports = Scratch3SpikePrimeBlocks;
