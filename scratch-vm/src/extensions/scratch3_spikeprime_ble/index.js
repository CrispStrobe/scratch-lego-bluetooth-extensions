const BleBaseBlocks = require('./lib/ble-base-blocks');
const Hub = require('./lib/hub');

const blockIconURI = '';

let formatMessage = require('format-message');
let extensionURL = 'https://cdn.jsdelivr.net/gh/CrispStrobe/scratch-lego-bluetooth-extensions@master/dist/spikeprime_ble.mjs';

// SPIKE Prime BLE UUIDs - YOUR WORKING APPROACH
const SPIKE_PRIME_SERVICE_UUID = '0000fd02-0000-1000-8000-00805f9b34fb';
const SPIKE_PRIME_WRITE_UUID = '0000fd02-0001-1000-8000-00805f9b34fb';
const SPIKE_PRIME_NOTIFY_UUID = '0000fd02-0002-1000-8000-00805f9b34fb';

// Standard LEGO UUIDs as fallback
const LEGO_SERVICE_UUID = '00001623-1212-efde-1623-785feabcd123';
const LEGO_CHAR_UUID = '00001624-1212-efde-1623-785feabcd123';

// Constants from working BTC version
const BTSendRateMax = 40;
const SpikePorts = ['A', 'B', 'C', 'D', 'E', 'F'];
const SpikeMotorStopMode = { float: 0, brake: 1, hold: 2 };
const SpikeOrientation = { front: 1, back: 2, up: 3, down: 4, rightside: 5, leftside: 6 };

// SPIKE Prime Motor Settings
class SpikeMotorSetting {
    constructor() {
        this._speed = 75;
        this._stopMode = SpikeMotorStopMode.brake;
        this._stallDetection = true;
    }
    
    get speed() { 
        return this._speed; 
    }
    
    set speed(value) { 
        this._speed = this._clamp(value, -100, 100); 
    }
    
    get stopMode() { 
        return this._stopMode; 
    }
    
    set stopMode(value) { 
        if (value >= 0 && value <= 2) this._stopMode = value; 
    }
    
    get stallDetection() { 
        return this._stallDetection; 
    }
    
    set stallDetection(value) { 
        this._stallDetection = value; 
    }
    
    _clamp(value, min, max) { 
        return Math.max(min, Math.min(max, value)); 
    }
}

// Complete BLE SPIKE Prime Hub
class CompleteBLESpikePrimeHub extends Hub {
    
    constructor(runtime, extensionId) {
        console.log('🚀 CompleteBLESpikePrimeHub: Initializing...');
        
        // Initialize without hub type for UUID scanning
        super(runtime, extensionId, null);
        
        // Connection state
        this._connectionAttempts = 0;
        this._connectionMethod = 'none';
        this._connected = false;
        this._useSpikePrimeUUIDs = true;
        
        // Communication state
        this._remainingText = '';
        this._openRequests = {};
        this._requestId = 0;
        
        // Python REPL state
        this._pythonAvailable = false;
        this._sensorLoopRunning = false;
        this._replHistory = [];
        this._replOutput = '';
        
        // Sensor data
        this._sensors = {
            buttons: [0, 0, 0, 0],
            angle: { pitch: 0, roll: 0, yaw: 0 },
            acceleration: { x: 0, y: 0, z: 0 },
            gyro: { x: 0, y: 0, z: 0 },
            orientation: SpikeOrientation.front,
            battery: 100,
            temperature: 25,
            hubTemp: 25,
            gestures: { tapped: false, doubletapped: false, shake: false, freefall: false },
            motorPositions: {}
        };
        
        this._portValues = {};
        this._pixelBrightness = 100;
        this._volume = 100;
        
        // Motor settings
        this._motorSettings = {
            A: new SpikeMotorSetting(),
            B: new SpikeMotorSetting(),
            C: new SpikeMotorSetting(),
            D: new SpikeMotorSetting(),
            E: new SpikeMotorSetting(),
            F: new SpikeMotorSetting()
        };
        
        // Movement and timer
        this._movementMotors = ['A', 'B'];
        this._timer = { start: Date.now(), current: 0 };
        
        // Rate limiting - safe loading
        try {
            const RateLimiter = require('../../../util/rateLimiter');
            this._rateLimiter = new RateLimiter(BTSendRateMax);
        } catch (e) {
            this._rateLimiter = { okayToSend: function() { return true; } };
        }
        
        // Connection monitoring
        this._keepAliveInterval = null;
        this._lastHeartbeat = Date.now();
        
        // Update timer safely
        const self = this;
        setInterval(function() {
            self._timer.current = (Date.now() - self._timer.start) / 1000;
        }, 10);
        
        console.log('✅ CompleteBLESpikePrimeHub: Initialization complete');
    }

    // Getters
    get angle() { return this._sensors.angle; }
    get orientation() { return this._sensors.orientation; }
    get portValues() { return this._portValues; }
    get pixelBrightness() { return this._pixelBrightness; }
    set pixelBrightness(value) { this._pixelBrightness = this._clamp(value, 0, 100); }
    get motorSettings() { return this._motorSettings; }
    get acceleration() { return this._sensors.acceleration; }
    get gyro() { return this._sensors.gyro; }
    get battery() { return this._sensors.battery; }
    get temperature() { return this._sensors.temperature; }
    get hubTemp() { return this._sensors.hubTemp; }
    get gestures() { return this._sensors.gestures; }
    get movementMotors() { return this._movementMotors; }
    get timer() { return this._timer.current; }
    get volume() { return this._volume; }
    get replOutput() { return this._replOutput; }
    get replHistory() { return this._replHistory; }

    // Override scan with UUID-first approach
    scan() {
        console.log('🔍 CompleteBLESpikePrimeHub: Starting BLE scan...');
        this._connectionAttempts++;
        
        if (this._ble) {
            console.log('📴 CompleteBLESpikePrimeHub: Cleaning up existing connection...');
            this._ble.disconnect();
        }

        const self = this;
        return this._attemptSpikePrimeUUIDs().catch(function(error) {
            console.warn('⚠️ CompleteBLESpikePrimeHub: UUID method failed:', error.message);
            self._useSpikePrimeUUIDs = false;
            return self._attemptStandardLego();
        }).catch(function(error) {
            console.error('❌ CompleteBLESpikePrimeHub: All scan methods failed:', error);
            throw error;
        });
    }

    _attemptSpikePrimeUUIDs() {
        console.log('🎯 CompleteBLESpikePrimeHub: PRIMARY - SPIKE Prime UUID scan');
        this._connectionMethod = 'spike_uuids';
        
        try {
            const BLE = require('../../../io/ble');
            
            const options = {
                filters: [
                    { services: [SPIKE_PRIME_SERVICE_UUID] },
                    { namePrefix: 'LEGO Hub' },
                    { namePrefix: 'Technic Hub' }
                ],
                optionalServices: [SPIKE_PRIME_SERVICE_UUID]
            };
            
            console.log('📡 CompleteBLESpikePrimeHub: SPIKE UUID scan config:', JSON.stringify(options, null, 2));
            
            this._ble = new BLE(this._runtime, this._extensionId, options, this._onConnect, this.reset, this._onMessage);
            
            console.log('✅ CompleteBLESpikePrimeHub: SPIKE Prime UUID scanner ready');
            return Promise.resolve();
            
        } catch (error) {
            console.error('❌ CompleteBLESpikePrimeHub: UUID scan setup failed:', error);
            throw error;
        }
    }

    _attemptStandardLego() {
        console.log('🔄 CompleteBLESpikePrimeHub: FALLBACK - Standard LEGO scan');
        this._connectionMethod = 'standard_lego';
        
        try {
            const BLE = require('../../../io/ble');
            
            const options = {
                filters: [{ services: [LEGO_SERVICE_UUID] }],
                optionalServices: [LEGO_SERVICE_UUID]
            };
            
            console.log('📡 CompleteBLESpikePrimeHub: Standard LEGO scan config:', JSON.stringify(options, null, 2));
            
            this._ble = new BLE(this._runtime, this._extensionId, options, this._onConnect, this.reset, this._onMessage);
            
            console.log('✅ CompleteBLESpikePrimeHub: Standard LEGO scanner ready');
            return Promise.resolve();
            
        } catch (error) {
            console.error('❌ CompleteBLESpikePrimeHub: Standard scan setup failed:', error);
            throw error;
        }
    }

    // Enhanced connection handler
    _onConnect() {
        const timestamp = new Date().toLocaleTimeString();
        console.log('[' + timestamp + '] CompleteBLESpikePrimeHub: CONNECTION ESTABLISHED!');
        console.log('📊 Connection details: Method=' + this._connectionMethod + ', Attempt=' + this._connectionAttempts + ', UUIDs=' + this._useSpikePrimeUUIDs);
        
        try {
            if (this._useSpikePrimeUUIDs) {
                console.log('🎯 CompleteBLESpikePrimeHub: Setting up SPIKE Prime communication...');
                this._setupSpikePrimeCommunication();
            } else {
                console.log('🎯 CompleteBLESpikePrimeHub: Using standard LEGO communication...');
                super._onConnect();
            }
            
            // Start Python REPL initialization
            const self = this;
            setTimeout(function() {
                self._initializePythonREPL();
            }, 1000);
            
            // Start connection monitoring
            this._startConnectionMonitoring();
            
            this._connected = true;
            console.log('🎉 CompleteBLESpikePrimeHub: Connection fully established!');
            
        } catch (error) {
            console.error('❌ CompleteBLESpikePrimeHub: Connection setup failed:', error);
            this.reset();
        }
    }

    _setupSpikePrimeCommunication() {
        console.log('📡 CompleteBLESpikePrimeHub: Configuring SPIKE Prime characteristics...');
        
        try {
            const self = this;
            
            // Start notifications
            this._ble.startNotifications(
                SPIKE_PRIME_SERVICE_UUID,
                SPIKE_PRIME_NOTIFY_UUID,
                function(base64) { 
                    self._onMessage({ message: base64 }); 
                }
            );
            
            console.log('✅ CompleteBLESpikePrimeHub: Notifications enabled');
            
            // Send initial hub property requests
            this._firstNotificationCallback = function() {
                console.log('📤 CompleteBLESpikePrimeHub: Sending initial hub requests...');
                self.sendMessage(0x01, [0x01, 0x02], false); // Name
                self.sendMessage(0x01, [0x03, 0x05], false); // Firmware
                self.sendMessage(0x01, [0x06, 0x05], false); // Battery
                console.log('✅ CompleteBLESpikePrimeHub: Initial hub requests sent');
            };
            
            this._startPollingBatteryLevel();
            
        } catch (error) {
            console.error('❌ CompleteBLESpikePrimeHub: SPIKE Prime communication setup failed:', error);
            throw error;
        }
    }

    _initializePythonREPL() {
        console.log('🐍 CompleteBLESpikePrimeHub: Initializing Python REPL...');
        
        // Send Ctrl-C to interrupt any running program
        this.sendRaw('\x03');
        
        const self = this;
        setTimeout(function() {
            console.log('🐍 CompleteBLESpikePrimeHub: Confirming Python REPL availability...');
            self.sendRaw('import hub\r\nprint("PYTHON_AVAILABLE")\r\n');
        }, 500);
    }

    _startConnectionMonitoring() {
        console.log('💓 CompleteBLESpikePrimeHub: Starting connection monitoring...');
        
        if (this._keepAliveInterval) {
            clearInterval(this._keepAliveInterval);
        }
        
        const self = this;
        this._keepAliveInterval = setInterval(function() {
            const now = Date.now();
            const timeSinceLastMessage = now - self._lastHeartbeat;
            
            if (self.isConnected()) {
                console.log('💓 CompleteBLESpikePrimeHub: Heartbeat - Last: ' + timeSinceLastMessage + 'ms, Method: ' + self._connectionMethod + ', Python: ' + self._pythonAvailable);
                
                if (timeSinceLastMessage > 10000) { // 10 seconds
                    console.log('📡 CompleteBLESpikePrimeHub: Sending keep-alive...');
                    self.sendMessage(0x01, [0x06, 0x05], false); // Battery request
                }
                
                if (timeSinceLastMessage > 25000) { // 25 seconds
                    console.error('💀 CompleteBLESpikePrimeHub: Connection timeout, recovering...');
                    self._recoverConnection();
                }
            } else {
                console.warn('⚠️ CompleteBLESpikePrimeHub: Connection lost during monitoring');
                self._stopConnectionMonitoring();
            }
        }, 5000);
        
        console.log('✅ CompleteBLESpikePrimeHub: Connection monitoring active');
    }

    _stopConnectionMonitoring() {
        if (this._keepAliveInterval) {
            console.log('⏹️ CompleteBLESpikePrimeHub: Stopping connection monitoring');
            clearInterval(this._keepAliveInterval);
            this._keepAliveInterval = null;
        }
    }

    _recoverConnection() {
        console.log('🔧 CompleteBLESpikePrimeHub: Attempting connection recovery...');
        
        if (this.isConnected()) {
            this.sendMessage(0x01, [0x01, 0x05], false); // Hub name request
        } else {
            console.log('🔄 CompleteBLESpikePrimeHub: Full reconnection needed');
            this.reset();
        }
    }

    // Enhanced message handling
    _onMessage(params) {
        const timestamp = new Date().toLocaleTimeString();
        this._lastHeartbeat = Date.now();
        
        try {
            let text;
            let data;
            
            if (typeof params.message === 'string') {
                // BLE base64 message
                const Base64Util = require('../../../util/base64-util');
                data = Base64Util.base64ToUint8Array(params.message);
                text = (new TextDecoder()).decode(data);
                
                if (data.length >= 3) {
                    const length = data[0];
                    const messageType = data[2];
                    const dataStr = Array.from(data.slice(0, Math.min(8, data.length))).map(function(b) { 
                        return '0x' + b.toString(16).padStart(2, '0'); 
                    }).join(',');
                    const suffix = data.length > 8 ? '...' : '';
                    console.log('[' + timestamp + '] CompleteBLESpikePrimeHub: BLE MSG - Len:' + length + ', Type:0x' + messageType.toString(16) + ', Data:[' + dataStr + suffix + ']');
                    
                    // Process as LEGO BLE message
                    super._onMessage(params.message);
                    return;
                }
            } else {
                text = params.message;
            }
            
            // Process as Python REPL output
            const responses = (this._remainingText + text).split('\r\n');
            this._remainingText = responses.pop() || '';
            
            for (let i = 0; i < responses.length; i++) {
                const responseText = responses[i];
                const trimmedText = responseText.trim();
                if (!trimmedText) continue;
                
                console.log('[' + timestamp + '] CompleteBLESpikePrimeHub: PYTHON - "' + trimmedText + '"');
                
                // Try JSON parsing first
                try {
                    const json = JSON.parse(trimmedText);
                    this._parseJSONResponse(json);
                } catch (error) {
                    // Process as raw Python output
                    this._parsePythonData(trimmedText);
                }
            }
            
        } catch (error) {
            console.error('❌ CompleteBLESpikePrimeHub: Message processing error:', error);
        }
    }

    _parsePythonData(dataText) {
        try {
            if (dataText.indexOf('PYTHON_AVAILABLE') !== -1) {
                if (!this._pythonAvailable) {
                    this._pythonAvailable = true;
                    console.log('🐍 CompleteBLESpikePrimeHub: Python REPL confirmed available!');
                    this._initializeContinuousSensorMonitoring();
                }
            } else if (dataText.indexOf('SENSORS:') === 0) {
                this._parseSensorData(dataText.substring(8));
            } else if (dataText.indexOf('GESTURE:') === 0) {
                const gesture = dataText.substring(8).toLowerCase();
                if (this._sensors.gestures.hasOwnProperty(gesture)) {
                    this._sensors.gestures[gesture] = true;
                    const self = this;
                    setTimeout(function() { 
                        self._sensors.gestures[gesture] = false; 
                    }, 100);
                }
            } else if (dataText.indexOf('>>>') === 0) {
                this._replOutput += dataText + '\n';
                if (this._replOutput.length > 1000) {
                    this._replOutput = this._replOutput.substring(this._replOutput.length - 1000);
                }
            }
        } catch (error) {
            console.warn('⚠️ CompleteBLESpikePrimeHub: Error parsing Python data:', error);
        }
    }

    _parseSensorData(sensorData) {
        try {
            const parts = sensorData.split('|');
            if (parts.length >= 5) {
                // Angles
                const angles = parts[0].split(',').map(parseFloat);
                if (angles.length === 3) {
                    this._sensors.angle = { yaw: angles[0], pitch: angles[1], roll: angles[2] };
                }
                
                // Acceleration
                const accel = parts[1].split(',').map(parseFloat);
                if (accel.length === 3) {
                    this._sensors.acceleration = { x: accel[0], y: accel[1], z: accel[2] };
                }
                
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
                    for (let i = 0; i < motorPairs.length; i++) {
                        const pair = motorPairs[i];
                        const splitPair = pair.split(':');
                        const port = splitPair[0];
                        const values = splitPair[1];
                        if (port && values) {
                            const motorValues = values.split(',').map(parseFloat);
                            const speed = motorValues[0];
                            const relDeg = motorValues[1];
                            const absDeg = motorValues[2];
                            const pwm = motorValues[3];
                            this._sensors.motorPositions[port] = {
                                speed: speed, 
                                relativePosition: relDeg, 
                                absolutePosition: absDeg, 
                                power: pwm
                            };
                        }
                    }
                }
            }
        } catch (error) {
            console.warn('⚠️ CompleteBLESpikePrimeHub: Error parsing sensor data:', error);
        }
    }

    _parseJSONResponse(response) {
        // Handle JSON-RPC responses
        if (response.hasOwnProperty('i')) {
            const openRequest = this._openRequests[response.i];
            if (openRequest) {
                openRequest.resolve(response.r);
                delete this._openRequests[response.i];
            }
        }
        
        if (response.hasOwnProperty('m')) {
            // Handle hub status messages
            this._parseHubStatusResponse(response);
        }
    }

    _parseHubStatusResponse(response) {
        // Hub status parsing
        if (response.m === 0 && response.p) {
            // Port data parsing
            for (let i = 0; i < 6 && i < response.p.length; i++) {
                const port = SpikePorts[i];
                if (response.p[i] && response.p[i].length >= 2) {
                    const deviceId = response.p[i][0];
                    const values = response.p[i][1];
                    
                    switch (deviceId) {
                        case 48: // Large motor
                        case 49: // Medium motor
                            this._portValues[port] = {
                                type: 'motor',
                                speed: values[0] || 0,
                                degreesCounted: values[1] || 0,
                                position: ((values[2] || 0) + 360) % 360,
                                power: values[3] || 0,
                                relativePosition: values[1] || 0,
                                absolutePosition: values[2] || 0
                            };
                            break;
                        case 61: // Color sensor
                            this._portValues[port] = {
                                type: 'color',
                                color: values[0] || 0,
                                reflection: values[1] || 0,
                                ambient: values[2] || 0
                            };
                            break;
                        case 62: // Distance sensor
                            this._portValues[port] = {
                                type: 'distance',
                                distance: values[0] === -1 ? 0 : (values[0] || 0)
                            };
                            break;
                        case 63: // Force sensor
                            this._portValues[port] = {
                                type: 'force',
                                force: values[0] || 0,
                                pressed: (values[1] || 0) > 0
                            };
                            break;
                    }
                }
            }
        }
    }

    _initializeContinuousSensorMonitoring() {
        if (this._sensorLoopRunning) return;
        
        this._sensorLoopRunning = true;
        console.log('🔄 CompleteBLESpikePrimeHub: Starting continuous sensor monitoring...');
        
        // Sensor monitoring script
        const sensorScript = 'import hub, utime\n' +
            'def continuous_sensor_loop():\n' +
            '    while True:\n' +
            '        try:\n' +
            '            yaw_angle, pitch_angle, roll_angle = hub.motion.position()\n' +
            '            accel_x, accel_y, accel_z = hub.motion.accelerometer()\n' +
            '            orientation = hub.motion.orientation()\n' +
            '            battery_temp = hub.battery.temperature()\n' +
            '            hub_temp = hub.temperature()\n' +
            '            motor_data = {}\n' +
            '            for port in "ABCDEF":\n' +
            '                if hasattr(hub.port[port], "motor"):\n' +
            '                    try:\n' +
            '                        speed, rel_deg, abs_deg, pwm = hub.port[port].motor.get()\n' +
            '                        motor_data[port] = f"{speed},{rel_deg},{abs_deg},{pwm}"\n' +
            '                    except: pass\n' +
            '            motor_str = "|".join([f"{k}:{v}" for k, v in motor_data.items()])\n' +
            '            print(f"SENSORS:{yaw_angle},{pitch_angle},{roll_angle}|{accel_x},{accel_y},{accel_z}|{orientation}|{battery_temp},{hub_temp}|{motor_str}")\n' +
            '            for gesture in ["tapped", "doubletapped", "shake", "freefall"]:\n' +
            '                if hub.motion.was_gesture(gesture):\n' +
            '                    print(f"GESTURE:{gesture.upper()}")\n' +
            '        except Exception as e:\n' +
            '            pass\n' +
            '        utime.sleep_ms(100)\n' +
            'continuous_sensor_loop()\n';
            
        this.sendPythonCommand(sensorScript);
    }

    // Enhanced send method
    send(data, useLimiter) {
        if (useLimiter === undefined) useLimiter = true;
        
        const timestamp = new Date().toLocaleTimeString();
        
        if (!this.isConnected()) {
            console.warn('⚠️ CompleteBLESpikePrimeHub: Cannot send - not connected');
            return Promise.resolve();
        }
        
        if (useLimiter && !this._rateLimiter.okayToSend()) {
            console.log('⏳ CompleteBLESpikePrimeHub: Rate limited');
            return Promise.resolve();
        }
        
        const dataStr = Array.from(data.slice(0, Math.min(6, data.length))).map(function(b) { 
            return '0x' + b.toString(16).padStart(2, '0'); 
        }).join(',');
        const suffix = data.length > 6 ? '...' : '';
        console.log('[' + timestamp + '] CompleteBLESpikePrimeHub: SEND - Method:' + this._connectionMethod + ', Len:' + data.length + ', Data:[' + dataStr + suffix + ']');
        
        try {
            const serviceUUID = this._useSpikePrimeUUIDs ? 
                SPIKE_PRIME_SERVICE_UUID : LEGO_SERVICE_UUID;
            const writeUUID = this._useSpikePrimeUUIDs ? 
                SPIKE_PRIME_WRITE_UUID : LEGO_CHAR_UUID;
            
            const Base64Util = require('../../../util/base64-util');
            
            return this._ble.write(
                serviceUUID,
                writeUUID,
                Base64Util.uint8ArrayToBase64(data),
                'base64',
                true
            ).then(function() {
                console.log('✅ CompleteBLESpikePrimeHub: Data sent successfully');
            }).catch(function(error) {
                console.error('❌ CompleteBLESpikePrimeHub: Send failed:', error);
                throw error;
            });
            
        } catch (error) {
            console.error('❌ CompleteBLESpikePrimeHub: Send setup failed:', error);
            return Promise.reject(error);
        }
    }

    // Python communication methods
    sendRaw(text, useLimiter, id) {
        if (useLimiter === undefined) useLimiter = false;
        if (!this.isConnected()) return Promise.resolve();
        
        console.log('🐍 CompleteBLESpikePrimeHub: Sending raw Python: "' + text.replace(/\r\n/g, '\\r\\n') + '"');
        
        if (id) {
            const self = this;
            const promise = new Promise(function(resolve, reject) {
                self._openRequests[id] = { resolve: resolve, reject: reject };
            });
            this._sendRawMessage(text);
            return promise;
        }
        
        return this._sendRawMessage(text);
    }

    sendPythonCommand(pythonCode) {
        const codePreview = pythonCode.substring(0, 100);
        const suffix = pythonCode.length > 100 ? '...' : '';
        console.log('🐍 CompleteBLESpikePrimeHub: Python command: ' + codePreview + suffix);
        return this.sendRaw(pythonCode + '\r\n');
    }

    sendReplCommand(pythonCode) {
        this._replHistory.push(pythonCode);
        if (this._replHistory.length > 50) {
            this._replHistory.shift();
        }
        
        const escapedCode = pythonCode.replace(/"/g, '\\"');
        const wrappedCode = 'try:\n' +
            '    _result = eval("' + escapedCode + '")\n' +
            '    if _result is not None:\n' +
            '        print(f">>> {_result}")\n' +
            '    else:\n' +
            '        exec("' + escapedCode + '")\n' +
            '        print(">>> Command executed")\n' +
            'except Exception as e:\n' +
            '    print(f">>> Error: {e}")\n';
            
        return this.sendPythonCommand(wrappedCode);
    }

    _sendRawMessage(text) {
        // For BLE, send as binary data
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        return this.send(data, false);
    }

    // Utility methods
    _clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    // Override reset
    reset() {
        console.log('🔄 CompleteBLESpikePrimeHub: Comprehensive reset...');
        
        this._connected = false;
        this._pythonAvailable = false;
        this._sensorLoopRunning = false;
        this._useSpikePrimeUUIDs = true;
        this._remainingText = '';
        this._replOutput = '';
        this._replHistory = [];
        this._openRequests = {};
        
        this._stopConnectionMonitoring();
        
        // Reset sensors
        this._sensors = {
            buttons: [0, 0, 0, 0],
            angle: { pitch: 0, roll: 0, yaw: 0 },
            acceleration: { x: 0, y: 0, z: 0 },
            gyro: { x: 0, y: 0, z: 0 },
            orientation: SpikeOrientation.front,
            battery: 100,
            temperature: 25,
            hubTemp: 25,
            gestures: { tapped: false, doubletapped: false, shake: false, freefall: false },
            motorPositions: {}
        };
        
        this._portValues = {};
        this._timer.start = Date.now();
        this._timer.current = 0;
        
        console.log('📊 CompleteBLESpikePrimeHub: Reset stats - Attempts:' + this._connectionAttempts + ', Method:' + this._connectionMethod);
        
        super.reset();
        console.log('✅ CompleteBLESpikePrimeHub: Reset complete');
    }

    // Override isConnected
    isConnected() {
        const connected = this._connected && super.isConnected();
        
        if (Math.random() < 0.01) { // 1% logging
            console.log('🔍 CompleteBLESpikePrimeHub: Status - Connected:' + connected + ', Python:' + this._pythonAvailable + ', Method:' + this._connectionMethod);
        }
        
        return connected;
    }

    // Control methods
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
}

// Main Extension Class
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
        console.log('🎯 Scratch3SpikePrimeBlocks: Initializing BLE SPIKE Prime extension...');
        
        // Use the complete BLE SPIKE Prime hub
        super(new CompleteBLESpikePrimeHub(runtime, Scratch3SpikePrimeBlocks.EXTENSION_ID));

        if (runtime.formatMessage) {
            formatMessage = runtime.formatMessage;
        }

        console.log('✅ Scratch3SpikePrimeBlocks: BLE extension initialized');
    }

    get externalPorts() {
        return SpikePorts;
    }

    get multipleExternalPorts() {
        return ['A', 'B', 'C', 'D', 'E', 'F', 'A+B', 'C+D', 'E+F', 'A+B+C+D+E+F'];
    }

    get hasInternalTiltSensorBlocks() {
        return true;
    }

    get hasAdvancedBlocks() {
        return true;
    }

    setupTranslations(formatMessage) {
        const localeSetup = formatMessage.setup();

        const translations = {
            'en': {
                'spikeprime.motorStart': '[PORT] start motor [DIRECTION]',
                'spikeprime.motorStop': '[PORT] stop motor',
                'spikeprime.motorSetSpeed': '[PORT] set speed to [SPEED] %',
                'spikeprime.getPosition': '[PORT] position',
                'spikeprime.displayText': 'write [TEXT]',
                'spikeprime.displayImage': 'turn on [MATRIX]',
                'spikeprime.displayClear': 'turn off pixels',
                'spikeprime.getDistance': '[PORT] distance',
                'spikeprime.getColor': '[PORT] color',
                'spikeprime.getAngle': '[AXIS] angle',
                'spikeprime.isGesture': 'hub [GESTURE]?',
                'spikeprime.playBeep': 'beep [FREQUENCY] Hz for [DURATION] ms',
                'spikeprime.getBatteryLevel': 'battery level %',
                'spikeprime.isButtonPressed': '[BUTTON] button pressed?',
                'spikeprime.runPythonCommand': 'run Python: [CODE]'
            },
            'de': {
                'spikeprime.motorStart': '[PORT] Motor [DIRECTION] starten',
                'spikeprime.motorStop': '[PORT] Motor stoppen',
                'spikeprime.motorSetSpeed': '[PORT] Geschwindigkeit auf [SPEED] % setzen',
                'spikeprime.getPosition': '[PORT] Position',
                'spikeprime.displayText': '[TEXT] schreiben',
                'spikeprime.displayImage': '[MATRIX] einschalten',
                'spikeprime.displayClear': 'Pixel ausschalten',
                'spikeprime.getDistance': '[PORT] Entfernung',
                'spikeprime.getColor': '[PORT] Farbe',
                'spikeprime.getAngle': '[AXIS] Winkel',
                'spikeprime.isGesture': 'Hub [GESTURE]?',
                'spikeprime.playBeep': '[FREQUENCY] Hz Piep für [DURATION] ms',
                'spikeprime.getBatteryLevel': 'Batteriestand %',
                'spikeprime.isButtonPressed': '[BUTTON] Taste gedrückt?',
                'spikeprime.runPythonCommand': 'Python ausführen: [CODE]',
                
                // Menu item translations
                'spikeprime.pitch': 'Neigung',
                'spikeprime.roll': 'Rollen',
                'spikeprime.yaw': 'Gieren',
                'spikeprime.tapped': 'angetippt',
                'spikeprime.doubletapped': 'doppelt angetippt',
                'spikeprime.shake': 'geschüttelt',
                'spikeprime.freefall': 'freier Fall',
                'spikeprime.left': 'links',
                'spikeprime.center': 'mitte',
                'spikeprime.right': 'rechts'
            }
        };

        for (const locale in translations) {
            if (!localeSetup.translations[locale]) {
                localeSetup.translations[locale] = {};
            }
            Object.assign(localeSetup.translations[locale], translations[locale]);
        }
    }

    getInfo() {
        this.setupTranslations(formatMessage);

        return {
            id: Scratch3SpikePrimeBlocks.EXTENSION_ID,
            name: 'SPIKE Prime BLE',
            extensionURL: Scratch3SpikePrimeBlocks.extensionURL,
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: [
                // Motor Control
                {
                    opcode: 'motorStart',
                    text: formatMessage({
                        id: 'spikeprime.motorStart',
                        default: '[PORT] start motor [DIRECTION]'
                    }),
                    blockType: this.getBlockType('COMMAND'),
                    arguments: {
                        PORT: { type: this.getArgumentType('STRING'), menu: 'MULTIPLE_PORT', defaultValue: 'A' },
                        DIRECTION: { type: this.getArgumentType('NUMBER'), menu: 'DIRECTION', defaultValue: 1 }
                    }
                },
                {
                    opcode: 'motorStop',
                    text: formatMessage({
                        id: 'spikeprime.motorStop',
                        default: '[PORT] stop motor'
                    }),
                    blockType: this.getBlockType('COMMAND'),
                    arguments: {
                        PORT: { type: this.getArgumentType('STRING'), menu: 'MULTIPLE_PORT', defaultValue: 'A' }
                    }
                },
                {
                    opcode: 'motorSetSpeed',
                    text: formatMessage({
                        id: 'spikeprime.motorSetSpeed',
                        default: '[PORT] set speed to [SPEED] %'
                    }),
                    blockType: this.getBlockType('COMMAND'),
                    arguments: {
                        PORT: { type: this.getArgumentType('STRING'), menu: 'MULTIPLE_PORT', defaultValue: 'A' },
                        SPEED: { type: this.getArgumentType('NUMBER'), defaultValue: 75 }
                    }
                },
                {
                    opcode: 'getPosition',
                    text: formatMessage({
                        id: 'spikeprime.getPosition',
                        default: '[PORT] position'
                    }),
                    blockType: this.getBlockType('REPORTER'),
                    arguments: {
                        PORT: { type: this.getArgumentType('STRING'), menu: 'PORT', defaultValue: 'A' }
                    }
                },
                '---',
                // Display Control
                {
                    opcode: 'displayText',
                    text: formatMessage({
                        id: 'spikeprime.displayText',
                        default: 'write [TEXT]'
                    }),
                    blockType: this.getBlockType('COMMAND'),
                    arguments: {
                        TEXT: { type: this.getArgumentType('STRING'), defaultValue: 'Hello' }
                    }
                },
                {
                    opcode: 'displayImage',
                    text: formatMessage({
                        id: 'spikeprime.displayImage',
                        default: 'turn on [MATRIX]'
                    }),
                    blockType: this.getBlockType('COMMAND'),
                    arguments: {
                        MATRIX: { type: this.getArgumentType('MATRIX'), defaultValue: '1101111011000001000101110' }
                    }
                },
                {
                    opcode: 'displayClear',
                    text: formatMessage({
                        id: 'spikeprime.displayClear',
                        default: 'turn off pixels'
                    }),
                    blockType: this.getBlockType('COMMAND')
                },
                '---',
                // Sensors
                {
                    opcode: 'getDistance',
                    text: formatMessage({
                        id: 'spikeprime.getDistance',
                        default: '[PORT] distance'
                    }),
                    blockType: this.getBlockType('REPORTER'),
                    arguments: {
                        PORT: { type: this.getArgumentType('STRING'), menu: 'PORT', defaultValue: 'A' }
                    }
                },
                {
                    opcode: 'getColor',
                    text: formatMessage({
                        id: 'spikeprime.getColor',
                        default: '[PORT] color'
                    }),
                    blockType: this.getBlockType('REPORTER'),
                    arguments: {
                        PORT: { type: this.getArgumentType('STRING'), menu: 'PORT', defaultValue: 'A' }
                    }
                },
                {
                    opcode: 'getAngle',
                    text: formatMessage({
                        id: 'spikeprime.getAngle',
                        default: '[AXIS] angle'
                    }),
                    blockType: this.getBlockType('REPORTER'),
                    arguments: {
                        AXIS: { type: this.getArgumentType('STRING'), menu: 'AXIS', defaultValue: 'pitch' }
                    }
                },
                {
                    opcode: 'isGesture',
                    text: formatMessage({
                        id: 'spikeprime.isGesture',
                        default: 'hub [GESTURE]?'
                    }),
                    blockType: this.getBlockType('BOOLEAN'),
                    arguments: {
                        GESTURE: { type: this.getArgumentType('STRING'), menu: 'GESTURE', defaultValue: 'tapped' }
                    }
                },
                '---',
                // Sound
                {
                    opcode: 'playBeep',
                    text: formatMessage({
                        id: 'spikeprime.playBeep',
                        default: 'beep [FREQUENCY] Hz for [DURATION] ms'
                    }),
                    blockType: this.getBlockType('COMMAND'),
                    arguments: {
                        FREQUENCY: { type: this.getArgumentType('NUMBER'), defaultValue: 440 },
                        DURATION: { type: this.getArgumentType('NUMBER'), defaultValue: 500 }
                    }
                },
                '---',
                // Status
                {
                    opcode: 'getBatteryLevel',
                    text: formatMessage({
                        id: 'spikeprime.getBatteryLevel',
                        default: 'battery level %'
                    }),
                    blockType: this.getBlockType('REPORTER')
                },
                {
                    opcode: 'isButtonPressed',
                    text: formatMessage({
                        id: 'spikeprime.isButtonPressed',
                        default: '[BUTTON] button pressed?'
                    }),
                    blockType: this.getBlockType('BOOLEAN'),
                    arguments: {
                        BUTTON: { type: this.getArgumentType('STRING'), menu: 'BUTTON', defaultValue: 'center' }
                    }
                },
                '---',
                // Python
                {
                    opcode: 'runPythonCommand',
                    text: formatMessage({
                        id: 'spikeprime.runPythonCommand',
                        default: 'run Python: [CODE]'
                    }),
                    blockType: this.getBlockType('COMMAND'),
                    arguments: {
                        CODE: { type: this.getArgumentType('STRING'), defaultValue: 'print("Hello BLE!")' }
                    }
                }
            ],
            menus: {
                PORT: { acceptReporters: true, items: SpikePorts },
                MULTIPLE_PORT: { acceptReporters: true, items: ['A', 'B', 'C', 'D', 'E', 'F', 'A+B', 'C+D', 'E+F'] },
                DIRECTION: { 
                    acceptReporters: false, 
                    items: [
                        { text: '⬆️', value: '1' }, 
                        { text: '⬇️', value: '-1' }
                    ] 
                },
                AXIS: { 
                    acceptReporters: false, 
                    items: [
                        {
                            text: formatMessage({ id: 'spikeprime.pitch', default: 'pitch' }),
                            value: 'pitch'
                        },
                        {
                            text: formatMessage({ id: 'spikeprime.roll', default: 'roll' }),
                            value: 'roll'
                        },
                        {
                            text: formatMessage({ id: 'spikeprime.yaw', default: 'yaw' }),
                            value: 'yaw'
                        }
                    ]
                },
                GESTURE: { 
                    acceptReporters: false, 
                    items: [
                        {
                            text: formatMessage({ id: 'spikeprime.tapped', default: 'tapped' }),
                            value: 'tapped'
                        },
                        {
                            text: formatMessage({ id: 'spikeprime.doubletapped', default: 'doubletapped' }),
                            value: 'doubletapped'
                        },
                        {
                            text: formatMessage({ id: 'spikeprime.shake', default: 'shake' }),
                            value: 'shake'
                        },
                        {
                            text: formatMessage({ id: 'spikeprime.freefall', default: 'freefall' }),
                            value: 'freefall'
                        }
                    ]
                },
                BUTTON: { 
                    acceptReporters: false, 
                    items: [
                        {
                            text: formatMessage({ id: 'spikeprime.left', default: 'left' }),
                            value: 'left'
                        },
                        {
                            text: formatMessage({ id: 'spikeprime.center', default: 'center' }),
                            value: 'center'
                        },
                        {
                            text: formatMessage({ id: 'spikeprime.right', default: 'right' }),
                            value: 'right'
                        }
                    ]
                }
            }
        };
    }

    // Helper methods
    getBlockType(type) {
        try {
            const BlockType = require('../../extension-support/block-type');
            return BlockType[type];
        } catch (e) {
            return type.toLowerCase();
        }
    }

    getArgumentType(type) {
        try {
            const ArgumentType = require('../../extension-support/argument-type');
            return ArgumentType[type];
        } catch (e) {
            return type.toLowerCase();
        }
    }

    getCast() {
        try {
            return require('../../util/cast');
        } catch (e) {
            return {
                toString: function(value) { return String(value); },
                toNumber: function(value) { return Number(value) || 0; }
            };
        }
    }

    // Block implementations
    motorStart(args) {
        const direction = this.getCast().toNumber(args.DIRECTION);
        const ports = this._validatePorts(this.getCast().toString(args.PORT));
        
        const self = this;
        const promises = ports.map(function(port) {
            const setting = self._peripheral.motorSettings[port];
            return self._peripheral.sendPythonCommand('import hub; hub.port.' + port + '.motor.pwm(' + Math.round(setting.speed * direction) + ')');
        });
        
        return Promise.all(promises);
    }

    motorStop(args) {
        const ports = this._validatePorts(this.getCast().toString(args.PORT));
        
        const self = this;
        const promises = ports.map(function(port) {
            return self._peripheral.sendPythonCommand('import hub; hub.port.' + port + '.motor.stop()');
        });
        
        return Promise.all(promises);
    }

    motorSetSpeed(args) {
        const speed = this.getCast().toNumber(args.SPEED);
        const ports = this._validatePorts(this.getCast().toString(args.PORT));
        
        const self = this;
        ports.forEach(function(port) {
            self._peripheral.motorSettings[port].speed = speed;
        });
    }

    getPosition(args) {
        const port = this.getCast().toString(args.PORT).trim().toUpperCase();
        const portData = this._peripheral.portValues[port];
        return (portData && portData.position) ? portData.position : 0;
    }

    displayText(args) {
        const text = this.getCast().toString(args.TEXT);
        const escapedText = text.replace(/"/g, '\\"');
        return this._peripheral.sendPythonCommand('import hub; hub.display.show("' + escapedText + '")');
    }

    displayImage(args) {
        const matrix = this.getCast().toString(args.MATRIX);
        const brightness = Math.round(9 * this._peripheral.pixelBrightness / 100);
        const symbol = (matrix.replace(/\D/g, '') + '0'.repeat(25)).slice(0, 25);
        const altImage = symbol.replace(/1/g, '9').replace(/0/g, '_').match(/.{5}/g).join(':');
        
        return this._peripheral.sendPythonCommand('import hub; hub.display.show(hub.Image("' + altImage + '"))');
    }

    displayClear() {
        return this._peripheral.sendPythonCommand('import hub; hub.display.clear()');
    }

    getDistance(args) {
        const port = this.getCast().toString(args.PORT).trim().toUpperCase();
        const portData = this._peripheral.portValues[port];
        return (portData && portData.type === 'distance') ? portData.distance : 0;
    }

    getColor(args) {
        const port = this.getCast().toString(args.PORT).trim().toUpperCase();
        const portData = this._peripheral.portValues[port];
        if (portData && portData.type === 'color') {
            const colorNames = ['black', 'magenta', 'purple', 'blue', 'azure', 'turquoise', 'green', 'yellow', 'orange', 'red', 'white'];
            return colorNames[portData.color] || 'none';
        }
        return 'none';
    }

    getAngle(args) {
        const axis = this.getCast().toString(args.AXIS);
        return this._peripheral.angle[axis] || 0;
    }

    isGesture(args) {
        const gesture = this.getCast().toString(args.GESTURE);
        return this._peripheral.gestures[gesture] || false;
    }

    playBeep(args) {
        const frequency = this.getCast().toNumber(args.FREQUENCY);
        const duration = this.getCast().toNumber(args.DURATION);
        return this._peripheral.sendPythonCommand('import hub; hub.sound.beep(' + frequency + ', ' + duration + ')');
    }

    getBatteryLevel() {
        return this._peripheral.battery || 100;
    }

    isButtonPressed(args) {
        const button = this.getCast().toString(args.BUTTON);
        const buttonIndex = { left: 0, center: 1, right: 2 }[button];
        return buttonIndex !== undefined ? this._peripheral._sensors.buttons[buttonIndex] === 1 : false;
    }

    runPythonCommand(args) {
        const code = this.getCast().toString(args.CODE);
        return this._peripheral.sendPythonCommand(code);
    }

    _validatePorts(text) {
        return text.toUpperCase().replace(/[^ABCDEF]/g, '')
            .split('')
            .filter(function(x, i, self) { return self.indexOf(x) === i; })
            .sort();
    }
}

exports.blockClass = Scratch3SpikePrimeBlocks;
module.exports = Scratch3SpikePrimeBlocks;