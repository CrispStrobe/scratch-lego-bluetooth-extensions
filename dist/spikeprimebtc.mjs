var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _arrayLikeToArray$1(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

function _unsupportedIterableToArray$1(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$1(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray$1(r, e) || _nonIterableRest();
}

function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}

var _spikeprimebtc = {};

/**
 * Block argument types
 * @enum {string}
 */
var argumentType;
var hasRequiredArgumentType;
function requireArgumentType() {
  if (hasRequiredArgumentType) return argumentType;
  hasRequiredArgumentType = 1;
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
  argumentType = ArgumentType;
  return argumentType;
}

/**
 * Types of block
 * @enum {string}
 */
var blockType;
var hasRequiredBlockType;
function requireBlockType() {
  if (hasRequiredBlockType) return blockType;
  hasRequiredBlockType = 1;
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
  blockType = BlockType;
  return blockType;
}

var color;
var hasRequiredColor;
function requireColor() {
  if (hasRequiredColor) return color;
  hasRequiredColor = 1;
  var Color = /*#__PURE__*/function () {
    function Color() {
      _classCallCheck(this, Color);
    }
    return _createClass(Color, null, [{
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
  }();
  color = Color;
  return color;
}

var cast;
var hasRequiredCast;
function requireCast() {
  if (hasRequiredCast) return cast;
  hasRequiredCast = 1;
  var Color = requireColor();

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
    return _createClass(Cast, null, [{
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
  }();
  cast = Cast;
  return cast;
}

function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}

function _possibleConstructorReturn(t, e) {
  if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}

function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}

function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}

function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && _setPrototypeOf(t, e);
}

var jsonrpc;
var hasRequiredJsonrpc;
function requireJsonrpc() {
  if (hasRequiredJsonrpc) return jsonrpc;
  hasRequiredJsonrpc = 1;
  var JSONRPC = /*#__PURE__*/function () {
    function JSONRPC() {
      _classCallCheck(this, JSONRPC);
      this._requestID = 0;
      this._openRequests = {};
    }

    /**
     * Make an RPC request and retrieve the result.
     * @param {string} method - the remote method to call.
     * @param {object} params - the parameters to pass to the remote method.
     * @returns {Promise} - a promise for the result of the call.
     */
    return _createClass(JSONRPC, [{
      key: "sendRemoteRequest",
      value: function sendRemoteRequest(method, params) {
        var _this = this;
        var requestID = this._requestID++;
        var promise = new Promise(function (resolve, reject) {
          _this._openRequests[requestID] = {
            resolve: resolve,
            reject: reject
          };
        });
        this._sendRequest(method, params, requestID);
        return promise;
      }

      /**
       * Make an RPC notification with no expectation of a result or callback.
       * @param {string} method - the remote method to call.
       * @param {object} params - the parameters to pass to the remote method.
       */
    }, {
      key: "sendRemoteNotification",
      value: function sendRemoteNotification(method, params) {
        this._sendRequest(method, params);
      }

      /**
       * Handle an RPC request from remote, should return a result or Promise for result, if appropriate.
       * @param {string} method - the method requested by the remote caller.
       * @param {object} params - the parameters sent with the remote caller's request.
       */
    }, {
      key: "didReceiveCall",
      value: function didReceiveCall(/* method , params */
      ) {
        throw new Error('Must override didReceiveCall');
      }
    }, {
      key: "_sendMessage",
      value: function _sendMessage(/* jsonMessageObject */
      ) {
        throw new Error('Must override _sendMessage');
      }
    }, {
      key: "_sendRequest",
      value: function _sendRequest(method, params, id) {
        var request = {
          jsonrpc: '2.0',
          method: method,
          params: params
        };
        if (id !== null) {
          request.id = id;
        }
        this._sendMessage(request);
      }
    }, {
      key: "_handleMessage",
      value: function _handleMessage(json) {
        if (json.jsonrpc !== '2.0') {
          throw new Error("Bad or missing JSON-RPC version in message: ".concat(json));
        }
        if (Object.prototype.hasOwnProperty.call(json, 'method')) {
          this._handleRequest(json);
        } else {
          this._handleResponse(json);
        }
      }
    }, {
      key: "_sendResponse",
      value: function _sendResponse(id, result, error) {
        var response = {
          jsonrpc: '2.0',
          id: id
        };
        if (error) {
          response.error = error;
        } else {
          response.result = result || null;
        }
        this._sendMessage(response);
      }
    }, {
      key: "_handleResponse",
      value: function _handleResponse(json) {
        var result = json.result,
          error = json.error,
          id = json.id;
        var openRequest = this._openRequests[id];
        delete this._openRequests[id];
        if (openRequest) {
          if (error) {
            openRequest.reject(error);
          } else {
            openRequest.resolve(result);
          }
        }
      }
    }, {
      key: "_handleRequest",
      value: function _handleRequest(json) {
        var _this2 = this;
        var method = json.method,
          params = json.params,
          id = json.id;
        var rawResult = this.didReceiveCall(method, params);
        if (id !== null && typeof id !== 'undefined') {
          Promise.resolve(rawResult).then(function (result) {
            _this2._sendResponse(id, result);
          }, function (error) {
            _this2._sendResponse(id, null, error);
          });
        }
      }
    }]);
  }();
  jsonrpc = JSONRPC;
  return jsonrpc;
}

function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var bt;
var hasRequiredBt;
function requireBt() {
  if (hasRequiredBt) return bt;
  hasRequiredBt = 1;
  var JSONRPC = requireJsonrpc();
  var BT = /*#__PURE__*/function (_JSONRPC) {
    /**
     * A BT peripheral socket object.  It handles connecting, over web sockets, to
     * BT peripherals, and reading and writing data to them.
     * @param {Runtime} runtime - the Runtime for sending/receiving GUI update events.
     * @param {string} extensionId - the id of the extension using this socket.
     * @param {object} peripheralOptions - the list of options for peripheral discovery.
     * @param {object} connectCallback - a callback for connection.
     * @param {object} resetCallback - a callback for resetting extension state.
     * @param {object} messageCallback - a callback for message sending.
     */
    function BT(runtime, extensionId, peripheralOptions, connectCallback) {
      var _this;
      var resetCallback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var messageCallback = arguments.length > 5 ? arguments[5] : undefined;
      _classCallCheck(this, BT);
      _this = _callSuper(this, BT);
      _this._socket = runtime.getScratchLinkSocket('BT');
      _this._socket.setOnOpen(_this.requestPeripheral.bind(_this));
      _this._socket.setOnError(_this._handleRequestError.bind(_this));
      _this._socket.setOnClose(_this.handleDisconnectError.bind(_this));
      _this._socket.setHandleMessage(_this._handleMessage.bind(_this));
      _this._sendMessage = _this._socket.sendMessage.bind(_this._socket);
      _this._availablePeripherals = {};
      _this._connectCallback = connectCallback;
      _this._connected = false;
      _this._characteristicDidChangeCallback = null;
      _this._resetCallback = resetCallback;
      _this._discoverTimeoutID = null;
      _this._extensionId = extensionId;
      _this._peripheralOptions = peripheralOptions;
      _this._messageCallback = messageCallback;
      _this._runtime = runtime;
      _this._socket.open();
      return _this;
    }

    /**
     * Request connection to the peripheral.
     * If the web socket is not yet open, request when the socket promise resolves.
     */
    _inherits(BT, _JSONRPC);
    return _createClass(BT, [{
      key: "requestPeripheral",
      value: function requestPeripheral() {
        var _this2 = this;
        this._availablePeripherals = {};
        if (this._discoverTimeoutID) {
          window.clearTimeout(this._discoverTimeoutID);
        }
        this._discoverTimeoutID = window.setTimeout(this._handleDiscoverTimeout.bind(this), 15000);
        this.sendRemoteRequest('discover', this._peripheralOptions).catch(function (e) {
          return _this2._handleRequestError(e);
        });
      }

      /**
       * Try connecting to the input peripheral id, and then call the connect
       * callback if connection is successful.
       * @param {number} id - the id of the peripheral to connect to
       * @param {string} pin - an optional pin for pairing
       */
    }, {
      key: "connectPeripheral",
      value: function connectPeripheral(id) {
        var _this3 = this;
        var pin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var params = {
          peripheralId: id
        };
        if (pin) {
          params.pin = pin;
        }
        this.sendRemoteRequest('connect', params).then(function () {
          _this3._connected = true;
          _this3._runtime.emit(_this3._runtime.constructor.PERIPHERAL_CONNECTED);
          _this3._connectCallback();
        }).catch(function (e) {
          _this3._handleRequestError(e);
        });
      }

      /**
       * Close the websocket.
       */
    }, {
      key: "disconnect",
      value: function disconnect() {
        if (this._connected) {
          this._connected = false;
        }
        if (this._socket.isOpen()) {
          this._socket.close();
        }
        if (this._discoverTimeoutID) {
          window.clearTimeout(this._discoverTimeoutID);
        }

        // Sets connection status icon to orange
        this._runtime.emit(this._runtime.constructor.PERIPHERAL_DISCONNECTED);
      }

      /**
       * @return {bool} whether the peripheral is connected.
       */
    }, {
      key: "isConnected",
      value: function isConnected() {
        return this._connected;
      }
    }, {
      key: "sendMessage",
      value: function sendMessage(options) {
        var _this4 = this;
        return this.sendRemoteRequest('send', options).catch(function (e) {
          _this4.handleDisconnectError(e);
        });
      }

      /**
       * Handle a received call from the socket.
       * @param {string} method - a received method label.
       * @param {object} params - a received list of parameters.
       * @return {object} - optional return value.
       */
    }, {
      key: "didReceiveCall",
      value: function didReceiveCall(method, params) {
        // TODO: Add peripheral 'undiscover' handling
        switch (method) {
          case 'didDiscoverPeripheral':
            this._availablePeripherals[params.peripheralId] = params;
            this._runtime.emit(this._runtime.constructor.PERIPHERAL_LIST_UPDATE, this._availablePeripherals);
            if (this._discoverTimeoutID) {
              window.clearTimeout(this._discoverTimeoutID);
            }
            break;
          case 'userDidPickPeripheral':
            this._availablePeripherals[params.peripheralId] = params;
            this._runtime.emit(this._runtime.constructor.USER_PICKED_PERIPHERAL, this._availablePeripherals);
            if (this._discoverTimeoutID) {
              window.clearTimeout(this._discoverTimeoutID);
            }
            break;
          case 'userDidNotPickPeripheral':
            this._runtime.emit(this._runtime.constructor.PERIPHERAL_SCAN_TIMEOUT);
            if (this._discoverTimeoutID) {
              window.clearTimeout(this._discoverTimeoutID);
            }
            break;
          case 'didReceiveMessage':
            this._messageCallback(params); // TODO: refine?
            break;
          default:
            return 'nah';
        }
      }

      /**
       * Handle an error resulting from losing connection to a peripheral.
       *
       * This could be due to:
       * - battery depletion
       * - going out of bluetooth range
       * - being powered down
       *
       * Disconnect the socket, and if the extension using this socket has a
       * reset callback, call it. Finally, emit an error to the runtime.
       */
    }, {
      key: "handleDisconnectError",
      value: function handleDisconnectError(/* e */
      ) {
        // log.error(`BT error: ${JSON.stringify(e)}`);

        if (!this._connected) return;
        this.disconnect();
        if (this._resetCallback) {
          this._resetCallback();
        }
        this._runtime.emit(this._runtime.constructor.PERIPHERAL_CONNECTION_LOST_ERROR, {
          message: "Scratch lost connection to",
          extensionId: this._extensionId
        });
      }
    }, {
      key: "_handleRequestError",
      value: function _handleRequestError(/* e */
      ) {
        // log.error(`BT error: ${JSON.stringify(e)}`);

        this._runtime.emit(this._runtime.constructor.PERIPHERAL_REQUEST_ERROR, {
          message: "Scratch lost connection to",
          extensionId: this._extensionId
        });
      }
    }, {
      key: "_handleDiscoverTimeout",
      value: function _handleDiscoverTimeout() {
        if (this._discoverTimeoutID) {
          window.clearTimeout(this._discoverTimeoutID);
        }
        this._runtime.emit(this._runtime.constructor.PERIPHERAL_SCAN_TIMEOUT);
      }
    }]);
  }(JSONRPC);
  bt = BT;
  return bt;
}

var global$2 = (typeof global !== "undefined" ? global :
  typeof self !== "undefined" ? self :
  typeof window !== "undefined" ? window : {});

var global$1 = typeof global$2 !== "undefined" ? global$2 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var inited = false;
function init() {
  inited = true;
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }
  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;
}
function toByteArray(b64) {
  if (!inited) {
    init();
  }
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;
  var L = 0;
  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = tmp >> 16 & 0xFF;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }
  if (placeHolders === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
    output.push(tripletToBase64(tmp));
  }
  return output.join('');
}
function fromByteArray(uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[tmp << 4 & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[tmp >> 4 & 0x3F];
    output += lookup[tmp << 2 & 0x3F];
    output += '=';
  }
  parts.push(output);
  return parts.join('');
}

function read(buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
}
function write(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
  buffer[offset + i - d] |= s * 128;
}

var toString = {}.toString;
var isArray = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

var INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined ? global$1.TYPED_ARRAY_SUPPORT : true;

/*
 * Export kMaxLength after typed array support is determined.
 */
kMaxLength();
function kMaxLength() {
  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
}
function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }
  return that;
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer(arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length);
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error('If encoding is specified then the first argument must be a string');
    }
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}
Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr;
};
function from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }
  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset);
  }
  return fromObject(that, value);
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length);
};
if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) ;
}
function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}
function alloc(that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size);
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
  }
  return createBuffer(that, size);
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding);
};
function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that;
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size);
};
function fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }
  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }
  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);
  var actual = that.write(string, encoding);
  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }
  return that;
}
function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that;
}
function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }
  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }
  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that;
}
function fromObject(that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);
    if (that.length === 0) {
      return that;
    }
    obj.copy(that, 0, 0, len);
    return that;
  }
  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }
      return fromArrayLike(that, obj);
    }
    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }
  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}
function checked(length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
  }
  return length | 0;
}
Buffer.isBuffer = isBuffer;
function internalIsBuffer(b) {
  return !!(b != null && b._isBuffer);
}
Buffer.compare = function compare(a, b) {
  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
    throw new TypeError('Arguments must be Buffers');
  }
  if (a === b) return 0;
  var x = a.length;
  var y = b.length;
  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }
  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};
Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;
    default:
      return false;
  }
};
Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }
  if (list.length === 0) {
    return Buffer.alloc(0);
  }
  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }
  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!internalIsBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};
function byteLength(string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length;
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }
  var len = string.length;
  if (len === 0) return 0;

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length;
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;
      case 'hex':
        return len >>> 1;
      case 'base64':
        return base64ToBytes(string).length;
      default:
        if (loweredCase) return utf8ToBytes(string).length; // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;
function slowToString(encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return '';
  }
  if (end === undefined || end > this.length) {
    end = this.length;
  }
  if (end <= 0) {
    return '';
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;
  if (end <= start) {
    return '';
  }
  if (!encoding) encoding = 'utf8';
  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);
      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);
      case 'ascii':
        return asciiSlice(this, start, end);
      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);
      case 'base64':
        return base64Slice(this, start, end);
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);
      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;
function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}
Buffer.prototype.swap16 = function swap16() {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this;
};
Buffer.prototype.swap32 = function swap32() {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this;
};
Buffer.prototype.swap64 = function swap64() {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this;
};
Buffer.prototype.toString = function toString() {
  var length = this.length | 0;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};
Buffer.prototype.equals = function equals(b) {
  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};
Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>';
};
Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (!internalIsBuffer(target)) {
    throw new TypeError('Argument must be a Buffer');
  }
  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }
  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }
  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }
  if (thisStart >= thisEnd) {
    return -1;
  }
  if (start >= end) {
    return 1;
  }
  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;
  if (this === target) return 0;
  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);
  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);
  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }
  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1;

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset; // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (internalIsBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }
  throw new TypeError('val must be string, number or Buffer');
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;
  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }
  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }
  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }
      if (found) return i;
    }
  }
  return -1;
}
Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};
Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');
  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }
  return i;
}
function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}
function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}
function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}
Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
    // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
    // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }
  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;
  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }
  if (!encoding) encoding = 'utf8';
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);
      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);
      case 'ascii':
        return asciiWrite(this, string, offset, length);
      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length);
      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);
      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};
Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};
function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf);
  } else {
    return fromByteArray(buf.slice(start, end));
  }
}
function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;
    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }
    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }
    res.push(codePoint);
    i += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;
function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }
  return res;
}
function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);
  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret;
}
function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);
  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret;
}
function hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;
  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out;
}
function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res;
}
Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;
  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }
  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }
  if (end < start) end = start;
  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }
  return newBuf;
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}
Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  return val;
};
Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }
  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }
  return val;
};
Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};
Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};
Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};
Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};
Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};
Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};
Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};
Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};
Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};
Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};
Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, true, 23, 4);
};
Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, false, 23, 4);
};
Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, true, 52, 8);
};
Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, false, 52, 8);
};
function checkInt(buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}
Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }
  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }
  return offset + byteLength;
};
Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }
  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }
  return offset + byteLength;
};
Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 0xff;
  return offset + 1;
};
function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}
Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};
Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};
function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}
Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};
Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};
Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }
  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }
  return offset + byteLength;
};
Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }
  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }
  return offset + byteLength;
};
Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};
Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};
Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};
Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};
Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};
function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4);
  }
  write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}
Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};
Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};
function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8);
  }
  write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}
Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};
Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0;

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds');

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }
  var len = end - start;
  var i;
  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }
  return len;
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }
  if (end <= start) {
    return this;
  }
  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;
  if (!val) val = 0;
  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }
  return this;
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
function base64clean(str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return '';
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str;
}
function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}
function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}
function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];
  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        }

        // valid lead
        leadSurrogate = codePoint;
        continue;
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }
    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }
  return bytes;
}
function asciiToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray;
}
function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;
    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }
  return byteArray;
}
function base64ToBytes(str) {
  return toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }
  return i;
}
function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}

// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
}
function isFastBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0));
}

var browserAtob = {exports: {}};

browserAtob.exports;
var hasRequiredBrowserAtob;
function requireBrowserAtob() {
  if (hasRequiredBrowserAtob) return browserAtob.exports;
  hasRequiredBrowserAtob = 1;
  (function (module) {
    (function (w) {

      function findBest(atobNative) {
        // normal window
        if ('function' === typeof atobNative) {
          return atobNative;
        }

        // browserify (web worker)
        if ('function' === typeof Buffer) {
          return function atobBrowserify(a) {
            //!! Deliberately using an API that's deprecated in node.js because
            //!! this file is for browsers and we expect them to cope with it.
            //!! Discussion: github.com/node-browser-compat/atob/pull/9
            return new Buffer(a, 'base64').toString('binary');
          };
        }

        // ios web worker with base64js
        if ('object' === _typeof(w.base64js)) {
          // bufferToBinaryString
          // https://git.coolaj86.com/coolaj86/unibabel.js/blob/master/index.js#L50
          return function atobWebWorker_iOS(a) {
            var buf = w.base64js.b64ToByteArray(a);
            return Array.prototype.map.call(buf, function (ch) {
              return String.fromCharCode(ch);
            }).join('');
          };
        }
        return function () {
          // ios web worker without base64js
          throw new Error("You're probably in an old browser or an iOS webworker." + " It might help to include beatgammit's base64-js.");
        };
      }
      var atobBest = findBest(w.atob);
      w.atob = atobBest;
      if (module && module.exports) {
        module.exports = atobBest;
      }
    })(window);
  })(browserAtob);
  return browserAtob.exports;
}

var btoa = {exports: {}};

var hasRequiredBtoa;
function requireBtoa() {
  if (hasRequiredBtoa) return btoa.exports;
  hasRequiredBtoa = 1;
  (function () {

    function btoa$1(str) {
      var buffer;
      if (str instanceof Buffer) {
        buffer = str;
      } else {
        buffer = Buffer.from(str.toString(), 'binary');
      }
      return buffer.toString('base64');
    }
    btoa.exports = btoa$1;
  })();
  return btoa.exports;
}

var base64Util;
var hasRequiredBase64Util;
function requireBase64Util() {
  if (hasRequiredBase64Util) return base64Util;
  hasRequiredBase64Util = 1;
  var atob = requireBrowserAtob();
  var btoa = requireBtoa();
  var Base64Util = /*#__PURE__*/function () {
    function Base64Util() {
      _classCallCheck(this, Base64Util);
    }
    return _createClass(Base64Util, null, [{
      key: "base64ToUint8Array",
      value:
      /**
       * Convert a base64 encoded string to a Uint8Array.
       * @param {string} base64 - a base64 encoded string.
       * @return {Uint8Array} - a decoded Uint8Array.
       */
      function base64ToUint8Array(base64) {
        var binaryString = atob(base64);
        var len = binaryString.length;
        var array = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
          array[i] = binaryString.charCodeAt(i);
        }
        return array;
      }

      /**
       * Convert a Uint8Array to a base64 encoded string.
       * @param {Uint8Array} array - the array to convert.
       * @return {string} - the base64 encoded string.
       */
    }, {
      key: "uint8ArrayToBase64",
      value: function uint8ArrayToBase64(array) {
        var base64 = btoa(String.fromCharCode.apply(null, array));
        return base64;
      }

      /**
      * Convert an array buffer to a base64 encoded string.
      * @param {array} buffer - an array buffer to convert.
      * @return {string} - the base64 encoded string.
      */
    }, {
      key: "arrayBufferToBase64",
      value: function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      }
    }]);
  }();
  base64Util = Base64Util;
  return base64Util;
}

var mathUtil;
var hasRequiredMathUtil;
function requireMathUtil() {
  if (hasRequiredMathUtil) return mathUtil;
  hasRequiredMathUtil = 1;
  var MathUtil = /*#__PURE__*/function () {
    function MathUtil() {
      _classCallCheck(this, MathUtil);
    }
    return _createClass(MathUtil, null, [{
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
  }();
  mathUtil = MathUtil;
  return mathUtil;
}

var timer;
var hasRequiredTimer;
function requireTimer() {
  if (hasRequiredTimer) return timer;
  hasRequiredTimer = 1;
  var Timer = /*#__PURE__*/function () {
    function Timer() {
      var nowObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Timer.nowObj;
      _classCallCheck(this, Timer);
      /**
       * Used to store the start time of a timer action.
       * Updated when calling `timer.start`.
       */
      this.startTime = 0;

      /**
       * Used to pass custom logic for determining the value for "now",
       * which is sometimes useful for compatibility with Scratch 2
       */
      this.nowObj = nowObj;
    }

    /**
     * Disable use of self.performance for now as it results in lower performance
     * However, instancing it like below (caching the self.performance to a local variable) negates most of the issues.
     * @type {boolean}
     */
    return _createClass(Timer, [{
      key: "time",
      value:
      /**
       * Return the currently known absolute time, in ms precision.
       * @returns {number} ms elapsed since 1 January 1970 00:00:00 UTC.
       */
      function time() {
        return this.nowObj.now();
      }

      /**
       * Start a timer for measuring elapsed time,
       * at the most accurate precision possible.
       */
    }, {
      key: "start",
      value: function start() {
        this.startTime = this.nowObj.now();
      }
    }, {
      key: "timeElapsed",
      value: function timeElapsed() {
        return this.nowObj.now() - this.startTime;
      }

      /**
       * Call a handler function after a specified amount of time has elapsed.
       * @param {function} handler - function to call after the timeout
       * @param {number} timeout - number of milliseconds to delay before calling the handler
       * @returns {number} - the ID of the new timeout
       */
    }, {
      key: "setTimeout",
      value: function setTimeout(handler, timeout) {
        return commonjsGlobal.setTimeout(handler, timeout);
      }

      /**
       * Clear a timeout from the pending timeout pool.
       * @param {number} timeoutId - the ID returned by `setTimeout()`
       * @memberof Timer
       */
    }, {
      key: "clearTimeout",
      value: function clearTimeout(timeoutId) {
        commonjsGlobal.clearTimeout(timeoutId);
      }
    }], [{
      key: "USE_PERFORMANCE",
      get: function get() {
        return false;
      }

      /**
       * Legacy object to allow for us to call now to get the old style date time (for backwards compatibility)
       * @deprecated This is only called via the nowObj.now() if no other means is possible...
       */
    }, {
      key: "legacyDateCode",
      get: function get() {
        return {
          now: function now() {
            return new Date().getTime();
          }
        };
      }

      /**
       * Use this object to route all time functions through single access points.
       */
    }, {
      key: "nowObj",
      get: function get() {
        if (Timer.USE_PERFORMANCE && typeof self !== 'undefined' && self.performance && 'now' in self.performance) {
          return self.performance;
        } else if (Date.now) {
          return Date;
        }
        return Timer.legacyDateCode;
      }
    }]);
  }();
  timer = Timer;
  return timer;
}

var rateLimiter;
var hasRequiredRateLimiter;
function requireRateLimiter() {
  if (hasRequiredRateLimiter) return rateLimiter;
  hasRequiredRateLimiter = 1;
  var Timer = requireTimer();
  var RateLimiter = /*#__PURE__*/function () {
    /**
     * A utility for limiting the rate of repetitive send operations, such as
     * bluetooth messages being sent to hardware devices. It uses the token bucket
     * strategy: a counter accumulates tokens at a steady rate, and each send costs
     * a token. If no tokens remain, it's not okay to send.
     * @param {number} maxRate the maximum number of sends allowed per second
     * @constructor
     */
    function RateLimiter(maxRate) {
      _classCallCheck(this, RateLimiter);
      /**
       * The maximum number of tokens.
       * @type {number}
       */
      this._maxTokens = maxRate;

      /**
       * The interval in milliseconds for refilling one token. It is calculated
       * so that the tokens will be filled to maximum in one second.
       * @type {number}
       */
      this._refillInterval = 1000 / maxRate;

      /**
       * The current number of tokens in the bucket.
       * @type {number}
       */
      this._count = this._maxTokens;
      this._timer = new Timer();
      this._timer.start();

      /**
       * The last time in milliseconds when the token count was updated.
       * @type {number}
       */
      this._lastUpdateTime = this._timer.timeElapsed();
    }

    /**
     * Check if it is okay to send a message, by updating the token count,
     * taking a token and then checking if we are still under the rate limit.
     * @return {boolean} true if we are under the rate limit
     */
    return _createClass(RateLimiter, [{
      key: "okayToSend",
      value: function okayToSend() {
        // Calculate the number of tokens to refill the bucket with, based on the
        // amount of time since the last refill.
        var now = this._timer.timeElapsed();
        var timeSinceRefill = now - this._lastUpdateTime;
        var refillCount = Math.floor(timeSinceRefill / this._refillInterval);

        // If we're adding at least one token, reset _lastUpdateTime to now.
        // Otherwise, don't reset it so that we can continue measuring time until
        // the next refill.
        if (refillCount > 0) {
          this._lastUpdateTime = now;
        }

        // Refill the tokens up to the maximum
        this._count = Math.min(this._maxTokens, this._count + refillCount);

        // If we have at least one token, use one, and it's okay to send.
        if (this._count > 0) {
          this._count--;
          return true;
        }
        return false;
      }
    }]);
  }();
  rateLimiter = RateLimiter;
  return rateLimiter;
}

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var hasRequired_spikeprimebtc;
function require_spikeprimebtc() {
  if (hasRequired_spikeprimebtc) return _spikeprimebtc;
  hasRequired_spikeprimebtc = 1;
  var ArgumentType = requireArgumentType();
  var BlockType = requireBlockType();
  var Cast = requireCast();
  var BT = requireBt();
  var Base64Util = requireBase64Util();
  var MathUtil = requireMathUtil();
  var RateLimiter = requireRateLimiter();
  var translations = {
    "en": {
      "spikeprime.title": "SPIKE Prime Ultimate",
      "spikeprime.setMovementMotors": "set movement motors [PORT_A] and [PORT_B]",
      "spikeprime.moveForward": "move [DIRECTION] for [VALUE] [UNIT]",
      "spikeprime.steer": "start steering [STEERING]",
      "spikeprime.startTank": "start tank drive left [LEFT_SPEED] right [RIGHT_SPEED]",
      "spikeprime.setMovementSpeed": "set movement speed to [SPEED]%",
      "spikeprime.stopMovement": "stop movement",
      "spikeprime.motorRunFor": "[PORT] run [DIRECTION] for [VALUE] [UNIT]",
      "spikeprime.motorRunToPosition": "[PORT] run to position [POSITION] degrees",
      "spikeprime.motorStart": "[PORT] start motor [DIRECTION]",
      "spikeprime.motorStop": "[PORT] stop motor",
      "spikeprime.motorSetSpeed": "[PORT] set speed to [SPEED] %",
      "spikeprime.motorSetStopAction": "[PORT] set stop action to [ACTION]",
      "spikeprime.getPosition": "[PORT] position",
      "spikeprime.getRelativePosition": "[PORT] relative position",
      "spikeprime.getAbsolutePosition": "[PORT] absolute position",
      "spikeprime.getSpeed": "[PORT] speed (deg/s)",
      "spikeprime.resetMotorPosition": "reset [PORT] motor position to [POSITION]",
      "spikeprime.displayText": "write [TEXT]",
      "spikeprime.displayImage": "turn on [MATRIX]",
      "spikeprime.displayPattern": "display pattern [PATTERN]",
      "spikeprime.displayClear": "turn off pixels",
      "spikeprime.setPixel": "set pixel [X] [Y] to [BRIGHTNESS] %",
      "spikeprime.rotateDisplay": "rotate display [ANGLE] degrees",
      "spikeprime.setCenterButtonColor": "set center button to [COLOR]",
      "spikeprime.getAngle": "[AXIS] angle",
      "spikeprime.getGyroRate": "gyro rate [AXIS] (deg/s)",
      "spikeprime.getFilteredGyroRate": "filtered gyro rate [AXIS] (deg/s)",
      "spikeprime.getAcceleration": "acceleration [AXIS] (milli-g)",
      "spikeprime.getFilteredAcceleration": "filtered acceleration [AXIS] (milli-g)",
      "spikeprime.resetYaw": "reset yaw angle",
      "spikeprime.presetYaw": "preset yaw to [ANGLE] degrees",
      "spikeprime.setMatrix3x3ColorGrid": "set [PORT] 3x3 colors: [P1][P2][P3] [P4][P5][P6] [P7][P8][P9]",
      "spikeprime.setMatrix3x3BrightnessGrid": "set [PORT] 3x3 brightness: [B1][B2][B3] [B4][B5][B6] [B7][B8][B9]",
      "spikeprime.setMatrix3x3PixelEmoji": "set [PORT] 3x3 pixel [X],[Y] to [COLOR] brightness [BRIGHTNESS]",
      "spikeprime.setMatrix3x3Custom": "set [PORT] 3x3 custom pattern [PATTERN]",
      "spikeprime.generateMatrix3x3Code": "generate 3x3 code for pattern [PATTERN]",
      "spikeprime.setMatrix3x3SolidColor": "set [PORT] 3x3 matrix all [COLOR] brightness [BRIGHTNESS]",
      "spikeprime.setMatrix3x3Level": "set [PORT] 3x3 battery level to [LEVEL]",
      "spikeprime.setMatrix3x3Transition": "set [PORT] 3x3 transition [EFFECT]",
      "spikeprime.clearMatrix3x3": "clear [PORT] 3x3 matrix",
      "spikeprime.whenGesture": "when hub [GESTURE]",
      "spikeprime.isGesture": "hub [GESTURE]?",
      "spikeprime.getOrientation": "orientation",
      "spikeprime.playHubSound": "play hub sound [SOUND]",
      "spikeprime.playBeep": "beep [FREQUENCY] Hz for [DURATION] ms",
      "spikeprime.playNote": "play note [NOTE] for [SECS] seconds",
      "spikeprime.playWaveBeep": "beep [WAVEFORM] [FREQUENCY] Hz for [DURATION] ms",
      "spikeprime.setVolume": "set volume to [VOLUME]%",
      "spikeprime.stopSound": "stop all sounds",
      "spikeprime.getBatteryLevel": "battery level %",
      "spikeprime.getBatteryTemperature": "battery temperature",
      "spikeprime.getHubTemperature": "hub temperature",
      "spikeprime.getTimer": "timer",
      "spikeprime.resetTimer": "reset timer",
      "spikeprime.getDistance": "[PORT] distance",
      "spikeprime.setDistanceLights": "set [PORT] distance lights [TL] [TR] [BL] [BR]",
      "spikeprime.getColor": "[PORT] color",
      "spikeprime.getReflection": "[PORT] reflection",
      "spikeprime.getAmbientLight": "[PORT] ambient light",
      "spikeprime.getForce": "[PORT] force",
      "spikeprime.isForceSensorPressed": "[PORT] force sensor pressed?",
      "spikeprime.whenColor": "when [PORT] sees [COLOR]",
      "spikeprime.isColor": "[PORT] sees [COLOR]?",
      "spikeprime.whenForceSensor": "when [PORT] is [STATE]",
      "spikeprime.isButtonPressed": "[BUTTON] button pressed?",
      "spikeprime.whenButtonPressed": "when [BUTTON] button pressed",
      "spikeprime.runReplCommand": "run Python REPL: [CODE]",
      "spikeprime.getReplOutput": "REPL output",
      "spikeprime.clearReplOutput": "clear REPL output",
      "spikeprime.getReplHistory": "REPL command [INDEX]",
      "spikeprime.runPythonCommand": "run Python: [CODE]",
      "spikeprime.runHubCommand": "run hub command: [CODE]",
      "spikeprime.exitScript": "exit Python script"
    },
    "de": {
      "spikeprime.title": "SPIKE Prime Ultimate",
      "spikeprime.setMovementMotors": "setze Bewegungsmotoren [PORT_A] und [PORT_B]",
      "spikeprime.moveForward": "bewege [DIRECTION] für [VALUE] [UNIT]",
      "spikeprime.steer": "starte Lenkung [STEERING]",
      "spikeprime.startTank": "starte Panzerfahrt links [LEFT_SPEED] rechts [RIGHT_SPEED]",
      "spikeprime.setMovementSpeed": "setze Bewegungsgeschwindigkeit auf [SPEED]%",
      "spikeprime.stopMovement": "stoppe Bewegung",
      "spikeprime.motorRunFor": "[PORT] drehe [DIRECTION] für [VALUE] [UNIT]",
      "spikeprime.motorRunToPosition": "[PORT] drehe zu Position [POSITION] Grad",
      "spikeprime.motorStart": "[PORT] starte Motor [DIRECTION]",
      "spikeprime.motorStop": "[PORT] stoppe Motor",
      "spikeprime.motorSetSpeed": "[PORT] setze Geschwindigkeit auf [SPEED] %",
      "spikeprime.motorSetStopAction": "[PORT] setze Stopp-Aktion auf [ACTION]",
      "spikeprime.getPosition": "[PORT] Position",
      "spikeprime.getRelativePosition": "[PORT] relative Position",
      "spikeprime.getAbsolutePosition": "[PORT] absolute Position",
      "spikeprime.getSpeed": "[PORT] Geschwindigkeit (Grad/s)",
      "spikeprime.resetMotorPosition": "setze [PORT] Motorposition auf [POSITION] zurück",
      "spikeprime.displayText": "schreibe [TEXT]",
      "spikeprime.displayImage": "schalte [MATRIX] ein",
      "spikeprime.displayPattern": "zeige Muster [PATTERN]",
      "spikeprime.displayClear": "schalte Pixel aus",
      "spikeprime.setPixel": "setze Pixel [X] [Y] auf [BRIGHTNESS] %",
      "spikeprime.rotateDisplay": "drehe Display [ANGLE] Grad",
      "spikeprime.setCenterButtonColor": "setze mittleren Knopf auf [COLOR]",
      "spikeprime.getAngle": "[AXIS] Winkel",
      "spikeprime.getGyroRate": "Gyroskop-Rate [AXIS] (Grad/s)",
      "spikeprime.getFilteredGyroRate": "gefilterte Gyroskop-Rate [AXIS] (Grad/s)",
      "spikeprime.getAcceleration": "Beschleunigung [AXIS] (Milli-g)",
      "spikeprime.getFilteredAcceleration": "gefilterte Beschleunigung [AXIS] (Milli-g)",
      "spikeprime.resetYaw": "setze Gier-Winkel zurück",
      "spikeprime.presetYaw": "setze Gier-Winkel auf [ANGLE] Grad",
      "spikeprime.setMatrix3x3ColorGrid": "setze [PORT] 3x3 Farben: [P1][P2][P3] [P4][P5][P6] [P7][P8][P9]",
      "spikeprime.setMatrix3x3BrightnessGrid": "setze [PORT] 3x3 Helligkeit: [B1][B2][B3] [B4][B5][B6] [B7][B8][B9]",
      "spikeprime.setMatrix3x3PixelEmoji": "setze [PORT] 3x3 Pixel [X],[Y] auf [COLOR] Helligkeit [BRIGHTNESS]",
      "spikeprime.setMatrix3x3Custom": "setze [PORT] 3x3 benutzerdefiniertes Muster [PATTERN]",
      "spikeprime.generateMatrix3x3Code": "generiere 3x3 Code für Muster [PATTERN]",
      "spikeprime.setMatrix3x3SolidColor": "setze [PORT] 3x3 Matrix alle [COLOR] Helligkeit [BRIGHTNESS]",
      "spikeprime.setMatrix3x3Level": "setze [PORT] 3x3 Batteriestand auf [LEVEL]",
      "spikeprime.setMatrix3x3Transition": "setze [PORT] 3x3 Übergang [EFFECT]",
      "spikeprime.clearMatrix3x3": "lösche [PORT] 3x3 Matrix",
      "spikeprime.whenGesture": "wenn Hub [GESTURE]",
      "spikeprime.isGesture": "Hub [GESTURE]?",
      "spikeprime.getOrientation": "Ausrichtung",
      "spikeprime.playHubSound": "spiele Hub-Sound [SOUND]",
      "spikeprime.playBeep": "piepse [FREQUENCY] Hz für [DURATION] ms",
      "spikeprime.playNote": "spiele Note [NOTE] für [SECS] Sekunden",
      "spikeprime.playWaveBeep": "piepse [WAVEFORM] [FREQUENCY] Hz für [DURATION] ms",
      "spikeprime.setVolume": "setze Lautstärke auf [VOLUME]%",
      "spikeprime.stopSound": "stoppe alle Sounds",
      "spikeprime.getBatteryLevel": "Batteriestand %",
      "spikeprime.getBatteryTemperature": "Batterietemperatur",
      "spikeprime.getHubTemperature": "Hub-Temperatur",
      "spikeprime.getTimer": "Timer",
      "spikeprime.resetTimer": "setze Timer zurück",
      "spikeprime.getDistance": "[PORT] Entfernung",
      "spikeprime.setDistanceLights": "setze [PORT] Entfernungslichter [TL] [TR] [BL] [BR]",
      "spikeprime.getColor": "[PORT] Farbe",
      "spikeprime.getReflection": "[PORT] Reflexion",
      "spikeprime.getAmbientLight": "[PORT] Umgebungslicht",
      "spikeprime.getForce": "[PORT] Kraft",
      "spikeprime.isForceSensorPressed": "[PORT] Kraftsensor gedrückt?",
      "spikeprime.whenColor": "wenn [PORT] sieht [COLOR]",
      "spikeprime.isColor": "[PORT] sieht [COLOR]?",
      "spikeprime.whenForceSensor": "wenn [PORT] ist [STATE]",
      "spikeprime.isButtonPressed": "[BUTTON] Knopf gedrückt?",
      "spikeprime.whenButtonPressed": "wenn [BUTTON] Knopf gedrückt",
      "spikeprime.runReplCommand": "führe Python REPL aus: [CODE]",
      "spikeprime.getReplOutput": "REPL Ausgabe",
      "spikeprime.clearReplOutput": "lösche REPL Ausgabe",
      "spikeprime.getReplHistory": "REPL Befehl [INDEX]",
      "spikeprime.runPythonCommand": "führe Python aus: [CODE]",
      "spikeprime.runHubCommand": "führe Hub-Befehl aus: [CODE]",
      "spikeprime.exitScript": "beende Python-Skript",
      "spikeprime.menu.direction.forward": "vorwärts",
      "spikeprime.menu.direction.backward": "rückwärts",
      "spikeprime.menu.moveUnit.cm": "cm",
      "spikeprime.menu.moveUnit.in": "Zoll",
      "spikeprime.menu.moveUnit.rotations": "Umdrehungen",
      "spikeprime.menu.moveUnit.degrees": "Grad",
      "spikeprime.menu.moveUnit.seconds": "Sekunden",
      "spikeprime.menu.stopAction.coast": "ausrollen",
      "spikeprime.menu.stopAction.brake": "bremsen",
      "spikeprime.menu.stopAction.hold": "halten",
      "spikeprime.menu.color.red": "rot",
      "spikeprime.menu.color.green": "grün",
      "spikeprime.menu.color.blue": "blau",
      "spikeprime.menu.color.yellow": "gelb",
      "spikeprime.menu.color.cyan": "cyan",
      "spikeprime.menu.color.magenta": "magenta",
      "spikeprime.menu.color.white": "weiß",
      "spikeprime.menu.color.black": "schwarz",
      "spikeprime.menu.forceState.pressed": "gedrückt",
      "spikeprime.menu.forceState.hardPressed": "fest gedrückt",
      "spikeprime.menu.forceState.released": "losgelassen",
      "spikeprime.menu.button.left": "links",
      "spikeprime.menu.button.center": "mitte",
      "spikeprime.menu.button.right": "rechts",
      "spikeprime.menu.button.connect": "verbinden",
      "spikeprime.menu.gesture.tapped": "angetippt",
      "spikeprime.menu.gesture.doubletapped": "doppelt angetippt",
      "spikeprime.menu.gesture.shake": "geschüttelt",
      "spikeprime.menu.gesture.freefall": "freier Fall",
      "spikeprime.menu.waveform.sin": "Sinus",
      "spikeprime.menu.waveform.square": "Rechteck",
      "spikeprime.menu.waveform.triangle": "Dreieck",
      "spikeprime.menu.waveform.sawtooth": "Sägezahn"
    },
    "fr": {
      "spikeprime.title": "SPIKE Prime Ultimate",
      "spikeprime.setMovementMotors": "définir moteurs de mouvement [PORT_A] et [PORT_B]",
      "spikeprime.moveForward": "avancer [DIRECTION] pendant [VALUE] [UNIT]",
      "spikeprime.steer": "commencer direction [STEERING]",
      "spikeprime.startTank": "commencer conduite chenilles gauche [LEFT_SPEED] droite [RIGHT_SPEED]",
      "spikeprime.setMovementSpeed": "définir vitesse de mouvement à [SPEED]%",
      "spikeprime.stopMovement": "arrêter mouvement",
      "spikeprime.motorRunFor": "[PORT] tourner [DIRECTION] pendant [VALUE] [UNIT]",
      "spikeprime.motorRunToPosition": "[PORT] tourner à position [POSITION] degrés",
      "spikeprime.motorStart": "[PORT] démarrer moteur [DIRECTION]",
      "spikeprime.motorStop": "[PORT] arrêter moteur",
      "spikeprime.motorSetSpeed": "[PORT] définir vitesse à [SPEED] %",
      "spikeprime.motorSetStopAction": "[PORT] définir action d'arrêt à [ACTION]",
      "spikeprime.getPosition": "[PORT] position",
      "spikeprime.getRelativePosition": "[PORT] position relative",
      "spikeprime.getAbsolutePosition": "[PORT] position absolue",
      "spikeprime.getSpeed": "[PORT] vitesse (deg/s)",
      "spikeprime.resetMotorPosition": "remettre position moteur [PORT] à [POSITION]",
      "spikeprime.displayText": "écrire [TEXT]",
      "spikeprime.displayImage": "allumer [MATRIX]",
      "spikeprime.displayPattern": "afficher motif [PATTERN]",
      "spikeprime.displayClear": "éteindre pixels",
      "spikeprime.setPixel": "définir pixel [X] [Y] à [BRIGHTNESS] %",
      "spikeprime.rotateDisplay": "tourner affichage [ANGLE] degrés",
      "spikeprime.setCenterButtonColor": "définir bouton central à [COLOR]",
      "spikeprime.getAngle": "angle [AXIS]",
      "spikeprime.getGyroRate": "taux gyroscope [AXIS] (deg/s)",
      "spikeprime.getFilteredGyroRate": "taux gyroscope filtré [AXIS] (deg/s)",
      "spikeprime.getAcceleration": "accélération [AXIS] (milli-g)",
      "spikeprime.getFilteredAcceleration": "accélération filtrée [AXIS] (milli-g)",
      "spikeprime.resetYaw": "remettre angle de lacet",
      "spikeprime.presetYaw": "prédéfinir lacet à [ANGLE] degrés",
      "spikeprime.setMatrix3x3ColorGrid": "définir [PORT] 3x3 couleurs: [P1][P2][P3] [P4][P5][P6] [P7][P8][P9]",
      "spikeprime.setMatrix3x3BrightnessGrid": "définir [PORT] 3x3 luminosité: [B1][B2][B3] [B4][B5][B6] [B7][B8][B9]",
      "spikeprime.setMatrix3x3PixelEmoji": "définir [PORT] 3x3 pixel [X],[Y] à [COLOR] luminosité [BRIGHTNESS]",
      "spikeprime.setMatrix3x3Custom": "définir [PORT] 3x3 motif personnalisé [PATTERN]",
      "spikeprime.generateMatrix3x3Code": "générer code 3x3 pour motif [PATTERN]",
      "spikeprime.setMatrix3x3SolidColor": "définir [PORT] 3x3 matrice tout [COLOR] luminosité [BRIGHTNESS]",
      "spikeprime.setMatrix3x3Level": "définir [PORT] 3x3 niveau batterie à [LEVEL]",
      "spikeprime.setMatrix3x3Transition": "définir [PORT] 3x3 transition [EFFECT]",
      "spikeprime.clearMatrix3x3": "effacer [PORT] 3x3 matrice",
      "spikeprime.whenGesture": "quand hub [GESTURE]",
      "spikeprime.isGesture": "hub [GESTURE]?",
      "spikeprime.getOrientation": "orientation",
      "spikeprime.playHubSound": "jouer son hub [SOUND]",
      "spikeprime.playBeep": "biper [FREQUENCY] Hz pendant [DURATION] ms",
      "spikeprime.playNote": "jouer note [NOTE] pendant [SECS] secondes",
      "spikeprime.playWaveBeep": "biper [WAVEFORM] [FREQUENCY] Hz pendant [DURATION] ms",
      "spikeprime.setVolume": "définir volume à [VOLUME]%",
      "spikeprime.stopSound": "arrêter tous les sons",
      "spikeprime.getBatteryLevel": "niveau batterie %",
      "spikeprime.getBatteryTemperature": "température batterie",
      "spikeprime.getHubTemperature": "température hub",
      "spikeprime.getTimer": "minuteur",
      "spikeprime.resetTimer": "remettre minuteur",
      "spikeprime.getDistance": "[PORT] distance",
      "spikeprime.setDistanceLights": "définir [PORT] lumières distance [TL] [TR] [BL] [BR]",
      "spikeprime.getColor": "[PORT] couleur",
      "spikeprime.getReflection": "[PORT] réflexion",
      "spikeprime.getAmbientLight": "[PORT] lumière ambiante",
      "spikeprime.getForce": "[PORT] force",
      "spikeprime.isForceSensorPressed": "[PORT] capteur force pressé?",
      "spikeprime.whenColor": "quand [PORT] voit [COLOR]",
      "spikeprime.isColor": "[PORT] voit [COLOR]?",
      "spikeprime.whenForceSensor": "quand [PORT] est [STATE]",
      "spikeprime.isButtonPressed": "bouton [BUTTON] pressé?",
      "spikeprime.whenButtonPressed": "quand bouton [BUTTON] pressé",
      "spikeprime.runReplCommand": "exécuter Python REPL: [CODE]",
      "spikeprime.getReplOutput": "sortie REPL",
      "spikeprime.clearReplOutput": "effacer sortie REPL",
      "spikeprime.getReplHistory": "commande REPL [INDEX]",
      "spikeprime.runPythonCommand": "exécuter Python: [CODE]",
      "spikeprime.runHubCommand": "exécuter commande hub: [CODE]",
      "spikeprime.exitScript": "quitter script Python"
    }
  };
  // note: This extension supports LEGO Education SPIKE Prime Hub / Robot Inventor Hub
  // with v. 2 firmware (legacy), which usese bluetooth classic (not ble)!
  // you can switch firmwares by running *upgrade* from spike prime app (then you must use another extension which supports ble),
  // or *downgrade* https://spikelegacy.legoeducation.com/hubdowngrade/#step-1
  // or you can use dfu-utils to exchange firmware to a v.2.x one: https://github.com/gpdaniels/spike-prime/
  // so that you can use *this* (bluetooth classic) extension here
  var blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAASKG51AAAEUUlEQVR4Ae2cTWgTURDHZxORatUeFLUeqtaThSDFHopQ1HoQhB4LigjWq3pTEbUXK+LHUb2qICrYkwiCF7UUpYdq0UA9iFVbaFXqoWq1CMm6/022SZNsnsmb3X2kM7Dp5s17k5lf5r15KewjEhECQkAICAEhIASEgBBYjAQs7qB7r9zvoLR90rbtNsd2I7f9Ku1NWZY1TDHrat+pA4NV2ig5jBVg76W7Z2yyLpBts9ot6XkVjY5TabKot+/0wYtVDC85hC1QN/NS6efxeDzW2ZGg1kQzraivK/mhYTf+mp2jkeQYPR1MUiqVSlM8tosrE2NswWDaErnwOtpbjIGH+PBFwid8sfARSwxX3GwAs2uem3lcznHbwayAeL5y2F/CYSRrwy0YUU3b77NEt4aIkpMZbxIbiHraiVbX5yLM842tuHECzHka8h3gHe8n+jmX++CB90SvJ4iudS+EmOvBc8c2hXncqc4KMg/w2pqIbh/KXLhHG3RBSk0A9KbtsZ2ZbMO0xT3E02Xe8b/WBEB+LP9vsSYAomBArg8QYT3EhXuIp8u843+tiSKCaouCMTxOdPhODtJKZx8PXZBSEwCx5qHaqrYxQYCsCYAAA4gn9gSBqLzNmlgDy4cYrFYAavKNfgqPFvxDqMX5uV9OKu1fzhaDTjJQE6IAFICaBDSHR78Gqta8wgAr7V84nvm9TGFNoOFloF/1DLpdE5BquGSgipBCLwAVgFRqAagipNCHtwb6Vc+g2xUAdNWSgZoEw8vAoKutn31NQKrhkoEqQgq9AFQAUqkFoIqQQh/eGhh0tfWzrwCgq5YM1CQYXgb6OepXPStt97MfcLtkoCZgASgANQloDo9+DfSrnpW2a4KodrhM4WrJZcdFn4F+AfhVYb/+EbVLBmqCF4ACUJOA5nBz10C/KqwZMPdwmcKaRAWgANQkoDncyDXw1ZsPhOvb9Iwb3to1DbR92xb30oyXfbhRAPFYav+jlzT26cuCQCcmpwnX23efqbtrh1FPghoF0IPXsGo57d3dSpub1rkgP45/pSfPRlyw6NOzv3MB4CjfGFNEMGWReYB39Mg+Smzd6GYanrDEPdqgQx/0NUWMAggoyLxldUuL+KANOogALMJD8wXDm7YlusxPaa+4lOoTdpsxGRh24FyfZwxAbFUgKBh+4um8vn79wmw3BiD2eRBU2z9zf4sYoA06iNe3qFMEDUYBbN60nmZ+/KYbNx9T0tnzYV+IC/dogw59TAJo1D4Qm2RvL/jg4YuifAI89DFJOAFOOYE1ImPyTseoKFaMwyYZ2xRcXrXl+ikH37ICX1mEDSDOpnLOY+nCCUE45EZHgvrdC98g7jlaOg7mjeVbA52DvZzHBtM4XmlwaNRdu/I+J9JbZB58gm/wEYeQcTlU8Kikntlzl++dtdL2efd4JT1TgYx24Zl6+JgX8WI7/s6LW/4KASEgBISAEBACQkAILC4C/wDBL1fytvgQdgAAAABJRU5ErkJggg==';
  var formatMessage = function formatMessage(messageData) {
    return messageData.defaultMessage;
  };
  var extensionURL = 'https://cdn.jsdelivr.net/gh/CrispStrobe/scratch-lego-bluetooth-extensions@master/dist/spikeprime_btc.mjs';
  // Translation setup function
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
  var BTSendRateMax = 40;
  var SpikePorts = ['A', 'B', 'C', 'D', 'E', 'F'];
  var SpikeMotorStopMode = {
    float: 0,
    brake: 1,
    hold: 2
  };
  var SpikeOrientation = {
    front: 1,
    back: 2,
    up: 3,
    down: 4,
    rightside: 5,
    leftside: 6
  };
  // Built-in sound files
  var HubSoundFiles = ['menu_click', 'menu_fastback', 'menu_program_start', 'menu_program_stop', 'menu_shutdown', 'startup'];
  var ColorEmojiMap = {
    '⚫': 0,
    // off
    '🟣': 1,
    // magenta
    '🟪': 2,
    // violet
    '🔵': 3,
    // blue
    '🔷': 4,
    // turquoise
    '🟢': 5,
    // mint
    '🟩': 6,
    // green
    '🟡': 7,
    // yellow
    '🟠': 8,
    // orange
    '🔴': 9,
    // red
    '⚪': 10 // white
  };
  // Display patterns as matrices
  var DisplayPatterns = {
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
  // LED colors for center button
  var CenterLEDColors = {
    OFF: 0,
    PINK: 1,
    PURPLE: 2,
    BLUE: 3,
    TEAL: 4,
    GREEN: 5,
    LIME: 6,
    YELLOW: 7,
    ORANGE: 8,
    RED: 9,
    WHITE: 10,
    GREY: 11
  };
  // Sound waveforms
  var SoundWaveforms = {
    sin: 'hub.sound.SOUND_SIN',
    square: 'hub.sound.SOUND_SQUARE',
    triangle: 'hub.sound.SOUND_TRIANGLE',
    sawtooth: 'hub.sound.SOUND_SAWTOOTH'
  };
  // [SpikePrime class and SpikeMotorSetting class implementations remain unchanged - omitted for brevity]
  var SpikeMotorSetting = /*#__PURE__*/function () {
    function SpikeMotorSetting() {
      _classCallCheck(this, SpikeMotorSetting);
      this._speed = 75;
      this._stopMode = SpikeMotorStopMode.brake;
      this._stallDetection = true;
    }
    return _createClass(SpikeMotorSetting, [{
      key: "speed",
      get: function get() {
        return this._speed;
      },
      set: function set(value) {
        this._speed = MathUtil.clamp(value, -100, 100);
      }
    }, {
      key: "stopMode",
      get: function get() {
        return this._stopMode;
      },
      set: function set(value) {
        if (value >= 0 && value <= 2) this._stopMode = value;
      }
    }, {
      key: "stallDetection",
      get: function get() {
        return this._stallDetection;
      },
      set: function set(value) {
        this._stallDetection = value;
      }
    }]);
  }();
  var SpikePrime = /*#__PURE__*/function () {
    function SpikePrime(runtime, extensionId) {
      var _this = this;
      _classCallCheck(this, SpikePrime);
      this._runtime = runtime;
      this._extensionId = extensionId;
      this._remainingText = '';
      this._sensors = {
        buttons: [0, 0, 0, 0],
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
        accelerationFiltered: {
          x: 0,
          y: 0,
          z: 0
        },
        gyro: {
          x: 0,
          y: 0,
          z: 0
        },
        gyroFiltered: {
          x: 0,
          y: 0,
          z: 0
        },
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
      this._timer = {
        start: Date.now(),
        current: 0
      };
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
      setInterval(function () {
        _this._timer.current = (Date.now() - _this._timer.start) / 1000;
      }, 10);
    }
    // Getters
    return _createClass(SpikePrime, [{
      key: "angle",
      get: function get() {
        return this._sensors.angle;
      }
    }, {
      key: "orientation",
      get: function get() {
        return this._sensors.orientation;
      }
    }, {
      key: "portValues",
      get: function get() {
        return this._portValues;
      }
    }, {
      key: "pixelBrightness",
      get: function get() {
        return this._pixelBrightness;
      },
      set: function set(value) {
        this._pixelBrightness = value;
      }
    }, {
      key: "motorSettings",
      get: function get() {
        return this._motorSettings;
      }
    }, {
      key: "acceleration",
      get: function get() {
        return this._sensors.acceleration;
      }
    }, {
      key: "accelerationFiltered",
      get: function get() {
        return this._sensors.accelerationFiltered;
      }
    }, {
      key: "gyro",
      get: function get() {
        return this._sensors.gyro;
      }
    }, {
      key: "gyroFiltered",
      get: function get() {
        return this._sensors.gyroFiltered;
      }
    }, {
      key: "battery",
      get: function get() {
        return this._sensors.battery;
      }
    }, {
      key: "temperature",
      get: function get() {
        return this._sensors.temperature;
      }
    }, {
      key: "hubTemp",
      get: function get() {
        return this._sensors.hubTemp;
      }
    }, {
      key: "gestures",
      get: function get() {
        return this._sensors.gestures;
      }
    }, {
      key: "movementMotors",
      get: function get() {
        return this._movementMotors;
      }
    }, {
      key: "timer",
      get: function get() {
        return this._timer.current;
      }
    }, {
      key: "volume",
      get: function get() {
        return this._volume;
      }
    }, {
      key: "replOutput",
      get: function get() {
        return this._replOutput;
      }
    }, {
      key: "replHistory",
      get: function get() {
        return this._replHistory;
      }
    }, {
      key: "beep",
      value: function beep(freq, time) {
        //console.log(`freq: ${freq}, time: ${time}`);
      }
    }, {
      key: "stopAll",
      value: function stopAll() {
        this.stopAllMotors();
        this.stopSound();
      }
    }, {
      key: "stopSound",
      value: function stopSound() {
        this.sendPythonCommand('import hub; hub.sound.stop()');
      }
    }, {
      key: "stopAllMotors",
      value: function stopAllMotors() {
        this.sendPythonCommand('import hub; [hub.port[p].motor.stop() for p in "ABCDEF" if hasattr(hub.port[p], "motor")]');
      }
    }, {
      key: "scan",
      value: function scan() {
        if (this._bt) {
          this._bt.disconnect();
        }
        this._bt = new BT(this._runtime, this._extensionId, {
          majorDeviceClass: 8,
          minorDeviceClass: 1
        }, this._onConnect, this.reset, this._onMessage);
      }
    }, {
      key: "connect",
      value: function connect(id) {
        if (this._bt) {
          this._bt.connectPeripheral(id);
        }
      }
    }, {
      key: "disconnect",
      value: function disconnect() {
        if (this._bt) {
          this._bt.disconnect();
        }
        this.reset();
      }
    }, {
      key: "reset",
      value: function reset() {
        this._remainingText = '';
        this._sensors = {
          buttons: [0, 0, 0, 0],
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
          accelerationFiltered: {
            x: 0,
            y: 0,
            z: 0
          },
          gyro: {
            x: 0,
            y: 0,
            z: 0
          },
          gyroFiltered: {
            x: 0,
            y: 0,
            z: 0
          },
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
        this._pythonAvailable = false;
        this._sensorLoopRunning = false;
        // Reset timer and REPL
        this._timer.start = Date.now();
        this._timer.current = 0;
        this._replOutput = '';
        this._replHistory = [];
        this._replVariables = {};
      }
    }, {
      key: "isConnected",
      value: function isConnected() {
        var connected = false;
        if (this._bt) {
          connected = this._bt.isConnected();
        }
        return connected;
      }
      // Sends a JSON-RPC command (for built-in functions)
    }, {
      key: "sendJSON",
      value: function sendJSON(json) {
        var useLimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var jsonText = JSON.stringify(json);
        return this.sendRaw("".concat(jsonText, "\r"), useLimiter, json.i);
      }
      // Sends a raw string (for Python REPL commands)
    }, {
      key: "sendRaw",
      value: function sendRaw(text) {
        var _this2 = this;
        var useLimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        if (!this.isConnected()) return Promise.resolve();
        if (useLimiter) {
          if (!this._rateLimiter.okayToSend()) return Promise.resolve();
        }
        if (!id) {
          return this._bt.sendMessage({
            message: text
          });
        }
        var promise = new Promise(function (resolve, reject) {
          _this2._openRequests[id] = {
            resolve: resolve,
            reject: reject
          };
        });
        this._bt.sendMessage({
          message: text
        });
        return promise;
      }
    }, {
      key: "sendCommand",
      value: function sendCommand(method, params) {
        var needsResponse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        if (needsResponse) {
          var id = Math.random().toString(36).slice(-4);
          return this.sendJSON({
            i: id,
            m: method,
            p: params
          });
        }
        return this.sendJSON({
          m: method,
          p: params
        });
      }
      // Send raw Python code to the REPL
    }, {
      key: "sendPythonCommand",
      value: function sendPythonCommand(pythonCode) {
        return this.sendRaw("".concat(pythonCode, "\r\n"));
      }
      // REPL-specific command that captures output
    }, {
      key: "sendReplCommand",
      value: function sendReplCommand(pythonCode) {
        this._replHistory.push(pythonCode);
        if (this._replHistory.length > 50) {
          this._replHistory.shift(); // Keep only last 50 commands
        }
        // Wrap command to capture output
        var wrappedCode = "\ntry:\n    _result = eval(\"".concat(pythonCode.replace(/"/g, '\\"'), "\")\n    if _result is not None:\n        print(f\">>> {_result}\")\n    else:\n        exec(\"").concat(pythonCode.replace(/"/g, '\\"'), "\")\n        print(\">>> Command executed\")\nexcept Exception as e:\n    print(f\">>> Error: {e}\")\n");
        return this.sendPythonCommand(wrappedCode);
      }
    }, {
      key: "_onConnect",
      value: function _onConnect() {
        var _this3 = this;
        // Send Ctrl-C to interrupt any running program and enter the REPL
        this.sendRaw('\x03');
        setTimeout(function () {
          // Attempt to confirm Python REPL is active
          _this3.sendRaw('import hub\r\nprint("PYTHON_AVAILABLE")\r\n');
          // Re-request initial state data
          _this3.sendCommand('trigger_current_state', {}, false);
        }, 250); // Delay to allow the hub to switch to REPL mode
      }
      // Start continuous sensor monitoring
    }, {
      key: "_initializeContinuousSensorMonitoring",
      value: function _initializeContinuousSensorMonitoring() {
        if (!this._pythonAvailable || this._sensorLoopRunning) return;
        this._sensorLoopRunning = true;
        console.log("Starting continuous sensor monitoring script on hub...");
        var sensorScript = "\nimport hub, utime, sys\ndef continuous_sensor_loop():\n    while True:\n        try:\n            # Motion sensors\n            yaw_angle, pitch_angle, roll_angle = hub.motion.position()\n            accel_x, accel_y, accel_z = hub.motion.accelerometer()\n            orientation = hub.motion.orientation()\n            # Temperatures\n            battery_temp = hub.battery.temperature()\n            hub_temp = hub.temperature()\n            # Motor data\n            motor_data = {}\n            for port in 'ABCDEF':\n                if hasattr(hub.port[port], 'motor'):\n                    try:\n                        speed, rel_deg, abs_deg, pwm = hub.port[port].motor.get()\n                        motor_data[port] = f\"{speed},{rel_deg},{abs_deg},{pwm}\"\n                    except: pass\n            motor_str = \"|\".join([f\"{k}:{v}\" for k, v in motor_data.items()])\n            # Print data in a single, parseable line\n            print(f\"SENSORS:{yaw_angle},{pitch_angle},{roll_angle}|{accel_x},{accel_y},{accel_z}|{orientation}|{battery_temp},{hub_temp}|{motor_str}\")\n            # Gesture detection\n            for gesture in ['tapped', 'doubletapped', 'shake', 'freefall']:\n                if hub.motion.was_gesture(gesture):\n                    print(f\"GESTURE:{gesture.upper()}\")\n        except Exception as e:\n            pass # Ignore errors in the loop to keep it running\n        utime.sleep_ms(100)\ncontinuous_sensor_loop()\n";
        // Send the script to the REPL for execution
        this.sendPythonCommand(sensorScript);
      }
    }, {
      key: "_onMessage",
      value: function _onMessage(params) {
        var message = params.message;
        var data = Base64Util.base64ToUint8Array(message);
        var text = new TextDecoder().decode(data);
        var responses = (this._remainingText + text).split('\r\n');
        this._remainingText = responses.pop();
        var _iterator = _createForOfIteratorHelper(responses),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var responseText = _step.value;
            var trimmedText = responseText.trim();
            if (!trimmedText) continue;
            // First, try to parse as JSON (for standard hub responses)
            try {
              var json = JSON.parse(trimmedText);
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
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "_parseData",
      value: function _parseData(dataText) {
        var _this4 = this;
        try {
          if (dataText.startsWith('SENSORS:')) {
            var sensorData = dataText.substring(8);
            var parts = sensorData.split('|');
            if (parts.length >= 5) {
              // Angles
              var angles = parts[0].split(',').map(parseFloat);
              if (angles.length === 3) this._sensors.angle = {
                yaw: angles[0],
                pitch: angles[1],
                roll: angles[2]
              };
              // Acceleration
              var accel = parts[1].split(',').map(parseFloat);
              if (accel.length === 3) this._sensors.acceleration = {
                x: accel[0],
                y: accel[1],
                z: accel[2]
              };
              // Orientation
              this._sensors.orientation = parseInt(parts[2], 10);
              // Temperatures
              var temps = parts[3].split(',').map(parseFloat);
              if (temps.length >= 2) {
                this._sensors.temperature = temps[0];
                this._sensors.hubTemp = temps[1];
              }
              // Motor positions
              if (parts[4]) {
                var motorPairs = parts[4].split('|');
                var _iterator2 = _createForOfIteratorHelper(motorPairs),
                  _step2;
                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    var pair = _step2.value;
                    var _pair$split = pair.split(':'),
                      _pair$split2 = _slicedToArray(_pair$split, 2),
                      port = _pair$split2[0],
                      values = _pair$split2[1];
                    if (port && values) {
                      var _values$split$map = values.split(',').map(parseFloat),
                        _values$split$map2 = _slicedToArray(_values$split$map, 4),
                        speed = _values$split$map2[0],
                        relDeg = _values$split$map2[1],
                        absDeg = _values$split$map2[2],
                        pwm = _values$split$map2[3];
                      this._sensors.motorPositions[port] = {
                        speed: speed,
                        relativePosition: relDeg,
                        absolutePosition: absDeg,
                        power: pwm
                      };
                    }
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
              }
            }
          } else if (dataText.startsWith('GESTURE:')) {
            var gesture = dataText.substring(8).toLowerCase();
            if (this._sensors.gestures.hasOwnProperty(gesture)) {
              this._sensors.gestures[gesture] = true;
              setTimeout(function () {
                _this4._sensors.gestures[gesture] = false;
              }, 100);
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
    }, {
      key: "_parseResponse",
      value: function _parseResponse(response) {
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
          }
        }
        if (response.hasOwnProperty('i')) {
          var openRequest = this._openRequests[response.i];
          delete this._openRequests[response.i];
          if (openRequest) {
            openRequest.resolve();
          }
        }
      }
    }, {
      key: "_parseHubStatus",
      value: function _parseHubStatus(response) {
        // Enhanced port parsing with more sensor types
        for (var i = 0; i < 6; i++) {
          var port = SpikePorts[i];
          var deviceId = response.p[i][0];
          var values = response.p[i][1];
          switch (deviceId) {
            case 48: // Large motor
            case 49:
              // Medium motor
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
            case 61:
              // Color sensor
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
            case 62:
              // Distance sensor
              this._portValues[port] = {
                type: 'distance',
                distance: values[0] === -1 ? 0 : values[0]
              };
              break;
            case 63:
              // Force sensor
              this._portValues[port] = {
                type: 'force',
                force: values[0],
                pressed: values[1] > 0
              };
              break;
            default:
              this._portValues[port] = {
                type: 'unknown'
              };
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
    }, {
      key: "_parseButtonEvent",
      value: function _parseButtonEvent(response) {
        if (response.p && response.p.length >= 2) {
          var button = response.p[0];
          var pressed = response.p[1] === 1;
          var buttonIndex = {
            left: 0,
            center: 1,
            right: 2
          }[button];
          if (buttonIndex !== undefined) {
            this._sensors.buttons[buttonIndex] = pressed ? 1 : 0;
          }
        }
      }
    }, {
      key: "_parseEventResponse",
      value: function _parseEventResponse(response) {
        var _this5 = this;
        if (SpikeOrientation.hasOwnProperty(response.p)) {
          this._sensors.orientation = SpikeOrientation[response.p];
        }
        // Enhanced gesture parsing
        var gestureMap = {
          'tapped': 'tapped',
          'doubletapped': 'doubletapped',
          'shake': 'shake',
          'freefall': 'freefall'
        };
        if (gestureMap[response.p]) {
          this._sensors.gestures[gestureMap[response.p]] = true;
          // Reset gesture after short delay
          setTimeout(function () {
            _this5._sensors.gestures[gestureMap[response.p]] = false;
          }, 100);
        }
      }
    }]);
  }();
  var Scratch3SpikePrimeBlocks = /*#__PURE__*/function () {
    function Scratch3SpikePrimeBlocks(runtime) {
      _classCallCheck(this, Scratch3SpikePrimeBlocks);
      this.runtime = runtime;
      this._peripheral = new SpikePrime(this.runtime, Scratch3SpikePrimeBlocks.EXTENSION_ID);
      this._playNoteForPicker = this._playNoteForPicker.bind(this);
      this.runtime.on('PLAY_NOTE', this._playNoteForPicker);
      if (runtime.formatMessage) {
        formatMessage = runtime.formatMessage;
      }
    }
    return _createClass(Scratch3SpikePrimeBlocks, [{
      key: "getInfo",
      value: function getInfo() {
        setupTranslations();
        return {
          id: Scratch3SpikePrimeBlocks.EXTENSION_ID,
          name: formatMessage({
            id: 'spikeprime.title',
            default: 'SPIKE Prime Ultimate'
          }),
          blockIconURI: blockIconURI,
          showStatusButton: true,
          blocks: [
          // ===== MOVEMENT CONTROLS (NEW) =====
          {
            opcode: 'setMovementMotors',
            text: formatMessage({
              id: 'spikeprime.setMovementMotors',
              default: 'set movement motors [PORT_A] and [PORT_B]'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              PORT_A: {
                type: ArgumentType.STRING,
                menu: 'PORT',
                defaultValue: 'A'
              },
              PORT_B: {
                type: ArgumentType.STRING,
                menu: 'PORT',
                defaultValue: 'B'
              }
            }
          }, {
            opcode: 'moveForward',
            text: formatMessage({
              id: 'spikeprime.moveForward',
              default: 'move [DIRECTION] for [VALUE] [UNIT]'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              DIRECTION: {
                type: ArgumentType.STRING,
                menu: 'MOVE_DIRECTION',
                defaultValue: 'forward'
              },
              VALUE: {
                type: ArgumentType.NUMBER,
                defaultValue: 10
              },
              UNIT: {
                type: ArgumentType.STRING,
                menu: 'MOVE_UNIT',
                defaultValue: 'cm'
              }
            }
          }, {
            opcode: 'steer',
            text: formatMessage({
              id: 'spikeprime.steer',
              default: 'start steering [STEERING]'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              STEERING: {
                type: ArgumentType.NUMBER,
                defaultValue: 50
              }
            }
          }, {
            opcode: 'startTank',
            text: formatMessage({
              id: 'spikeprime.startTank',
              default: 'start tank drive left [LEFT_SPEED] right [RIGHT_SPEED]'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              LEFT_SPEED: {
                type: ArgumentType.NUMBER,
                defaultValue: 50
              },
              RIGHT_SPEED: {
                type: ArgumentType.NUMBER,
                defaultValue: 50
              }
            }
          }, {
            opcode: 'setMovementSpeed',
            text: formatMessage({
              id: 'spikeprime.setMovementSpeed',
              default: 'set movement speed to [SPEED]%'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              SPEED: {
                type: ArgumentType.NUMBER,
                defaultValue: 50
              }
            }
          }, {
            opcode: 'stopMovement',
            text: formatMessage({
              id: 'spikeprime.stopMovement',
              default: 'stop movement'
            }),
            blockType: BlockType.COMMAND
          }, '---',
          // ===== MOTOR CONTROL =====
          {
            opcode: 'motorRunFor',
            text: formatMessage({
              id: 'spikeprime.motorRunFor',
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
          }, {
            opcode: 'motorRunToPosition',
            text: formatMessage({
              id: 'spikeprime.motorRunToPosition',
              default: '[PORT] run to position [POSITION] degrees'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              PORT: {
                type: ArgumentType.STRING,
                menu: 'PORT',
                defaultValue: 'C'
              },
              POSITION: {
                type: ArgumentType.ANGLE,
                defaultValue: 0
              }
            }
          }, {
            opcode: 'motorStart',
            text: formatMessage({
              id: 'spikeprime.motorStart',
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
          }, {
            opcode: 'motorStop',
            text: formatMessage({
              id: 'spikeprime.motorStop',
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
          }, {
            opcode: 'motorSetSpeed',
            text: formatMessage({
              id: 'spikeprime.motorSetSpeed',
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
          }, {
            opcode: 'motorSetStopAction',
            text: formatMessage({
              id: 'spikeprime.motorSetStopAction',
              default: '[PORT] set stop action to [ACTION]'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              PORT: {
                type: ArgumentType.STRING,
                menu: 'PORT',
                defaultValue: 'A'
              },
              ACTION: {
                type: ArgumentType.STRING,
                menu: 'STOP_ACTION',
                defaultValue: 'brake'
              }
            }
          }, {
            opcode: 'getPosition',
            text: formatMessage({
              id: 'spikeprime.getPosition',
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
            text: formatMessage({
              id: 'spikeprime.getRelativePosition',
              default: '[PORT] relative position'
            }),
            blockType: BlockType.REPORTER,
            arguments: {
              PORT: {
                type: ArgumentType.STRING,
                menu: 'PORT',
                defaultValue: 'A'
              }
            }
          }, {
            opcode: 'getAbsolutePosition',
            text: formatMessage({
              id: 'spikeprime.getAbsolutePosition',
              default: '[PORT] absolute position'
            }),
            blockType: BlockType.REPORTER,
            arguments: {
              PORT: {
                type: ArgumentType.STRING,
                menu: 'PORT',
                defaultValue: 'A'
              }
            }
          }, {
            opcode: 'getSpeed',
            text: formatMessage({
              id: 'spikeprime.getSpeed',
              default: '[PORT] speed (deg/s)'
            }),
            blockType: BlockType.REPORTER,
            arguments: {
              PORT: {
                type: ArgumentType.STRING,
                menu: 'PORT',
                defaultValue: 'A'
              }
            }
          }, {
            opcode: 'resetMotorPosition',
            text: formatMessage({
              id: 'spikeprime.resetMotorPosition',
              default: 'reset [PORT] motor position to [POSITION]'
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
          }, '---',
          // ===== DISPLAY CONTROL =====
          {
            opcode: 'displayText',
            text: formatMessage({
              id: 'spikeprime.displayText',
              default: 'write [TEXT]'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              TEXT: {
                type: ArgumentType.STRING,
                defaultValue: 'Hello'
              }
            }
          }, {
            opcode: 'displayImage',
            text: formatMessage({
              id: 'spikeprime.displayImage',
              default: 'turn on [MATRIX]'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              MATRIX: {
                type: ArgumentType.MATRIX,
                defaultValue: '1101111011000001000101110'
              }
            }
          }, {
            opcode: 'displayPattern',
            text: formatMessage({
              id: 'spikeprime.displayPattern',
              default: 'display pattern [PATTERN]'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              PATTERN: {
                type: ArgumentType.STRING,
                menu: 'DISPLAY_PATTERN',
                defaultValue: 'heart'
              }
            }
          }, {
            opcode: 'displayClear',
            text: formatMessage({
              id: 'spikeprime.displayClear',
              default: 'turn off pixels'
            }),
            blockType: BlockType.COMMAND
          }, {
            opcode: 'setPixel',
            text: formatMessage({
              id: 'spikeprime.setPixel',
              default: 'set pixel [X] [Y] to [BRIGHTNESS] %'
            }),
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
          }, {
            opcode: 'rotateDisplay',
            text: formatMessage({
              id: 'spikeprime.rotateDisplay',
              default: 'rotate display [ANGLE] degrees'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              ANGLE: {
                type: ArgumentType.STRING,
                menu: 'ROTATION_ANGLE',
                defaultValue: '90'
              }
            }
          }, {
            opcode: 'setCenterButtonColor',
            text: formatMessage({
              id: 'spikeprime.setCenterButtonColor',
              default: 'set center button to [COLOR]'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              COLOR: {
                type: ArgumentType.STRING,
                menu: 'CENTER_LED_COLOR',
                defaultValue: 'GREEN'
              }
            }
          }, '---',
          // ===== IMU & GYRO =====
          {
            opcode: 'getAngle',
            text: formatMessage({
              id: 'spikeprime.getAngle',
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
          }, {
            opcode: 'getGyroRate',
            text: formatMessage({
              id: 'spikeprime.getGyroRate',
              default: 'gyro rate [AXIS] (deg/s)'
            }),
            blockType: BlockType.REPORTER,
            arguments: {
              AXIS: {
                type: ArgumentType.STRING,
                menu: 'AXIS',
                defaultValue: 'yaw'
              }
            }
          }, {
            opcode: 'getFilteredGyroRate',
            text: formatMessage({
              id: 'spikeprime.getFilteredGyroRate',
              default: 'filtered gyro rate [AXIS] (deg/s)'
            }),
            blockType: BlockType.REPORTER,
            arguments: {
              AXIS: {
                type: ArgumentType.STRING,
                menu: 'AXIS',
                defaultValue: 'yaw'
              }
            }
          }, {
            opcode: 'getAcceleration',
            text: formatMessage({
              id: 'spikeprime.getAcceleration',
              default: 'acceleration [AXIS] (milli-g)'
            }),
            blockType: BlockType.REPORTER,
            arguments: {
              AXIS: {
                type: ArgumentType.STRING,
                menu: 'AXIS_XYZ',
                defaultValue: 'x'
              }
            }
          }, {
            opcode: 'getFilteredAcceleration',
            text: formatMessage({
              id: 'spikeprime.getFilteredAcceleration',
              default: 'filtered acceleration [AXIS] (milli-g)'
            }),
            blockType: BlockType.REPORTER,
            arguments: {
              AXIS: {
                type: ArgumentType.STRING,
                menu: 'AXIS_XYZ',
                defaultValue: 'x'
              }
            }
          }, {
            opcode: 'resetYaw',
            text: formatMessage({
              id: 'spikeprime.resetYaw',
              default: 'reset yaw angle'
            }),
            blockType: BlockType.COMMAND
          }, {
            opcode: 'presetYaw',
            text: formatMessage({
              id: 'spikeprime.presetYaw',
              default: 'preset yaw to [ANGLE] degrees'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              ANGLE: {
                type: ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          }, '---',
          // ===== 3X3 LED COLOR MATRIX =====
          {
            opcode: 'setMatrix3x3ColorGrid',
            text: formatMessage({
              id: 'spikeprime.setMatrix3x3ColorGrid',
              default: 'set [PORT] 3x3 colors: [P1][P2][P3] [P4][P5][P6] [P7][P8][P9]'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              PORT: {
                type: ArgumentType.STRING,
                menu: 'PORT',
                defaultValue: 'A'
              },
              P1: {
                type: ArgumentType.STRING,
                menu: 'MATRIX_COLOR_EMOJI',
                defaultValue: '🔴'
              },
              P2: {
                type: ArgumentType.STRING,
                menu: 'MATRIX_COLOR_EMOJI',
                defaultValue: '⚫'
              },
              P3: {
                type: ArgumentType.STRING,
                menu: 'MATRIX_COLOR_EMOJI',
                defaultValue: '🔴'
              },
              P4: {
                type: ArgumentType.STRING,
                menu: 'MATRIX_COLOR_EMOJI',
                defaultValue: '🔴'
              },
              P5: {
                type: ArgumentType.STRING,
                menu: 'MATRIX_COLOR_EMOJI',
                defaultValue: '🔴'
              },
              P6: {
                type: ArgumentType.STRING,
                menu: 'MATRIX_COLOR_EMOJI',
                defaultValue: '🔴'
              },
              P7: {
                type: ArgumentType.STRING,
                menu: 'MATRIX_COLOR_EMOJI',
                defaultValue: '⚫'
              },
              P8: {
                type: ArgumentType.STRING,
                menu: 'MATRIX_COLOR_EMOJI',
                defaultValue: '🔴'
              },
              P9: {
                type: ArgumentType.STRING,
                menu: 'MATRIX_COLOR_EMOJI',
                defaultValue: '⚫'
              }
            }
          }, {
            opcode: 'setMatrix3x3BrightnessGrid',
            text: formatMessage({
              id: 'spikeprime.setMatrix3x3BrightnessGrid',
              default: 'set [PORT] 3x3 brightness: [B1][B2][B3] [B4][B5][B6] [B7][B8][B9]'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              PORT: {
                type: ArgumentType.STRING,
                menu: 'PORT',
                defaultValue: 'A'
              },
              B1: {
                type: ArgumentType.STRING,
                menu: 'BRIGHTNESS_1_TO_10',
                defaultValue: '8'
              },
              B2: {
                type: ArgumentType.STRING,
                menu: 'BRIGHTNESS_1_TO_10',
                defaultValue: '8'
              },
              B3: {
                type: ArgumentType.STRING,
                menu: 'BRIGHTNESS_1_TO_10',
                defaultValue: '8'
              },
              B4: {
                type: ArgumentType.STRING,
                menu: 'BRIGHTNESS_1_TO_10',
                defaultValue: '8'
              },
              B5: {
                type: ArgumentType.STRING,
                menu: 'BRIGHTNESS_1_TO_10',
                defaultValue: '8'
              },
              B6: {
                type: ArgumentType.STRING,
                menu: 'BRIGHTNESS_1_TO_10',
                defaultValue: '8'
              },
              B7: {
                type: ArgumentType.STRING,
                menu: 'BRIGHTNESS_1_TO_10',
                defaultValue: '8'
              },
              B8: {
                type: ArgumentType.STRING,
                menu: 'BRIGHTNESS_1_TO_10',
                defaultValue: '8'
              },
              B9: {
                type: ArgumentType.STRING,
                menu: 'BRIGHTNESS_1_TO_10',
                defaultValue: '8'
              }
            }
          }, {
            opcode: 'setMatrix3x3PixelEmoji',
            text: formatMessage({
              id: 'spikeprime.setMatrix3x3PixelEmoji',
              default: 'set [PORT] 3x3 pixel [X],[Y] to [COLOR] brightness [BRIGHTNESS]'
            }),
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
                menu: 'MATRIX_COLOR_EMOJI',
                defaultValue: '🔴'
              },
              BRIGHTNESS: {
                type: ArgumentType.STRING,
                menu: 'BRIGHTNESS_1_TO_10',
                defaultValue: '5'
              }
            }
          }, {
            opcode: 'setMatrix3x3Custom',
            text: formatMessage({
              id: 'spikeprime.setMatrix3x3Custom',
              default: 'set [PORT] 3x3 custom pattern [PATTERN]'
            }),
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
          }, {
            opcode: 'generateMatrix3x3Code',
            text: formatMessage({
              id: 'spikeprime.generateMatrix3x3Code',
              default: 'generate 3x3 code for pattern [PATTERN]'
            }),
            blockType: BlockType.REPORTER,
            arguments: {
              PATTERN: {
                type: ArgumentType.STRING,
                defaultValue: 'r8 .1 r8\nr6 r10 r6\n.1 r8 .1'
              }
            }
          }, {
            opcode: 'setMatrix3x3SolidColor',
            text: formatMessage({
              id: 'spikeprime.setMatrix3x3SolidColor',
              default: 'set [PORT] 3x3 matrix all [COLOR] brightness [BRIGHTNESS]'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              PORT: {
                type: ArgumentType.STRING,
                menu: 'PORT',
                defaultValue: 'A'
              },
              COLOR: {
                type: ArgumentType.STRING,
                menu: 'MATRIX_COLOR_EMOJI',
                defaultValue: '🔴'
              },
              BRIGHTNESS: {
                type: ArgumentType.STRING,
                menu: 'BRIGHTNESS_1_TO_10',
                defaultValue: '5'
              }
            }
          }, {
            opcode: 'setMatrix3x3Level',
            text: formatMessage({
              id: 'spikeprime.setMatrix3x3Level',
              default: 'set [PORT] 3x3 battery level to [LEVEL]'
            }),
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
          }, {
            opcode: 'setMatrix3x3Transition',
            text: formatMessage({
              id: 'spikeprime.setMatrix3x3Transition',
              default: 'set [PORT] 3x3 transition [EFFECT]'
            }),
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
          }, {
            opcode: 'clearMatrix3x3',
            text: formatMessage({
              id: 'spikeprime.clearMatrix3x3',
              default: 'clear [PORT] 3x3 matrix'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              PORT: {
                type: ArgumentType.STRING,
                menu: 'PORT',
                defaultValue: 'A'
              }
            }
          }, '---',
          // ===== ENHANCED GESTURES =====
          {
            opcode: 'whenGesture',
            blockType: BlockType.HAT,
            text: formatMessage({
              id: 'spikeprime.whenGesture',
              default: 'when hub [GESTURE]'
            }),
            arguments: {
              GESTURE: {
                type: ArgumentType.STRING,
                menu: 'GESTURE',
                defaultValue: 'tapped'
              }
            }
          }, {
            opcode: 'isGesture',
            blockType: BlockType.BOOLEAN,
            text: formatMessage({
              id: 'spikeprime.isGesture',
              default: 'hub [GESTURE]?'
            }),
            arguments: {
              GESTURE: {
                type: ArgumentType.STRING,
                menu: 'GESTURE',
                defaultValue: 'tapped'
              }
            }
          }, {
            opcode: 'getOrientation',
            text: formatMessage({
              id: 'spikeprime.getOrientation',
              default: 'orientation'
            }),
            blockType: BlockType.REPORTER
          }, '---',
          // ===== SOUND SYSTEM =====
          {
            opcode: 'playHubSound',
            text: formatMessage({
              id: 'spikeprime.playHubSound',
              default: 'play hub sound [SOUND]'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              SOUND: {
                type: ArgumentType.STRING,
                menu: 'HUB_SOUND',
                defaultValue: 'startup'
              }
            }
          }, {
            opcode: 'playBeep',
            text: formatMessage({
              id: 'spikeprime.playBeep',
              default: 'beep [FREQUENCY] Hz for [DURATION] ms'
            }),
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
          }, {
            opcode: 'playNote',
            text: formatMessage({
              id: 'spikeprime.playNote',
              default: 'play note [NOTE] for [SECS] seconds'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              NOTE: {
                type: ArgumentType.NOTE,
                defaultValue: 60
              },
              SECS: {
                type: ArgumentType.NUMBER,
                defaultValue: 0.5
              }
            }
          }, {
            opcode: 'playWaveBeep',
            text: formatMessage({
              id: 'spikeprime.playWaveBeep',
              default: 'beep [WAVEFORM] [FREQUENCY] Hz for [DURATION] ms'
            }),
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
          }, {
            opcode: 'setVolume',
            text: formatMessage({
              id: 'spikeprime.setVolume',
              default: 'set volume to [VOLUME]%'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              VOLUME: {
                type: ArgumentType.NUMBER,
                defaultValue: 100
              }
            }
          }, {
            opcode: 'stopSound',
            text: formatMessage({
              id: 'spikeprime.stopSound',
              default: 'stop all sounds'
            }),
            blockType: BlockType.COMMAND
          }, '---',
          // ===== STATUS & TEMPERATURE =====
          {
            opcode: 'getBatteryLevel',
            text: formatMessage({
              id: 'spikeprime.getBatteryLevel',
              default: 'battery level %'
            }),
            blockType: BlockType.REPORTER
          }, {
            opcode: 'getBatteryTemperature',
            text: formatMessage({
              id: 'spikeprime.getBatteryTemperature',
              default: 'battery temperature'
            }),
            blockType: BlockType.REPORTER
          }, {
            opcode: 'getHubTemperature',
            text: formatMessage({
              id: 'spikeprime.getHubTemperature',
              default: 'hub temperature'
            }),
            blockType: BlockType.REPORTER
          }, '---',
          // ===== TIMER FUNCTIONALITY =====
          {
            opcode: 'getTimer',
            text: formatMessage({
              id: 'spikeprime.getTimer',
              default: 'timer'
            }),
            blockType: BlockType.REPORTER
          }, {
            opcode: 'resetTimer',
            text: formatMessage({
              id: 'spikeprime.resetTimer',
              default: 'reset timer'
            }),
            blockType: BlockType.COMMAND
          }, '---',
          // ===== SENSOR BLOCKS =====
          {
            opcode: 'getDistance',
            text: formatMessage({
              id: 'spikeprime.getDistance',
              default: '[PORT] distance'
            }),
            blockType: BlockType.REPORTER,
            arguments: {
              PORT: {
                type: ArgumentType.STRING,
                menu: 'PORT',
                defaultValue: 'A'
              }
            }
          }, {
            opcode: 'setDistanceLights',
            text: formatMessage({
              id: 'spikeprime.setDistanceLights',
              default: 'set [PORT] distance lights [TL] [TR] [BL] [BR]'
            }),
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
          }, {
            opcode: 'getColor',
            text: formatMessage({
              id: 'spikeprime.getColor',
              default: '[PORT] color'
            }),
            blockType: BlockType.REPORTER,
            arguments: {
              PORT: {
                type: ArgumentType.STRING,
                menu: 'PORT',
                defaultValue: 'A'
              }
            }
          }, {
            opcode: 'getReflection',
            text: formatMessage({
              id: 'spikeprime.getReflection',
              default: '[PORT] reflection'
            }),
            blockType: BlockType.REPORTER,
            arguments: {
              PORT: {
                type: ArgumentType.STRING,
                menu: 'PORT',
                defaultValue: 'A'
              }
            }
          }, {
            opcode: 'getAmbientLight',
            text: formatMessage({
              id: 'spikeprime.getAmbientLight',
              default: '[PORT] ambient light'
            }),
            blockType: BlockType.REPORTER,
            arguments: {
              PORT: {
                type: ArgumentType.STRING,
                menu: 'PORT',
                defaultValue: 'A'
              }
            }
          }, {
            opcode: 'getForce',
            text: formatMessage({
              id: 'spikeprime.getForce',
              default: '[PORT] force'
            }),
            blockType: BlockType.REPORTER,
            arguments: {
              PORT: {
                type: ArgumentType.STRING,
                menu: 'PORT',
                defaultValue: 'A'
              }
            }
          }, {
            opcode: 'isForceSensorPressed',
            text: formatMessage({
              id: 'spikeprime.isForceSensorPressed',
              default: '[PORT] force sensor pressed?'
            }),
            blockType: BlockType.BOOLEAN,
            arguments: {
              PORT: {
                type: ArgumentType.STRING,
                menu: 'PORT',
                defaultValue: 'A'
              }
            }
          },
          // ===== EVENT-BASED SENSOR BLOCKS =====
          {
            opcode: 'whenColor',
            blockType: BlockType.HAT,
            text: formatMessage({
              id: 'spikeprime.whenColor',
              default: 'when [PORT] sees [COLOR]'
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
          }, {
            opcode: 'isColor',
            blockType: BlockType.BOOLEAN,
            text: formatMessage({
              id: 'spikeprime.isColor',
              default: '[PORT] sees [COLOR]?'
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
          }, {
            opcode: 'whenForceSensor',
            blockType: BlockType.HAT,
            text: formatMessage({
              id: 'spikeprime.whenForceSensor',
              default: 'when [PORT] is [STATE]'
            }),
            arguments: {
              PORT: {
                type: ArgumentType.STRING,
                menu: 'PORT',
                defaultValue: 'A'
              },
              STATE: {
                type: ArgumentType.STRING,
                menu: 'FORCE_STATE',
                defaultValue: 'pressed'
              }
            }
          }, '---',
          // ===== BUTTON ENHANCEMENTS =====
          {
            opcode: 'isButtonPressed',
            text: formatMessage({
              id: 'spikeprime.isButtonPressed',
              default: '[BUTTON] button pressed?'
            }),
            blockType: BlockType.BOOLEAN,
            arguments: {
              BUTTON: {
                type: ArgumentType.STRING,
                menu: 'BUTTON',
                defaultValue: 'center'
              }
            }
          }, {
            opcode: 'whenButtonPressed',
            blockType: BlockType.HAT,
            text: formatMessage({
              id: 'spikeprime.whenButtonPressed',
              default: 'when [BUTTON] button pressed'
            }),
            arguments: {
              BUTTON: {
                type: ArgumentType.STRING,
                menu: 'BUTTON',
                defaultValue: 'center'
              }
            }
          }, '---',
          // ===== PYTHON REPL =====
          {
            opcode: 'runReplCommand',
            text: formatMessage({
              id: 'spikeprime.runReplCommand',
              default: 'run Python REPL: [CODE]'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              CODE: {
                type: ArgumentType.STRING,
                defaultValue: 'print("Hello REPL!")'
              }
            }
          }, {
            opcode: 'getReplOutput',
            text: formatMessage({
              id: 'spikeprime.getReplOutput',
              default: 'REPL output'
            }),
            blockType: BlockType.REPORTER
          }, {
            opcode: 'clearReplOutput',
            text: formatMessage({
              id: 'spikeprime.clearReplOutput',
              default: 'clear REPL output'
            }),
            blockType: BlockType.COMMAND
          }, {
            opcode: 'getReplHistory',
            text: formatMessage({
              id: 'spikeprime.getReplHistory',
              default: 'REPL command [INDEX]'
            }),
            blockType: BlockType.REPORTER,
            arguments: {
              INDEX: {
                type: ArgumentType.NUMBER,
                defaultValue: -1
              }
            }
          }, '---',
          // ===== ADVANCED PYTHON COMMANDS =====
          {
            opcode: 'runPythonCommand',
            text: formatMessage({
              id: 'spikeprime.runPythonCommand',
              default: 'run Python: [CODE]'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              CODE: {
                type: ArgumentType.STRING,
                defaultValue: 'print("Hello World")'
              }
            }
          }, {
            opcode: 'runHubCommand',
            text: formatMessage({
              id: 'spikeprime.runHubCommand',
              default: 'run hub command: [CODE]'
            }),
            blockType: BlockType.COMMAND,
            arguments: {
              CODE: {
                type: ArgumentType.STRING,
                defaultValue: 'hub.status()'
              }
            }
          }, {
            opcode: 'exitScript',
            text: formatMessage({
              id: 'spikeprime.exitScript',
              default: 'exit Python script'
            }),
            blockType: BlockType.COMMAND
          }],
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
              items: [{
                text: formatMessage({
                  id: 'spikeprime.menu.moveUnit.rotations',
                  default: 'rotations'
                }),
                value: 'rotations'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.moveUnit.degrees',
                  default: 'degrees'
                }),
                value: 'degrees'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.moveUnit.seconds',
                  default: 'seconds'
                }),
                value: 'seconds'
              }]
            },
            AXIS: {
              acceptReporters: false,
              items: [{
                text: formatMessage({
                  id: 'spikeprime.menu.axis.pitch',
                  default: 'pitch'
                }),
                value: 'pitch'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.axis.roll',
                  default: 'roll'
                }),
                value: 'roll'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.axis.yaw',
                  default: 'yaw'
                }),
                value: 'yaw'
              }]
            },
            AXIS_XYZ: {
              acceptReporters: false,
              items: ['x', 'y', 'z']
            },
            DIRECTION: {
              acceptReporters: false,
              items: [{
                text: '⬆️',
                value: '1'
              }, {
                text: '⬇️',
                value: '-1'
              }]
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
              items: [{
                text: formatMessage({
                  id: 'spikeprime.menu.gesture.tapped',
                  default: 'tapped'
                }),
                value: 'tapped'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.gesture.doubletapped',
                  default: 'doubletapped'
                }),
                value: 'doubletapped'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.gesture.shake',
                  default: 'shake'
                }),
                value: 'shake'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.gesture.freefall',
                  default: 'freefall'
                }),
                value: 'freefall'
              }]
            },
            HUB_SOUND: {
              acceptReporters: false,
              items: HubSoundFiles
            },
            WAVEFORM: {
              acceptReporters: false,
              items: [{
                text: formatMessage({
                  id: 'spikeprime.menu.waveform.sin',
                  default: 'sin'
                }),
                value: 'sin'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.waveform.square',
                  default: 'square'
                }),
                value: 'square'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.waveform.triangle',
                  default: 'triangle'
                }),
                value: 'triangle'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.waveform.sawtooth',
                  default: 'sawtooth'
                }),
                value: 'sawtooth'
              }]
            },
            BUTTON: {
              acceptReporters: false,
              items: [{
                text: formatMessage({
                  id: 'spikeprime.menu.button.left',
                  default: 'left'
                }),
                value: 'left'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.button.center',
                  default: 'center'
                }),
                value: 'center'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.button.right',
                  default: 'right'
                }),
                value: 'right'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.button.connect',
                  default: 'connect'
                }),
                value: 'connect'
              }]
            },
            MOVE_DIRECTION: {
              acceptReporters: false,
              items: [{
                text: formatMessage({
                  id: 'spikeprime.menu.direction.forward',
                  default: 'forward'
                }),
                value: 'forward'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.direction.backward',
                  default: 'backward'
                }),
                value: 'backward'
              }]
            },
            MOVE_UNIT: {
              acceptReporters: false,
              items: [{
                text: formatMessage({
                  id: 'spikeprime.menu.moveUnit.cm',
                  default: 'cm'
                }),
                value: 'cm'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.moveUnit.in',
                  default: 'in'
                }),
                value: 'in'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.moveUnit.rotations',
                  default: 'rotations'
                }),
                value: 'rotations'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.moveUnit.degrees',
                  default: 'degrees'
                }),
                value: 'degrees'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.moveUnit.seconds',
                  default: 'seconds'
                }),
                value: 'seconds'
              }]
            },
            STOP_ACTION: {
              acceptReporters: false,
              items: [{
                text: formatMessage({
                  id: 'spikeprime.menu.stopAction.coast',
                  default: 'coast'
                }),
                value: 'coast'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.stopAction.brake',
                  default: 'brake'
                }),
                value: 'brake'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.stopAction.hold',
                  default: 'hold'
                }),
                value: 'hold'
              }]
            },
            COLOR: {
              acceptReporters: true,
              items: [{
                text: formatMessage({
                  id: 'spikeprime.menu.color.red',
                  default: 'red'
                }),
                value: 'red'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.color.green',
                  default: 'green'
                }),
                value: 'green'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.color.blue',
                  default: 'blue'
                }),
                value: 'blue'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.color.yellow',
                  default: 'yellow'
                }),
                value: 'yellow'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.color.cyan',
                  default: 'cyan'
                }),
                value: 'cyan'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.color.magenta',
                  default: 'magenta'
                }),
                value: 'magenta'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.color.white',
                  default: 'white'
                }),
                value: 'white'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.color.black',
                  default: 'black'
                }),
                value: 'black'
              }]
            },
            FORCE_STATE: {
              acceptReporters: false,
              items: [{
                text: formatMessage({
                  id: 'spikeprime.menu.forceState.pressed',
                  default: 'pressed'
                }),
                value: 'pressed'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.forceState.hardPressed',
                  default: 'hard pressed'
                }),
                value: 'hard pressed'
              }, {
                text: formatMessage({
                  id: 'spikeprime.menu.forceState.released',
                  default: 'released'
                }),
                value: 'released'
              }]
            },
            MATRIX_COLOR_EMOJI: {
              acceptReporters: false,
              items: [{
                text: '⚫ Off',
                value: '⚫'
              }, {
                text: '🟣 Magenta',
                value: '🟣'
              }, {
                text: '🟪 Violet',
                value: '🟪'
              }, {
                text: '🔵 Blue',
                value: '🔵'
              }, {
                text: '🔷 Turquoise',
                value: '🔷'
              }, {
                text: '🟢 Mint',
                value: '🟢'
              }, {
                text: '🟩 Green',
                value: '🟩'
              }, {
                text: '🟡 Yellow',
                value: '🟡'
              }, {
                text: '🟠 Orange',
                value: '🟠'
              }, {
                text: '🔴 Red',
                value: '🔴'
              }, {
                text: '⚪ White',
                value: '⚪'
              }]
            },
            BRIGHTNESS_1_TO_10: {
              acceptReporters: false,
              items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
            },
            MATRIX_3X3_TRANSITION: {
              acceptReporters: false,
              items: ['none', 'fade', 'slide']
            }
          }
        };
      }
    }, {
      key: "moveForward",
      value: function moveForward(args) {
        var direction = Cast.toString(args.DIRECTION);
        var value = Cast.toNumber(args.VALUE);
        var unit = Cast.toString(args.UNIT);
        var _this$_peripheral$_mo = _slicedToArray(this._peripheral._movementMotors, 2),
          portA = _this$_peripheral$_mo[0];
          _this$_peripheral$_mo[1];
        var speed = this._peripheral.motorSettings[portA].speed;
        var dirMultiplier = direction === 'forward' ? 1 : -1;
        if (unit === 'cm') {
          // Approximate conversion: 1 rotation = 17.6 cm for standard SPIKE wheels
          var rotations = value / 17.6;
          return this._peripheral.sendPythonCommand("motors.move(".concat(rotations * dirMultiplier, ", 'rotations', speed=").concat(speed, ")"));
        } else if (unit === 'in') {
          var _rotations = value / 6.93; // 1 rotation â‰ˆ 6.93 inches
          return this._peripheral.sendPythonCommand("motors.move(".concat(_rotations * dirMultiplier, ", 'rotations', speed=").concat(speed, ")"));
        } else {
          return this._peripheral.sendPythonCommand("motors.move(".concat(value * dirMultiplier, ", '").concat(unit, "', speed=").concat(speed, ")"));
        }
      }
    }, {
      key: "steer",
      value: function steer(args) {
        var steering = Cast.toNumber(args.STEERING);
        var _this$_peripheral$_mo2 = _slicedToArray(this._peripheral._movementMotors, 1),
          portA = _this$_peripheral$_mo2[0];
        var speed = this._peripheral.motorSettings[portA].speed;
        return this._peripheral.sendPythonCommand("motors.start(".concat(steering, ", speed=").concat(speed, ")"));
      }
    }, {
      key: "startTank",
      value: function startTank(args) {
        var leftSpeed = Cast.toNumber(args.LEFT_SPEED);
        var rightSpeed = Cast.toNumber(args.RIGHT_SPEED);
        return this._peripheral.sendPythonCommand("motors.start_tank(".concat(leftSpeed, ", ").concat(rightSpeed, ")"));
      }
    }, {
      key: "setMovementSpeed",
      value: function setMovementSpeed(args) {
        var speed = Cast.toNumber(args.SPEED);
        var _this$_peripheral$_mo3 = _slicedToArray(this._peripheral._movementMotors, 2),
          portA = _this$_peripheral$_mo3[0],
          portB = _this$_peripheral$_mo3[1];
        this._peripheral.motorSettings[portA].speed = speed;
        this._peripheral.motorSettings[portB].speed = speed;
        return this._peripheral.sendPythonCommand("motors.set_default_speed(".concat(speed, ")"));
      }
    }, {
      key: "stopMovement",
      value: function stopMovement() {
        return this._peripheral.sendPythonCommand('motors.stop()');
      }
      // ===== MOTOR IMPLEMENTATIONS =====
      /**
       * Run motor(s) for specified amount in specified unit
       * @param {object} args - Block arguments
       * @returns {Promise} Command execution promise
       */
    }, {
      key: "motorRunFor",
      value: function motorRunFor(args) {
        var direction = args.DIRECTION;
        var value = Cast.toNumber(args.VALUE);
        var unit = args.UNIT;
        var ports = this._validatePorts(Cast.toString(args.PORT));
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
    }, {
      key: "motorRunToPosition",
      value: function motorRunToPosition(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        var position = Cast.toNumber(args.POSITION);
        var speed = this._peripheral.motorSettings[port].speed;
        return this._peripheral.sendPythonCommand("hub.port.".concat(port, ".motor.run_to_position(").concat(position, ", speed=").concat(speed, ")"));
      }
      /**
       * Run motors for specific number of degrees
       * @param {Array} ports - Array of port letters
       * @param {number} direction - Direction multiplier (1 or -1)
       * @param {number} degrees - Degrees to rotate
       * @returns {Promise} Command execution promise
       */
    }, {
      key: "_motorRunForDegrees",
      value: function _motorRunForDegrees(ports, direction, degrees) {
        var _this6 = this;
        var promises = ports.map(function (port) {
          var setting = _this6._peripheral.motorSettings[port];
          // Try both standard command and Python method
          var standardCommand = _this6._peripheral.sendCommand('scratch.motor_run_for_degrees', {
            port: port,
            speed: setting.speed * direction,
            degrees: Math.floor(degrees),
            stop: setting.stopMode,
            stall: setting.stallDetection
          });
          var altCommand = _this6._peripheral.sendPythonCommand("import hub; hub.port.".concat(port, ".motor.run_for_degrees(").concat(Math.floor(degrees), ", ").concat(setting.speed * direction, ")"));
          return standardCommand.catch(function () {
            return altCommand;
          });
        });
        return Promise.all(promises).then(function () {});
      }
      /**
       * Run motors for specific time duration
       * @param {Array} ports - Array of port letters
       * @param {number} direction - Direction multiplier (1 or -1)
       * @param {number} seconds - Time in seconds
       * @returns {Promise} Command execution promise
       */
    }, {
      key: "_motorRunTimed",
      value: function _motorRunTimed(ports, direction, seconds) {
        var _this7 = this;
        var promises = ports.map(function (port) {
          var setting = _this7._peripheral.motorSettings[port];
          var standardCommand = _this7._peripheral.sendCommand('scratch.motor_run_timed', {
            port: port,
            speed: setting.speed * direction,
            time: Math.floor(seconds * 1000),
            stop: setting.stopMode,
            stall: setting.stallDetection
          });
          var altCommand = _this7._peripheral.sendPythonCommand("import hub; hub.port.".concat(port, ".motor.run_for_time(").concat(Math.floor(seconds * 1000), ", ").concat(setting.speed * direction, ")"));
          return standardCommand.catch(function () {
            return altCommand;
          });
        });
        return Promise.all(promises).then(function () {});
      }
    }, {
      key: "motorStart",
      value: function motorStart(args) {
        var _this8 = this;
        var direction = args.DIRECTION;
        var ports = this._validatePorts(Cast.toString(args.PORT));
        var promises = ports.map(function (port) {
          var setting = _this8._peripheral.motorSettings[port];
          var standardCommand = _this8._peripheral.sendCommand('scratch.motor_start', {
            port: port,
            speed: setting.speed * direction,
            stall: setting.stallDetection
          });
          var altCommand = _this8._peripheral.sendPythonCommand("import hub; hub.port.".concat(port, ".motor.pwm(").concat(Math.round(setting.speed * direction), ")"));
          return standardCommand.catch(function () {
            return altCommand;
          });
        });
        return Promise.all(promises).then(function () {});
      }
    }, {
      key: "motorStop",
      value: function motorStop(args) {
        var _this9 = this;
        var ports = this._validatePorts(Cast.toString(args.PORT));
        var promises = ports.map(function (port) {
          var setting = _this9._peripheral.motorSettings[port];
          var standardCommand = _this9._peripheral.sendCommand('scratch.motor_stop', {
            port: port,
            stop: setting.stopMode
          });
          var altCommand = _this9._peripheral.sendPythonCommand("import hub; hub.port.".concat(port, ".motor.stop()"));
          return standardCommand.catch(function () {
            return altCommand;
          });
        });
        return Promise.all(promises).then(function () {});
      }
    }, {
      key: "motorSetSpeed",
      value: function motorSetSpeed(args) {
        var _this0 = this;
        var speed = Cast.toNumber(args.SPEED);
        var ports = this._validatePorts(Cast.toString(args.PORT));
        ports.forEach(function (port) {
          _this0._peripheral.motorSettings[port].speed = speed;
        });
      }
    }, {
      key: "motorSetStopAction",
      value: function motorSetStopAction(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        var action = Cast.toString(args.ACTION);
        var stopModeMap = {
          coast: 0,
          brake: 1,
          hold: 2
        };
        this._peripheral.motorSettings[port].stopMode = stopModeMap[action] || 1;
        return this._peripheral.sendPythonCommand("hub.port.".concat(port, ".motor.set_stop_action('").concat(action, "')"));
      }
    }, {
      key: "getPosition",
      value: function getPosition(args) {
        var _this$_peripheral$por, _this$_peripheral$por2;
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        return (_this$_peripheral$por = (_this$_peripheral$por2 = this._peripheral.portValues[port]) === null || _this$_peripheral$por2 === void 0 ? void 0 : _this$_peripheral$por2.position) !== null && _this$_peripheral$por !== void 0 ? _this$_peripheral$por : 0;
      }
      // ===== MOTOR ENHANCEMENTS (FIXED - HIGH CONFIDENCE) =====
    }, {
      key: "getRelativePosition",
      value: function getRelativePosition(args) {
        var _this$_peripheral$por3, _this$_peripheral$por4;
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        // FIXED: Return data from continuous sensor loop, not stale local variable
        var altData = this._peripheral._sensors.motorPositions[port];
        if (altData) {
          return altData.relativePosition;
        }
        // Fallback to standard data
        return (_this$_peripheral$por3 = (_this$_peripheral$por4 = this._peripheral.portValues[port]) === null || _this$_peripheral$por4 === void 0 ? void 0 : _this$_peripheral$por4.relativePosition) !== null && _this$_peripheral$por3 !== void 0 ? _this$_peripheral$por3 : 0;
      }
    }, {
      key: "getAbsolutePosition",
      value: function getAbsolutePosition(args) {
        var _this$_peripheral$por5, _this$_peripheral$por6;
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        // FIXED: Return data from continuous sensor loop
        var altData = this._peripheral._sensors.motorPositions[port];
        if (altData) {
          return altData.absolutePosition;
        }
        // Fallback to standard data
        return (_this$_peripheral$por5 = (_this$_peripheral$por6 = this._peripheral.portValues[port]) === null || _this$_peripheral$por6 === void 0 ? void 0 : _this$_peripheral$por6.absolutePosition) !== null && _this$_peripheral$por5 !== void 0 ? _this$_peripheral$por5 : 0;
      }
    }, {
      key: "getSpeed",
      value: function getSpeed(args) {
        var _this$_peripheral$por7, _this$_peripheral$por8;
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        // FIXED: Use speed data directly, not conversion
        var altData = this._peripheral._sensors.motorPositions[port];
        if (altData) {
          // alt data is already in the correct format
          return Math.round(altData.speed * 9.3); // Convert to deg/s using alt factor
        }
        // Fallback to standard data with conversion
        var speedPercent = (_this$_peripheral$por7 = (_this$_peripheral$por8 = this._peripheral.portValues[port]) === null || _this$_peripheral$por8 === void 0 ? void 0 : _this$_peripheral$por8.speed) !== null && _this$_peripheral$por7 !== void 0 ? _this$_peripheral$por7 : 0;
        return Math.round(speedPercent * 9.3);
      }
    }, {
      key: "resetMotorPosition",
      value: function resetMotorPosition(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        var position = Cast.toNumber(args.POSITION);
        // Use alt preset method
        return this._peripheral.sendPythonCommand("import hub; hub.port.".concat(port, ".motor.preset(").concat(position, ")"));
      }
      // ===== DISPLAY IMPLEMENTATIONS =====
      /**
       * Display text on hub's 5x5 LED matrix
       * @param {object} args - Block arguments
       * @returns {Promise} Command execution promise
       */
    }, {
      key: "displayText",
      value: function displayText(args) {
        var text = Cast.toString(args.TEXT);
        var standardCommand = this._peripheral.sendCommand('scratch.display_text', {
          text: text
        });
        var altCommand = this._peripheral.sendPythonCommand("import hub; hub.display.show(\"".concat(text.replace(/"/g, '\\"'), "\")"));
        return standardCommand.catch(function () {
          return altCommand;
        });
      }
      /**
       * Display custom 5x5 image pattern on hub
       * @param {object} args - Block arguments
       * @returns {Promise} Command execution promise
       */
    }, {
      key: "displayImage",
      value: function displayImage(args) {
        var matrix = Cast.toString(args.MATRIX);
        // Standard approach
        var brightness = Math.round(9 * this._peripheral.pixelBrightness / 100);
        var symbol = (matrix.replace(/\D/g, '') + '0'.repeat(25)).slice(0, 25);
        var image = symbol.replace(/1/g, brightness).match(/.{5}/g).join(':');
        var standardCommand = this._peripheral.sendCommand('scratch.display_image', {
          image: image
        });
        // alt extended approach
        var altImage = symbol.replace(/1/g, '9').replace(/0/g, '_').match(/.{5}/g).join(':');
        var altCommand = this._peripheral.sendPythonCommand("import hub; hub.display.show(hub.Image(\"".concat(altImage, "\"))"));
        return standardCommand.catch(function () {
          return altCommand;
        });
      }
    }, {
      key: "displayPattern",
      value: function displayPattern(args) {
        var pattern = Cast.toString(args.PATTERN);
        var patternData = DisplayPatterns[pattern];
        if (patternData) {
          return this.displayImage({
            MATRIX: patternData
          });
        }
        return Promise.resolve();
      }
    }, {
      key: "displayClear",
      value: function displayClear() {
        var standardCommand = this._peripheral.sendCommand('scratch.display_clear', {});
        var altCommand = this._peripheral.sendPythonCommand('import hub; hub.display.show(" ")');
        return standardCommand.catch(function () {
          return altCommand;
        });
      }
    }, {
      key: "setPixel",
      value: function setPixel(args) {
        var x = Cast.toNumber(args.X) - 1;
        var y = Cast.toNumber(args.Y) - 1;
        var brightness = Cast.toNumber(args.BRIGHTNESS);
        if (x < 0 || x > 4 || y < 0 || y > 4) return Promise.resolve();
        var standardCommand = this._peripheral.sendCommand('scratch.display_set_pixel', {
          x: x,
          y: y,
          brightness: Math.round(brightness * 9 / 100)
        });
        var altCommand = this._peripheral.sendPythonCommand("import hub; hub.display.pixel(".concat(x, ", ").concat(y, ", ").concat(Math.round(brightness * 9 / 100), ")"));
        return standardCommand.catch(function () {
          return altCommand;
        });
      }
    }, {
      key: "rotateDisplay",
      value: function rotateDisplay(args) {
        var angle = Cast.toString(args.ANGLE);
        // alt rotation method
        return this._peripheral.sendPythonCommand("import hub; hub.display.rotation(".concat(angle, ")"));
      }
    }, {
      key: "setCenterButtonColor",
      value: function setCenterButtonColor(args) {
        var colorName = Cast.toString(args.COLOR);
        var colorValue = CenterLEDColors[colorName] || 0;
        var standardCommand = this._peripheral.sendCommand('scratch.center_button_lights', {
          color: colorValue
        });
        var altCommand = this._peripheral.sendPythonCommand("import hub; hub.led(".concat(colorValue, ")"));
        return standardCommand.catch(function () {
          return altCommand;
        });
      }
      // ===== IMU & GYRO =====
    }, {
      key: "getAngle",
      value: function getAngle(args) {
        var axis = Cast.toString(args.AXIS);
        return this._peripheral.angle[axis] || 0;
      }
    }, {
      key: "getGyroRate",
      value: function getGyroRate(args) {
        var axis = Cast.toString(args.AXIS);
        // FIXED: Return data from continuous sensor loop
        return this._peripheral.gyro[axis] || 0;
      }
    }, {
      key: "getFilteredGyroRate",
      value: function getFilteredGyroRate(args) {
        var axis = Cast.toString(args.AXIS);
        // FIXED: Return data from continuous sensor loop
        return this._peripheral.gyroFiltered[axis] || 0;
      }
    }, {
      key: "getAcceleration",
      value: function getAcceleration(args) {
        var axis = Cast.toString(args.AXIS);
        // FIXED: Return data from continuous sensor loop
        return this._peripheral.acceleration[axis] || 0;
      }
    }, {
      key: "getFilteredAcceleration",
      value: function getFilteredAcceleration(args) {
        var axis = Cast.toString(args.AXIS);
        // FIXED: Return data from continuous sensor loop
        return this._peripheral.accelerationFiltered[axis] || 0;
      }
    }, {
      key: "resetYaw",
      value: function resetYaw() {
        this._peripheral._timer.start = Date.now(); // Also reset timer as convenience
        return this._peripheral.sendPythonCommand('import hub; hub.motion.reset_yaw()');
      }
    }, {
      key: "presetYaw",
      value: function presetYaw(args) {
        var angle = Cast.toNumber(args.ANGLE);
        return this._peripheral.sendPythonCommand("import hub; hub.motion.preset_yaw(".concat(angle, ")"));
      }
      // ===== 3X3 LED COLOR MATRIX IMPLEMENTATIONS =====
    }, {
      key: "setMatrix3x3ColorGrid",
      value: function setMatrix3x3ColorGrid(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        // Collect all 9 color emojis
        var pixels = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'].map(function (pixel) {
          var emoji = Cast.toString(args[pixel]);
          var colorId = ColorEmojiMap[emoji] || 0;
          // Default brightness of 5 for color-only grid
          return 5 * 16 + colorId;
        });
        // Convert to hex byte string
        var byteString = pixels.map(function (b) {
          return "\\x".concat(b.toString(16).padStart(2, '0'));
        }).join('');
        return this._peripheral.sendPythonCommand("import hub; matrix = hub.port.".concat(port, ".device; matrix.mode(2); matrix.mode(2, b\"").concat(byteString, "\")"));
      }
    }, {
      key: "setMatrix3x3BrightnessGrid",
      value: function setMatrix3x3BrightnessGrid(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        // Get current color state or use default red
        var currentColorId = 9; // Default to red
        // Collect all 9 brightness values
        var pixels = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'].map(function (brightness) {
          var brightnessValue = MathUtil.clamp(Cast.toNumber(args[brightness]), 1, 10);
          return brightnessValue * 16 + currentColorId;
        });
        // Convert to hex byte string
        var byteString = pixels.map(function (b) {
          return "\\x".concat(b.toString(16).padStart(2, '0'));
        }).join('');
        return this._peripheral.sendPythonCommand("import hub; matrix = hub.port.".concat(port, ".device; matrix.mode(2); matrix.mode(2, b\"").concat(byteString, "\")"));
      }
    }, {
      key: "setMatrix3x3PixelEmoji",
      value: function setMatrix3x3PixelEmoji(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        var x = MathUtil.clamp(Cast.toNumber(args.X) - 1, 0, 2);
        var y = MathUtil.clamp(Cast.toNumber(args.Y) - 1, 0, 2);
        var colorEmoji = Cast.toString(args.COLOR);
        var brightness = MathUtil.clamp(Cast.toNumber(args.BRIGHTNESS), 1, 10);
        var colorId = ColorEmojiMap[colorEmoji] || 0;
        var value = brightness * 16 + colorId;
        var index = y * 3 + x;
        var pythonCode = "\nimport hub\nmatrix = hub.port.".concat(port, ".device\nmatrix.mode(2)\n# Create array with current values (or default to off)\ncurrent = [0x01] * 9  # Default: off with brightness 1\ncurrent[").concat(index, "] = 0x").concat(value.toString(16).padStart(2, '0'), "\n# Convert to byte string and send\nbyte_string = bytes(current)\nmatrix.mode(2, byte_string)\n");
        return this._peripheral.sendPythonCommand(pythonCode);
      }
    }, {
      key: "setMatrix3x3SolidColor",
      value: function setMatrix3x3SolidColor(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        var colorEmoji = Cast.toString(args.COLOR);
        var brightness = MathUtil.clamp(Cast.toNumber(args.BRIGHTNESS), 1, 10);
        var colorId = ColorEmojiMap[colorEmoji] || 0;
        var value = brightness * 16 + colorId;
        // All 9 pixels same color and brightness
        var pixels = Array(9).fill(value);
        var byteString = pixels.map(function (b) {
          return "\\x".concat(b.toString(16).padStart(2, '0'));
        }).join('');
        return this._peripheral.sendPythonCommand("import hub; matrix = hub.port.".concat(port, ".device; matrix.mode(2); matrix.mode(2, b\"").concat(byteString, "\")"));
      }
    }, {
      key: "setMatrix3x3Visual",
      value: function setMatrix3x3Visual(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        // Collect all 9 pixel values
        var pixelArgs = ['R1C1', 'R1C2', 'R1C3', 'R2C1', 'R2C2', 'R2C3', 'R3C1', 'R3C2', 'R3C3'];
        var pixelPattern = pixelArgs.map(function (arg) {
          return Cast.toString(args[arg]) || '.1';
        }).join(' ');
        // Use the same parsing logic as the custom pattern
        return this.setMatrix3x3Custom({
          PORT: port,
          PATTERN: pixelPattern
        });
      }
    }, {
      key: "generateMatrix3x3Code",
      value: function generateMatrix3x3Code(args) {
        var pattern = Cast.toString(args.PATTERN);
        // Parse the pattern to generate both Python code and Scratch code
        var colorCodes = {
          '.': 0,
          'm': 1,
          'v': 2,
          'b': 3,
          't': 4,
          'n': 5,
          'g': 6,
          'y': 7,
          'o': 8,
          'r': 9,
          'w': 10
        };
        try {
          var lines = pattern.split(/\n|\|/);
          var pixels = [];
          var _iterator3 = _createForOfIteratorHelper(lines),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var line = _step3.value;
              var pixelCodes = line.trim().split(/\s+/);
              var _iterator4 = _createForOfIteratorHelper(pixelCodes),
                _step4;
              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  var code = _step4.value;
                  if (code.length >= 2) {
                    var colorChar = code.charAt(0).toLowerCase();
                    var brightnessStr = code.substring(1);
                    var colorId = colorCodes[colorChar] !== undefined ? colorCodes[colorChar] : 0;
                    var brightness = Math.max(1, Math.min(10, parseInt(brightnessStr) || 1));
                    pixels.push(brightness * 16 + colorId);
                  }
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }
            }
            // Ensure we have exactly 9 pixels
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          while (pixels.length < 9) pixels.push(0x01);
          pixels.splice(9);
          // Generate hex byte string
          var hexString = pixels.map(function (b) {
            return "\\x".concat(b.toString(16).padStart(2, '0'));
          }).join('');
          // Return the code format
          return "hub.port.A.device.mode(2, b\"".concat(hexString, "\")");
        } catch (error) {
          return 'Error parsing pattern';
        }
      }
    }, {
      key: "setMatrix3x3Simple",
      value: function setMatrix3x3Simple(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        // Collect all 9 pixel values
        var pixelArgs = ['R1C1', 'R1C2', 'R1C3', 'R2C1', 'R2C2', 'R2C3', 'R3C1', 'R3C2', 'R3C3'];
        var pixelPattern = pixelArgs.map(function (arg) {
          return Cast.toString(args[arg]) || '.1';
        }).join(' ');
        // Use the same parsing logic as the custom pattern
        return this.setMatrix3x3Custom({
          PORT: port,
          PATTERN: pixelPattern
        });
      }
    }, {
      key: "setMatrix3x3Custom",
      value: function setMatrix3x3Custom(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        var pattern = Cast.toString(args.PATTERN);
        // Parse visual pattern format: "r8 g6 b4\ny7 w9 o5\nm3 v2 .1"
        // Color codes: .(off), m(magenta), v(violet), b(blue), t(turquoise), n(mint), g(green), y(yellow), o(orange), r(red), w(white)
        var colorCodes = {
          '.': 0,
          'm': 1,
          'v': 2,
          'b': 3,
          't': 4,
          'n': 5,
          'g': 6,
          'y': 7,
          'o': 8,
          'r': 9,
          'w': 10
        };
        try {
          // Split by lines and parse each pixel
          var lines = pattern.split(/\n|\|/); // Support both \n and | as separators
          var pixels = [];
          var _iterator5 = _createForOfIteratorHelper(lines),
            _step5;
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var line = _step5.value;
              var pixelCodes = line.trim().split(/\s+/); // Split by spaces
              var _iterator6 = _createForOfIteratorHelper(pixelCodes),
                _step6;
              try {
                for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                  var code = _step6.value;
                  if (code.length >= 2) {
                    var colorChar = code.charAt(0).toLowerCase();
                    var brightnessStr = code.substring(1);
                    var colorId = colorCodes[colorChar] !== undefined ? colorCodes[colorChar] : 0;
                    var brightness = Math.max(1, Math.min(10, parseInt(brightnessStr) || 1));
                    pixels.push(brightness * 16 + colorId);
                  }
                }
              } catch (err) {
                _iterator6.e(err);
              } finally {
                _iterator6.f();
              }
            }
            // Ensure we have exactly 9 pixels, pad or truncate as needed
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
          while (pixels.length < 9) pixels.push(0x01); // Default: off with brightness 1
          pixels.splice(9); // Truncate to 9 pixels
          // Convert to hex byte string for Python
          var byteString = pixels.map(function (b) {
            return "\\x".concat(b.toString(16).padStart(2, '0'));
          }).join('');
          // Use documented method
          return this._peripheral.sendPythonCommand("import hub; matrix = hub.port.".concat(port, ".device; matrix.mode(2); matrix.mode(2, b\"").concat(byteString, "\")"));
        } catch (error) {
          console.warn('Error parsing 3x3 pattern:', error);
          // Fallback to off pattern
          return this._peripheral.sendPythonCommand("import hub; matrix = hub.port.".concat(port, ".device; matrix.mode(2); matrix.mode(2, b\"\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x01\")"));
        }
      }
    }, {
      key: "setMatrix3x3Pattern",
      value: function setMatrix3x3Pattern(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        var pattern = Cast.toString(args.PATTERN);
        // Define 3x3 patterns (using documented color IDs: 0=off, 1=magenta, 2=violet, 3=blue, 4=turquoise, 5=mint, 6=green, 7=yellow, 8=orange, 9=red, 10=white)
        var patterns = {
          heart: [{
            color: 9,
            brightness: 8
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 9,
            brightness: 8
          }, {
            color: 9,
            brightness: 6
          }, {
            color: 9,
            brightness: 10
          }, {
            color: 9,
            brightness: 6
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 9,
            brightness: 8
          }, {
            color: 0,
            brightness: 1
          }],
          smile: [{
            color: 7,
            brightness: 6
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 7,
            brightness: 6
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 7,
            brightness: 8
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 7,
            brightness: 6
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 7,
            brightness: 6
          }],
          star: [{
            color: 0,
            brightness: 1
          }, {
            color: 7,
            brightness: 8
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 7,
            brightness: 6
          }, {
            color: 7,
            brightness: 10
          }, {
            color: 7,
            brightness: 6
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 7,
            brightness: 8
          }, {
            color: 0,
            brightness: 1
          }],
          arrow_up: [{
            color: 0,
            brightness: 1
          }, {
            color: 6,
            brightness: 8
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 6,
            brightness: 6
          }, {
            color: 6,
            brightness: 8
          }, {
            color: 6,
            brightness: 6
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 6,
            brightness: 6
          }, {
            color: 0,
            brightness: 1
          }],
          arrow_down: [{
            color: 0,
            brightness: 1
          }, {
            color: 3,
            brightness: 6
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 3,
            brightness: 6
          }, {
            color: 3,
            brightness: 8
          }, {
            color: 3,
            brightness: 6
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 3,
            brightness: 8
          }, {
            color: 0,
            brightness: 1
          }],
          arrow_left: [{
            color: 0,
            brightness: 1
          }, {
            color: 8,
            brightness: 6
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 8,
            brightness: 8
          }, {
            color: 8,
            brightness: 6
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 8,
            brightness: 6
          }, {
            color: 0,
            brightness: 1
          }],
          arrow_right: [{
            color: 0,
            brightness: 1
          }, {
            color: 8,
            brightness: 6
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 8,
            brightness: 6
          }, {
            color: 8,
            brightness: 8
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 8,
            brightness: 6
          }, {
            color: 0,
            brightness: 1
          }],
          x: [{
            color: 9,
            brightness: 7
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 9,
            brightness: 7
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 9,
            brightness: 9
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 9,
            brightness: 7
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 9,
            brightness: 7
          }],
          check: [{
            color: 0,
            brightness: 1
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 6,
            brightness: 8
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 6,
            brightness: 8
          }, {
            color: 6,
            brightness: 6
          }, {
            color: 6,
            brightness: 8
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 0,
            brightness: 1
          }],
          dot: [{
            color: 0,
            brightness: 1
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 10,
            brightness: 10
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 0,
            brightness: 1
          }],
          frame: [{
            color: 3,
            brightness: 6
          }, {
            color: 3,
            brightness: 6
          }, {
            color: 3,
            brightness: 6
          }, {
            color: 3,
            brightness: 6
          }, {
            color: 0,
            brightness: 1
          }, {
            color: 3,
            brightness: 6
          }, {
            color: 3,
            brightness: 6
          }, {
            color: 3,
            brightness: 6
          }, {
            color: 3,
            brightness: 6
          }]
        };
        var patternData = patterns[pattern] || patterns.dot;
        // Encode to bytes using documented method: brightness*16 + color
        var bytes = patternData.map(function (pixel) {
          var brightness = Math.max(1, Math.min(10, pixel.brightness));
          var color = Math.max(0, Math.min(10, pixel.color));
          return brightness * 16 + color;
        });
        // Convert to hex byte string for Python
        var byteString = bytes.map(function (b) {
          return "\\x".concat(b.toString(16).padStart(2, '0'));
        }).join('');
        // Use documented method from the research
        return this._peripheral.sendPythonCommand("import hub; matrix = hub.port.".concat(port, ".device; matrix.mode(2); matrix.mode(2, b\"").concat(byteString, "\")"));
      }
    }, {
      key: "setMatrix3x3Color",
      value: function setMatrix3x3Color(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        var colorName = Cast.toString(args.COLOR);
        MathUtil.clamp(Cast.toNumber(args.BRIGHTNESS), 1, 10);
        // Map color names to IDs (from documentation)
        var colorMap = {
          'off': 0,
          'magenta': 1,
          'violet': 2,
          'blue': 3,
          'turquoise': 4,
          'mint': 5,
          'green': 6,
          'yellow': 7,
          'orange': 8,
          'red': 9,
          'white': 10
        };
        var colorId = colorMap[colorName] || 0;
        // Use mode 1 for solid color (from documentation)
        return this._peripheral.sendPythonCommand("import hub; matrix = hub.port.".concat(port, ".device; matrix.mode(1); matrix.mode(1, b\"\\x").concat(colorId.toString(16).padStart(2, '0'), "\")"));
      }
    }, {
      key: "setMatrix3x3Pixel",
      value: function setMatrix3x3Pixel(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        var x = MathUtil.clamp(Cast.toNumber(args.X) - 1, 0, 2);
        var y = MathUtil.clamp(Cast.toNumber(args.Y) - 1, 0, 2);
        var colorName = Cast.toString(args.COLOR);
        var brightness = MathUtil.clamp(Cast.toNumber(args.BRIGHTNESS), 1, 10);
        var colorMap = {
          'off': 0,
          'magenta': 1,
          'violet': 2,
          'blue': 3,
          'turquoise': 4,
          'mint': 5,
          'green': 6,
          'yellow': 7,
          'orange': 8,
          'red': 9,
          'white': 10
        };
        var colorId = colorMap[colorName] || 0;
        var value = brightness * 16 + colorId;
        var index = y * 3 + x;
        // Get current matrix state or create new one
        var pythonCode = "\nimport hub\nmatrix = hub.port.".concat(port, ".device\nmatrix.mode(2)\n# Create array of current values (or default to off)\ncurrent = [0x01] * 9  # Default: off with brightness 1\ncurrent[").concat(index, "] = 0x").concat(value.toString(16).padStart(2, '0'), "\n# Convert to byte string\nbyte_string = bytes(current)\nmatrix.mode(2, byte_string)\n");
        return this._peripheral.sendPythonCommand(pythonCode);
      }
    }, {
      key: "setMatrix3x3Level",
      value: function setMatrix3x3Level(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        var level = MathUtil.clamp(Cast.toNumber(args.LEVEL), 0, 9);
        // Use mode 0 for battery level display (from documentation)
        return this._peripheral.sendPythonCommand("import hub; matrix = hub.port.".concat(port, ".device; matrix.mode(0); matrix.mode(0, b\"\\x").concat(level.toString(16).padStart(2, '0'), "\")"));
      }
    }, {
      key: "setMatrix3x3Transition",
      value: function setMatrix3x3Transition(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        var effect = Cast.toString(args.EFFECT);
        // Use mode 3 for transitions (from documentation)
        return this._peripheral.sendPythonCommand("import hub; matrix = hub.port.".concat(port, ".device; matrix.mode(3, b\"\\x").concat(effect.padStart(2, '0'), "\")"));
      }
    }, {
      key: "clearMatrix3x3",
      value: function clearMatrix3x3(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        // Set all pixels to off (brightness 1, color 0)
        return this._peripheral.sendPythonCommand("import hub; matrix = hub.port.".concat(port, ".device; matrix.mode(2); matrix.mode(2, b\"\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x01\\x01\")"));
      }
      // ===== GESTURE IMPLEMENTATIONS (HIGH CONFIDENCE) =====
    }, {
      key: "whenGesture",
      value: function whenGesture(args) {
        return this.isGesture(args);
      }
    }, {
      key: "isGesture",
      value: function isGesture(args) {
        var gesture = Cast.toString(args.GESTURE);
        return this._peripheral.gestures[gesture] || false;
      }
    }, {
      key: "getOrientation",
      value: function getOrientation() {
        var orientationNames = ['up', 'front', 'right', 'down', 'back', 'left'];
        return orientationNames[this._peripheral.orientation] || 'unknown';
      }
      // ===== SOUND IMPLEMENTATIONS (HIGH CONFIDENCE) =====
    }, {
      key: "playHubSound",
      value: function playHubSound(args) {
        var sound = Cast.toString(args.SOUND);
        // Use sound file method
        return this._peripheral.sendPythonCommand("import hub; hub.sound.play(\"/sounds/".concat(sound, "\")"));
      }
    }, {
      key: "playBeep",
      value: function playBeep(args) {
        var frequency = Cast.toNumber(args.FREQUENCY);
        var duration = Cast.toNumber(args.DURATION);
        var standardCommand = this._peripheral.sendCommand('scratch.sound_beep', {
          frequency: frequency,
          duration: duration
        });
        var altCommand = this._peripheral.sendPythonCommand("import hub; hub.sound.beep(".concat(frequency, ", ").concat(duration, ", hub.sound.SOUND_SIN)"));
        return standardCommand.catch(function () {
          return altCommand;
        });
      }
    }, {
      key: "playNote",
      value: function playNote(args) {
        var note = Cast.toNumber(args.NOTE);
        var secs = Cast.toNumber(args.SECS);
        var freq = this._noteToFrequency(note);
        var volume = this._peripheral.volume / 100;
        return this._peripheral.sendPythonCommand("hub.sound.beep(".concat(Math.round(freq), ", ").concat(Math.round(secs * 1000), ", hub.sound.SOUND_SIN, ").concat(volume, ")"));
      }
    }, {
      key: "playWaveBeep",
      value: function playWaveBeep(args) {
        var waveform = Cast.toString(args.WAVEFORM);
        var frequency = Cast.toNumber(args.FREQUENCY);
        var duration = Cast.toNumber(args.DURATION);
        var waveformCode = SoundWaveforms[waveform] || SoundWaveforms.sin;
        // Use advanced beep method
        return this._peripheral.sendPythonCommand("import hub; hub.sound.beep(".concat(frequency, ", ").concat(duration, ", ").concat(waveformCode, ")"));
      }
    }, {
      key: "setVolume",
      value: function setVolume(args) {
        var volume = Cast.toNumber(args.VOLUME);
        this._peripheral._volume = MathUtil.clamp(volume, 0, 100);
        return this._peripheral.sendPythonCommand("hub.sound.volume(".concat(volume, ")"));
      }
    }, {
      key: "stopSound",
      value: function stopSound() {
        return this._peripheral.stopSound();
      }
      // ===== STATUS & TEMPERATURE (FIXED - HIGH CONFIDENCE) =====
    }, {
      key: "getBatteryLevel",
      value: function getBatteryLevel() {
        // FIXED: Return data from continuous sensor loop
        return this._peripheral.battery || 100;
      }
    }, {
      key: "getBatteryTemperature",
      value: function getBatteryTemperature() {
        // FIXED: Return data from continuous sensor loop
        return this._peripheral.temperature || 25;
      }
    }, {
      key: "getHubTemperature",
      value: function getHubTemperature() {
        // FIXED: Return data from continuous sensor loop
        return this._peripheral.hubTemp || 25;
      }
      // ===== TIMER FUNCTIONALITY (NEW) =====
    }, {
      key: "getTimer",
      value: function getTimer() {
        return this._peripheral.timer;
      }
    }, {
      key: "resetTimer",
      value: function resetTimer() {
        this._peripheral._timer.start = Date.now();
        this._peripheral._timer.current = 0;
      }
      // ===== SENSOR IMPLEMENTATIONS (HIGH CONFIDENCE) =====
    }, {
      key: "getDistance",
      value: function getDistance(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        var portData = this._peripheral.portValues[port];
        if (portData && portData.type === 'distance') {
          return portData.distance;
        }
        return 0;
      }
    }, {
      key: "setDistanceLights",
      value: function setDistanceLights(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        var tl = MathUtil.clamp(Cast.toNumber(args.TL), 0, 9);
        var tr = MathUtil.clamp(Cast.toNumber(args.TR), 0, 9);
        var bl = MathUtil.clamp(Cast.toNumber(args.BL), 0, 9);
        var br = MathUtil.clamp(Cast.toNumber(args.BR), 0, 9);
        // Use distance sensor LED control
        return this._peripheral.sendPythonCommand("import hub; dist_sensor = hub.port.".concat(port, ".device; dist_sensor.mode(5, bytes([").concat(tl, ", ").concat(tr, ", ").concat(bl, ", ").concat(br, "]))"));
      }
    }, {
      key: "getColor",
      value: function getColor(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        var portData = this._peripheral.portValues[port];
        if (portData && portData.type === 'color') {
          var colorNames = ['black', 'magenta', 'purple', 'blue', 'azure', 'turquoise', 'green', 'yellow', 'orange', 'red', 'white'];
          return colorNames[portData.color] || 'none';
        }
        return 'none';
      }
    }, {
      key: "getReflection",
      value: function getReflection(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        var portData = this._peripheral.portValues[port];
        if (portData && portData.type === 'color') {
          return portData.reflection || 0;
        }
        return 0;
      }
    }, {
      key: "getAmbientLight",
      value: function getAmbientLight(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        var portData = this._peripheral.portValues[port];
        if (portData && portData.type === 'color') {
          return portData.ambient || 0;
        }
        return 0;
      }
    }, {
      key: "getForce",
      value: function getForce(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        var portData = this._peripheral.portValues[port];
        if (portData && portData.type === 'force') {
          return portData.force || 0;
        }
        return 0;
      }
    }, {
      key: "isForceSensorPressed",
      value: function isForceSensorPressed(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        var portData = this._peripheral.portValues[port];
        if (portData && portData.type === 'force') {
          return portData.pressed || false;
        }
        return false;
      }
      // ===== EVENT-BASED SENSOR BLOCKS (NEW) =====
    }, {
      key: "whenColor",
      value: function whenColor(args) {
        return this.isColor(args);
      }
    }, {
      key: "isColor",
      value: function isColor(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        var color = Cast.toString(args.COLOR);
        var portData = this._peripheral.portValues[port];
        if (portData && portData.type === 'color') {
          var colorNames = ['black', 'magenta', 'purple', 'blue', 'azure', 'turquoise', 'green', 'yellow', 'orange', 'red', 'white'];
          return colorNames[portData.color] === color;
        }
        return false;
      }
    }, {
      key: "whenForceSensor",
      value: function whenForceSensor(args) {
        var port = Cast.toString(args.PORT).trim().toUpperCase();
        var state = Cast.toString(args.STATE);
        var portData = this._peripheral.portValues[port];
        if (portData && portData.type === 'force') {
          switch (state) {
            case 'pressed':
              return portData.pressed;
            case 'hard pressed':
              return portData.force > 8;
            // Force in Newtons for "hard pressed"
            case 'released':
              return !portData.pressed;
          }
        }
        return false;
      }
      // ===== BUTTON IMPLEMENTATIONS (HIGH CONFIDENCE) =====
    }, {
      key: "isButtonPressed",
      value: function isButtonPressed(args) {
        var button = Cast.toString(args.BUTTON);
        var buttonIndex = {
          left: 0,
          center: 1,
          right: 2
        }[button];
        if (buttonIndex !== undefined) {
          return this._peripheral._sensors.buttons[buttonIndex] === 1;
        }
        return false;
      }
    }, {
      key: "whenButtonPressed",
      value: function whenButtonPressed(args) {
        return this.isButtonPressed(args);
      }
      // ===== PYTHON REPL FUNCTIONALITY (NEW) =====
    }, {
      key: "runReplCommand",
      value: function runReplCommand(args) {
        var code = Cast.toString(args.CODE);
        return this._peripheral.sendReplCommand(code);
      }
    }, {
      key: "getReplOutput",
      value: function getReplOutput() {
        return this._peripheral.replOutput || '';
      }
    }, {
      key: "clearReplOutput",
      value: function clearReplOutput() {
        this._peripheral._replOutput = '';
      }
    }, {
      key: "getReplHistory",
      value: function getReplHistory(args) {
        var index = Cast.toNumber(args.INDEX);
        var history = this._peripheral.replHistory;
        if (index === -1) {
          return history[history.length - 1] || '';
        } else if (index >= 0 && index < history.length) {
          return history[index] || '';
        }
        return '';
      }
      // ===== PYTHON COMMANDS (HIGH CONFIDENCE) =====
    }, {
      key: "runPythonCommand",
      value: function runPythonCommand(args) {
        var code = Cast.toString(args.CODE);
        return this._peripheral.sendPythonCommand(code);
      }
    }, {
      key: "runHubCommand",
      value: function runHubCommand(args) {
        var code = Cast.toString(args.CODE);
        var pythonCode = "import hub; ".concat(code);
        return this._peripheral.sendPythonCommand(pythonCode);
      }
    }, {
      key: "exitScript",
      value: function exitScript() {
        // Use exit method
        return this._peripheral.sendPythonCommand('raise SystemExit');
      }
      // ===== UTILITY METHODS =====
      /**
       * Handle note playing for sound picker integration
       * @param {object} note - Note data
       * @param {string} category - Extension category
       */
    }, {
      key: "_playNoteForPicker",
      value: function _playNoteForPicker(note, category) {
        if (category !== this.getInfo().name) return;
        this.playBeep({
          FREQUENCY: this._noteToFrequency(note),
          DURATION: 250
        });
      }
    }, {
      key: "_noteToFrequency",
      value: function _noteToFrequency(note) {
        return Math.pow(2, (note - 69 + 12) / 12) * 440;
      }
      /**
       * Validate and parse port specification string
       * @param {string} text - Port specification (e.g., "A", "A+B", "A+B+C+D+E+F")
       * @returns {Array} Array of valid port letters
       */
    }, {
      key: "_validatePorts",
      value: function _validatePorts(text) {
        return text.toUpperCase().replace(/[^ABCDEF]/g, '').split('').filter(function (x, i, self) {
          return self.indexOf(x) === i;
        }).sort();
      }
    }], [{
      key: "EXTENSION_ID",
      get: function get() {
        return 'spikeprime';
      }
    }, {
      key: "extensionURL",
      get: function get() {
        return extensionURL;
      },
      set: function set(url) {
        extensionURL = url;
      }
    }]);
  }();
  _defineProperty(Scratch3SpikePrimeBlocks, "fieldRegistered", false);
  _spikeprimebtc.blockClass = Scratch3SpikePrimeBlocks;
  _spikeprimebtc.blockClass = Scratch3SpikePrimeBlocks;
  return _spikeprimebtc;
}

require_spikeprimebtc();
