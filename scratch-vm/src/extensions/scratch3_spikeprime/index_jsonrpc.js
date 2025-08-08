do we already cover all of this?

When writing Python on the new LEGO MINDSTORMS and SPIKE hubs, the default methods are somewhat limited. With ‘import hub,’ you can use some hacks to access extra functions on the hub. They are undocumented, but in this article, I’m sharing what I have discovered so far. This is lengthy article full of SPIKE and MINDSTORMS Python hacks, true to the ‘Anton’s Mindstorms Hacks’ name.
The first thing I explain is how to access the internal Inertial Motion Unit, IMU in short. The IMU reports angles, angular rates, acceleration, and position in space. This is relevant for many advanced robots. I also do some advanced button programming, including the led on the main button. The hub has some interesting status reports that I will discuss. Quickly jump to each of the topics:
Gyro position and rates
Gestures
Accelerometer
Display
Hub status
Onboard Sound files
Buttons
Motors
Distance sensor led and reading
Micropython libraries
Exiting the script
Currently I have very little information on the motor en sensor methods. They are relatively well documented inside the official apps. I found little need myself to investigate. Maybe I’ll do that in the future. I also plan to find out how to bluetooth methods work. These are harder to reverse engineer.
When you use the hacks in this article, make sure to avoid naming conflicts. The default program template in MINDSTORMS and SPIKE defines a hub object for you. Be sure to rename it remove that line.
# Create your objects here.
hub = MSHub()     # <- !!! remove this or give the MSHub instance a different name !!!# Then you can safely goimport hub# Alternatively, you can access the hub object in this article through this method:from mindstorms import large_technic_hub# Now all of the hacks below are accessible through the hub object from the large technic hub# For example getting the gyro rates.
rates = large_technic_hub.hub.motion.gyroscope()
How to get gyro rate and angle in Python on the SPIKE or MINDSTORMS hub
A gyroscope is a sensor that reports rotational speeds. From the continuous measurement of speeds, the SPIKE or MINDSTORMS hub can derive its rotational angle. The angle is an indirect value, and spinning the hub fast can mess that angle up.
In Scratch and default Python, you can only get gyro angles. Using the hub object, you can also access gyro rates. This is how:
 import hub

 # rates in degrees per second
 yaw_rate, pitch_rate, roll_rate = hub.motion.gyroscope()# filtered, less jittery rates:
 yaw_rate, pitch_rate, roll_rate = hub.motion.gyroscope_filter()

 # angles in degrees
 yaw_angle, pitch_angle, roll_angle = hub.motion.position() 
If your hub would be an airplane, the nose is where the USB port is, and the top is the 5×5 led matrix. Like an airplane, the hub can roll from side to side, pitch forward or backward, and yaw horizontally. The positive directions are clockwise for yaw, pull up for the pitch, and roll right. 

Roll and pitch angles are zero when the hub rests flat on the battery. The zero positions for roll and pitch are irrespective of the hub’s position when you power it on. There is no way to reset pitch and roll zero points.
Yaw is different. The hub sets it to 0 when it powers up. You can also reset yaw yourself. Use this command:
import hub# Set yaw to zero
hub.motion.reset_yaw()# Set yaw to a certain angle
hub.motion.preset_yaw(25)
Angle positions for roll, pitch, and yaw are clamped between -179 and 179. The hub never reports 180 or -180! So there is a 2-degree measurement gap somewhere.
I use the gyro rate in my swinging monkey models if you’re interested in a real-world application. The models come with a well documented Python script and a Scratch/World Block program.
Swinging Monkey – Robot Swing with 51515
€7.50
5.00 out of 5
Add to cart

SPIKE Prime Swing Monkey Building Instructions – PDF Download
€10.00
4.80 out of 5
Add to cart

Python gestures in the SPIKE or MINDSTORMS hub
The hub recognizes five gestures. They are DOUBLETAPPED, FREEFALL, NONE, SHAKE, and TAPPED. This is how you check if any of these motions have occurred recently. You can also get the gestures via a callback. The fun thing with the callback is that it reports orientation changes too! So you will know if the hub is picked up, or has fallen over.
import hub# Check for any new motions since you last checked.if hub.motion.was_gesture(hub.motion.DOUBLETAPPED):
     print("Someone tapped me twice!") import hub# define methoddef my_method(args):
     print(args)# attach it as callback. 
hub.motion.callback(my_method)# If you tilt or tap the hub, it will now print orientations and gestures as soon as they happen."""
 leftside
doubletapped
 back
 up
 rightside
 front
 left side
tapped
 back
 down
 back
 left side
 back
 up
 rightside
"""
Accessing the accelerometer with Python in the LEGO hub
An accelerometer measures acceleration. Really! It measures acceleration in three directions. This measurement is useful, even if your robot isn’t moving because the earth’s gravity field also creates an acceleration. If it wouldn’t, your hub would fly off horizontally into space, while you would rotate away with the earth.
Long story short, the accelerometer tells you which direction is down. It’s what your phone uses to auto-rotate the display. Since it measures acceleration, the hub has to lay perfectly still to know precisely where down is.
The SI unit of acceleration is m/s2. That’s the change in velocity per second. In smart devices like LEGO hubs, accelerometers are mostly used to detect where ‘down’ is. That’s why this sensor reports its values in milli-g. That is 1000th of the field of gravity. On average, the field of gravity is 9,81m/s2 on earth. If the hub is flat on its battery, the accelerometer will report (0, 1000, 0). That’s one full g in the ‘down’ direction. If you lay it on its display, it will report (0, -1000, 0)
There are three ways to get accelerometer values:
import hub# Stabilized, filtered values
left_right, down_up, front_back = hub.motion.accelerometer_filter()# Jittery, raw values
left_right, down_up, front_back = hub.motion.accelerometer() # Just the orientation
orientation = hub.motion.orientation()# Returns a string from this list: ['up', 'down', 'leftside', 'rightside', 'front', 'back']# These strings are also available as Enums# e.g. hub.motion.UP == 'up'
If the gravity field is at the left, down, or front side of the brick, you get positive numbers.
The LEGO hub 5×5 display with Python matrices
The standard method of accessing the display in python involves setting the brightness of each separate pixel. Luckily the hub objects provide a better alternative. You can access the display with the show() method. The show method takes either a string or a hub.display.Image as argument.
If you pass a string, it shows all characters in the string with a half-second delay or so. You can also generate and pass images with the Image object. The Image object is not a PIL-like image. It is more like a string with 25 numbers and some semicolons.
The callback returns 0 when the show() or pixel() methods have finished. It is handy if you want to wait until a complete string has been displayed.
You can also rotate the display with the rotation() method. The rotation method takes multiples of 90 as an argument. The argument can be a negative number too. The rotation is relative, so you have to keep track of how you turned the display. It’s a little annoying that you can’t reset the rotation with rotation(0).
You can paint individual pixels with the pixel() method. That method takes three arguments: x,y, and brightness. The brightness is a number between 0 and 9. You can use higher numbers, but the pixel doesn’t get any brighter. At the time of writing there is a bug where calling the pixel() method right after a rotation(), your screen
Some example display scripts.
# Create an image
H = 9
_ = 0

smiley = [
    [_,H,_,H,_],
    [_,H,_,H,_],
    [_,_,_,_,_],
    [H,_,_,_,H],
    [_,H,H,H,_],]def matrix_to_image(matrix):
    # Convert an n x m matrix to a hub Image with semicolons
    # E.g.  '09090:09090:00000:90009:09990' 
    # With nested list comprehensions. Why? Because I can. :P
    return hub.Image(":".join(["".join([str(n) for n in r]) for r in matrix]))

smiley_img = matrix_to_image(smiley)

hub.display.show(smiley_img)# Rotate the display upside down
hub.display.rotation(-90) 
hub.display.rotation(-90) # Paint the topleft pixel white
hub.display.pixel(0, 0, 9) # oops! Another rotation. Watch out here. This seems bugged.# Add a callback
hub.display.callback(lambda x:print(x)) # Show some text
hub.display.show("Hello from Anton's Mindstorms")# This also prints a 0 in the console if you added the callback above.# The callback is handy if you want to know when the display is finally done.
Status reports in the SPIKE or MINDSTORMS hub
The hub has two thermometers, one on the mainboard, one on the battery. Sadly non of them measures room temperature. They are usually 2-3 degrees hotter than the room. 
import hub# The temperature sensors return a float. 
temp1 = hub.battery.temperature()
temp2 = hub.temperature()
 #The hub returns a full status with 
status = hub.status()# It returns a dictionary like this:
status = {'gyroscope': (3, 6, -3), 
    'position': (-16, 60, 0), 
    'accelerometer': (-887, -4, 501), 
    'port': {'C': [0, 0, 172, 0], 'D': [0, 0, -172, 0], 'B': [None], 'E': [0, 0, -116, 0], 'A': [20, 4, 63, 120, 129], 'F': [0, 0, 36, 0]}, 
    'display': '09000:09900:09990:09900:09000'} # hub.supervision.info() returns a dictionary like this:
result = {
    'continous_current_too_high': False, 
    'peek_current_too_high': False, 
    'temperature_too_high': False, 
    'continuous_current': 148, 
    'temperature_way_too_high': False} 
The SPIKE and MINDSTORMS hubs also monitor their electrical loads. This prevents them from bursting into flames or draining the battery with a blocked motor. 
Battery status in Python
I haven’t fully researched all battery methods. So far I haven’t had the need for it. The battery has these constants:
BATTERY_BAD_BATTERY
BATTERY_HUB_TEMPERATURE_CRITICAL_OUT_OF_RANGE BATTERY_NO_ERROR
BATTERY_TEMPERATURE_OUT_OF_RANGE
BATTERY_TEMPERATURE_SENSOR_FAIL
BATTERY_VOLTAGE_TOO_LOW    
CHARGER_STATE_CHARGING_COMPLETED
CHARGER_STATE_CHARGING_ONGOING CHARGER_STATE_DISCHARGING
CHARGER_STATE_FAIL
USB_CH_PORT_CDP
USB_CH_PORT_DCP
USB_CH_PORT_NONE
USB_CH_PORT_SDP
… and these methods:
capacity_left()
charger_detect()
current() # in mAh, 152 is about idle.
info()
temperature()
voltage()
Onboard Sound in the LEGO SPIKE and MINDSTORMS hubs
You can play sound files on the hub. There’s no need to be connected to a smart device. The speaker is very weak, though, and you won’t hear much. 
You can find the sound files on the hub like this:
import hubimport uos

list_of_sounds = uos.listdir("/sounds")
 # This returns a list like this. These are the available sounds at the time of writing.
 # ['menu_click', 'menu_fastback', 'menu_program_start', 'menu_program_stop', 'menu_shutdown', 'startup']
 # Now play a sound like this:
hub.sound.play("/sounds/startup")
hub.sound.play(list_of_sounds[0])# You can also generate sound with a wave and frequency. 
frequency = 400
duration_ms = 1000
waveform = hub.sound.SOUND_SIN# The waveforms options are SOUND_SAWTOOTH, SOUND_SIN SOUND_SQUARE, SOUND_TRIANGLE

hub.sound.beep(frequency, duration_ms, waveform) 
Finally, there’s a callback function. I believe it reports when a sound is done playing, but I haven’t verified that.
The MINDSTORMS and SPIKE sound files have 16bit signed integers, but use only 12 bits positive numbers. The minimum value is 0, the max value is 4096. So I ‘amplify’ 0.0625% from +/-32768. Then adjust for the middle (2048) with a dc offset of 0.0625% from max amplitude.
I use sox to convert Wav files to files the hub can read. I then use Spiketools to transfer them. David Gilday has written a nifty way to transfer files with ubinascii. Check his PrimeCuber code to find out how.
sox shake.wav --bits 16 --channels 1 --encoding signed-integer --endian little --rate 16000 shake.raw vol 0.0625 dcshift 0.0625 fade h 0.05 -0.05
Buttons in Python on the LEGO SPIKE or MINDSTORMS hub
The hub has four buttons, called center, connect, left, and right. Each of them has five methods: callback(), is_pressed(), on_change(), presses(), was_pressed(). The methods act pretty much as advertised. The callback function here is notable because it calls your function with the time for which the button was pressed. 
import hub# Define callback in a lambda function
hub.button.left.callback(lambda time_ms: print(time_ms))# Result# 0 <- at press# 3860 <-at release, time pressed in ms 
Strangely enough, the led behind the main button is not accessible via the button property, but rather directly via hub.led. I used this to turn the led off for my POV clock.
# Hack access to button led
OFF = 0
PINK = 1
PURPLE = 2
BLUE = 3
TEAL = 4
GREEN = 5
LIME = 6
YELLOW = 7
ORANGE = 8
RED = 9
WHITE = 10
GREY = 11

hub.led(OFF)
Motors in the SPIKE and MINDSTORMS hub
The hub has a motor object on each port. If there is really a motor connected, you can use the motor methods as documented here.
The result of the get() method depends on the mode() of the motor. The default mode is [(1,0), (2,2), (3,1), (0,0)]. I assume the first number in each tuple stands for the value (speed, pwm etc) and the second number for the format. However changing the format of the speed reading didn’t change the result for me. I tried modes (1,0), (1,1) and (1,2) and they all returned the same number. I was hoping for a way to read the speed in degrees per second instead of percent.
I use a factor 9.3 to convert from the reported speed reading to degrees per second. It’s not super accurate, but it works most of the time.
The preset() method is named rather weirdly. But it IS very handy! It sets the relative degrees (degrees counted) to a certain number. I use it to make sure that degrees counted has the same zero point as the absolute degrees. See the example code below.
The default() method returns a dictionary with motor settings. I guess you can pass a similar dictionary too. I suspect not all settings are used in the actual motor contol.
import hub# Use hub.port.[letter]# For instance, hub.port.E.motor.get() wil get you the motor state on port E

speed, relative_degrees, absolute_degrees, pwm = hub.port.A.motor.get() 

hub.port.A.motor.default()# Returns this:# {'pid': (0, 0, 0), 'max_power': 0, 'speed': 0, 'stall': True, # 'deceleration': 150, 'stop': 1, 'callback': None, 'acceleration': 100} # Reset relative zero like this
motor = hub.port.A.motor
absolute_position = motor.get()[2]if absolute_position > 180:
    absolute_position -= 360
motor.preset(absolute_position)# Print motor speed in different formats every second
hub.port.A.motor.mode([(1,0),(1,1),(1,2)])

hub.port.A.pwm(50)while True:
    print(hub.port.C.motor.get())
    wait_for_seconds(1)
These are the motor constants:
BUSY_MODE
BUSY_MOTOR
EVENT_COMPLETED
EVENT_INTERRUPTED
FORMAT_PCT
FORMAT_RAW
FORMAT_SI
PID_POSITION
PID_SPEED
STOP_BRAKE
STOP_FLOAT
STOP_HOLD
These are the motor methods:
brake()
busy()
callback()
default()
float()
hold()
mode()
pair()
pid()
preset()
pwm()
run_at_speed()
run_for_degrees()
run_for_time()
run_to_position()
Ultrasonic distance and LEDs with the hub.port object in Python
If you just want a sensor reading on a certain port, you can use the get() method on the device object. It returns a list, so you have to unpack it with the zeroth item using [0]. Here’s an example.
Using mode(5) you can control the leds on sensors that have them. Currently, that is the Distance sensor and the Color Sensor.
Control ultrasonic sensor leds in Python
import hub

dist_sensor = hub.port.C.device# Turn on the left eye. Left is from your perspective, not the robot's
top_left = 9 #brightness in range 0...9
top_right = 0 
bottom_left = 9 
bottom_right = 0 
dist_sensor.mode(5, bytes([top_left, top_right, bottom_left, bottom_right]))try:
    from mindstorms.control import wait_for_secondsexcept:
    from spike.control import wait_for_secondsdef distance():
    # Get a distance reading in cm
    wait_for_seconds(0.05) # This is an async wait that gives the sensor som e time to get values. You need this in a closed loop.
    distance = dist_sensor.get()[0]
    if distance:
        return distance
    else:
        return 200print("Distance is ",distance())
Wait, there’s more advanced Python you can access!
The hub runs a version of Micropython. This means that you can import most of these libraries for your advanced programming needs!
cmath – mathematical functions for complex numbers
gc – control the garbage collector
math – mathematical functions
uarray – arrays of numeric data
ubinascii – binary/ASCII conversions
ucollections – collection and container types
uerrno – system error codes
uhashlib – hashing algorithms
uheapq – heap queue algorithm
uio – input/output streams
ujson – JSON encoding and decoding
uos – basic “operating system” services
ure – simple regular expressions
uselect – wait for events on a set of streams
usocket – socket module
ussl – SSL/TLS module
ustruct – pack and unpack primitive data types
usys – system specific functions
utime – time related functions
uzlib – zlib decompression
Exiting your Python script when it ends
Currently, Python scripts never end when you run them on the hub, even if you reach the end of the script. The only way to return to the program menu is to press the big button. I found this annoying and confusing. That’s why I end most of my scripts with a raise statement. This forces the script to stop and exit.
raise SystemExit
Try… and finally
If you enjoyed this article, please contribute your findings and questions in the comments below. You could also follow me on Facebook or Instagram to keep up to date with my latest findings. Please don’t ask debugging questions.

here is our new code:

const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const MathUtil = require('../../util/math-util');
const RateLimiter = require('../../util/rateLimiter.js');

const setupTranslations = require('./lib/setup-translations');

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAASKG51AAAEUUlEQVR4Ae2cTWgTURDHZxORatUeFLUeqtaThSDFHopQ1HoQhB4LigjWq3pTEbUXK+LHUb2qICrYkwiCF7UUpYdq0UA9iFVbaFXqoWq1CMm6/022SZNsnsmb3X2kM7Dp5s17k5lf5r15KewjEhECQkAICAEhIASEgBBYjAQs7qB7r9zvoLR90rbtNsd2I7f9Ku1NWZY1TDHrat+pA4NV2ig5jBVg76W7Z2yyLpBts9ot6XkVjY5TabKot+/0wYtVDC85hC1QN/NS6efxeDzW2ZGg1kQzraivK/mhYTf+mp2jkeQYPR1MUiqVSlM8tosrE2NswWDaErnwOtpbjIGH+PBFwid8sfARSwxX3GwAs2uem3lcznHbwayAeL5y2F/CYSRrwy0YUU3b77NEt4aIkpMZbxIbiHraiVbX5yLM842tuHECzHka8h3gHe8n+jmX++CB90SvJ4iudS+EmOvBc8c2hXncqc4KMg/w2pqIbh/KXLhHG3RBSk0A9KbtsZ2ZbMO0xT3E02Xe8b/WBEB+LP9vsSYAomBArg8QYT3EhXuIp8u843+tiSKCaouCMTxOdPhODtJKZx8PXZBSEwCx5qHaqrYxQYCsCYAAA4gn9gSBqLzNmlgDy4cYrFYAavKNfgqPFvxDqMX5uV9OKu1fzhaDTjJQE6IAFICaBDSHR78Gqta8wgAr7V84nvm9TGFNoOFloF/1DLpdE5BquGSgipBCLwAVgFRqAagipNCHtwb6Vc+g2xUAdNWSgZoEw8vAoKutn31NQKrhkoEqQgq9AFQAUqkFoIqQQh/eGhh0tfWzrwCgq5YM1CQYXgb6OepXPStt97MfcLtkoCZgASgANQloDo9+DfSrnpW2a4KodrhM4WrJZcdFn4F+AfhVYb/+EbVLBmqCF4ACUJOA5nBz10C/KqwZMPdwmcKaRAWgANQkoDncyDXw1ZsPhOvb9Iwb3to1DbR92xb30oyXfbhRAPFYav+jlzT26cuCQCcmpwnX23efqbtrh1FPghoF0IPXsGo57d3dSpub1rkgP45/pSfPRlyw6NOzv3MB4CjfGFNEMGWReYB39Mg+Smzd6GYanrDEPdqgQx/0NUWMAggoyLxldUuL+KANOogALMJD8wXDm7YlusxPaa+4lOoTdpsxGRh24FyfZwxAbFUgKBh+4um8vn79wmw3BiD2eRBU2z9zf4sYoA06iNe3qFMEDUYBbN60nmZ+/KYbNx9T0tnzYV+IC/dogw59TAJo1D4Qm2RvL/jg4YuifAI89DFJOAFOOYE1ImPyTseoKFaMwyYZ2xRcXrXl+ikH37ICX1mEDSDOpnLOY+nCCUE45EZHgvrdC98g7jlaOg7mjeVbA52DvZzHBtM4XmlwaNRdu/I+J9JbZB58gm/wEYeQcTlU8Kikntlzl++dtdL2efd4JT1TgYx24Zl6+JgX8WI7/s6LW/4KASEgBISAEBACQkAILC4C/wDBL1fytvgQdgAAAABJRU5ErkJggg==';

let formatMessage = require('format-message');
let extensionURL = 'https://bricklife.com/scratch-gui/xcratch/spikeprime.mjs';

const BTSendRateMax = 40;

// SPIKE Prime JSON-RPC Protocol BLE UUIDs
const SPIKE_SERVICE_UUID = '0000fd02-0000-1000-8000-00805f9b34fb';
const RX_CHAR_UUID = '0000fd02-0001-1000-8000-00805f9b34fb';
const TX_CHAR_UUID = '0000fd02-0002-1000-8000-00805f9b34fb';

const SpikePorts = ['A', 'B', 'C', 'D', 'E', 'F'];

const SpikeMotorStopMode = {
    float: 0,
    brake: 1,
    hold: 2
};

const SpikeOrientation = {
    top: 0,
    front: 1,
    right: 2,
    bottom: 3,
    back: 4,
    left: 5
};

// LWP3 Protocol constants
const MAX_BLOCK_SIZE = 84;
const COBS_CODE_OFFSET = 2;
const NO_DELIMITER = 0xFF;
const DELIMITER = 0x02;
const XOR_MASK = 0x03;

// Message types
const MessageType = {
    INFO_REQUEST: 0x00,
    INFO_RESPONSE: 0x01,
    START_FILE_UPLOAD_REQUEST: 0x0C,
    START_FILE_UPLOAD_RESPONSE: 0x0D,
    TRANSFER_CHUNK_REQUEST: 0x10,
    TRANSFER_CHUNK_RESPONSE: 0x11,
    PROGRAM_FLOW_REQUEST: 0x1E,
    PROGRAM_FLOW_RESPONSE: 0x1F,
    PROGRAM_FLOW_NOTIFICATION: 0x20,
    CONSOLE_NOTIFICATION: 0x21,
    DEVICE_NOTIFICATION_REQUEST: 0x28,
    DEVICE_NOTIFICATION_RESPONSE: 0x29,
    TUNNEL_MESSAGE: 0x32,
    DEVICE_NOTIFICATION: 0x3C
};

const ProgramAction = {
    START: 0x00,
    STOP: 0x01
};

// Device message types
const DeviceMessageType = {
    BATTERY: 0x00,
    IMU_VALUES: 0x01,
    MATRIX_DISPLAY: 0x02,
    MOTOR: 0x0A,
    FORCE_SENSOR: 0x0B,
    COLOR_SENSOR: 0x0C,
    DISTANCE_SENSOR: 0x0D,
    COLOR_MATRIX: 0x0E
};

// Motor stop modes for Python commands
const MotorStopModeStrings = {
    0: 'coast',
    1: 'brake',
    2: 'hold'
};

// Color constants for sensors
const ColorValues = {
    black: 0, magenta: 1, purple: 2, blue: 3, azure: 4, turquoise: 5,
    green: 6, yellow: 7, orange: 8, red: 9, white: 10, none: -1
};

// Built-in sounds available on SPIKE Prime
const BuiltInSounds = [
    'Startup', 'Click', 'Fastback', 'Program Start', 'Program Stop', 
    'Shutdown', 'Error', 'Scanning', 'Brick Program Start', 'Brick Program Stop'
];

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
        this._speed = MathUtil.clamp(value, -100, 100);
    }

    get stopMode() {
        return this._stopMode;
    }

    set stopMode(value) {
        if (value < 0 || value > 2) return;
        this._stopMode = value;
    }

    get stallDetection() {
        return this._stallDetection;
    }

    set stallDetection(value) {
        this._stallDetection = value;
    }
}

class LWP3Protocol {
    constructor() {
        this.highPriorityBuffer = [];
        this.lowPriorityBuffer = [];
        this.currentPriority = null;
    }

    encode(data) {
        const buffer = [];
        let codeIndex = 0;
        let block = 0;

        const beginBlock = () => {
            codeIndex = buffer.length;
            buffer.push(NO_DELIMITER);
            block = 1;
        };

        beginBlock();

        for (let i = 0; i < data.length; i++) {
            const byte = data[i];
            
            if (byte > DELIMITER) {
                buffer.push(byte);
                block++;
            }

            if (byte <= DELIMITER || block > MAX_BLOCK_SIZE) {
                if (byte <= DELIMITER) {
                    const delimiterBase = byte * MAX_BLOCK_SIZE;
                    const blockOffset = block + COBS_CODE_OFFSET;
                    buffer[codeIndex] = delimiterBase + blockOffset;
                }
                beginBlock();
            }
        }

        buffer[codeIndex] = block + COBS_CODE_OFFSET;
        return new Uint8Array(buffer);
    }

    decode(data) {
        const buffer = [];
        
        const unescape = (code) => {
            if (code === 0xFF) {
                return [null, MAX_BLOCK_SIZE + 1];
            }
            const temp = code - COBS_CODE_OFFSET;
            let value = Math.floor(temp / MAX_BLOCK_SIZE);
            let block = temp % MAX_BLOCK_SIZE;
            
            if (block === 0) {
                block = MAX_BLOCK_SIZE;
                value -= 1;
            }
            return [value, block];
        };

        let [value, block] = unescape(data[0]);
        
        for (let i = 1; i < data.length; i++) {
            block--;
            if (block > 0) {
                buffer.push(data[i]);
                continue;
            }
            
            if (value !== null) {
                buffer.push(value);
            }
            
            [value, block] = unescape(data[i]);
        }
        
        return new Uint8Array(buffer);
    }

    pack(data) {
        const encoded = this.encode(data);
        const xored = new Uint8Array(encoded.length + 1);
        
        for (let i = 0; i < encoded.length; i++) {
            xored[i] = encoded[i] ^ XOR_MASK;
        }
        
        xored[xored.length - 1] = DELIMITER;
        
        return xored;
    }

    unpack(frame) {
        let start = 0;
        if (frame[0] === 0x01) {
            start = 1;
        }
        
        const unframed = new Uint8Array(frame.length - start - 1);
        for (let i = start; i < frame.length - 1; i++) {
            unframed[i - start] = frame[i] ^ XOR_MASK;
        }
        
        return this.decode(unframed);
    }

    processIncomingData(data) {
        const messages = [];
        
        for (const byte of data) {
            if (byte === 0x01) {
                if (this.currentPriority === 'high') {
                    this.highPriorityBuffer = [];
                }
                this.currentPriority = 'high';
                this.highPriorityBuffer = [];
            } else if (byte === 0x02) {
                let buffer;
                if (this.currentPriority === 'high') {
                    buffer = this.highPriorityBuffer;
                    this.highPriorityBuffer = [];
                    this.currentPriority = 'low';
                } else {
                    buffer = this.lowPriorityBuffer;
                    this.lowPriorityBuffer = [];
                }
                
                if (buffer.length > 0) {
                    buffer.push(byte);
                    try {
                        const message = this.unpack(new Uint8Array(buffer));
                        messages.push(message);
                    } catch (e) {
                        console.warn('Failed to unpack message:', e);
                    }
                }
            } else {
                if (this.currentPriority === 'high') {
                    this.highPriorityBuffer.push(byte);
                } else {
                    this.lowPriorityBuffer.push(byte);
                    this.currentPriority = 'low';
                }
            }
        }
        
        return messages;
    }
}

class MessageBuilder {
    static buildInfoRequest() {
        return new Uint8Array([MessageType.INFO_REQUEST]);
    }

    static buildProgramFlowRequest(action, slot = 0) {
        return new Uint8Array([
            MessageType.PROGRAM_FLOW_REQUEST,
            action,
            slot
        ]);
    }

    static buildDeviceNotificationRequest(interval) {
        const buffer = new ArrayBuffer(3);
        const view = new DataView(buffer);
        view.setUint8(0, MessageType.DEVICE_NOTIFICATION_REQUEST);
        view.setUint16(1, interval, true);
        return new Uint8Array(buffer);
    }

    static buildTunnelMessage(pythonCode) {
        const encoder = new TextEncoder();
        const payload = encoder.encode(pythonCode);
        
        const buffer = new ArrayBuffer(3 + payload.length);
        const view = new DataView(buffer);
        view.setUint8(0, MessageType.TUNNEL_MESSAGE);
        view.setUint16(1, payload.length, true);
        
        const uint8View = new Uint8Array(buffer);
        uint8View.set(payload, 3);
        
        return uint8View;
    }
}

class SpikePrime {
    constructor(runtime, extensionId) {
        this._runtime = runtime;
        this._extensionId = extensionId;

        this._sensors = {
            buttons: {
                left: false,
                center: false,
                right: false
            },
            angle: {
                pitch: 0,
                roll: 0,
                yaw: 0
            },
            acceleration: {
                x: 0,
                y: 0,
                z: 0
            },
            gyro: {
                x: 0,
                y: 0,
                z: 0
            },
            orientation: SpikeOrientation.top,
            battery: 100,
            displayPixels: new Uint8Array(25),
            gestures: {
                tapped: false,
                doubletapped: false,
                shake: false,
                freefall: false
            }
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

        this._protocol = new LWP3Protocol();
        this._device = null;
        this._rxCharacteristic = null;
        this._txCharacteristic = null;
        this._hubInfo = null;
        this._connected = false;

        this._runtime.registerPeripheralExtension(extensionId, this);
        this._runtime.on('PROJECT_STOP_ALL', this.stopAll.bind(this));

        this._rateLimiter = new RateLimiter(BTSendRateMax);

        this.reset = this.reset.bind(this);
        this._onConnect = this._onConnect.bind(this);

        // Track last gesture check times for edge detection
        this._lastGestureCheck = {};
    }

    get angle() {
        return this._sensors.angle;
    }

    get orientation() {
        return this._sensors.orientation;
    }

    get portValues() {
        return this._portValues;
    }

    get pixelBrightness() {
        return this._pixelBrightness;
    }

    set pixelBrightness(value) {
        this._pixelBrightness = MathUtil.clamp(value, 0, 100);
    }

    get motorSettings() {
        return this._motorSettings;
    }

    stopAll() {
        this.stopAllMotors();
        this.stopSound();
    }

    stopSound() {
        const pythonCode = 'sound.stop()';
        const message = MessageBuilder.buildTunnelMessage(pythonCode);
        this.sendMessage(message);
    }

    stopAllMotors() {
        if (!this._connected) return;
        
        const pythonCode = 'motor.stop()';
        const message = MessageBuilder.buildTunnelMessage(pythonCode);
        this.sendMessage(message);
    }

    async scan() {
        try {
            const device = await navigator.bluetooth.requestDevice({
                filters: [{
                    services: [SPIKE_SERVICE_UUID]
                }]
            });
            
            this._device = device;
            device.addEventListener('gattserverdisconnected', () => {
                this.handleDisconnect();
            });
            
            return device.id;
        } catch (error) {
            console.error('Scan failed:', error);
            throw error;
        }
    }

    async connect(id) {
        try {
            if (!this._device) {
                throw new Error('No device found. Scan first.');
            }

            const server = await this._device.gatt.connect();
            const service = await server.getPrimaryService(SPIKE_SERVICE_UUID);
            
            this._rxCharacteristic = await service.getCharacteristic(RX_CHAR_UUID);
            this._txCharacteristic = await service.getCharacteristic(TX_CHAR_UUID);
            
            await this._txCharacteristic.startNotifications();
            this._txCharacteristic.addEventListener('characteristicvaluechanged', 
                this.handleNotification.bind(this));
            
            this._connected = true;
            this._onConnect();
            
        } catch (error) {
            console.error('Connection failed:', error);
            throw error;
        }
    }

    disconnect() {
        if (this._device && this._device.gatt.connected) {
            this._device.gatt.disconnect();
        }
        this.handleDisconnect();
    }

    handleDisconnect() {
        this._connected = false;
        this.reset();
    }

    reset() {
        this._sensors = {
            buttons: {
                left: false,
                center: false,
                right: false
            },
            angle: {
                pitch: 0,
                roll: 0,
                yaw: 0
            },
            acceleration: {
                x: 0,
                y: 0,
                z: 0
            },
            gyro: {
                x: 0,
                y: 0,
                z: 0
            },
            orientation: SpikeOrientation.top,
            battery: 100,
            displayPixels: new Uint8Array(25),
            gestures: {
                tapped: false,
                doubletapped: false,
                shake: false,
                freefall: false
            }
        };

        this._portValues = {};
        this._hubInfo = null;
        this._lastGestureCheck = {};
    }

    isConnected() {
        return this._connected && this._device && this._device.gatt.connected;
    }

    async sendMessage(message, useLimiter = true) {
        if (!this.isConnected()) return Promise.resolve();

        if (useLimiter) {
            if (!this._rateLimiter.okayToSend()) return Promise.resolve();
        }

        const frame = this._protocol.pack(message);
        
        const packetSize = this._hubInfo?.maxPacketSize || 20;
        
        for (let i = 0; i < frame.length; i += packetSize) {
            const chunk = frame.slice(i, Math.min(i + packetSize, frame.length));
            await this._rxCharacteristic.writeValueWithoutResponse(chunk);
        }
    }

    async sendPythonCommand(pythonCode) {
        const message = MessageBuilder.buildTunnelMessage(pythonCode);
        return this.sendMessage(message);
    }

    async _onConnect() {
        // Send info request
        const infoRequest = MessageBuilder.buildInfoRequest();
        await this.sendMessage(infoRequest, false);
        
        // Wait a bit for info response
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Enable device notifications (100ms interval)
        const notificationRequest = MessageBuilder.buildDeviceNotificationRequest(100);
        await this.sendMessage(notificationRequest, false);
    }

    handleNotification(event) {
        const data = new Uint8Array(event.target.value.buffer);
        const messages = this._protocol.processIncomingData(data);
        
        for (const message of messages) {
            this.processMessage(message);
        }
    }

    processMessage(data) {
        if (data.length === 0) return;
        
        const messageType = data[0];
        
        switch (messageType) {
            case MessageType.INFO_RESPONSE:
                this.parseInfoResponse(data);
                break;
            case MessageType.CONSOLE_NOTIFICATION:
                this.handleConsoleNotification(data);
                break;
            case MessageType.DEVICE_NOTIFICATION:
                this.handleDeviceNotification(data);
                break;
            case MessageType.PROGRAM_FLOW_NOTIFICATION:
                this.handleProgramFlowNotification(data);
                break;
        }
    }

    parseInfoResponse(data) {
        const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        this._hubInfo = {
            rpcVersionMajor: view.getUint8(1),
            rpcVersionMinor: view.getUint8(2),
            rpcBuildNumber: view.getUint16(3, true),
            firmwareVersionMajor: view.getUint8(5),
            firmwareVersionMinor: view.getUint8(6),
            firmwareBuildNumber: view.getUint16(7, true),
            maxPacketSize: view.getUint16(9, true),
            maxMessageSize: view.getUint16(11, true),
            maxChunkSize: view.getUint16(13, true),
            productType: view.getUint16(15, true)
        };
        console.log('Hub info:', this._hubInfo);
    }

    handleConsoleNotification(data) {
        const decoder = new TextDecoder();
        const text = decoder.decode(data.slice(1));
        console.log('SPIKE Console:', text);
    }

    handleDeviceNotification(data) {
        const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        
        if (data.length < 3) {
            console.warn('Device notification too short');
            return;
        }
        
        const payloadSize = view.getUint16(1, true);
        const maxOffset = Math.min(3 + payloadSize, data.length);
        
        let offset = 3;
        while (offset < maxOffset) {
            if (offset >= data.length) break;
            
            const deviceType = view.getUint8(offset);
            offset++;
            
            try {
                switch (deviceType) {
                    case DeviceMessageType.BATTERY:
                        if (offset + 1 <= data.length) {
                            this._sensors.battery = view.getUint8(offset);
                            offset += 1;
                        }
                        break;
                        
                    case DeviceMessageType.IMU_VALUES:
                        if (offset + 20 <= data.length) {
                            const upFace = view.getUint8(offset);
                            const yawFace = view.getUint8(offset + 1);
                            const yaw = view.getInt16(offset + 2, true);
                            const pitch = view.getInt16(offset + 4, true);
                            const roll = view.getInt16(offset + 6, true);
                            const accelX = view.getInt16(offset + 8, true);
                            const accelY = view.getInt16(offset + 10, true);
                            const accelZ = view.getInt16(offset + 12, true);
                            const gyroX = view.getInt16(offset + 14, true);
                            const gyroY = view.getInt16(offset + 16, true);
                            const gyroZ = view.getInt16(offset + 18, true);
                            
                            this._sensors.orientation = upFace;
                            this._sensors.angle = { yaw, pitch, roll };
                            this._sensors.acceleration = { x: accelX, y: accelY, z: accelZ };
                            this._sensors.gyro = { x: gyroX, y: gyroY, z: gyroZ };
                            
                            // Gesture detection based on sensor values
                            this.detectGestures(accelX, accelY, accelZ, gyroX, gyroY, gyroZ);
                            
                            offset += 20;
                        }
                        break;
                        
                    case DeviceMessageType.MATRIX_DISPLAY:
                        if (offset + 25 <= data.length) {
                            for (let i = 0; i < 25; i++) {
                                this._sensors.displayPixels[i] = view.getUint8(offset + i);
                            }
                            offset += 25;
                        }
                        break;
                        
                    case DeviceMessageType.MOTOR:
                        if (offset + 11 <= data.length) {
                            const motorPort = view.getUint8(offset);
                            if (motorPort < SpikePorts.length) {
                                const port = SpikePorts[motorPort];
                                const motorType = view.getUint8(offset + 1);
                                const absolutePos = view.getInt16(offset + 2, true);
                                const power = view.getInt16(offset + 4, true);
                                const speed = view.getInt8(offset + 6);
                                const position = view.getInt32(offset + 7, true);
                                
                                this._portValues[port] = {
                                    type: 'motor',
                                    motorType: motorType,
                                    speed: speed,
                                    power: power,
                                    absolutePosition: absolutePos,
                                    position: position
                                };
                            }
                            offset += 11;
                        }
                        break;
                        
                    case DeviceMessageType.FORCE_SENSOR:
                        if (offset + 3 <= data.length) {
                            const forcePort = view.getUint8(offset);
                            if (forcePort < SpikePorts.length) {
                                const port = SpikePorts[forcePort];
                                const force = view.getUint8(offset + 1);
                                const pressed = view.getUint8(offset + 2);
                                
                                this._portValues[port] = {
                                    type: 'force',
                                    force: force,
                                    pressed: pressed === 0x01
                                };
                            }
                            offset += 3;
                        }
                        break;
                        
                    case DeviceMessageType.COLOR_SENSOR:
                        if (offset + 8 <= data.length) {
                            const colorPort = view.getUint8(offset);
                            if (colorPort < SpikePorts.length) {
                                const port = SpikePorts[colorPort];
                                const color = view.getInt8(offset + 1);
                                const red = view.getUint16(offset + 2, true);
                                const green = view.getUint16(offset + 4, true);
                                const blue = view.getUint16(offset + 6, true);
                                
                                this._portValues[port] = {
                                    type: 'color',
                                    color: color,
                                    rgb: { r: red, g: green, b: blue },
                                    reflection: Math.round((red + green + blue) / 30.72), // Approximate reflection
                                    ambient: Math.round(Math.max(red, green, blue) / 10.24) // Approximate ambient
                                };
                            }
                            offset += 8;
                        }
                        break;
                        
                    case DeviceMessageType.DISTANCE_SENSOR:
                        if (offset + 3 <= data.length) {
                            const distancePort = view.getUint8(offset);
                            if (distancePort < SpikePorts.length) {
                                const port = SpikePorts[distancePort];
                                const distance = view.getInt16(offset + 1, true);
                                
                                this._portValues[port] = {
                                    type: 'distance',
                                    distance: distance
                                };
                            }
                            offset += 3;
                        }
                        break;
                        
                    case DeviceMessageType.COLOR_MATRIX:
                        if (offset + 10 <= data.length) {
                            const matrixPort = view.getUint8(offset);
                            if (matrixPort < SpikePorts.length) {
                                const port = SpikePorts[matrixPort];
                                const matrixPixels = new Uint8Array(9);
                                for (let i = 0; i < 9; i++) {
                                    matrixPixels[i] = view.getUint8(offset + 1 + i);
                                }
                                
                                this._portValues[port] = {
                                    type: 'colorMatrix',
                                    pixels: matrixPixels
                                };
                            }
                            offset += 10;
                        }
                        break;
                        
                    default:
                        console.warn('Unknown device type:', deviceType);
                        return;
                }
            } catch (e) {
                console.warn('Error parsing device notification:', e);
                return;
            }
        }
    }

    detectGestures(accelX, accelY, accelZ, gyroX, gyroY, gyroZ) {
        const now = Date.now();
        
        // Reset previous gestures
        Object.keys(this._sensors.gestures).forEach(gesture => {
            this._sensors.gestures[gesture] = false;
        });
        
        // Tap detection - sudden acceleration spike
        const accelMagnitude = Math.sqrt(accelX * accelX + accelY * accelY + accelZ * accelZ);
        if (accelMagnitude > 2000) { // Threshold for tap
            this._sensors.gestures.tapped = true;
            
            // Double tap detection
            if (this._lastGestureCheck.tapped && (now - this._lastGestureCheck.tapped) < 500) {
                this._sensors.gestures.doubletapped = true;
            }
            this._lastGestureCheck.tapped = now;
        }
        
        // Shake detection - high gyro activity
        const gyroMagnitude = Math.sqrt(gyroX * gyroX + gyroY * gyroY + gyroZ * gyroZ);
        if (gyroMagnitude > 1000) {
            this._sensors.gestures.shake = true;
        }
        
        // Freefall detection - very low acceleration
        if (accelMagnitude < 500) {
            this._sensors.gestures.freefall = true;
        }
    }

    handleProgramFlowNotification(data) {
        if (data.length >= 2) {
            const action = data[1];
            console.log('Program flow:', action === ProgramAction.START ? 'START' : 'STOP');
        }
    }
}

class Scratch3SpikePrimeBlocks {
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
        this.runtime = runtime;
        this._peripheral = new SpikePrime(this.runtime, Scratch3SpikePrimeBlocks.EXTENSION_ID);

        if (runtime.formatMessage) {
            formatMessage = runtime.formatMessage;
        }
    }

    getInfo() {
        setupTranslations(formatMessage);

        return {
            id: Scratch3SpikePrimeBlocks.EXTENSION_ID,
            name: 'SPIKE Prime Advanced',
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: [
                // === MOTOR CONTROL ===
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
                            menu: 'PORT',
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
                    opcode: 'motorGoDirectionToPosition',
                    text: formatMessage({
                        id: 'legobluetooth.motorGoDirectionToPosition',
                        default: '[PORT] go [DIRECTION] to position [POSITION]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'POSITION_DIRECTION',
                            defaultValue: 'shortest'
                        },
                        POSITION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
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
                            menu: 'PORT',
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
                            menu: 'PORT',
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
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 75
                        }
                    }
                },
                {
                    opcode: 'motorSetStallDetection',
                    text: formatMessage({
                        id: 'legobluetooth.motorSetStallDetection',
                        default: '[PORT] set stall detection [ENABLE]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        ENABLE: {
                            type: ArgumentType.STRING,
                            menu: 'ENABLE_DISABLE',
                            defaultValue: 'enabled'
                        }
                    }
                },
                {
                    opcode: 'motorSetStopMode',
                    text: formatMessage({
                        id: 'legobluetooth.motorSetStopMode',
                        default: '[PORT] set stop mode to [MODE]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        MODE: {
                            type: ArgumentType.STRING,
                            menu: 'STOP_MODE',
                            defaultValue: 'brake'
                        }
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
                {
                    opcode: 'getSpeed',
                    text: formatMessage({
                        id: 'legobluetooth.getSpeed',
                        default: '[PORT] speed'
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
                {
                    opcode: 'resetPosition',
                    text: formatMessage({
                        id: 'legobluetooth.resetPosition',
                        default: 'reset [PORT] position to [POSITION]'
                    }),
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
                // === DISPLAY CONTROL ===
                {
                    opcode: 'displayText',
                    text: formatMessage({
                        id: 'legobluetooth.displayText',
                        default: 'show text [TEXT]'
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
                        default: 'show image [MATRIX]'
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
                    opcode: 'displayImageFor',
                    text: formatMessage({
                        id: 'legobluetooth.displayImageFor',
                        default: 'show image [MATRIX] for [DURATION] seconds'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        MATRIX: {
                            type: ArgumentType.MATRIX,
                            defaultValue: '1101111011000001000101110'
                        },
                        DURATION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    }
                },
                {
                    opcode: 'displayClear',
                    text: formatMessage({
                        id: 'legobluetooth.displayClear',
                        default: 'clear display'
                    }),
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'setPixel',
                    text: 'set pixel [X] [Y] to [BRIGHTNESS]%',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        BRIGHTNESS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    }
                },
                {
                    opcode: 'setPixelBrightness',
                    text: formatMessage({
                        id: 'legobluetooth.setPixelBrightness',
                        default: 'set pixel brightness to [BRIGHTNESS] %'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        BRIGHTNESS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    }
                },
                {
                    opcode: 'setCenterButtonColor',
                    text: formatMessage({
                        id: 'legobluetooth.setCenterButtonColor',
                        default: 'set center button to [COLOR]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        COLOR: {
                            type: ArgumentType.STRING,
                            menu: 'LED_COLOR',
                            defaultValue: 'green'
                        }
                    }
                },
                '---',
                // === SOUND ===
                {
                    opcode: 'playSound',
                    text: 'play sound [SOUND]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        SOUND: {
                            type: ArgumentType.STRING,
                            menu: 'SOUND',
                            defaultValue: 'Startup'
                        }
                    }
                },
                {
                    opcode: 'playBeep',
                    text: 'play beep [FREQUENCY] Hz for [DURATION] seconds',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        FREQUENCY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 440
                        },
                        DURATION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0.5
                        }
                    }
                },
                {
                    opcode: 'playNote',
                    text: 'play note [NOTE] for [DURATION] seconds',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NOTE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 60
                        },
                        DURATION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0.5
                        }
                    }
                },
                {
                    opcode: 'stopSound',
                    text: 'stop all sounds',
                    blockType: BlockType.COMMAND
                },
                '---',
                // === SENSORS ===
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
                    opcode: 'getAcceleration',
                    text: 'acceleration [AXIS]',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        AXIS: {
                            type: ArgumentType.STRING,
                            menu: 'AXIS',
                            defaultValue: 'x'
                        }
                    }
                },
                {
                    opcode: 'getGyro',
                    text: 'gyro [AXIS]',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        AXIS: {
                            type: ArgumentType.STRING,
                            menu: 'AXIS',
                            defaultValue: 'x'
                        }
                    }
                },
                {
                    opcode: 'getOrientation',
                    text: 'orientation',
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getBatteryLevel',
                    text: 'battery level',
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'resetYaw',
                    text: 'reset yaw angle to [ANGLE]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ANGLE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                '---',
                // === GESTURE DETECTION ===
                {
                    opcode: 'whenGesture',
                    blockType: BlockType.HAT,
                    text: formatMessage({
                        id: 'legobluetooth.whenGesture',
                        default: 'when hub [GESTURE]'
                    }),
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
                    text: formatMessage({
                        id: 'legobluetooth.isGesture',
                        default: 'hub [GESTURE]?'
                    }),
                    arguments: {
                        GESTURE: {
                            type: ArgumentType.STRING,
                            menu: 'GESTURE',
                            defaultValue: 'tapped'
                        }
                    }
                },
                '---',
                // === BUTTON DETECTION ===
                {
                    opcode: 'whenButtonPressed',
                    blockType: BlockType.HAT,
                    text: formatMessage({
                        id: 'legobluetooth.whenButtonPressed',
                        default: 'when [BUTTON] button pressed'
                    }),
                    arguments: {
                        BUTTON: {
                            type: ArgumentType.STRING,
                            menu: 'BUTTON',
                            defaultValue: 'center'
                        }
                    }
                },
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
                '---',
                // === DISTANCE SENSOR ===
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
                    opcode: 'whenDistanceCondition',
                    blockType: BlockType.HAT,
                    text: formatMessage({
                        id: 'legobluetooth.whenDistanceCondition',
                        default: 'when [PORT] distance [COMPARATOR] [DISTANCE] cm'
                    }),
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        COMPARATOR: {
                            type: ArgumentType.STRING,
                            menu: 'COMPARATOR',
                            defaultValue: '<'
                        },
                        DISTANCE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    }
                },
                {
                    opcode: 'setDistanceLights',
                    text: 'set [PORT] distance sensor lights [LIGHT1] [LIGHT2] [LIGHT3] [LIGHT4]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        LIGHT1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        },
                        LIGHT2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        },
                        LIGHT3: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        },
                        LIGHT4: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    }
                },
                '---',
                // === COLOR SENSOR ===
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
                    opcode: 'getColorReflection',
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
                    opcode: 'getColorAmbient',
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
                    opcode: 'whenColorDetected',
                    blockType: BlockType.HAT,
                    text: formatMessage({
                        id: 'legobluetooth.whenColorDetected',
                        default: 'when [PORT] detects [COLOR] color'
                    }),
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        COLOR: {
                            type: ArgumentType.STRING,
                            menu: 'COLOR',
                            defaultValue: 'red'
                        }
                    }
                },
                {
                    opcode: 'setColorLights',
                    text: 'set [PORT] color sensor brightness [BRIGHTNESS]%',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        BRIGHTNESS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    }
                },
                '---',
                // === FORCE SENSOR ===
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
                {
                    opcode: 'whenForceSensorPressed',
                    blockType: BlockType.HAT,
                    text: formatMessage({
                        id: 'legobluetooth.whenForceSensorPressed',
                        default: 'when [PORT] force sensor pressed'
                    }),
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        }
                    }
                },
                '---',
                // === 3x3 COLOR MATRIX ===
                {
                    opcode: 'setMatrix3x3Pixel',
                    text: 'set 3x3 matrix [PORT] pixel [X] [Y] to [COLOR] brightness [BRIGHTNESS]',
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
                            menu: 'MATRIX_COLOR',
                            defaultValue: 'red'
                        },
                        BRIGHTNESS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    }
                },
                {
                    opcode: 'setMatrix3x3All',
                    text: 'set all 3x3 matrix [PORT] to [COLOR] brightness [BRIGHTNESS]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            menu: 'PORT',
                            defaultValue: 'A'
                        },
                        COLOR: {
                            type: ArgumentType.STRING,
                            menu: 'MATRIX_COLOR',
                            defaultValue: 'blue'
                        },
                        BRIGHTNESS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    }
                },
                {
                    opcode: 'clearMatrix3x3',
                    text: 'clear 3x3 matrix [PORT]',
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
                // === ADVANCED PYTHON COMMANDS ===
                {
                    opcode: 'runPython',
                    text: 'run Python [CODE]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        CODE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'print("Hello from Python!")'
                        }
                    }
                }
            ],
            menus: {
                PORT: {
                    acceptReporters: true,
                    items: SpikePorts
                },
                MOTOR_UNIT: {
                    acceptReporters: false,
                    items: [
                        {
                            text: formatMessage({
                                id: 'legobluetooth.rotations',
                                default: 'rotations'
                            }),
                            value: 'rotations'
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.degrees',
                                default: 'degrees'
                            }),
                            value: 'degrees'
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.seconds',
                                default: 'seconds'
                            }),
                            value: 'seconds'
                        }
                    ]
                },
                POSITION_DIRECTION: {
                    acceptReporters: false,
                    items: [
                        {
                            text: formatMessage({
                                id: 'legobluetooth.shortestPath',
                                default: 'shortest path'
                            }),
                            value: 'shortest'
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.clockwise',
                                default: 'clockwise'
                            }),
                            value: 'clockwise'
                        },
                        {
                            text: formatMessage({
                                id: 'legobluetooth.counterclockwise',
                                default: 'counterclockwise'
                            }),
                            value: 'counterclockwise'
                        }
                    ]
                },
                AXIS: {
                    acceptReporters: false,
                    items: ['x', 'y', 'z', 'pitch', 'roll', 'yaw']
                },
                DIRECTION: {
                    acceptReporters: false,
                    items: [
                        {
                            text: '⬆︎',
                            value: '1'
                        },
                        {
                            text: '⬇',
                            value: '-1'
                        }
                    ]
                },
                BUTTON: {
                    acceptReporters: false,
                    items: ['left', 'center', 'right']
                },
                ENABLE_DISABLE: {
                    acceptReporters: false,
                    items: ['enabled', 'disabled']
                },
                STOP_MODE: {
                    acceptReporters: false,
                    items: ['coast', 'brake', 'hold']
                },
                SOUND: {
                    acceptReporters: false,
                    items: BuiltInSounds
                },
                GESTURE: {
                    acceptReporters: false,
                    items: ['tapped', 'doubletapped', 'shake', 'freefall']
                },
                COMPARATOR: {
                    acceptReporters: true,
                    items: ['<', '>']
                },
                COLOR: {
                    acceptReporters: false,
                    items: [
                        'black', 'magenta', 'purple', 'blue', 'azure', 'turquoise',
                        'green', 'yellow', 'orange', 'red', 'white'
                    ]
                },
                MATRIX_COLOR: {
                    acceptReporters: false,
                    items: [
                        'off', 'magenta', 'purple', 'blue', 'turquoise', 'mint',
                        'green', 'yellow', 'orange', 'red', 'white'
                    ]
                },
                LED_COLOR: {
                    acceptReporters: false,
                    items: [
                        'off', 'pink', 'purple', 'blue', 'teal', 'green',
                        'yellow', 'orange', 'red', 'white'
                    ]
                }
            }
        };
    }

    // === MOTOR CONTROL IMPLEMENTATIONS ===

    motorRunFor(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        const direction = Cast.toNumber(args.DIRECTION);
        const value = Cast.toNumber(args.VALUE);
        const unit = args.UNIT;
        
        const setting = this._peripheral.motorSettings[port];
        const speed = setting.speed * direction;
        const stopMode = MotorStopModeStrings[setting.stopMode];
        
        let pythonCode;
        switch (unit) {
            case 'rotations':
                pythonCode = `motor.run_for_degrees('${port}', ${Math.round(value * 360)}, ${speed}, stop='${stopMode}')`;
                break;
            case 'degrees':
                pythonCode = `motor.run_for_degrees('${port}', ${Math.round(value)}, ${speed}, stop='${stopMode}')`;
                break;
            case 'seconds':
                pythonCode = `motor.run_for_time('${port}', ${Math.round(value * 1000)}, ${speed}, stop='${stopMode}')`;
                break;
        }
        
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    motorGoDirectionToPosition(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        const direction = args.DIRECTION;
        const position = Math.round(Cast.toNumber(args.POSITION));
        
        const setting = this._peripheral.motorSettings[port];
        const stopMode = MotorStopModeStrings[setting.stopMode];
        
        const pythonCode = `motor.run_to_position('${port}', ${position}, ${setting.speed}, direction='${direction}', stop='${stopMode}')`;
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    motorStart(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        const direction = Cast.toNumber(args.DIRECTION);
        
        const setting = this._peripheral.motorSettings[port];
        const speed = setting.speed * direction;
        
        const pythonCode = `motor.run('${port}', ${speed})`;
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    motorStop(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        const setting = this._peripheral.motorSettings[port];
        const stopMode = MotorStopModeStrings[setting.stopMode];
        
        const pythonCode = `motor.stop('${port}', stop='${stopMode}')`;
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    motorSetSpeed(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        const speed = MathUtil.clamp(Cast.toNumber(args.SPEED), -100, 100);
        
        this._peripheral.motorSettings[port].speed = speed;
    }

    motorSetStallDetection(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        const enable = Cast.toString(args.ENABLE) === 'enabled';
        
        this._peripheral.motorSettings[port].stallDetection = enable;
    }

    motorSetStopMode(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        const mode = Cast.toString(args.MODE);
        
        const modeMap = { 'coast': 0, 'brake': 1, 'hold': 2 };
        this._peripheral.motorSettings[port].stopMode = modeMap[mode] || 1;
    }

    getPosition(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        const portData = this._peripheral.portValues[port];
        return portData?.absolutePosition ?? 0;
    }

    getSpeed(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        const portData = this._peripheral.portValues[port];
        return portData?.speed ?? 0;
    }

    resetPosition(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        const position = Math.round(Cast.toNumber(args.POSITION));
        
        const pythonCode = `motor.set_relative_position('${port}', ${position})`;
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    // === DISPLAY IMPLEMENTATIONS ===

    displayText(args) {
        const text = Cast.toString(args.TEXT).replace(/'/g, "\\'");
        const pythonCode = `light_matrix.write('${text}')`;
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    displayImage(args) {
        const matrix = Cast.toString(args.MATRIX);
        const brightness = Math.round(100 * this._peripheral.pixelBrightness / 100);
        
        const pixels = [];
        for (let i = 0; i < 25; i++) {
            const value = matrix[i] === '1' ? brightness : 0;
            pixels.push(value);
        }
        
        let pythonCode = 'import light_matrix\n';
        pythonCode += 'light_matrix.clear()\n';
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                const brightness = pixels[y * 5 + x];
                if (brightness > 0) {
                    pythonCode += `light_matrix.set_pixel(${x}, ${y}, ${brightness})\n`;
                }
            }
        }
        
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    displayImageFor(args) {
        const matrix = Cast.toString(args.MATRIX);
        const duration = Cast.toNumber(args.DURATION);
        
        return this.displayImage(args).then(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    this.displayClear().then(resolve);
                }, duration * 1000);
            });
        });
    }

    displayClear() {
        const pythonCode = 'light_matrix.clear()';
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    setPixel(args) {
        const x = MathUtil.clamp(Cast.toNumber(args.X) - 1, 0, 4);
        const y = MathUtil.clamp(Cast.toNumber(args.Y) - 1, 0, 4);
        const brightness = MathUtil.clamp(Cast.toNumber(args.BRIGHTNESS), 0, 100);
        
        const pythonCode = `light_matrix.set_pixel(${x}, ${y}, ${brightness})`;
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    setPixelBrightness(args) {
        const brightness = MathUtil.clamp(Cast.toNumber(args.BRIGHTNESS), 0, 100);
        this._peripheral.pixelBrightness = brightness;
    }

    setCenterButtonColor(args) {
        const color = Cast.toString(args.COLOR);
        const colorMap = {
            'off': 0, 'pink': 1, 'purple': 2, 'blue': 3, 'teal': 4,
            'green': 5, 'yellow': 6, 'orange': 7, 'red': 8, 'white': 9
        };
        const colorValue = colorMap[color] || 0;
        
        const pythonCode = `hub.led(${colorValue})`;
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    // === SOUND IMPLEMENTATIONS ===

    playSound(args) {
        const sound = Cast.toString(args.SOUND);
        const pythonCode = `sound.play('${sound}')`;
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    playBeep(args) {
        const frequency = Cast.toNumber(args.FREQUENCY);
        const duration = Cast.toNumber(args.DURATION);
        
        const pythonCode = `sound.beep(${Math.round(frequency)}, ${Math.round(duration * 1000)})`;
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    playNote(args) {
        const note = Cast.toNumber(args.NOTE);
        const duration = Cast.toNumber(args.DURATION);
        
        // Convert MIDI note to frequency
        const frequency = Math.pow(2, (note - 69) / 12) * 440;
        
        const pythonCode = `sound.beep(${Math.round(frequency)}, ${Math.round(duration * 1000)})`;
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    stopSound() {
        const pythonCode = 'sound.stop()';
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    // === SENSOR IMPLEMENTATIONS ===

    getAngle(args) {
        const axis = Cast.toString(args.AXIS);
        if (['pitch', 'roll', 'yaw'].includes(axis)) {
            return this._peripheral.angle[axis];
        }
        return 0;
    }

    getAcceleration(args) {
        const axis = Cast.toString(args.AXIS);
        if (['x', 'y', 'z'].includes(axis)) {
            return this._peripheral._sensors.acceleration[axis];
        }
        return 0;
    }

    getGyro(args) {
        const axis = Cast.toString(args.AXIS);
        if (['x', 'y', 'z'].includes(axis)) {
            return this._peripheral._sensors.gyro[axis];
        }
        return 0;
    }

    getOrientation() {
        const orientationNames = ['top', 'front', 'right', 'bottom', 'back', 'left'];
        return orientationNames[this._peripheral.orientation] || 'unknown';
    }

    getBatteryLevel() {
        return this._peripheral._sensors.battery;
    }

    resetYaw(args) {
        const angle = Cast.toNumber(args.ANGLE);
        const pythonCode = `hub.motion.yaw_pitch_roll(yaw=${angle})`;
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    // === GESTURE IMPLEMENTATIONS ===

    whenGesture(args) {
        return this.isGesture(args);
    }

    isGesture(args) {
        const gesture = Cast.toString(args.GESTURE);
        return this._peripheral._sensors.gestures[gesture] || false;
    }

    // === BUTTON IMPLEMENTATIONS ===

    whenButtonPressed(args) {
        return this.isButtonPressed(args);
    }

    isButtonPressed(args) {
        const button = Cast.toString(args.BUTTON);
        return this._peripheral._sensors.buttons[button] || false;
    }

    // === DISTANCE SENSOR IMPLEMENTATIONS ===

    getDistance(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        const portData = this._peripheral.portValues[port];
        if (portData?.type === 'distance') {
            return portData.distance === -1 ? 0 : Math.round(portData.distance / 10);
        }
        return 0;
    }

    whenDistanceCondition(args) {
        const distance = this.getDistance(args);
        const targetDistance = Cast.toNumber(args.DISTANCE);
        const comparator = Cast.toString(args.COMPARATOR);
        
        return comparator === '<' ? distance < targetDistance : distance > targetDistance;
    }

    setDistanceLights(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        const light1 = MathUtil.clamp(Cast.toNumber(args.LIGHT1), 0, 100);
        const light2 = MathUtil.clamp(Cast.toNumber(args.LIGHT2), 0, 100);
        const light3 = MathUtil.clamp(Cast.toNumber(args.LIGHT3), 0, 100);
        const light4 = MathUtil.clamp(Cast.toNumber(args.LIGHT4), 0, 100);
        
        const pythonCode = `distance_sensor('${port}').light_up(${light1}, ${light2}, ${light3}, ${light4})`;
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    // === COLOR SENSOR IMPLEMENTATIONS ===

    getColor(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        const portData = this._peripheral.portValues[port];
        if (portData?.type === 'color') {
            const colorNames = ['black', 'magenta', 'purple', 'blue', 'azure', 'turquoise', 'green', 'yellow', 'orange', 'red', 'white'];
            const colorIndex = portData.color;
            return colorNames[colorIndex] || 'none';
        }
        return 'none';
    }

    getColorReflection(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        const portData = this._peripheral.portValues[port];
        if (portData?.type === 'color') {
            return portData.reflection || 0;
        }
        return 0;
    }

    getColorAmbient(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        const portData = this._peripheral.portValues[port];
        if (portData?.type === 'color') {
            return portData.ambient || 0;
        }
        return 0;
    }

    whenColorDetected(args) {
        const detectedColor = this.getColor(args);
        const expectedColor = Cast.toString(args.COLOR);
        return detectedColor === expectedColor;
    }

    setColorLights(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        const brightness = MathUtil.clamp(Cast.toNumber(args.BRIGHTNESS), 0, 100);
        
        const pythonCode = `color_sensor('${port}').light_up(${brightness})`;
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    // === FORCE SENSOR IMPLEMENTATIONS ===

    getForce(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        const portData = this._peripheral.portValues[port];
        if (portData?.type === 'force') {
            return portData.force;
        }
        return 0;
    }

    isForceSensorPressed(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        const portData = this._peripheral.portValues[port];
        if (portData?.type === 'force') {
            return portData.pressed;
        }
        return false;
    }

    whenForceSensorPressed(args) {
        return this.isForceSensorPressed(args);
    }

    // === 3x3 COLOR MATRIX IMPLEMENTATIONS ===

    setMatrix3x3Pixel(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        const x = MathUtil.clamp(Cast.toNumber(args.X) - 1, 0, 2);
        const y = MathUtil.clamp(Cast.toNumber(args.Y) - 1, 0, 2);
        const color = Cast.toString(args.COLOR);
        const brightness = MathUtil.clamp(Cast.toNumber(args.BRIGHTNESS), 0, 10);
        
        const pythonCode = `color_matrix('${port}').set_pixel(${x}, ${y}, color='${color}', brightness=${brightness})`;
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    setMatrix3x3All(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        const color = Cast.toString(args.COLOR);
        const brightness = MathUtil.clamp(Cast.toNumber(args.BRIGHTNESS), 0, 10);
        
        const pythonCode = `color_matrix('${port}').show_color('${color}', brightness=${brightness})`;
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    clearMatrix3x3(args) {
        const port = Cast.toString(args.PORT).toUpperCase();
        
        const pythonCode = `color_matrix('${port}').off()`;
        return this._peripheral.sendPythonCommand(pythonCode);
    }

    // === ADVANCED PYTHON COMMAND ===

    runPython(args) {
        const code = Cast.toString(args.CODE);
        return this._peripheral.sendPythonCommand(code);
    }
}

exports.blockClass = Scratch3SpikePrimeBlocks;
module.exports = Scratch3SpikePrimeBlocks;
