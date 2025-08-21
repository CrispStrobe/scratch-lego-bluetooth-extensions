var en$1 = {
	"gui.extension.planetemaths.name": "Maths Planet",
	"gui.extension.planetemaths.description": "Use mathematics tools."
};
var de$1 = {
	"gui.extension.planetemaths.name": "Mathe-Planet",
	"gui.extension.planetemaths.description": "Verwende mathematische Werkzeuge."
};
var fr$1 = {
	"gui.extension.planetemaths.name": "Planète Maths",
	"gui.extension.planetemaths.description": "Utiliser des outils mathématiques."
};
var translations$1 = {
	en: en$1,
	de: de$1,
	fr: fr$1
};

var img$1 = "...";

var img = "...";

/**
 * @param {object} messageData - data for format-message
 * @returns {string} - translated message for the current locale
 */
var formatMessage$1 = function formatMessage(messageData) {
  return messageData.defaultMessage;
};
var entry = {
  get name() {
    return formatMessage$1({
      id: 'gui.extension.planetemaths.name',
      default: 'Maths Planet',
      description: 'Name for the Maths Planet extension'
    });
  },
  extensionId: 'planetemaths',
  collaborator: 'Planète Maths',
  iconURL: img$1,
  insetIconURL: img,
  get description() {
    return formatMessage$1({
      id: 'gui.extension.planetemaths.description',
      default: 'Use mathematics tools.',
      description: 'Description for the Maths Planet extension'
    });
  },
  featured: true,
  disabled: false,
  bluetoothRequired: false,
  internetConnectionRequired: false,
  setFormatMessage: function setFormatMessage(formatter) {
    formatMessage$1 = formatter;
  },
  translationMap: translations$1
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : String(i);
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/**
 * Types of block
 * @enum {string}
 */
var BlockType = {
  /**
   * Boolean reporter with hexagonal shape
   */
  BOOLEAN: 'Boolean',
  /**
   * A button (not an actual block) for some special action, like making a variable
   */
  BUTTON: 'button',
  /**
   * Command block
   */
  COMMAND: 'command',
  /**
   * Specialized command block which may or may not run a child branch
   * The thread continues with the next block whether or not a child branch ran.
   */
  CONDITIONAL: 'conditional',
  /**
   * Specialized hat block with no implementation function
   * This stack only runs if the corresponding event is emitted by other code.
   */
  EVENT: 'event',
  /**
   * Hat block which conditionally starts a block stack
   */
  HAT: 'hat',
  /**
   * Specialized command block which may or may not run a child branch
   * If a child branch runs, the thread evaluates the loop block again.
   */
  LOOP: 'loop',
  /**
   * General reporter with numeric or string value
   */
  REPORTER: 'reporter'
};
var blockType = BlockType;

/**
 * Block argument types
 * @enum {string}
 */
var ArgumentType = {
  /**
   * Numeric value with angle picker
   */
  ANGLE: 'angle',
  /**
   * Boolean value with hexagonal placeholder
   */
  BOOLEAN: 'Boolean',
  /**
   * Numeric value with color picker
   */
  COLOR: 'color',
  /**
   * Numeric value with text field
   */
  NUMBER: 'number',
  /**
   * String value with text field
   */
  STRING: 'string',
  /**
   * String value with matrix field
   */
  MATRIX: 'matrix',
  /**
   * MIDI note number with note picker (piano) field
   */
  NOTE: 'note',
  /**
   * Inline image on block (as part of the label)
   */
  IMAGE: 'image'
};
var argumentType = ArgumentType;

var Color$1 = /*#__PURE__*/function () {
  function Color() {
    _classCallCheck(this, Color);
  }
  _createClass(Color, null, [{
    key: "RGB_BLACK",
    get:
    /**
     * @typedef {object} RGBObject - An object representing a color in RGB format.
     * @property {number} r - the red component, in the range [0, 255].
     * @property {number} g - the green component, in the range [0, 255].
     * @property {number} b - the blue component, in the range [0, 255].
     */

    /**
     * @typedef {object} HSVObject - An object representing a color in HSV format.
     * @property {number} h - hue, in the range [0-359).
     * @property {number} s - saturation, in the range [0,1].
     * @property {number} v - value, in the range [0,1].
     */

    /** @type {RGBObject} */
    function get() {
      return {
        r: 0,
        g: 0,
        b: 0
      };
    }

    /** @type {RGBObject} */
  }, {
    key: "RGB_WHITE",
    get: function get() {
      return {
        r: 255,
        g: 255,
        b: 255
      };
    }

    /**
     * Convert a Scratch decimal color to a hex string, #RRGGBB.
     * @param {number} decimal RGB color as a decimal.
     * @return {string} RGB color as #RRGGBB hex string.
     */
  }, {
    key: "decimalToHex",
    value: function decimalToHex(decimal) {
      if (decimal < 0) {
        decimal += 0xFFFFFF + 1;
      }
      var hex = Number(decimal).toString(16);
      hex = "#".concat('000000'.substr(0, 6 - hex.length)).concat(hex);
      return hex;
    }

    /**
     * Convert a Scratch decimal color to an RGB color object.
     * @param {number} decimal RGB color as decimal.
     * @return {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     */
  }, {
    key: "decimalToRgb",
    value: function decimalToRgb(decimal) {
      var a = decimal >> 24 & 0xFF;
      var r = decimal >> 16 & 0xFF;
      var g = decimal >> 8 & 0xFF;
      var b = decimal & 0xFF;
      return {
        r: r,
        g: g,
        b: b,
        a: a > 0 ? a : 255
      };
    }

    /**
     * Convert a hex color (e.g., F00, #03F, #0033FF) to an RGB color object.
     * CC-BY-SA Tim Down:
     * https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
     * @param {!string} hex Hex representation of the color.
     * @return {RGBObject} null on failure, or rgb: {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     */
  }, {
    key: "hexToRgb",
    value: function hexToRgb(hex) {
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
      });
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    /**
     * Convert an RGB color object to a hex color.
     * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     * @return {!string} Hex representation of the color.
     */
  }, {
    key: "rgbToHex",
    value: function rgbToHex(rgb) {
      return Color.decimalToHex(Color.rgbToDecimal(rgb));
    }

    /**
     * Convert an RGB color object to a Scratch decimal color.
     * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     * @return {!number} Number representing the color.
     */
  }, {
    key: "rgbToDecimal",
    value: function rgbToDecimal(rgb) {
      return (rgb.r << 16) + (rgb.g << 8) + rgb.b;
    }

    /**
    * Convert a hex color (e.g., F00, #03F, #0033FF) to a decimal color number.
    * @param {!string} hex Hex representation of the color.
    * @return {!number} Number representing the color.
    */
  }, {
    key: "hexToDecimal",
    value: function hexToDecimal(hex) {
      return Color.rgbToDecimal(Color.hexToRgb(hex));
    }

    /**
     * Convert an HSV color to RGB format.
     * @param {HSVObject} hsv - {h: hue [0,360), s: saturation [0,1], v: value [0,1]}
     * @return {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     */
  }, {
    key: "hsvToRgb",
    value: function hsvToRgb(hsv) {
      var h = hsv.h % 360;
      if (h < 0) h += 360;
      var s = Math.max(0, Math.min(hsv.s, 1));
      var v = Math.max(0, Math.min(hsv.v, 1));
      var i = Math.floor(h / 60);
      var f = h / 60 - i;
      var p = v * (1 - s);
      var q = v * (1 - s * f);
      var t = v * (1 - s * (1 - f));
      var r;
      var g;
      var b;
      switch (i) {
        default:
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        case 5:
          r = v;
          g = p;
          b = q;
          break;
      }
      return {
        r: Math.floor(r * 255),
        g: Math.floor(g * 255),
        b: Math.floor(b * 255)
      };
    }

    /**
     * Convert an RGB color to HSV format.
     * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     * @return {HSVObject} hsv - {h: hue [0,360), s: saturation [0,1], v: value [0,1]}
     */
  }, {
    key: "rgbToHsv",
    value: function rgbToHsv(rgb) {
      var r = rgb.r / 255;
      var g = rgb.g / 255;
      var b = rgb.b / 255;
      var x = Math.min(Math.min(r, g), b);
      var v = Math.max(Math.max(r, g), b);

      // For grays, hue will be arbitrarily reported as zero. Otherwise, calculate
      var h = 0;
      var s = 0;
      if (x !== v) {
        var f = r === x ? g - b : g === x ? b - r : r - g;
        var i = r === x ? 3 : g === x ? 5 : 1;
        h = (i - f / (v - x)) * 60 % 360;
        s = (v - x) / v;
      }
      return {
        h: h,
        s: s,
        v: v
      };
    }

    /**
     * Linear interpolation between rgb0 and rgb1.
     * @param {RGBObject} rgb0 - the color corresponding to fraction1 <= 0.
     * @param {RGBObject} rgb1 - the color corresponding to fraction1 >= 1.
     * @param {number} fraction1 - the interpolation parameter. If this is 0.5, for example, mix the two colors equally.
     * @return {RGBObject} the interpolated color.
     */
  }, {
    key: "mixRgb",
    value: function mixRgb(rgb0, rgb1, fraction1) {
      if (fraction1 <= 0) return rgb0;
      if (fraction1 >= 1) return rgb1;
      var fraction0 = 1 - fraction1;
      return {
        r: fraction0 * rgb0.r + fraction1 * rgb1.r,
        g: fraction0 * rgb0.g + fraction1 * rgb1.g,
        b: fraction0 * rgb0.b + fraction1 * rgb1.b
      };
    }
  }]);
  return Color;
}();
var color = Color$1;

var Color = color;

/**
 * @fileoverview
 * Utilities for casting and comparing Scratch data-types.
 * Scratch behaves slightly differently from JavaScript in many respects,
 * and these differences should be encapsulated below.
 * For example, in Scratch, add(1, join("hello", world")) -> 1.
 * This is because "hello world" is cast to 0.
 * In JavaScript, 1 + Number("hello" + "world") would give you NaN.
 * Use when coercing a value before computation.
 */
var Cast = /*#__PURE__*/function () {
  function Cast() {
    _classCallCheck(this, Cast);
  }
  _createClass(Cast, null, [{
    key: "toNumber",
    value:
    /**
     * Scratch cast to number.
     * Treats NaN as 0.
     * In Scratch 2.0, this is captured by `interp.numArg.`
     * @param {*} value Value to cast to number.
     * @return {number} The Scratch-casted number value.
     */
    function toNumber(value) {
      // If value is already a number we don't need to coerce it with
      // Number().
      if (typeof value === 'number') {
        // Scratch treats NaN as 0, when needed as a number.
        // E.g., 0 + NaN -> 0.
        if (Number.isNaN(value)) {
          return 0;
        }
        return value;
      }
      var n = Number(value);
      if (Number.isNaN(n)) {
        // Scratch treats NaN as 0, when needed as a number.
        // E.g., 0 + NaN -> 0.
        return 0;
      }
      return n;
    }

    /**
     * Scratch cast to boolean.
     * In Scratch 2.0, this is captured by `interp.boolArg.`
     * Treats some string values differently from JavaScript.
     * @param {*} value Value to cast to boolean.
     * @return {boolean} The Scratch-casted boolean value.
     */
  }, {
    key: "toBoolean",
    value: function toBoolean(value) {
      // Already a boolean?
      if (typeof value === 'boolean') {
        return value;
      }
      if (typeof value === 'string') {
        // These specific strings are treated as false in Scratch.
        if (value === '' || value === '0' || value.toLowerCase() === 'false') {
          return false;
        }
        // All other strings treated as true.
        return true;
      }
      // Coerce other values and numbers.
      return Boolean(value);
    }

    /**
     * Scratch cast to string.
     * @param {*} value Value to cast to string.
     * @return {string} The Scratch-casted string value.
     */
  }, {
    key: "toString",
    value: function toString(value) {
      return String(value);
    }

    /**
     * Cast any Scratch argument to an RGB color array to be used for the renderer.
     * @param {*} value Value to convert to RGB color array.
     * @return {Array.<number>} [r,g,b], values between 0-255.
     */
  }, {
    key: "toRgbColorList",
    value: function toRgbColorList(value) {
      var color = Cast.toRgbColorObject(value);
      return [color.r, color.g, color.b];
    }

    /**
     * Cast any Scratch argument to an RGB color object to be used for the renderer.
     * @param {*} value Value to convert to RGB color object.
     * @return {RGBOject} [r,g,b], values between 0-255.
     */
  }, {
    key: "toRgbColorObject",
    value: function toRgbColorObject(value) {
      var color;
      if (typeof value === 'string' && value.substring(0, 1) === '#') {
        color = Color.hexToRgb(value);

        // If the color wasn't *actually* a hex color, cast to black
        if (!color) color = {
          r: 0,
          g: 0,
          b: 0,
          a: 255
        };
      } else {
        color = Color.decimalToRgb(Cast.toNumber(value));
      }
      return color;
    }

    /**
     * Determine if a Scratch argument is a white space string (or null / empty).
     * @param {*} val value to check.
     * @return {boolean} True if the argument is all white spaces or null / empty.
     */
  }, {
    key: "isWhiteSpace",
    value: function isWhiteSpace(val) {
      return val === null || typeof val === 'string' && val.trim().length === 0;
    }

    /**
     * Compare two values, using Scratch cast, case-insensitive string compare, etc.
     * In Scratch 2.0, this is captured by `interp.compare.`
     * @param {*} v1 First value to compare.
     * @param {*} v2 Second value to compare.
     * @returns {number} Negative number if v1 < v2; 0 if equal; positive otherwise.
     */
  }, {
    key: "compare",
    value: function compare(v1, v2) {
      var n1 = Number(v1);
      var n2 = Number(v2);
      if (n1 === 0 && Cast.isWhiteSpace(v1)) {
        n1 = NaN;
      } else if (n2 === 0 && Cast.isWhiteSpace(v2)) {
        n2 = NaN;
      }
      if (isNaN(n1) || isNaN(n2)) {
        // At least one argument can't be converted to a number.
        // Scratch compares strings as case insensitive.
        var s1 = String(v1).toLowerCase();
        var s2 = String(v2).toLowerCase();
        if (s1 < s2) {
          return -1;
        } else if (s1 > s2) {
          return 1;
        }
        return 0;
      }
      // Handle the special case of Infinity
      if (n1 === Infinity && n2 === Infinity || n1 === -Infinity && n2 === -Infinity) {
        return 0;
      }
      // Compare as numbers.
      return n1 - n2;
    }

    /**
     * Determine if a Scratch argument number represents a round integer.
     * @param {*} val Value to check.
     * @return {boolean} True if number looks like an integer.
     */
  }, {
    key: "isInt",
    value: function isInt(val) {
      // Values that are already numbers.
      if (typeof val === 'number') {
        if (isNaN(val)) {
          // NaN is considered an integer.
          return true;
        }
        // True if it's "round" (e.g., 2.0 and 2).
        return val === parseInt(val, 10);
      } else if (typeof val === 'boolean') {
        // `True` and `false` always represent integer after Scratch cast.
        return true;
      } else if (typeof val === 'string') {
        // If it contains a decimal point, don't consider it an int.
        return val.indexOf('.') < 0;
      }
      return false;
    }
  }, {
    key: "LIST_INVALID",
    get: function get() {
      return 'INVALID';
    }
  }, {
    key: "LIST_ALL",
    get: function get() {
      return 'ALL';
    }

    /**
     * Compute a 1-based index into a list, based on a Scratch argument.
     * Two special cases may be returned:
     * LIST_ALL: if the block is referring to all of the items in the list.
     * LIST_INVALID: if the index was invalid in any way.
     * @param {*} index Scratch arg, including 1-based numbers or special cases.
     * @param {number} length Length of the list.
     * @param {boolean} acceptAll Whether it should accept "all" or not.
     * @return {(number|string)} 1-based index for list, LIST_ALL, or LIST_INVALID.
     */
  }, {
    key: "toListIndex",
    value: function toListIndex(index, length, acceptAll) {
      if (typeof index !== 'number') {
        if (index === 'all') {
          return acceptAll ? Cast.LIST_ALL : Cast.LIST_INVALID;
        }
        if (index === 'last') {
          if (length > 0) {
            return length;
          }
          return Cast.LIST_INVALID;
        } else if (index === 'random' || index === 'any') {
          if (length > 0) {
            return 1 + Math.floor(Math.random() * length);
          }
          return Cast.LIST_INVALID;
        }
      }
      index = Math.floor(Cast.toNumber(index));
      if (index < 1 || index > length) {
        return Cast.LIST_INVALID;
      }
      return index;
    }
  }]);
  return Cast;
}();
var cast = Cast;

var MathUtil = /*#__PURE__*/function () {
  function MathUtil() {
    _classCallCheck(this, MathUtil);
  }
  _createClass(MathUtil, null, [{
    key: "degToRad",
    value:
    /**
     * Convert a value from degrees to radians.
     * @param {!number} deg Value in degrees.
     * @return {!number} Equivalent value in radians.
     */
    function degToRad(deg) {
      return deg * Math.PI / 180;
    }

    /**
     * Convert a value from radians to degrees.
     * @param {!number} rad Value in radians.
     * @return {!number} Equivalent value in degrees.
     */
  }, {
    key: "radToDeg",
    value: function radToDeg(rad) {
      return rad * 180 / Math.PI;
    }

    /**
     * Clamp a number between two limits.
     * If n < min, return min. If n > max, return max. Else, return n.
     * @param {!number} n Number to clamp.
     * @param {!number} min Minimum limit.
     * @param {!number} max Maximum limit.
     * @return {!number} Value of n clamped to min and max.
     */
  }, {
    key: "clamp",
    value: function clamp(n, min, max) {
      return Math.min(Math.max(n, min), max);
    }

    /**
     * Keep a number between two limits, wrapping "extra" into the range.
     * e.g., wrapClamp(7, 1, 5) == 2
     * wrapClamp(0, 1, 5) == 5
     * wrapClamp(-11, -10, 6) == 6, etc.
     * @param {!number} n Number to wrap.
     * @param {!number} min Minimum limit.
     * @param {!number} max Maximum limit.
     * @return {!number} Value of n wrapped between min and max.
     */
  }, {
    key: "wrapClamp",
    value: function wrapClamp(n, min, max) {
      var range = max - min + 1;
      return n - Math.floor((n - min) / range) * range;
    }

    /**
     * Convert a value from tan function in degrees.
     * @param {!number} angle in degrees
     * @return {!number} Correct tan value
     */
  }, {
    key: "tan",
    value: function tan(angle) {
      angle = angle % 360;
      switch (angle) {
        case -270:
        case 90:
          return Infinity;
        case -90:
        case 270:
          return -Infinity;
        default:
          return parseFloat(Math.tan(Math.PI * angle / 180).toFixed(10));
      }
    }

    /**
     * Given an array of unique numbers,
     * returns a reduced array such that each element of the reduced array
     * represents the position of that element in a sorted version of the
     * original array.
     * E.g. [5, 19. 13, 1] => [1, 3, 2, 0]
     * @param {Array<number>} elts The elements to sort and reduce
     * @return {Array<number>} The array of reduced orderings
     */
  }, {
    key: "reducedSortOrdering",
    value: function reducedSortOrdering(elts) {
      var sorted = elts.slice(0).sort(function (a, b) {
        return a - b;
      });
      return elts.map(function (e) {
        return sorted.indexOf(e);
      });
    }

    /**
     * Return a random number given an inclusive range and a number in that
     * range that should be excluded.
     *
     * For instance, (1, 5, 3) will only pick 1, 2, 4, or 5 (with equal
     * probability)
     *
     * @param {number} lower - The lower bound (inlcusive)
     * @param {number} upper - The upper bound (inclusive), such that lower <= upper
     * @param {number} excluded - The number to exclude (MUST be in the range)
     * @return {number} A random integer in the range [lower, upper] that is not "excluded"
     */
  }, {
    key: "inclusiveRandIntWithout",
    value: function inclusiveRandIntWithout(lower, upper, excluded) {
      // Note that subtraction is the number of items in the
      // inclusive range [lower, upper] minus 1 already
      // (e.g. in the set {3, 4, 5}, 5 - 3 = 2).
      var possibleOptions = upper - lower;
      var randInt = lower + Math.floor(Math.random() * possibleOptions);
      if (randInt >= excluded) {
        return randInt + 1;
      }
      return randInt;
    }

    /**
     * Scales a number from one range to another.
     * @param {number} i number to be scaled
     * @param {number} iMin input range minimum
     * @param {number} iMax input range maximum
     * @param {number} oMin output range minimum
     * @param {number} oMax output range maximum
     * @return {number} scaled number
     */
  }, {
    key: "scale",
    value: function scale(i, iMin, iMax, oMin, oMax) {
      var p = (i - iMin) / (iMax - iMin);
      return p * (oMax - oMin) + oMin;
    }
  }]);
  return MathUtil;
}();
var mathUtil = MathUtil;

var en = {
	"pm.title": "Maths",
	"pm.add": "[NUM1] + [NUM2]",
	"pm.substract": "[NUM1] - [NUM2]",
	"pm.multiply": "[NUM1] x [NUM2]",
	"pm.divide": "[NUM1] / [NUM2]",
	"pm.pow": "[NUM1] ^ [NUM2]",
	"pm.mathop": "[OPERATOR] of [NUM1]",
	"pm.mathopdiv": "[OPERATOR] of [NUM1] divided by [NUM2]",
	"pm.mathop2": "[OPERATOR] of [NUM1] and [NUM2]",
	"pm.multiple": "[NUM1] is a [choix1] of [NUM2]",
	"pm.arrondis": "[TYPE] [NUM1] to [CHIFFRE]",
	"pm.pentiere": "[choix1] digit of [NUM1]",
	"pm.pdecimale": "[choix1] digit of [NUM1]",
	"pm.sommechiffres": "sum of digits of [NUM1]",
	"pm.pi": "π",
	"pm.oppose": "- [NUM1]",
	"pm.inverse": "1 / [NUM1]",
	"pm.pourcent": "[NUM1] %",
	"pm.random": "pick random [NUM1] to [NUM2]",
	"pm.gt": "[NUM1] < [NUM2]",
	"pm.gte": "[NUM1] ≤ [NUM2]",
	"pm.equals": "[NUM1] = [NUM2]",
	"pm.lt": "[NUM1] > [NUM2]",
	"pm.lte": "[NUM1] ≥ [NUM2]",
	"pm.min": "minimum of [NUM1] and [NUM2]",
	"pm.max": "maximum of [NUM1] and [NUM2]",
	"pm.and": "[OPERAND1] and [OPERAND2]",
	"pm.or": "[OPERAND1] or [OPERAND2]",
	"pm.not": "not [OPERAND1]",
	"pm.join": "join [STRING1] [STRING2]",
	"pm.letterof": "letter [LETTER] of [STRING]",
	"pm.length": "length of [STRING]",
	"pm.contains": "[STRING1] contains [STRING2] ?",
	"pm.extract": "extract characters from [NUM1] to [NUM2] of [STRING]",
	"text.c1": "units",
	"text.c2": "tens",
	"text.c3": "hundreds",
	"text.c4": "thousands",
	"text.c5": "tens of thousands",
	"text.c6": "hundreds of thousands",
	"text.c7": "millions",
	"text.c8": "tens of millions",
	"text.c9": "hundreds of millions",
	"text.c10": "billions",
	"text.c11": "tens of billions",
	"text.c12": "hundreds of billions",
	"text.d1": "tenths",
	"text.d2": "hundredths",
	"text.d3": "thousandths",
	"text.d4": "ten thousandths",
	"text.d5": "hundred thousandths",
	"text.d6": "millionths",
	"text.a0": "the unit",
	"text.a1": "tenth",
	"text.a2": "hundredth",
	"text.a3": "thousandth",
	"text.a4": "ten thousandth",
	"text.a5": "hundred thousandth",
	"text.a6": "millionth",
	"text.sqrt": "√",
	"text.cos": "cos",
	"text.sin": "sin",
	"text.tan": "tan",
	"text.acos": "arccos",
	"text.asin": "arcsin",
	"text.atan": "arctan",
	"text.pow10": "10 ^",
	"text.pgcd": "GCD",
	"text.ppcm": "LCM",
	"text.reste": "remainder",
	"text.quotient": "quotient",
	"text.vad": "Approximate value by defect of",
	"text.vae": "Approximate value by excess of",
	"text.arrondi": "Round",
	"text.multiple": "multiple",
	"text.diviseur": "divider"
};
var de = {
	"pm.title": "Mathe",
	"pm.add": "[NUM1] + [NUM2]",
	"pm.substract": "[NUM1] - [NUM2]",
	"pm.multiply": "[NUM1] x [NUM2]",
	"pm.divide": "[NUM1] / [NUM2]",
	"pm.pow": "[NUM1] ^ [NUM2]",
	"pm.mathop": "[OPERATOR] von [NUM1]",
	"pm.mathopdiv": "[OPERATOR] der Division von [NUM1] durch [NUM2]",
	"pm.mathop2": "[OPERATOR] von [NUM1] und [NUM2]",
	"pm.multiple": "[NUM1] ist ein [choix1] von [NUM2]",
	"pm.arrondis": "[TYPE] von [NUM1] auf [CHIFFRE]",
	"pm.pentiere": "[choix1] Ziffer von [NUM1]",
	"pm.pdecimale": "[choix1] Ziffer von [NUM1]",
	"pm.sommechiffres": "Quersumme von [NUM1]",
	"pm.pi": "π",
	"pm.oppose": "- [NUM1]",
	"pm.inverse": "1 / [NUM1]",
	"pm.pourcent": "[NUM1] %",
	"pm.random": "Zufallszahl von [NUM1] bis [NUM2]",
	"pm.gt": "[NUM1] < [NUM2]",
	"pm.gte": "[NUM1] ≤ [NUM2]",
	"pm.equals": "[NUM1] = [NUM2]",
	"pm.lt": "[NUM1] > [NUM2]",
	"pm.lte": "[NUM1] ≥ [NUM2]",
	"pm.min": "Minimum von [NUM1] und [NUM2]",
	"pm.max": "Maximum von [NUM1] und [NUM2]",
	"pm.and": "[OPERAND1] und [OPERAND2]",
	"pm.or": "[OPERAND1] oder [OPERAND2]",
	"pm.not": "nicht [OPERAND1]",
	"pm.join": "verbinde [STRING1] und [STRING2]",
	"pm.letterof": "Zeichen [LETTER] von [STRING]",
	"pm.length": "Länge von [STRING]",
	"pm.contains": "[STRING1] enthält [STRING2] ?",
	"pm.extract": "Zeichen [NUM1] bis [NUM2] aus [STRING]",
	"text.c1": "Einer",
	"text.c2": "Zehner",
	"text.c3": "Hunderter",
	"text.c4": "Tausender",
	"text.c5": "Zehntausender",
	"text.c6": "Hunderttausender",
	"text.c7": "Millionen",
	"text.c8": "Zehnmillionen",
	"text.c9": "Hundertmillionen",
	"text.c10": "Milliarden",
	"text.c11": "Zehnmilliarden",
	"text.c12": "Hundertmilliarden",
	"text.d1": "Zehntel",
	"text.d2": "Hundertstel",
	"text.d3": "Tausendstel",
	"text.d4": "Zehntausendstel",
	"text.d5": "Hunderttausendstel",
	"text.d6": "Millionstel",
	"text.a0": "die Einerstelle",
	"text.a1": "die Zehntelstelle",
	"text.a2": "die Hundertstelstelle",
	"text.a3": "die Tausendstelstelle",
	"text.a4": "die Zehntausendstelstelle",
	"text.a5": "die Hunderttausendstelstelle",
	"text.a6": "die Millionstelstelle",
	"text.sqrt": "√",
	"text.cos": "cos",
	"text.sin": "sin",
	"text.tan": "tan",
	"text.acos": "arccos",
	"text.asin": "arcsin",
	"text.atan": "arctan",
	"text.pow10": "10 ^",
	"text.pgcd": "ggT",
	"text.ppcm": "kgV",
	"text.reste": "Rest",
	"text.quotient": "Quotient",
	"text.vad": "Abgerundeter Wert von",
	"text.vae": "Aufgerundeter Wert von",
	"text.arrondi": "Runde",
	"text.multiple": "Vielfaches",
	"text.diviseur": "Teiler"
};
var fr = {
	"pm.title": "Maths",
	"pm.add": "[NUM1] + [NUM2]",
	"pm.substract": "[NUM1] - [NUM2]",
	"pm.multiply": "[NUM1] x [NUM2]",
	"pm.divide": "[NUM1] / [NUM2]",
	"pm.pow": "[NUM1] ^ [NUM2]",
	"pm.mathop": "[OPERATOR] de [NUM1]",
	"pm.mathopdiv": "[OPERATOR] de [NUM1] divisé par [NUM2]",
	"pm.mathop2": "[OPERATOR] de [NUM1] et [NUM2]",
	"pm.multiple": "[NUM1] est un [choix1] de [NUM2]",
	"pm.arrondis": "[TYPE] de [NUM1] [CHIFFRE]",
	"pm.pentiere": "chiffre des [choix1] de [NUM1]",
	"pm.pdecimale": "chiffre des [choix1] de [NUM1]",
	"pm.sommechiffres": "somme des chiffres de [NUM1]",
	"pm.pi": "π",
	"pm.oppose": "- [NUM1]",
	"pm.inverse": "1 / [NUM1]",
	"pm.pourcent": "[NUM1] %",
	"pm.random": "nombre aléatoire entre [NUM1] et [NUM2]",
	"pm.gt": "[NUM1] < [NUM2]",
	"pm.gte": "[NUM1] ≤ [NUM2]",
	"pm.equals": "[NUM1] = [NUM2]",
	"pm.lt": "[NUM1] > [NUM2]",
	"pm.lte": "[NUM1] ≥ [NUM2]",
	"pm.min": "minimum de [NUM1] et [NUM2]",
	"pm.max": "maximum de [NUM1] et [NUM2]",
	"pm.and": "[OPERAND1] et [OPERAND2]",
	"pm.or": "[OPERAND1] ou [OPERAND2]",
	"pm.not": "non [OPERAND1]",
	"pm.join": "regrouper [STRING1] et [STRING2]",
	"pm.letterof": "lettre [LETTER] de [STRING]",
	"pm.length": "longueur de [STRING]",
	"pm.contains": "[STRING1] contient [STRING2] ?",
	"pm.extract": "extraire caractères [NUM1] à [NUM2] de [STRING]",
	"text.c1": "unités",
	"text.c2": "dizaines",
	"text.c3": "centaines",
	"text.c4": "unités de mille",
	"text.c5": "dizaines de mille",
	"text.c6": "centaines de mille",
	"text.c7": "unités de millions",
	"text.c8": "dizaines de millions",
	"text.c9": "centaines de millions",
	"text.c10": "unités de milliards",
	"text.c11": "dizaines de milliards",
	"text.c12": "centaines de milliards",
	"text.d1": "dixièmes",
	"text.d2": "centièmes",
	"text.d3": "millièmes",
	"text.d4": "dix-millièmes",
	"text.d5": "cent-millièmes",
	"text.d6": "millionièmes",
	"text.a0": "à l'unité",
	"text.a1": "au dixième",
	"text.a2": "au centième",
	"text.a3": "au millième",
	"text.a4": "au dix-millième",
	"text.a5": "au cent-millième",
	"text.a6": "au millionième",
	"text.sqrt": "√",
	"text.cos": "cos",
	"text.sin": "sin",
	"text.tan": "tan",
	"text.acos": "arccos",
	"text.asin": "arcsin",
	"text.atan": "arctan",
	"text.pow10": "10 ^",
	"text.pgcd": "PGCD",
	"text.ppcm": "PPCM",
	"text.reste": "reste",
	"text.quotient": "quotient",
	"text.vad": "valeur approchée par défaut de",
	"text.vae": "valeur approchée par excès de",
	"text.arrondi": "arrondi de",
	"text.multiple": "multiple",
	"text.diviseur": "diviseur"
};
var translations = {
	en: en,
	de: de,
	fr: fr
};

var formatMessage = function formatMessage(messageData) {
  return messageData.defaultMessage;
};

// This is a simplified setup that works with this older extension style
var setupTranslations = function setupTranslations() {
  try {
    var localeSetup = formatMessage.setup();
    if (localeSetup && localeSetup.translations && localeSetup.translations[localeSetup.locale]) {
      Object.assign(localeSetup.translations[localeSetup.locale], translations[localeSetup.locale]);
    }
  } catch (e) {
    // Fails silently, which is fine.
  }
};
var Scratch3PMBlocks = /*#__PURE__*/function () {
  function Scratch3PMBlocks(runtime) {
    _classCallCheck(this, Scratch3PMBlocks);
    this.runtime = runtime;
    if (runtime.formatMessage) {
      formatMessage = runtime.formatMessage;
    }
  }
  _createClass(Scratch3PMBlocks, [{
    key: "getInfo",
    value: function getInfo() {
      setupTranslations();
      return {
        id: 'planetemaths',
        name: formatMessage({
          id: 'pm.title',
          default: 'Maths'
        }),
        color1: '#4879b7',
        color2: '#000000',
        blocks: [{
          opcode: 'add',
          text: formatMessage({
            id: 'pm.add',
            default: '[NUM1] + [NUM2]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, {
          opcode: 'substract',
          text: formatMessage({
            id: 'pm.substract',
            default: '[NUM1] - [NUM2]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, {
          opcode: 'multiply',
          text: formatMessage({
            id: 'pm.multiply',
            default: '[NUM1] x [NUM2]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, {
          opcode: 'divide',
          text: formatMessage({
            id: 'pm.divide',
            default: '[NUM1] / [NUM2]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, '---', {
          opcode: 'pow',
          text: formatMessage({
            id: 'pm.pow',
            default: '[NUM1] ^ [NUM2]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, '---', {
          opcode: 'mathop',
          text: formatMessage({
            id: 'pm.mathop',
            default: '[OPERATOR] of [NUM1]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            OPERATOR: {
              type: argumentType.STRING,
              menu: 'LIST_MATHOP',
              defaultValue: 'sqrt'
            }
          }
        }, '---', {
          opcode: 'mathopdiv',
          text: formatMessage({
            id: 'pm.mathopdiv',
            default: '[OPERATOR] of [NUM1] divided by [NUM2]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            OPERATOR: {
              type: argumentType.STRING,
              menu: 'LIST_MATHOPDIV',
              defaultValue: 'reste'
            }
          }
        }, {
          opcode: 'mathop2',
          text: formatMessage({
            id: 'pm.mathop2',
            default: '[OPERATOR] of [NUM1] and [NUM2]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            OPERATOR: {
              type: argumentType.STRING,
              menu: 'LIST_MATHOP2',
              defaultValue: 'pgcd'
            }
          }
        }, {
          opcode: 'multiple',
          text: formatMessage({
            id: 'pm.multiple',
            default: '[NUM1] is a [choix1] of [NUM2]'
          }),
          blockType: blockType.BOOLEAN,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            choix1: {
              type: argumentType.STRING,
              menu: 'MULTIPLE_DIVISEUR',
              defaultValue: 'multiple'
            }
          }
        }, '---', {
          opcode: 'arrondis',
          text: formatMessage({
            id: 'pm.arrondis',
            default: '[TYPE] [NUM1] to [CHIFFRE]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            TYPE: {
              type: argumentType.STRING,
              menu: 'ARRONDIS',
              defaultValue: 'arrondi'
            },
            CHIFFRE: {
              type: argumentType.STRING,
              menu: 'CHIFFRE_ARRONDIS',
              defaultValue: '0'
            }
          }
        }, '---', {
          opcode: 'chiffre_pentiere',
          text: formatMessage({
            id: 'pm.pentiere',
            default: '[choix1] digit of [NUM1]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            choix1: {
              type: argumentType.STRING,
              menu: 'PARTIE_ENTIERE',
              defaultValue: '0'
            }
          }
        }, {
          opcode: 'chiffre_pdecimale',
          text: formatMessage({
            id: 'pm.pdecimale',
            default: '[choix1] digit of [NUM1]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            choix1: {
              type: argumentType.STRING,
              menu: 'PARTIE_DECIMALE',
              defaultValue: '1'
            }
          }
        }, {
          opcode: 'sommechiffres',
          text: formatMessage({
            id: 'pm.sommechiffres',
            default: 'sum of digits of [NUM1]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, '---', {
          opcode: 'nombre_pi',
          text: formatMessage({
            id: 'pm.pi',
            default: 'π'
          }),
          blockType: blockType.REPORTER
        }, {
          opcode: 'oppose',
          text: formatMessage({
            id: 'pm.oppose',
            default: '- [NUM1]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, {
          opcode: 'inverse',
          text: formatMessage({
            id: 'pm.inverse',
            default: '1 / [NUM1]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, {
          opcode: 'pourcent',
          text: formatMessage({
            id: 'pm.pourcent',
            default: '[NUM1] %'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, '---', {
          opcode: 'random',
          text: formatMessage({
            id: 'pm.random',
            default: 'pick random [NUM1] to [NUM2]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: '1'
            },
            NUM2: {
              type: argumentType.NUMBER,
              defaultValue: '10'
            }
          }
        }, '---', {
          opcode: 'gt',
          text: formatMessage({
            id: 'pm.gt',
            default: '[NUM1] < [NUM2]'
          }),
          blockType: blockType.BOOLEAN,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: argumentType.NUMBER,
              defaultValue: '50'
            }
          }
        }, {
          opcode: 'gte',
          text: formatMessage({
            id: 'pm.gte',
            default: '[NUM1] ≤ [NUM2]'
          }),
          blockType: blockType.BOOLEAN,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: argumentType.NUMBER,
              defaultValue: '50'
            }
          }
        }, {
          opcode: 'equals',
          text: formatMessage({
            id: 'pm.equals',
            default: '[NUM1] = [NUM2]'
          }),
          blockType: blockType.BOOLEAN,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: argumentType.NUMBER,
              defaultValue: '50'
            }
          }
        }, {
          opcode: 'lt',
          text: formatMessage({
            id: 'pm.lt',
            default: '[NUM1] > [NUM2]'
          }),
          blockType: blockType.BOOLEAN,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: argumentType.NUMBER,
              defaultValue: '50'
            }
          }
        }, {
          opcode: 'lte',
          text: formatMessage({
            id: 'pm.lte',
            default: '[NUM1] ≥ [NUM2]'
          }),
          blockType: blockType.BOOLEAN,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: argumentType.NUMBER,
              defaultValue: '50'
            }
          }
        }, {
          opcode: 'min',
          text: formatMessage({
            id: 'pm.min',
            default: 'minimum of [NUM1] and [NUM2]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, {
          opcode: 'max',
          text: formatMessage({
            id: 'pm.max',
            default: 'maximum of [NUM1] and [NUM2]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: argumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, '---', {
          opcode: 'and',
          text: formatMessage({
            id: 'pm.and',
            default: '[OPERAND1] and [OPERAND2]'
          }),
          blockType: blockType.BOOLEAN,
          arguments: {
            OPERAND1: {
              type: argumentType.BOOLEAN,
              defaultValue: ' '
            },
            OPERAND2: {
              type: argumentType.BOOLEAN,
              defaultValue: ' '
            }
          }
        }, {
          opcode: 'or',
          text: formatMessage({
            id: 'pm.or',
            default: '[OPERAND1] or [OPERAND2]'
          }),
          blockType: blockType.BOOLEAN,
          arguments: {
            OPERAND1: {
              type: argumentType.BOOLEAN,
              defaultValue: ' '
            },
            OPERAND2: {
              type: argumentType.BOOLEAN,
              defaultValue: ' '
            }
          }
        }, {
          opcode: 'not',
          text: formatMessage({
            id: 'pm.not',
            default: 'not [OPERAND1]'
          }),
          blockType: blockType.BOOLEAN,
          arguments: {
            OPERAND1: {
              type: argumentType.BOOLEAN,
              defaultValue: ' '
            }
          }
        }, '---', {
          opcode: 'join',
          text: formatMessage({
            id: 'pm.join',
            default: 'join [STRING1] [STRING2]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            STRING1: {
              type: argumentType.STRING,
              defaultValue: 'Planète '
            },
            STRING2: {
              type: argumentType.STRING,
              defaultValue: 'Maths'
            }
          }
        }, {
          opcode: 'letterOf',
          text: formatMessage({
            id: 'pm.letterof',
            default: 'letter [LETTER] of [STRING]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            STRING: {
              type: argumentType.STRING,
              defaultValue: 'Maths'
            },
            LETTER: {
              type: argumentType.NUMBER,
              defaultValue: '1'
            }
          }
        }, {
          opcode: 'length',
          text: formatMessage({
            id: 'pm.length',
            default: 'length of [STRING]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            STRING: {
              type: argumentType.STRING,
              defaultValue: 'Maths'
            }
          }
        }, {
          opcode: 'contains',
          text: formatMessage({
            id: 'pm.contains',
            default: '[STRING1] contains [STRING2] ?'
          }),
          blockType: blockType.BOOLEAN,
          arguments: {
            STRING1: {
              type: argumentType.STRING,
              defaultValue: 'Maths'
            },
            STRING2: {
              type: argumentType.STRING,
              defaultValue: 's'
            }
          }
        }, {
          opcode: 'extract',
          text: formatMessage({
            id: 'pm.extract',
            default: 'extract characters from [NUM1] to [NUM2] of [STRING]'
          }),
          blockType: blockType.REPORTER,
          arguments: {
            STRING: {
              type: argumentType.STRING,
              defaultValue: 'Planète Maths'
            },
            NUM1: {
              type: argumentType.NUMBER,
              defaultValue: '1'
            },
            NUM2: {
              type: argumentType.NUMBER,
              defaultValue: '7'
            }
          }
        }],
        menus: {
          PARTIE_ENTIERE: {
            items: [{
              text: formatMessage({
                id: 'text.c1',
                default: 'units'
              }),
              value: '0'
            }, {
              text: formatMessage({
                id: 'text.c2',
                default: 'tens'
              }),
              value: '1'
            }, {
              text: formatMessage({
                id: 'text.c3',
                default: 'hundreds'
              }),
              value: '2'
            }, {
              text: formatMessage({
                id: 'text.c4',
                default: 'thousands'
              }),
              value: '3'
            }, {
              text: formatMessage({
                id: 'text.c5',
                default: 'tens of thousands'
              }),
              value: '4'
            }, {
              text: formatMessage({
                id: 'text.c6',
                default: 'hundreds of thousands'
              }),
              value: '5'
            }, {
              text: formatMessage({
                id: 'text.c7',
                default: 'millions'
              }),
              value: '6'
            }, {
              text: formatMessage({
                id: 'text.c8',
                default: 'tens of millions'
              }),
              value: '7'
            }, {
              text: formatMessage({
                id: 'text.c9',
                default: 'hundreds of millions'
              }),
              value: '8'
            }, {
              text: formatMessage({
                id: 'text.c10',
                default: 'billions'
              }),
              value: '9'
            }, {
              text: formatMessage({
                id: 'text.c11',
                default: 'tens of billions'
              }),
              value: '10'
            }, {
              text: formatMessage({
                id: 'text.c12',
                default: 'hundreds of billions'
              }),
              value: '11'
            }]
          },
          PARTIE_DECIMALE: {
            items: [{
              text: formatMessage({
                id: 'text.d1',
                default: 'tenths'
              }),
              value: '1'
            }, {
              text: formatMessage({
                id: 'text.d2',
                default: 'hundredths'
              }),
              value: '2'
            }, {
              text: formatMessage({
                id: 'text.d3',
                default: 'thousandths'
              }),
              value: '3'
            }, {
              text: formatMessage({
                id: 'text.d4',
                default: 'ten thousandths'
              }),
              value: '4'
            }, {
              text: formatMessage({
                id: 'text.d5',
                default: 'hundred thousandths'
              }),
              value: '5'
            }, {
              text: formatMessage({
                id: 'text.d6',
                default: 'millionths'
              }),
              value: '6'
            }]
          },
          CHIFFRE_ARRONDIS: {
            items: [{
              text: formatMessage({
                id: 'text.a0',
                default: 'the unit'
              }),
              value: '0'
            }, {
              text: formatMessage({
                id: 'text.a1',
                default: 'tenth'
              }),
              value: '1'
            }, {
              text: formatMessage({
                id: 'text.a2',
                default: 'hundredth'
              }),
              value: '2'
            }, {
              text: formatMessage({
                id: 'text.a3',
                default: 'thousandth'
              }),
              value: '3'
            }, {
              text: formatMessage({
                id: 'text.a4',
                default: 'ten thousandth'
              }),
              value: '4'
            }, {
              text: formatMessage({
                id: 'text.a5',
                default: 'hundred thousandth'
              }),
              value: '5'
            }, {
              text: formatMessage({
                id: 'text.a6',
                default: 'millionth'
              }),
              value: '6'
            }]
          },
          LIST_MATHOP: {
            items: [{
              text: formatMessage({
                id: 'text.sqrt',
                default: '√'
              }),
              value: 'sqrt'
            }, {
              text: formatMessage({
                id: 'text.cos',
                default: 'cos'
              }),
              value: 'cos'
            }, {
              text: formatMessage({
                id: 'text.sin',
                default: 'sin'
              }),
              value: 'sin'
            }, {
              text: formatMessage({
                id: 'text.tan',
                default: 'tan'
              }),
              value: 'tan'
            }, {
              text: formatMessage({
                id: 'text.acos',
                default: 'arccos'
              }),
              value: 'acos'
            }, {
              text: formatMessage({
                id: 'text.asin',
                default: 'arcsin'
              }),
              value: 'asin'
            }, {
              text: formatMessage({
                id: 'text.atan',
                default: 'arctan'
              }),
              value: 'atan'
            }, {
              text: formatMessage({
                id: 'text.pow10',
                default: '10 ^'
              }),
              value: '10 ^'
            }]
          },
          LIST_MATHOP2: {
            items: [{
              text: formatMessage({
                id: 'text.pgcd',
                default: 'GCD'
              }),
              value: 'pgcd'
            }, {
              text: formatMessage({
                id: 'text.ppcm',
                default: 'LCM'
              }),
              value: 'ppcm'
            }]
          },
          LIST_MATHOPDIV: {
            items: [{
              text: formatMessage({
                id: 'text.reste',
                default: 'remainder'
              }),
              value: 'reste'
            }, {
              text: formatMessage({
                id: 'text.quotient',
                default: 'quotient'
              }),
              value: 'quotient'
            }]
          },
          ARRONDIS: {
            items: [{
              text: formatMessage({
                id: 'text.vad',
                default: 'Approximate value by defect of'
              }),
              value: 'vad'
            }, {
              text: formatMessage({
                id: 'text.vae',
                default: 'Approximate value by excess of'
              }),
              value: 'vae'
            }, {
              text: formatMessage({
                id: 'text.arrondi',
                default: 'Round'
              }),
              value: 'arrondi'
            }]
          },
          MULTIPLE_DIVISEUR: {
            items: [{
              text: formatMessage({
                id: 'text.multiple',
                default: 'multiple'
              }),
              value: 'multiple'
            }, {
              text: formatMessage({
                id: 'text.diviseur',
                default: 'divider'
              }),
              value: 'diviseur'
            }]
          }
        }
      };
    }
  }, {
    key: "add",
    value: function add(args) {
      return cast.toNumber(args.NUM1) + cast.toNumber(args.NUM2);
    }
  }, {
    key: "substract",
    value: function substract(args) {
      return cast.toNumber(args.NUM1) - cast.toNumber(args.NUM2);
    }
  }, {
    key: "multiply",
    value: function multiply(args) {
      return cast.toNumber(args.NUM1) * cast.toNumber(args.NUM2);
    }
  }, {
    key: "divide",
    value: function divide(args) {
      return cast.toNumber(args.NUM1) / cast.toNumber(args.NUM2);
    }
  }, {
    key: "pow",
    value: function pow(args) {
      return Math.pow(cast.toNumber(args.NUM1), cast.toNumber(args.NUM2));
    }
  }, {
    key: "gt",
    value: function gt(args) {
      return cast.compare(args.NUM1, args.NUM2) < 0;
    }
  }, {
    key: "gte",
    value: function gte(args) {
      return cast.compare(args.NUM1, args.NUM2) <= 0;
    }
  }, {
    key: "equals",
    value: function equals(args) {
      return cast.compare(args.NUM1, args.NUM2) === 0;
    }
  }, {
    key: "lt",
    value: function lt(args) {
      return cast.compare(args.NUM1, args.NUM2) > 0;
    }
  }, {
    key: "lte",
    value: function lte(args) {
      return cast.compare(args.NUM1, args.NUM2) >= 0;
    }
  }, {
    key: "min",
    value: function min(args) {
      return Math.min(cast.toNumber(args.NUM1), cast.toNumber(args.NUM2));
    }
  }, {
    key: "max",
    value: function max(args) {
      return Math.max(cast.toNumber(args.NUM1), cast.toNumber(args.NUM2));
    }
  }, {
    key: "oppose",
    value: function oppose(args) {
      return -1 * cast.toNumber(args.NUM1);
    }
  }, {
    key: "inverse",
    value: function inverse(args) {
      return 1 / cast.toNumber(args.NUM1);
    }
  }, {
    key: "random",
    value: function random(args) {
      var nFrom = cast.toNumber(args.NUM1);
      var nTo = cast.toNumber(args.NUM2);
      var low = nFrom <= nTo ? nFrom : nTo;
      var high = nFrom <= nTo ? nTo : nFrom;
      if (low === high) return low;
      if (cast.isInt(args.NUM1) && cast.isInt(args.NUM2)) {
        return low + Math.floor(Math.random() * (high + 1 - low));
      }
      return Math.random() * (high - low) + low;
    }
  }, {
    key: "and",
    value: function and(args) {
      return cast.toBoolean(args.OPERAND1) && cast.toBoolean(args.OPERAND2);
    }
  }, {
    key: "or",
    value: function or(args) {
      return cast.toBoolean(args.OPERAND1) || cast.toBoolean(args.OPERAND2);
    }
  }, {
    key: "not",
    value: function not(args) {
      return !cast.toBoolean(args.OPERAND1);
    }
  }, {
    key: "pourcent",
    value: function pourcent(args) {
      return cast.toNumber(args.NUM1) / 100;
    }
  }, {
    key: "mathop",
    value: function mathop(args) {
      var operator = cast.toString(args.OPERATOR).toLowerCase();
      var n = cast.toNumber(args.NUM1);
      switch (operator) {
        case 'sqrt':
          return Math.sqrt(n);
        case 'sin':
          return parseFloat(Math.sin(Math.PI * n / 180).toFixed(10));
        case 'cos':
          return parseFloat(Math.cos(Math.PI * n / 180).toFixed(10));
        case 'tan':
          return mathUtil.tan(n);
        case 'asin':
          return Math.asin(n) * 180 / Math.PI;
        case 'acos':
          return Math.acos(n) * 180 / Math.PI;
        case 'atan':
          return Math.atan(n) * 180 / Math.PI;
        case '10 ^':
          return Math.pow(10, n);
      }
      return 0;
    }
  }, {
    key: "mathop2",
    value: function mathop2(args) {
      var operator = cast.toString(args.OPERATOR).toLowerCase();
      var n1 = cast.toNumber(args.NUM1);
      var n2 = cast.toNumber(args.NUM2);
      if (Number.isInteger(n1) && Number.isInteger(n2)) {
        switch (operator) {
          case 'pgcd':
            return this.pgcd(n1, n2);
          case 'ppcm':
            return n1 * n2 / this.pgcd(n1, n2);
        }
      }
      return '';
    }
  }, {
    key: "mathopdiv",
    value: function mathopdiv(args) {
      var operator = cast.toString(args.OPERATOR).toLowerCase();
      var n1 = cast.toNumber(args.NUM1);
      var n2 = cast.toNumber(args.NUM2);
      if (Number.isInteger(n1) && Number.isInteger(n2)) {
        var result = n1 % n2;
        switch (operator) {
          case 'reste':
            return result;
          case 'quotient':
            return (n1 - result) / n2;
        }
      }
      return '';
    }
  }, {
    key: "arrondis",
    value: function arrondis(args) {
      var type = cast.toString(args.TYPE).toLowerCase();
      var n1 = cast.toNumber(args.NUM1);
      var c = cast.toNumber(args.CHIFFRE);
      var factor = Math.pow(10, c);
      switch (type) {
        case 'vad':
          return Math.floor(n1 * factor) / factor;
        case 'vae':
          return Math.ceil(n1 * factor) / factor;
        case 'arrondi':
          return Math.round(n1 * factor) / factor;
      }
      return 0;
    }
  }, {
    key: "chiffre_pentiere",
    value: function chiffre_pentiere(args) {
      return Math.floor(cast.toNumber(args.NUM1) / Math.pow(10, cast.toNumber(args.choix1))) - Math.floor(cast.toNumber(args.NUM1) / Math.pow(10, cast.toNumber(args.choix1) + 1)) * 10;
    }
  }, {
    key: "chiffre_pdecimale",
    value: function chiffre_pdecimale(args) {
      return Math.floor(cast.toNumber(args.NUM1) * Math.pow(10, cast.toNumber(args.choix1))) - Math.floor(cast.toNumber(args.NUM1) * Math.pow(10, cast.toNumber(args.choix1) - 1)) * 10;
    }
  }, {
    key: "multiple",
    value: function multiple(args) {
      var type = cast.toString(args.choix1).toLowerCase();
      var n1 = cast.toNumber(args.NUM1);
      var n2 = cast.toNumber(args.NUM2);
      if (Number.isInteger(n1) && Number.isInteger(n2)) {
        switch (type) {
          case 'multiple':
            return n1 % n2 === 0;
          case 'diviseur':
            return n2 % n1 === 0;
        }
      }
      return false;
    }
  }, {
    key: "sommechiffres",
    value: function sommechiffres(args) {
      var value = Math.abs(cast.toNumber(args.NUM1));
      var somme = 0;
      if (Number.isInteger(value)) {
        while (value) {
          somme += value % 10;
          value = Math.floor(value / 10);
        }
        return somme;
      }
      return '';
    }
  }, {
    key: "pgcd",
    value: function pgcd(a, b) {
      if (b) {
        return this.pgcd(b, a % b);
      }
      return Math.abs(a);
    }
  }, {
    key: "nombre_pi",
    value: function nombre_pi() {
      return Math.PI;
    }
  }, {
    key: "join",
    value: function join(args) {
      return cast.toString(args.STRING1) + cast.toString(args.STRING2);
    }
  }, {
    key: "letterOf",
    value: function letterOf(args) {
      var index = cast.toNumber(args.LETTER) - 1;
      var str = cast.toString(args.STRING);
      if (index < 0 || index >= str.length) {
        return '';
      }
      return str.charAt(index);
    }
  }, {
    key: "length",
    value: function length(args) {
      return cast.toString(args.STRING).length;
    }
  }, {
    key: "contains",
    value: function contains(args) {
      var format = function format(string) {
        return cast.toString(string).toLowerCase();
      };
      return format(args.STRING1).includes(format(args.STRING2));
    }
  }, {
    key: "reverseString",
    value: function reverseString(str) {
      if (str === '') return '';
      return this.reverseString(str.substr(1)) + str.charAt(0);
    }
  }, {
    key: "extract",
    value: function extract(args) {
      var from = cast.toNumber(args.NUM1) - 1;
      var to = cast.toNumber(args.NUM2) - from;
      var str = cast.toString(args.STRING);
      if (to < 0) {
        var rts = this.reverseString(str);
        return rts.substr(rts.length - from - 1, 2 - to);
      }
      return str.substr(from, to);
    }
  }]);
  return Scratch3PMBlocks;
}();
exports.blockClass = Scratch3PMBlocks;

export { entry };
