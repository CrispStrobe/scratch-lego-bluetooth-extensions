const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const BLE = require('../../io/ble');
const Base64Util = require('../../util/base64-util');

// Debug flag - set to true for extensive logging and tunnel command experimentation
const DEBUG_TUNNEL_COMMANDS = false;

// This is the main class Scratch will load. It defines the blocks and menus.
// It does NOT inherit from BleBaseBlocks to avoid LWP3/SPIKE Prime protocol conflicts.
class Scratch3SpikePrimeBlocks {
    constructor(runtime) {
        this.runtime = runtime;
        // The hub object handles all low-level communication and state management.
        this.hub = new SpikePrimeHub(this.runtime, this.constructor.EXTENSION_ID);

        this.runtime.on('PROJECT_STOP_ALL', () => {
            try {
                this.hub.stopAllMotors();
            } catch (error) {
                console.error('SPIKE Prime: Error stopping motors on project stop:', error);
            }
        });
        
        console.log('SPIKE Prime Extension: Initialized successfully');
    }

    static get EXTENSION_ID() {
        return 'spikeprimeble';
    }

    getInfo() {
        return {
            id: Scratch3SpikePrimeBlocks.EXTENSION_ID,
            name: 'SPIKE Prime',
            color1: '#FFD700',
            color2: '#D4AF37',
            blockIconURI: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAuMDA1IDJDOS4wNDIgMiAyIDkuMDQyIDIgMjAuMDA1UzkuMDQyIDM4IDIwLjAwNSAzOCAzOCAyOS45NjcgMzggMjAuMDA1IDI5Ljk2NyAyIDIwLjAwNSAyek00LjQ2MyAyMC4wMDVjMC04LjU4MiA2Ljk2LTE1LjU0MSAxNS41NDItMTUuNTQxIDguNTgyIDAgMTUuNTQxIDYuOTU5IDE1LjU0MSAxNS41NDFzLTYuOTU5IDE1LjU0Mi0xNS41NDEgMTUuNTQyYy04LjU4MyAwLTE1LjU0Mi02Ljk2LTE1LjU0Mi0xNS41NDJ6IiBmaWxsPSIjRkZBNzAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNMjAgMTMuNzY1bC0yLjM5NiA0LjA2OC00LjcyNC4wOTggMy42NjUgMy4xMDctMS4zMjMgNC45MTMgNC43NzgtMi44NzQgNC43NzggMi44NzQtMS4zMjMtNC45MTMgMy42NjUtMy4xMDctNC43MjQtLjA5OEwyMCAxMy43NjV6IiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4=',
            showStatusButton: true,
            blocks: [
                {
                    opcode: 'isConnected',
                    blockType: BlockType.BOOLEAN,
                    text: 'is hub connected?',
                },
                '---',
                {
                    opcode: 'startMotor',
                    blockType: BlockType.COMMAND,
                    text: 'start motor [PORT] at [SPEED]%',
                    arguments: {
                        PORT: { type: ArgumentType.STRING, menu: 'PORT', defaultValue: 'A' },
                        SPEED: { type: ArgumentType.NUMBER, defaultValue: 75 },
                    }
                },
                {
                    opcode: 'stopMotor',
                    blockType: BlockType.COMMAND,
                    text: 'stop motor [PORT] with [ACTION]',
                    arguments: {
                        PORT: { type: ArgumentType.STRING, menu: 'PORT', defaultValue: 'A' },
                        ACTION: { type: ArgumentType.STRING, menu: 'STOP_ACTION', defaultValue: 'brake' },
                    }
                },
                {
                    opcode: 'getMotorPosition',
                    blockType: BlockType.REPORTER,
                    text: 'motor [PORT] position',
                    arguments: {
                        PORT: { type: ArgumentType.STRING, menu: 'PORT', defaultValue: 'A' },
                    }
                },
                '---',
                {
                    opcode: 'setLightMatrixPixel',
                    blockType: BlockType.COMMAND,
                    text: 'set 3x3 light [PORT] pixel x:[X] y:[Y] to brightness [BRIGHTNESS]%',
                    arguments: {
                        PORT: { type: ArgumentType.STRING, menu: 'PORT', defaultValue: 'C' },
                        X: { type: ArgumentType.NUMBER, defaultValue: 1 },
                        Y: { type: ArgumentType.NUMBER, defaultValue: 1 },
                        BRIGHTNESS: { type: ArgumentType.NUMBER, defaultValue: 100 },
                    }
                },
                '---',
                {
                    opcode: 'getDistance',
                    blockType: BlockType.REPORTER,
                    text: 'distance sensor [PORT] (mm)',
                    arguments: {
                        PORT: { type: ArgumentType.STRING, menu: 'PORT', defaultValue: 'B' },
                    }
                },
                {
                    opcode: 'isForceSensorPressed',
                    blockType: BlockType.BOOLEAN,
                    text: 'force sensor [PORT] pressed?',
                    arguments: {
                        PORT: { type: ArgumentType.STRING, menu: 'PORT', defaultValue: 'D' },
                    }
                },
                {
                    opcode: 'getForceSensorValue',
                    blockType: BlockType.REPORTER,
                    text: 'force sensor [PORT] value (%)',
                    arguments: {
                        PORT: { type: ArgumentType.STRING, menu: 'PORT', defaultValue: 'D' },
                    }
                },
                {
                    opcode: 'getColor',
                    blockType: BlockType.REPORTER,
                    text: 'color sensor [PORT] color',
                    arguments: {
                        PORT: { type: ArgumentType.STRING, menu: 'PORT', defaultValue: 'E' },
                    }
                },
                '---',
                {
                    opcode: 'getOrientation',
                    blockType: BlockType.REPORTER,
                    text: 'hub orientation [AXIS]',
                    arguments: {
                        AXIS: { type: ArgumentType.STRING, menu: 'ORIENTATION_AXIS', defaultValue: 'yaw' }
                    }
                },
                {
                    opcode: 'getAcceleration',
                    blockType: BlockType.REPORTER,
                    text: 'hub acceleration [AXIS]',
                    arguments: {
                        AXIS: { type: ArgumentType.STRING, menu: 'XYZ_AXIS', defaultValue: 'x' }
                    }
                },
                {
                    opcode: 'getFaceUp',
                    blockType: BlockType.REPORTER,
                    text: 'hub face up'
                },
                '---',
                {
                    opcode: 'getBatteryLevel',
                    blockType: BlockType.REPORTER,
                    text: 'battery level',
                },
            ],
            menus: {
                PORT: { acceptReporters: true, items: ['A', 'B', 'C', 'D', 'E', 'F'] },
                STOP_ACTION: { acceptReporters: false, items: ['coast', 'brake', 'hold'] },
                ORIENTATION_AXIS: { acceptReporters: false, items: ['yaw', 'pitch', 'roll'] },
                XYZ_AXIS: { acceptReporters: false, items: ['x', 'y', 'z'] },
            }
        };
    }

    // --- Block Implementations (Proxy Calls to the Hub Logic) ---
    isConnected() { 
        try {
            return this.hub.isConnected();
        } catch (error) {
            console.error('SPIKE Prime: Error checking connection:', error);
            return false;
        }
    }
    
    startMotor(args) { 
        try {
            return this.hub.startMotor(args.PORT, Cast.toNumber(args.SPEED));
        } catch (error) {
            console.error('SPIKE Prime: Error starting motor:', error);
            return Promise.resolve();
        }
    }
    
    stopMotor(args) { 
        try {
            return this.hub.stopMotor(args.PORT, args.ACTION);
        } catch (error) {
            console.error('SPIKE Prime: Error stopping motor:', error);
            return Promise.resolve();
        }
    }
    
    getMotorPosition(args) { 
        try {
            return this.hub.getSensorValue(args.PORT, 'position');
        } catch (error) {
            console.error('SPIKE Prime: Error getting motor position:', error);
            return 0;
        }
    }
    
    setLightMatrixPixel(args) { 
        try {
            return this.hub.setLightMatrixPixel(args.PORT, Cast.toNumber(args.X), Cast.toNumber(args.Y), Cast.toNumber(args.BRIGHTNESS));
        } catch (error) {
            console.error('SPIKE Prime: Error setting light matrix pixel:', error);
            return Promise.resolve();
        }
    }
    
    getDistance(args) { 
        try {
            return this.hub.getSensorValue(args.PORT, 'distance');
        } catch (error) {
            console.error('SPIKE Prime: Error getting distance:', error);
            return 0;
        }
    }
    
    isForceSensorPressed(args) { 
        try {
            return this.hub.getSensorValue(args.PORT, 'isPressed');
        } catch (error) {
            console.error('SPIKE Prime: Error checking force sensor:', error);
            return false;
        }
    }
    
    getForceSensorValue(args) { 
        try {
            return this.hub.getSensorValue(args.PORT, 'force');
        } catch (error) {
            console.error('SPIKE Prime: Error getting force value:', error);
            return 0;
        }
    }
    
    getColor(args) {
        try {
            var colorId = this.hub.getSensorValue(args.PORT, 'color');
            var colors = { 0: 'black', 1: 'magenta', 2: 'purple', 3: 'blue', 4: 'azure', 5: 'turquoise', 6: 'green', 7: 'yellow', 8: 'orange', 9: 'red', 10: 'white', 255: 'unknown' };
            return colors[colorId] || 'unknown';
        } catch (error) {
            console.error('SPIKE Prime: Error getting color:', error);
            return 'unknown';
        }
    }
    
    getOrientation(args) { 
        try {
            return this.hub.getOrientation(args.AXIS);
        } catch (error) {
            console.error('SPIKE Prime: Error getting orientation:', error);
            return 0;
        }
    }
    
    getAcceleration(args) { 
        try {
            return this.hub.getAcceleration(args.AXIS);
        } catch (error) {
            console.error('SPIKE Prime: Error getting acceleration:', error);
            return 0;
        }
    }
    
    getFaceUp() {
        try {
            var faceId = this.hub.getFaceUp();
            var faces = { 0: 'top', 1: 'front', 2: 'right', 3: 'bottom', 4: 'back', 5: 'left' };
            return faces[faceId] || 'unknown';
        } catch (error) {
            console.error('SPIKE Prime: Error getting face up:', error);
            return 'unknown';
        }
    }
    
    getBatteryLevel() { 
        try {
            return this.hub.getBatteryLevel();
        } catch (error) {
            console.error('SPIKE Prime: Error getting battery level:', error);
            return 0;
        }
    }
}

// ===================================================================================
// === HUB COMMUNICATION LOGIC =======================================================
// ===================================================================================

var HUB_CONSTANTS = {
    SERVICE_UUID: '0000fd02-0000-1000-8000-00805f9b34fb',
    RX_UUID: '0000fd02-0001-1000-8000-00805f9b34fb',
    TX_UUID: '0000fd02-0002-1000-8000-00805f9b34fb',
    
    // Message types from official LEGO documentation
    MSG_INFO_REQUEST: 0x00,
    MSG_INFO_RESPONSE: 0x01,
    MSG_TUNNEL: 0x32,
    MSG_DEVICE_NOTIFICATION_REQUEST: 0x28,
    MSG_DEVICE_NOTIFICATION_RESPONSE: 0x29,
    MSG_DEVICE_NOTIFICATION: 0x3C,
    
    // Device types from official documentation  
    DEVICE_BATTERY: 0x00,
    DEVICE_IMU: 0x01,
    DEVICE_MOTOR: 0x0A,
    DEVICE_FORCE_SENSOR: 0x0B,
    DEVICE_COLOR_SENSOR: 0x0C,
    DEVICE_DISTANCE_SENSOR: 0x0D,
    DEVICE_3X3_COLOR_MATRIX: 0x0E,
    
    // COBS constants from official documentation
    MAX_BLOCK_SIZE: 84,
    COBS_CODE_OFFSET: 2
};

var PORT_MAP = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5 };
var PORT_ID_TO_NAME = ['A', 'B', 'C', 'D', 'E', 'F'];

class SpikePrimeHub {
    constructor(runtime, extensionId) {
        this._runtime = runtime;
        this._extensionId = extensionId;
        this._ble = null;
        this._debugLog = DEBUG_TUNNEL_COMMANDS ? console.log : function() {};
        
        this.reset();
        
        try {
            // Register with Scratch's peripheral system for device selection UI
            this._runtime.registerPeripheralExtension(this._extensionId, this);
            console.log('SPIKE Prime Hub: Successfully registered with peripheral system');
        } catch (error) {
            console.error('SPIKE Prime Hub: Failed to register with peripheral system:', error);
        }
    }

    /**
     * Scan for SPIKE Prime hubs - called by Scratch's device selection UI
     */
    scan() {
        try {
            console.log('SPIKE Prime Hub: Starting scan for devices');
            
            if (this._ble) {
                this._ble.disconnect();
            }
            
            this._ble = new BLE(this._runtime, this._extensionId, {
                filters: [{ services: [HUB_CONSTANTS.SERVICE_UUID] }],
                optionalServices: [HUB_CONSTANTS.SERVICE_UUID]
            }, this._onConnect.bind(this), this.reset.bind(this));
            
        } catch (error) {
            console.error('SPIKE Prime Hub: Error during scan setup:', error);
        }
    }

    /**
     * Connect to specific peripheral - called by Scratch after user selects device
     */
    connect(id) {
        try {
            console.log('SPIKE Prime Hub: Attempting to connect to device ' + id);
            if (this._ble) {
                this._ble.connectPeripheral(id);
            } else {
                console.error('SPIKE Prime Hub: BLE not initialized for connection');
            }
        } catch (error) {
            console.error('SPIKE Prime Hub: Error during connection attempt:', error);
        }
    }

    /**
     * Disconnect from hub
     */
    disconnect() {
        try {
            console.log('SPIKE Prime Hub: Disconnecting');
            if (this._ble) {
                this._ble.disconnect();
            }
            this.reset();
        } catch (error) {
            console.error('SPIKE Prime Hub: Error during disconnect:', error);
            this.reset(); // Reset anyway
        }
    }

    /**
     * Check connection status
     */
    isConnected() {
        try {
            return this._connected && this._ble && this._ble.isConnected();
        } catch (error) {
            console.error('SPIKE Prime Hub: Error checking connection status:', error);
            return false;
        }
    }

    /**
     * Reset hub state with comprehensive error handling
     */
    reset() {
        try {
            console.log('SPIKE Prime Hub: Resetting state');
            this._connected = false;
            this.maxPacketSize = 20;
            this.maxChunkSize = 100;
            
            // Initialize port data storage
            this.ports = {};
            var self = this;
            PORT_ID_TO_NAME.forEach(function(p) {
                self.ports[p] = { 
                    value: {
                        position: 0,
                        distance: 0,
                        color: 255, // Unknown color
                        force: 0,
                        isPressed: false
                    }
                };
            });
            
            // Initialize IMU data
            this.batteryLevel = 100;
            this.imu = { 
                yaw: 0, 
                pitch: 0, 
                roll: 0, 
                accX: 0, 
                accY: 0, 
                accZ: 0, 
                faceUp: 0 
            };
            
        } catch (error) {
            console.error('SPIKE Prime Hub: Error during reset:', error);
        }
    }

    /**
     * Connection handler with proper error handling and initialization sequence
     */
    _onConnect() {
        var self = this;
        try {
            this._connected = true;
            console.log('SPIKE Prime Hub: Connected successfully, starting initialization');
            
            // Start notifications for receiving data from hub
            this._ble.startNotifications(
                HUB_CONSTANTS.SERVICE_UUID,
                HUB_CONSTANTS.TX_UUID,
                this._onMessage.bind(this)
            ).then(function() {
                console.log('SPIKE Prime Hub: Notifications started');
                // Initialize with proper sequencing
                self._initializeHub();
            }).catch(function(error) {
                console.error('SPIKE Prime Hub: Error starting notifications:', error);
                self.reset();
            });
            
        } catch (error) {
            console.error('SPIKE Prime Hub: Error during connection setup:', error);
            this.reset();
        }
    }

    /**
     * Hub initialization sequence following official documentation
     */
    _initializeHub() {
        var self = this;
        try {
            console.log('SPIKE Prime Hub: Starting initialization sequence');
            
            // Step 1: Send InfoRequest (required first step per docs)
            this.sleep(200).then(function() {
                return self.sendMessage([HUB_CONSTANTS.MSG_INFO_REQUEST]);
            }).then(function() {
                console.log('SPIKE Prime Hub: InfoRequest sent');
                // Step 2: Wait for InfoResponse, then enable device notifications  
                return self.sleep(200);
            }).then(function() {
                return self.startSensorStreaming();
            }).then(function() {
                console.log('SPIKE Prime Hub: Sensor streaming enabled');
                // Step 3: Test tunnel capabilities if debugging enabled
                if (DEBUG_TUNNEL_COMMANDS) {
                    return self.sleep(500).then(function() {
                        return self._experimentWithTunnelCommands();
                    });
                }
            }).then(function() {
                console.log('SPIKE Prime Hub: Initialization complete');
            }).catch(function(error) {
                console.error('SPIKE Prime Hub: Initialization failed:', error);
            });
            
        } catch (error) {
            console.error('SPIKE Prime Hub: Initialization failed:', error);
        }
    }

    /**
     * Experimental tunnel command testing (debug mode only)
     */
    _experimentWithTunnelCommands() {
        if (!DEBUG_TUNNEL_COMMANDS) return Promise.resolve();
        
        var self = this;
        try {
            this._debugLog('SPIKE Prime Hub: Starting tunnel command experiments');
            
            // Test various command formats to discover what works
            var testCommands = [
                'ping',
                'test',
                '{"cmd":"ping"}',
                '{"m":"test"}',
                'motor_test_0_50',
                '{"m":"motor","p":{"port":0,"speed":50}}',
                'stop_all',
                '{"m":"stop_all"}'
            ];
            
            var promise = Promise.resolve();
            testCommands.forEach(function(command) {
                promise = promise.then(function() {
                    self._debugLog('SPIKE Prime Hub: Testing tunnel command: ' + command);
                    return self.sendTunnelCommand(command);
                }).then(function() {
                    return self.sleep(100);
                });
            });
            
            return promise.then(function() {
                self._debugLog('SPIKE Prime Hub: Tunnel command experiments complete');
            });
            
        } catch (error) {
            console.error('SPIKE Prime Hub: Error during tunnel experiments:', error);
            return Promise.resolve();
        }
    }

    /**
     * Message handler with comprehensive error handling and protocol validation
     */
    _onMessage(base64Message) {
        try {
            if (!base64Message) {
                console.warn('SPIKE Prime Hub: Received empty message');
                return;
            }
            
            // Decode and unpack message using official protocol
            var rawData = Base64Util.base64ToUint8Array(base64Message);
            var data = this.unpack(rawData);
            
            if (!data || data.length === 0) {
                console.warn('SPIKE Prime Hub: Failed to unpack message or empty data');
                return;
            }

            var msgType = data[0];
            this._debugLog('SPIKE Prime Hub: Received message type 0x' + msgType.toString(16) + ', length: ' + data.length);
            
            switch (msgType) {
                case HUB_CONSTANTS.MSG_INFO_RESPONSE:
                    this._handleInfoResponse(data);
                    break;
                case HUB_CONSTANTS.MSG_DEVICE_NOTIFICATION:
                    this.parseDeviceNotification(data);
                    break;
                case HUB_CONSTANTS.MSG_DEVICE_NOTIFICATION_RESPONSE:
                    console.log('SPIKE Prime Hub: Device notification request acknowledged');
                    break;
                case HUB_CONSTANTS.MSG_TUNNEL:
                    this._handleTunnelResponse(data);
                    break;
                default:
                    console.warn('SPIKE Prime Hub: Unknown message type: 0x' + msgType.toString(16));
                    if (DEBUG_TUNNEL_COMMANDS) {
                        this._debugLog('SPIKE Prime Hub: Raw message data:', Array.from(data).map(function(b) { return '0x' + b.toString(16); }).join(' '));
                    }
                    break;
            }
            
        } catch (error) {
            console.error('SPIKE Prime Hub: Error handling message:', error);
        }
    }

    /**
     * Handle InfoResponse message with validation
     */
    _handleInfoResponse(data) {
        try {
            if (data.length < 13) {
                console.warn('SPIKE Prime Hub: InfoResponse message too short: ' + data.length);
                return;
            }
            
            // Parse according to official InfoResponse format
            var view = new DataView(data.buffer, data.byteOffset);
            var rpcMajor = data[1];
            var rpcMinor = data[2];
            var rpcBuild = view.getUint16(3, true);
            var fwMajor = data[5]; 
            var fwMinor = data[6];
            var fwBuild = view.getUint16(7, true);
            this.maxPacketSize = view.getUint16(9, true);
            var maxMessageSize = view.getUint16(11, true);
            this.maxChunkSize = view.getUint16(13, true);
            
            console.log('SPIKE Prime Hub: InfoResponse received');
            console.log('  RPC Version: ' + rpcMajor + '.' + rpcMinor + '.' + rpcBuild);
            console.log('  Firmware Version: ' + fwMajor + '.' + fwMinor + '.' + fwBuild);
            console.log('  Max Packet Size: ' + this.maxPacketSize);
            console.log('  Max Message Size: ' + maxMessageSize);
            console.log('  Max Chunk Size: ' + this.maxChunkSize);
            
        } catch (error) {
            console.error('SPIKE Prime Hub: Error parsing InfoResponse:', error);
        }
    }

    /**
     * Handle tunnel response messages (debug mode)
     */
    _handleTunnelResponse(data) {
        if (!DEBUG_TUNNEL_COMMANDS) return;
        
        try {
            if (data.length >= 3) {
                var view = new DataView(data.buffer, data.byteOffset);
                var payloadSize = view.getUint16(1, true);
                
                if (data.length >= 3 + payloadSize) {
                    var payload = data.slice(3, 3 + payloadSize);
                    var responseText = new TextDecoder().decode(payload);
                    this._debugLog('SPIKE Prime Hub: Tunnel response: ' + responseText);
                } else {
                    this._debugLog('SPIKE Prime Hub: Tunnel response payload size mismatch');
                }
            }
        } catch (error) {
            console.error('SPIKE Prime Hub: Error parsing tunnel response:', error);
        }
    }

    /**
     * Parse device notifications with robust error handling per official format
     */
    parseDeviceNotification(data) {
        try {
            if (data.length < 3) {
                console.warn('SPIKE Prime Hub: Device notification too short');
                return;
            }
            
            // Parse payload size (little-endian uint16)
            var view = new DataView(data.buffer, data.byteOffset);
            var payloadSize = view.getUint16(1, true);
            
            if (3 + payloadSize > data.length) {
                console.warn('SPIKE Prime Hub: Device notification payload size exceeds message length');
                return;
            }
            
            var payload = data.slice(3, 3 + payloadSize);
            this._debugLog('SPIKE Prime Hub: Device notification payload size: ' + payloadSize);
            
            // Parse individual device messages within payload
            var offset = 0;
            while (offset < payload.length) {
                try {
                    var deviceMsgType = payload[offset];
                    var remaining = payload.length - offset;
                    
                    switch (deviceMsgType) {
                        case HUB_CONSTANTS.DEVICE_BATTERY:
                            if (remaining >= 2) {
                                this.batteryLevel = payload[offset + 1];
                                this._debugLog('SPIKE Prime Hub: Battery level: ' + this.batteryLevel + '%');
                                offset += 2;
                            } else {
                                console.warn('SPIKE Prime Hub: Battery message too short');
                                offset = payload.length;
                            }
                            break;
                            
                        case HUB_CONSTANTS.DEVICE_IMU:
                            if (remaining >= 21) {
                                var imuView = new DataView(payload.buffer, payload.byteOffset + offset);
                                this.imu.faceUp = imuView.getUint8(1);
                                var yawFace = imuView.getUint8(2);
                                this.imu.yaw = imuView.getInt16(3, true);
                                this.imu.pitch = imuView.getInt16(5, true);
                                this.imu.roll = imuView.getInt16(7, true);
                                this.imu.accX = imuView.getInt16(9, true);
                                this.imu.accY = imuView.getInt16(11, true);
                                this.imu.accZ = imuView.getInt16(13, true);
                                
                                this._debugLog('SPIKE Prime Hub: IMU - Face up: ' + this.imu.faceUp + ', Yaw: ' + this.imu.yaw + ', Pitch: ' + this.imu.pitch + ', Roll: ' + this.imu.roll);
                                offset += 21;
                            } else {
                                console.warn('SPIKE Prime Hub: IMU message too short');
                                offset = payload.length;
                            }
                            break;
                            
                        case HUB_CONSTANTS.DEVICE_MOTOR:
                            if (remaining >= 11) {
                                var portId = payload[offset + 1];
                                var portName = PORT_ID_TO_NAME[portId];
                                if (portName) {
                                    var motorView = new DataView(payload.buffer, payload.byteOffset + offset);
                                    var deviceType = motorView.getUint8(2);
                                    var absolutePos = motorView.getInt16(3, true);
                                    var power = motorView.getInt16(5, true);
                                    var speed = motorView.getInt8(7);
                                    this.ports[portName].value.position = motorView.getInt32(8, true);
                                    
                                    this._debugLog('SPIKE Prime Hub: Motor ' + portName + ' - Position: ' + this.ports[portName].value.position + ', Speed: ' + speed + ', Power: ' + power);
                                }
                                offset += 11;
                            } else {
                                console.warn('SPIKE Prime Hub: Motor message too short');
                                offset = payload.length;
                            }
                            break;
                            
                        case HUB_CONSTANTS.DEVICE_FORCE_SENSOR:
                            if (remaining >= 4) {
                                var portId = payload[offset + 1];
                                var portName = PORT_ID_TO_NAME[portId];
                                if (portName) {
                                    this.ports[portName].value.force = payload[offset + 2];
                                    this.ports[portName].value.isPressed = payload[offset + 3] === 1;
                                    
                                    this._debugLog('SPIKE Prime Hub: Force sensor ' + portName + ' - Force: ' + this.ports[portName].value.force + '%, Pressed: ' + this.ports[portName].value.isPressed);
                                }
                                offset += 4;
                            } else {
                                console.warn('SPIKE Prime Hub: Force sensor message too short');
                                offset = payload.length;
                            }
                            break;
                            
                        case HUB_CONSTANTS.DEVICE_COLOR_SENSOR:
                            if (remaining >= 9) {
                                var portId = payload[offset + 1];
                                var portName = PORT_ID_TO_NAME[portId];
                                if (portName) {
                                    this.ports[portName].value.color = payload[offset + 2];
                                    // Additional color data available in bytes 3-8 (RGB values)
                                    
                                    var colorNames = { 0: 'black', 1: 'magenta', 2: 'purple', 3: 'blue', 4: 'azure', 5: 'turquoise', 6: 'green', 7: 'yellow', 8: 'orange', 9: 'red', 10: 'white', 255: 'unknown' };
                                    this._debugLog('SPIKE Prime Hub: Color sensor ' + portName + ' - Color: ' + (colorNames[this.ports[portName].value.color] || 'unknown') + ' (' + this.ports[portName].value.color + ')');
                                }
                                offset += 9;
                            } else {
                                console.warn('SPIKE Prime Hub: Color sensor message too short');
                                offset = payload.length;
                            }
                            break;
                            
                        case HUB_CONSTANTS.DEVICE_DISTANCE_SENSOR:
                            if (remaining >= 4) {
                                var portId = payload[offset + 1];
                                var portName = PORT_ID_TO_NAME[portId];
                                if (portName) {
                                    var distView = new DataView(payload.buffer, payload.byteOffset + offset);
                                    this.ports[portName].value.distance = distView.getInt16(2, true);
                                    
                                    this._debugLog('SPIKE Prime Hub: Distance sensor ' + portName + ' - Distance: ' + this.ports[portName].value.distance + 'mm');
                                }
                                offset += 4;
                            } else {
                                console.warn('SPIKE Prime Hub: Distance sensor message too short');
                                offset = payload.length;
                            }
                            break;
                            
                        case HUB_CONSTANTS.DEVICE_3X3_COLOR_MATRIX:
                            // This is an output device, skip the data
                            if (remaining >= 11) {
                                offset += 11;
                            } else {
                                offset = payload.length;
                            }
                            break;
                            
                        default:
                            console.warn('SPIKE Prime Hub: Unknown device type: 0x' + deviceMsgType.toString(16));
                            offset = payload.length; // Skip to end to prevent infinite loop
                            break;
                    }
                } catch (deviceError) {
                    console.error('SPIKE Prime Hub: Error parsing individual device message:', deviceError);
                    offset = payload.length; // Skip to end on error
                }
            }
            
        } catch (error) {
            console.error('SPIKE Prime Hub: Error parsing device notification:', error);
        }
    }

    /**
     * Start sensor streaming with device notification request
     */
    startSensorStreaming() {
        try {
            console.log('SPIKE Prime Hub: Enabling sensor streaming');
            
            // Send DeviceNotificationRequest with 100ms interval (per official docs)
            var message = new Uint8Array(3);
            message[0] = HUB_CONSTANTS.MSG_DEVICE_NOTIFICATION_REQUEST;
            message[1] = 100 & 0xFF;        // Low byte of interval
            message[2] = (100 >> 8) & 0xFF; // High byte of interval
            
            return this.sendMessage(Array.from(message));
            
        } catch (error) {
            console.error('SPIKE Prime Hub: Error starting sensor streaming:', error);
            return Promise.resolve();
        }
    }
    
    /**
     * Motor control with multiple tunnel command format attempts
     */
    startMotor(port, speed) {
        try {
            var portId = PORT_MAP[port];
            if (portId === undefined) {
                console.warn('SPIKE Prime Hub: Invalid port for motor: ' + port);
                return Promise.resolve();
            }
            
            var speedVal = Math.max(-100, Math.min(100, Math.round(speed)));
            console.log('SPIKE Prime Hub: Starting motor ' + port + ' at ' + speedVal + '% speed');
            
            // Try multiple command formats to find what works
            if (DEBUG_TUNNEL_COMMANDS) {
                // Test various formats when debugging
                this.sendTunnelCommand('motor ' + portId + ' ' + speedVal);
                this.sendTunnelCommand('motor_' + port + '_' + speedVal);
                this.sendTunnelCommand('{"cmd":"motor","port":"' + port + '","speed":' + speedVal + '}');
            }
            
            // Primary command format (JSON-like structure commonly used)
            var json = '{"m":"motor","p":{"port":' + portId + ',"speed":' + speedVal + '}}';
            return this.sendTunnelCommand(json);
            
        } catch (error) {
            console.error('SPIKE Prime Hub: Error starting motor:', error);
            return Promise.resolve();
        }
    }

    /**
     * Stop motor with multiple command format attempts
     */
    stopMotor(port, action) {
        try {
            var portId = PORT_MAP[port];
            if (portId === undefined) {
                console.warn('SPIKE Prime Hub: Invalid port for motor stop: ' + port);
                return Promise.resolve();
            }
            
            var endStateMap = { 'coast': 0, 'brake': 1, 'hold': 2 };
            var endState = endStateMap[action] || 1;
            console.log('SPIKE Prime Hub: Stopping motor ' + port + ' with action: ' + action);
            
            if (DEBUG_TUNNEL_COMMANDS) {
                // Test various stop formats when debugging
                this.sendTunnelCommand('stop ' + portId + ' ' + action);
                this.sendTunnelCommand('motor_stop_' + port);
                this.sendTunnelCommand('{"cmd":"stop","port":"' + port + '","action":"' + action + '"}');
            }
            
            // Primary command format
            var json = '{"m":"motor","p":{"port":' + portId + ',"speed":0,"end_state":' + endState + '}}';
            return this.sendTunnelCommand(json);
            
        } catch (error) {
            console.error('SPIKE Prime Hub: Error stopping motor:', error);
            return Promise.resolve();
        }
    }
    
    /**
     * Stop all motors
     */
    stopAllMotors() { 
        try {
            console.log('SPIKE Prime Hub: Stopping all motors');
            var self = this;
            Object.keys(PORT_MAP).forEach(function(port) {
                self.stopMotor(port, 'brake');
            });
        } catch (error) {
            console.error('SPIKE Prime Hub: Error stopping all motors:', error);
        }
    }
    
    /**
     * Set 3x3 light matrix pixel
     */
    setLightMatrixPixel(port, x, y, brightness) {
        try {
            var portId = PORT_MAP[port];
            if (portId === undefined) {
                console.warn('SPIKE Prime Hub: Invalid port for light matrix: ' + port);
                return Promise.resolve();
            }
            
            var clampedX = Math.max(0, Math.min(2, Math.round(x)));
            var clampedY = Math.max(0, Math.min(2, Math.round(y)));
            var brightnessValue = Math.round(Math.max(0, Math.min(100, brightness)) / 10);
            
            console.log('SPIKE Prime Hub: Setting light matrix ' + port + ' pixel (' + clampedX + ',' + clampedY + ') to ' + brightness + '% brightness');
            
            // Create 3x3 pixel array with single pixel set
            var pixelValue = (brightnessValue << 4) | 9; // Red color (9) for visibility
            var pixelIndex = clampedY * 3 + clampedX;
            var pixels = Array(9).fill(0);
            pixels[pixelIndex] = pixelValue;
            
            if (DEBUG_TUNNEL_COMMANDS) {
                // Test various light matrix formats when debugging
                this.sendTunnelCommand('light ' + portId + ' ' + clampedX + ' ' + clampedY + ' ' + brightness);
                this.sendTunnelCommand('{"cmd":"light","port":"' + port + '","x":' + clampedX + ',"y":' + clampedY + ',"brightness":' + brightness + '}');
            }
            
            // Primary command format
            var json = '{"m":"display_3x3","p":{"port":' + portId + ',"data":' + JSON.stringify(pixels) + '}}';
            return this.sendTunnelCommand(json);
            
        } catch (error) {
            console.error('SPIKE Prime Hub: Error setting light matrix pixel:', error);
            return Promise.resolve();
        }
    }

    /**
     * Send tunnel command with proper message formatting
     */
    sendTunnelCommand(command) {
        try {
            this._debugLog('SPIKE Prime Hub: Sending tunnel command: ' + command);
            
            var commandBytes = new TextEncoder().encode(command);
            var message = new Uint8Array(3 + commandBytes.length);
            message[0] = HUB_CONSTANTS.MSG_TUNNEL;
            
            // Set payload size in little-endian format
            var view = new DataView(message.buffer);
            view.setUint16(1, commandBytes.length, true);
            
            // Set command payload
            message.set(commandBytes, 3);
            
            return this.sendMessage(Array.from(message));
            
        } catch (error) {
            console.error('SPIKE Prime Hub: Error sending tunnel command:', error);
            return Promise.resolve();
        }
    }

    /**
     * Send message using official SPIKE Prime protocol (COBS + XOR + Delimiter)
     */
    sendMessage(payloadArray) {
        try {
            if (!this.isConnected()) {
                console.warn('SPIKE Prime Hub: Cannot send message - not connected');
                return Promise.resolve();
            }
            
            // Pack using official protocol: COBS -> XOR -> Delimiter
            var packed = this.pack(new Uint8Array(payloadArray));
            var base64Data = Base64Util.uint8ArrayToBase64(packed);
            
            this._debugLog('SPIKE Prime Hub: Sending ' + packed.length + ' bytes');
            
            return this._ble.write(
                HUB_CONSTANTS.SERVICE_UUID, 
                HUB_CONSTANTS.RX_UUID, 
                base64Data, 
                'base64', 
                true
            );
            
        } catch (error) {
            console.error('SPIKE Prime Hub: Error sending message:', error);
            return Promise.resolve();
        }
    }

    /**
     * Message packing following official 3-step process: COBS -> XOR -> Delimiter
     */
    pack(data) {
        try {
            // Step 1: COBS encode to escape delimiters 0x00, 0x01, 0x02
            var cobsEncoded = this._cobsEncode(data);
            
            // Step 2: XOR all bytes with 0x03 to avoid control characters
            var xorEncoded = new Uint8Array(cobsEncoded.length);
            for (var i = 0; i < cobsEncoded.length; i++) {
                xorEncoded[i] = cobsEncoded[i] ^ 0x03;
            }
            
            // Step 3: Add delimiter 0x02 to mark end of message
            var final = new Uint8Array(xorEncoded.length + 1);
            final.set(xorEncoded, 0);
            final[final.length - 1] = 0x02;
            
            return final;
            
        } catch (error) {
            console.error('SPIKE Prime Hub: Error packing message:', error);
            return new Uint8Array();
        }
    }

    /**
     * Message unpacking - reverse of pack process
     */
    unpack(buffer) {
        try {
            var frame = new Uint8Array(buffer);
            
            if (frame.length === 0) {
                console.warn('SPIKE Prime Hub: Empty frame received');
                return null;
            }
            
            if (frame[frame.length - 1] !== 0x02) {
                console.warn('SPIKE Prime Hub: Frame missing delimiter 0x02');
                return null;
            }
            
            // Remove priority byte if present and delimiter
            var start = frame[0] === 0x01 ? 1 : 0;
            var unframed = frame.slice(start, -1);
            
            // Reverse XOR with 0x03
            var xorDecoded = new Uint8Array(unframed.length);
            for (var i = 0; i < unframed.length; i++) {
                xorDecoded[i] = unframed[i] ^ 0x03;
            }
            
            // COBS decode
            return this._cobsDecode(xorDecoded);
            
        } catch (error) {
            console.error('SPIKE Prime Hub: Error unpacking message:', error);
            return null;
        }
    }
    
    /**
     * COBS encoding - direct translation of official Python implementation
     * Escapes delimiters 0x00, 0x01, 0x02 using code words
     */
    _cobsEncode(data) {
        try {
            var buffer = [0]; // Start with placeholder for first code word
            var code_index = 0;  // Index of current code word being built
            
            for (var i = 0; i < data.length; i++) {
                var byte = data[i];
                if (byte <= 2) {
                    // Found delimiter - complete current block
                    // Calculate code word: delimiter_base + block_offset
                    var delimiter_base = byte * HUB_CONSTANTS.MAX_BLOCK_SIZE;
                    var block_offset = (buffer.length - code_index) + HUB_CONSTANTS.COBS_CODE_OFFSET;
                    buffer[code_index] = delimiter_base + block_offset;
                    
                    // Start new block
                    code_index = buffer.length;
                    buffer.push(0);
                } else {
                    // Non-delimiter byte - add to current block
                    buffer.push(byte);
                    
                    // Check if block size limit reached
                    if (buffer.length - code_index >= HUB_CONSTANTS.MAX_BLOCK_SIZE) {
                        // Complete block due to size limit
                        buffer[code_index] = (buffer.length - code_index) + HUB_CONSTANTS.COBS_CODE_OFFSET;
                        code_index = buffer.length;
                        buffer.push(0);
                    }
                }
            }
            
            // Complete final block
            buffer[code_index] = (buffer.length - code_index) + HUB_CONSTANTS.COBS_CODE_OFFSET;
            
            return new Uint8Array(buffer);
            
        } catch (error) {
            console.error('SPIKE Prime Hub: COBS encoding error:', error);
            return new Uint8Array();
        }
    }
    
    /**
     * COBS decoding - direct translation of official Python implementation
     */
    _cobsDecode(data) {
        try {
            var result = [];
            var i = 0;
            
            if (data.length === 0) return new Uint8Array();
            
            while (i < data.length) {
                var code = data[i] - HUB_CONSTANTS.COBS_CODE_OFFSET;
                var delimiter = Math.floor(code / HUB_CONSTANTS.MAX_BLOCK_SIZE);
                var len = code % HUB_CONSTANTS.MAX_BLOCK_SIZE;
                
                // Copy non-delimiter bytes from block
                for (var j = 1; j < len; j++) {
                    if (i + j < data.length) {
                        result.push(data[i + j]);
                    }
                }
                
                // Add delimiter if present (except for last block)
                if (delimiter <= 2 && (i + len) < data.length) {
                    result.push(delimiter);
                }
                
                i += len;
            }
            
            return new Uint8Array(result);
            
        } catch (error) {
            console.error('SPIKE Prime Hub: COBS decoding error:', error);
            return new Uint8Array();
        }
    }

    // --- Getter methods for sensor values ---
    getSensorValue(port, valueType) { 
        try {
            if (this.ports[port] && this.ports[port].value && this.ports[port].value[valueType] !== undefined) {
                return this.ports[port].value[valueType];
            }
            return 0;
        } catch (error) {
            console.error('SPIKE Prime Hub: Error getting sensor value:', error);
            return 0;
        }
    }
    
    getBatteryLevel() { 
        try {
            return this.batteryLevel;
        } catch (error) {
            console.error('SPIKE Prime Hub: Error getting battery level:', error);
            return 0;
        }
    }
    
    getOrientation(axis) { 
        try {
            return this.imu[axis] || 0;
        } catch (error) {
            console.error('SPIKE Prime Hub: Error getting orientation:', error);
            return 0;
        }
    }
    
    getAcceleration(axis) { 
        try {
            var axisKey = 'acc' + axis.toUpperCase();
            return this.imu[axisKey] || 0;
        } catch (error) {
            console.error('SPIKE Prime Hub: Error getting acceleration:', error);
            return 0;
        }
    }
    
    getFaceUp() { 
        try {
            return this.imu.faceUp;
        } catch (error) {
            console.error('SPIKE Prime Hub: Error getting face up:', error);
            return 0;
        }
    }
    
    sleep(ms) { 
        return new Promise(function(resolve) {
            setTimeout(resolve, ms);
        }); 
    }
}

// Required for xcratch framework compatibility
exports.blockClass = Scratch3SpikePrimeBlocks;
module.exports = Scratch3SpikePrimeBlocks;