const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const BLE = require('../../io/ble'); // Use the official Scratch/xcratch BLE handler
const Base64Util = require('../../util/base64-util'); // Use Scratch's Base64 utility

// Set to true for extensive console logging of messages and states
const DEBUG_MODE = false;

// This class defines the Scratch blocks and their behavior.
// It is the main entry point for the extension.
class Scratch3SpikePrimeOfficialBlocks {
    constructor(runtime) {
        this.runtime = runtime;
        // The hub object handles all low-level communication and protocol logic.
        // It's created with a reference to the runtime to use the official BLE class.
        this.hub = new SpikePrimeOfficialHub(this.runtime, this.constructor.EXTENSION_ID);

        // Ensure motors stop when the Scratch project is stopped.
        this.runtime.on('PROJECT_STOP_ALL', () => {
            this.hub.stopAllMotors();
        });
    }

    static get EXTENSION_ID() {
        return 'spikePrimeOfficialProtocol';
    }

    getInfo() {
        return {
            id: Scratch3SpikePrimeOfficialBlocks.EXTENSION_ID,
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

    // --- Block Implementations (Proxy Calls to the Hub Logic with Error Handling) ---
    isConnected() { return this.hub.isConnected(); }
    startMotor(args) { return this.hub.startMotor(args.PORT, Cast.toNumber(args.SPEED)); }
    stopMotor(args) { return this.hub.stopMotor(args.PORT, args.ACTION); }
    getMotorPosition(args) { return this.hub.getSensorValue(args.PORT, 'position'); }
    setLightMatrixPixel(args) { return this.hub.setLightMatrixPixel(args.PORT, Cast.toNumber(args.X), Cast.toNumber(args.Y), Cast.toNumber(args.BRIGHTNESS)); }
    getDistance(args) { return this.hub.getSensorValue(args.PORT, 'distance'); }
    isForceSensorPressed(args) { return this.hub.getSensorValue(args.PORT, 'isPressed'); }
    getForceSensorValue(args) { return this.hub.getSensorValue(args.PORT, 'force'); }
    getColor(args) {
        const colorId = this.hub.getSensorValue(args.PORT, 'color');
        const colors = { 0: 'black', 1: 'magenta', 2: 'purple', 3: 'blue', 4: 'azure', 5: 'turquoise', 6: 'green', 7: 'yellow', 8: 'orange', 9: 'red', 10: 'white', 255: 'unknown' };
        return colors[colorId] || 'unknown';
    }
    getOrientation(args) { return this.hub.getOrientation(args.AXIS); }
    getAcceleration(args) { return this.hub.getAcceleration(args.AXIS); }
    getFaceUp() {
        const faceId = this.hub.getFaceUp();
        const faces = { 0: 'top', 1: 'front', 2: 'right', 3: 'bottom', 4: 'back', 5: 'left' };
        return faces[faceId] || 'unknown';
    }
    getBatteryLevel() { return this.hub.getBatteryLevel(); }
}


// ===================================================================================
// === HUB COMMUNICATION LOGIC =======================================================
// ===================================================================================

const HUB_CONSTANTS = {
    SERVICE_UUID: '0000fd02-0000-1000-8000-00805f9b34fb',
    RX_UUID: '0000fd02-0001-1000-8000-00805f9b34fb',
    TX_UUID: '0000fd02-0002-1000-8000-00805f9b34fb',
    MSG_INFO_REQUEST: 0x00,
    MSG_INFO_RESPONSE: 0x01,
    MSG_TUNNEL: 0x32,
    MSG_DEVICE_NOTIFICATION_REQUEST: 0x28,
    MSG_DEVICE_NOTIFICATION_RESPONSE: 0x29,
    MSG_DEVICE_NOTIFICATION: 0x3C,
};
const PORT_MAP = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5 };
const PORT_ID_TO_NAME = ['A', 'B', 'C', 'D', 'E', 'F'];

class SpikePrimeOfficialHub {
    constructor(runtime, extensionId) {
        this._runtime = runtime;
        this._extensionId = extensionId;
        this._ble = null;
        this._log = DEBUG_MODE ? console.log : () => {}; // Conditional logging
        
        this.reset();
        
        // This makes the hub object compatible with the Scratch Link framework
        this._runtime.registerPeripheralExtension(this._extensionId, this);
    }

    // --- Framework Methods (scan, connect, disconnect, isConnected) ---

    scan() {
        if (this._ble) {
            this._ble.disconnect();
        }
        this._ble = new BLE(this._runtime, this._extensionId, {
            filters: [{ services: [HUB_CONSTANTS.SERVICE_UUID] }],
            optionalServices: [HUB_CONSTANTS.SERVICE_UUID]
        }, this._onConnect.bind(this), this.reset.bind(this));
    }

    connect(id) {
        if (this._ble) {
            this._ble.connectPeripheral(id);
        }
    }

    disconnect() {
        if (this._ble) {
            this._ble.disconnect();
        }
        this.reset();
    }

    isConnected() {
        return this._connected && this._ble && this._ble.isConnected();
    }

    // --- Hub State Management ---

    reset() {
        console.log('🔄 Resetting Hub State.');
        this._connected = false;
        this.maxPacketSize = 20; // Default, updated from hub info
        this.ports = {};
        PORT_ID_TO_NAME.forEach(p => {
            this.ports[p] = { value: {} };
        });
        this.batteryLevel = 100;
        this.imu = { yaw: 0, pitch: 0, roll: 0, accX: 0, accY: 0, accZ: 0, faceUp: 0 };
    }

    // --- BLE Connection and Initialization ---

    async _onConnect() {
        this._connected = true;
        
        await this._ble.startNotifications(
            HUB_CONSTANTS.SERVICE_UUID,
            HUB_CONSTANTS.TX_UUID,
            this._onMessage.bind(this)
        );
        
        console.log('✅ Hub Connected! Initializing...');

        // Official handshake and setup sequence
        await this.sleep(200);
        await this.sendMessage([HUB_CONSTANTS.MSG_INFO_REQUEST]);
        await this.sleep(200);
        await this.startSensorStreaming();
    }

    _onMessage(base64Message) {
        const data = this.unpack(Base64Util.base64ToUint8Array(base64Message));
        if (!data || data.length === 0) return;

        const msgType = data[0];
        
        if (msgType === HUB_CONSTANTS.MSG_INFO_RESPONSE) {
            if (data.length >= 13) {
                const view = new DataView(data.buffer, data.byteOffset);
                this.maxPacketSize = view.getUint16(9, true);
            }
        } else if (msgType === HUB_CONSTANTS.MSG_DEVICE_NOTIFICATION) {
            this.parseDeviceNotification(data);
        }
    }

    parseDeviceNotification(data) {
        let offset = 3; // Skip header and size
        while (offset < data.length) {
            if (offset >= data.length) break;
            const deviceMsgType = data[offset];
            const remaining = data.length - offset;
            
            try {
                switch (deviceMsgType) {
                    case 0x00: // Battery
                        if (remaining >= 2) this.batteryLevel = data[offset + 1];
                        offset += 2;
                        break;
                    case 0x01: // IMU
                        if (remaining >= 21) {
                            const imuView = new DataView(data.buffer, offset);
                            this.imu.faceUp = imuView.getUint8(1);
                            this.imu.yaw = imuView.getInt16(3, true);
                            this.imu.pitch = imuView.getInt16(5, true);
                            this.imu.roll = imuView.getInt16(7, true);
                            this.imu.accX = imuView.getInt16(9, true);
                            this.imu.accY = imuView.getInt16(11, true);
                            this.imu.accZ = imuView.getInt16(13, true);
                        }
                        offset += 21;
                        break;
                    case 0x0A: // Motor
                        if (remaining >= 11) {
                            const portName = PORT_ID_TO_NAME[data[offset + 1]];
                            if (portName) {
                                const motorView = new DataView(data.buffer, offset);
                                this.ports[portName].value.position = motorView.getInt32(7, true);
                            }
                        }
                        offset += 11;
                        break;
                    case 0x0B: // Force Sensor
                        if (remaining >= 4) {
                            const portName = PORT_ID_TO_NAME[data[offset + 1]];
                            if (portName) {
                                this.ports[portName].value.force = data[offset + 2];
                                this.ports[portName].value.isPressed = data[offset + 3] === 1;
                            }
                        }
                        offset += 4;
                        break;
                    case 0x0C: // Color Sensor
                        if (remaining >= 9) {
                            const portName = PORT_ID_TO_NAME[data[offset + 1]];
                            if (portName) this.ports[portName].value.color = data[offset + 2];
                        }
                        offset += 9;
                        break;
                    case 0x0D: // Distance Sensor
                        if (remaining >= 4) {
                            const portName = PORT_ID_TO_NAME[data[offset + 1]];
                            if (portName) {
                                const distView = new DataView(data.buffer, offset);
                                this.ports[portName].value.distance = distView.getInt16(2, true);
                            }
                        }
                        offset += 4;
                        break;
                    case 0x0E: // 3x3 Color Matrix (Output, skip)
                        offset += 11;
                        break;
                    default:
                        offset = data.length; // Stop parsing unknown device
                        break;
                }
            } catch (e) {
                console.error('Error parsing device notification:', e);
                offset = data.length;
            }
        }
    }

    async startSensorStreaming() {
        const payload = [0x64, 0x00]; // Interval 100ms
        await this.sendMessage([HUB_CONSTANTS.MSG_DEVICE_NOTIFICATION_REQUEST, ...payload]);
    }
    
    // --- Public Command Methods ---
    startMotor(port, speed) {
        const portId = PORT_MAP[port];
        if (portId === undefined) return;
        const speedVal = Math.max(-100, Math.min(100, Math.round(speed)));
        const json = `{"m":"motor","p":{"port":${portId},"speed":${speedVal}}}`;
        return this.sendTunnelCommand(json);
    }

    stopMotor(port, action) {
        const portId = PORT_MAP[port];
        if (portId === undefined) return;
        const endState = { 'coast': 0, 'brake': 1, 'hold': 2 }[action] || 1;
        const json = `{"m":"motor","p":{"port":${portId},"speed":0,"end_state":${endState}}}`;
        return this.sendTunnelCommand(json);
    }
    
    stopAllMotors() { Object.keys(PORT_MAP).forEach(p => this.stopMotor(p, 'brake')); }
    
    setLightMatrixPixel(port, x, y, brightness) {
        const portId = PORT_MAP[port];
        if (portId === undefined) return;
        const clampedX = Math.max(0, Math.min(2, Math.round(x)));
        const clampedY = Math.max(0, Math.min(2, Math.round(y)));
        const brightnessValue = Math.round(Math.max(0, Math.min(100, brightness)) / 10);
        
        const pixelValue = (brightnessValue << 4) | 9; // Red for visibility
        const pixelIndex = clampedY * 3 + clampedX;
        
        const pixels = Array(9).fill(0);
        pixels[pixelIndex] = pixelValue;
        
        const json = `{"m":"display_3x3","p":{"port":${portId},"data":${JSON.stringify(pixels)}}}`;
        return this.sendTunnelCommand(json);
    }

    async sendTunnelCommand(command) {
        const commandBytes = new TextEncoder().encode(command);
        const payload = new Uint8Array(commandBytes.length + 2);
        const view = new DataView(payload.buffer);
        view.setUint16(0, commandBytes.length, true); // size, little-endian
        payload.set(commandBytes, 2);
        await this.sendMessage([HUB_CONSTANTS.MSG_TUNNEL, ...payload]);
    }

    // --- Message Framing & Encoding ---
    async sendMessage(payloadArray) {
        if (!this.isConnected()) return;
        const packed = this.pack(new Uint8Array(payloadArray));
        const base64Data = Base64Util.uint8ArrayToBase64(packed);
        await this._ble.write(HUB_CONSTANTS.SERVICE_UUID, HUB_CONSTANTS.RX_UUID, base64Data, 'base64', true);
    }

    // This pack method is a direct JS translation of the official LEGO documentation's Python example
    pack(data) {
        const cobsEncoded = this._cobsEncode(data);
        const xorEncoded = cobsEncoded.map(b => b ^ 0x03);
        const final = new Uint8Array(xorEncoded.length + 1);
        final.set(xorEncoded, 0);
        final[final.length] = 0x02;
        return final;
    }

    // This unpack method is the reverse of the pack method
    unpack(buffer) {
        const frame = new Uint8Array(buffer);
        if (frame.length === 0 || frame[frame.length - 1] !== 0x02) return null;
        const start = frame[0] === 0x01 ? 1 : 0;
        const unframed = frame.slice(start, frame.length - 1);
        const xorDecoded = unframed.map(b => b ^ 0x03);
        return this._cobsDecode(xorDecoded);
    }
    
    _cobsEncode(data) {
        const buffer = [0]; let code_index = 0;
        for (const byte of data) {
            if (byte <= 2) {
                buffer[code_index] = (buffer.length - code_index) + (byte * 84) + 2;
                code_index = buffer.length; buffer.push(0);
            } else {
                buffer.push(byte);
                if (buffer.length - code_index >= 84) {
                    buffer[code_index] = (buffer.length - code_index) + 2;
                    code_index = buffer.length; buffer.push(0);
                }
            }
        }
        buffer[code_index] = buffer.length - code_index + 2;
        return new Uint8Array(buffer);
    }
    
    _cobsDecode(data) {
        const result = []; let i = 0;
        if (data.length === 0) return new Uint8Array();
        while (i < data.length) {
            let code = data[i] - 2;
            let delimiter = Math.floor(code / 84);
            let len = code % 84;
            for (let j = 1; j < len; j++) {
                if (i + j < data.length) result.push(data[i + j]);
            }
            if (delimiter <= 2 && (i + len) <= data.length) result.push(delimiter);
            i += len;
        }
        if (result.length > 0) result.pop();
        return new Uint8Array(result);
    }

    // --- Getters & Utilities ---
    getSensorValue(port, valueType) {
        const portData = this.ports[port];
        return (portData && portData.value.hasOwnProperty(valueType)) ? portData.value[valueType] : 0;
    }
    getBatteryLevel() { return this.batteryLevel; }
    getOrientation(axis) { return this.imu[axis] || 0; }
    getAcceleration(axis) { return this.imu[`acc${axis.toUpperCase()}`] || 0; }
    getFaceUp() { return this.imu.faceUp; }
    sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
}

// Required for xcratch framework compatibility
exports.blockClass = Scratch3SpikePrimeOfficialBlocks;
module.exports = Scratch3SpikePrimeOfficialBlocks;