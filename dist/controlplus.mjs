function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var global$2 = (typeof global !== "undefined" ? global :
  typeof self !== "undefined" ? self :
  typeof window !== "undefined" ? window : {});

var global$1 = typeof global$2 !== "undefined" ? global$2 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

var env = {};

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
  return new Date().getTime();
};
var process = {
  env: env};

var react = {exports: {}};

function _typeof$1(o) {
  "@babel/helpers - typeof";

  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof$1(o);
}

var react_production_min = {};

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var objectAssign;
var hasRequiredObjectAssign;
function requireObjectAssign() {
  if (hasRequiredObjectAssign) return objectAssign;
  hasRequiredObjectAssign = 1;
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;
  function toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError('Object.assign cannot be called with null or undefined');
    }
    return Object(val);
  }
  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      }

      // Detect buggy property enumeration order in older V8 versions.

      // https://bugs.chromium.org/p/v8/issues/detail?id=4118
      var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
      test1[5] = 'de';
      if (Object.getOwnPropertyNames(test1)[0] === '5') {
        return false;
      }

      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test2 = {};
      for (var i = 0; i < 10; i++) {
        test2['_' + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
        return test2[n];
      });
      if (order2.join('') !== '0123456789') {
        return false;
      }

      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test3 = {};
      'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
        test3[letter] = letter;
      });
      if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
        return false;
      }
      return true;
    } catch (err) {
      // We don't expect any of the above to throw, but better to be safe.
      return false;
    }
  }
  objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
    var from;
    var to = toObject(target);
    var symbols;
    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);
      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);
        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
          }
        }
      }
    }
    return to;
  };
  return objectAssign;
}

var hasRequiredReact_production_min;
function requireReact_production_min() {
  if (hasRequiredReact_production_min) return react_production_min;
  hasRequiredReact_production_min = 1;
  var l = requireObjectAssign(),
    n = "function" === typeof Symbol && Symbol.for,
    p = n ? Symbol.for("react.element") : 60103,
    q = n ? Symbol.for("react.portal") : 60106,
    r = n ? Symbol.for("react.fragment") : 60107,
    t = n ? Symbol.for("react.strict_mode") : 60108,
    u = n ? Symbol.for("react.profiler") : 60114,
    v = n ? Symbol.for("react.provider") : 60109,
    w = n ? Symbol.for("react.context") : 60110,
    x = n ? Symbol.for("react.forward_ref") : 60112,
    y = n ? Symbol.for("react.suspense") : 60113,
    z = n ? Symbol.for("react.memo") : 60115,
    A = n ? Symbol.for("react.lazy") : 60116,
    B = "function" === typeof Symbol && Symbol.iterator;
  function C(a) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var D = {
      isMounted: function isMounted() {
        return false;
      },
      enqueueForceUpdate: function enqueueForceUpdate() {},
      enqueueReplaceState: function enqueueReplaceState() {},
      enqueueSetState: function enqueueSetState() {}
    },
    E = {};
  function F(a, b, c) {
    this.props = a;
    this.context = b;
    this.refs = E;
    this.updater = c || D;
  }
  F.prototype.isReactComponent = {};
  F.prototype.setState = function (a, b) {
    if ("object" !== _typeof$1(a) && "function" !== typeof a && null != a) throw Error(C(85));
    this.updater.enqueueSetState(this, a, b, "setState");
  };
  F.prototype.forceUpdate = function (a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
  };
  function G() {}
  G.prototype = F.prototype;
  function H(a, b, c) {
    this.props = a;
    this.context = b;
    this.refs = E;
    this.updater = c || D;
  }
  var I = H.prototype = new G();
  I.constructor = H;
  l(I, F.prototype);
  I.isPureReactComponent = true;
  var J = {
      current: null
    },
    K = Object.prototype.hasOwnProperty,
    L = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
  function M(a, b, c) {
    var e,
      d = {},
      g = null,
      k = null;
    if (null != b) for (e in void 0 !== b.ref && (k = b.ref), void 0 !== b.key && (g = "" + b.key), b) K.call(b, e) && !L.hasOwnProperty(e) && (d[e] = b[e]);
    var f = arguments.length - 2;
    if (1 === f) d.children = c;else if (1 < f) {
      for (var h = Array(f), m = 0; m < f; m++) h[m] = arguments[m + 2];
      d.children = h;
    }
    if (a && a.defaultProps) for (e in f = a.defaultProps, f) void 0 === d[e] && (d[e] = f[e]);
    return {
      $$typeof: p,
      type: a,
      key: g,
      ref: k,
      props: d,
      _owner: J.current
    };
  }
  function N(a, b) {
    return {
      $$typeof: p,
      type: a.type,
      key: b,
      ref: a.ref,
      props: a.props,
      _owner: a._owner
    };
  }
  function O(a) {
    return "object" === _typeof$1(a) && null !== a && a.$$typeof === p;
  }
  function escape(a) {
    var b = {
      "=": "=0",
      ":": "=2"
    };
    return "$" + ("" + a).replace(/[=:]/g, function (a) {
      return b[a];
    });
  }
  var P = /\/+/g,
    Q = [];
  function R(a, b, c, e) {
    if (Q.length) {
      var d = Q.pop();
      d.result = a;
      d.keyPrefix = b;
      d.func = c;
      d.context = e;
      d.count = 0;
      return d;
    }
    return {
      result: a,
      keyPrefix: b,
      func: c,
      context: e,
      count: 0
    };
  }
  function S(a) {
    a.result = null;
    a.keyPrefix = null;
    a.func = null;
    a.context = null;
    a.count = 0;
    10 > Q.length && Q.push(a);
  }
  function T(a, b, c, e) {
    var d = _typeof$1(a);
    if ("undefined" === d || "boolean" === d) a = null;
    var g = false;
    if (null === a) g = true;else switch (d) {
      case "string":
      case "number":
        g = true;
        break;
      case "object":
        switch (a.$$typeof) {
          case p:
          case q:
            g = true;
        }
    }
    if (g) return c(e, a, "" === b ? "." + U(a, 0) : b), 1;
    g = 0;
    b = "" === b ? "." : b + ":";
    if (Array.isArray(a)) for (var k = 0; k < a.length; k++) {
      d = a[k];
      var f = b + U(d, k);
      g += T(d, f, c, e);
    } else if (null === a || "object" !== _typeof$1(a) ? f = null : (f = B && a[B] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), k = 0; !(d = a.next()).done;) d = d.value, f = b + U(d, k++), g += T(d, f, c, e);else if ("object" === d) throw c = "" + a, Error(C(31, "[object Object]" === c ? "object with keys {" + Object.keys(a).join(", ") + "}" : c, ""));
    return g;
  }
  function V(a, b, c) {
    return null == a ? 0 : T(a, "", b, c);
  }
  function U(a, b) {
    return "object" === _typeof$1(a) && null !== a && null != a.key ? escape(a.key) : b.toString(36);
  }
  function W(a, b) {
    a.func.call(a.context, b, a.count++);
  }
  function aa(a, b, c) {
    var e = a.result,
      d = a.keyPrefix;
    a = a.func.call(a.context, b, a.count++);
    Array.isArray(a) ? X(a, e, c, function (a) {
      return a;
    }) : null != a && (O(a) && (a = N(a, d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(P, "$&/") + "/") + c)), e.push(a));
  }
  function X(a, b, c, e, d) {
    var g = "";
    null != c && (g = ("" + c).replace(P, "$&/") + "/");
    b = R(b, g, e, d);
    V(a, aa, b);
    S(b);
  }
  var Y = {
    current: null
  };
  function Z() {
    var a = Y.current;
    if (null === a) throw Error(C(321));
    return a;
  }
  var ba = {
    ReactCurrentDispatcher: Y,
    ReactCurrentBatchConfig: {
      suspense: null
    },
    ReactCurrentOwner: J,
    IsSomeRendererActing: {
      current: false
    },
    assign: l
  };
  react_production_min.Children = {
    map: function map(a, b, c) {
      if (null == a) return a;
      var e = [];
      X(a, e, null, b, c);
      return e;
    },
    forEach: function forEach(a, b, c) {
      if (null == a) return a;
      b = R(null, null, b, c);
      V(a, W, b);
      S(b);
    },
    count: function count(a) {
      return V(a, function () {
        return null;
      }, null);
    },
    toArray: function toArray(a) {
      var b = [];
      X(a, b, null, function (a) {
        return a;
      });
      return b;
    },
    only: function only(a) {
      if (!O(a)) throw Error(C(143));
      return a;
    }
  };
  react_production_min.Component = F;
  react_production_min.Fragment = r;
  react_production_min.Profiler = u;
  react_production_min.PureComponent = H;
  react_production_min.StrictMode = t;
  react_production_min.Suspense = y;
  react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ba;
  react_production_min.cloneElement = function (a, b, c) {
    if (null === a || void 0 === a) throw Error(C(267, a));
    var e = l({}, a.props),
      d = a.key,
      g = a.ref,
      k = a._owner;
    if (null != b) {
      void 0 !== b.ref && (g = b.ref, k = J.current);
      void 0 !== b.key && (d = "" + b.key);
      if (a.type && a.type.defaultProps) var f = a.type.defaultProps;
      for (h in b) K.call(b, h) && !L.hasOwnProperty(h) && (e[h] = void 0 === b[h] && void 0 !== f ? f[h] : b[h]);
    }
    var h = arguments.length - 2;
    if (1 === h) e.children = c;else if (1 < h) {
      f = Array(h);
      for (var m = 0; m < h; m++) f[m] = arguments[m + 2];
      e.children = f;
    }
    return {
      $$typeof: p,
      type: a.type,
      key: d,
      ref: g,
      props: e,
      _owner: k
    };
  };
  react_production_min.createContext = function (a, b) {
    void 0 === b && (b = null);
    a = {
      $$typeof: w,
      _calculateChangedBits: b,
      _currentValue: a,
      _currentValue2: a,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    };
    a.Provider = {
      $$typeof: v,
      _context: a
    };
    return a.Consumer = a;
  };
  react_production_min.createElement = M;
  react_production_min.createFactory = function (a) {
    var b = M.bind(null, a);
    b.type = a;
    return b;
  };
  react_production_min.createRef = function () {
    return {
      current: null
    };
  };
  react_production_min.forwardRef = function (a) {
    return {
      $$typeof: x,
      render: a
    };
  };
  react_production_min.isValidElement = O;
  react_production_min.lazy = function (a) {
    return {
      $$typeof: A,
      _ctor: a,
      _status: -1,
      _result: null
    };
  };
  react_production_min.memo = function (a, b) {
    return {
      $$typeof: z,
      type: a,
      compare: void 0 === b ? null : b
    };
  };
  react_production_min.useCallback = function (a, b) {
    return Z().useCallback(a, b);
  };
  react_production_min.useContext = function (a, b) {
    return Z().useContext(a, b);
  };
  react_production_min.useDebugValue = function () {};
  react_production_min.useEffect = function (a, b) {
    return Z().useEffect(a, b);
  };
  react_production_min.useImperativeHandle = function (a, b, c) {
    return Z().useImperativeHandle(a, b, c);
  };
  react_production_min.useLayoutEffect = function (a, b) {
    return Z().useLayoutEffect(a, b);
  };
  react_production_min.useMemo = function (a, b) {
    return Z().useMemo(a, b);
  };
  react_production_min.useReducer = function (a, b, c) {
    return Z().useReducer(a, b, c);
  };
  react_production_min.useRef = function (a) {
    return Z().useRef(a);
  };
  react_production_min.useState = function (a) {
    return Z().useState(a);
  };
  react_production_min.version = "16.14.0";
  return react_production_min;
}

var react_development = {};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ReactPropTypesSecret_1;
var hasRequiredReactPropTypesSecret;
function requireReactPropTypesSecret() {
  if (hasRequiredReactPropTypesSecret) return ReactPropTypesSecret_1;
  hasRequiredReactPropTypesSecret = 1;
  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  ReactPropTypesSecret_1 = ReactPropTypesSecret;
  return ReactPropTypesSecret_1;
}

var has;
var hasRequiredHas;
function requireHas() {
  if (hasRequiredHas) return has;
  hasRequiredHas = 1;
  has = Function.call.bind(Object.prototype.hasOwnProperty);
  return has;
}

var checkPropTypes_1;
var hasRequiredCheckPropTypes;
function requireCheckPropTypes() {
  if (hasRequiredCheckPropTypes) return checkPropTypes_1;
  hasRequiredCheckPropTypes = 1;
  var printWarning = function printWarning() {};
  if (process.env.NODE_ENV !== 'production') {
    var ReactPropTypesSecret = /*@__PURE__*/requireReactPropTypesSecret();
    var loggedTypeFailures = {};
    var has = /*@__PURE__*/requireHas();
    printWarning = function printWarning(text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {/**/}
    };
  }

  /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   * @private
   */
  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    if (process.env.NODE_ENV !== 'production') {
      for (var typeSpecName in typeSpecs) {
        if (has(typeSpecs, typeSpecName)) {
          var error;
          // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.
          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
              var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + _typeof$1(typeSpecs[typeSpecName]) + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
              err.name = 'Invariant Violation';
              throw err;
            }
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error)) {
            printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + _typeof$1(error) + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
          }
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true;
            var stack = getStack ? getStack() : '';
            printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
          }
        }
      }
    }
  }

  /**
   * Resets warning cache when testing.
   *
   * @private
   */
  checkPropTypes.resetWarningCache = function () {
    if (process.env.NODE_ENV !== 'production') {
      loggedTypeFailures = {};
    }
  };
  checkPropTypes_1 = checkPropTypes;
  return checkPropTypes_1;
}

var hasRequiredReact_development;
function requireReact_development() {
  if (hasRequiredReact_development) return react_development;
  hasRequiredReact_development = 1;
  if (process.env.NODE_ENV !== "production") {
    (function () {

      var _assign = requireObjectAssign();
      var checkPropTypes = /*@__PURE__*/requireCheckPropTypes();
      var ReactVersion = '16.14.0';

      // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
      // nor polyfill, then a plain number is used for performance.
      var hasSymbol = typeof Symbol === 'function' && Symbol.for;
      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
      var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
      var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
      var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
      var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
      var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
      var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
      var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
      var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
      var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
      var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
      var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
      var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
      var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
      var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
      var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
      var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;
      var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = '@@iterator';
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || _typeof$1(maybeIterable) !== 'object') {
          return null;
        }
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === 'function') {
          return maybeIterator;
        }
        return null;
      }

      /**
       * Keeps track of the current dispatcher.
       */
      var ReactCurrentDispatcher = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      };

      /**
       * Keeps track of the current batch's configuration such as how long an update
       * should suspend for if it needs to.
       */
      var ReactCurrentBatchConfig = {
        suspense: null
      };

      /**
       * Keeps track of the current owner.
       *
       * The current owner is the component who should own any components that are
       * currently being constructed.
       */
      var ReactCurrentOwner = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      };
      var BEFORE_SLASH_RE = /^(.*)[\\\/]/;
      function describeComponentFrame(name, source, ownerName) {
        var sourceInfo = '';
        if (source) {
          var path = source.fileName;
          var fileName = path.replace(BEFORE_SLASH_RE, '');
          {
            // In DEV, include code for a common special case:
            // prefer "folder/index.js" instead of just "index.js".
            if (/^index\./.test(fileName)) {
              var match = path.match(BEFORE_SLASH_RE);
              if (match) {
                var pathBeforeSlash = match[1];
                if (pathBeforeSlash) {
                  var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
                  fileName = folderName + '/' + fileName;
                }
              }
            }
          }
          sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
        } else if (ownerName) {
          sourceInfo = ' (created by ' + ownerName + ')';
        }
        return '\n    in ' + (name || 'Unknown') + sourceInfo;
      }
      var Resolved = 1;
      function refineResolvedLazyComponent(lazyComponent) {
        return lazyComponent._status === Resolved ? lazyComponent._result : null;
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var functionName = innerType.displayName || innerType.name || '';
        return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
      }
      function getComponentName(type) {
        if (type == null) {
          // Host root, text node or just invalid type.
          return null;
        }
        {
          if (typeof type.tag === 'number') {
            error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
          }
        }
        if (typeof type === 'function') {
          return type.displayName || type.name || null;
        }
        if (typeof type === 'string') {
          return type;
        }
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return 'Fragment';
          case REACT_PORTAL_TYPE:
            return 'Portal';
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return 'StrictMode';
          case REACT_SUSPENSE_TYPE:
            return 'Suspense';
          case REACT_SUSPENSE_LIST_TYPE:
            return 'SuspenseList';
        }
        if (_typeof$1(type) === 'object') {
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              return 'Context.Consumer';
            case REACT_PROVIDER_TYPE:
              return 'Context.Provider';
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, 'ForwardRef');
            case REACT_MEMO_TYPE:
              return getComponentName(type.type);
            case REACT_BLOCK_TYPE:
              return getComponentName(type.render);
            case REACT_LAZY_TYPE:
              {
                var thenable = type;
                var resolvedThenable = refineResolvedLazyComponent(thenable);
                if (resolvedThenable) {
                  return getComponentName(resolvedThenable);
                }
                break;
              }
          }
        }
        return null;
      }
      var ReactDebugCurrentFrame = {};
      var currentlyValidatingElement = null;
      function setCurrentlyValidatingElement(element) {
        {
          currentlyValidatingElement = element;
        }
      }
      {
        // Stack implementation injected by the current renderer.
        ReactDebugCurrentFrame.getCurrentStack = null;
        ReactDebugCurrentFrame.getStackAddendum = function () {
          var stack = ''; // Add an extra top frame while an element is being validated

          if (currentlyValidatingElement) {
            var name = getComponentName(currentlyValidatingElement.type);
            var owner = currentlyValidatingElement._owner;
            stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
          } // Delegate to the injected renderer-specific implementation

          var impl = ReactDebugCurrentFrame.getCurrentStack;
          if (impl) {
            stack += impl() || '';
          }
          return stack;
        };
      }

      /**
       * Used by act() to track whether you're inside an act() scope.
       */
      var IsSomeRendererActing = {
        current: false
      };
      var ReactSharedInternals = {
        ReactCurrentDispatcher: ReactCurrentDispatcher,
        ReactCurrentBatchConfig: ReactCurrentBatchConfig,
        ReactCurrentOwner: ReactCurrentOwner,
        IsSomeRendererActing: IsSomeRendererActing,
        // Used by renderers to avoid bundling object-assign twice in UMD bundles:
        assign: _assign
      };
      {
        _assign(ReactSharedInternals, {
          // These should not be included in production.
          ReactDebugCurrentFrame: ReactDebugCurrentFrame,
          // Shim for React DOM 16.0.0 which still destructured (but not used) this.
          // TODO: remove in React 17.0.
          ReactComponentTreeHook: {}
        });
      }

      // by calls to these methods by a Babel plugin.
      //
      // In PROD (or in packages without access to React internals),
      // they are left as they are instead.

      function warn(format) {
        {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          printWarning('warn', format, args);
        }
      }
      function error(format) {
        {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }
          printWarning('error', format, args);
        }
      }
      function printWarning(level, format, args) {
        // When changing this logic, you might want to also
        // update consoleWithStackDev.www.js as well.
        {
          var hasExistingStack = args.length > 0 && typeof args[args.length - 1] === 'string' && args[args.length - 1].indexOf('\n    in') === 0;
          if (!hasExistingStack) {
            var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame.getStackAddendum();
            if (stack !== '') {
              format += '%s';
              args = args.concat([stack]);
            }
          }
          var argsWithFormat = args.map(function (item) {
            return '' + item;
          }); // Careful: RN currently depends on this prefix

          argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
          // breaks IE9: https://github.com/facebook/react/issues/13610
          // eslint-disable-next-line react-internal/no-production-logging

          Function.prototype.apply.call(console[level], console, argsWithFormat);
          try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            var argIndex = 0;
            var message = 'Warning: ' + format.replace(/%s/g, function () {
              return args[argIndex++];
            });
            throw new Error(message);
          } catch (x) {}
        }
      }
      var didWarnStateUpdateForUnmountedComponent = {};
      function warnNoop(publicInstance, callerName) {
        {
          var _constructor = publicInstance.constructor;
          var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
          var warningKey = componentName + "." + callerName;
          if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
            return;
          }
          error("Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
          didWarnStateUpdateForUnmountedComponent[warningKey] = true;
        }
      }
      /**
       * This is the abstract API for an update queue.
       */

      var ReactNoopUpdateQueue = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function isMounted(publicInstance) {
          return false;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function enqueueForceUpdate(publicInstance, callback, callerName) {
          warnNoop(publicInstance, 'forceUpdate');
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState, callback, callerName) {
          warnNoop(publicInstance, 'replaceState');
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function enqueueSetState(publicInstance, partialState, callback, callerName) {
          warnNoop(publicInstance, 'setState');
        }
      };
      var emptyObject = {};
      {
        Object.freeze(emptyObject);
      }
      /**
       * Base class helpers for the updating state of a component.
       */

      function Component(props, context, updater) {
        this.props = props;
        this.context = context; // If a component has string refs, we will assign a different object later.

        this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
        // renderer.

        this.updater = updater || ReactNoopUpdateQueue;
      }
      Component.prototype.isReactComponent = {};
      /**
       * Sets a subset of the state. Always use this to mutate
       * state. You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * There is no guarantee that calls to `setState` will run synchronously,
       * as they may eventually be batched together.  You can provide an optional
       * callback that will be executed when the call to setState is actually
       * completed.
       *
       * When a function is provided to setState, it will be called at some point in
       * the future (not synchronously). It will be called with the up to date
       * component arguments (state, props, context). These values can be different
       * from this.* because your function may be called after receiveProps but before
       * shouldComponentUpdate, and this new state, props, and context will not yet be
       * assigned to this.
       *
       * @param {object|function} partialState Next partial state or function to
       *        produce next partial state to be merged with current state.
       * @param {?function} callback Called after state is updated.
       * @final
       * @protected
       */

      Component.prototype.setState = function (partialState, callback) {
        if (!(_typeof$1(partialState) === 'object' || typeof partialState === 'function' || partialState == null)) {
          {
            throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
          }
        }
        this.updater.enqueueSetState(this, partialState, callback, 'setState');
      };
      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {?function} callback Called after update is complete.
       * @final
       * @protected
       */

      Component.prototype.forceUpdate = function (callback) {
        this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
      };
      /**
       * Deprecated APIs. These APIs used to exist on classic React classes but since
       * we would like to deprecate them, we're not going to move them over to this
       * modern base class. Instead, we define a getter that warns if it's accessed.
       */

      {
        var deprecatedAPIs = {
          isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
          replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
        };
        var defineDeprecationWarning = function defineDeprecationWarning(methodName, info) {
          Object.defineProperty(Component.prototype, methodName, {
            get: function get() {
              warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
              return undefined;
            }
          });
        };
        for (var fnName in deprecatedAPIs) {
          if (deprecatedAPIs.hasOwnProperty(fnName)) {
            defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
          }
        }
      }
      function ComponentDummy() {}
      ComponentDummy.prototype = Component.prototype;
      /**
       * Convenience component with default shallow equality check for sCU.
       */

      function PureComponent(props, context, updater) {
        this.props = props;
        this.context = context; // If a component has string refs, we will assign a different object later.

        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
      pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

      _assign(pureComponentPrototype, Component.prototype);
      pureComponentPrototype.isPureReactComponent = true;

      // an immutable object with a single mutable value
      function createRef() {
        var refObject = {
          current: null
        };
        {
          Object.seal(refObject);
        }
        return refObject;
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      };
      var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
      {
        didWarnAboutStringRefs = {};
      }
      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, 'ref')) {
            var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== undefined;
      }
      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, 'key')) {
            var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== undefined;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        var warnAboutAccessingKey = function warnAboutAccessingKey() {
          {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;
              error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
            }
          }
        };
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, 'key', {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function defineRefPropWarningGetter(props, displayName) {
        var warnAboutAccessingRef = function warnAboutAccessingRef() {
          {
            if (!specialPropRefWarningShown) {
              specialPropRefWarningShown = true;
              error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
            }
          }
        };
        warnAboutAccessingRef.isReactWarning = true;
        Object.defineProperty(props, 'ref', {
          get: warnAboutAccessingRef,
          configurable: true
        });
      }
      function warnIfStringRefCannotBeAutoConverted(config) {
        {
          if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
            var componentName = getComponentName(ReactCurrentOwner.current.type);
            if (!didWarnAboutStringRefs[componentName]) {
              error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://fb.me/react-strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config.ref);
              didWarnAboutStringRefs[componentName] = true;
            }
          }
        }
      }
      /**
       * Factory method to create a new React element. This no longer adheres to
       * the class pattern, so do not use new to call it. Also, instanceof check
       * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
       * if something is a React Element.
       *
       * @param {*} type
       * @param {*} props
       * @param {*} key
       * @param {string|object} ref
       * @param {*} owner
       * @param {*} self A *temporary* helper to detect places where `this` is
       * different from the `owner` when React.createElement is called, so that we
       * can warn. We want to get rid of owner and replace string `ref`s with arrow
       * functions, and as long as `this` and owner are the same, there will be no
       * change in behavior.
       * @param {*} source An annotation object (added by a transpiler or otherwise)
       * indicating filename, line number, and/or other information.
       * @internal
       */

      var ReactElement = function ReactElement(type, key, ref, self, source, owner, props) {
        var element = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: REACT_ELEMENT_TYPE,
          // Built-in properties that belong on the element
          type: type,
          key: key,
          ref: ref,
          props: props,
          // Record the component responsible for creating this element.
          _owner: owner
        };
        {
          // The validation flag is currently mutative. We put it on
          // an external backing store so that we can freeze the whole object.
          // This can be replaced with a WeakMap once they are implemented in
          // commonly used development environments.
          element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
          // the validation flag non-enumerable (where possible, which should
          // include every environment we run tests in), so the test framework
          // ignores it.

          Object.defineProperty(element._store, 'validated', {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          }); // self and source are DEV only properties.

          Object.defineProperty(element, '_self', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self
          }); // Two elements created in two different places should be considered
          // equal for testing purposes and therefore we hide it from enumeration.

          Object.defineProperty(element, '_source', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
          });
          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }
        return element;
      };
      /**
       * Create and return a new ReactElement of the given type.
       * See https://reactjs.org/docs/react-api.html#createelement
       */

      function createElement(type, config, children) {
        var propName; // Reserved names are extracted

        var props = {};
        var key = null;
        var ref = null;
        var self = null;
        var source = null;
        if (config != null) {
          if (hasValidRef(config)) {
            ref = config.ref;
            {
              warnIfStringRefCannotBeAutoConverted(config);
            }
          }
          if (hasValidKey(config)) {
            key = '' + config.key;
          }
          self = config.__self === undefined ? null : config.__self;
          source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              props[propName] = config[propName];
            }
          }
        } // Children can be more than one argument, and those are transferred onto
        // the newly allocated props object.

        var childrenLength = arguments.length - 2;
        if (childrenLength === 1) {
          props.children = children;
        } else if (childrenLength > 1) {
          var childArray = Array(childrenLength);
          for (var i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
          }
          {
            if (Object.freeze) {
              Object.freeze(childArray);
            }
          }
          props.children = childArray;
        } // Resolve default props

        if (type && type.defaultProps) {
          var defaultProps = type.defaultProps;
          for (propName in defaultProps) {
            if (props[propName] === undefined) {
              props[propName] = defaultProps[propName];
            }
          }
        }
        {
          if (key || ref) {
            var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
        }
        return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
        return newElement;
      }
      /**
       * Clone and return a new ReactElement using element as the starting point.
       * See https://reactjs.org/docs/react-api.html#cloneelement
       */

      function cloneElement(element, config, children) {
        if (!!(element === null || element === undefined)) {
          {
            throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
          }
        }
        var propName; // Original props are copied

        var props = _assign({}, element.props); // Reserved names are extracted

        var key = element.key;
        var ref = element.ref; // Self is preserved since the owner is preserved.

        var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
        // transpiler, and the original source is probably a better indicator of the
        // true owner.

        var source = element._source; // Owner will be preserved, unless ref is overridden

        var owner = element._owner;
        if (config != null) {
          if (hasValidRef(config)) {
            // Silently steal the ref from the parent.
            ref = config.ref;
            owner = ReactCurrentOwner.current;
          }
          if (hasValidKey(config)) {
            key = '' + config.key;
          } // Remaining properties override existing props

          var defaultProps;
          if (element.type && element.type.defaultProps) {
            defaultProps = element.type.defaultProps;
          }
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              if (config[propName] === undefined && defaultProps !== undefined) {
                // Resolve default props
                props[propName] = defaultProps[propName];
              } else {
                props[propName] = config[propName];
              }
            }
          }
        } // Children can be more than one argument, and those are transferred onto
        // the newly allocated props object.

        var childrenLength = arguments.length - 2;
        if (childrenLength === 1) {
          props.children = children;
        } else if (childrenLength > 1) {
          var childArray = Array(childrenLength);
          for (var i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
          }
          props.children = childArray;
        }
        return ReactElement(element.type, key, ref, self, source, owner, props);
      }
      /**
       * Verifies the object is a ReactElement.
       * See https://reactjs.org/docs/react-api.html#isvalidelement
       * @param {?object} object
       * @return {boolean} True if `object` is a ReactElement.
       * @final
       */

      function isValidElement(object) {
        return _typeof$1(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      var SEPARATOR = '.';
      var SUBSEPARATOR = ':';
      /**
       * Escape and wrap key so it is safe to use as a reactid
       *
       * @param {string} key to be escaped.
       * @return {string} the escaped key.
       */

      function escape(key) {
        var escapeRegex = /[=:]/g;
        var escaperLookup = {
          '=': '=0',
          ':': '=2'
        };
        var escapedString = ('' + key).replace(escapeRegex, function (match) {
          return escaperLookup[match];
        });
        return '$' + escapedString;
      }
      /**
       * TODO: Test that a single child and an array with one item have the same key
       * pattern.
       */

      var didWarnAboutMaps = false;
      var userProvidedKeyEscapeRegex = /\/+/g;
      function escapeUserProvidedKey(text) {
        return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
      }
      var POOL_SIZE = 10;
      var traverseContextPool = [];
      function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
        if (traverseContextPool.length) {
          var traverseContext = traverseContextPool.pop();
          traverseContext.result = mapResult;
          traverseContext.keyPrefix = keyPrefix;
          traverseContext.func = mapFunction;
          traverseContext.context = mapContext;
          traverseContext.count = 0;
          return traverseContext;
        } else {
          return {
            result: mapResult,
            keyPrefix: keyPrefix,
            func: mapFunction,
            context: mapContext,
            count: 0
          };
        }
      }
      function releaseTraverseContext(traverseContext) {
        traverseContext.result = null;
        traverseContext.keyPrefix = null;
        traverseContext.func = null;
        traverseContext.context = null;
        traverseContext.count = 0;
        if (traverseContextPool.length < POOL_SIZE) {
          traverseContextPool.push(traverseContext);
        }
      }
      /**
       * @param {?*} children Children tree container.
       * @param {!string} nameSoFar Name of the key path so far.
       * @param {!function} callback Callback to invoke with each child found.
       * @param {?*} traverseContext Used to pass information throughout the traversal
       * process.
       * @return {!number} The number of children in this subtree.
       */

      function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
        var type = _typeof$1(children);
        if (type === 'undefined' || type === 'boolean') {
          // All of the above are perceived as null.
          children = null;
        }
        var invokeCallback = false;
        if (children === null) {
          invokeCallback = true;
        } else {
          switch (type) {
            case 'string':
            case 'number':
              invokeCallback = true;
              break;
            case 'object':
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
              }
          }
        }
        if (invokeCallback) {
          callback(traverseContext, children,
          // If it's the only child, treat the name as if it was wrapped in an array
          // so that it's consistent if the number of children grows.
          nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
          return 1;
        }
        var child;
        var nextName;
        var subtreeCount = 0; // Count of children found in the current subtree.

        var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;
        if (Array.isArray(children)) {
          for (var i = 0; i < children.length; i++) {
            child = children[i];
            nextName = nextNamePrefix + getComponentKey(child, i);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        } else {
          var iteratorFn = getIteratorFn(children);
          if (typeof iteratorFn === 'function') {
            {
              // Warn about using Maps as children
              if (iteratorFn === children.entries) {
                if (!didWarnAboutMaps) {
                  warn('Using Maps as children is deprecated and will be removed in ' + 'a future major release. Consider converting children to ' + 'an array of keyed ReactElements instead.');
                }
                didWarnAboutMaps = true;
              }
            }
            var iterator = iteratorFn.call(children);
            var step;
            var ii = 0;
            while (!(step = iterator.next()).done) {
              child = step.value;
              nextName = nextNamePrefix + getComponentKey(child, ii++);
              subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
            }
          } else if (type === 'object') {
            var addendum = '';
            {
              addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
            }
            var childrenString = '' + children;
            {
              {
                throw Error("Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + ")." + addendum);
              }
            }
          }
        }
        return subtreeCount;
      }
      /**
       * Traverses children that are typically specified as `props.children`, but
       * might also be specified through attributes:
       *
       * - `traverseAllChildren(this.props.children, ...)`
       * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
       *
       * The `traverseContext` is an optional argument that is passed through the
       * entire traversal. It can be used to store accumulations or anything else that
       * the callback might find relevant.
       *
       * @param {?*} children Children tree object.
       * @param {!function} callback To invoke upon traversing each child.
       * @param {?*} traverseContext Context for traversal.
       * @return {!number} The number of children in this subtree.
       */

      function traverseAllChildren(children, callback, traverseContext) {
        if (children == null) {
          return 0;
        }
        return traverseAllChildrenImpl(children, '', callback, traverseContext);
      }
      /**
       * Generate a key string that identifies a component within a set.
       *
       * @param {*} component A component that could contain a manual key.
       * @param {number} index Index that is used if a manual key is not provided.
       * @return {string}
       */

      function getComponentKey(component, index) {
        // Do some typechecking here since we call this blindly. We want to ensure
        // that we don't block potential future ES APIs.
        if (_typeof$1(component) === 'object' && component !== null && component.key != null) {
          // Explicit key
          return escape(component.key);
        } // Implicit key determined by the index in the set

        return index.toString(36);
      }
      function forEachSingleChild(bookKeeping, child, name) {
        var func = bookKeeping.func,
          context = bookKeeping.context;
        func.call(context, child, bookKeeping.count++);
      }
      /**
       * Iterates through children that are typically specified as `props.children`.
       *
       * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
       *
       * The provided forEachFunc(child, index) will be called for each
       * leaf child.
       *
       * @param {?*} children Children tree container.
       * @param {function(*, int)} forEachFunc
       * @param {*} forEachContext Context for forEachContext.
       */

      function forEachChildren(children, forEachFunc, forEachContext) {
        if (children == null) {
          return children;
        }
        var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
        traverseAllChildren(children, forEachSingleChild, traverseContext);
        releaseTraverseContext(traverseContext);
      }
      function mapSingleChildIntoContext(bookKeeping, child, childKey) {
        var result = bookKeeping.result,
          keyPrefix = bookKeeping.keyPrefix,
          func = bookKeeping.func,
          context = bookKeeping.context;
        var mappedChild = func.call(context, child, bookKeeping.count++);
        if (Array.isArray(mappedChild)) {
          mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function (c) {
            return c;
          });
        } else if (mappedChild != null) {
          if (isValidElement(mappedChild)) {
            mappedChild = cloneAndReplaceKey(mappedChild,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
          }
          result.push(mappedChild);
        }
      }
      function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
        var escapedPrefix = '';
        if (prefix != null) {
          escapedPrefix = escapeUserProvidedKey(prefix) + '/';
        }
        var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
        traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
        releaseTraverseContext(traverseContext);
      }
      /**
       * Maps children that are typically specified as `props.children`.
       *
       * See https://reactjs.org/docs/react-api.html#reactchildrenmap
       *
       * The provided mapFunction(child, key, index) will be called for each
       * leaf child.
       *
       * @param {?*} children Children tree container.
       * @param {function(*, int)} func The map function.
       * @param {*} context Context for mapFunction.
       * @return {object} Object containing the ordered map of results.
       */

      function mapChildren(children, func, context) {
        if (children == null) {
          return children;
        }
        var result = [];
        mapIntoWithKeyPrefixInternal(children, result, null, func, context);
        return result;
      }
      /**
       * Count the number of children that are typically specified as
       * `props.children`.
       *
       * See https://reactjs.org/docs/react-api.html#reactchildrencount
       *
       * @param {?*} children Children tree container.
       * @return {number} The number of children.
       */

      function countChildren(children) {
        return traverseAllChildren(children, function () {
          return null;
        }, null);
      }
      /**
       * Flatten a children object (typically specified as `props.children`) and
       * return an array with appropriately re-keyed children.
       *
       * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
       */

      function toArray(children) {
        var result = [];
        mapIntoWithKeyPrefixInternal(children, result, null, function (child) {
          return child;
        });
        return result;
      }
      /**
       * Returns the first child in a collection of children and verifies that there
       * is only one child in the collection.
       *
       * See https://reactjs.org/docs/react-api.html#reactchildrenonly
       *
       * The current implementation of this function assumes that a single child gets
       * passed without a wrapper, but the purpose of this helper function is to
       * abstract away the particular structure of children.
       *
       * @param {?object} children Child collection structure.
       * @return {ReactElement} The first and only `ReactElement` contained in the
       * structure.
       */

      function onlyChild(children) {
        if (!isValidElement(children)) {
          {
            throw Error("React.Children.only expected to receive a single React element child.");
          }
        }
        return children;
      }
      function createContext(defaultValue, calculateChangedBits) {
        if (calculateChangedBits === undefined) {
          calculateChangedBits = null;
        } else {
          {
            if (calculateChangedBits !== null && typeof calculateChangedBits !== 'function') {
              error('createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits);
            }
          }
        }
        var context = {
          $$typeof: REACT_CONTEXT_TYPE,
          _calculateChangedBits: calculateChangedBits,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null
        };
        context.Provider = {
          $$typeof: REACT_PROVIDER_TYPE,
          _context: context
        };
        var hasWarnedAboutUsingNestedContextConsumers = false;
        var hasWarnedAboutUsingConsumerProvider = false;
        {
          // A separate object, but proxies back to the original context object for
          // backwards compatibility. It has a different $$typeof, so we can properly
          // warn for the incorrect usage of Context as a Consumer.
          var Consumer = {
            $$typeof: REACT_CONTEXT_TYPE,
            _context: context,
            _calculateChangedBits: context._calculateChangedBits
          }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

          Object.defineProperties(Consumer, {
            Provider: {
              get: function get() {
                if (!hasWarnedAboutUsingConsumerProvider) {
                  hasWarnedAboutUsingConsumerProvider = true;
                  error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
                }
                return context.Provider;
              },
              set: function set(_Provider) {
                context.Provider = _Provider;
              }
            },
            _currentValue: {
              get: function get() {
                return context._currentValue;
              },
              set: function set(_currentValue) {
                context._currentValue = _currentValue;
              }
            },
            _currentValue2: {
              get: function get() {
                return context._currentValue2;
              },
              set: function set(_currentValue2) {
                context._currentValue2 = _currentValue2;
              }
            },
            _threadCount: {
              get: function get() {
                return context._threadCount;
              },
              set: function set(_threadCount) {
                context._threadCount = _threadCount;
              }
            },
            Consumer: {
              get: function get() {
                if (!hasWarnedAboutUsingNestedContextConsumers) {
                  hasWarnedAboutUsingNestedContextConsumers = true;
                  error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
                }
                return context.Consumer;
              }
            }
          }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

          context.Consumer = Consumer;
        }
        {
          context._currentRenderer = null;
          context._currentRenderer2 = null;
        }
        return context;
      }
      function lazy(ctor) {
        var lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _ctor: ctor,
          // React uses these fields to store the result.
          _status: -1,
          _result: null
        };
        {
          // In production, this would just set it on the object.
          var defaultProps;
          var propTypes;
          Object.defineProperties(lazyType, {
            defaultProps: {
              configurable: true,
              get: function get() {
                return defaultProps;
              },
              set: function set(newDefaultProps) {
                error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
                defaultProps = newDefaultProps; // Match production behavior more closely:

                Object.defineProperty(lazyType, 'defaultProps', {
                  enumerable: true
                });
              }
            },
            propTypes: {
              configurable: true,
              get: function get() {
                return propTypes;
              },
              set: function set(newPropTypes) {
                error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
                propTypes = newPropTypes; // Match production behavior more closely:

                Object.defineProperty(lazyType, 'propTypes', {
                  enumerable: true
                });
              }
            }
          });
        }
        return lazyType;
      }
      function forwardRef(render) {
        {
          if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
            error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
          } else if (typeof render !== 'function') {
            error('forwardRef requires a render function but was given %s.', render === null ? 'null' : _typeof$1(render));
          } else {
            if (render.length !== 0 && render.length !== 2) {
              error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
            }
          }
          if (render != null) {
            if (render.defaultProps != null || render.propTypes != null) {
              error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');
            }
          }
        }
        return {
          $$typeof: REACT_FORWARD_REF_TYPE,
          render: render
        };
      }
      function isValidElementType(type) {
        return typeof type === 'string' || typeof type === 'function' ||
        // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
        type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || _typeof$1(type) === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
      }
      function memo(type, compare) {
        {
          if (!isValidElementType(type)) {
            error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : _typeof$1(type));
          }
        }
        return {
          $$typeof: REACT_MEMO_TYPE,
          type: type,
          compare: compare === undefined ? null : compare
        };
      }
      function resolveDispatcher() {
        var dispatcher = ReactCurrentDispatcher.current;
        if (!(dispatcher !== null)) {
          {
            throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.");
          }
        }
        return dispatcher;
      }
      function useContext(Context, unstable_observedBits) {
        var dispatcher = resolveDispatcher();
        {
          if (unstable_observedBits !== undefined) {
            error('useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\n\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://fb.me/rules-of-hooks' : '');
          } // TODO: add a more generic warning for invalid values.

          if (Context._context !== undefined) {
            var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
            // and nobody should be using this in existing code.

            if (realContext.Consumer === Context) {
              error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
            } else if (realContext.Provider === Context) {
              error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
            }
          }
        }
        return dispatcher.useContext(Context, unstable_observedBits);
      }
      function useState(initialState) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useState(initialState);
      }
      function useReducer(reducer, initialArg, init) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useReducer(reducer, initialArg, init);
      }
      function useRef(initialValue) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useRef(initialValue);
      }
      function useEffect(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useEffect(create, deps);
      }
      function useLayoutEffect(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useLayoutEffect(create, deps);
      }
      function useCallback(callback, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useCallback(callback, deps);
      }
      function useMemo(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useMemo(create, deps);
      }
      function useImperativeHandle(ref, create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useImperativeHandle(ref, create, deps);
      }
      function useDebugValue(value, formatterFn) {
        {
          var dispatcher = resolveDispatcher();
          return dispatcher.useDebugValue(value, formatterFn);
        }
      }
      var propTypesMisspellWarningShown;
      {
        propTypesMisspellWarningShown = false;
      }
      function getDeclarationErrorAddendum() {
        if (ReactCurrentOwner.current) {
          var name = getComponentName(ReactCurrentOwner.current.type);
          if (name) {
            return '\n\nCheck the render method of `' + name + '`.';
          }
        }
        return '';
      }
      function getSourceInfoErrorAddendum(source) {
        if (source !== undefined) {
          var fileName = source.fileName.replace(/^.*[\\\/]/, '');
          var lineNumber = source.lineNumber;
          return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
        }
        return '';
      }
      function getSourceInfoErrorAddendumForProps(elementProps) {
        if (elementProps !== null && elementProps !== undefined) {
          return getSourceInfoErrorAddendum(elementProps.__source);
        }
        return '';
      }
      /**
       * Warn if there's no key explicitly set on dynamic arrays of children or
       * object keys are not valid. This allows us to keep track of children between
       * updates.
       */

      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        var info = getDeclarationErrorAddendum();
        if (!info) {
          var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
          if (parentName) {
            info = "\n\nCheck the top-level render call using <" + parentName + ">.";
          }
        }
        return info;
      }
      /**
       * Warn if the element doesn't have an explicit key assigned to it.
       * This element is in an array. The array could grow and shrink or be
       * reordered. All children that haven't already been validated are required to
       * have a "key" property assigned to it. Error statuses are cached so a warning
       * will only be shown once.
       *
       * @internal
       * @param {ReactElement} element Element that requires a key.
       * @param {*} parentType element's parent's type.
       */

      function validateExplicitKey(element, parentType) {
        if (!element._store || element._store.validated || element.key != null) {
          return;
        }
        element._store.validated = true;
        var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
        if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
          return;
        }
        ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
        // property, it may be the creator of the child that's responsible for
        // assigning it a key.

        var childOwner = '';
        if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
          // Give the component that originally created this child.
          childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
        }
        setCurrentlyValidatingElement(element);
        {
          error('Each child in a list should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);
        }
        setCurrentlyValidatingElement(null);
      }
      /**
       * Ensure that every element either is passed in a static location, in an
       * array with an explicit keys property defined, or in an object literal
       * with valid key property.
       *
       * @internal
       * @param {ReactNode} node Statically passed child of any type.
       * @param {*} parentType node's parent's type.
       */

      function validateChildKeys(node, parentType) {
        if (_typeof$1(node) !== 'object') {
          return;
        }
        if (Array.isArray(node)) {
          for (var i = 0; i < node.length; i++) {
            var child = node[i];
            if (isValidElement(child)) {
              validateExplicitKey(child, parentType);
            }
          }
        } else if (isValidElement(node)) {
          // This element was passed in a valid location.
          if (node._store) {
            node._store.validated = true;
          }
        } else if (node) {
          var iteratorFn = getIteratorFn(node);
          if (typeof iteratorFn === 'function') {
            // Entry iterators used to provide implicit keys,
            // but now we print a separate warning for them later.
            if (iteratorFn !== node.entries) {
              var iterator = iteratorFn.call(node);
              var step;
              while (!(step = iterator.next()).done) {
                if (isValidElement(step.value)) {
                  validateExplicitKey(step.value, parentType);
                }
              }
            }
          }
        }
      }
      /**
       * Given an element, validate that its props follow the propTypes definition,
       * provided by the type.
       *
       * @param {ReactElement} element
       */

      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type === null || type === undefined || typeof type === 'string') {
            return;
          }
          var name = getComponentName(type);
          var propTypes;
          if (typeof type === 'function') {
            propTypes = type.propTypes;
          } else if (_typeof$1(type) === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE ||
          // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          type.$$typeof === REACT_MEMO_TYPE)) {
            propTypes = type.propTypes;
          } else {
            return;
          }
          if (propTypes) {
            setCurrentlyValidatingElement(element);
            checkPropTypes(propTypes, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);
            setCurrentlyValidatingElement(null);
          } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = true;
            error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
          }
          if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
            error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
          }
        }
      }
      /**
       * Given a fragment, validate that it can only be provided with fragment props
       * @param {ReactElement} fragment
       */

      function validateFragmentProps(fragment) {
        {
          setCurrentlyValidatingElement(fragment);
          var keys = Object.keys(fragment.props);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key !== 'children' && key !== 'key') {
              error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
              break;
            }
          }
          if (fragment.ref !== null) {
            error('Invalid attribute `ref` supplied to `React.Fragment`.');
          }
          setCurrentlyValidatingElement(null);
        }
      }
      function createElementWithValidation(type, props, children) {
        var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
        // succeed and there will likely be errors in render.

        if (!validType) {
          var info = '';
          if (type === undefined || _typeof$1(type) === 'object' && type !== null && Object.keys(type).length === 0) {
            info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
          }
          var sourceInfo = getSourceInfoErrorAddendumForProps(props);
          if (sourceInfo) {
            info += sourceInfo;
          } else {
            info += getDeclarationErrorAddendum();
          }
          var typeString;
          if (type === null) {
            typeString = 'null';
          } else if (Array.isArray(type)) {
            typeString = 'array';
          } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
            typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
            info = ' Did you accidentally export a JSX literal instead of a component?';
          } else {
            typeString = _typeof$1(type);
          }
          {
            error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
          }
        }
        var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
        // TODO: Drop this when these are no longer allowed as the type argument.

        if (element == null) {
          return element;
        } // Skip key warning if the type isn't valid since our key validation logic
        // doesn't expect a non-string/function type and can throw confusing errors.
        // We don't want exception behavior to differ between dev and prod.
        // (Rendering will throw with a helpful message and as soon as the type is
        // fixed, the key warnings will appear.)

        if (validType) {
          for (var i = 2; i < arguments.length; i++) {
            validateChildKeys(arguments[i], type);
          }
        }
        if (type === REACT_FRAGMENT_TYPE) {
          validateFragmentProps(element);
        } else {
          validatePropTypes(element);
        }
        return element;
      }
      var didWarnAboutDeprecatedCreateFactory = false;
      function createFactoryWithValidation(type) {
        var validatedFactory = createElementWithValidation.bind(null, type);
        validatedFactory.type = type;
        {
          if (!didWarnAboutDeprecatedCreateFactory) {
            didWarnAboutDeprecatedCreateFactory = true;
            warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');
          } // Legacy hook: remove it

          Object.defineProperty(validatedFactory, 'type', {
            enumerable: false,
            get: function get() {
              warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
              Object.defineProperty(this, 'type', {
                value: type
              });
              return type;
            }
          });
        }
        return validatedFactory;
      }
      function cloneElementWithValidation(element, props, children) {
        var newElement = cloneElement.apply(this, arguments);
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], newElement.type);
        }
        validatePropTypes(newElement);
        return newElement;
      }
      {
        try {
          var frozenObject = Object.freeze({});
          var testMap = new Map([[frozenObject, null]]);
          var testSet = new Set([frozenObject]); // This is necessary for Rollup to not consider these unused.
          // https://github.com/rollup/rollup/issues/1771
          // TODO: we can remove these if Rollup fixes the bug.

          testMap.set(0, 0);
          testSet.add(0);
        } catch (e) {}
      }
      var createElement$1 = createElementWithValidation;
      var cloneElement$1 = cloneElementWithValidation;
      var createFactory = createFactoryWithValidation;
      var Children = {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray: toArray,
        only: onlyChild
      };
      react_development.Children = Children;
      react_development.Component = Component;
      react_development.Fragment = REACT_FRAGMENT_TYPE;
      react_development.Profiler = REACT_PROFILER_TYPE;
      react_development.PureComponent = PureComponent;
      react_development.StrictMode = REACT_STRICT_MODE_TYPE;
      react_development.Suspense = REACT_SUSPENSE_TYPE;
      react_development.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
      react_development.cloneElement = cloneElement$1;
      react_development.createContext = createContext;
      react_development.createElement = createElement$1;
      react_development.createFactory = createFactory;
      react_development.createRef = createRef;
      react_development.forwardRef = forwardRef;
      react_development.isValidElement = isValidElement;
      react_development.lazy = lazy;
      react_development.memo = memo;
      react_development.useCallback = useCallback;
      react_development.useContext = useContext;
      react_development.useDebugValue = useDebugValue;
      react_development.useEffect = useEffect;
      react_development.useImperativeHandle = useImperativeHandle;
      react_development.useLayoutEffect = useLayoutEffect;
      react_development.useMemo = useMemo;
      react_development.useReducer = useReducer;
      react_development.useRef = useRef;
      react_development.useState = useState;
      react_development.version = ReactVersion;
    })();
  }
  return react_development;
}

var hasRequiredReact;
function requireReact() {
  if (hasRequiredReact) return react.exports;
  hasRequiredReact = 1;
  if (process.env.NODE_ENV === 'production') {
    react.exports = requireReact_production_min();
  } else {
    react.exports = requireReact_development();
  }
  return react.exports;
}

var reactExports = requireReact();
var React = /*@__PURE__*/getDefaultExportFromCjs(reactExports);

var allLocaleData = {};

var intlMessageformat = {exports: {}};

var main$1 = {};

var core$1 = {};

var utils = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  utils.extend = extend;
  var hop = Object.prototype.hasOwnProperty;
  function extend(obj) {
    var sources = Array.prototype.slice.call(arguments, 1),
      i,
      len,
      source,
      key;
    for (i = 0, len = sources.length; i < len; i += 1) {
      source = sources[i];
      if (!source) {
        continue;
      }
      for (key in source) {
        if (hop.call(source, key)) {
          obj[key] = source[key];
        }
      }
    }
    return obj;
  }
  utils.hop = hop;
  return utils;
}

var es5$1 = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
var hasRequiredEs5$1;
function requireEs5$1() {
  if (hasRequiredEs5$1) return es5$1;
  hasRequiredEs5$1 = 1;
  var src$utils$$ = requireUtils();

  // Purposely using the same implementation as the Intl.js `Intl` polyfill.
  // Copyright 2013 Andy Earnshaw, MIT License

  var realDefineProp = function () {
    try {
      return !!Object.defineProperty({}, 'a', {});
    } catch (e) {
      return false;
    }
  }();
  var defineProperty = realDefineProp ? Object.defineProperty : function (obj, name, desc) {
    if ('get' in desc && obj.__defineGetter__) {
      obj.__defineGetter__(name, desc.get);
    } else if (!src$utils$$.hop.call(obj, name) || 'value' in desc) {
      obj[name] = desc.value;
    }
  };
  var objCreate = Object.create || function (proto, props) {
    var obj, k;
    function F() {}
    F.prototype = proto;
    obj = new F();
    for (k in props) {
      if (src$utils$$.hop.call(props, k)) {
        defineProperty(obj, k, props[k]);
      }
    }
    return obj;
  };
  es5$1.defineProperty = defineProperty, es5$1.objCreate = objCreate;
  return es5$1;
}

var compiler = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
var hasRequiredCompiler;
function requireCompiler() {
  if (hasRequiredCompiler) return compiler;
  hasRequiredCompiler = 1;
  (function (exports) {

    exports["default"] = Compiler;
    function Compiler(locales, formats, pluralFn) {
      this.locales = locales;
      this.formats = formats;
      this.pluralFn = pluralFn;
    }
    Compiler.prototype.compile = function (ast) {
      this.pluralStack = [];
      this.currentPlural = null;
      this.pluralNumberFormat = null;
      return this.compileMessage(ast);
    };
    Compiler.prototype.compileMessage = function (ast) {
      if (!(ast && ast.type === 'messageFormatPattern')) {
        throw new Error('Message AST is not of type: "messageFormatPattern"');
      }
      var elements = ast.elements,
        pattern = [];
      var i, len, element;
      for (i = 0, len = elements.length; i < len; i += 1) {
        element = elements[i];
        switch (element.type) {
          case 'messageTextElement':
            pattern.push(this.compileMessageText(element));
            break;
          case 'argumentElement':
            pattern.push(this.compileArgument(element));
            break;
          default:
            throw new Error('Message element does not have a valid type');
        }
      }
      return pattern;
    };
    Compiler.prototype.compileMessageText = function (element) {
      // When this `element` is part of plural sub-pattern and its value contains
      // an unescaped '#', use a `PluralOffsetString` helper to properly output
      // the number with the correct offset in the string.
      if (this.currentPlural && /(^|[^\\])#/g.test(element.value)) {
        // Create a cache a NumberFormat instance that can be reused for any
        // PluralOffsetString instance in this message.
        if (!this.pluralNumberFormat) {
          this.pluralNumberFormat = new Intl.NumberFormat(this.locales);
        }
        return new PluralOffsetString(this.currentPlural.id, this.currentPlural.format.offset, this.pluralNumberFormat, element.value);
      }

      // Unescape the escaped '#'s in the message text.
      return element.value.replace(/\\#/g, '#');
    };
    Compiler.prototype.compileArgument = function (element) {
      var format = element.format;
      if (!format) {
        return new StringFormat(element.id);
      }
      var formats = this.formats,
        locales = this.locales,
        pluralFn = this.pluralFn,
        options;
      switch (format.type) {
        case 'numberFormat':
          options = formats.number[format.style];
          return {
            id: element.id,
            format: new Intl.NumberFormat(locales, options).format
          };
        case 'dateFormat':
          options = formats.date[format.style];
          return {
            id: element.id,
            format: new Intl.DateTimeFormat(locales, options).format
          };
        case 'timeFormat':
          options = formats.time[format.style];
          return {
            id: element.id,
            format: new Intl.DateTimeFormat(locales, options).format
          };
        case 'pluralFormat':
          options = this.compileOptions(element);
          return new PluralFormat(element.id, format.ordinal, format.offset, options, pluralFn);
        case 'selectFormat':
          options = this.compileOptions(element);
          return new SelectFormat(element.id, options);
        default:
          throw new Error('Message element does not have a valid format type');
      }
    };
    Compiler.prototype.compileOptions = function (element) {
      var format = element.format,
        options = format.options,
        optionsHash = {};

      // Save the current plural element, if any, then set it to a new value when
      // compiling the options sub-patterns. This conforms the spec's algorithm
      // for handling `"#"` syntax in message text.
      this.pluralStack.push(this.currentPlural);
      this.currentPlural = format.type === 'pluralFormat' ? element : null;
      var i, len, option;
      for (i = 0, len = options.length; i < len; i += 1) {
        option = options[i];

        // Compile the sub-pattern and save it under the options's selector.
        optionsHash[option.selector] = this.compileMessage(option.value);
      }

      // Pop the plural stack to put back the original current plural value.
      this.currentPlural = this.pluralStack.pop();
      return optionsHash;
    };

    // -- Compiler Helper Classes --------------------------------------------------

    function StringFormat(id) {
      this.id = id;
    }
    StringFormat.prototype.format = function (value) {
      if (!value && typeof value !== 'number') {
        return '';
      }
      return typeof value === 'string' ? value : String(value);
    };
    function PluralFormat(id, useOrdinal, offset, options, pluralFn) {
      this.id = id;
      this.useOrdinal = useOrdinal;
      this.offset = offset;
      this.options = options;
      this.pluralFn = pluralFn;
    }
    PluralFormat.prototype.getOption = function (value) {
      var options = this.options;
      var option = options['=' + value] || options[this.pluralFn(value - this.offset, this.useOrdinal)];
      return option || options.other;
    };
    function PluralOffsetString(id, offset, numberFormat, string) {
      this.id = id;
      this.offset = offset;
      this.numberFormat = numberFormat;
      this.string = string;
    }
    PluralOffsetString.prototype.format = function (value) {
      var number = this.numberFormat.format(value - this.offset);
      return this.string.replace(/(^|[^\\])#/g, '$1' + number).replace(/\\#/g, '#');
    };
    function SelectFormat(id, options) {
      this.id = id;
      this.options = options;
    }
    SelectFormat.prototype.getOption = function (value) {
      var options = this.options;
      return options[value] || options.other;
    };
  })(compiler);
  return compiler;
}

var intlMessageformatParser = {exports: {}};

var parser = {};

var hasRequiredParser;
function requireParser() {
  if (hasRequiredParser) return parser;
  hasRequiredParser = 1;
  (function (exports) {

    exports["default"] = function () {

      /*
       * Generated by PEG.js 0.9.0.
       *
       * http://pegjs.org/
       */
      function peg$subclass(child, parent) {
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
      }
      function peg$SyntaxError(message, expected, found, location) {
        this.message = message;
        this.expected = expected;
        this.found = found;
        this.location = location;
        this.name = "SyntaxError";
        if (typeof Error.captureStackTrace === "function") {
          Error.captureStackTrace(this, peg$SyntaxError);
        }
      }
      peg$subclass(peg$SyntaxError, Error);
      function peg$parse(input) {
        var options = arguments.length > 1 ? arguments[1] : {},
          peg$FAILED = {},
          peg$startRuleFunctions = {
            start: peg$parsestart
          },
          peg$startRuleFunction = peg$parsestart,
          peg$c0 = function peg$c0(elements) {
            return {
              type: 'messageFormatPattern',
              elements: elements,
              location: location()
            };
          },
          peg$c1 = function peg$c1(text) {
            var string = '',
              i,
              j,
              outerLen,
              inner,
              innerLen;
            for (i = 0, outerLen = text.length; i < outerLen; i += 1) {
              inner = text[i];
              for (j = 0, innerLen = inner.length; j < innerLen; j += 1) {
                string += inner[j];
              }
            }
            return string;
          },
          peg$c2 = function peg$c2(messageText) {
            return {
              type: 'messageTextElement',
              value: messageText,
              location: location()
            };
          },
          peg$c3 = /^[^ \t\n\r,.+={}#]/,
          peg$c4 = {
            type: "class",
            value: "[^ \\t\\n\\r,.+={}#]",
            description: "[^ \\t\\n\\r,.+={}#]"
          },
          peg$c5 = "{",
          peg$c6 = {
            type: "literal",
            value: "{",
            description: "\"{\""
          },
          peg$c7 = ",",
          peg$c8 = {
            type: "literal",
            value: ",",
            description: "\",\""
          },
          peg$c9 = "}",
          peg$c10 = {
            type: "literal",
            value: "}",
            description: "\"}\""
          },
          peg$c11 = function peg$c11(id, format) {
            return {
              type: 'argumentElement',
              id: id,
              format: format && format[2],
              location: location()
            };
          },
          peg$c12 = "number",
          peg$c13 = {
            type: "literal",
            value: "number",
            description: "\"number\""
          },
          peg$c14 = "date",
          peg$c15 = {
            type: "literal",
            value: "date",
            description: "\"date\""
          },
          peg$c16 = "time",
          peg$c17 = {
            type: "literal",
            value: "time",
            description: "\"time\""
          },
          peg$c18 = function peg$c18(type, style) {
            return {
              type: type + 'Format',
              style: style && style[2],
              location: location()
            };
          },
          peg$c19 = "plural",
          peg$c20 = {
            type: "literal",
            value: "plural",
            description: "\"plural\""
          },
          peg$c21 = function peg$c21(pluralStyle) {
            return {
              type: pluralStyle.type,
              ordinal: false,
              offset: pluralStyle.offset || 0,
              options: pluralStyle.options,
              location: location()
            };
          },
          peg$c22 = "selectordinal",
          peg$c23 = {
            type: "literal",
            value: "selectordinal",
            description: "\"selectordinal\""
          },
          peg$c24 = function peg$c24(pluralStyle) {
            return {
              type: pluralStyle.type,
              ordinal: true,
              offset: pluralStyle.offset || 0,
              options: pluralStyle.options,
              location: location()
            };
          },
          peg$c25 = "select",
          peg$c26 = {
            type: "literal",
            value: "select",
            description: "\"select\""
          },
          peg$c27 = function peg$c27(options) {
            return {
              type: 'selectFormat',
              options: options,
              location: location()
            };
          },
          peg$c28 = "=",
          peg$c29 = {
            type: "literal",
            value: "=",
            description: "\"=\""
          },
          peg$c30 = function peg$c30(selector, pattern) {
            return {
              type: 'optionalFormatPattern',
              selector: selector,
              value: pattern,
              location: location()
            };
          },
          peg$c31 = "offset:",
          peg$c32 = {
            type: "literal",
            value: "offset:",
            description: "\"offset:\""
          },
          peg$c33 = function peg$c33(number) {
            return number;
          },
          peg$c34 = function peg$c34(offset, options) {
            return {
              type: 'pluralFormat',
              offset: offset,
              options: options,
              location: location()
            };
          },
          peg$c35 = {
            type: "other",
            description: "whitespace"
          },
          peg$c36 = /^[ \t\n\r]/,
          peg$c37 = {
            type: "class",
            value: "[ \\t\\n\\r]",
            description: "[ \\t\\n\\r]"
          },
          peg$c38 = {
            type: "other",
            description: "optionalWhitespace"
          },
          peg$c39 = /^[0-9]/,
          peg$c40 = {
            type: "class",
            value: "[0-9]",
            description: "[0-9]"
          },
          peg$c41 = /^[0-9a-f]/i,
          peg$c42 = {
            type: "class",
            value: "[0-9a-f]i",
            description: "[0-9a-f]i"
          },
          peg$c43 = "0",
          peg$c44 = {
            type: "literal",
            value: "0",
            description: "\"0\""
          },
          peg$c45 = /^[1-9]/,
          peg$c46 = {
            type: "class",
            value: "[1-9]",
            description: "[1-9]"
          },
          peg$c47 = function peg$c47(digits) {
            return parseInt(digits, 10);
          },
          peg$c48 = /^[^{}\\\0-\x1F \t\n\r]/,
          peg$c49 = {
            type: "class",
            value: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]",
            description: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]"
          },
          peg$c50 = "\\\\",
          peg$c51 = {
            type: "literal",
            value: "\\\\",
            description: "\"\\\\\\\\\""
          },
          peg$c52 = function peg$c52() {
            return '\\';
          },
          peg$c53 = "\\#",
          peg$c54 = {
            type: "literal",
            value: "\\#",
            description: "\"\\\\#\""
          },
          peg$c55 = function peg$c55() {
            return '\\#';
          },
          peg$c56 = "\\{",
          peg$c57 = {
            type: "literal",
            value: "\\{",
            description: "\"\\\\{\""
          },
          peg$c58 = function peg$c58() {
            return "{";
          },
          peg$c59 = "\\}",
          peg$c60 = {
            type: "literal",
            value: "\\}",
            description: "\"\\\\}\""
          },
          peg$c61 = function peg$c61() {
            return "}";
          },
          peg$c62 = "\\u",
          peg$c63 = {
            type: "literal",
            value: "\\u",
            description: "\"\\\\u\""
          },
          peg$c64 = function peg$c64(digits) {
            return String.fromCharCode(parseInt(digits, 16));
          },
          peg$c65 = function peg$c65(chars) {
            return chars.join('');
          },
          peg$currPos = 0,
          peg$savedPos = 0,
          peg$posDetailsCache = [{
            line: 1,
            column: 1,
            seenCR: false
          }],
          peg$maxFailPos = 0,
          peg$maxFailExpected = [],
          peg$silentFails = 0,
          peg$result;
        if ("startRule" in options) {
          if (!(options.startRule in peg$startRuleFunctions)) {
            throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
          }
          peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
        }
        function location() {
          return peg$computeLocation(peg$savedPos, peg$currPos);
        }
        function peg$computePosDetails(pos) {
          var details = peg$posDetailsCache[pos],
            p,
            ch;
          if (details) {
            return details;
          } else {
            p = pos - 1;
            while (!peg$posDetailsCache[p]) {
              p--;
            }
            details = peg$posDetailsCache[p];
            details = {
              line: details.line,
              column: details.column,
              seenCR: details.seenCR
            };
            while (p < pos) {
              ch = input.charAt(p);
              if (ch === "\n") {
                if (!details.seenCR) {
                  details.line++;
                }
                details.column = 1;
                details.seenCR = false;
              } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
                details.line++;
                details.column = 1;
                details.seenCR = true;
              } else {
                details.column++;
                details.seenCR = false;
              }
              p++;
            }
            peg$posDetailsCache[pos] = details;
            return details;
          }
        }
        function peg$computeLocation(startPos, endPos) {
          var startPosDetails = peg$computePosDetails(startPos),
            endPosDetails = peg$computePosDetails(endPos);
          return {
            start: {
              offset: startPos,
              line: startPosDetails.line,
              column: startPosDetails.column
            },
            end: {
              offset: endPos,
              line: endPosDetails.line,
              column: endPosDetails.column
            }
          };
        }
        function peg$fail(expected) {
          if (peg$currPos < peg$maxFailPos) {
            return;
          }
          if (peg$currPos > peg$maxFailPos) {
            peg$maxFailPos = peg$currPos;
            peg$maxFailExpected = [];
          }
          peg$maxFailExpected.push(expected);
        }
        function peg$buildException(message, expected, found, location) {
          function cleanupExpected(expected) {
            var i = 1;
            expected.sort(function (a, b) {
              if (a.description < b.description) {
                return -1;
              } else if (a.description > b.description) {
                return 1;
              } else {
                return 0;
              }
            });
            while (i < expected.length) {
              if (expected[i - 1] === expected[i]) {
                expected.splice(i, 1);
              } else {
                i++;
              }
            }
          }
          function buildMessage(expected, found) {
            function stringEscape(s) {
              function hex(ch) {
                return ch.charCodeAt(0).toString(16).toUpperCase();
              }
              return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
                return '\\x0' + hex(ch);
              }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
                return '\\x' + hex(ch);
              }).replace(/[\u0100-\u0FFF]/g, function (ch) {
                return "\\u0" + hex(ch);
              }).replace(/[\u1000-\uFFFF]/g, function (ch) {
                return "\\u" + hex(ch);
              });
            }
            var expectedDescs = new Array(expected.length),
              expectedDesc,
              foundDesc,
              i;
            for (i = 0; i < expected.length; i++) {
              expectedDescs[i] = expected[i].description;
            }
            expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];
            foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";
            return "Expected " + expectedDesc + " but " + foundDesc + " found.";
          }
          if (expected !== null) {
            cleanupExpected(expected);
          }
          return new peg$SyntaxError(buildMessage(expected, found), expected, found, location);
        }
        function peg$parsestart() {
          var s0;
          s0 = peg$parsemessageFormatPattern();
          return s0;
        }
        function peg$parsemessageFormatPattern() {
          var s0, s1, s2;
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parsemessageFormatElement();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsemessageFormatElement();
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c0(s1);
          }
          s0 = s1;
          return s0;
        }
        function peg$parsemessageFormatElement() {
          var s0;
          s0 = peg$parsemessageTextElement();
          if (s0 === peg$FAILED) {
            s0 = peg$parseargumentElement();
          }
          return s0;
        }
        function peg$parsemessageText() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$currPos;
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsechars();
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s3 = [s3, s4, s5];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              s2 = peg$currPos;
              s3 = peg$parse_();
              if (s3 !== peg$FAILED) {
                s4 = peg$parsechars();
                if (s4 !== peg$FAILED) {
                  s5 = peg$parse_();
                  if (s5 !== peg$FAILED) {
                    s3 = [s3, s4, s5];
                    s2 = s3;
                  } else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s2;
                  s2 = peg$FAILED;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            }
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1);
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsews();
            if (s1 !== peg$FAILED) {
              s0 = input.substring(s0, peg$currPos);
            } else {
              s0 = s1;
            }
          }
          return s0;
        }
        function peg$parsemessageTextElement() {
          var s0, s1;
          s0 = peg$currPos;
          s1 = peg$parsemessageText();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c2(s1);
          }
          s0 = s1;
          return s0;
        }
        function peg$parseargument() {
          var s0, s1, s2;
          s0 = peg$parsenumber();
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = [];
            if (peg$c3.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c4);
              }
            }
            if (s2 !== peg$FAILED) {
              while (s2 !== peg$FAILED) {
                s1.push(s2);
                if (peg$c3.test(input.charAt(peg$currPos))) {
                  s2 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c4);
                  }
                }
              }
            } else {
              s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
              s0 = input.substring(s0, peg$currPos);
            } else {
              s0 = s1;
            }
          }
          return s0;
        }
        function peg$parseargumentElement() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c5;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c6);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
              s3 = peg$parseargument();
              if (s3 !== peg$FAILED) {
                s4 = peg$parse_();
                if (s4 !== peg$FAILED) {
                  s5 = peg$currPos;
                  if (input.charCodeAt(peg$currPos) === 44) {
                    s6 = peg$c7;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c8);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parseelementFormat();
                      if (s8 !== peg$FAILED) {
                        s6 = [s6, s7, s8];
                        s5 = s6;
                      } else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s5;
                      s5 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                  if (s5 === peg$FAILED) {
                    s5 = null;
                  }
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parse_();
                    if (s6 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 125) {
                        s7 = peg$c9;
                        peg$currPos++;
                      } else {
                        s7 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c10);
                        }
                      }
                      if (s7 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c11(s3, s5);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parseelementFormat() {
          var s0;
          s0 = peg$parsesimpleFormat();
          if (s0 === peg$FAILED) {
            s0 = peg$parsepluralFormat();
            if (s0 === peg$FAILED) {
              s0 = peg$parseselectOrdinalFormat();
              if (s0 === peg$FAILED) {
                s0 = peg$parseselectFormat();
              }
            }
          }
          return s0;
        }
        function peg$parsesimpleFormat() {
          var s0, s1, s2, s3, s4, s5, s6;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 6) === peg$c12) {
            s1 = peg$c12;
            peg$currPos += 6;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c13);
            }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c14) {
              s1 = peg$c14;
              peg$currPos += 4;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c15);
              }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 4) === peg$c16) {
                s1 = peg$c16;
                peg$currPos += 4;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c17);
                }
              }
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
              s3 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 44) {
                s4 = peg$c7;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c8);
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parsechars();
                  if (s6 !== peg$FAILED) {
                    s4 = [s4, s5, s6];
                    s3 = s4;
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
              if (s3 === peg$FAILED) {
                s3 = null;
              }
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c18(s1, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parsepluralFormat() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 6) === peg$c19) {
            s1 = peg$c19;
            peg$currPos += 6;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c20);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 44) {
                s3 = peg$c7;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c8);
                }
              }
              if (s3 !== peg$FAILED) {
                s4 = peg$parse_();
                if (s4 !== peg$FAILED) {
                  s5 = peg$parsepluralStyle();
                  if (s5 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c21(s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parseselectOrdinalFormat() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 13) === peg$c22) {
            s1 = peg$c22;
            peg$currPos += 13;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c23);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 44) {
                s3 = peg$c7;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c8);
                }
              }
              if (s3 !== peg$FAILED) {
                s4 = peg$parse_();
                if (s4 !== peg$FAILED) {
                  s5 = peg$parsepluralStyle();
                  if (s5 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c24(s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parseselectFormat() {
          var s0, s1, s2, s3, s4, s5, s6;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 6) === peg$c25) {
            s1 = peg$c25;
            peg$currPos += 6;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c26);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 44) {
                s3 = peg$c7;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c8);
                }
              }
              if (s3 !== peg$FAILED) {
                s4 = peg$parse_();
                if (s4 !== peg$FAILED) {
                  s5 = [];
                  s6 = peg$parseoptionalFormatPattern();
                  if (s6 !== peg$FAILED) {
                    while (s6 !== peg$FAILED) {
                      s5.push(s6);
                      s6 = peg$parseoptionalFormatPattern();
                    }
                  } else {
                    s5 = peg$FAILED;
                  }
                  if (s5 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c27(s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parseselector() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          s1 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 61) {
            s2 = peg$c28;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c29);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsenumber();
            if (s3 !== peg$FAILED) {
              s2 = [s2, s3];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
          } else {
            s0 = s1;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$parsechars();
          }
          return s0;
        }
        function peg$parseoptionalFormatPattern() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8;
          s0 = peg$currPos;
          s1 = peg$parse_();
          if (s1 !== peg$FAILED) {
            s2 = peg$parseselector();
            if (s2 !== peg$FAILED) {
              s3 = peg$parse_();
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 123) {
                  s4 = peg$c5;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c6);
                  }
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parse_();
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parsemessageFormatPattern();
                    if (s6 !== peg$FAILED) {
                      s7 = peg$parse_();
                      if (s7 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 125) {
                          s8 = peg$c9;
                          peg$currPos++;
                        } else {
                          s8 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c10);
                          }
                        }
                        if (s8 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c30(s2, s6);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parseoffset() {
          var s0, s1, s2, s3;
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 7) === peg$c31) {
            s1 = peg$c31;
            peg$currPos += 7;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c32);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
              s3 = peg$parsenumber();
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c33(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parsepluralStyle() {
          var s0, s1, s2, s3, s4;
          s0 = peg$currPos;
          s1 = peg$parseoffset();
          if (s1 === peg$FAILED) {
            s1 = null;
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parseoptionalFormatPattern();
              if (s4 !== peg$FAILED) {
                while (s4 !== peg$FAILED) {
                  s3.push(s4);
                  s4 = peg$parseoptionalFormatPattern();
                }
              } else {
                s3 = peg$FAILED;
              }
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c34(s1, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          return s0;
        }
        function peg$parsews() {
          var s0, s1;
          peg$silentFails++;
          s0 = [];
          if (peg$c36.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c37);
            }
          }
          if (s1 !== peg$FAILED) {
            while (s1 !== peg$FAILED) {
              s0.push(s1);
              if (peg$c36.test(input.charAt(peg$currPos))) {
                s1 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c37);
                }
              }
            }
          } else {
            s0 = peg$FAILED;
          }
          peg$silentFails--;
          if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c35);
            }
          }
          return s0;
        }
        function peg$parse_() {
          var s0, s1, s2;
          peg$silentFails++;
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parsews();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsews();
          }
          if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
          } else {
            s0 = s1;
          }
          peg$silentFails--;
          if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c38);
            }
          }
          return s0;
        }
        function peg$parsedigit() {
          var s0;
          if (peg$c39.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c40);
            }
          }
          return s0;
        }
        function peg$parsehexDigit() {
          var s0;
          if (peg$c41.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c42);
            }
          }
          return s0;
        }
        function peg$parsenumber() {
          var s0, s1, s2, s3, s4, s5;
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 48) {
            s1 = peg$c43;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c44);
            }
          }
          if (s1 === peg$FAILED) {
            s1 = peg$currPos;
            s2 = peg$currPos;
            if (peg$c45.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c46);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = [];
              s5 = peg$parsedigit();
              while (s5 !== peg$FAILED) {
                s4.push(s5);
                s5 = peg$parsedigit();
              }
              if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              s1 = input.substring(s1, peg$currPos);
            } else {
              s1 = s2;
            }
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c47(s1);
          }
          s0 = s1;
          return s0;
        }
        function peg$parsechar() {
          var s0, s1, s2, s3, s4, s5, s6, s7;
          if (peg$c48.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c49);
            }
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c50) {
              s1 = peg$c50;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c51);
              }
            }
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c52();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.substr(peg$currPos, 2) === peg$c53) {
                s1 = peg$c53;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c54);
                }
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c55();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 2) === peg$c56) {
                  s1 = peg$c56;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c57);
                  }
                }
                if (s1 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c58();
                }
                s0 = s1;
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  if (input.substr(peg$currPos, 2) === peg$c59) {
                    s1 = peg$c59;
                    peg$currPos += 2;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c60);
                    }
                  }
                  if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c61();
                  }
                  s0 = s1;
                  if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.substr(peg$currPos, 2) === peg$c62) {
                      s1 = peg$c62;
                      peg$currPos += 2;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c63);
                      }
                    }
                    if (s1 !== peg$FAILED) {
                      s2 = peg$currPos;
                      s3 = peg$currPos;
                      s4 = peg$parsehexDigit();
                      if (s4 !== peg$FAILED) {
                        s5 = peg$parsehexDigit();
                        if (s5 !== peg$FAILED) {
                          s6 = peg$parsehexDigit();
                          if (s6 !== peg$FAILED) {
                            s7 = peg$parsehexDigit();
                            if (s7 !== peg$FAILED) {
                              s4 = [s4, s5, s6, s7];
                              s3 = s4;
                            } else {
                              peg$currPos = s3;
                              s3 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                      if (s3 !== peg$FAILED) {
                        s2 = input.substring(s2, peg$currPos);
                      } else {
                        s2 = s3;
                      }
                      if (s2 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c64(s2);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  }
                }
              }
            }
          }
          return s0;
        }
        function peg$parsechars() {
          var s0, s1, s2;
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parsechar();
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              s2 = peg$parsechar();
            }
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c65(s1);
          }
          s0 = s1;
          return s0;
        }
        peg$result = peg$startRuleFunction();
        if (peg$result !== peg$FAILED && peg$currPos === input.length) {
          return peg$result;
        } else {
          if (peg$result !== peg$FAILED && peg$currPos < input.length) {
            peg$fail({
              type: "end",
              description: "end of input"
            });
          }
          throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
        }
      }
      return {
        SyntaxError: peg$SyntaxError,
        parse: peg$parse
      };
    }();
  })(parser);
  return parser;
}

var hasRequiredIntlMessageformatParser;
function requireIntlMessageformatParser() {
  if (hasRequiredIntlMessageformatParser) return intlMessageformatParser.exports;
  hasRequiredIntlMessageformatParser = 1;
  (function (module, exports) {

    exports = module.exports = requireParser()['default'];
    exports['default'] = exports;
  })(intlMessageformatParser, intlMessageformatParser.exports);
  return intlMessageformatParser.exports;
}

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
var hasRequiredCore$1;
function requireCore$1() {
  if (hasRequiredCore$1) return core$1;
  hasRequiredCore$1 = 1;
  (function (exports) {

    var src$utils$$ = requireUtils(),
      src$es5$$ = requireEs5$1(),
      src$compiler$$ = requireCompiler(),
      intl$messageformat$parser$$ = requireIntlMessageformatParser();
    exports["default"] = MessageFormat;

    // -- MessageFormat --------------------------------------------------------

    function MessageFormat(message, locales, formats) {
      // Parse string messages into an AST.
      var ast = typeof message === 'string' ? MessageFormat.__parse(message) : message;
      if (!(ast && ast.type === 'messageFormatPattern')) {
        throw new TypeError('A message must be provided as a String or AST.');
      }

      // Creates a new object with the specified `formats` merged with the default
      // formats.
      formats = this._mergeFormats(MessageFormat.formats, formats);

      // Defined first because it's used to build the format pattern.
      src$es5$$.defineProperty(this, '_locale', {
        value: this._resolveLocale(locales)
      });

      // Compile the `ast` to a pattern that is highly optimized for repeated
      // `format()` invocations. **Note:** This passes the `locales` set provided
      // to the constructor instead of just the resolved locale.
      var pluralFn = this._findPluralRuleFunction(this._locale);
      var pattern = this._compilePattern(ast, locales, formats, pluralFn);

      // "Bind" `format()` method to `this` so it can be passed by reference like
      // the other `Intl` APIs.
      var messageFormat = this;
      this.format = function (values) {
        try {
          return messageFormat._format(pattern, values);
        } catch (e) {
          if (e.variableId) {
            throw new Error('The intl string context variable \'' + e.variableId + '\'' + ' was not provided to the string \'' + message + '\'');
          } else {
            throw e;
          }
        }
      };
    }

    // Default format options used as the prototype of the `formats` provided to the
    // constructor. These are used when constructing the internal Intl.NumberFormat
    // and Intl.DateTimeFormat instances.
    src$es5$$.defineProperty(MessageFormat, 'formats', {
      enumerable: true,
      value: {
        number: {
          'currency': {
            style: 'currency'
          },
          'percent': {
            style: 'percent'
          }
        },
        date: {
          'short': {
            month: 'numeric',
            day: 'numeric',
            year: '2-digit'
          },
          'medium': {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          },
          'long': {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          },
          'full': {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          }
        },
        time: {
          'short': {
            hour: 'numeric',
            minute: 'numeric'
          },
          'medium': {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          },
          'long': {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short'
          },
          'full': {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short'
          }
        }
      }
    });

    // Define internal private properties for dealing with locale data.
    src$es5$$.defineProperty(MessageFormat, '__localeData__', {
      value: src$es5$$.objCreate(null)
    });
    src$es5$$.defineProperty(MessageFormat, '__addLocaleData', {
      value: function value(data) {
        if (!(data && data.locale)) {
          throw new Error('Locale data provided to IntlMessageFormat is missing a ' + '`locale` property');
        }
        MessageFormat.__localeData__[data.locale.toLowerCase()] = data;
      }
    });

    // Defines `__parse()` static method as an exposed private.
    src$es5$$.defineProperty(MessageFormat, '__parse', {
      value: intl$messageformat$parser$$["default"].parse
    });

    // Define public `defaultLocale` property which defaults to English, but can be
    // set by the developer.
    src$es5$$.defineProperty(MessageFormat, 'defaultLocale', {
      enumerable: true,
      writable: true,
      value: undefined
    });
    MessageFormat.prototype.resolvedOptions = function () {
      // TODO: Provide anything else?
      return {
        locale: this._locale
      };
    };
    MessageFormat.prototype._compilePattern = function (ast, locales, formats, pluralFn) {
      var compiler = new src$compiler$$["default"](locales, formats, pluralFn);
      return compiler.compile(ast);
    };
    MessageFormat.prototype._findPluralRuleFunction = function (locale) {
      var localeData = MessageFormat.__localeData__;
      var data = localeData[locale.toLowerCase()];

      // The locale data is de-duplicated, so we have to traverse the locale's
      // hierarchy until we find a `pluralRuleFunction` to return.
      while (data) {
        if (data.pluralRuleFunction) {
          return data.pluralRuleFunction;
        }
        data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
      }
      throw new Error('Locale data added to IntlMessageFormat is missing a ' + '`pluralRuleFunction` for :' + locale);
    };
    MessageFormat.prototype._format = function (pattern, values) {
      var result = '',
        i,
        len,
        part,
        id,
        value,
        err;
      for (i = 0, len = pattern.length; i < len; i += 1) {
        part = pattern[i];

        // Exist early for string parts.
        if (typeof part === 'string') {
          result += part;
          continue;
        }
        id = part.id;

        // Enforce that all required values are provided by the caller.
        if (!(values && src$utils$$.hop.call(values, id))) {
          err = new Error('A value must be provided for: ' + id);
          err.variableId = id;
          throw err;
        }
        value = values[id];

        // Recursively format plural and select parts' option — which can be a
        // nested pattern structure. The choosing of the option to use is
        // abstracted-by and delegated-to the part helper object.
        if (part.options) {
          result += this._format(part.getOption(value), values);
        } else {
          result += part.format(value);
        }
      }
      return result;
    };
    MessageFormat.prototype._mergeFormats = function (defaults, formats) {
      var mergedFormats = {},
        type,
        mergedType;
      for (type in defaults) {
        if (!src$utils$$.hop.call(defaults, type)) {
          continue;
        }
        mergedFormats[type] = mergedType = src$es5$$.objCreate(defaults[type]);
        if (formats && src$utils$$.hop.call(formats, type)) {
          src$utils$$.extend(mergedType, formats[type]);
        }
      }
      return mergedFormats;
    };
    MessageFormat.prototype._resolveLocale = function (locales) {
      if (typeof locales === 'string') {
        locales = [locales];
      }

      // Create a copy of the array so we can push on the default locale.
      locales = (locales || []).concat(MessageFormat.defaultLocale);
      var localeData = MessageFormat.__localeData__;
      var i, len, localeParts, data;

      // Using the set of locales + the default locale, we look for the first one
      // which that has been registered. When data does not exist for a locale, we
      // traverse its ancestors to find something that's been registered within
      // its hierarchy of locales. Since we lack the proper `parentLocale` data
      // here, we must take a naive approach to traversal.
      for (i = 0, len = locales.length; i < len; i += 1) {
        localeParts = locales[i].toLowerCase().split('-');
        while (localeParts.length) {
          data = localeData[localeParts.join('-')];
          if (data) {
            // Return the normalized locale string; e.g., we return "en-US",
            // instead of "en-us".
            return data.locale;
          }
          localeParts.pop();
        }
      }
      var defaultLocale = locales.pop();
      throw new Error('No locale data has been added to IntlMessageFormat for: ' + locales.join(', ') + ', or the default locale: ' + defaultLocale);
    };
  })(core$1);
  return core$1;
}

var en$1 = {};

var hasRequiredEn$1;
function requireEn$1() {
  if (hasRequiredEn$1) return en$1;
  hasRequiredEn$1 = 1;
  (function (exports) {

    exports["default"] = {
      "locale": "en",
      "pluralRuleFunction": function pluralRuleFunction(n, ord) {
        var s = String(n).split("."),
          v0 = !s[1],
          t0 = Number(s[0]) == n,
          n10 = t0 && s[0].slice(-1),
          n100 = t0 && s[0].slice(-2);
        if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";
        return n == 1 && v0 ? "one" : "other";
      }
    };
  })(en$1);
  return en$1;
}

/* jslint esnext: true */
var hasRequiredMain$1;
function requireMain$1() {
  if (hasRequiredMain$1) return main$1;
  hasRequiredMain$1 = 1;
  (function (exports) {

    var src$core$$ = requireCore$1(),
      src$en$$ = requireEn$1();
    src$core$$["default"].__addLocaleData(src$en$$["default"]);
    src$core$$["default"].defaultLocale = 'en';
    exports["default"] = src$core$$["default"];
  })(main$1);
  return main$1;
}

/* jshint node:true */
var hasRequiredIntlMessageformat;
function requireIntlMessageformat() {
  if (hasRequiredIntlMessageformat) return intlMessageformat.exports;
  hasRequiredIntlMessageformat = 1;
  (function (module, exports) {

    var IntlMessageFormat = requireMain$1()['default'];

    // Add all locale data to `IntlMessageFormat`. This module will be ignored when
    // bundling for the browser with Browserify/Webpack.

    // Re-export `IntlMessageFormat` as the CommonJS default exports with all the
    // locale data registered, and with English set as the default locale. Define
    // the `default` prop for use with other compiled ES6 Modules.
    exports = module.exports = IntlMessageFormat;
    exports['default'] = exports;
  })(intlMessageformat, intlMessageformat.exports);
  return intlMessageformat.exports;
}

var intlMessageformatExports = requireIntlMessageformat();
var IntlMessageFormat = /*@__PURE__*/getDefaultExportFromCjs(intlMessageformatExports);

var intlRelativeformat = {exports: {}};

var main = {};

var core = {};

var diff = {};

var hasRequiredDiff;
function requireDiff() {
  if (hasRequiredDiff) return diff;
  hasRequiredDiff = 1;
  /*
  Copyright (c) 2014, Yahoo! Inc. All rights reserved.
  Copyrights licensed under the New BSD License.
  See the accompanying LICENSE file for terms.
  */
  Object.defineProperty(diff, "__esModule", {
    value: true
  });
  /* jslint esnext: true */
  var round = Math.round;
  function daysToYears(days) {
    // 400 years have 146097 days (taking into account leap year rules)
    return days * 400 / 146097;
  }
  // Thanks to date-fns
  // https://github.com/date-fns/date-fns
  // MIT © Sasha Koss
  var MILLISECONDS_IN_MINUTE = 60000;
  var MILLISECONDS_IN_DAY = 86400000;
  function startOfDay(dirtyDate) {
    var date = new Date(dirtyDate);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
    var startOfDayLeft = startOfDay(dirtyDateLeft);
    var startOfDayRight = startOfDay(dirtyDateRight);
    var timestampLeft = startOfDayLeft.getTime() - startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
    var timestampRight = startOfDayRight.getTime() - startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
    // Round the number of days to the nearest integer
    // because the number of milliseconds in a day is not constant
    // (e.g. it's different in the day of the daylight saving time clock shift)
    return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
  }
  function default_1(from, to) {
    // Convert to ms timestamps.
    from = +from;
    to = +to;
    var millisecond = round(to - from),
      second = round(millisecond / 1000),
      minute = round(second / 60),
      hour = round(minute / 60);
    // We expect a more precision in rounding when dealing with
    // days as it feels wrong when something happended 13 hours ago and
    // is regarded as "yesterday" even if the time was this morning.
    var day = differenceInCalendarDays(to, from);
    var week = round(day / 7);
    var rawYears = daysToYears(day),
      month = round(rawYears * 12),
      year = round(rawYears);
    return {
      millisecond: millisecond,
      second: second,
      'second-short': second,
      minute: minute,
      'minute-short': minute,
      hour: hour,
      'hour-short': hour,
      day: day,
      'day-short': day,
      week: week,
      'week-short': week,
      month: month,
      'month-short': month,
      year: year,
      'year-short': year
    };
  }
  diff.default = default_1;
  return diff;
}

var es5 = {};

var hasRequiredEs5;
function requireEs5() {
  if (hasRequiredEs5) return es5;
  hasRequiredEs5 = 1;
  /*
  Copyright (c) 2014, Yahoo! Inc. All rights reserved.
  Copyrights licensed under the New BSD License.
  See the accompanying LICENSE file for terms.
  */
  Object.defineProperty(es5, "__esModule", {
    value: true
  });
  /* jslint esnext: true */
  // Purposely using the same implementation as the Intl.js `Intl` polyfill.
  // Copyright 2013 Andy Earnshaw, MIT License
  var hop = Object.prototype.hasOwnProperty;
  var toString = Object.prototype.toString;
  var realDefineProp = function () {
    try {
      return !!Object.defineProperty({}, 'a', {});
    } catch (e) {
      return false;
    }
  }();
  var defineProperty = realDefineProp ? Object.defineProperty : function (obj, name, desc) {
    if ('get' in desc && obj.__defineGetter__) {
      obj.__defineGetter__(name, desc.get);
    } else if (!hop.call(obj, name) || 'value' in desc) {
      obj[name] = desc.value;
    }
  };
  es5.defineProperty = defineProperty;
  var objCreate = Object.create || function (proto, props) {
    var obj, k;
    function F() {}
    F.prototype = proto;
    obj = new F();
    for (k in props) {
      if (hop.call(props, k)) {
        defineProperty(obj, k, props[k]);
      }
    }
    return obj;
  };
  es5.objCreate = objCreate;
  var arrIndexOf = Array.prototype.indexOf || function (search, fromIndex) {
    /*jshint validthis:true */
    var arr = this;
    if (!arr.length) {
      return -1;
    }
    for (var i = fromIndex || 0, max = arr.length; i < max; i++) {
      if (arr[i] === search) {
        return i;
      }
    }
    return -1;
  };
  es5.arrIndexOf = arrIndexOf;
  var isArray = Array.isArray || function (obj) {
    return toString.call(obj) === '[object Array]';
  };
  es5.isArray = isArray;
  var dateNow = Date.now || function () {
    return new Date().getTime();
  };
  es5.dateNow = dateNow;
  return es5;
}

var hasRequiredCore;
function requireCore() {
  if (hasRequiredCore) return core;
  hasRequiredCore = 1;
  /*
  Copyright (c) 2014, Yahoo! Inc. All rights reserved.
  Copyrights licensed under the New BSD License.
  See the accompanying LICENSE file for terms.
  */
  Object.defineProperty(core, "__esModule", {
    value: true
  });
  /* jslint esnext: true */
  var intl_messageformat_1 = requireIntlMessageformat();
  var diff_1 = requireDiff();
  var es5_1 = requireEs5();
  core.default = RelativeFormat;
  // -----------------------------------------------------------------------------
  var FIELDS = ['second', 'second-short', 'minute', 'minute-short', 'hour', 'hour-short', 'day', 'day-short', 'month', 'month-short', 'year', 'year-short'];
  var STYLES = ['best fit', 'numeric'];
  // -- RelativeFormat -----------------------------------------------------------
  function RelativeFormat(locales, options) {
    options = options || {};
    // Make a copy of `locales` if it's an array, so that it doesn't change
    // since it's used lazily.
    if (es5_1.isArray(locales)) {
      locales = locales.concat();
    }
    es5_1.defineProperty(this, '_locale', {
      value: this._resolveLocale(locales)
    });
    es5_1.defineProperty(this, '_options', {
      value: {
        style: this._resolveStyle(options.style),
        units: this._isValidUnits(options.units) && options.units
      }
    });
    es5_1.defineProperty(this, '_locales', {
      value: locales
    });
    es5_1.defineProperty(this, '_fields', {
      value: this._findFields(this._locale)
    });
    es5_1.defineProperty(this, '_messages', {
      value: es5_1.objCreate(null)
    });
    // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.
    var relativeFormat = this;
    this.format = function format(date, options) {
      return relativeFormat._format(date, options);
    };
  }
  // Define internal private properties for dealing with locale data.
  es5_1.defineProperty(RelativeFormat, '__localeData__', {
    value: es5_1.objCreate(null)
  });
  es5_1.defineProperty(RelativeFormat, '__addLocaleData', {
    value: function value() {
      for (var i = 0; i < arguments.length; i++) {
        var datum = arguments[i];
        if (!(datum && datum.locale)) {
          throw new Error('Locale data provided to IntlRelativeFormat is missing a ' + '`locale` property value');
        }
        RelativeFormat.__localeData__[datum.locale.toLowerCase()] = datum;
        // Add data to IntlMessageFormat.
        intl_messageformat_1.default.__addLocaleData(datum);
      }
    }
  });
  // Define public `defaultLocale` property which can be set by the developer, or
  // it will be set when the first RelativeFormat instance is created by
  // leveraging the resolved locale from `Intl`.
  es5_1.defineProperty(RelativeFormat, 'defaultLocale', {
    enumerable: true,
    writable: true,
    value: undefined
  });
  // Define public `thresholds` property which can be set by the developer, and
  // defaults to relative time thresholds from moment.js.
  es5_1.defineProperty(RelativeFormat, 'thresholds', {
    enumerable: true,
    value: {
      second: 45,
      'second-short': 45,
      minute: 45,
      'minute-short': 45,
      hour: 22,
      'hour-short': 22,
      day: 26,
      'day-short': 26,
      month: 11,
      'month-short': 11 // months to year
    }
  });
  RelativeFormat.prototype.resolvedOptions = function () {
    return {
      locale: this._locale,
      style: this._options.style,
      units: this._options.units
    };
  };
  RelativeFormat.prototype._compileMessage = function (units) {
    // `this._locales` is the original set of locales the user specified to the
    // constructor, while `this._locale` is the resolved root locale.
    var locales = this._locales;
    this._locale;
    var field = this._fields[units];
    var relativeTime = field.relativeTime;
    var future = '';
    var past = '';
    var i;
    for (i in relativeTime.future) {
      if (relativeTime.future.hasOwnProperty(i)) {
        future += ' ' + i + ' {' + relativeTime.future[i].replace('{0}', '#') + '}';
      }
    }
    for (i in relativeTime.past) {
      if (relativeTime.past.hasOwnProperty(i)) {
        past += ' ' + i + ' {' + relativeTime.past[i].replace('{0}', '#') + '}';
      }
    }
    var message = '{when, select, future {{0, plural, ' + future + '}}' + 'past {{0, plural, ' + past + '}}}';
    // Create the synthetic IntlMessageFormat instance using the original
    // locales value specified by the user when constructing the the parent
    // IntlRelativeFormat instance.
    return new intl_messageformat_1.default(message, locales);
  };
  RelativeFormat.prototype._getMessage = function (units) {
    var messages = this._messages;
    // Create a new synthetic message based on the locale data from CLDR.
    if (!messages[units]) {
      messages[units] = this._compileMessage(units);
    }
    return messages[units];
  };
  RelativeFormat.prototype._getRelativeUnits = function (diff, units) {
    var field = this._fields[units];
    if (field.relative) {
      return field.relative[diff];
    }
  };
  RelativeFormat.prototype._findFields = function (locale) {
    var localeData = RelativeFormat.__localeData__;
    var data = localeData[locale.toLowerCase()];
    // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find `fields` to return.
    while (data) {
      if (data.fields) {
        return data.fields;
      }
      data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }
    throw new Error('Locale data added to IntlRelativeFormat is missing `fields` for :' + locale);
  };
  RelativeFormat.prototype._format = function (date, options) {
    var now = options && options.now !== undefined ? options.now : es5_1.dateNow();
    if (date === undefined) {
      date = now;
    }
    // Determine if the `date` and optional `now` values are valid, and throw a
    // similar error to what `Intl.DateTimeFormat#format()` would throw.
    if (!isFinite(now)) {
      throw new RangeError('The `now` option provided to IntlRelativeFormat#format() is not ' + 'in valid range.');
    }
    if (!isFinite(date)) {
      throw new RangeError('The date value provided to IntlRelativeFormat#format() is not ' + 'in valid range.');
    }
    var diffReport = diff_1.default(now, date);
    var units = this._options.units || this._selectUnits(diffReport);
    var diffInUnits = diffReport[units];
    if (this._options.style !== 'numeric') {
      var relativeUnits = this._getRelativeUnits(diffInUnits, units);
      if (relativeUnits) {
        return relativeUnits;
      }
    }
    return this._getMessage(units).format({
      '0': Math.abs(diffInUnits),
      when: diffInUnits < 0 ? 'past' : 'future'
    });
  };
  RelativeFormat.prototype._isValidUnits = function (units) {
    if (!units || es5_1.arrIndexOf.call(FIELDS, units) >= 0) {
      return true;
    }
    if (typeof units === 'string') {
      var suggestion = /s$/.test(units) && units.substr(0, units.length - 1);
      if (suggestion && es5_1.arrIndexOf.call(FIELDS, suggestion) >= 0) {
        throw new Error('"' + units + '" is not a valid IntlRelativeFormat `units` ' + 'value, did you mean: ' + suggestion);
      }
    }
    throw new Error('"' + units + '" is not a valid IntlRelativeFormat `units` value, it ' + 'must be one of: "' + FIELDS.join('", "') + '"');
  };
  RelativeFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
      locales = [locales];
    }
    // Create a copy of the array so we can push on the default locale.
    locales = (locales || []).concat(RelativeFormat.defaultLocale);
    var localeData = RelativeFormat.__localeData__;
    var i, len, localeParts, data;
    // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.
    for (i = 0, len = locales.length; i < len; i += 1) {
      localeParts = locales[i].toLowerCase().split('-');
      while (localeParts.length) {
        data = localeData[localeParts.join('-')];
        if (data) {
          // Return the normalized locale string; e.g., we return "en-US",
          // instead of "en-us".
          return data.locale;
        }
        localeParts.pop();
      }
    }
    var defaultLocale = locales.pop();
    throw new Error('No locale data has been added to IntlRelativeFormat for: ' + locales.join(', ') + ', or the default locale: ' + defaultLocale);
  };
  RelativeFormat.prototype._resolveStyle = function (style) {
    // Default to "best fit" style.
    if (!style) {
      return STYLES[0];
    }
    if (es5_1.arrIndexOf.call(STYLES, style) >= 0) {
      return style;
    }
    throw new Error('"' + style + '" is not a valid IntlRelativeFormat `style` value, it ' + 'must be one of: "' + STYLES.join('", "') + '"');
  };
  RelativeFormat.prototype._selectUnits = function (diffReport) {
    var i, l, units;
    var fields = FIELDS.filter(function (field) {
      return field.indexOf('-short') < 1;
    });
    for (i = 0, l = fields.length; i < l; i += 1) {
      units = fields[i];
      if (Math.abs(diffReport[units]) < RelativeFormat.thresholds[units]) {
        break;
      }
    }
    return units;
  };
  return core;
}

var en = {};

var hasRequiredEn;
function requireEn() {
  if (hasRequiredEn) return en;
  hasRequiredEn = 1;
  Object.defineProperty(en, "__esModule", {
    value: true
  });
  /* @generated */
  en.default = {
    "locale": "en",
    "pluralRuleFunction": function pluralRuleFunction(n, ord) {
      var s = String(n).split('.'),
        v0 = !s[1],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);
      if (ord) return n10 == 1 && n100 != 11 ? 'one' : n10 == 2 && n100 != 12 ? 'two' : n10 == 3 && n100 != 13 ? 'few' : 'other';
      return n == 1 && v0 ? 'one' : 'other';
    },
    "fields": {
      "year": {
        "displayName": "year",
        "relative": {
          "0": "this year",
          "1": "next year",
          "-1": "last year"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} year",
            "other": "in {0} years"
          },
          "past": {
            "one": "{0} year ago",
            "other": "{0} years ago"
          }
        }
      },
      "year-short": {
        "displayName": "yr.",
        "relative": {
          "0": "this yr.",
          "1": "next yr.",
          "-1": "last yr."
        },
        "relativeTime": {
          "future": {
            "one": "in {0} yr.",
            "other": "in {0} yr."
          },
          "past": {
            "one": "{0} yr. ago",
            "other": "{0} yr. ago"
          }
        }
      },
      "month": {
        "displayName": "month",
        "relative": {
          "0": "this month",
          "1": "next month",
          "-1": "last month"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} month",
            "other": "in {0} months"
          },
          "past": {
            "one": "{0} month ago",
            "other": "{0} months ago"
          }
        }
      },
      "month-short": {
        "displayName": "mo.",
        "relative": {
          "0": "this mo.",
          "1": "next mo.",
          "-1": "last mo."
        },
        "relativeTime": {
          "future": {
            "one": "in {0} mo.",
            "other": "in {0} mo."
          },
          "past": {
            "one": "{0} mo. ago",
            "other": "{0} mo. ago"
          }
        }
      },
      "week": {
        "displayName": "week",
        "relativePeriod": "the week of {0}",
        "relative": {
          "0": "this week",
          "1": "next week",
          "-1": "last week"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} week",
            "other": "in {0} weeks"
          },
          "past": {
            "one": "{0} week ago",
            "other": "{0} weeks ago"
          }
        }
      },
      "week-short": {
        "displayName": "wk.",
        "relativePeriod": "the week of {0}",
        "relative": {
          "0": "this wk.",
          "1": "next wk.",
          "-1": "last wk."
        },
        "relativeTime": {
          "future": {
            "one": "in {0} wk.",
            "other": "in {0} wk."
          },
          "past": {
            "one": "{0} wk. ago",
            "other": "{0} wk. ago"
          }
        }
      },
      "day": {
        "displayName": "day",
        "relative": {
          "0": "today",
          "1": "tomorrow",
          "-1": "yesterday"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} day",
            "other": "in {0} days"
          },
          "past": {
            "one": "{0} day ago",
            "other": "{0} days ago"
          }
        }
      },
      "day-short": {
        "displayName": "day",
        "relative": {
          "0": "today",
          "1": "tomorrow",
          "-1": "yesterday"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} day",
            "other": "in {0} days"
          },
          "past": {
            "one": "{0} day ago",
            "other": "{0} days ago"
          }
        }
      },
      "hour": {
        "displayName": "hour",
        "relative": {
          "0": "this hour"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} hour",
            "other": "in {0} hours"
          },
          "past": {
            "one": "{0} hour ago",
            "other": "{0} hours ago"
          }
        }
      },
      "hour-short": {
        "displayName": "hr.",
        "relative": {
          "0": "this hour"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} hr.",
            "other": "in {0} hr."
          },
          "past": {
            "one": "{0} hr. ago",
            "other": "{0} hr. ago"
          }
        }
      },
      "minute": {
        "displayName": "minute",
        "relative": {
          "0": "this minute"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} minute",
            "other": "in {0} minutes"
          },
          "past": {
            "one": "{0} minute ago",
            "other": "{0} minutes ago"
          }
        }
      },
      "minute-short": {
        "displayName": "min.",
        "relative": {
          "0": "this minute"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} min.",
            "other": "in {0} min."
          },
          "past": {
            "one": "{0} min. ago",
            "other": "{0} min. ago"
          }
        }
      },
      "second": {
        "displayName": "second",
        "relative": {
          "0": "now"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} second",
            "other": "in {0} seconds"
          },
          "past": {
            "one": "{0} second ago",
            "other": "{0} seconds ago"
          }
        }
      },
      "second-short": {
        "displayName": "sec.",
        "relative": {
          "0": "now"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} sec.",
            "other": "in {0} sec."
          },
          "past": {
            "one": "{0} sec. ago",
            "other": "{0} sec. ago"
          }
        }
      }
    }
  };
  return en;
}

var hasRequiredMain;
function requireMain() {
  if (hasRequiredMain) return main;
  hasRequiredMain = 1;
  /* jslint esnext: true */
  Object.defineProperty(main, "__esModule", {
    value: true
  });
  var core_1 = requireCore();
  var en_1 = requireEn();
  core_1.default.__addLocaleData(en_1.default);
  core_1.default.defaultLocale = 'en';
  main.default = core_1.default;
  return main;
}

/* jshint node:true */
var hasRequiredIntlRelativeformat;
function requireIntlRelativeformat() {
  if (hasRequiredIntlRelativeformat) return intlRelativeformat.exports;
  hasRequiredIntlRelativeformat = 1;
  (function (module, exports) {

    var IntlRelativeFormat = requireMain()['default'];

    // Add all locale data to `IntlRelativeFormat`. This module will be ignored when
    // bundling for the browser with Browserify/Webpack.

    // Re-export `IntlRelativeFormat` as the CommonJS default exports with all the
    // locale data registered, and with English set as the default locale. Define
    // the `default` prop for use with other compiled ES6 Modules.
    exports = module.exports = IntlRelativeFormat;
    exports['default'] = exports;
  })(intlRelativeformat, intlRelativeformat.exports);
  return intlRelativeformat.exports;
}

var intlRelativeformatExports = requireIntlRelativeformat();
var IntlRelativeFormat = /*@__PURE__*/getDefaultExportFromCjs(intlRelativeformatExports);

var propTypes = {exports: {}};

var reactIs = {exports: {}};

var reactIs_production_min = {};

var hasRequiredReactIs_production_min;
function requireReactIs_production_min() {
  if (hasRequiredReactIs_production_min) return reactIs_production_min;
  hasRequiredReactIs_production_min = 1;
  var b = "function" === typeof Symbol && Symbol.for,
    c = b ? Symbol.for("react.element") : 60103,
    d = b ? Symbol.for("react.portal") : 60106,
    e = b ? Symbol.for("react.fragment") : 60107,
    f = b ? Symbol.for("react.strict_mode") : 60108,
    g = b ? Symbol.for("react.profiler") : 60114,
    h = b ? Symbol.for("react.provider") : 60109,
    k = b ? Symbol.for("react.context") : 60110,
    l = b ? Symbol.for("react.async_mode") : 60111,
    m = b ? Symbol.for("react.concurrent_mode") : 60111,
    n = b ? Symbol.for("react.forward_ref") : 60112,
    p = b ? Symbol.for("react.suspense") : 60113,
    q = b ? Symbol.for("react.suspense_list") : 60120,
    r = b ? Symbol.for("react.memo") : 60115,
    t = b ? Symbol.for("react.lazy") : 60116,
    v = b ? Symbol.for("react.block") : 60121,
    w = b ? Symbol.for("react.fundamental") : 60117,
    x = b ? Symbol.for("react.responder") : 60118,
    y = b ? Symbol.for("react.scope") : 60119;
  function z(a) {
    if ("object" === _typeof$1(a) && null !== a) {
      var u = a.$$typeof;
      switch (u) {
        case c:
          switch (a = a.type, a) {
            case l:
            case m:
            case e:
            case g:
            case f:
            case p:
              return a;
            default:
              switch (a = a && a.$$typeof, a) {
                case k:
                case n:
                case t:
                case r:
                case h:
                  return a;
                default:
                  return u;
              }
          }
        case d:
          return u;
      }
    }
  }
  function A(a) {
    return z(a) === m;
  }
  reactIs_production_min.AsyncMode = l;
  reactIs_production_min.ConcurrentMode = m;
  reactIs_production_min.ContextConsumer = k;
  reactIs_production_min.ContextProvider = h;
  reactIs_production_min.Element = c;
  reactIs_production_min.ForwardRef = n;
  reactIs_production_min.Fragment = e;
  reactIs_production_min.Lazy = t;
  reactIs_production_min.Memo = r;
  reactIs_production_min.Portal = d;
  reactIs_production_min.Profiler = g;
  reactIs_production_min.StrictMode = f;
  reactIs_production_min.Suspense = p;
  reactIs_production_min.isAsyncMode = function (a) {
    return A(a) || z(a) === l;
  };
  reactIs_production_min.isConcurrentMode = A;
  reactIs_production_min.isContextConsumer = function (a) {
    return z(a) === k;
  };
  reactIs_production_min.isContextProvider = function (a) {
    return z(a) === h;
  };
  reactIs_production_min.isElement = function (a) {
    return "object" === _typeof$1(a) && null !== a && a.$$typeof === c;
  };
  reactIs_production_min.isForwardRef = function (a) {
    return z(a) === n;
  };
  reactIs_production_min.isFragment = function (a) {
    return z(a) === e;
  };
  reactIs_production_min.isLazy = function (a) {
    return z(a) === t;
  };
  reactIs_production_min.isMemo = function (a) {
    return z(a) === r;
  };
  reactIs_production_min.isPortal = function (a) {
    return z(a) === d;
  };
  reactIs_production_min.isProfiler = function (a) {
    return z(a) === g;
  };
  reactIs_production_min.isStrictMode = function (a) {
    return z(a) === f;
  };
  reactIs_production_min.isSuspense = function (a) {
    return z(a) === p;
  };
  reactIs_production_min.isValidElementType = function (a) {
    return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === _typeof$1(a) && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
  };
  reactIs_production_min.typeOf = z;
  return reactIs_production_min;
}

var reactIs_development = {};

var hasRequiredReactIs_development;
function requireReactIs_development() {
  if (hasRequiredReactIs_development) return reactIs_development;
  hasRequiredReactIs_development = 1;
  if (process.env.NODE_ENV !== "production") {
    (function () {

      // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
      // nor polyfill, then a plain number is used for performance.
      var hasSymbol = typeof Symbol === 'function' && Symbol.for;
      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
      var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
      var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
      var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
      var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
      var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
      var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
      // (unstable) APIs that have been removed. Can we remove the symbols?

      var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
      var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
      var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
      var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
      var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
      var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
      var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
      var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
      var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
      var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
      var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;
      function isValidElementType(type) {
        return typeof type === 'string' || typeof type === 'function' ||
        // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
        type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || _typeof$1(type) === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
      }
      function typeOf(object) {
        if (_typeof$1(object) === 'object' && object !== null) {
          var $$typeof = object.$$typeof;
          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;
              switch (type) {
                case REACT_ASYNC_MODE_TYPE:
                case REACT_CONCURRENT_MODE_TYPE:
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                  return type;
                default:
                  var $$typeofType = type && type.$$typeof;
                  switch ($$typeofType) {
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_LAZY_TYPE:
                    case REACT_MEMO_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;
                    default:
                      return $$typeof;
                  }
              }
            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }
        return undefined;
      } // AsyncMode is deprecated along with isAsyncMode

      var AsyncMode = REACT_ASYNC_MODE_TYPE;
      var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
      var ContextConsumer = REACT_CONTEXT_TYPE;
      var ContextProvider = REACT_PROVIDER_TYPE;
      var Element = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

            console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
          }
        }
        return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
      }
      function isConcurrentMode(object) {
        return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
      }
      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }
      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }
      function isElement(object) {
        return _typeof$1(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }
      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }
      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }
      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }
      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }
      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }
      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }
      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }
      reactIs_development.AsyncMode = AsyncMode;
      reactIs_development.ConcurrentMode = ConcurrentMode;
      reactIs_development.ContextConsumer = ContextConsumer;
      reactIs_development.ContextProvider = ContextProvider;
      reactIs_development.Element = Element;
      reactIs_development.ForwardRef = ForwardRef;
      reactIs_development.Fragment = Fragment;
      reactIs_development.Lazy = Lazy;
      reactIs_development.Memo = Memo;
      reactIs_development.Portal = Portal;
      reactIs_development.Profiler = Profiler;
      reactIs_development.StrictMode = StrictMode;
      reactIs_development.Suspense = Suspense;
      reactIs_development.isAsyncMode = isAsyncMode;
      reactIs_development.isConcurrentMode = isConcurrentMode;
      reactIs_development.isContextConsumer = isContextConsumer;
      reactIs_development.isContextProvider = isContextProvider;
      reactIs_development.isElement = isElement;
      reactIs_development.isForwardRef = isForwardRef;
      reactIs_development.isFragment = isFragment;
      reactIs_development.isLazy = isLazy;
      reactIs_development.isMemo = isMemo;
      reactIs_development.isPortal = isPortal;
      reactIs_development.isProfiler = isProfiler;
      reactIs_development.isStrictMode = isStrictMode;
      reactIs_development.isSuspense = isSuspense;
      reactIs_development.isValidElementType = isValidElementType;
      reactIs_development.typeOf = typeOf;
    })();
  }
  return reactIs_development;
}

var hasRequiredReactIs;
function requireReactIs() {
  if (hasRequiredReactIs) return reactIs.exports;
  hasRequiredReactIs = 1;
  if (process.env.NODE_ENV === 'production') {
    reactIs.exports = requireReactIs_production_min();
  } else {
    reactIs.exports = requireReactIs_development();
  }
  return reactIs.exports;
}

var factoryWithTypeCheckers;
var hasRequiredFactoryWithTypeCheckers;
function requireFactoryWithTypeCheckers() {
  if (hasRequiredFactoryWithTypeCheckers) return factoryWithTypeCheckers;
  hasRequiredFactoryWithTypeCheckers = 1;
  var ReactIs = requireReactIs();
  var assign = requireObjectAssign();
  var ReactPropTypesSecret = /*@__PURE__*/requireReactPropTypesSecret();
  var has = /*@__PURE__*/requireHas();
  var checkPropTypes = /*@__PURE__*/requireCheckPropTypes();
  var printWarning = function printWarning() {};
  if (process.env.NODE_ENV !== 'production') {
    printWarning = function printWarning(text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }
  function emptyFunctionThatReturnsNull() {
    return null;
  }
  factoryWithTypeCheckers = function factoryWithTypeCheckers(isValidElement, throwOnDirectAccess) {
    /* global Symbol */
    var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

    /**
     * Returns the iterator method function contained on the iterable object.
     *
     * Be sure to invoke the function with the iterable as context:
     *
     *     var iteratorFn = getIteratorFn(myIterable);
     *     if (iteratorFn) {
     *       var iterator = iteratorFn.call(myIterable);
     *       ...
     *     }
     *
     * @param {?object} maybeIterable
     * @return {?function}
     */
    function getIteratorFn(maybeIterable) {
      var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
      if (typeof iteratorFn === 'function') {
        return iteratorFn;
      }
    }

    /**
     * Collection of methods that allow declaration and validation of props that are
     * supplied to React components. Example usage:
     *
     *   var Props = require('ReactPropTypes');
     *   var MyArticle = React.createClass({
     *     propTypes: {
     *       // An optional string prop named "description".
     *       description: Props.string,
     *
     *       // A required enum prop named "category".
     *       category: Props.oneOf(['News','Photos']).isRequired,
     *
     *       // A prop named "dialog" that requires an instance of Dialog.
     *       dialog: Props.instanceOf(Dialog).isRequired
     *     },
     *     render: function() { ... }
     *   });
     *
     * A more formal specification of how these methods are used:
     *
     *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
     *   decl := ReactPropTypes.{type}(.isRequired)?
     *
     * Each and every declaration produces a function with the same signature. This
     * allows the creation of custom validation functions. For example:
     *
     *  var MyLink = React.createClass({
     *    propTypes: {
     *      // An optional string or URI prop named "href".
     *      href: function(props, propName, componentName) {
     *        var propValue = props[propName];
     *        if (propValue != null && typeof propValue !== 'string' &&
     *            !(propValue instanceof URI)) {
     *          return new Error(
     *            'Expected a string or an URI for ' + propName + ' in ' +
     *            componentName
     *          );
     *        }
     *      }
     *    },
     *    render: function() {...}
     *  });
     *
     * @internal
     */

    var ANONYMOUS = '<<anonymous>>';

    // Important!
    // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
    var ReactPropTypes = {
      array: createPrimitiveTypeChecker('array'),
      bigint: createPrimitiveTypeChecker('bigint'),
      bool: createPrimitiveTypeChecker('boolean'),
      func: createPrimitiveTypeChecker('function'),
      number: createPrimitiveTypeChecker('number'),
      object: createPrimitiveTypeChecker('object'),
      string: createPrimitiveTypeChecker('string'),
      symbol: createPrimitiveTypeChecker('symbol'),
      any: createAnyTypeChecker(),
      arrayOf: createArrayOfTypeChecker,
      element: createElementTypeChecker(),
      elementType: createElementTypeTypeChecker(),
      instanceOf: createInstanceTypeChecker,
      node: createNodeChecker(),
      objectOf: createObjectOfTypeChecker,
      oneOf: createEnumTypeChecker,
      oneOfType: createUnionTypeChecker,
      shape: createShapeTypeChecker,
      exact: createStrictShapeTypeChecker
    };

    /**
     * inlined Object.is polyfill to avoid requiring consumers ship their own
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */
    /*eslint-disable no-self-compare*/
    function is(x, y) {
      // SameValue algorithm
      if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y;
      } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
      }
    }
    /*eslint-enable no-self-compare*/

    /**
     * We use an Error-like object for backward compatibility as people may call
     * PropTypes directly and inspect their output. However, we don't use real
     * Errors anymore. We don't inspect their stack anyway, and creating them
     * is prohibitively expensive if they are created too often, such as what
     * happens in oneOfType() for any type before the one that matched.
     */
    function PropTypeError(message, data) {
      this.message = message;
      this.data = data && _typeof$1(data) === 'object' ? data : {};
      this.stack = '';
    }
    // Make `instanceof Error` still work for returned errors.
    PropTypeError.prototype = Error.prototype;
    function createChainableTypeChecker(validate) {
      if (process.env.NODE_ENV !== 'production') {
        var manualPropTypeCallCache = {};
        var manualPropTypeWarningCount = 0;
      }
      function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;
        if (secret !== ReactPropTypesSecret) {
          if (throwOnDirectAccess) {
            // New behavior only for users of `prop-types` package
            var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
            err.name = 'Invariant Violation';
            throw err;
          } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
            // Old behavior for people using React.PropTypes
            var cacheKey = componentName + ':' + propName;
            if (!manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3) {
              printWarning('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
              manualPropTypeCallCache[cacheKey] = true;
              manualPropTypeWarningCount++;
            }
          }
        }
        if (props[propName] == null) {
          if (isRequired) {
            if (props[propName] === null) {
              return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
            }
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
          }
          return null;
        } else {
          return validate(props, propName, componentName, location, propFullName);
        }
      }
      var chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);
      return chainedCheckType;
    }
    function createPrimitiveTypeChecker(expectedType) {
      function validate(props, propName, componentName, location, propFullName, secret) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== expectedType) {
          // `propValue` being instance of, say, date/regexp, pass the 'object'
          // check, but we can offer a more precise error message here rather than
          // 'of type `object`'.
          var preciseType = getPreciseType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'), {
            expectedType: expectedType
          });
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createAnyTypeChecker() {
      return createChainableTypeChecker(emptyFunctionThatReturnsNull);
    }
    function createArrayOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
        }
        var propValue = props[propName];
        if (!Array.isArray(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
        }
        for (var i = 0; i < propValue.length; i++) {
          var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createElementTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!isValidElement(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createElementTypeTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!ReactIs.isValidElementType(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createInstanceTypeChecker(expectedClass) {
      function validate(props, propName, componentName, location, propFullName) {
        if (!(props[propName] instanceof expectedClass)) {
          var expectedClassName = expectedClass.name || ANONYMOUS;
          var actualClassName = getClassName(props[propName]);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createEnumTypeChecker(expectedValues) {
      if (!Array.isArray(expectedValues)) {
        if (process.env.NODE_ENV !== 'production') {
          if (arguments.length > 1) {
            printWarning('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
          } else {
            printWarning('Invalid argument supplied to oneOf, expected an array.');
          }
        }
        return emptyFunctionThatReturnsNull;
      }
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        for (var i = 0; i < expectedValues.length; i++) {
          if (is(propValue, expectedValues[i])) {
            return null;
          }
        }
        var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
          var type = getPreciseType(value);
          if (type === 'symbol') {
            return String(value);
          }
          return value;
        });
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
      }
      return createChainableTypeChecker(validate);
    }
    function createObjectOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
        }
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
        }
        for (var key in propValue) {
          if (has(propValue, key)) {
            var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createUnionTypeChecker(arrayOfTypeCheckers) {
      if (!Array.isArray(arrayOfTypeCheckers)) {
        process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
        return emptyFunctionThatReturnsNull;
      }
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (typeof checker !== 'function') {
          printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
          return emptyFunctionThatReturnsNull;
        }
      }
      function validate(props, propName, componentName, location, propFullName) {
        var expectedTypes = [];
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
          if (checkerResult == null) {
            return null;
          }
          if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
            expectedTypes.push(checkerResult.data.expectedType);
          }
        }
        var expectedTypesMessage = expectedTypes.length > 0 ? ', expected one of type [' + expectedTypes.join(', ') + ']' : '';
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
      }
      return createChainableTypeChecker(validate);
    }
    function createNodeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        if (!isNode(props[propName])) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function invalidValidatorError(componentName, location, propFullName, key, type) {
      return new PropTypeError((componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + type + '`.');
    }
    function createShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        for (var key in shapeTypes) {
          var checker = shapeTypes[key];
          if (typeof checker !== 'function') {
            return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createStrictShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        // We need to check all keys in case some are required but missing from props.
        var allKeys = assign({}, props[propName], shapeTypes);
        for (var key in allKeys) {
          var checker = shapeTypes[key];
          if (has(shapeTypes, key) && typeof checker !== 'function') {
            return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
          }
          if (!checker) {
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function isNode(propValue) {
      switch (_typeof$1(propValue)) {
        case 'number':
        case 'string':
        case 'undefined':
          return true;
        case 'boolean':
          return !propValue;
        case 'object':
          if (Array.isArray(propValue)) {
            return propValue.every(isNode);
          }
          if (propValue === null || isValidElement(propValue)) {
            return true;
          }
          var iteratorFn = getIteratorFn(propValue);
          if (iteratorFn) {
            var iterator = iteratorFn.call(propValue);
            var step;
            if (iteratorFn !== propValue.entries) {
              while (!(step = iterator.next()).done) {
                if (!isNode(step.value)) {
                  return false;
                }
              }
            } else {
              // Iterator will provide entry [k,v] tuples rather than values.
              while (!(step = iterator.next()).done) {
                var entry = step.value;
                if (entry) {
                  if (!isNode(entry[1])) {
                    return false;
                  }
                }
              }
            }
          } else {
            return false;
          }
          return true;
        default:
          return false;
      }
    }
    function isSymbol(propType, propValue) {
      // Native Symbol.
      if (propType === 'symbol') {
        return true;
      }

      // falsy value can't be a Symbol
      if (!propValue) {
        return false;
      }

      // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
      if (propValue['@@toStringTag'] === 'Symbol') {
        return true;
      }

      // Fallback for non-spec compliant Symbols which are polyfilled.
      if (typeof Symbol === 'function' && propValue instanceof Symbol) {
        return true;
      }
      return false;
    }

    // Equivalent of `typeof` but with special handling for array and regexp.
    function getPropType(propValue) {
      var propType = _typeof$1(propValue);
      if (Array.isArray(propValue)) {
        return 'array';
      }
      if (propValue instanceof RegExp) {
        // Old webkits (at least until Android 4.0) return 'function' rather than
        // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
        // passes PropTypes.object.
        return 'object';
      }
      if (isSymbol(propType, propValue)) {
        return 'symbol';
      }
      return propType;
    }

    // This handles more types than `getPropType`. Only used for error messages.
    // See `createPrimitiveTypeChecker`.
    function getPreciseType(propValue) {
      if (typeof propValue === 'undefined' || propValue === null) {
        return '' + propValue;
      }
      var propType = getPropType(propValue);
      if (propType === 'object') {
        if (propValue instanceof Date) {
          return 'date';
        } else if (propValue instanceof RegExp) {
          return 'regexp';
        }
      }
      return propType;
    }

    // Returns a string that is postfixed to a warning about an invalid type.
    // For example, "undefined" or "of type array"
    function getPostfixForTypeWarning(value) {
      var type = getPreciseType(value);
      switch (type) {
        case 'array':
        case 'object':
          return 'an ' + type;
        case 'boolean':
        case 'date':
        case 'regexp':
          return 'a ' + type;
        default:
          return type;
      }
    }

    // Returns class name of the object, if any.
    function getClassName(propValue) {
      if (!propValue.constructor || !propValue.constructor.name) {
        return ANONYMOUS;
      }
      return propValue.constructor.name;
    }
    ReactPropTypes.checkPropTypes = checkPropTypes;
    ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
  };
  return factoryWithTypeCheckers;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var factoryWithThrowingShims;
var hasRequiredFactoryWithThrowingShims;
function requireFactoryWithThrowingShims() {
  if (hasRequiredFactoryWithThrowingShims) return factoryWithThrowingShims;
  hasRequiredFactoryWithThrowingShims = 1;
  var ReactPropTypesSecret = /*@__PURE__*/requireReactPropTypesSecret();
  function emptyFunction() {}
  function emptyFunctionWithReset() {}
  emptyFunctionWithReset.resetWarningCache = emptyFunction;
  factoryWithThrowingShims = function factoryWithThrowingShims() {
    function shim(props, propName, componentName, location, propFullName, secret) {
      if (secret === ReactPropTypesSecret) {
        // It is still safe when called from React.
        return;
      }
      var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
      err.name = 'Invariant Violation';
      throw err;
    }
    shim.isRequired = shim;
    function getShim() {
      return shim;
    }
    // Important!
    // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
    var ReactPropTypes = {
      array: shim,
      bigint: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,
      any: shim,
      arrayOf: getShim,
      element: shim,
      elementType: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim,
      checkPropTypes: emptyFunctionWithReset,
      resetWarningCache: emptyFunction
    };
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
  };
  return factoryWithThrowingShims;
}

var hasRequiredPropTypes;
function requirePropTypes() {
  if (hasRequiredPropTypes) return propTypes.exports;
  hasRequiredPropTypes = 1;
  if (process.env.NODE_ENV !== 'production') {
    var ReactIs = requireReactIs();

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    propTypes.exports = /*@__PURE__*/requireFactoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
  } else {
    // By explicitly using `prop-types` you are opting into new production behavior.
    // http://fb.me/prop-types-in-prod
    propTypes.exports = /*@__PURE__*/requireFactoryWithThrowingShims()();
  }
  return propTypes.exports;
}

var propTypesExports = /*@__PURE__*/ requirePropTypes();
var PropTypes = /*@__PURE__*/getDefaultExportFromCjs(propTypesExports);

var hoistNonReactStatics_cjs;
var hasRequiredHoistNonReactStatics_cjs;
function requireHoistNonReactStatics_cjs() {
  if (hasRequiredHoistNonReactStatics_cjs) return hoistNonReactStatics_cjs;
  hasRequiredHoistNonReactStatics_cjs = 1;
  var reactIs = requireReactIs();

  /**
   * Copyright 2015, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */
  var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
  };
  var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
  };
  var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
  };
  var MEMO_STATICS = {
    '$$typeof': true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
  };
  var TYPE_STATICS = {};
  TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
  TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
  function getStatics(component) {
    // React v16.11 and below
    if (reactIs.isMemo(component)) {
      return MEMO_STATICS;
    } // React v16.12 and above

    return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
  }
  var defineProperty = Object.defineProperty;
  var getOwnPropertyNames = Object.getOwnPropertyNames;
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var getPrototypeOf = Object.getPrototypeOf;
  var objectPrototype = Object.prototype;
  function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
      // don't hoist over string (html) components
      if (objectPrototype) {
        var inheritedComponent = getPrototypeOf(sourceComponent);
        if (inheritedComponent && inheritedComponent !== objectPrototype) {
          hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
        }
      }
      var keys = getOwnPropertyNames(sourceComponent);
      if (getOwnPropertySymbols) {
        keys = keys.concat(getOwnPropertySymbols(sourceComponent));
      }
      var targetStatics = getStatics(targetComponent);
      var sourceStatics = getStatics(sourceComponent);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
          var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
          try {
            // Avoid failures from read-only properties
            defineProperty(targetComponent, key, descriptor);
          } catch (e) {}
        }
      }
    }
    return targetComponent;
  }
  hoistNonReactStatics_cjs = hoistNonReactStatics;
  return hoistNonReactStatics_cjs;
}

requireHoistNonReactStatics_cjs();

var browser;
var hasRequiredBrowser;
function requireBrowser() {
  if (hasRequiredBrowser) return browser;
  hasRequiredBrowser = 1;

  /**
   * Use invariant() to assert state which your program assumes to be true.
   *
   * Provide sprintf-style format (only %s is supported) and arguments
   * to provide information about what broke and what you were
   * expecting.
   *
   * The invariant message will be stripped in production, but the invariant
   * will remain to ensure logic does not differ in production.
   */

  var invariant = function invariant(condition, format, a, b, c, d, e, f) {
    if (process.env.NODE_ENV !== 'production') {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    }
    if (!condition) {
      var error;
      if (format === undefined) {
        error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(format.replace(/%s/g, function () {
          return args[argIndex++];
        }));
        error.name = 'Invariant Violation';
      }
      error.framesToPop = 1; // we don't care about invariant's own frame
      throw error;
    }
  };
  browser = invariant;
  return browser;
}

var browserExports = requireBrowser();
var invariant = /*@__PURE__*/getDefaultExportFromCjs(browserExports);

// -- Utilities ----------------------------------------------------------------
function getCacheId(inputs) {
  return JSON.stringify(inputs.map(function (input) {
    return input && _typeof$1(input) === 'object' ? orderedProps(input) : input;
  }));
}
function orderedProps(obj) {
  return Object.keys(obj).sort().map(function (k) {
    var _a;
    return _a = {}, _a[k] = obj[k], _a;
  });
}
var memoizeFormatConstructor = function memoizeFormatConstructor(FormatConstructor, cache) {
  if (cache === void 0) {
    cache = {};
  }
  return function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var cacheId = getCacheId(args);
    var format = cacheId && cache[cacheId];
    if (!format) {
      format = new ((_a = FormatConstructor).bind.apply(_a, [void 0].concat(args)))();
      if (cacheId) {
        cache[cacheId] = format;
      }
    }
    return format;
  };
};

// GENERATED FILE
var defaultLocaleData = {
  "locale": "en",
  "pluralRuleFunction": function pluralRuleFunction(n, ord) {
    var s = String(n).split("."),
      v0 = !s[1],
      t0 = Number(s[0]) == n,
      n10 = t0 && s[0].slice(-1),
      n100 = t0 && s[0].slice(-2);
    if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";
    return n == 1 && v0 ? "one" : "other";
  },
  "fields": {
    "year": {
      "displayName": "year",
      "relative": {
        "0": "this year",
        "1": "next year",
        "-1": "last year"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} year",
          "other": "in {0} years"
        },
        "past": {
          "one": "{0} year ago",
          "other": "{0} years ago"
        }
      }
    },
    "year-short": {
      "displayName": "yr.",
      "relative": {
        "0": "this yr.",
        "1": "next yr.",
        "-1": "last yr."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} yr.",
          "other": "in {0} yr."
        },
        "past": {
          "one": "{0} yr. ago",
          "other": "{0} yr. ago"
        }
      }
    },
    "month": {
      "displayName": "month",
      "relative": {
        "0": "this month",
        "1": "next month",
        "-1": "last month"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} month",
          "other": "in {0} months"
        },
        "past": {
          "one": "{0} month ago",
          "other": "{0} months ago"
        }
      }
    },
    "month-short": {
      "displayName": "mo.",
      "relative": {
        "0": "this mo.",
        "1": "next mo.",
        "-1": "last mo."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} mo.",
          "other": "in {0} mo."
        },
        "past": {
          "one": "{0} mo. ago",
          "other": "{0} mo. ago"
        }
      }
    },
    "day": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "day-short": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "hour": {
      "displayName": "hour",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hour",
          "other": "in {0} hours"
        },
        "past": {
          "one": "{0} hour ago",
          "other": "{0} hours ago"
        }
      }
    },
    "hour-short": {
      "displayName": "hr.",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hr.",
          "other": "in {0} hr."
        },
        "past": {
          "one": "{0} hr. ago",
          "other": "{0} hr. ago"
        }
      }
    },
    "minute": {
      "displayName": "minute",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} minute",
          "other": "in {0} minutes"
        },
        "past": {
          "one": "{0} minute ago",
          "other": "{0} minutes ago"
        }
      }
    },
    "minute-short": {
      "displayName": "min.",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} min.",
          "other": "in {0} min."
        },
        "past": {
          "one": "{0} min. ago",
          "other": "{0} min. ago"
        }
      }
    },
    "second": {
      "displayName": "second",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} second",
          "other": "in {0} seconds"
        },
        "past": {
          "one": "{0} second ago",
          "other": "{0} seconds ago"
        }
      }
    },
    "second-short": {
      "displayName": "sec.",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} sec.",
          "other": "in {0} sec."
        },
        "past": {
          "one": "{0} sec. ago",
          "other": "{0} sec. ago"
        }
      }
    }
  }
};

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

function addLocaleData() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var locales = Array.isArray(data) ? data : [data];
  locales.forEach(function (localeData) {
    if (localeData && localeData.locale) {
      IntlMessageFormat.__addLocaleData(localeData);
      IntlRelativeFormat.__addLocaleData(localeData);
    }
  });
}
function hasLocaleData(locale) {
  var localeParts = (locale || '').split('-');
  while (localeParts.length > 0) {
    if (hasIMFAndIRFLocaleData(localeParts.join('-'))) {
      return true;
    }
    localeParts.pop();
  }
  return false;
}
function hasIMFAndIRFLocaleData(locale) {
  var normalizedLocale = locale && locale.toLowerCase();
  return !!(IntlMessageFormat.__localeData__[normalizedLocale] && IntlRelativeFormat.__localeData__[normalizedLocale]);
}
var _typeof = typeof Symbol === "function" && _typeof$1(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof$1(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof$1(obj);
};
var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var inherits = function inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof$1(superClass));
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};
var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
};
var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (_typeof$1(call) === "object" || typeof call === "function") ? call : self;
};
var toConsumableArray = function toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
    return arr2;
  } else {
    return Array.from(arr);
  }
};

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var bool = PropTypes.bool;
var number = PropTypes.number;
var string = PropTypes.string;
var func = PropTypes.func;
var object = PropTypes.object;
var oneOf = PropTypes.oneOf;
var shape = PropTypes.shape;
var any = PropTypes.any;
var oneOfType = PropTypes.oneOfType;
var localeMatcher = oneOf(['best fit', 'lookup']);
var narrowShortLong = oneOf(['narrow', 'short', 'long']);
var numeric2digit = oneOf(['numeric', '2-digit']);
var funcReq = func.isRequired;
var intlConfigPropTypes = {
  locale: string,
  timeZone: string,
  formats: object,
  messages: object,
  textComponent: any,
  defaultLocale: string,
  defaultFormats: object,
  onError: func
};
var intlFormatPropTypes = {
  formatDate: funcReq,
  formatTime: funcReq,
  formatRelative: funcReq,
  formatNumber: funcReq,
  formatPlural: funcReq,
  formatMessage: funcReq,
  formatHTMLMessage: funcReq
};
var intlShape = shape(_extends({}, intlConfigPropTypes, intlFormatPropTypes, {
  formatters: object,
  now: funcReq
}));
var messageDescriptorPropTypes = {
  id: string.isRequired,
  description: oneOfType([string, object]),
  defaultMessage: string
};
var dateTimeFormatPropTypes = {
  localeMatcher: localeMatcher,
  formatMatcher: oneOf(['basic', 'best fit']),
  timeZone: string,
  hour12: bool,
  weekday: narrowShortLong,
  era: narrowShortLong,
  year: numeric2digit,
  month: oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
  day: numeric2digit,
  hour: numeric2digit,
  minute: numeric2digit,
  second: numeric2digit,
  timeZoneName: oneOf(['short', 'long'])
};
var numberFormatPropTypes = {
  localeMatcher: localeMatcher,
  style: oneOf(['decimal', 'currency', 'percent']),
  currency: string,
  currencyDisplay: oneOf(['symbol', 'code', 'name']),
  useGrouping: bool,
  minimumIntegerDigits: number,
  minimumFractionDigits: number,
  maximumFractionDigits: number,
  minimumSignificantDigits: number,
  maximumSignificantDigits: number
};
var relativeFormatPropTypes = {
  style: oneOf(['best fit', 'numeric']),
  units: oneOf(['second', 'minute', 'hour', 'day', 'month', 'year', 'second-short', 'minute-short', 'hour-short', 'day-short', 'month-short', 'year-short'])
};
var pluralFormatPropTypes = {
  style: oneOf(['cardinal', 'ordinal'])
};

/*
HTML escaping and shallow-equals implementations are the same as React's
(on purpose.) Therefore, it has the following Copyright and Licensing:

Copyright 2013-2014, Facebook, Inc.
All rights reserved.

This source code is licensed under the BSD-style license found in the LICENSE
file in the root directory of React's source tree.
*/

var intlConfigPropNames = Object.keys(intlConfigPropTypes);
var ESCAPED_CHARS = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  "'": '&#x27;'
};
var UNSAFE_CHARS_REGEX = /[&><"']/g;
function escape(str) {
  return ('' + str).replace(UNSAFE_CHARS_REGEX, function (match) {
    return ESCAPED_CHARS[match];
  });
}
function filterProps(props, whitelist) {
  var defaults$$1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return whitelist.reduce(function (filtered, name) {
    if (props.hasOwnProperty(name)) {
      filtered[name] = props[name];
    } else if (defaults$$1.hasOwnProperty(name)) {
      filtered[name] = defaults$$1[name];
    }
    return filtered;
  }, {});
}
function invariantIntlContext() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    intl = _ref.intl;
  invariant(intl, '[React Intl] Could not find required `intl` object. ' + '<IntlProvider> needs to exist in the component ancestry.');
}
function shallowEquals(objA, objB) {
  if (objA === objB) {
    return true;
  }
  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }
  return true;
}
function shouldIntlComponentUpdate(_ref2, nextProps, nextState) {
  var props = _ref2.props,
    state = _ref2.state,
    _ref2$context = _ref2.context,
    context = _ref2$context === undefined ? {} : _ref2$context;
  var nextContext = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _context$intl = context.intl,
    intl = _context$intl === undefined ? {} : _context$intl;
  var _nextContext$intl = nextContext.intl,
    nextIntl = _nextContext$intl === undefined ? {} : _nextContext$intl;
  return !shallowEquals(nextProps, props) || !shallowEquals(nextState, state) || !(nextIntl === intl || shallowEquals(filterProps(nextIntl, intlConfigPropNames), filterProps(intl, intlConfigPropNames)));
}
function createError(message, exception) {
  var eMsg = exception ? '\n' + exception : '';
  return '[React Intl] ' + message + eMsg;
}
function defaultErrorHandler(error) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }
}

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

// This is a "hack" until a proper `intl-pluralformat` package is created.

function resolveLocale(locales) {
  // IntlMessageFormat#_resolveLocale() does not depend on `this`.
  return IntlMessageFormat.prototype._resolveLocale(locales);
}
function findPluralFunction(locale) {
  // IntlMessageFormat#_findPluralFunction() does not depend on `this`.
  return IntlMessageFormat.prototype._findPluralRuleFunction(locale);
}
var IntlPluralFormat = function IntlPluralFormat(locales) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  classCallCheck(this, IntlPluralFormat);
  var useOrdinal = options.style === 'ordinal';
  var pluralFn = findPluralFunction(resolveLocale(locales));
  this.format = function (value) {
    return pluralFn(value, useOrdinal);
  };
};

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var DATE_TIME_FORMAT_OPTIONS = Object.keys(dateTimeFormatPropTypes);
var NUMBER_FORMAT_OPTIONS = Object.keys(numberFormatPropTypes);
var RELATIVE_FORMAT_OPTIONS = Object.keys(relativeFormatPropTypes);
var PLURAL_FORMAT_OPTIONS = Object.keys(pluralFormatPropTypes);
var RELATIVE_FORMAT_THRESHOLDS = {
  second: 60,
  // seconds to minute
  minute: 60,
  // minutes to hour
  hour: 24,
  // hours to day
  day: 30,
  // days to month
  month: 12
};
function updateRelativeFormatThresholds(newThresholds) {
  var thresholds = IntlRelativeFormat.thresholds;
  thresholds.second = newThresholds.second;
  thresholds.minute = newThresholds.minute;
  thresholds.hour = newThresholds.hour;
  thresholds.day = newThresholds.day;
  thresholds.month = newThresholds.month;
  thresholds['second-short'] = newThresholds['second-short'];
  thresholds['minute-short'] = newThresholds['minute-short'];
  thresholds['hour-short'] = newThresholds['hour-short'];
  thresholds['day-short'] = newThresholds['day-short'];
  thresholds['month-short'] = newThresholds['month-short'];
}
function getNamedFormat(formats, type, name, onError) {
  var format = formats && formats[type] && formats[type][name];
  if (format) {
    return format;
  }
  onError(createError('No ' + type + ' format named: ' + name));
}
function formatDate(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
    formats = config.formats,
    timeZone = config.timeZone;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);
  var defaults$$1 = _extends({}, timeZone && {
    timeZone: timeZone
  }, format && getNamedFormat(formats, 'date', format, onError));
  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);
  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    onError(createError('Error formatting date.', e));
  }
  return String(date);
}
function formatTime(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
    formats = config.formats,
    timeZone = config.timeZone;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);
  var defaults$$1 = _extends({}, timeZone && {
    timeZone: timeZone
  }, format && getNamedFormat(formats, 'time', format, onError));
  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);
  if (!filteredOptions.hour && !filteredOptions.minute && !filteredOptions.second) {
    // Add default formatting options if hour, minute, or second isn't defined.
    filteredOptions = _extends({}, filteredOptions, {
      hour: 'numeric',
      minute: 'numeric'
    });
  }
  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    onError(createError('Error formatting time.', e));
  }
  return String(date);
}
function formatRelative(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
    formats = config.formats;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);
  var now = new Date(options.now);
  var defaults$$1 = format && getNamedFormat(formats, 'relative', format, onError);
  var filteredOptions = filterProps(options, RELATIVE_FORMAT_OPTIONS, defaults$$1);

  // Capture the current threshold values, then temporarily override them with
  // specific values just for this render.
  var oldThresholds = _extends({}, IntlRelativeFormat.thresholds);
  updateRelativeFormatThresholds(RELATIVE_FORMAT_THRESHOLDS);
  try {
    return state.getRelativeFormat(locale, filteredOptions).format(date, {
      now: isFinite(now) ? now : state.now()
    });
  } catch (e) {
    onError(createError('Error formatting relative time.', e));
  } finally {
    updateRelativeFormatThresholds(oldThresholds);
  }
  return String(date);
}
function formatNumber(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
    formats = config.formats;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var defaults$$1 = format && getNamedFormat(formats, 'number', format, onError);
  var filteredOptions = filterProps(options, NUMBER_FORMAT_OPTIONS, defaults$$1);
  try {
    return state.getNumberFormat(locale, filteredOptions).format(value);
  } catch (e) {
    onError(createError('Error formatting number.', e));
  }
  return String(value);
}
function formatPlural(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale;
  var filteredOptions = filterProps(options, PLURAL_FORMAT_OPTIONS);
  var onError = config.onError || defaultErrorHandler;
  try {
    return state.getPluralFormat(locale, filteredOptions).format(value);
  } catch (e) {
    onError(createError('Error formatting plural.', e));
  }
  return 'other';
}
function formatMessage(config, state) {
  var messageDescriptor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var values = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
    formats = config.formats,
    messages = config.messages,
    defaultLocale = config.defaultLocale,
    defaultFormats = config.defaultFormats;
  var id = messageDescriptor.id,
    defaultMessage = messageDescriptor.defaultMessage;

  // Produce a better error if the user calls `intl.formatMessage(element)`

  if (process.env.NODE_ENV !== 'production') {
    invariant(! /*#__PURE__*/reactExports.isValidElement(config), '[React Intl] Don\'t pass React elements to ' + 'formatMessage(), pass `.props`.');
  }

  // `id` is a required field of a Message Descriptor.
  invariant(id, '[React Intl] An `id` must be provided to format a message.');
  var message = messages && messages[id];
  var hasValues = Object.keys(values).length > 0;

  // Avoid expensive message formatting for simple messages without values. In
  // development messages will always be formatted in case of missing values.
  if (!hasValues && process.env.NODE_ENV === 'production') {
    return message || defaultMessage || id;
  }
  var formattedMessage = void 0;
  var onError = config.onError || defaultErrorHandler;
  if (message) {
    try {
      var formatter = state.getMessageFormat(message, locale, formats);
      formattedMessage = formatter.format(values);
    } catch (e) {
      onError(createError('Error formatting message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : ''), e));
    }
  } else {
    // This prevents warnings from littering the console in development
    // when no `messages` are passed into the <IntlProvider> for the
    // default locale, and a default message is in the source.
    if (!defaultMessage || locale && locale.toLowerCase() !== defaultLocale.toLowerCase()) {
      onError(createError('Missing message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : '')));
    }
  }
  if (!formattedMessage && defaultMessage) {
    try {
      var _formatter = state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats);
      formattedMessage = _formatter.format(values);
    } catch (e) {
      onError(createError('Error formatting the default message for: "' + id + '"', e));
    }
  }
  if (!formattedMessage) {
    onError(createError('Cannot format message: "' + id + '", ' + ('using message ' + (message || defaultMessage ? 'source' : 'id') + ' as fallback.')));
  }
  return formattedMessage || message || defaultMessage || id;
}
function formatHTMLMessage(config, state, messageDescriptor) {
  var rawValues = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  // Process all the values before they are used when formatting the ICU
  // Message string. Since the formatted message might be injected via
  // `innerHTML`, all String-based values need to be HTML-escaped.
  var escapedValues = Object.keys(rawValues).reduce(function (escaped, name) {
    var value = rawValues[name];
    escaped[name] = typeof value === 'string' ? escape(value) : value;
    return escaped;
  }, {});
  return formatMessage(config, state, messageDescriptor, escapedValues);
}
var format = Object.freeze({
  formatDate: formatDate,
  formatTime: formatTime,
  formatRelative: formatRelative,
  formatNumber: formatNumber,
  formatPlural: formatPlural,
  formatMessage: formatMessage,
  formatHTMLMessage: formatHTMLMessage
});

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var intlConfigPropNames$1 = Object.keys(intlConfigPropTypes);
var intlFormatPropNames = Object.keys(intlFormatPropTypes);

// These are not a static property on the `IntlProvider` class so the intl
// config values can be inherited from an <IntlProvider> ancestor.
var defaultProps = {
  formats: {},
  messages: {},
  timeZone: null,
  textComponent: 'span',
  defaultLocale: 'en',
  defaultFormats: {},
  onError: defaultErrorHandler
};
var IntlProvider = function (_Component) {
  inherits(IntlProvider, _Component);
  function IntlProvider(props) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, IntlProvider);
    var _this = possibleConstructorReturn(this, (IntlProvider.__proto__ || Object.getPrototypeOf(IntlProvider)).call(this, props, context));
    invariant(typeof Intl !== 'undefined', '[React Intl] The `Intl` APIs must be available in the runtime, ' + 'and do not appear to be built-in. An `Intl` polyfill should be loaded.\n' + 'See: http://formatjs.io/guides/runtime-environments/');
    var intlContext = context.intl;

    // Used to stabilize time when performing an initial rendering so that
    // all relative times use the same reference "now" time.

    var initialNow = void 0;
    if (isFinite(props.initialNow)) {
      initialNow = Number(props.initialNow);
    } else {
      // When an `initialNow` isn't provided via `props`, look to see an
      // <IntlProvider> exists in the ancestry and call its `now()`
      // function to propagate its value for "now".
      initialNow = intlContext ? intlContext.now() : Date.now();
    }

    // Creating `Intl*` formatters is expensive. If there's a parent
    // `<IntlProvider>`, then its formatters will be used. Otherwise, this
    // memoize the `Intl*` constructors and cache them for the lifecycle of
    // this IntlProvider instance.

    var _ref = intlContext || {},
      _ref$formatters = _ref.formatters,
      formatters = _ref$formatters === undefined ? {
        getDateTimeFormat: memoizeFormatConstructor(Intl.DateTimeFormat),
        getNumberFormat: memoizeFormatConstructor(Intl.NumberFormat),
        getMessageFormat: memoizeFormatConstructor(IntlMessageFormat),
        getRelativeFormat: memoizeFormatConstructor(IntlRelativeFormat),
        getPluralFormat: memoizeFormatConstructor(IntlPluralFormat)
      } : _ref$formatters;
    _this.state = _extends({}, formatters, {
      // Wrapper to provide stable "now" time for initial render.
      now: function now() {
        return _this._didDisplay ? Date.now() : initialNow;
      }
    });
    return _this;
  }
  createClass(IntlProvider, [{
    key: 'getConfig',
    value: function getConfig() {
      var intlContext = this.context.intl;

      // Build a whitelisted config object from `props`, defaults, and
      // `context.intl`, if an <IntlProvider> exists in the ancestry.

      var config = filterProps(this.props, intlConfigPropNames$1, intlContext);

      // Apply default props. This must be applied last after the props have
      // been resolved and inherited from any <IntlProvider> in the ancestry.
      // This matches how React resolves `defaultProps`.
      for (var propName in defaultProps) {
        if (config[propName] === undefined) {
          config[propName] = defaultProps[propName];
        }
      }
      if (!hasLocaleData(config.locale)) {
        var _config = config,
          locale = _config.locale,
          defaultLocale = _config.defaultLocale,
          defaultFormats = _config.defaultFormats,
          onError = _config.onError;
        onError(createError('Missing locale data for locale: "' + locale + '". ' + ('Using default locale: "' + defaultLocale + '" as fallback.')));

        // Since there's no registered locale data for `locale`, this will
        // fallback to the `defaultLocale` to make sure things can render.
        // The `messages` are overridden to the `defaultProps` empty object
        // to maintain referential equality across re-renders. It's assumed
        // each <FormattedMessage> contains a `defaultMessage` prop.
        config = _extends({}, config, {
          locale: defaultLocale,
          formats: defaultFormats,
          messages: defaultProps.messages
        });
      }
      return config;
    }
  }, {
    key: 'getBoundFormatFns',
    value: function getBoundFormatFns(config, state) {
      return intlFormatPropNames.reduce(function (boundFormatFns, name) {
        boundFormatFns[name] = format[name].bind(null, config, state);
        return boundFormatFns;
      }, {});
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var config = this.getConfig();

      // Bind intl factories and current config to the format functions.
      var boundFormatFns = this.getBoundFormatFns(config, this.state);
      var _state = this.state,
        now = _state.now,
        formatters = objectWithoutProperties(_state, ['now']);
      return {
        intl: _extends({}, config, boundFormatFns, {
          formatters: formatters,
          now: now
        })
      };
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }
      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._didDisplay = true;
    }
  }, {
    key: 'render',
    value: function render() {
      return reactExports.Children.only(this.props.children);
    }
  }]);
  return IntlProvider;
}(reactExports.Component);
IntlProvider.displayName = 'IntlProvider';
IntlProvider.contextTypes = {
  intl: intlShape
};
IntlProvider.childContextTypes = {
  intl: intlShape.isRequired
};
process.env.NODE_ENV !== "production" ? IntlProvider.propTypes = _extends({}, intlConfigPropTypes, {
  children: PropTypes.element.isRequired,
  initialNow: PropTypes.any
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedDate = function (_Component) {
  inherits(FormattedDate, _Component);
  function FormattedDate(props, context) {
    classCallCheck(this, FormattedDate);
    var _this = possibleConstructorReturn(this, (FormattedDate.__proto__ || Object.getPrototypeOf(FormattedDate)).call(this, props, context));
    invariantIntlContext(context);
    return _this;
  }
  createClass(FormattedDate, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }
      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
        formatDate = _context$intl.formatDate,
        Text = _context$intl.textComponent;
      var _props = this.props,
        value = _props.value,
        children = _props.children;
      var formattedDate = formatDate(value, this.props);
      if (typeof children === 'function') {
        return children(formattedDate);
      }
      return /*#__PURE__*/React.createElement(Text, null, formattedDate);
    }
  }]);
  return FormattedDate;
}(reactExports.Component);
FormattedDate.displayName = 'FormattedDate';
FormattedDate.contextTypes = {
  intl: intlShape
};
process.env.NODE_ENV !== "production" ? FormattedDate.propTypes = _extends({}, dateTimeFormatPropTypes, {
  value: PropTypes.any.isRequired,
  format: PropTypes.string,
  children: PropTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedTime = function (_Component) {
  inherits(FormattedTime, _Component);
  function FormattedTime(props, context) {
    classCallCheck(this, FormattedTime);
    var _this = possibleConstructorReturn(this, (FormattedTime.__proto__ || Object.getPrototypeOf(FormattedTime)).call(this, props, context));
    invariantIntlContext(context);
    return _this;
  }
  createClass(FormattedTime, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }
      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
        formatTime = _context$intl.formatTime,
        Text = _context$intl.textComponent;
      var _props = this.props,
        value = _props.value,
        children = _props.children;
      var formattedTime = formatTime(value, this.props);
      if (typeof children === 'function') {
        return children(formattedTime);
      }
      return /*#__PURE__*/React.createElement(Text, null, formattedTime);
    }
  }]);
  return FormattedTime;
}(reactExports.Component);
FormattedTime.displayName = 'FormattedTime';
FormattedTime.contextTypes = {
  intl: intlShape
};
process.env.NODE_ENV !== "production" ? FormattedTime.propTypes = _extends({}, dateTimeFormatPropTypes, {
  value: PropTypes.any.isRequired,
  format: PropTypes.string,
  children: PropTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var SECOND = 1000;
var MINUTE = 1000 * 60;
var HOUR = 1000 * 60 * 60;
var DAY = 1000 * 60 * 60 * 24;

// The maximum timer delay value is a 32-bit signed integer.
// See: https://mdn.io/setTimeout
var MAX_TIMER_DELAY = 2147483647;
function selectUnits(delta) {
  var absDelta = Math.abs(delta);
  if (absDelta < MINUTE) {
    return 'second';
  }
  if (absDelta < HOUR) {
    return 'minute';
  }
  if (absDelta < DAY) {
    return 'hour';
  }

  // The maximum scheduled delay will be measured in days since the maximum
  // timer delay is less than the number of milliseconds in 25 days.
  return 'day';
}
function getUnitDelay(units) {
  switch (units) {
    case 'second':
      return SECOND;
    case 'minute':
      return MINUTE;
    case 'hour':
      return HOUR;
    case 'day':
      return DAY;
    default:
      return MAX_TIMER_DELAY;
  }
}
function isSameDate(a, b) {
  if (a === b) {
    return true;
  }
  var aTime = new Date(a).getTime();
  var bTime = new Date(b).getTime();
  return isFinite(aTime) && isFinite(bTime) && aTime === bTime;
}
var FormattedRelative = function (_Component) {
  inherits(FormattedRelative, _Component);
  function FormattedRelative(props, context) {
    classCallCheck(this, FormattedRelative);
    var _this = possibleConstructorReturn(this, (FormattedRelative.__proto__ || Object.getPrototypeOf(FormattedRelative)).call(this, props, context));
    invariantIntlContext(context);
    var now = isFinite(props.initialNow) ? Number(props.initialNow) : context.intl.now();

    // `now` is stored as state so that `render()` remains a function of
    // props + state, instead of accessing `Date.now()` inside `render()`.
    _this.state = {
      now: now
    };
    return _this;
  }
  createClass(FormattedRelative, [{
    key: 'scheduleNextUpdate',
    value: function scheduleNextUpdate(props, state) {
      var _this2 = this;

      // Cancel and pending update because we're scheduling a new update.
      clearTimeout(this._timer);
      var value = props.value,
        units = props.units,
        updateInterval = props.updateInterval;
      var time = new Date(value).getTime();

      // If the `updateInterval` is falsy, including `0` or we don't have a
      // valid date, then auto updates have been turned off, so we bail and
      // skip scheduling an update.
      if (!updateInterval || !isFinite(time)) {
        return;
      }
      var delta = time - state.now;
      var unitDelay = getUnitDelay(units || selectUnits(delta));
      var unitRemainder = Math.abs(delta % unitDelay);

      // We want the largest possible timer delay which will still display
      // accurate information while reducing unnecessary re-renders. The delay
      // should be until the next "interesting" moment, like a tick from
      // "1 minute ago" to "2 minutes ago" when the delta is 120,000ms.
      var delay = delta < 0 ? Math.max(updateInterval, unitDelay - unitRemainder) : Math.max(updateInterval, unitRemainder);
      this._timer = setTimeout(function () {
        _this2.setState({
          now: _this2.context.intl.now()
        });
      }, delay);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scheduleNextUpdate(this.props, this.state);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var nextValue = _ref.value;

      // When the `props.value` date changes, `state.now` needs to be updated,
      // and the next update can be rescheduled.
      if (!isSameDate(nextValue, this.props.value)) {
        this.setState({
          now: this.context.intl.now()
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }
      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      this.scheduleNextUpdate(nextProps, nextState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._timer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
        formatRelative = _context$intl.formatRelative,
        Text = _context$intl.textComponent;
      var _props = this.props,
        value = _props.value,
        children = _props.children;
      var formattedRelative = formatRelative(value, _extends({}, this.props, this.state));
      if (typeof children === 'function') {
        return children(formattedRelative);
      }
      return /*#__PURE__*/React.createElement(Text, null, formattedRelative);
    }
  }]);
  return FormattedRelative;
}(reactExports.Component);
FormattedRelative.displayName = 'FormattedRelative';
FormattedRelative.contextTypes = {
  intl: intlShape
};
FormattedRelative.defaultProps = {
  updateInterval: 1000 * 10
};
process.env.NODE_ENV !== "production" ? FormattedRelative.propTypes = _extends({}, relativeFormatPropTypes, {
  value: PropTypes.any.isRequired,
  format: PropTypes.string,
  updateInterval: PropTypes.number,
  initialNow: PropTypes.any,
  children: PropTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedNumber = function (_Component) {
  inherits(FormattedNumber, _Component);
  function FormattedNumber(props, context) {
    classCallCheck(this, FormattedNumber);
    var _this = possibleConstructorReturn(this, (FormattedNumber.__proto__ || Object.getPrototypeOf(FormattedNumber)).call(this, props, context));
    invariantIntlContext(context);
    return _this;
  }
  createClass(FormattedNumber, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }
      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
        formatNumber = _context$intl.formatNumber,
        Text = _context$intl.textComponent;
      var _props = this.props,
        value = _props.value,
        children = _props.children;
      var formattedNumber = formatNumber(value, this.props);
      if (typeof children === 'function') {
        return children(formattedNumber);
      }
      return /*#__PURE__*/React.createElement(Text, null, formattedNumber);
    }
  }]);
  return FormattedNumber;
}(reactExports.Component);
FormattedNumber.displayName = 'FormattedNumber';
FormattedNumber.contextTypes = {
  intl: intlShape
};
process.env.NODE_ENV !== "production" ? FormattedNumber.propTypes = _extends({}, numberFormatPropTypes, {
  value: PropTypes.any.isRequired,
  format: PropTypes.string,
  children: PropTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedPlural = function (_Component) {
  inherits(FormattedPlural, _Component);
  function FormattedPlural(props, context) {
    classCallCheck(this, FormattedPlural);
    var _this = possibleConstructorReturn(this, (FormattedPlural.__proto__ || Object.getPrototypeOf(FormattedPlural)).call(this, props, context));
    invariantIntlContext(context);
    return _this;
  }
  createClass(FormattedPlural, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }
      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
        formatPlural = _context$intl.formatPlural,
        Text = _context$intl.textComponent;
      var _props = this.props,
        value = _props.value,
        other = _props.other,
        children = _props.children;
      var pluralCategory = formatPlural(value, this.props);
      var formattedPlural = this.props[pluralCategory] || other;
      if (typeof children === 'function') {
        return children(formattedPlural);
      }
      return /*#__PURE__*/React.createElement(Text, null, formattedPlural);
    }
  }]);
  return FormattedPlural;
}(reactExports.Component);
FormattedPlural.displayName = 'FormattedPlural';
FormattedPlural.contextTypes = {
  intl: intlShape
};
FormattedPlural.defaultProps = {
  style: 'cardinal'
};
process.env.NODE_ENV !== "production" ? FormattedPlural.propTypes = _extends({}, pluralFormatPropTypes, {
  value: PropTypes.any.isRequired,
  other: PropTypes.node.isRequired,
  zero: PropTypes.node,
  one: PropTypes.node,
  two: PropTypes.node,
  few: PropTypes.node,
  many: PropTypes.node,
  children: PropTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var defaultFormatMessage = function defaultFormatMessage(descriptor, values) {
  if (process.env.NODE_ENV !== 'production') {
    console.error('[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry. Using default message as fallback.');
  }
  return formatMessage({}, {
    getMessageFormat: memoizeFormatConstructor(IntlMessageFormat)
  }, descriptor, values);
};
var FormattedMessage = function (_Component) {
  inherits(FormattedMessage, _Component);
  function FormattedMessage(props, context) {
    classCallCheck(this, FormattedMessage);
    var _this = possibleConstructorReturn(this, (FormattedMessage.__proto__ || Object.getPrototypeOf(FormattedMessage)).call(this, props, context));
    if (!props.defaultMessage) {
      invariantIntlContext(context);
    }
    return _this;
  }
  createClass(FormattedMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;
      if (!shallowEquals(nextValues, values)) {
        return true;
      }

      // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.
      var nextPropsToCheck = _extends({}, nextProps, {
        values: values
      });
      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }
      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _ref = this.context.intl || {},
        _ref$formatMessage = _ref.formatMessage,
        formatMessage$$1 = _ref$formatMessage === undefined ? defaultFormatMessage : _ref$formatMessage,
        _ref$textComponent = _ref.textComponent,
        Text = _ref$textComponent === undefined ? 'span' : _ref$textComponent;
      var _props = this.props,
        id = _props.id,
        description = _props.description,
        defaultMessage = _props.defaultMessage,
        values = _props.values,
        _props$tagName = _props.tagName,
        Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
        children = _props.children;
      var tokenDelimiter = void 0;
      var tokenizedValues = void 0;
      var elements = void 0;
      var hasValues = values && Object.keys(values).length > 0;
      if (hasValues) {
        // Creates a token with a random UID that should not be guessable or
        // conflict with other parts of the `message` string.
        var uid = Math.floor(Math.random() * 0x10000000000).toString(16);
        var generateToken = function () {
          var counter = 0;
          return function () {
            return 'ELEMENT-' + uid + '-' + (counter += 1);
          };
        }();

        // Splitting with a delimiter to support IE8. When using a regex
        // with a capture group IE8 does not include the capture group in
        // the resulting array.
        tokenDelimiter = '@__' + uid + '__@';
        tokenizedValues = {};
        elements = {};

        // Iterates over the `props` to keep track of any React Element
        // values so they can be represented by the `token` as a placeholder
        // when the `message` is formatted. This allows the formatted
        // message to then be broken-up into parts with references to the
        // React Elements inserted back in.
        Object.keys(values).forEach(function (name) {
          var value = values[name];
          if (/*#__PURE__*/reactExports.isValidElement(value)) {
            var token = generateToken();
            tokenizedValues[name] = tokenDelimiter + token + tokenDelimiter;
            elements[token] = value;
          } else {
            tokenizedValues[name] = value;
          }
        });
      }
      var descriptor = {
        id: id,
        description: description,
        defaultMessage: defaultMessage
      };
      var formattedMessage = formatMessage$$1(descriptor, tokenizedValues || values);
      var nodes = void 0;
      var hasElements = elements && Object.keys(elements).length > 0;
      if (hasElements) {
        // Split the message into parts so the React Element values captured
        // above can be inserted back into the rendered message. This
        // approach allows messages to render with React Elements while
        // keeping React's virtual diffing working properly.
        nodes = formattedMessage.split(tokenDelimiter).filter(function (part) {
          return !!part;
        }).map(function (part) {
          return elements[part] || part;
        });
      } else {
        nodes = [formattedMessage];
      }
      if (typeof children === 'function') {
        return children.apply(undefined, toConsumableArray(nodes));
      }

      // Needs to use `createElement()` instead of JSX, otherwise React will
      // warn about a missing `key` prop with rich-text message formatting.
      return reactExports.createElement.apply(undefined, [Component$$1, null].concat(toConsumableArray(nodes)));
    }
  }]);
  return FormattedMessage;
}(reactExports.Component);
FormattedMessage.displayName = 'FormattedMessage';
FormattedMessage.contextTypes = {
  intl: intlShape
};
FormattedMessage.defaultProps = {
  values: {}
};
process.env.NODE_ENV !== "production" ? FormattedMessage.propTypes = _extends({}, messageDescriptorPropTypes, {
  values: PropTypes.object,
  tagName: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedHTMLMessage = function (_Component) {
  inherits(FormattedHTMLMessage, _Component);
  function FormattedHTMLMessage(props, context) {
    classCallCheck(this, FormattedHTMLMessage);
    var _this = possibleConstructorReturn(this, (FormattedHTMLMessage.__proto__ || Object.getPrototypeOf(FormattedHTMLMessage)).call(this, props, context));
    invariantIntlContext(context);
    return _this;
  }
  createClass(FormattedHTMLMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;
      if (!shallowEquals(nextValues, values)) {
        return true;
      }

      // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.
      var nextPropsToCheck = _extends({}, nextProps, {
        values: values
      });
      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }
      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
        formatHTMLMessage = _context$intl.formatHTMLMessage,
        Text = _context$intl.textComponent;
      var _props = this.props,
        id = _props.id,
        description = _props.description,
        defaultMessage = _props.defaultMessage,
        rawValues = _props.values,
        _props$tagName = _props.tagName,
        Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
        children = _props.children;
      var descriptor = {
        id: id,
        description: description,
        defaultMessage: defaultMessage
      };
      var formattedHTMLMessage = formatHTMLMessage(descriptor, rawValues);
      if (typeof children === 'function') {
        return children(formattedHTMLMessage);
      }

      // Since the message presumably has HTML in it, we need to set
      // `innerHTML` in order for it to be rendered and not escaped by React.
      // To be safe, all string prop values were escaped when formatting the
      // message. It is assumed that the message is not UGC, and came from the
      // developer making it more like a template.
      //
      // Note: There's a perf impact of using this component since there's no
      // way for React to do its virtual DOM diffing.
      var html = {
        __html: formattedHTMLMessage
      };
      return /*#__PURE__*/React.createElement(Component$$1, {
        dangerouslySetInnerHTML: html
      });
    }
  }]);
  return FormattedHTMLMessage;
}(reactExports.Component);
FormattedHTMLMessage.displayName = 'FormattedHTMLMessage';
FormattedHTMLMessage.contextTypes = {
  intl: intlShape
};
FormattedHTMLMessage.defaultProps = {
  values: {}
};
process.env.NODE_ENV !== "production" ? FormattedHTMLMessage.propTypes = _extends({}, messageDescriptorPropTypes, {
  values: PropTypes.object,
  tagName: PropTypes.string,
  children: PropTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(defaultLocaleData);

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(allLocaleData);

var img$3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAF0CAYAAAD/4EcMAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAUGVYSWZNTQAqAAAACAACARIAAwAAAAEAAQAAh2kABAAAAAEAAAAmAAAAAAADoAEAAwAAAAEAAQAAoAIABAAAAAEAAAJYoAMABAAAAAEAAAF0AAAAAD/kHC0AAAIyaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA2LjAuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4zNzI8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjE8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjYwMDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgqt7OqdAAASeklEQVR4Ae3WoQ0AIBAEwYf+ewYEJawcEuyJyYtdM3Pe9wgQIECAAAECBCKBHe2YIUCAAAECBAgQ+AICyykQIECAAAECBGIBgRWDmiNAgAABAgQICCw3QIAAAQIECBCIBQRWDGqOAAECBAgQICCw3AABAgQIECBAIBYQWDGoOQIECBAgQICAwHIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDRAgQIAAAQIEYgGBFYOaI0CAAAECBAgILDdAgAABAgQIEIgFBFYMao4AAQIECBAgILDcAAECBAgQIEAgFhBYMag5AgQIECBAgIDAcgMECBAgQIAAgVhAYMWg5ggQIECAAAECAssNECBAgAABAgRiAYEVg5ojQIAAAQIECAgsN0CAAAECBAgQiAUEVgxqjgABAgQIECAgsNwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMByAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw0QIECAAAECBGIBgRWDmiNAgAABAgQICCw3QIAAAQIECBCIBQRWDGqOAAECBAgQICCw3AABAgQIECBAIBYQWDGoOQIECBAgQICAwHIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDRAgQIAAAQIEYgGBFYOaI0CAAAECBAgILDdAgAABAgQIEIgFBFYMao4AAQIECBAgILDcAAECBAgQIEAgFhBYMag5AgQIECBAgIDAcgMECBAgQIAAgVhAYMWg5ggQIECAAAECAssNECBAgAABAgRiAYEVg5ojQIAAAQIECAgsN0CAAAECBAgQiAUEVgxqjgABAgQIECAgsNwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMByAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw0QIECAAAECBGIBgRWDmiNAgAABAgQICCw3QIAAAQIECBCIBQRWDGqOAAECBAgQICCw3AABAgQIECBAIBYQWDGoOQIECBAgQICAwHIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDRAgQIAAAQIEYgGBFYOaI0CAAAECBAgILDdAgAABAgQIEIgFBFYMao4AAQIECBAgILDcAAECBAgQIEAgFhBYMag5AgQIECBAgIDAcgMECBAgQIAAgVhAYMWg5ggQIECAAAECAssNECBAgAABAgRiAYEVg5ojQIAAAQIECAgsN0CAAAECBAgQiAUEVgxqjgABAgQIECAgsNwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMByAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw0QIECAAAECBGIBgRWDmiNAgAABAgQICCw3QIAAAQIECBCIBQRWDGqOAAECBAgQICCw3AABAgQIECBAIBYQWDGoOQIECBAgQICAwHIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDRAgQIAAAQIEYgGBFYOaI0CAAAECBAgILDdAgAABAgQIEIgFBFYMao4AAQIECBAgILDcAAECBAgQIEAgFhBYMag5AgQIECBAgIDAcgMECBAgQIAAgVhAYMWg5ggQIECAAAECAssNECBAgAABAgRiAYEVg5ojQIAAAQIECAgsN0CAAAECBAgQiAUEVgxqjgABAgQIECAgsNwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMByAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw0QIECAAAECBGIBgRWDmiNAgAABAgQICCw3QIAAAQIECBCIBQRWDGqOAAECBAgQICCw3AABAgQIECBAIBYQWDGoOQIECBAgQICAwHIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDRAgQIAAAQIEYgGBFYOaI0CAAAECBAgILDdAgAABAgQIEIgFBFYMao4AAQIECBAgILDcAAECBAgQIEAgFhBYMag5AgQIECBAgIDAcgMECBAgQIAAgVhAYMWg5ggQIECAAAECAssNECBAgAABAgRiAYEVg5ojQIAAAQIECAgsN0CAAAECBAgQiAUEVgxqjgABAgQIECAgsNwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMByAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw0QIECAAAECBGIBgRWDmiNAgAABAgQICCw3QIAAAQIECBCIBQRWDGqOAAECBAgQICCw3AABAgQIECBAIBYQWDGoOQIECBAgQICAwHIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDRAgQIAAAQIEYgGBFYOaI0CAAAECBAgILDdAgAABAgQIEIgFBFYMao4AAQIECBAgILDcAAECBAgQIEAgFhBYMag5AgQIECBAgIDAcgMECBAgQIAAgVhAYMWg5ggQIECAAAECAssNECBAgAABAgRiAYEVg5ojQIAAAQIECAgsN0CAAAECBAgQiAUEVgxqjgABAgQIECAgsNwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMByAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw0QIECAAAECBGIBgRWDmiNAgAABAgQICCw3QIAAAQIECBCIBQRWDGqOAAECBAgQICCw3AABAgQIECBAIBYQWDGoOQIECBAgQICAwHIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDRAgQIAAAQIEYgGBFYOaI0CAAAECBAgILDdAgAABAgQIEIgFBFYMao4AAQIECBAgILDcAAECBAgQIEAgFhBYMag5AgQIECBAgIDAcgMECBAgQIAAgVhAYMWg5ggQIECAAAECAssNECBAgAABAgRiAYEVg5ojQIAAAQIECAgsN0CAAAECBAgQiAUEVgxqjgABAgQIECAgsNwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMByAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw0QIECAAAECBGIBgRWDmiNAgAABAgQICCw3QIAAAQIECBCIBQRWDGqOAAECBAgQICCw3AABAgQIECBAIBYQWDGoOQIECBAgQICAwHIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDRAgQIAAAQIEYgGBFYOaI0CAAAECBAgILDdAgAABAgQIEIgFBFYMao4AAQIECBAgILDcAAECBAgQIEAgFhBYMag5AgQIECBAgIDAcgMECBAgQIAAgVhAYMWg5ggQIECAAAECAssNECBAgAABAgRiAYEVg5ojQIAAAQIECAgsN0CAAAECBAgQiAUEVgxqjgABAgQIECAgsNwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMByAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw0QIECAAAECBGIBgRWDmiNAgAABAgQICCw3QIAAAQIECBCIBQRWDGqOAAECBAgQICCw3AABAgQIECBAIBYQWDGoOQIECBAgQICAwHIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDRAgQIAAAQIEYgGBFYOaI0CAAAECBAgILDdAgAABAgQIEIgFBFYMao4AAQIECBAgILDcAAECBAgQIEAgFhBYMag5AgQIECBAgIDAcgMECBAgQIAAgVhAYMWg5ggQIECAAAECAssNECBAgAABAgRiAYEVg5ojQIAAAQIECAgsN0CAAAECBAgQiAUEVgxqjgABAgQIECAgsNwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMByAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw0QIECAAAECBGIBgRWDmiNAgAABAgQICCw3QIAAAQIECBCIBQRWDGqOAAECBAgQICCw3AABAgQIECBAIBYQWDGoOQIECBAgQICAwHIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDRAgQIAAAQIEYgGBFYOaI0CAAAECBAgILDdAgAABAgQIEIgFBFYMao4AAQIECBAgILDcAAECBAgQIEAgFhBYMag5AgQIECBAgIDAcgMECBAgQIAAgVhAYMWg5ggQIECAAAECAssNECBAgAABAgRiAYEVg5ojQIAAAQIECAgsN0CAAAECBAgQiAUEVgxqjgABAgQIECAgsNwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMByAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw0QIECAAAECBGIBgRWDmiNAgAABAgQICCw3QIAAAQIECBCIBQRWDGqOAAECBAgQICCw3AABAgQIECBAIBYQWDGoOQIECBAgQICAwHIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDRAgQIAAAQIEYgGBFYOaI0CAAAECBAgILDdAgAABAgQIEIgFBFYMao4AAQIECBAgILDcAAECBAgQIEAgFhBYMag5AgQIECBAgIDAcgMECBAgQIAAgVhAYMWg5ggQIECAAAECAssNECBAgAABAgRiAYEVg5ojQIAAAQIECAgsN0CAAAECBAgQiAUEVgxqjgABAgQIECAgsNwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMByAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw0QIECAAAECBGIBgRWDmiNAgAABAgQICCw3QIAAAQIECBCIBQRWDGqOAAECBAgQICCw3AABAgQIECBAIBYQWDGoOQIECBAgQICAwHIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDRAgQIAAAQIEYgGBFYOaI0CAAAECBAgILDdAgAABAgQIEIgFBFYMao4AAQIECBAgILDcAAECBAgQIEAgFhBYMag5AgQIECBAgIDAcgMECBAgQIAAgVhAYMWg5ggQIECAAAECAssNECBAgAABAgRiAYEVg5ojQIAAAQIECAgsN0CAAAECBAgQiAUEVgxqjgABAgQIECAgsNwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMByAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw0QIECAAAECBGIBgRWDmiNAgAABAgQICCw3QIAAAQIECBCIBQRWDGqOAAECBAgQICCw3AABAgQIECBAIBYQWDGoOQIECBAgQICAwHIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDRAgQIAAAQIEYgGBFYOaI0CAAAECBAgILDdAgAABAgQIEIgFBFYMao4AAQIECBAgILDcAAECBAgQIEAgFhBYMag5AgQIECBAgIDAcgMECBAgQIAAgVhAYMWg5ggQIECAAAECAssNECBAgAABAgRiAYEVg5ojQIAAAQIECAgsN0CAAAECBAgQiAUEVgxqjgABAgQIECAgsNwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMByAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw0QIECAAAECBGIBgRWDmiNAgAABAgQICCw3QIAAAQIECBCIBQRWDGqOAAECBAgQICCw3AABAgQIECBAIBYQWDGoOQIECBAgQICAwHIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDRAgQIAAAQIEYgGBFYOaI0CAAAECBAgILDdAgAABAgQIEIgFBFYMao4AAQIECBAgILDcAAECBAgQIEAgFhBYMag5AgQIECBAgIDAcgMECBAgQIAAgVhAYMWg5ggQIECAAAECAssNECBAgAABAgRiAYEVg5ojQIAAAQIECAgsN0CAAAECBAgQiAUEVgxqjgABAgQIECAgsNwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMByAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw0QIECAAAECBGIBgRWDmiNAgAABAgQICCw3QIAAAQIECBCIBQRWDGqOAAECBAgQICCw3AABAgQIECBAIBYQWDGoOQIECBAgQICAwHIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDRAgQIAAAQIEYgGBFYOaI0CAAAECBAgILDdAgAABAgQIEIgFBFYMao4AAQIECBAgILDcAAECBAgQIEAgFhBYMag5AgQIECBAgIDAcgMECBAgQIAAgVhAYMWg5ggQIECAAAECAssNECBAgAABAgRiAYEVg5ojQIAAAQIECAgsN0CAAAECBAgQiAUEVgxqjgABAgQIECAgsNwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMByAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw0QIECAAAECBGIBgRWDmiNAgAABAgQICCw3QIAAAQIECBCIBQRWDGqOAAECBAgQICCw3AABAgQIECBAIBYQWDGoOQIECBAgQICAwHIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDRAgQIAAAQIEYgGBFYOaI0CAAAECBAhcyCQD57kvPtwAAAAASUVORK5CYII=";

var img$2 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='40px' height='40px' viewBox='0 0 40 40' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3econtrolplus-small%3c/title%3e %3cg id='controlplus-small' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cpath d='M1.5%2c19.5 L1.5%2c16 C1.5%2c15.1715729 2.17157288%2c14.5 3%2c14.5 L3.5%2c14.5 C3.5%2c13.3856181 3.5%2c12.5522847 3.5%2c12 C3.5%2c11.1715729 4.17157288%2c10.5 5%2c10.5 L37%2c10.5 C37.8284271%2c10.5 38.5%2c11.1715729 38.5%2c12 L38.5%2c19.5 L1.5%2c19.5 Z' id='Path-Copy-17' fill='%23E6E7E8'%3e%3c/path%3e %3cpath d='M38.5%2c21.5 L38.5%2c28 C38.5%2c28.8284271 37.8284271%2c29.5 37%2c29.5 L3%2c29.5 C2.17157288%2c29.5 1.5%2c28.8284271 1.5%2c28 L1.5%2c21.5 L0.5%2c21.5 L0.5%2c18.5 L4.5%2c18.5 L5.5%2c19.5 L13.5%2c19.5 L14.5%2c18.5 L24.5%2c18.5 L24.5%2c19.5 L31%2c19.5 L32%2c18.5 L39.5%2c18.5 L39.5%2c21.5 L38.5%2c21.5 Z' id='Path-10-Copy' fill='%236B6E67'%3e%3c/path%3e %3cpath d='M8.5%2c14.5 L8.5%2c12 C8.5%2c11.1715729 9.17157288%2c10.5 10%2c10.5 C11%2c10.5 13%2c10.5 12%2c10.5 C11.1715729%2c10.5 10.5%2c11.1715729 10.5%2c12 L10.5%2c14.5 L8.5%2c14.5 Z' id='Path-Copy-18' stroke='%233D79CC' fill='%234C97FF'%3e%3c/path%3e %3cpolyline id='Path-10' stroke='%237C87A5' points='2 21.5 0.5 21.5 0.5 18.5 4.5 18.5 5.5 19.5 13.5 19.5 14.5 18.5 24.5 18.5 24.5 21.5 18 21.5'%3e%3c/polyline%3e %3cpolyline id='Path-11' stroke='%237C87A5' points='24.5 19.5 31 19.5 32 18.5 38.5 18.5'%3e%3c/polyline%3e %3crect id='Rectangle' stroke='%237C87A5' x='32.5' y='18.5' width='7' height='3'%3e%3c/rect%3e %3cpath d='M1.5%2c14.5 L2%2c14.5 C2.82842712%2c14.5 3.5%2c15.1715729 3.5%2c16 L3.5%2c18.5' id='Path-Copy-7' stroke='%237C87A5' transform='translate(2.500000%2c 16.500000) scale(-1%2c 1) translate(-2.500000%2c -16.500000) '%3e%3c/path%3e %3cpath d='M15.5%2c10.5 C16.3284271%2c10.5 17%2c11.1715729 17%2c12 L17%2c16' id='Path-Copy-8' stroke='%237C87A5' transform='translate(16.250000%2c 13.250000) scale(-1%2c 1) translate(-16.250000%2c -13.250000) '%3e%3c/path%3e %3cpath d='M27.5%2c10.5 C28.3284271%2c10.5 29%2c11.1715729 29%2c12 L29%2c15' id='Path-Copy-10' stroke='%237C87A5' transform='translate(28.250000%2c 12.750000) scale(-1%2c 1) translate(-28.250000%2c -12.750000) '%3e%3c/path%3e %3cpath d='M18.5%2c21 C19.3284271%2c21 20%2c21.6715729 20%2c22.5 L20%2c29.5' id='Path-Copy-15' stroke='%237C87A5' transform='translate(19.250000%2c 25.250000) scale(-1%2c -1) translate(-19.250000%2c -25.250000) '%3e%3c/path%3e %3cpath d='M30.5%2c10.5 C31.3284271%2c10.5 32%2c11.1715729 32%2c12 L32%2c15' id='Path-Copy-11' stroke='%237C87A5' transform='translate(31.250000%2c 12.750000) scale(-1%2c 1) translate(-31.250000%2c -12.750000) '%3e%3c/path%3e %3cpath d='M3.5%2c16 L3.5%2c12 C3.5%2c11.1715729 4.17157288%2c10.5 5%2c10.5 L37%2c10.5 C37.8284271%2c10.5 38.5%2c11.1715729 38.5%2c12 L38.5%2c18.5' id='Path-Copy-9' stroke='%237C87A5'%3e%3c/path%3e %3cpath d='M18.5%2c14.5 L29.5%2c14.5 C30.3284271%2c14.5 31%2c15.1715729 31%2c16 L31%2c18.5' id='Path-Copy-12' stroke='%237C87A5' transform='translate(24.750000%2c 16.500000) scale(-1%2c 1) translate(-24.750000%2c -16.500000) '%3e%3c/path%3e %3cpath d='M15.5%2c14.5 L26.5%2c14.5 C27.3284271%2c14.5 28%2c15.1715729 28%2c16' id='Path-Copy-13' stroke='%237C87A5' transform='translate(21.750000%2c 15.250000) scale(-1%2c 1) translate(-21.750000%2c -15.250000) '%3e%3c/path%3e %3cpath d='M1.5%2c29.5 L1.5%2c23 C1.5%2c22.1715729 2.17157288%2c21.5 3%2c21.5 L37%2c21.5 C37.8284271%2c21.5 38.5%2c22.1715729 38.5%2c23 L38.5%2c29.5' id='Path-Copy-14' stroke='%237C87A5' transform='translate(20.000000%2c 25.500000) scale(1%2c -1) translate(-20.000000%2c -25.500000) '%3e%3c/path%3e %3crect id='Rectangle-Copy-8' stroke='%237C87A5' fill='%23B6B6B6' transform='translate(19.000000%2c 13.500000) scale(1%2c -1) translate(-19.000000%2c -13.500000) ' x='17.5' y='12.5' width='3' height='2'%3e%3c/rect%3e %3crect id='Rectangle-Copy-9' stroke='%237C87A5' fill='%23B6B6B6' transform='translate(24.000000%2c 13.500000) scale(1%2c -1) translate(-24.000000%2c -13.500000) ' x='22.5' y='12.5' width='3' height='2'%3e%3c/rect%3e %3c/g%3e%3c/svg%3e";

var img$1 = "data:image/svg+xml,%3csvg width='204' height='72' viewBox='0 0 204 72' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cpath stroke='%237C87A5' fill='white' fill-rule='nonzero' stroke-linecap='round' stroke-linejoin='round' d='M100 24h100v40H100z'/%3e%3cpath d='M76 8h-8V5c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M73.3 4v4H76V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M76 8h-8V5c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M64 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M61.3 4v4H64V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M64 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M52 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M49.3 4v4H52V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M52 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M40 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M37.3 4v4H40V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M40 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M28 8h-8V5c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M25.3 4v4H28V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M28 8h-8V5c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M16 8H8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M13.3 4v4H16V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M16 8H8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M172 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M169.3 4v4h2.7V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M172 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M160 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M157.3 4v4h2.7V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M160 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M148 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M145.3 4v4h2.7V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M148 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M136 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M133.3 4v4h2.7V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M136 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M124 8h-8V5c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M121.3 4v4h2.7V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M124 8h-8V5c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M112 8h-8V5c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M109.3 4v4h2.7V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M112 8h-8V5c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M198 8H6a2 2 0 0 0-2 2v14h196V10a2 2 0 0 0-2-2z' stroke='%237C87A5' fill='white' fill-rule='nonzero' stroke-linecap='round' stroke-linejoin='round'/%3e%3cg stroke-linecap='round' stroke-linejoin='round'%3e%3cpath stroke='%237C87A5' fill='%23E6E7E8' fill-rule='nonzero' d='M100 20h-2v-2H82v2h-2V10h20z'/%3e%3cpath stroke='%237C87A5' fill='%237C87A5' fill-rule='nonzero' d='M82 12.1h16V18H82z'/%3e%3cpath d='M84 17v-1M86 17v-1M90 17v-1M94 17v-1M88 17v-1M92 17v-1M96 17v-1' stroke='%23E6E7E8'/%3e%3c/g%3e%3cg%3e%3cpath d='M196 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M193.3 4v4h2.7V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M196 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cpath d='M200 24H4v-4h190a2 2 0 0 0 2-2V8h2a2 2 0 0 1 2 2v14z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cg%3e%3cpath d='M184 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M181.3 4v4h2.7V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M184 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cg%3e%3cpath d='M76 24h-8v-3c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M73.3 20v4H76v-3.3c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M76 24h-8v-3c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cg%3e%3cpath d='M64 24h-8v-3c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M61.3 20v4H64v-3.3c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M64 24h-8v-3c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cg%3e%3cpath d='M124 44h-8v-3c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M121.3 40v4h2.7v-3.3c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M124 44h-8v-3c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cg%3e%3cpath d='M112 44h-8v-3c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M109.3 40v4h2.7v-3.3c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M112 44h-8v-3c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cg%3e%3cpath d='M52 24h-8v-3c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M49.3 20v4H52v-3.3c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M52 24h-8v-3c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cg%3e%3cpath d='M40 24h-8v-3c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M37.3 20v4H40v-3.3c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M40 24h-8v-3c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cg%3e%3cpath d='M28 24h-8v-3c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M25.3 20v4H28v-3.3c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M28 24h-8v-3c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cg%3e%3cpath d='M16 24H8v-3c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M13.3 20v4H16v-3.3c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M16 24H8v-3c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cpath d='M100 68H6a2 2 0 0 1-2-2v-2h84v-4h12v8z' stroke='%237C87A5' fill='%23E6E7E8' fill-rule='nonzero' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath stroke='%237C87A5' fill='%23E6E7E8' fill-rule='nonzero' stroke-linecap='round' stroke-linejoin='round' d='M4 36v28h84V44H64l-12-8zM100 68h98a2 2 0 0 0 2-2v-2H100v4z'/%3e%3cpath d='M200 24v42a2 2 0 0 1-2 2h-98V24h4v14c0 1.1.9 2 2 2h24a2 2 0 0 1 2 2v16c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V42c0-1.1.9-2 2-2h48a2 2 0 0 0 2-2V24h4z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M100 24H4v12h48l12 8h24v16h38a2 2 0 0 0 2-2V46a2 2 0 0 0-2-2h-26V24z' stroke='%237C87A5' fill='white' fill-rule='nonzero' stroke-linecap='round' stroke-linejoin='round'/%3e%3cg transform='translate(12 44)'%3e%3ccircle fill='%23CC4C23' fill-rule='nonzero' cx='6' cy='6' r='6'/%3e%3ccircle stroke='%23231F20' stroke-width='2' opacity='.1' stroke-linecap='round' stroke-linejoin='round' cx='6' cy='6' r='6'/%3e%3cpath d='M8 6H4M6 8V4' stroke='%23414042' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cg transform='translate(109 46)'%3e%3ccircle stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round' cx='4.9' cy='5.4' r='4.6'/%3e%3ccircle fill='%237C87A5' fill-rule='nonzero' cx='4.9' cy='5.4' r='3.3'/%3e%3ccircle stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round' cx='4.9' cy='5.4' r='4.6'/%3e%3c/g%3e%3cg%3e%3cpath d='M149 44h50c.5 0 1 .5 1 1v14c0 .6-.5 1-1 1h-50a1 1 0 0 1-1-1V45c0-.5.5-1 1-1z' stroke='%237C87A5' fill='white' fill-rule='nonzero' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M200 44v15c0 .6-.5 1-1 1h-50a1 1 0 0 1-1-1v-3h45a3 3 0 0 0 3-3v-9h4z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M196 44h-8v-3c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M193.3 40v4h2.7v-3.3c0-.4-.4-.7-1-.7h-1.8z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M196 44h-8v-3c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M160 44h-8v-3c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M157.3 40v4h2.7v-3.3c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M160 44h-8v-3c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M184 44h-8v-3c0-.6.4-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M181.3 40v4h2.7v-3.3c0-.4-.4-.7-1-.7h-1.8z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M184 44h-8v-3c0-.6.4-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M172 44h-8v-3c0-.6.4-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M169.3 40v4h2.7v-3.3c0-.4-.4-.7-1-.7h-1.8z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M172 44h-8v-3c0-.6.4-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cg transform='translate(157 46)'%3e%3ccircle stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round' cx='4.8' cy='5.4' r='4.6'/%3e%3ccircle fill='%237C87A5' fill-rule='nonzero' cx='4.8' cy='5.4' r='3.3'/%3e%3ccircle stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round' cx='4.8' cy='5.4' r='4.6'/%3e%3c/g%3e%3cg transform='translate(169 46)'%3e%3ccircle stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round' cx='5' cy='5.4' r='4.6'/%3e%3ccircle fill='%237C87A5' fill-rule='nonzero' cx='5' cy='5.4' r='3.3'/%3e%3ccircle stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round' cx='5' cy='5.4' r='4.6'/%3e%3c/g%3e%3cg transform='translate(181 46)'%3e%3ccircle stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round' cx='5.2' cy='5.4' r='4.6'/%3e%3ccircle fill='%237C87A5' fill-rule='nonzero' cx='5.2' cy='5.4' r='3.3'/%3e%3ccircle stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round' cx='5.2' cy='5.4' r='4.6'/%3e%3c/g%3e%3c/g%3e%3cpath d='M100 68H6a2 2 0 0 1-2-2v-2h84v-4h12v8zM128 46v12a2 2 0 0 1-2 2H88v-4h34a2 2 0 0 0 2-2V44h2a2 2 0 0 1 2 2zM87 43H64l-12-8H4v2h48l12 8h24v-1c0-.5-.5-1-1-1z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3c/svg%3e";

var img = "data:image/svg+xml,%3csvg width='204' height='92' viewBox='0 0 204 92' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cstyle%3e%40-webkit-keyframes wiggle%7b0%25%7btransform:translate(0%2c-10px)%7dto%7btransform:translate(0%2c0)%7d%7d%40keyframes wiggle%7b0%25%7btransform:translate(0%2c-10px)%7dto%7btransform:translate(0%2c0)%7d%7d%3c/style%3e%3cdefs%3e%3cpath d='M66.5 45c-.7 0-1.3-.2-1.7-.7l-9.1-8.8c-.7-.7-.9-1.7-.5-2.6.4-.8 1.2-1.4 2.2-1.4H61l1.7-12.2a4 4 0 0 1 4.5-3.3 4 4 0 0 1 3.3 3.3l1.8 12.2h3.3c1 0 2 .6 2.3 1.5.4.9.2 1.8-.5 2.5l-9.1 8.8c-.5.5-1 .7-1.7.7z' id='path-1'/%3e%3cfilter x='-15.2%25' y='-12.1%25' width='130.4%25' height='124.1%25' filterUnits='objectBoundingBox' id='filter-2'%3e%3cfeMorphology radius='1.5' operator='dilate' in='SourceAlpha' result='shadowSpreadOuter1'/%3e%3cfeOffset in='shadowSpreadOuter1' result='shadowOffsetOuter1'/%3e%3cfeComposite in='shadowOffsetOuter1' in2='SourceAlpha' operator='out' result='shadowOffsetOuter1'/%3e%3cfeColorMatrix values='0 0 0 0 0.298039216 0 0 0 0 0.592156863 0 0 0 0 1 0 0 0 0.25 0' in='shadowOffsetOuter1'/%3e%3c/filter%3e%3c/defs%3e%3cg id='boost-button-illustration' fill='none' fill-rule='evenodd'%3e%3cg id='boost-top' transform='translate(4 4)' fill-rule='nonzero'%3e%3cpath d='M94 84H2a2 2 0 0 1-2-2V68h96v14a2 2 0 0 1-2 2z' id='Path' stroke='%237C87A5' fill='white' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath id='Rectangle' stroke='%237C87A5' fill='white' stroke-linecap='round' stroke-linejoin='round' transform='rotate(-90 98 42)' d='M72-56h52v196H72z'/%3e%3cg id='Group' transform='translate(54 34)'%3e%3cg opacity='.1' fill='%23231F20'%3e%3cpath d='M4 15a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H4z' id='Path'/%3e%3cpath d='M12 2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h8zm0-2H4a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4z' id='Shape'/%3e%3c/g%3e%3cpath d='M2 4v8c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z' id='Path' stroke='%23389438' fill='%2346B946' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cpath id='Rectangle' stroke='%23231F20' fill='%23231F20' opacity='.1' stroke-linecap='round' stroke-linejoin='round' transform='rotate(-90 86 42)' d='M84 32h4v20h-4z'/%3e%3cg id='Group' transform='translate(76 16)' opacity='.5' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M4 10H2a2 2 0 0 1-2-2V0h20v8a2 2 0 0 1-2 2h-2' id='Path' fill='white'/%3e%3cpath id='Path' fill='%237C87A5' d='M14 12l-2-4-2 4zM6 8l2 4 2-4z'/%3e%3c/g%3e%3cg id='Group' transform='translate(76 56)' opacity='.5' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M4 2H2a2 2 0 0 0-2 2v8h20V4a2 2 0 0 0-2-2h-2' id='Path' fill='white'/%3e%3cpath id='Path' fill='%237C87A5' d='M14 0l-2 4-2-4zM6 4l2-4 2 4z'/%3e%3c/g%3e%3cg id='Group' opacity='.5'%3e%3cg transform='translate(4 20)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(16 20)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(28 20)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(40 20)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(52 20)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(64 20)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3c/g%3e%3cg id='Group' opacity='.5'%3e%3cg transform='translate(124 20)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(136 20)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(100 20)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(112 20)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(148 20)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(160 20)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(172 20)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(184 20)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3c/g%3e%3cg id='Group' opacity='.5'%3e%3cg transform='translate(124 32)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(136 32)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(100 32)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(112 32)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(148 32)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(160 32)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(172 32)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(184 32)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3c/g%3e%3cg id='Group' opacity='.5'%3e%3cg transform='translate(124 44)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(136 44)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(100 44)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(112 44)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(148 44)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(160 44)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(172 44)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(184 44)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3c/g%3e%3cg id='Group' opacity='.5'%3e%3cg transform='translate(124 56)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(136 56)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(100 56)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(112 56)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(148 56)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(160 56)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(172 56)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(184 56)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3c/g%3e%3cg id='Group' opacity='.5'%3e%3cg transform='translate(4 56)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(16 56)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(28 56)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(40 56)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(52 56)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(64 56)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3c/g%3e%3cg id='Group' opacity='.5'%3e%3cg transform='translate(4 72)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(16 72)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(28 72)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(40 72)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(52 72)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(64 72)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3c/g%3e%3cpath d='M96 16H0V2C0 .9.9 0 2 0h92a2 2 0 0 1 2 2v14zM124 16H96V2c0-1.1.9-2 2-2h24a2 2 0 0 1 2 2v14z' id='Path' stroke='%237C87A5' fill='white' stroke-linecap='round' stroke-linejoin='round'/%3e%3cg id='Group' opacity='.5'%3e%3cg transform='translate(4 4)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(16 4)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(28 4)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(40 4)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(52 4)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(64 4)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3c/g%3e%3cg id='Group' opacity='.5'%3e%3cg transform='translate(4 44)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(16 44)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(28 44)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(40 44)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3c/g%3e%3cg id='Group' opacity='.5'%3e%3cg transform='translate(4 32)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(16 32)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(28 32)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(40 32)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3c/g%3e%3cpath d='M122 84H98a2 2 0 0 1-2-2V68h28v14a2 2 0 0 1-2 2zM194 84h-48a2 2 0 0 1-2-2V68h52v14a2 2 0 0 1-2 2z' id='Path' stroke='%237C87A5' fill='white' stroke-linecap='round' stroke-linejoin='round'/%3e%3cg id='Group' opacity='.5'%3e%3cg transform='translate(100 72)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(102 74)'%3e%3ccircle id='Oval' fill='white' cx='2' cy='2' r='1.5'/%3e%3cpath d='M2 1c.5 0 1 .4 1 1 0 .5-.5 1-1 1a1 1 0 0 1-1-1c0-.6.4-1 1-1zm0-1a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg%3e%3cg transform='translate(112 72)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(114 74)'%3e%3ccircle id='Oval' fill='white' cx='2' cy='2' r='1.5'/%3e%3cpath d='M2 1c.5 0 1 .4 1 1 0 .5-.5 1-1 1a1 1 0 0 1-1-1c0-.6.4-1 1-1zm0-1a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3cg id='Group' opacity='.5'%3e%3cg transform='translate(100 4)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(102 6)'%3e%3ccircle id='Oval' fill='white' cx='2' cy='2' r='1.5'/%3e%3cpath d='M2 1c.5 0 1 .4 1 1 0 .5-.5 1-1 1a1 1 0 0 1-1-1c0-.6.4-1 1-1zm0-1a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg%3e%3cg transform='translate(112 4)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(114 6)'%3e%3ccircle id='Oval' fill='white' cx='2' cy='2' r='1.5'/%3e%3cpath d='M2 1c.5 0 1 .4 1 1 0 .5-.5 1-1 1a1 1 0 0 1-1-1c0-.6.4-1 1-1zm0-1a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3cpath d='M196 16h-52V2c0-1.1.9-2 2-2h48a2 2 0 0 1 2 2v14z' id='Path' stroke='%237C87A5' fill='white' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M124 72h-20a4 4 0 0 0-4 4v8h-2a2 2 0 0 1-2-2V72H0v-4h124v4zM124 12h-20a4 4 0 0 1-4-4V0h-2a2 2 0 0 0-2 2v10H0v4h124v-4z' id='Path' stroke='%23231F20' fill='%23231F20' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cg id='Group' opacity='.5'%3e%3cg transform='translate(148 4)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(150 6)'%3e%3ccircle id='Oval' fill='white' cx='2' cy='2' r='1.5'/%3e%3cpath d='M2 1c.5 0 1 .4 1 1 0 .5-.5 1-1 1a1 1 0 0 1-1-1c0-.6.4-1 1-1zm0-1a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg%3e%3cg transform='translate(160 4)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(162 6)'%3e%3ccircle id='Oval' fill='white' cx='2' cy='2' r='1.5'/%3e%3cpath d='M2 1c.5 0 1 .4 1 1 0 .5-.5 1-1 1a1 1 0 0 1-1-1c0-.6.4-1 1-1zm0-1a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3c/g%3e%3cg%3e%3cg transform='translate(172 4)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(174 6)'%3e%3ccircle id='Oval' fill='white' cx='2' cy='2' r='1.5'/%3e%3cpath d='M2 1c.5 0 1 .4 1 1 0 .5-.5 1-1 1a1 1 0 0 1-1-1c0-.6.4-1 1-1zm0-1a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg%3e%3cg transform='translate(184 4)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(186 6)'%3e%3ccircle id='Oval' fill='white' cx='2' cy='2' r='1.5'/%3e%3cpath d='M2 1c.5 0 1 .4 1 1 0 .5-.5 1-1 1a1 1 0 0 1-1-1c0-.6.4-1 1-1zm0-1a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3cg id='Group' opacity='.5'%3e%3cg transform='translate(148 72)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(150 74)'%3e%3ccircle id='Oval' fill='white' cx='2' cy='2' r='1.5'/%3e%3cpath d='M2 1c.5 0 1 .4 1 1 0 .5-.5 1-1 1a1 1 0 0 1-1-1c0-.6.4-1 1-1zm0-1a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg%3e%3cg transform='translate(160 72)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(162 74)'%3e%3ccircle id='Oval' fill='white' cx='2' cy='2' r='1.5'/%3e%3cpath d='M2 1c.5 0 1 .4 1 1 0 .5-.5 1-1 1a1 1 0 0 1-1-1c0-.6.4-1 1-1zm0-1a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3c/g%3e%3cg%3e%3cg transform='translate(172 72)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(174 74)'%3e%3ccircle id='Oval' fill='white' cx='2' cy='2' r='1.5'/%3e%3cpath d='M2 1c.5 0 1 .4 1 1 0 .5-.5 1-1 1a1 1 0 0 1-1-1c0-.6.4-1 1-1zm0-1a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg%3e%3cg transform='translate(184 72)'%3e%3ccircle id='Oval' fill='white' cx='4' cy='4' r='3.5'/%3e%3cpath d='M4 1a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm0-1a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3cg transform='translate(186 74)'%3e%3ccircle id='Oval' fill='white' cx='2' cy='2' r='1.5'/%3e%3cpath d='M2 1c.5 0 1 .4 1 1 0 .5-.5 1-1 1a1 1 0 0 1-1-1c0-.6.4-1 1-1zm0-1a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2z' id='Shape' fill='%237C87A5'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3cpath id='Rectangle' stroke='%23231F20' fill='%23231F20' opacity='.1' stroke-linecap='round' stroke-linejoin='round' d='M144 12h52v4h-52zM144 68h52v4h-52z'/%3e%3c/g%3e%3cg style='-webkit-animation:wiggle .5s infinite ease-in-out alternate%3banimation:wiggle .5s infinite ease-in-out alternate'%3e%3cuse fill='black' filter='url(%23filter-2)' xlink:href='%23path-1'/%3e%3cuse stroke='%234280D7' fill='%234C97FF' xlink:href='%23path-1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";

var entry = {
  name: 'LEGO Technic CONTROL+',
  extensionId: 'controlplus',
  collaborator: 'bricklife',
  iconURL: img$3,
  insetIconURL: img$2,
  description: /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: "Build with motors and sensors.",
    id: "gui.extension.controlplus.description"
  }),
  featured: true,
  disabled: false,
  bluetoothRequired: true,
  internetConnectionRequired: true,
  launchPeripheralConnectionFlow: true,
  useAutoScan: true,
  connectionIconURL: img$1,
  connectionSmallIconURL: img$2,
  connectionTipIconURL: img,
  connectingMessage: /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: "Connecting",
    id: "gui.extension.boost.connectingMessage"
  }),
  helpLink: 'https://scratch.mit.edu/boost'
};

function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}

function toPrimitive(t, r) {
  if ("object" != _typeof$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (String )(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof$1(i) ? i : i + "";
}

function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
}

function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}

function _possibleConstructorReturn(t, e) {
  if (e && ("object" == _typeof$1(e) || "function" == typeof e)) return e;
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
      writable: true,
      configurable: true
    }
  }), Object.defineProperty(t, "prototype", {
    writable: false
  }), e && _setPrototypeOf(t, e);
}

function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var BleBaseBlocks = require('./lib/ble-base-blocks');
var Hub = require('./lib/hub');

// 1. All translations are defined here in a single object.
// The keys (e.g., "controlplus.turnMotor") are unique IDs.
var translations = {
  // English
  en: {
    'controlplus.name': 'CONTROL+',
    'controlplus.turnMotor': 'turn motor [PORT] for [TIME] seconds',
    'controlplus.isReady': 'hub is ready?',
    'controlplus.port.A': 'A',
    'controlplus.port.B': 'B'
  },
  // German
  de: {
    'controlplus.name': 'CONTROL+',
    'controlplus.turnMotor': 'drehe Motor [PORT] für [TIME] Sekunden',
    'controlplus.isReady': 'Hub ist bereit?',
    'controlplus.port.A': 'A',
    'controlplus.port.B': 'B'
  }
  // Add other languages here...
};
var blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAAx4ExPAAAD6UlEQVR4Ae2aPWgUURDHZy93XhIjSTaFBILaWFhFK9FCghZaCnbaWFlYWEYEixSCaGlhLYIEEcEyIEIUPxpFIqKghRASosjlEvN5l7tdd3bzlr3lZvdld72Lyf8V997Omzcz77eze8PdI0IDARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAgZ1PwIja4tidp0M1q3KXyB5x9AajdHfB3ByRMZnPFUfHrl+YUfsVATK8ul2Zsm3bVMroHYSGMd9hFIcVxLwEZTPzzANDAzRy4gj17C02Vb03UaI339Yo39VLXeZBWi/P0MbqPB091ElXTvfTQE9H03XPX36m7z9+UZz9pos1hJJ9SR5ncnmlQpPvvtL0TMms2fxU0kVek5MXuo9tJDxe+2W24ppgeLmOAtUrS+51FDxWmP1ZdvWibo6rkPBDsi/J49xwAnGsXvPY8FjMQGfOfedJmecZIiqvWO6Q4XGz6htuL2WeO+l8rK5V3aGyf//BCzXVtL96+Ywr19UL21dGJbmaj+pVrI6O/30QkYFRpjCnCERloNJpaX9yuL/B39sp71FvEDoXunrhdVlfIwNTEm3IwFDdtyXTi9MftqSvlPlbUb3YWSZlXPjdp6sXXqf8ZtX7AFXd5xTNLa37uJT5n5sPMFz3PXzyWmtfj68NaelJSuE6MGmdJtn/1/LAO1Cv7ss6oHAdqB7nsDxrv1nZ8zPQMdhQ96m6KytHYTuS/TR1WthHK64DGdgKdzvPBwCmvKcAmBKgcfP2IzvOhtnXQ+fPHaPOzj1xqpHz6+tVejbxkeYXliP1kkxK71TJVlaxaGUgb5g3zk6TtqwCTuo/uC7LWPwMLM+9Cvrwx7lcgfYNDFMu3+3L0gys2iotlabIsrxfbdLY4rX9g6cSm+BY1L6k/UvGld/YDOSN/il9InaWtmUNL008KpY0NnhtsA4UbdlWlRZ/vxfnt8PEVjMoq5hjMzArRzvVjp+B6plu151UgFUc6rpVfVK/yMCUd8j/W1PVg9slA9sdh8RVZeqtG5dcdshAiZSmHAA1QUlqACiR0ZQDoCYoSQ0AJTKacgDUBCWpAaBERlMOgJqgJDUAlMhoygFQE5SkBoASGU15EKBzBtg5cZlrfhJV015qNavu/W3Q7jiabSQQk8uKdQIAjUkWdPcdbivEWnWBw2h7HG4QgQ+Gx2y85rHisf97IJ8+dw6Vny0UTbN3//FNxfZ1Thy0HeIIE9g8ZD6q5H4G8qlzPn3unEMfdyb9FFWK6JmJMR48oQ8mIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACILBbCPwFpqc7sJw6T5QAAAAASUVORK5CYII=';
var extensionURL = 'https://bricklife.com/scratch-gui/xcratch/controlplus.mjs';

// 2. We no longer need the 'format-message' library here.
// The GUI will provide a working function.
var Scratch3ControlPlusBlocks = /*#__PURE__*/function (_BleBaseBlocks) {
  function Scratch3ControlPlusBlocks(runtime) {
    _classCallCheck(this, Scratch3ControlPlusBlocks);
    // 3. The constructor is now much simpler.
    // We don't need to manage `formatMessage` ourselves.
    return _callSuper(this, Scratch3ControlPlusBlocks, [new Hub(runtime, Scratch3ControlPlusBlocks.EXTENSION_ID, 0x80)]);
  }
  _inherits(Scratch3ControlPlusBlocks, _BleBaseBlocks);
  return _createClass(Scratch3ControlPlusBlocks, [{
    key: "getInfo",
    value: function getInfo() {
      // We no longer call `this.setupTranslations()` here.
      return {
        id: Scratch3ControlPlusBlocks.EXTENSION_ID,
        // The `name` property should use the translation ID from our object above.
        name: translations.en['controlplus.name'],
        extensionURL: extensionURL,
        blockIconURI: blockIconURI,
        showStatusButton: true,
        // Define blocks and menus directly.
        // This is cleaner and easier to read.
        blocks: [{
          opcode: 'turnMotor',
          blockType: 'command',
          // 4. The 'text' property uses the default English message directly.
          // The Scratch GUI uses this exact string to look up the translation.
          text: 'turn motor [PORT] for [TIME] seconds',
          arguments: {
            PORT: {
              type: 'string',
              menu: 'PORT',
              // We define this menu below
              defaultValue: 'A'
            },
            TIME: {
              type: 'number',
              defaultValue: 1
            }
          }
        }, {
          opcode: 'isReady',
          blockType: 'Boolean',
          text: 'hub is ready?'
        }],
        menus: {
          PORT: {
            acceptReporters: true,
            items: [{
              text: translations.en['controlplus.port.A'],
              // Use translation ID
              value: 'A'
            }, {
              text: translations.en['controlplus.port.B'],
              // Use translation ID
              value: 'B'
            }]
          }
        },
        // 5. The magic happens here. We provide the entire translation object to the GUI.
        // The GUI will automatically handle switching languages.
        translationMap: translations
      };
    }

    // Dummy functions for the example to work
  }, {
    key: "turnMotor",
    value: function turnMotor(args) {
      console.log("Turning motor ".concat(args.PORT, " for ").concat(args.TIME, " seconds."));
    }
  }, {
    key: "isReady",
    value: function isReady() {
      // In a real extension, this would return the hub's connection state.
      return true;
    }
  }], [{
    key: "EXTENSION_ID",
    get: function get() {
      return 'controlplus';
    }
  }]);
}(BleBaseBlocks); // Generated ES Module export
var blockClass = Scratch3ControlPlusBlocks;
blockClass = Scratch3ControlPlusBlocks;

export { blockClass, entry };
