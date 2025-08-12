var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === 'function') {
  cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === 'function') {
  cachedClearTimeout = clearTimeout;
}
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
function nextTick(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}
// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser$1 = true;
var env = {};
var argv = [];
var version = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};
function noop() {}
var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;
function binding(name) {
  throw new Error('process.binding is not supported');
}
function cwd() {
  return '/';
}
function chdir(dir) {
  throw new Error('process.chdir is not supported');
}
function umask() {
  return 0;
}

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
  return new Date().getTime();
};

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds, nanoseconds];
}
var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}
var process = {
  nextTick: nextTick,
  title: title,
  browser: browser$1,
  env: env,
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var react = {exports: {}};

function _typeof$2(o) {
  "@babel/helpers - typeof";

  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof$2(o);
}

var react_production_min = {};

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
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
var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
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

var l$1 = objectAssign,
  n$1 = "function" === typeof Symbol && Symbol.for,
  p$1 = n$1 ? Symbol.for("react.element") : 60103,
  q$1 = n$1 ? Symbol.for("react.portal") : 60106,
  r$1 = n$1 ? Symbol.for("react.fragment") : 60107,
  t$1 = n$1 ? Symbol.for("react.strict_mode") : 60108,
  u = n$1 ? Symbol.for("react.profiler") : 60114,
  v$1 = n$1 ? Symbol.for("react.provider") : 60109,
  w$1 = n$1 ? Symbol.for("react.context") : 60110,
  x$1 = n$1 ? Symbol.for("react.forward_ref") : 60112,
  y$1 = n$1 ? Symbol.for("react.suspense") : 60113,
  z$1 = n$1 ? Symbol.for("react.memo") : 60115,
  A$1 = n$1 ? Symbol.for("react.lazy") : 60116,
  B = "function" === typeof Symbol && Symbol.iterator;
function C(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var D = {
    isMounted: function isMounted() {
      return !1;
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
  if ("object" !== _typeof$2(a) && "function" !== typeof a && null != a) throw Error(C(85));
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
l$1(I, F.prototype);
I.isPureReactComponent = !0;
var J = {
    current: null
  },
  K = Object.prototype.hasOwnProperty,
  L = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };
function M$1(a, b, c) {
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
    $$typeof: p$1,
    type: a,
    key: g,
    ref: k,
    props: d,
    _owner: J.current
  };
}
function N(a, b) {
  return {
    $$typeof: p$1,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  };
}
function O(a) {
  return "object" === _typeof$2(a) && null !== a && a.$$typeof === p$1;
}
function escape$1(a) {
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
  var d = _typeof$2(a);
  if ("undefined" === d || "boolean" === d) a = null;
  var g = !1;
  if (null === a) g = !0;else switch (d) {
    case "string":
    case "number":
      g = !0;
      break;
    case "object":
      switch (a.$$typeof) {
        case p$1:
        case q$1:
          g = !0;
      }
  }
  if (g) return c(e, a, "" === b ? "." + U(a, 0) : b), 1;
  g = 0;
  b = "" === b ? "." : b + ":";
  if (Array.isArray(a)) for (var k = 0; k < a.length; k++) {
    d = a[k];
    var f = b + U(d, k);
    g += T(d, f, c, e);
  } else if (null === a || "object" !== _typeof$2(a) ? f = null : (f = B && a[B] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), k = 0; !(d = a.next()).done;) d = d.value, f = b + U(d, k++), g += T(d, f, c, e);else if ("object" === d) throw c = "" + a, Error(C(31, "[object Object]" === c ? "object with keys {" + Object.keys(a).join(", ") + "}" : c, ""));
  return g;
}
function V(a, b, c) {
  return null == a ? 0 : T(a, "", b, c);
}
function U(a, b) {
  return "object" === _typeof$2(a) && null !== a && null != a.key ? escape$1(a.key) : b.toString(36);
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
    current: !1
  },
  assign: l$1
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
react_production_min.Fragment = r$1;
react_production_min.Profiler = u;
react_production_min.PureComponent = H;
react_production_min.StrictMode = t$1;
react_production_min.Suspense = y$1;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ba;
react_production_min.cloneElement = function (a, b, c) {
  if (null === a || void 0 === a) throw Error(C(267, a));
  var e = l$1({}, a.props),
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
    $$typeof: p$1,
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
    $$typeof: w$1,
    _calculateChangedBits: b,
    _currentValue: a,
    _currentValue2: a,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  a.Provider = {
    $$typeof: v$1,
    _context: a
  };
  return a.Consumer = a;
};
react_production_min.createElement = M$1;
react_production_min.createFactory = function (a) {
  var b = M$1.bind(null, a);
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
    $$typeof: x$1,
    render: a
  };
};
react_production_min.isValidElement = O;
react_production_min.lazy = function (a) {
  return {
    $$typeof: A$1,
    _ctor: a,
    _status: -1,
    _result: null
  };
};
react_production_min.memo = function (a, b) {
  return {
    $$typeof: z$1,
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

var react_development = {};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ReactPropTypesSecret$3 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
var ReactPropTypesSecret_1 = ReactPropTypesSecret$3;

var has$2 = Function.call.bind(Object.prototype.hasOwnProperty);

var printWarning$1 = function printWarning() {};
if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret$2 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has$1 = has$2;
  printWarning$1 = function printWarning(text) {
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
function checkPropTypes$1(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + _typeof$2(typeSpecs[typeSpecName]) + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$2);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning$1((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + _typeof$2(error) + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;
          var stack = getStack ? getStack() : '';
          printWarning$1('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
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
checkPropTypes$1.resetWarningCache = function () {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};
var checkPropTypes_1 = checkPropTypes$1;

if (process.env.NODE_ENV !== "production") {
  (function () {

    var _assign = objectAssign;
    var checkPropTypes = checkPropTypes_1;
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
      if (maybeIterable === null || _typeof$2(maybeIterable) !== 'object') {
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
      if (_typeof$2(type) === 'object') {
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
      if (!(_typeof$2(partialState) === 'object' || typeof partialState === 'function' || partialState == null)) {
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
      return _typeof$2(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
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
      var type = _typeof$2(children);
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
      if (_typeof$2(component) === 'object' && component !== null && component.key != null) {
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
          error('forwardRef requires a render function but was given %s.', render === null ? 'null' : _typeof$2(render));
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
      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || _typeof$2(type) === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
    }
    function memo(type, compare) {
      {
        if (!isValidElementType(type)) {
          error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : _typeof$2(type));
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
      if (_typeof$2(node) !== 'object') {
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
        } else if (_typeof$2(type) === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE ||
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
        if (type === undefined || _typeof$2(type) === 'object' && type !== null && Object.keys(type).length === 0) {
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
          typeString = _typeof$2(type);
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

if (process.env.NODE_ENV === 'production') {
  react.exports = react_production_min;
} else {
  react.exports = react_development;
}
var React = react.exports;

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
utils.extend = extend;
var hop$1 = Object.prototype.hasOwnProperty;
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
      if (hop$1.call(source, key)) {
        obj[key] = source[key];
      }
    }
  }
  return obj;
}
utils.hop = hop$1;

var es5$1 = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
var src$utils$$ = utils;

// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var realDefineProp$1 = function () {
  try {
    return !!Object.defineProperty({}, 'a', {});
  } catch (e) {
    return false;
  }
}();
var defineProperty$1 = realDefineProp$1 ? Object.defineProperty : function (obj, name, desc) {
  if ('get' in desc && obj.__defineGetter__) {
    obj.__defineGetter__(name, desc.get);
  } else if (!src$utils$$.hop.call(obj, name) || 'value' in desc) {
    obj[name] = desc.value;
  }
};
var objCreate$1 = Object.create || function (proto, props) {
  var obj, k;
  function F() {}
  F.prototype = proto;
  obj = new F();
  for (k in props) {
    if (src$utils$$.hop.call(props, k)) {
      defineProperty$1(obj, k, props[k]);
    }
  }
  return obj;
};
es5$1.defineProperty = defineProperty$1, es5$1.objCreate = objCreate$1;

var compiler = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
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

var intlMessageformatParser = {exports: {}};

var parser = {};

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
        return new peg$SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, location);
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

(function (module, exports) {

  exports = module.exports = parser['default'];
  exports['default'] = exports;
})(intlMessageformatParser, intlMessageformatParser.exports);

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
(function (exports) {

  var src$utils$$ = utils,
    src$es5$$ = es5$1,
    src$compiler$$ = compiler,
    intl$messageformat$parser$$ = intlMessageformatParser.exports;
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

var en$1 = {};

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

/* jslint esnext: true */
(function (exports) {

  var src$core$$ = core$1,
    src$en$$ = en$1;
  src$core$$["default"].__addLocaleData(src$en$$["default"]);
  src$core$$["default"].defaultLocale = 'en';
  exports["default"] = src$core$$["default"];
})(main$1);

/* jshint node:true */
(function (module, exports) {

  var IntlMessageFormat = main$1['default'];

  // Add all locale data to `IntlMessageFormat`. This module will be ignored when
  // bundling for the browser with Browserify/Webpack.

  // Re-export `IntlMessageFormat` as the CommonJS default exports with all the
  // locale data registered, and with English set as the default locale. Define
  // the `default` prop for use with other compiled ES6 Modules.
  exports = module.exports = IntlMessageFormat;
  exports['default'] = exports;
})(intlMessageformat, intlMessageformat.exports);
var IntlMessageFormat = intlMessageformat.exports;

var intlRelativeformat = {exports: {}};

var main = {};

var core = {};

var diff = {};

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

var es5 = {};

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
var toString$1 = Object.prototype.toString;
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
var isArray$1 = Array.isArray || function (obj) {
  return toString$1.call(obj) === '[object Array]';
};
es5.isArray = isArray$1;
var dateNow = Date.now || function () {
  return new Date().getTime();
};
es5.dateNow = dateNow;

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
Object.defineProperty(core, "__esModule", {
  value: true
});
/* jslint esnext: true */
var intl_messageformat_1 = intlMessageformat.exports;
var diff_1 = diff;
var es5_1 = es5;
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

var en = {};

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

/* jslint esnext: true */
Object.defineProperty(main, "__esModule", {
  value: true
});
var core_1 = core;
var en_1 = en;
core_1.default.__addLocaleData(en_1.default);
core_1.default.defaultLocale = 'en';
main.default = core_1.default;

/* jshint node:true */
(function (module, exports) {

  var IntlRelativeFormat = main['default'];

  // Add all locale data to `IntlRelativeFormat`. This module will be ignored when
  // bundling for the browser with Browserify/Webpack.

  // Re-export `IntlRelativeFormat` as the CommonJS default exports with all the
  // locale data registered, and with English set as the default locale. Define
  // the `default` prop for use with other compiled ES6 Modules.
  exports = module.exports = IntlRelativeFormat;
  exports['default'] = exports;
})(intlRelativeformat, intlRelativeformat.exports);
var IntlRelativeFormat = intlRelativeformat.exports;

var propTypes = {exports: {}};

var reactIs$1 = {exports: {}};

var reactIs_production_min = {};

var b = "function" === typeof Symbol && Symbol.for,
  c = b ? Symbol.for("react.element") : 60103,
  d = b ? Symbol.for("react.portal") : 60106,
  e = b ? Symbol.for("react.fragment") : 60107,
  f$1 = b ? Symbol.for("react.strict_mode") : 60108,
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
  if ("object" === _typeof$2(a) && null !== a) {
    var u = a.$$typeof;
    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m:
          case e:
          case g:
          case f$1:
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
reactIs_production_min.StrictMode = f$1;
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
  return "object" === _typeof$2(a) && null !== a && a.$$typeof === c;
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
  return z(a) === f$1;
};
reactIs_production_min.isSuspense = function (a) {
  return z(a) === p;
};
reactIs_production_min.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f$1 || a === p || a === q || "object" === _typeof$2(a) && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
};
reactIs_production_min.typeOf = z;

var reactIs_development = {};

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
      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || _typeof$2(type) === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
    }
    function typeOf(object) {
      if (_typeof$2(object) === 'object' && object !== null) {
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
      return _typeof$2(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
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

if (process.env.NODE_ENV === 'production') {
  reactIs$1.exports = reactIs_production_min;
} else {
  reactIs$1.exports = reactIs_development;
}

var ReactIs$1 = reactIs$1.exports;
var assign = objectAssign;
var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
var has = has$2;
var checkPropTypes = checkPropTypes_1;
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
var factoryWithTypeCheckers = function factoryWithTypeCheckers(isValidElement, throwOnDirectAccess) {
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
    this.data = data && _typeof$2(data) === 'object' ? data : {};
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
      if (secret !== ReactPropTypesSecret$1) {
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
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret$1);
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
      if (!ReactIs$1.isValidElementType(propValue)) {
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
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);
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
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret$1);
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
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);
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
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function isNode(propValue) {
    switch (_typeof$2(propValue)) {
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
    var propType = _typeof$2(propValue);
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

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ReactPropTypesSecret = ReactPropTypesSecret_1;
function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
var factoryWithThrowingShims = function factoryWithThrowingShims() {
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

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = reactIs$1.exports;

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  propTypes.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  propTypes.exports = factoryWithThrowingShims();
}
var PropTypes = propTypes.exports;

var reactIs = reactIs$1.exports;
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
var browser = invariant;

// -- Utilities ----------------------------------------------------------------
function getCacheId(inputs) {
  return JSON.stringify(inputs.map(function (input) {
    return input && _typeof$2(input) === 'object' ? orderedProps(input) : input;
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
var _typeof$1 = typeof Symbol === "function" && _typeof$2(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof$2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof$2(obj);
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
    throw new TypeError("Super expression must either be null or a function, not " + _typeof$2(superClass));
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
  return call && (_typeof$2(call) === "object" || typeof call === "function") ? call : self;
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
  browser(intl, '[React Intl] Could not find required `intl` object. ' + '<IntlProvider> needs to exist in the component ancestry.');
}
function shallowEquals(objA, objB) {
  if (objA === objB) {
    return true;
  }
  if ((typeof objA === 'undefined' ? 'undefined' : _typeof$1(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof$1(objB)) !== 'object' || objB === null) {
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
function formatMessage$2(config, state) {
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
    browser(! /*#__PURE__*/react.exports.isValidElement(config), '[React Intl] Don\'t pass React elements to ' + 'formatMessage(), pass `.props`.');
  }

  // `id` is a required field of a Message Descriptor.
  browser(id, '[React Intl] An `id` must be provided to format a message.');
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
  return formatMessage$2(config, state, messageDescriptor, escapedValues);
}
var format = Object.freeze({
  formatDate: formatDate,
  formatTime: formatTime,
  formatRelative: formatRelative,
  formatNumber: formatNumber,
  formatPlural: formatPlural,
  formatMessage: formatMessage$2,
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
    browser(typeof Intl !== 'undefined', '[React Intl] The `Intl` APIs must be available in the runtime, ' + 'and do not appear to be built-in. An `Intl` polyfill should be loaded.\n' + 'See: http://formatjs.io/guides/runtime-environments/');
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
      return react.exports.Children.only(this.props.children);
    }
  }]);
  return IntlProvider;
}(react.exports.Component);
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
}(react.exports.Component);
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
}(react.exports.Component);
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
}(react.exports.Component);
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
}(react.exports.Component);
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
}(react.exports.Component);
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
  return formatMessage$2({}, {
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
          if ( /*#__PURE__*/react.exports.isValidElement(value)) {
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
      return react.exports.createElement.apply(undefined, [Component$$1, null].concat(toConsumableArray(nodes)));
    }
  }]);
  return FormattedMessage;
}(react.exports.Component);
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
}(react.exports.Component);
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

var img$2 = "data:image/png;base64,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";

var img$1 = "data:image/svg+xml,%3csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cpath stroke='%237C87A5' fill='white' stroke-linecap='round' stroke-linejoin='round' d='M1 12h38v16H1z'/%3e%3cpath stroke='%23E6E7E8' fill='%23E6E7E8' stroke-linecap='round' stroke-linejoin='round' d='M16 12v2h1v-1h2v1h1v-2z'/%3e%3cpath d='M14.5 12H22' stroke='%237C87A5' stroke-linecap='square'/%3e%3cpath stroke='%237C87A5' fill='white' stroke-linecap='round' stroke-linejoin='round' d='M1 16h19v6h4v4h-4v2H1z'/%3e%3cpath stroke='%237C87A5' fill='%23E6E7E8' stroke-linecap='round' stroke-linejoin='round' d='M1 26h38v2H1zM1 19h9l3 3h4v4H1z'/%3e%3ccircle fill='%23FF661A' cx='4.5' cy='22.5' r='1.5'/%3e%3ccircle fill='%237C87A5' cx='22' cy='24' r='1'/%3e%3cpath stroke='%237C87A5' fill='white' stroke-linecap='round' stroke-linejoin='round' d='M29 22h10v4H29z'/%3e%3ccircle fill='%237C87A5' cx='31' cy='24' r='1'/%3e%3ccircle fill='%237C87A5' cx='34' cy='24' r='1'/%3e%3ccircle fill='%237C87A5' cx='37' cy='24' r='1'/%3e%3cg stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M3 16v-.5M5 16v-.5M7 16v-.5M9 16v-.5M11 16v-.5M13 16v-.5'/%3e%3c/g%3e%3cg stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M21 22v-.5M23 22v-.5'/%3e%3c/g%3e%3cg stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M3 12v-.5M5 12v-.5M7 12v-.5M9 12v-.5M11 12v-.5M13 12v-.5'/%3e%3c/g%3e%3cg stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M28 12v-.5M26 12v-.5M24 12v-.5M30 12v-.5M32 12v-.5M34 12v-.5M36 12v-.5M38 12v-.5'/%3e%3c/g%3e%3cg stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M31 22v-.5M33 22v-.5M35 22v-.5M37 22v-.5'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";

var img = "data:image/svg+xml,%3csvg width='204' height='72' viewBox='0 0 204 72' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cpath stroke='%237C87A5' fill='white' fill-rule='nonzero' stroke-linecap='round' stroke-linejoin='round' d='M100 24h100v40H100z'/%3e%3cpath d='M76 8h-8V5c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M73.3 4v4H76V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M76 8h-8V5c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M64 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M61.3 4v4H64V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M64 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M52 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M49.3 4v4H52V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M52 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M40 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M37.3 4v4H40V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M40 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M28 8h-8V5c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M25.3 4v4H28V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M28 8h-8V5c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M16 8H8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M13.3 4v4H16V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M16 8H8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M172 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M169.3 4v4h2.7V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M172 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M160 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M157.3 4v4h2.7V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M160 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M148 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M145.3 4v4h2.7V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M148 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M136 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M133.3 4v4h2.7V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M136 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M124 8h-8V5c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M121.3 4v4h2.7V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M124 8h-8V5c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M112 8h-8V5c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M109.3 4v4h2.7V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M112 8h-8V5c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M198 8H6a2 2 0 0 0-2 2v14h196V10a2 2 0 0 0-2-2z' stroke='%237C87A5' fill='white' fill-rule='nonzero' stroke-linecap='round' stroke-linejoin='round'/%3e%3cg stroke-linecap='round' stroke-linejoin='round'%3e%3cpath stroke='%237C87A5' fill='%23E6E7E8' fill-rule='nonzero' d='M100 20h-2v-2H82v2h-2V10h20z'/%3e%3cpath stroke='%237C87A5' fill='%237C87A5' fill-rule='nonzero' d='M82 12.1h16V18H82z'/%3e%3cpath d='M84 17v-1M86 17v-1M90 17v-1M94 17v-1M88 17v-1M92 17v-1M96 17v-1' stroke='%23E6E7E8'/%3e%3c/g%3e%3cg%3e%3cpath d='M196 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M193.3 4v4h2.7V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M196 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cpath d='M200 24H4v-4h190a2 2 0 0 0 2-2V8h2a2 2 0 0 1 2 2v14z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cg%3e%3cpath d='M184 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M181.3 4v4h2.7V4.7c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M184 8h-8V5c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cg%3e%3cpath d='M76 24h-8v-3c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M73.3 20v4H76v-3.3c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M76 24h-8v-3c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cg%3e%3cpath d='M64 24h-8v-3c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M61.3 20v4H64v-3.3c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M64 24h-8v-3c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cg%3e%3cpath d='M124 44h-8v-3c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M121.3 40v4h2.7v-3.3c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M124 44h-8v-3c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cg%3e%3cpath d='M112 44h-8v-3c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M109.3 40v4h2.7v-3.3c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M112 44h-8v-3c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cg%3e%3cpath d='M52 24h-8v-3c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M49.3 20v4H52v-3.3c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M52 24h-8v-3c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cg%3e%3cpath d='M40 24h-8v-3c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M37.3 20v4H40v-3.3c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M40 24h-8v-3c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cg%3e%3cpath d='M28 24h-8v-3c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M25.3 20v4H28v-3.3c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M28 24h-8v-3c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cg%3e%3cpath d='M16 24H8v-3c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M13.3 20v4H16v-3.3c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M16 24H8v-3c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cpath d='M100 68H6a2 2 0 0 1-2-2v-2h84v-4h12v8z' stroke='%237C87A5' fill='%23E6E7E8' fill-rule='nonzero' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath stroke='%237C87A5' fill='%23E6E7E8' fill-rule='nonzero' stroke-linecap='round' stroke-linejoin='round' d='M4 36v28h84V44H64l-12-8zM100 68h98a2 2 0 0 0 2-2v-2H100v4z'/%3e%3cpath d='M200 24v42a2 2 0 0 1-2 2h-98V24h4v14c0 1.1.9 2 2 2h24a2 2 0 0 1 2 2v16c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V42c0-1.1.9-2 2-2h48a2 2 0 0 0 2-2V24h4z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M100 24H4v12h48l12 8h24v16h38a2 2 0 0 0 2-2V46a2 2 0 0 0-2-2h-26V24z' stroke='%237C87A5' fill='white' fill-rule='nonzero' stroke-linecap='round' stroke-linejoin='round'/%3e%3cg transform='translate(12 44)'%3e%3ccircle fill='%23CC4C23' fill-rule='nonzero' cx='6' cy='6' r='6'/%3e%3ccircle stroke='%23231F20' stroke-width='2' opacity='.1' stroke-linecap='round' stroke-linejoin='round' cx='6' cy='6' r='6'/%3e%3cpath d='M8 6H4M6 8V4' stroke='%23414042' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cg transform='translate(109 46)'%3e%3ccircle stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round' cx='4.9' cy='5.4' r='4.6'/%3e%3ccircle fill='%237C87A5' fill-rule='nonzero' cx='4.9' cy='5.4' r='3.3'/%3e%3ccircle stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round' cx='4.9' cy='5.4' r='4.6'/%3e%3c/g%3e%3cg%3e%3cpath d='M149 44h50c.5 0 1 .5 1 1v14c0 .6-.5 1-1 1h-50a1 1 0 0 1-1-1V45c0-.5.5-1 1-1z' stroke='%237C87A5' fill='white' fill-rule='nonzero' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M200 44v15c0 .6-.5 1-1 1h-50a1 1 0 0 1-1-1v-3h45a3 3 0 0 0 3-3v-9h4z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M196 44h-8v-3c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M193.3 40v4h2.7v-3.3c0-.4-.4-.7-1-.7h-1.8z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M196 44h-8v-3c0-.6.5-1 1-1h6c.6 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M160 44h-8v-3c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M157.3 40v4h2.7v-3.3c0-.4-.4-.7-1-.7h-1.7z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M160 44h-8v-3c0-.6.5-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M184 44h-8v-3c0-.6.4-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M181.3 40v4h2.7v-3.3c0-.4-.4-.7-1-.7h-1.8z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M184 44h-8v-3c0-.6.4-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M172 44h-8v-3c0-.6.4-1 1-1h6c.5 0 1 .5 1 1v3z' fill='white' fill-rule='nonzero'/%3e%3cpath d='M169.3 40v4h2.7v-3.3c0-.4-.4-.7-1-.7h-1.8z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M172 44h-8v-3c0-.6.4-1 1-1h6c.5 0 1 .5 1 1v3z' stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cg transform='translate(157 46)'%3e%3ccircle stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round' cx='4.8' cy='5.4' r='4.6'/%3e%3ccircle fill='%237C87A5' fill-rule='nonzero' cx='4.8' cy='5.4' r='3.3'/%3e%3ccircle stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round' cx='4.8' cy='5.4' r='4.6'/%3e%3c/g%3e%3cg transform='translate(169 46)'%3e%3ccircle stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round' cx='5' cy='5.4' r='4.6'/%3e%3ccircle fill='%237C87A5' fill-rule='nonzero' cx='5' cy='5.4' r='3.3'/%3e%3ccircle stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round' cx='5' cy='5.4' r='4.6'/%3e%3c/g%3e%3cg transform='translate(181 46)'%3e%3ccircle stroke='%237C87A5' stroke-linecap='round' stroke-linejoin='round' cx='5.2' cy='5.4' r='4.6'/%3e%3ccircle fill='%237C87A5' fill-rule='nonzero' cx='5.2' cy='5.4' r='3.3'/%3e%3ccircle stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round' cx='5.2' cy='5.4' r='4.6'/%3e%3c/g%3e%3c/g%3e%3cpath d='M100 68H6a2 2 0 0 1-2-2v-2h84v-4h12v8zM128 46v12a2 2 0 0 1-2 2H88v-4h34a2 2 0 0 0 2-2V44h2a2 2 0 0 1 2 2zM87 43H64l-12-8H4v2h48l12 8h24v-1c0-.5-.5-1-1-1z' stroke='%23231F20' fill='%23231F20' fill-rule='nonzero' opacity='.1' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3c/svg%3e";

var entry = {
  name: 'LEGO Boost Hub Extended',
  extensionId: 'legoboost',
  collaborator: 'CrispStrobe',
  iconURL: img$2,
  insetIconURL: img$1,
  description: /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: "Extensed extension for LEGO Boost Hub.",
    id: "gui.extension.legoboost.description"
  }),
  featured: true,
  disabled: false,
  bluetoothRequired: true,
  internetConnectionRequired: true,
  launchPeripheralConnectionFlow: true,
  useAutoScan: false,
  connectionIconURL: img,
  connectionSmallIconURL: img$1,
  connectingMessage: /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: "Connecting",
    id: "gui.extension.legoboost.connectingMessage"
  }),
  helpLink: 'https://scratch.mit.edu/'
};

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function toPrimitive(t, r) {
  if ("object" != _typeof$2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof$2(i) ? i : String(i);
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

function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var regeneratorRuntime$1 = {exports: {}};

var _typeof = {exports: {}};

(function (module) {
  function _typeof(o) {
    "@babel/helpers - typeof";

    return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
  }
  module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(_typeof);

(function (module) {
  var _typeof$1 = _typeof.exports["default"];
  function _regeneratorRuntime() {

    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
    module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
      return e;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    var t,
      e = {},
      r = Object.prototype,
      n = r.hasOwnProperty,
      o = Object.defineProperty || function (t, e, r) {
        t[e] = r.value;
      },
      i = "function" == typeof Symbol ? Symbol : {},
      a = i.iterator || "@@iterator",
      c = i.asyncIterator || "@@asyncIterator",
      u = i.toStringTag || "@@toStringTag";
    function define(t, e, r) {
      return Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), t[e];
    }
    try {
      define({}, "");
    } catch (t) {
      define = function define(t, e, r) {
        return t[e] = r;
      };
    }
    function wrap(t, e, r, n) {
      var i = e && e.prototype instanceof Generator ? e : Generator,
        a = Object.create(i.prototype),
        c = new Context(n || []);
      return o(a, "_invoke", {
        value: makeInvokeMethod(t, r, c)
      }), a;
    }
    function tryCatch(t, e, r) {
      try {
        return {
          type: "normal",
          arg: t.call(e, r)
        };
      } catch (t) {
        return {
          type: "throw",
          arg: t
        };
      }
    }
    e.wrap = wrap;
    var h = "suspendedStart",
      l = "suspendedYield",
      f = "executing",
      s = "completed",
      y = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var p = {};
    define(p, a, function () {
      return this;
    });
    var d = Object.getPrototypeOf,
      v = d && d(d(values([])));
    v && v !== r && n.call(v, a) && (p = v);
    var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
    function defineIteratorMethods(t) {
      ["next", "throw", "return"].forEach(function (e) {
        define(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function AsyncIterator(t, e) {
      function invoke(r, o, i, a) {
        var c = tryCatch(t[r], t, o);
        if ("throw" !== c.type) {
          var u = c.arg,
            h = u.value;
          return h && "object" == _typeof$1(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
            invoke("next", t, i, a);
          }, function (t) {
            invoke("throw", t, i, a);
          }) : e.resolve(h).then(function (t) {
            u.value = t, i(u);
          }, function (t) {
            return invoke("throw", t, i, a);
          });
        }
        a(c.arg);
      }
      var r;
      o(this, "_invoke", {
        value: function value(t, n) {
          function callInvokeWithMethodAndArg() {
            return new e(function (e, r) {
              invoke(t, n, e, r);
            });
          }
          return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(e, r, n) {
      var o = h;
      return function (i, a) {
        if (o === f) throw new Error("Generator is already running");
        if (o === s) {
          if ("throw" === i) throw a;
          return {
            value: t,
            done: !0
          };
        }
        for (n.method = i, n.arg = a;;) {
          var c = n.delegate;
          if (c) {
            var u = maybeInvokeDelegate(c, n);
            if (u) {
              if (u === y) continue;
              return u;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (o === h) throw o = s, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = f;
          var p = tryCatch(e, r, n);
          if ("normal" === p.type) {
            if (o = n.done ? s : l, p.arg === y) continue;
            return {
              value: p.arg,
              done: n.done
            };
          }
          "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
        }
      };
    }
    function maybeInvokeDelegate(e, r) {
      var n = r.method,
        o = e.iterator[n];
      if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
      var i = tryCatch(o, e.iterator, r.arg);
      if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
      var a = i.arg;
      return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
    }
    function pushTryEntry(t) {
      var e = {
        tryLoc: t[0]
      };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }
    function resetTryEntry(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e;
    }
    function Context(t) {
      this.tryEntries = [{
        tryLoc: "root"
      }], t.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(e) {
      if (e || "" === e) {
        var r = e[a];
        if (r) return r.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var o = -1,
            i = function next() {
              for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
              return next.value = t, next.done = !0, next;
            };
          return i.next = i;
        }
      }
      throw new TypeError(_typeof$1(e) + " is not iterable");
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), o(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
    }, e.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
    }, e.awrap = function (t) {
      return {
        __await: t
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
      return this;
    }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new AsyncIterator(wrap(t, r, n, o), i);
      return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
      return this;
    }), define(g, "toString", function () {
      return "[object Generator]";
    }), e.keys = function (t) {
      var e = Object(t),
        r = [];
      for (var n in e) r.push(n);
      return r.reverse(), function next() {
        for (; r.length;) {
          var t = r.pop();
          if (t in e) return next.value = t, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, e.values = values, Context.prototype = {
      constructor: Context,
      reset: function reset(e) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
      },
      stop: function stop() {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(e) {
        if (this.done) throw e;
        var r = this;
        function handle(n, o) {
          return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            a = i.completion;
          if ("root" === i.tryLoc) return handle("end");
          if (i.tryLoc <= this.prev) {
            var c = n.call(i, "catchLoc"),
              u = n.call(i, "finallyLoc");
            if (c && u) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            } else if (c) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            } else {
              if (!u) throw new Error("try statement without catch or finally");
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            }
          }
        }
      },
      abrupt: function abrupt(t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var o = this.tryEntries[r];
          if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
            var i = o;
            break;
          }
        }
        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
        var a = i ? i.completion : {};
        return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
      },
      complete: function complete(t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
      },
      finish: function finish(t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
        }
      },
      "catch": function _catch(t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.tryLoc === t) {
            var n = r.completion;
            if ("throw" === n.type) {
              var o = n.arg;
              resetTryEntry(r);
            }
            return o;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(e, r, n) {
        return this.delegate = {
          iterator: values(e),
          resultName: r,
          nextLoc: n
        }, "next" === this.method && (this.arg = t), y;
      }
    }, e;
  }
  module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(regeneratorRuntime$1);

// TODO(Babel 8): Remove this file.

var runtime = regeneratorRuntime$1.exports();
var regenerator = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if ((typeof globalThis === "undefined" ? "undefined" : _typeof$2(globalThis)) === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/**
 * Block argument types
 * @enum {string}
 */
var ArgumentType$1 = {
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
var argumentType = ArgumentType$1;

/**
 * Types of block
 * @enum {string}
 */
var BlockType$1 = {
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
var blockType = BlockType$1;

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
var color$4 = Color$1;

var Color = color$4;

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
var Cast$1 = /*#__PURE__*/function () {
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
var cast = Cast$1;

var formatMessage$1 = {exports: {}};

var formatMessageParse = {exports: {}};

(function (module, exports) {

  /*::
  export type AST = Element[]
  export type Element = string | Placeholder
  export type Placeholder = Plural | Styled | Typed | Simple
  export type Plural = [ string, 'plural' | 'selectordinal', number, SubMessages ]
  export type Styled = [ string, string, string | SubMessages ]
  export type Typed = [ string, string ]
  export type Simple = [ string ]
  export type SubMessages = { [string]: AST }
  export type Token = [ TokenType, string ]
  export type TokenType = 'text' | 'space' | 'id' | 'type' | 'style' | 'offset' | 'number' | 'selector' | 'syntax'
  type Context = {|
    pattern: string,
    index: number,
    tagsType: ?string,
    tokens: ?Token[]
  |}
  */
  var ARG_OPN = '{';
  var ARG_CLS = '}';
  var ARG_SEP = ',';
  var NUM_ARG = '#';
  var TAG_OPN = '<';
  var TAG_CLS = '>';
  var TAG_END = '</';
  var TAG_SELF_CLS = '/>';
  var ESC = '\'';
  var OFFSET = 'offset:';
  var simpleTypes = ['number', 'date', 'time', 'ordinal', 'duration', 'spellout'];
  var submTypes = ['plural', 'select', 'selectordinal'];

  /**
   * parse
   *
   * Turns this:
   *  `You have { numBananas, plural,
   *       =0 {no bananas}
   *      one {a banana}
   *    other {# bananas}
   *  } for sale`
   *
   * into this:
   *  [ "You have ", [ "numBananas", "plural", 0, {
   *       "=0": [ "no bananas" ],
   *      "one": [ "a banana" ],
   *    "other": [ [ '#' ], " bananas" ]
   *  } ], " for sale." ]
   *
   * tokens:
   *  [
   *    [ "text", "You have " ],
   *    [ "syntax", "{" ],
   *    [ "space", " " ],
   *    [ "id", "numBananas" ],
   *    [ "syntax", ", " ],
   *    [ "space", " " ],
   *    [ "type", "plural" ],
   *    [ "syntax", "," ],
   *    [ "space", "\n     " ],
   *    [ "selector", "=0" ],
   *    [ "space", " " ],
   *    [ "syntax", "{" ],
   *    [ "text", "no bananas" ],
   *    [ "syntax", "}" ],
   *    [ "space", "\n    " ],
   *    [ "selector", "one" ],
   *    [ "space", " " ],
   *    [ "syntax", "{" ],
   *    [ "text", "a banana" ],
   *    [ "syntax", "}" ],
   *    [ "space", "\n  " ],
   *    [ "selector", "other" ],
   *    [ "space", " " ],
   *    [ "syntax", "{" ],
   *    [ "syntax", "#" ],
   *    [ "text", " bananas" ],
   *    [ "syntax", "}" ],
   *    [ "space", "\n" ],
   *    [ "syntax", "}" ],
   *    [ "text", " for sale." ]
   *  ]
   **/
  exports = module.exports = function parse(pattern /*: string */, options /*:: ?: { tagsType?: string, tokens?: Token[] } */) /*: AST */{
    return parseAST({
      pattern: String(pattern),
      index: 0,
      tagsType: options && options.tagsType || null,
      tokens: options && options.tokens || null
    }, '');
  };
  function parseAST(current /*: Context */, parentType /*: string */) /*: AST */{
    var pattern = current.pattern;
    var length = pattern.length;
    var elements /*: AST */ = [];
    var start = current.index;
    var text = parseText(current, parentType);
    if (text) elements.push(text);
    if (text && current.tokens) current.tokens.push(['text', pattern.slice(start, current.index)]);
    while (current.index < length) {
      if (pattern[current.index] === ARG_CLS) {
        if (!parentType) throw expected(current);
        break;
      }
      if (parentType && current.tagsType && pattern.slice(current.index, current.index + TAG_END.length) === TAG_END) break;
      elements.push(parsePlaceholder(current));
      start = current.index;
      text = parseText(current, parentType);
      if (text) elements.push(text);
      if (text && current.tokens) current.tokens.push(['text', pattern.slice(start, current.index)]);
    }
    return elements;
  }
  function parseText(current /*: Context */, parentType /*: string */) /*: string */{
    var pattern = current.pattern;
    var length = pattern.length;
    var isHashSpecial = parentType === 'plural' || parentType === 'selectordinal';
    var isAngleSpecial = !!current.tagsType;
    var isArgStyle = parentType === '{style}';
    var text = '';
    while (current.index < length) {
      var char = pattern[current.index];
      if (char === ARG_OPN || char === ARG_CLS || isHashSpecial && char === NUM_ARG || isAngleSpecial && char === TAG_OPN || isArgStyle && isWhitespace(char.charCodeAt(0))) {
        break;
      } else if (char === ESC) {
        char = pattern[++current.index];
        if (char === ESC) {
          // double is always 1 '
          text += char;
          ++current.index;
        } else if (
        // only when necessary
        char === ARG_OPN || char === ARG_CLS || isHashSpecial && char === NUM_ARG || isAngleSpecial && char === TAG_OPN || isArgStyle) {
          text += char;
          while (++current.index < length) {
            char = pattern[current.index];
            if (char === ESC && pattern[current.index + 1] === ESC) {
              // double is always 1 '
              text += ESC;
              ++current.index;
            } else if (char === ESC) {
              // end of quoted
              ++current.index;
              break;
            } else {
              text += char;
            }
          }
        } else {
          // lone ' is just a '
          text += ESC;
          // already incremented
        }
      } else {
        text += char;
        ++current.index;
      }
    }
    return text;
  }
  function isWhitespace(code /*: number */) /*: boolean */{
    return code >= 0x09 && code <= 0x0D || code === 0x20 || code === 0x85 || code === 0xA0 || code === 0x180E || code >= 0x2000 && code <= 0x200D || code === 0x2028 || code === 0x2029 || code === 0x202F || code === 0x205F || code === 0x2060 || code === 0x3000 || code === 0xFEFF;
  }
  function skipWhitespace(current /*: Context */) /*: void */{
    var pattern = current.pattern;
    var length = pattern.length;
    var start = current.index;
    while (current.index < length && isWhitespace(pattern.charCodeAt(current.index))) {
      ++current.index;
    }
    if (start < current.index && current.tokens) {
      current.tokens.push(['space', current.pattern.slice(start, current.index)]);
    }
  }
  function parsePlaceholder(current /*: Context */) /*: Placeholder */{
    var pattern = current.pattern;
    if (pattern[current.index] === NUM_ARG) {
      if (current.tokens) current.tokens.push(['syntax', NUM_ARG]);
      ++current.index; // move passed #
      return [NUM_ARG];
    }
    var tag = parseTag(current);
    if (tag) return tag;

    /* istanbul ignore if should be unreachable if parseAST and parseText are right */
    if (pattern[current.index] !== ARG_OPN) throw expected(current, ARG_OPN);
    if (current.tokens) current.tokens.push(['syntax', ARG_OPN]);
    ++current.index; // move passed {
    skipWhitespace(current);
    var id = parseId(current);
    if (!id) throw expected(current, 'placeholder id');
    if (current.tokens) current.tokens.push(['id', id]);
    skipWhitespace(current);
    var char = pattern[current.index];
    if (char === ARG_CLS) {
      // end placeholder
      if (current.tokens) current.tokens.push(['syntax', ARG_CLS]);
      ++current.index; // move passed }
      return [id];
    }
    if (char !== ARG_SEP) throw expected(current, ARG_SEP + ' or ' + ARG_CLS);
    if (current.tokens) current.tokens.push(['syntax', ARG_SEP]);
    ++current.index; // move passed ,
    skipWhitespace(current);
    var type = parseId(current);
    if (!type) throw expected(current, 'placeholder type');
    if (current.tokens) current.tokens.push(['type', type]);
    skipWhitespace(current);
    char = pattern[current.index];
    if (char === ARG_CLS) {
      // end placeholder
      if (current.tokens) current.tokens.push(['syntax', ARG_CLS]);
      if (type === 'plural' || type === 'selectordinal' || type === 'select') {
        throw expected(current, type + ' sub-messages');
      }
      ++current.index; // move passed }
      return [id, type];
    }
    if (char !== ARG_SEP) throw expected(current, ARG_SEP + ' or ' + ARG_CLS);
    if (current.tokens) current.tokens.push(['syntax', ARG_SEP]);
    ++current.index; // move passed ,
    skipWhitespace(current);
    var arg;
    if (type === 'plural' || type === 'selectordinal') {
      var offset = parsePluralOffset(current);
      skipWhitespace(current);
      arg = [id, type, offset, parseSubMessages(current, type)];
    } else if (type === 'select') {
      arg = [id, type, parseSubMessages(current, type)];
    } else if (simpleTypes.indexOf(type) >= 0) {
      arg = [id, type, parseSimpleFormat(current)];
    } else {
      // custom placeholder type
      var index = current.index;
      var format /*: string | SubMessages */ = parseSimpleFormat(current);
      skipWhitespace(current);
      if (pattern[current.index] === ARG_OPN) {
        current.index = index; // rewind, since should have been submessages
        format = parseSubMessages(current, type);
      }
      arg = [id, type, format];
    }
    skipWhitespace(current);
    if (pattern[current.index] !== ARG_CLS) throw expected(current, ARG_CLS);
    if (current.tokens) current.tokens.push(['syntax', ARG_CLS]);
    ++current.index; // move passed }
    return arg;
  }
  function parseTag(current /*: Context */) /*: ?Placeholder */{
    var tagsType = current.tagsType;
    if (!tagsType || current.pattern[current.index] !== TAG_OPN) return;
    if (current.pattern.slice(current.index, current.index + TAG_END.length) === TAG_END) {
      throw expected(current, null, 'closing tag without matching opening tag');
    }
    if (current.tokens) current.tokens.push(['syntax', TAG_OPN]);
    ++current.index; // move passed <

    var id = parseId(current, true);
    if (!id) throw expected(current, 'placeholder id');
    if (current.tokens) current.tokens.push(['id', id]);
    skipWhitespace(current);
    if (current.pattern.slice(current.index, current.index + TAG_SELF_CLS.length) === TAG_SELF_CLS) {
      if (current.tokens) current.tokens.push(['syntax', TAG_SELF_CLS]);
      current.index += TAG_SELF_CLS.length;
      return [id, tagsType];
    }
    if (current.pattern[current.index] !== TAG_CLS) throw expected(current, TAG_CLS);
    if (current.tokens) current.tokens.push(['syntax', TAG_CLS]);
    ++current.index; // move passed >

    var children = parseAST(current, tagsType);
    var end = current.index;
    if (current.pattern.slice(current.index, current.index + TAG_END.length) !== TAG_END) throw expected(current, TAG_END + id + TAG_CLS);
    if (current.tokens) current.tokens.push(['syntax', TAG_END]);
    current.index += TAG_END.length;
    var closeId = parseId(current, true);
    if (closeId && current.tokens) current.tokens.push(['id', closeId]);
    if (id !== closeId) {
      current.index = end; // rewind for better error message
      throw expected(current, TAG_END + id + TAG_CLS, TAG_END + closeId + TAG_CLS);
    }
    skipWhitespace(current);
    if (current.pattern[current.index] !== TAG_CLS) throw expected(current, TAG_CLS);
    if (current.tokens) current.tokens.push(['syntax', TAG_CLS]);
    ++current.index; // move passed >

    return [id, tagsType, {
      children: children
    }];
  }
  function parseId(current /*: Context */, isTag /*:: ?: boolean */) /*: string */{
    var pattern = current.pattern;
    var length = pattern.length;
    var id = '';
    while (current.index < length) {
      var char = pattern[current.index];
      if (char === ARG_OPN || char === ARG_CLS || char === ARG_SEP || char === NUM_ARG || char === ESC || isWhitespace(char.charCodeAt(0)) || isTag && (char === TAG_OPN || char === TAG_CLS || char === '/')) break;
      id += char;
      ++current.index;
    }
    return id;
  }
  function parseSimpleFormat(current /*: Context */) /*: string */{
    var start = current.index;
    var style = parseText(current, '{style}');
    if (!style) throw expected(current, 'placeholder style name');
    if (current.tokens) current.tokens.push(['style', current.pattern.slice(start, current.index)]);
    return style;
  }
  function parsePluralOffset(current /*: Context */) /*: number */{
    var pattern = current.pattern;
    var length = pattern.length;
    var offset = 0;
    if (pattern.slice(current.index, current.index + OFFSET.length) === OFFSET) {
      if (current.tokens) current.tokens.push(['offset', 'offset'], ['syntax', ':']);
      current.index += OFFSET.length; // move passed offset:
      skipWhitespace(current);
      var start = current.index;
      while (current.index < length && isDigit(pattern.charCodeAt(current.index))) {
        ++current.index;
      }
      if (start === current.index) throw expected(current, 'offset number');
      if (current.tokens) current.tokens.push(['number', pattern.slice(start, current.index)]);
      offset = +pattern.slice(start, current.index);
    }
    return offset;
  }
  function isDigit(code /*: number */) /*: boolean */{
    return code >= 0x30 && code <= 0x39;
  }
  function parseSubMessages(current /*: Context */, parentType /*: string */) /*: SubMessages */{
    var pattern = current.pattern;
    var length = pattern.length;
    var options /*: SubMessages */ = {};
    while (current.index < length && pattern[current.index] !== ARG_CLS) {
      var selector = parseId(current);
      if (!selector) throw expected(current, 'sub-message selector');
      if (current.tokens) current.tokens.push(['selector', selector]);
      skipWhitespace(current);
      options[selector] = parseSubMessage(current, parentType);
      skipWhitespace(current);
    }
    if (!options.other && submTypes.indexOf(parentType) >= 0) {
      throw expected(current, null, null, '"other" sub-message must be specified in ' + parentType);
    }
    return options;
  }
  function parseSubMessage(current /*: Context */, parentType /*: string */) /*: AST */{
    if (current.pattern[current.index] !== ARG_OPN) throw expected(current, ARG_OPN + ' to start sub-message');
    if (current.tokens) current.tokens.push(['syntax', ARG_OPN]);
    ++current.index; // move passed {
    var message = parseAST(current, parentType);
    if (current.pattern[current.index] !== ARG_CLS) throw expected(current, ARG_CLS + ' to end sub-message');
    if (current.tokens) current.tokens.push(['syntax', ARG_CLS]);
    ++current.index; // move passed }
    return message;
  }
  function expected(current /*: Context */, expected /*:: ?: ?string */, found /*:: ?: ?string */, message /*:: ?: string */) {
    var pattern = current.pattern;
    var lines = pattern.slice(0, current.index).split(/\r?\n/);
    var offset = current.index;
    var line = lines.length;
    var column = lines.slice(-1)[0].length;
    found = found || (current.index >= pattern.length ? 'end of message pattern' : parseId(current) || pattern[current.index]);
    if (!message) message = errorMessage(expected, found);
    message += ' in ' + pattern.replace(/\r?\n/g, '\n');
    return new SyntaxError(message, expected, found, offset, line, column);
  }
  function errorMessage(expected /*: ?string */, found /* string */) {
    if (!expected) return 'Unexpected ' + found + ' found';
    return 'Expected ' + expected + ' but found ' + found;
  }

  /**
   * SyntaxError
   *  Holds information about bad syntax found in a message pattern
   **/
  function SyntaxError(message /*: string */, expected /*: ?string */, found /*: ?string */, offset /*: number */, line /*: number */, column /*: number */) {
    Error.call(this, message);
    this.name = 'SyntaxError';
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.offset = offset;
    this.line = line;
    this.column = column;
  }
  SyntaxError.prototype = Object.create(Error.prototype);
  exports.SyntaxError = SyntaxError;
})(formatMessageParse, formatMessageParse.exports);

var formatMessageInterpret = {exports: {}};

// @flow
var LONG = 'long';
var SHORT = 'short';
var NARROW = 'narrow';
var NUMERIC = 'numeric';
var TWODIGIT = '2-digit';

/**
 * formatting information
 **/
var formatMessageFormats = {
  number: {
    decimal: {
      style: 'decimal'
    },
    integer: {
      style: 'decimal',
      maximumFractionDigits: 0
    },
    currency: {
      style: 'currency',
      currency: 'USD'
    },
    percent: {
      style: 'percent'
    },
    default: {
      style: 'decimal'
    }
  },
  date: {
    short: {
      month: NUMERIC,
      day: NUMERIC,
      year: TWODIGIT
    },
    medium: {
      month: SHORT,
      day: NUMERIC,
      year: NUMERIC
    },
    long: {
      month: LONG,
      day: NUMERIC,
      year: NUMERIC
    },
    full: {
      month: LONG,
      day: NUMERIC,
      year: NUMERIC,
      weekday: LONG
    },
    default: {
      month: SHORT,
      day: NUMERIC,
      year: NUMERIC
    }
  },
  time: {
    short: {
      hour: NUMERIC,
      minute: NUMERIC
    },
    medium: {
      hour: NUMERIC,
      minute: NUMERIC,
      second: NUMERIC
    },
    long: {
      hour: NUMERIC,
      minute: NUMERIC,
      second: NUMERIC,
      timeZoneName: SHORT
    },
    full: {
      hour: NUMERIC,
      minute: NUMERIC,
      second: NUMERIC,
      timeZoneName: SHORT
    },
    default: {
      hour: NUMERIC,
      minute: NUMERIC,
      second: NUMERIC
    }
  },
  duration: {
    default: {
      hours: {
        minimumIntegerDigits: 1,
        maximumFractionDigits: 0
      },
      minutes: {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 0
      },
      seconds: {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 3
      }
    }
  },
  parseNumberPattern: function parseNumberPattern(pattern /*: ?string */) {
    if (!pattern) return;
    var options = {};
    var currency = pattern.match(/\b[A-Z]{3}\b/i);
    var syms = pattern.replace(/[^¤]/g, '').length;
    if (!syms && currency) syms = 1;
    if (syms) {
      options.style = 'currency';
      options.currencyDisplay = syms === 1 ? 'symbol' : syms === 2 ? 'code' : 'name';
      options.currency = currency ? currency[0].toUpperCase() : 'USD';
    } else if (pattern.indexOf('%') >= 0) {
      options.style = 'percent';
    }
    if (!/[@#0]/.test(pattern)) return options.style ? options : undefined;
    options.useGrouping = pattern.indexOf(',') >= 0;
    if (/E\+?[@#0]+/i.test(pattern) || pattern.indexOf('@') >= 0) {
      var size = pattern.replace(/E\+?[@#0]+|[^@#0]/gi, '');
      options.minimumSignificantDigits = Math.min(Math.max(size.replace(/[^@0]/g, '').length, 1), 21);
      options.maximumSignificantDigits = Math.min(Math.max(size.length, 1), 21);
    } else {
      var parts = pattern.replace(/[^#0.]/g, '').split('.');
      var integer = parts[0];
      var n = integer.length - 1;
      while (integer[n] === '0') --n;
      options.minimumIntegerDigits = Math.min(Math.max(integer.length - 1 - n, 1), 21);
      var fraction = parts[1] || '';
      n = 0;
      while (fraction[n] === '0') ++n;
      options.minimumFractionDigits = Math.min(Math.max(n, 0), 20);
      while (fraction[n] === '#') ++n;
      options.maximumFractionDigits = Math.min(Math.max(n, 0), 20);
    }
    return options;
  },
  parseDatePattern: function parseDatePattern(pattern /*: ?string */) {
    if (!pattern) return;
    var options = {};
    for (var i = 0; i < pattern.length;) {
      var current = pattern[i];
      var n = 1;
      while (pattern[++i] === current) ++n;
      switch (current) {
        case 'G':
          options.era = n === 5 ? NARROW : n === 4 ? LONG : SHORT;
          break;
        case 'y':
        case 'Y':
          options.year = n === 2 ? TWODIGIT : NUMERIC;
          break;
        case 'M':
        case 'L':
          n = Math.min(Math.max(n - 1, 0), 4);
          options.month = [NUMERIC, TWODIGIT, SHORT, LONG, NARROW][n];
          break;
        case 'E':
        case 'e':
        case 'c':
          options.weekday = n === 5 ? NARROW : n === 4 ? LONG : SHORT;
          break;
        case 'd':
        case 'D':
          options.day = n === 2 ? TWODIGIT : NUMERIC;
          break;
        case 'h':
        case 'K':
          options.hour12 = true;
          options.hour = n === 2 ? TWODIGIT : NUMERIC;
          break;
        case 'H':
        case 'k':
          options.hour12 = false;
          options.hour = n === 2 ? TWODIGIT : NUMERIC;
          break;
        case 'm':
          options.minute = n === 2 ? TWODIGIT : NUMERIC;
          break;
        case 's':
        case 'S':
          options.second = n === 2 ? TWODIGIT : NUMERIC;
          break;
        case 'z':
        case 'Z':
        case 'v':
        case 'V':
          options.timeZoneName = n === 1 ? SHORT : LONG;
          break;
      }
    }
    return Object.keys(options).length ? options : undefined;
  }
};

// @flow
// "lookup" algorithm http://tools.ietf.org/html/rfc4647#section-3.4
// assumes normalized language tags, and matches in a case sensitive manner
var lookupClosestLocale = function lookupClosestLocale(locale /*: string | string[] | void */, available /*: { [string]: any } */) /*: ?string */{
  if (typeof locale === 'string' && available[locale]) return locale;
  var locales = [].concat(locale || []);
  for (var l = 0, ll = locales.length; l < ll; ++l) {
    var current = locales[l].split('-');
    while (current.length) {
      var candidate = current.join('-');
      if (available[candidate]) return candidate;
      current.pop();
    }
  }
};

/*:: export type Rule = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other' */
var zero = 'zero',
  one = 'one',
  two = 'two',
  few = 'few',
  many = 'many',
  other = 'other';
var f = [function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n === 1 ? one : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return 0 <= n && n <= 1 ? one : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  var n = +s;
  return i === 0 || n === 1 ? one : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n === 0 ? zero : n === 1 ? one : n === 2 ? two : 3 <= n % 100 && n % 100 <= 10 ? few : 11 <= n % 100 && n % 100 <= 99 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return i === 1 && v === 0 ? one : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n % 10 === 1 && n % 100 !== 11 ? one : 2 <= n % 10 && n % 10 <= 4 && (n % 100 < 12 || 14 < n % 100) ? few : n % 10 === 0 || 5 <= n % 10 && n % 10 <= 9 || 11 <= n % 100 && n % 100 <= 14 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n % 10 === 1 && n % 100 !== 11 && n % 100 !== 71 && n % 100 !== 91 ? one : n % 10 === 2 && n % 100 !== 12 && n % 100 !== 72 && n % 100 !== 92 ? two : (3 <= n % 10 && n % 10 <= 4 || n % 10 === 9) && (n % 100 < 10 || 19 < n % 100) && (n % 100 < 70 || 79 < n % 100) && (n % 100 < 90 || 99 < n % 100) ? few : n !== 0 && n % 1000000 === 0 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var f = +(s + '.').split('.')[1];
  return v === 0 && i % 10 === 1 && i % 100 !== 11 || f % 10 === 1 && f % 100 !== 11 ? one : v === 0 && 2 <= i % 10 && i % 10 <= 4 && (i % 100 < 12 || 14 < i % 100) || 2 <= f % 10 && f % 10 <= 4 && (f % 100 < 12 || 14 < f % 100) ? few : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return i === 1 && v === 0 ? one : 2 <= i && i <= 4 && v === 0 ? few : v !== 0 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n === 0 ? zero : n === 1 ? one : n === 2 ? two : n === 3 ? few : n === 6 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  var t = +('' + s).replace(/^[^.]*.?|0+$/g, '');
  var n = +s;
  return n === 1 || t !== 0 && (i === 0 || i === 1) ? one : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var f = +(s + '.').split('.')[1];
  return v === 0 && i % 100 === 1 || f % 100 === 1 ? one : v === 0 && i % 100 === 2 || f % 100 === 2 ? two : v === 0 && 3 <= i % 100 && i % 100 <= 4 || 3 <= f % 100 && f % 100 <= 4 ? few : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  return i === 0 || i === 1 ? one : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var f = +(s + '.').split('.')[1];
  return v === 0 && (i === 1 || i === 2 || i === 3) || v === 0 && i % 10 !== 4 && i % 10 !== 6 && i % 10 !== 9 || v !== 0 && f % 10 !== 4 && f % 10 !== 6 && f % 10 !== 9 ? one : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n === 1 ? one : n === 2 ? two : 3 <= n && n <= 6 ? few : 7 <= n && n <= 10 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n === 1 || n === 11 ? one : n === 2 || n === 12 ? two : 3 <= n && n <= 10 || 13 <= n && n <= 19 ? few : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return v === 0 && i % 10 === 1 ? one : v === 0 && i % 10 === 2 ? two : v === 0 && (i % 100 === 0 || i % 100 === 20 || i % 100 === 40 || i % 100 === 60 || i % 100 === 80) ? few : v !== 0 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var n = +s;
  return i === 1 && v === 0 ? one : i === 2 && v === 0 ? two : v === 0 && (n < 0 || 10 < n) && n % 10 === 0 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  var t = +('' + s).replace(/^[^.]*.?|0+$/g, '');
  return t === 0 && i % 10 === 1 && i % 100 !== 11 || t !== 0 ? one : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n === 1 ? one : n === 2 ? two : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n === 0 ? zero : n === 1 ? one : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  var n = +s;
  return n === 0 ? zero : (i === 0 || i === 1) && n !== 0 ? one : other;
}, function (s /*: string | number */) /*: Rule */{
  var f = +(s + '.').split('.')[1];
  var n = +s;
  return n % 10 === 1 && (n % 100 < 11 || 19 < n % 100) ? one : 2 <= n % 10 && n % 10 <= 9 && (n % 100 < 11 || 19 < n % 100) ? few : f !== 0 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var v = (s + '.').split('.')[1].length;
  var f = +(s + '.').split('.')[1];
  var n = +s;
  return n % 10 === 0 || 11 <= n % 100 && n % 100 <= 19 || v === 2 && 11 <= f % 100 && f % 100 <= 19 ? zero : n % 10 === 1 && n % 100 !== 11 || v === 2 && f % 10 === 1 && f % 100 !== 11 || v !== 2 && f % 10 === 1 ? one : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var f = +(s + '.').split('.')[1];
  return v === 0 && i % 10 === 1 && i % 100 !== 11 || f % 10 === 1 && f % 100 !== 11 ? one : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var n = +s;
  return i === 1 && v === 0 ? one : v !== 0 || n === 0 || n !== 1 && 1 <= n % 100 && n % 100 <= 19 ? few : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n === 1 ? one : n === 0 || 2 <= n % 100 && n % 100 <= 10 ? few : 11 <= n % 100 && n % 100 <= 19 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return i === 1 && v === 0 ? one : v === 0 && 2 <= i % 10 && i % 10 <= 4 && (i % 100 < 12 || 14 < i % 100) ? few : v === 0 && i !== 1 && 0 <= i % 10 && i % 10 <= 1 || v === 0 && 5 <= i % 10 && i % 10 <= 9 || v === 0 && 12 <= i % 100 && i % 100 <= 14 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  return 0 <= i && i <= 1 ? one : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return v === 0 && i % 10 === 1 && i % 100 !== 11 ? one : v === 0 && 2 <= i % 10 && i % 10 <= 4 && (i % 100 < 12 || 14 < i % 100) ? few : v === 0 && i % 10 === 0 || v === 0 && 5 <= i % 10 && i % 10 <= 9 || v === 0 && 11 <= i % 100 && i % 100 <= 14 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  var n = +s;
  return i === 0 || n === 1 ? one : 2 <= n && n <= 10 ? few : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  var f = +(s + '.').split('.')[1];
  var n = +s;
  return n === 0 || n === 1 || i === 0 && f === 1 ? one : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return v === 0 && i % 100 === 1 ? one : v === 0 && i % 100 === 2 ? two : v === 0 && 3 <= i % 100 && i % 100 <= 4 || v !== 0 ? few : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return 0 <= n && n <= 1 || 11 <= n && n <= 99 ? one : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n === 1 || n === 5 || n === 7 || n === 8 || n === 9 || n === 10 ? one : n === 2 || n === 3 ? two : n === 4 ? few : n === 6 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  return i % 10 === 1 || i % 10 === 2 || i % 10 === 5 || i % 10 === 7 || i % 10 === 8 || i % 100 === 20 || i % 100 === 50 || i % 100 === 70 || i % 100 === 80 ? one : i % 10 === 3 || i % 10 === 4 || i % 1000 === 100 || i % 1000 === 200 || i % 1000 === 300 || i % 1000 === 400 || i % 1000 === 500 || i % 1000 === 600 || i % 1000 === 700 || i % 1000 === 800 || i % 1000 === 900 ? few : i === 0 || i % 10 === 6 || i % 100 === 40 || i % 100 === 60 || i % 100 === 90 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return (n % 10 === 2 || n % 10 === 3) && n % 100 !== 12 && n % 100 !== 13 ? few : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n === 1 || n === 3 ? one : n === 2 ? two : n === 4 ? few : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n === 0 || n === 7 || n === 8 || n === 9 ? zero : n === 1 ? one : n === 2 ? two : n === 3 || n === 4 ? few : n === 5 || n === 6 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n % 10 === 1 && n % 100 !== 11 ? one : n % 10 === 2 && n % 100 !== 12 ? two : n % 10 === 3 && n % 100 !== 13 ? few : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n === 1 || n === 11 ? one : n === 2 || n === 12 ? two : n === 3 || n === 13 ? few : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n === 1 ? one : n === 2 || n === 3 ? two : n === 4 ? few : n === 6 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n === 1 || n === 5 ? one : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n === 11 || n === 8 || n === 80 || n === 800 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  return i === 1 ? one : i === 0 || 2 <= i % 100 && i % 100 <= 20 || i % 100 === 40 || i % 100 === 60 || i % 100 === 80 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n % 10 === 6 || n % 10 === 9 || n % 10 === 0 && n !== 0 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var i = Math.floor(Math.abs(+s));
  return i % 10 === 1 && i % 100 !== 11 ? one : i % 10 === 2 && i % 100 !== 12 ? two : (i % 10 === 7 || i % 10 === 8) && i % 100 !== 17 && i % 100 !== 18 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n === 1 ? one : n === 2 || n === 3 ? two : n === 4 ? few : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return 1 <= n && n <= 4 ? one : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n === 1 || n === 5 || 7 <= n && n <= 9 ? one : n === 2 || n === 3 ? two : n === 4 ? few : n === 6 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n === 1 ? one : n % 10 === 4 && n % 100 !== 14 ? many : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return (n % 10 === 1 || n % 10 === 2) && n % 100 !== 11 && n % 100 !== 12 ? one : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n % 10 === 6 || n % 10 === 9 || n === 10 ? few : other;
}, function (s /*: string | number */) /*: Rule */{
  var n = +s;
  return n % 10 === 3 && n % 100 !== 13 ? few : other;
}];
var plurals = {
  af: {
    cardinal: f[0]
  },
  ak: {
    cardinal: f[1]
  },
  am: {
    cardinal: f[2]
  },
  ar: {
    cardinal: f[3]
  },
  ars: {
    cardinal: f[3]
  },
  as: {
    cardinal: f[2],
    ordinal: f[34]
  },
  asa: {
    cardinal: f[0]
  },
  ast: {
    cardinal: f[4]
  },
  az: {
    cardinal: f[0],
    ordinal: f[35]
  },
  be: {
    cardinal: f[5],
    ordinal: f[36]
  },
  bem: {
    cardinal: f[0]
  },
  bez: {
    cardinal: f[0]
  },
  bg: {
    cardinal: f[0]
  },
  bh: {
    cardinal: f[1]
  },
  bn: {
    cardinal: f[2],
    ordinal: f[34]
  },
  br: {
    cardinal: f[6]
  },
  brx: {
    cardinal: f[0]
  },
  bs: {
    cardinal: f[7]
  },
  ca: {
    cardinal: f[4],
    ordinal: f[37]
  },
  ce: {
    cardinal: f[0]
  },
  cgg: {
    cardinal: f[0]
  },
  chr: {
    cardinal: f[0]
  },
  ckb: {
    cardinal: f[0]
  },
  cs: {
    cardinal: f[8]
  },
  cy: {
    cardinal: f[9],
    ordinal: f[38]
  },
  da: {
    cardinal: f[10]
  },
  de: {
    cardinal: f[4]
  },
  dsb: {
    cardinal: f[11]
  },
  dv: {
    cardinal: f[0]
  },
  ee: {
    cardinal: f[0]
  },
  el: {
    cardinal: f[0]
  },
  en: {
    cardinal: f[4],
    ordinal: f[39]
  },
  eo: {
    cardinal: f[0]
  },
  es: {
    cardinal: f[0]
  },
  et: {
    cardinal: f[4]
  },
  eu: {
    cardinal: f[0]
  },
  fa: {
    cardinal: f[2]
  },
  ff: {
    cardinal: f[12]
  },
  fi: {
    cardinal: f[4]
  },
  fil: {
    cardinal: f[13],
    ordinal: f[0]
  },
  fo: {
    cardinal: f[0]
  },
  fr: {
    cardinal: f[12],
    ordinal: f[0]
  },
  fur: {
    cardinal: f[0]
  },
  fy: {
    cardinal: f[4]
  },
  ga: {
    cardinal: f[14],
    ordinal: f[0]
  },
  gd: {
    cardinal: f[15],
    ordinal: f[40]
  },
  gl: {
    cardinal: f[4]
  },
  gsw: {
    cardinal: f[0]
  },
  gu: {
    cardinal: f[2],
    ordinal: f[41]
  },
  guw: {
    cardinal: f[1]
  },
  gv: {
    cardinal: f[16]
  },
  ha: {
    cardinal: f[0]
  },
  haw: {
    cardinal: f[0]
  },
  he: {
    cardinal: f[17]
  },
  hi: {
    cardinal: f[2],
    ordinal: f[41]
  },
  hr: {
    cardinal: f[7]
  },
  hsb: {
    cardinal: f[11]
  },
  hu: {
    cardinal: f[0],
    ordinal: f[42]
  },
  hy: {
    cardinal: f[12],
    ordinal: f[0]
  },
  ia: {
    cardinal: f[4]
  },
  io: {
    cardinal: f[4]
  },
  is: {
    cardinal: f[18]
  },
  it: {
    cardinal: f[4],
    ordinal: f[43]
  },
  iu: {
    cardinal: f[19]
  },
  iw: {
    cardinal: f[17]
  },
  jgo: {
    cardinal: f[0]
  },
  ji: {
    cardinal: f[4]
  },
  jmc: {
    cardinal: f[0]
  },
  ka: {
    cardinal: f[0],
    ordinal: f[44]
  },
  kab: {
    cardinal: f[12]
  },
  kaj: {
    cardinal: f[0]
  },
  kcg: {
    cardinal: f[0]
  },
  kk: {
    cardinal: f[0],
    ordinal: f[45]
  },
  kkj: {
    cardinal: f[0]
  },
  kl: {
    cardinal: f[0]
  },
  kn: {
    cardinal: f[2]
  },
  ks: {
    cardinal: f[0]
  },
  ksb: {
    cardinal: f[0]
  },
  ksh: {
    cardinal: f[20]
  },
  ku: {
    cardinal: f[0]
  },
  kw: {
    cardinal: f[19]
  },
  ky: {
    cardinal: f[0]
  },
  lag: {
    cardinal: f[21]
  },
  lb: {
    cardinal: f[0]
  },
  lg: {
    cardinal: f[0]
  },
  ln: {
    cardinal: f[1]
  },
  lt: {
    cardinal: f[22]
  },
  lv: {
    cardinal: f[23]
  },
  mas: {
    cardinal: f[0]
  },
  mg: {
    cardinal: f[1]
  },
  mgo: {
    cardinal: f[0]
  },
  mk: {
    cardinal: f[24],
    ordinal: f[46]
  },
  ml: {
    cardinal: f[0]
  },
  mn: {
    cardinal: f[0]
  },
  mo: {
    cardinal: f[25],
    ordinal: f[0]
  },
  mr: {
    cardinal: f[2],
    ordinal: f[47]
  },
  mt: {
    cardinal: f[26]
  },
  nah: {
    cardinal: f[0]
  },
  naq: {
    cardinal: f[19]
  },
  nb: {
    cardinal: f[0]
  },
  nd: {
    cardinal: f[0]
  },
  ne: {
    cardinal: f[0],
    ordinal: f[48]
  },
  nl: {
    cardinal: f[4]
  },
  nn: {
    cardinal: f[0]
  },
  nnh: {
    cardinal: f[0]
  },
  no: {
    cardinal: f[0]
  },
  nr: {
    cardinal: f[0]
  },
  nso: {
    cardinal: f[1]
  },
  ny: {
    cardinal: f[0]
  },
  nyn: {
    cardinal: f[0]
  },
  om: {
    cardinal: f[0]
  },
  or: {
    cardinal: f[0],
    ordinal: f[49]
  },
  os: {
    cardinal: f[0]
  },
  pa: {
    cardinal: f[1]
  },
  pap: {
    cardinal: f[0]
  },
  pl: {
    cardinal: f[27]
  },
  prg: {
    cardinal: f[23]
  },
  ps: {
    cardinal: f[0]
  },
  pt: {
    cardinal: f[28]
  },
  'pt-PT': {
    cardinal: f[4]
  },
  rm: {
    cardinal: f[0]
  },
  ro: {
    cardinal: f[25],
    ordinal: f[0]
  },
  rof: {
    cardinal: f[0]
  },
  ru: {
    cardinal: f[29]
  },
  rwk: {
    cardinal: f[0]
  },
  saq: {
    cardinal: f[0]
  },
  sc: {
    cardinal: f[4],
    ordinal: f[43]
  },
  scn: {
    cardinal: f[4],
    ordinal: f[43]
  },
  sd: {
    cardinal: f[0]
  },
  sdh: {
    cardinal: f[0]
  },
  se: {
    cardinal: f[19]
  },
  seh: {
    cardinal: f[0]
  },
  sh: {
    cardinal: f[7]
  },
  shi: {
    cardinal: f[30]
  },
  si: {
    cardinal: f[31]
  },
  sk: {
    cardinal: f[8]
  },
  sl: {
    cardinal: f[32]
  },
  sma: {
    cardinal: f[19]
  },
  smi: {
    cardinal: f[19]
  },
  smj: {
    cardinal: f[19]
  },
  smn: {
    cardinal: f[19]
  },
  sms: {
    cardinal: f[19]
  },
  sn: {
    cardinal: f[0]
  },
  so: {
    cardinal: f[0]
  },
  sq: {
    cardinal: f[0],
    ordinal: f[50]
  },
  sr: {
    cardinal: f[7]
  },
  ss: {
    cardinal: f[0]
  },
  ssy: {
    cardinal: f[0]
  },
  st: {
    cardinal: f[0]
  },
  sv: {
    cardinal: f[4],
    ordinal: f[51]
  },
  sw: {
    cardinal: f[4]
  },
  syr: {
    cardinal: f[0]
  },
  ta: {
    cardinal: f[0]
  },
  te: {
    cardinal: f[0]
  },
  teo: {
    cardinal: f[0]
  },
  ti: {
    cardinal: f[1]
  },
  tig: {
    cardinal: f[0]
  },
  tk: {
    cardinal: f[0],
    ordinal: f[52]
  },
  tl: {
    cardinal: f[13],
    ordinal: f[0]
  },
  tn: {
    cardinal: f[0]
  },
  tr: {
    cardinal: f[0]
  },
  ts: {
    cardinal: f[0]
  },
  tzm: {
    cardinal: f[33]
  },
  ug: {
    cardinal: f[0]
  },
  uk: {
    cardinal: f[29],
    ordinal: f[53]
  },
  ur: {
    cardinal: f[4]
  },
  uz: {
    cardinal: f[0]
  },
  ve: {
    cardinal: f[0]
  },
  vo: {
    cardinal: f[0]
  },
  vun: {
    cardinal: f[0]
  },
  wa: {
    cardinal: f[1]
  },
  wae: {
    cardinal: f[0]
  },
  xh: {
    cardinal: f[0]
  },
  xog: {
    cardinal: f[0]
  },
  yi: {
    cardinal: f[4]
  },
  zu: {
    cardinal: f[2]
  },
  lo: {
    ordinal: f[0]
  },
  ms: {
    ordinal: f[0]
  },
  vi: {
    ordinal: f[0]
  }
};

(function (module, exports) {

  var formats = formatMessageFormats;
  var lookupClosestLocale$1 = lookupClosestLocale;
  var plurals$1 = plurals;

  /*::
  import type {
    AST,
    SubMessages
  } from '../format-message-parse'
  type Locale = string
  type Locales = Locale | Locale[]
  type Placeholder = any[] // https://github.com/facebook/flow/issues/4050
  export type Type = (Placeholder, Locales) => (any, ?Object) => any
  export type Types = { [string]: Type }
  */

  exports = module.exports = function interpret(ast /*: AST */, locale /*:: ?: Locales */, types /*:: ?: Types */) /*: (args?: Object) => string */{
    return interpretAST(ast, null, locale || 'en', types || {}, true);
  };
  exports.toParts = function toParts(ast /*: AST */, locale /*:: ?: Locales */, types /*:: ?: Types */) /*: (args?: Object) => any[] */{
    return interpretAST(ast, null, locale || 'en', types || {}, false);
  };
  function interpretAST(elements /*: any[] */, parent /*: ?Placeholder */, locale /*: Locales */, types /*: Types */, join /*: boolean */) /*: Function */{
    var parts = elements.map(function (element) {
      return interpretElement(element, parent, locale, types, join);
    });
    if (!join) {
      return function format(args) {
        return parts.reduce(function (parts, part) {
          return parts.concat(part(args));
        }, []);
      };
    }
    if (parts.length === 1) return parts[0];
    return function format(args) {
      var message = '';
      for (var e = 0; e < parts.length; ++e) {
        message += parts[e](args);
      }
      return message;
    };
  }
  function interpretElement(element /*: Placeholder */, parent /*: ?Placeholder */, locale /*: Locales */, types /*: Types */, join /*: boolean */) /*: Function */{
    if (typeof element === 'string') {
      var value /*: string */ = element;
      return function format() {
        return value;
      };
    }
    var id = element[0];
    var type = element[1];
    if (parent && element[0] === '#') {
      id = parent[0];
      var offset = parent[2];
      var formatter = (types.number || defaults.number)([id, 'number'], locale);
      return function format(args) {
        return formatter(getArg(id, args) - offset, args);
      };
    }

    // pre-process children
    var children;
    if (type === 'plural' || type === 'selectordinal') {
      children = {};
      Object.keys(element[3]).forEach(function (key) {
        children[key] = interpretAST(element[3][key], element, locale, types, join);
      });
      element = [element[0], element[1], element[2], children];
    } else if (element[2] && _typeof$2(element[2]) === 'object') {
      children = {};
      Object.keys(element[2]).forEach(function (key) {
        children[key] = interpretAST(element[2][key], element, locale, types, join);
      });
      element = [element[0], element[1], children];
    }
    var getFrmt = type && (types[type] || defaults[type]);
    if (getFrmt) {
      var frmt = getFrmt(element, locale);
      return function format(args) {
        return frmt(getArg(id, args), args);
      };
    }
    return join ? function format(args) {
      return String(getArg(id, args));
    } : function format(args) {
      return getArg(id, args);
    };
  }
  function getArg(id /*: string */, args /*: ?Object */) /*: any */{
    if (args && id in args) return args[id];
    var parts = id.split('.');
    var a = args;
    for (var i = 0, ii = parts.length; a && i < ii; ++i) {
      a = a[parts[i]];
    }
    return a;
  }
  function interpretNumber(element /*: Placeholder */, locales /*: Locales */) {
    var style = element[2];
    var options = formats.number[style] || formats.parseNumberPattern(style) || formats.number.default;
    return new Intl.NumberFormat(locales, options).format;
  }
  function interpretDuration(element /*: Placeholder */, locales /*: Locales */) {
    var style = element[2];
    var options = formats.duration[style] || formats.duration.default;
    var fs = new Intl.NumberFormat(locales, options.seconds).format;
    var fm = new Intl.NumberFormat(locales, options.minutes).format;
    var fh = new Intl.NumberFormat(locales, options.hours).format;
    var sep = /^fi$|^fi-|^da/.test(String(locales)) ? '.' : ':';
    return function (s, args) {
      s = +s;
      if (!isFinite(s)) return fs(s);
      var h = ~~(s / 60 / 60); // ~~ acts much like Math.trunc
      var m = ~~(s / 60 % 60);
      var dur = (h ? fh(Math.abs(h)) + sep : '') + fm(Math.abs(m)) + sep + fs(Math.abs(s % 60));
      return s < 0 ? fh(-1).replace(fh(1), dur) : dur;
    };
  }
  function interpretDateTime(element /*: Placeholder */, locales /*: Locales */) {
    var type = element[1];
    var style = element[2];
    var options = formats[type][style] || formats.parseDatePattern(style) || formats[type].default;
    return new Intl.DateTimeFormat(locales, options).format;
  }
  function interpretPlural(element /*: Placeholder */, locales /*: Locales */) {
    var type = element[1];
    var pluralType = type === 'selectordinal' ? 'ordinal' : 'cardinal';
    var offset = element[2];
    var children = element[3];
    var pluralRules;
    if (Intl.PluralRules && Intl.PluralRules.supportedLocalesOf(locales).length > 0) {
      pluralRules = new Intl.PluralRules(locales, {
        type: pluralType
      });
    } else {
      var locale = lookupClosestLocale$1(locales, plurals$1);
      var select = locale && plurals$1[locale][pluralType] || returnOther;
      pluralRules = {
        select: select
      };
    }
    return function (value, args) {
      var clause = children['=' + +value] || children[pluralRules.select(value - offset)] || children.other;
      return clause(args);
    };
  }
  function returnOther( /*:: n:number */) {
    return 'other';
  }
  function interpretSelect(element /*: Placeholder */, locales /*: Locales */) {
    var children = element[2];
    return function (value, args) {
      var clause = children[value] || children.other;
      return clause(args);
    };
  }
  var defaults /*: Types */ = {
    number: interpretNumber,
    ordinal: interpretNumber,
    // TODO: support rbnf
    spellout: interpretNumber,
    // TODO: support rbnf
    duration: interpretDuration,
    date: interpretDateTime,
    time: interpretDateTime,
    plural: interpretPlural,
    selectordinal: interpretPlural,
    select: interpretSelect
  };
  exports.types = defaults;
})(formatMessageInterpret, formatMessageInterpret.exports);

(function (module, exports) {

  var parse = formatMessageParse.exports;
  var interpret = formatMessageInterpret.exports;
  var plurals$1 = plurals;
  var lookupClosestLocale$1 = lookupClosestLocale;
  var origFormats = formatMessageFormats;

  /*::
  import type { Types } from 'format-message-interpret'
  type Locale = string
  type Locales = Locale | Locale[]
  type Message = string | {|
    id?: string,
    default: string,
    description?: string
  |}
  type Translations = { [string]: ?{ [string]: string | Translation } }
  type Translation = {
    message: string,
    format?: (args?: Object) => string,
    toParts?: (args?: Object) => any[],
  }
  type Replacement = ?string | (string, string, locales?: Locales) => ?string
  type GenerateId = (string) => string
  type MissingTranslation = 'ignore' | 'warning' | 'error'
  type FormatObject = { [string]: * }
  type Options = {
    locale?: Locales,
    translations?: ?Translations,
    generateId?: GenerateId,
    missingReplacement?: Replacement,
    missingTranslation?: MissingTranslation,
    formats?: {
      number?: FormatObject,
      date?: FormatObject,
      time?: FormatObject
    },
    types?: Types
  }
  type Setup = {|
    locale: Locales,
    translations: Translations,
    generateId: GenerateId,
    missingReplacement: Replacement,
    missingTranslation: MissingTranslation,
    formats: {
      number: FormatObject,
      date: FormatObject,
      time: FormatObject
    },
    types: Types
  |}
  type FormatMessage = {
    (msg: Message, args?: Object, locales?: Locales): string,
    rich (msg: Message, args?: Object, locales?: Locales): any[],
    setup (opt?: Options): Setup,
    number (value: number, style?: string, locales?: Locales): string,
    date (value: number | Date, style?: string, locales?: Locales): string,
    time (value: number | Date, style?: string, locales?: Locales): string,
    select (value: any, options: Object): any,
    custom (placeholder: any[], locales: Locales, value: any, args: Object): any,
    plural (value: number, offset: any, options: any, locale: any): any,
    selectordinal (value: number, offset: any, options: any, locale: any): any,
    namespace (): FormatMessage
  }
  */

  function assign /*:: <T: Object> */(target /*: T */, source /*: Object */) {
    Object.keys(source).forEach(function (key) {
      target[key] = source[key];
    });
    return target;
  }
  function namespace() /*: FormatMessage */{
    var formats = assign({}, origFormats);
    var currentLocales /*: Locales */ = 'en';
    var translations /*: Translations */ = {};
    var generateId /*: GenerateId */ = function generateId(pattern) {
      return pattern;
    };
    var missingReplacement /*: Replacement */ = null;
    var missingTranslation /*: MissingTranslation */ = 'warning';
    var types /*: Types */ = {};
    function formatMessage(msg /*: Message */, args /*:: ?: Object */, locales /*:: ?: Locales */) {
      var pattern = typeof msg === 'string' ? msg : msg.default;
      var id = _typeof$2(msg) === 'object' && msg.id || generateId(pattern);
      var translated = translate(pattern, id, locales || currentLocales);
      var format = translated.format || (translated.format = interpret(parse(translated.message), locales || currentLocales, types));
      return format(args);
    }
    formatMessage.rich = function rich(msg /*: Message */, args /*:: ?: Object */, locales /*:: ?: Locales */) {
      var pattern = typeof msg === 'string' ? msg : msg.default;
      var id = _typeof$2(msg) === 'object' && msg.id || generateId(pattern);
      var translated = translate(pattern, id, locales || currentLocales);
      var format = translated.toParts || (translated.toParts = interpret.toParts(parse(translated.message, {
        tagsType: tagsType
      }), locales || currentLocales, types));
      return format(args);
    };
    var tagsType = '<>';
    function richType(node /*: any[] */, locales /*: Locales */) {
      var style = node[2];
      return function (fn, args) {
        var props = _typeof$2(style) === 'object' ? mapObject(style, args) : style;
        return typeof fn === 'function' ? fn(props) : fn;
      };
    }
    types[tagsType] = richType;
    function mapObject(object /* { [string]: (args?: Object) => any } */, args /*: ?Object */) {
      return Object.keys(object).reduce(function (mapped, key) {
        mapped[key] = object[key](args);
        return mapped;
      }, {});
    }
    function translate(pattern /*: string */, id /*: string */, locales /*: Locales */) /*: Translation */{
      var locale = lookupClosestLocale$1(locales, translations) || 'en';
      var messages = translations[locale] || (translations[locale] = {});
      var translated = messages[id];
      if (typeof translated === 'string') {
        translated = messages[id] = {
          message: translated
        };
      }
      if (!translated) {
        var message = 'Translation for "' + id + '" in "' + locale + '" is missing';
        if (missingTranslation === 'warning') {
          /* istanbul ignore else */
          if (typeof console !== 'undefined') console.warn(message);
        } else if (missingTranslation !== 'ignore') {
          // 'error'
          throw new Error(message);
        }
        var replacement = typeof missingReplacement === 'function' ? missingReplacement(pattern, id, locale) || pattern : missingReplacement || pattern;
        translated = messages[id] = {
          message: replacement
        };
      }
      return translated;
    }
    formatMessage.setup = function setup(opt /*:: ?: Options */) {
      opt = opt || {};
      if (opt.locale) currentLocales = opt.locale;
      if ('translations' in opt) translations = opt.translations || {};
      if (opt.generateId) generateId = opt.generateId;
      if ('missingReplacement' in opt) missingReplacement = opt.missingReplacement;
      if (opt.missingTranslation) missingTranslation = opt.missingTranslation;
      if (opt.formats) {
        if (opt.formats.number) assign(formats.number, opt.formats.number);
        if (opt.formats.date) assign(formats.date, opt.formats.date);
        if (opt.formats.time) assign(formats.time, opt.formats.time);
      }
      if (opt.types) {
        types = opt.types;
        types[tagsType] = richType;
      }
      return {
        locale: currentLocales,
        translations: translations,
        generateId: generateId,
        missingReplacement: missingReplacement,
        missingTranslation: missingTranslation,
        formats: formats,
        types: types
      };
    };
    formatMessage.number = function (value /*: number */, style /*:: ?: string */, locales /*:: ?: Locales */) {
      var options = style && formats.number[style] || formats.parseNumberPattern(style) || formats.number.default;
      return new Intl.NumberFormat(locales || currentLocales, options).format(value);
    };
    formatMessage.date = function (value /*:: ?: number | Date */, style /*:: ?: string */, locales /*:: ?: Locales */) {
      var options = style && formats.date[style] || formats.parseDatePattern(style) || formats.date.default;
      return new Intl.DateTimeFormat(locales || currentLocales, options).format(value);
    };
    formatMessage.time = function (value /*:: ?: number | Date */, style /*:: ?: string */, locales /*:: ?: Locales */) {
      var options = style && formats.time[style] || formats.parseDatePattern(style) || formats.time.default;
      return new Intl.DateTimeFormat(locales || currentLocales, options).format(value);
    };
    formatMessage.select = function (value /*: any */, options /*: Object */) {
      return options[value] || options.other;
    };
    formatMessage.custom = function (placeholder /*: any[] */, locales /*: Locales */, value /*: any */, args /*: Object */) {
      if (!(placeholder[1] in types)) return value;
      return types[placeholder[1]](placeholder, locales)(value, args);
    };
    formatMessage.plural = plural.bind(null, 'cardinal');
    formatMessage.selectordinal = plural.bind(null, 'ordinal');
    function plural(pluralType /*: 'cardinal' | 'ordinal' */, value /*: number */, offset /*: any */, options /*: any */, locale /*: any */) {
      if (_typeof$2(offset) === 'object' && _typeof$2(options) !== 'object') {
        // offset is optional
        locale = options;
        options = offset;
        offset = 0;
      }
      var closest = lookupClosestLocale$1(locale || currentLocales, plurals$1);
      var plural = closest && plurals$1[closest][pluralType] || returnOther;
      return options['=' + +value] || options[plural(value - offset)] || options.other;
    }
    function returnOther( /*:: n:number */) {
      return 'other';
    }
    formatMessage.namespace = namespace;
    return formatMessage;
  }
  module.exports = namespace();
})(formatMessage$1);

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof$2(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

var JSONRPC$1 = /*#__PURE__*/function () {
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
  _createClass(JSONRPC, [{
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
    value: function didReceiveCall( /* method , params */
    ) {
      throw new Error('Must override didReceiveCall');
    }
  }, {
    key: "_sendMessage",
    value: function _sendMessage( /* jsonMessageObject */
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
  return JSONRPC;
}();
var jsonrpc = JSONRPC$1;

function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var JSONRPC = jsonrpc;
var BLE$1 = /*#__PURE__*/function (_JSONRPC) {
  _inherits(BLE, _JSONRPC);
  /**
   * A BLE peripheral socket object.  It handles connecting, over web sockets, to
   * BLE peripherals, and reading and writing data to them.
   * @param {Runtime} runtime - the Runtime for sending/receiving GUI update events.
   * @param {string} extensionId - the id of the extension using this socket.
   * @param {object} peripheralOptions - the list of options for peripheral discovery.
   * @param {object} connectCallback - a callback for connection.
   * @param {object} resetCallback - a callback for resetting extension state.
   */
  function BLE(runtime, extensionId, peripheralOptions, connectCallback) {
    var _this;
    var resetCallback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    _classCallCheck(this, BLE);
    _this = _callSuper(this, BLE);
    _this._socket = runtime.getScratchLinkSocket('BLE');
    _this._socket.setOnOpen(_this.requestPeripheral.bind(_assertThisInitialized(_this)));
    _this._socket.setOnClose(_this.handleDisconnectError.bind(_assertThisInitialized(_this)));
    _this._socket.setOnError(_this._handleRequestError.bind(_assertThisInitialized(_this)));
    _this._socket.setHandleMessage(_this._handleMessage.bind(_assertThisInitialized(_this)));
    _this._sendMessage = _this._socket.sendMessage.bind(_this._socket);
    _this._availablePeripherals = {};
    _this._connectCallback = connectCallback;
    _this._connected = false;
    _this._characteristicDidChangeCallback = null;
    _this._resetCallback = resetCallback;
    _this._discoverTimeoutID = null;
    _this._extensionId = extensionId;
    _this._peripheralOptions = peripheralOptions;
    _this._runtime = runtime;
    _this._socket.open();
    return _this;
  }

  /**
   * Request connection to the peripheral.
   * If the web socket is not yet open, request when the socket promise resolves.
   */
  _createClass(BLE, [{
    key: "requestPeripheral",
    value: function requestPeripheral() {
      var _this2 = this;
      this._availablePeripherals = {};
      if (this._discoverTimeoutID) {
        window.clearTimeout(this._discoverTimeoutID);
      }
      this._discoverTimeoutID = window.setTimeout(this._handleDiscoverTimeout.bind(this), 15000);
      this.sendRemoteRequest('discover', this._peripheralOptions).catch(function (e) {
        _this2._handleRequestError(e);
      });
    }

    /**
     * Try connecting to the input peripheral id, and then call the connect
     * callback if connection is successful.
     * @param {number} id - the id of the peripheral to connect to
     */
  }, {
    key: "connectPeripheral",
    value: function connectPeripheral(id) {
      var _this3 = this;
      this.sendRemoteRequest('connect', {
        peripheralId: id
      }).then(function () {
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

    /**
     * Start receiving notifications from the specified ble service.
     * @param {number} serviceId - the ble service to read.
     * @param {number} characteristicId - the ble characteristic to get notifications from.
     * @param {object} onCharacteristicChanged - callback for characteristic change notifications.
     * @return {Promise} - a promise from the remote startNotifications request.
     */
  }, {
    key: "startNotifications",
    value: function startNotifications(serviceId, characteristicId) {
      var _this4 = this;
      var onCharacteristicChanged = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var params = {
        serviceId: serviceId,
        characteristicId: characteristicId
      };
      this._characteristicDidChangeCallback = onCharacteristicChanged;
      return this.sendRemoteRequest('startNotifications', params).catch(function (e) {
        _this4.handleDisconnectError(e);
      });
    }

    /**
     * Read from the specified ble service.
     * @param {number} serviceId - the ble service to read.
     * @param {number} characteristicId - the ble characteristic to read.
     * @param {boolean} optStartNotifications - whether to start receiving characteristic change notifications.
     * @param {object} onCharacteristicChanged - callback for characteristic change notifications.
     * @return {Promise} - a promise from the remote read request.
     */
  }, {
    key: "read",
    value: function read(serviceId, characteristicId) {
      var _this5 = this;
      var optStartNotifications = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var onCharacteristicChanged = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var params = {
        serviceId: serviceId,
        characteristicId: characteristicId
      };
      if (optStartNotifications) {
        params.startNotifications = true;
      }
      if (onCharacteristicChanged) {
        this._characteristicDidChangeCallback = onCharacteristicChanged;
      }
      return this.sendRemoteRequest('read', params).catch(function (e) {
        _this5.handleDisconnectError(e);
      });
    }

    /**
     * Write data to the specified ble service.
     * @param {number} serviceId - the ble service to write.
     * @param {number} characteristicId - the ble characteristic to write.
     * @param {string} message - the message to send.
     * @param {string} encoding - the message encoding type.
     * @param {boolean} withResponse - if true, resolve after peripheral's response.
     * @return {Promise} - a promise from the remote send request.
     */
  }, {
    key: "write",
    value: function write(serviceId, characteristicId, message) {
      var _this6 = this;
      var encoding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var withResponse = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var params = {
        serviceId: serviceId,
        characteristicId: characteristicId,
        message: message
      };
      if (encoding) {
        params.encoding = encoding;
      }
      if (withResponse !== null) {
        params.withResponse = withResponse;
      }
      return this.sendRemoteRequest('write', params).catch(function (e) {
        _this6.handleDisconnectError(e);
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
        case 'characteristicDidChange':
          if (this._characteristicDidChangeCallback) {
            this._characteristicDidChangeCallback(params.message);
          }
          break;
        case 'ping':
          return 42;
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
    value: function handleDisconnectError( /* e */
    ) {
      // log.error(`BLE error: ${JSON.stringify(e)}`);

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
    value: function _handleRequestError( /* e */
    ) {
      // log.error(`BLE error: ${JSON.stringify(e)}`);

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
  return BLE;
}(JSONRPC);
var ble = BLE$1;

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
      if ('object' === _typeof$2(w.base64js)) {
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

var btoa$1 = {exports: {}};

(function () {

  function btoa(str) {
    var buffer;
    if (str instanceof Buffer) {
      buffer = str;
    } else {
      buffer = Buffer.from(str.toString(), 'binary');
    }
    return buffer.toString('base64');
  }
  btoa$1.exports = btoa;
})();

var atob = browserAtob.exports;
var btoa = btoa$1.exports;
var Base64Util$1 = /*#__PURE__*/function () {
  function Base64Util() {
    _classCallCheck(this, Base64Util);
  }
  _createClass(Base64Util, null, [{
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
  return Base64Util;
}();
var base64Util = Base64Util$1;

var MathUtil$1 = /*#__PURE__*/function () {
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
var mathUtil = MathUtil$1;

var Timer$1 = /*#__PURE__*/function () {
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
  _createClass(Timer, [{
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
  return Timer;
}();
var timer = Timer$1;

var Timer = timer;
var RateLimiter$1 = /*#__PURE__*/function () {
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
  _createClass(RateLimiter, [{
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
  return RateLimiter;
}();
var rateLimiter = RateLimiter$1;

var web = {exports: {}};

var minilog$2 = {exports: {}};

function M() {
  this._events = {};
}
M.prototype = {
  on: function on(ev, cb) {
    this._events || (this._events = {});
    var e = this._events;
    (e[ev] || (e[ev] = [])).push(cb);
    return this;
  },
  removeListener: function removeListener(ev, cb) {
    var e = this._events[ev] || [],
      i;
    for (i = e.length - 1; i >= 0 && e[i]; i--) {
      if (e[i] === cb || e[i].cb === cb) {
        e.splice(i, 1);
      }
    }
  },
  removeAllListeners: function removeAllListeners(ev) {
    if (!ev) {
      this._events = {};
    } else {
      this._events[ev] && (this._events[ev] = []);
    }
  },
  listeners: function listeners(ev) {
    return this._events ? this._events[ev] || [] : [];
  },
  emit: function emit(ev) {
    this._events || (this._events = {});
    var args = Array.prototype.slice.call(arguments, 1),
      i,
      e = this._events[ev] || [];
    for (i = e.length - 1; i >= 0 && e[i]; i--) {
      e[i].apply(this, args);
    }
    return this;
  },
  when: function when(ev, cb) {
    return this.once(ev, cb, true);
  },
  once: function once(ev, cb, when) {
    if (!cb) return this;
    function c() {
      if (!when) this.removeListener(ev, c);
      if (cb.apply(this, arguments) && when) this.removeListener(ev, c);
    }
    c.cb = cb;
    this.on(ev, c);
    return this;
  }
};
M.mixin = function (dest) {
  var o = M.prototype,
    k;
  for (k in o) {
    o.hasOwnProperty(k) && (dest.prototype[k] = o[k]);
  }
};
var microee$1 = M;

var microee = microee$1;

// Implements a subset of Node's stream.Transform - in a cross-platform manner.
function Transform$7() {}
microee.mixin(Transform$7);

// The write() signature is different from Node's
// --> makes it much easier to work with objects in logs.
// One of the lessons from v1 was that it's better to target
// a good browser rather than the lowest common denominator
// internally.
// If you want to use external streams, pipe() to ./stringify.js first.
Transform$7.prototype.write = function (name, level, args) {
  this.emit('item', name, level, args);
};
Transform$7.prototype.end = function () {
  this.emit('end');
  this.removeAllListeners();
};
Transform$7.prototype.pipe = function (dest) {
  var s = this;
  // prevent double piping
  s.emit('unpipe', dest);
  // tell the dest that it's being piped to
  dest.emit('pipe', s);
  function onItem() {
    dest.write.apply(dest, Array.prototype.slice.call(arguments));
  }
  function onEnd() {
    !dest._isStdio && dest.end();
  }
  s.on('item', onItem);
  s.on('end', onEnd);
  s.when('unpipe', function (from) {
    var match = from === dest || typeof from == 'undefined';
    if (match) {
      s.removeListener('item', onItem);
      s.removeListener('end', onEnd);
      dest.emit('unpipe');
    }
    return match;
  });
  return dest;
};
Transform$7.prototype.unpipe = function (from) {
  this.emit('unpipe', from);
  return this;
};
Transform$7.prototype.format = function (dest) {
  throw new Error(['Warning: .format() is deprecated in Minilog v2! Use .pipe() instead. For example:', 'var Minilog = require(\'minilog\');', 'Minilog', '  .pipe(Minilog.backends.console.formatClean)', '  .pipe(Minilog.backends.console);'].join('\n'));
};
Transform$7.mixin = function (dest) {
  var o = Transform$7.prototype,
    k;
  for (k in o) {
    o.hasOwnProperty(k) && (dest.prototype[k] = o[k]);
  }
};
var transform = Transform$7;

// default filter
var Transform$6 = transform;
var levelMap = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4
};
function Filter() {
  this.enabled = true;
  this.defaultResult = true;
  this.clear();
}
Transform$6.mixin(Filter);

// allow all matching, with level >= given level
Filter.prototype.allow = function (name, level) {
  this._white.push({
    n: name,
    l: levelMap[level]
  });
  return this;
};

// deny all matching, with level <= given level
Filter.prototype.deny = function (name, level) {
  this._black.push({
    n: name,
    l: levelMap[level]
  });
  return this;
};
Filter.prototype.clear = function () {
  this._white = [];
  this._black = [];
  return this;
};
function test(rule, name) {
  // use .test for RegExps
  return rule.n.test ? rule.n.test(name) : rule.n == name;
}
Filter.prototype.test = function (name, level) {
  var i,
    len = Math.max(this._white.length, this._black.length);
  for (i = 0; i < len; i++) {
    if (this._white[i] && test(this._white[i], name) && levelMap[level] >= this._white[i].l) {
      return true;
    }
    if (this._black[i] && test(this._black[i], name) && levelMap[level] <= this._black[i].l) {
      return false;
    }
  }
  return this.defaultResult;
};
Filter.prototype.write = function (name, level, args) {
  if (!this.enabled || this.test(name, level)) {
    return this.emit('item', name, level, args);
  }
};
var filter = Filter;

(function (module, exports) {
  var Transform = transform,
    Filter = filter;
  var log = new Transform(),
    slice = Array.prototype.slice;
  exports = module.exports = function create(name) {
    var o = function o() {
      log.write(name, undefined, slice.call(arguments));
      return o;
    };
    o.debug = function () {
      log.write(name, 'debug', slice.call(arguments));
      return o;
    };
    o.info = function () {
      log.write(name, 'info', slice.call(arguments));
      return o;
    };
    o.warn = function () {
      log.write(name, 'warn', slice.call(arguments));
      return o;
    };
    o.error = function () {
      log.write(name, 'error', slice.call(arguments));
      return o;
    };
    o.log = o.debug; // for interface compliance with Node and browser consoles
    o.suggest = exports.suggest;
    o.format = log.format;
    return o;
  };

  // filled in separately
  exports.defaultBackend = exports.defaultFormatter = null;
  exports.pipe = function (dest) {
    return log.pipe(dest);
  };
  exports.end = exports.unpipe = exports.disable = function (from) {
    return log.unpipe(from);
  };
  exports.Transform = Transform;
  exports.Filter = Filter;
  // this is the default filter that's applied when .enable() is called normally
  // you can bypass it completely and set up your own pipes
  exports.suggest = new Filter();
  exports.enable = function () {
    if (exports.defaultFormatter) {
      return log.pipe(exports.suggest) // filter
      .pipe(exports.defaultFormatter) // formatter
      .pipe(exports.defaultBackend); // backend
    }
    return log.pipe(exports.suggest) // filter
    .pipe(exports.defaultBackend); // formatter
  };
})(minilog$2, minilog$2.exports);

var hex = {
  black: '#000',
  red: '#c23621',
  green: '#25bc26',
  yellow: '#bbbb00',
  blue: '#492ee1',
  magenta: '#d338d3',
  cyan: '#33bbc8',
  gray: '#808080',
  purple: '#708'
};
function color$3(fg, isInverse) {
  if (isInverse) {
    return 'color: #fff; background: ' + hex[fg] + ';';
  } else {
    return 'color: ' + hex[fg] + ';';
  }
}
var util = color$3;

var Transform$5 = transform,
  color$2 = util;
var colors$1 = {
    debug: ['cyan'],
    info: ['purple'],
    warn: ['yellow', true],
    error: ['red', true]
  },
  logger$4 = new Transform$5();
logger$4.write = function (name, level, args) {
  var fn = console.log;
  if (console[level] && console[level].apply) {
    fn = console[level];
    fn.apply(console, ['%c' + name + ' %c' + level, color$2('gray'), color$2.apply(color$2, colors$1[level])].concat(args));
  }
};

// NOP, because piping the formatted logs can only cause trouble.
logger$4.pipe = function () {};
var color_1 = logger$4;

var Transform$4 = transform,
  color$1 = util,
  colors = {
    debug: ['gray'],
    info: ['purple'],
    warn: ['yellow', true],
    error: ['red', true]
  },
  logger$3 = new Transform$4();
logger$3.write = function (name, level, args) {
  var fn = console.log;
  if (level != 'debug' && console[level]) {
    fn = console[level];
  }
  var i = 0;
  if (level != 'info') {
    for (; i < args.length; i++) {
      if (typeof args[i] != 'string') break;
    }
    fn.apply(console, ['%c' + name + ' ' + args.slice(0, i).join(' '), color$1.apply(color$1, colors[level])].concat(args.slice(i)));
  } else {
    fn.apply(console, ['%c' + name, color$1.apply(color$1, colors[level])].concat(args));
  }
};

// NOP, because piping the formatted logs can only cause trouble.
logger$3.pipe = function () {};
var minilog$1 = logger$3;

var Transform$3 = transform;
var newlines = /\n+$/,
  logger$2 = new Transform$3();
logger$2.write = function (name, level, args) {
  var i = args.length - 1;
  if (typeof console === 'undefined' || !console.log) {
    return;
  }
  if (console.log.apply) {
    return console.log.apply(console, [name, level].concat(args));
  } else if (JSON && JSON.stringify) {
    // console.log.apply is undefined in IE8 and IE9
    // for IE8/9: make console.log at least a bit less awful
    if (args[i] && typeof args[i] == 'string') {
      args[i] = args[i].replace(newlines, '');
    }
    try {
      for (i = 0; i < args.length; i++) {
        args[i] = JSON.stringify(args[i]);
      }
    } catch (e) {}
    console.log(args.join(' '));
  }
};
logger$2.formatters = ['color', 'minilog'];
logger$2.color = color_1;
logger$2.minilog = minilog$1;
var console_1 = logger$2;

var Transform$2 = transform,
  cache$1 = [];
var logger$1 = new Transform$2();
logger$1.write = function (name, level, args) {
  cache$1.push([name, level, args]);
};

// utility functions
logger$1.get = function () {
  return cache$1;
};
logger$1.empty = function () {
  cache$1 = [];
};
var array = logger$1;

var Transform$1 = transform,
  cache = false;
var logger = new Transform$1();
logger.write = function (name, level, args) {
  if (typeof window == 'undefined' || typeof JSON == 'undefined' || !JSON.stringify || !JSON.parse) return;
  try {
    if (!cache) {
      cache = window.localStorage.minilog ? JSON.parse(window.localStorage.minilog) : [];
    }
    cache.push([new Date().toString(), name, level, args]);
    window.localStorage.minilog = JSON.stringify(cache);
  } catch (e) {}
};
var localstorage = logger;

var Transform = transform;
var cid = new Date().valueOf().toString(36);
function AjaxLogger(options) {
  this.url = options.url || '';
  this.cache = [];
  this.timer = null;
  this.interval = options.interval || 30 * 1000;
  this.enabled = true;
  this.jQuery = window.jQuery;
  this.extras = {};
}
Transform.mixin(AjaxLogger);
AjaxLogger.prototype.write = function (name, level, args) {
  if (!this.timer) {
    this.init();
  }
  this.cache.push([name, level].concat(args));
};
AjaxLogger.prototype.init = function () {
  if (!this.enabled || !this.jQuery) return;
  var self = this;
  this.timer = setTimeout(function () {
    var i,
      logs = [],
      ajaxData,
      url = self.url;
    if (self.cache.length == 0) return self.init();
    // Test each log line and only log the ones that are valid (e.g. don't have circular references).
    // Slight performance hit but benefit is we log all valid lines.
    for (i = 0; i < self.cache.length; i++) {
      try {
        JSON.stringify(self.cache[i]);
        logs.push(self.cache[i]);
      } catch (e) {}
    }
    if (self.jQuery.isEmptyObject(self.extras)) {
      ajaxData = JSON.stringify({
        logs: logs
      });
      url = self.url + '?client_id=' + cid;
    } else {
      ajaxData = JSON.stringify(self.jQuery.extend({
        logs: logs
      }, self.extras));
    }
    self.jQuery.ajax(url, {
      type: 'POST',
      cache: false,
      processData: false,
      data: ajaxData,
      contentType: 'application/json',
      timeout: 10000
    }).success(function (data, status, jqxhr) {
      if (data.interval) {
        self.interval = Math.max(1000, data.interval);
      }
    }).error(function () {
      self.interval = 30000;
    }).always(function () {
      self.init();
    });
    self.cache = [];
  }, this.interval);
};
AjaxLogger.prototype.end = function () {};

// wait until jQuery is defined. Useful if you don't control the load order.
AjaxLogger.jQueryWait = function (onDone) {
  if (typeof window !== 'undefined' && (window.jQuery || window.$)) {
    return onDone(window.jQuery || window.$);
  } else if (typeof window !== 'undefined') {
    setTimeout(function () {
      AjaxLogger.jQueryWait(onDone);
    }, 200);
  }
};
var jquery_simple = AjaxLogger;

(function (module, exports) {
  var Minilog = minilog$2.exports;
  var oldEnable = Minilog.enable,
    oldDisable = Minilog.disable,
    isChrome = typeof navigator != 'undefined' && /chrome/i.test(navigator.userAgent),
    console = console_1;

  // Use a more capable logging backend if on Chrome
  Minilog.defaultBackend = isChrome ? console.minilog : console;

  // apply enable inputs from localStorage and from the URL
  if (typeof window != 'undefined') {
    try {
      Minilog.enable(JSON.parse(window.localStorage['minilogSettings']));
    } catch (e) {}
    if (window.location && window.location.search) {
      var match = RegExp('[?&]minilog=([^&]*)').exec(window.location.search);
      match && Minilog.enable(decodeURIComponent(match[1]));
    }
  }

  // Make enable also add to localStorage
  Minilog.enable = function () {
    oldEnable.call(Minilog, true);
    try {
      window.localStorage['minilogSettings'] = JSON.stringify(true);
    } catch (e) {}
    return this;
  };
  Minilog.disable = function () {
    oldDisable.call(Minilog);
    try {
      delete window.localStorage.minilogSettings;
    } catch (e) {}
    return this;
  };
  exports = module.exports = Minilog;
  exports.backends = {
    array: array,
    browser: Minilog.defaultBackend,
    localStorage: localstorage,
    jQuery: jquery_simple
  };
})(web, web.exports);

var minilog = web.exports;
minilog.enable();
var log$1 = minilog('vm');

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var ArgumentType = argumentType;
var BlockType = blockType;
var Cast = cast;
var formatMessage = formatMessage$1.exports;
var color = color$4;
var BLE = ble;
var Base64Util = base64Util;
var MathUtil = mathUtil;
var RateLimiter = rateLimiter;
var log = log$1;

/**
 * LEGO Boost Enhanced Extension
 * 
 * This extension provides comprehensive support for LEGO Boost devices, including:
 * - All original Boost functionality (100% backward compatible)
 * - Enhanced motor control with acceleration/deceleration profiles
 * - Multi-mode color/distance sensor support
 * - SPIKE Prime Force Sensor compatibility
 * - Advanced hub monitoring and control
 * - Proper LEGO Wireless Protocol 3.0.00 compliance
 * 
 * Protocol documentation: https://lego.github.io/lego-ble-wireless-protocol-docs/
 */

// ============================================================================
// CONSTANTS AND CONFIGURATION
// ============================================================================

/**
 * Icon displayed for Boost blocks
 */
var iconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACpQTFRF////fIel5ufolZ62/2YavsPS+YZOkJmy9/j53+Hk6+zs6N/b6dfO////tDhMHAAAAA50Uk5T/////////////////wBFwNzIAAAA6ElEQVR42uzX2w6DIBAEUGDVtlr//3dLaLwgiwUd2z7MJPJg5EQWiGhGcAxBggQJEiT436CIfqXJPTn3MKNYYMSDFpoAmp24OaYgvwKnFgL2zvVTCwHrMoMi+nUQLFthaNCCa0iwclLkDgYVsQp0mzxuqXgK1MRzoCLWgkPXNN2wI/q6Kvt7u/cX0HtejN8x2sXpnpb8J8D3b0Keuhh3X975M+i0xNVbg3s1TIasgK21bQyGO+s2PykaGMYbge8KrNrssvkOWDXkErB8UuBHETjoYLkKBA8ZfuDkbwVBggQJEiR4MC8BBgDTtMZLx2nFCQAAAABJRU5ErkJggg==';

/**
 * Boost BLE communication settings
 */
var BoostBLE = {
  service: '00001623-1212-efde-1623-785feabcd123',
  characteristic: '00001624-1212-efde-1623-785feabcd123',
  sendInterval: 100,
  sendRateMax: 20
};

/**
 * Configuration constants
 */
var BoostMotorMaxPowerAdd = 10; // Additional power for reaching target speed faster
var BoostPingInterval = 5000; // Battery check interval
var BoostColorSampleSize = 5; // Number of samples for stable color detection

/**
 * Supported device types (based on real-world compatibility)
 * @readonly
 * @enum {number}
 */
var BoostIO = {
  MOTOR_WEDO: 0x01,
  // Legacy reference (not used in practice)
  MOTOR_SYSTEM: 0x02,
  // System train motor
  BUTTON: 0x05,
  // Hub button
  LIGHT: 0x08,
  // Simple light
  VOLTAGE: 0x14,
  // Voltage sensor
  CURRENT: 0x15,
  // Current sensor
  PIEZO: 0x16,
  // Piezo sound
  LED: 0x17,
  // RGB LED
  TILT_EXTERNAL: 0x22,
  // External tilt sensor
  MOTION_SENSOR: 0x23,
  // Motion sensor
  COLOR: 0x25,
  // Boost Color & Distance Sensor
  MOTOREXT: 0x26,
  // External motor with tacho
  MOTORINT: 0x27,
  // Internal motor with tacho
  TILT: 0x28,
  // Internal tilt sensor
  TECHNIC_FORCE_SENSOR: 0x3f // SPIKE Prime Force Sensor (63)
};

/**
 * Port feedback states
 * @readonly
 * @enum {number}
 */
var BoostPortFeedback = {
  IN_PROGRESS: 0x01,
  COMPLETED: 0x02,
  DISCARDED: 0x04,
  IDLE: 0x08,
  BUSY_OR_FULL: 0x10
};

/**
 * Physical port mappings (firmware version dependent)
 * @readonly
 * @enum {number}
 */
var BoostPort10000223OrOlder = {
  A: 55,
  B: 56,
  C: 1,
  D: 2
};
var BoostPort10000224OrNewer = {
  A: 0,
  B: 1,
  C: 2,
  D: 3
};

// Default to newer firmware mapping
var BoostPort = BoostPort10000224OrNewer;

/**
 * Color definitions and indices
 * @readonly
 */
var BoostColor = {
  ANY: 'any',
  NONE: 'none',
  RED: 'red',
  BLUE: 'blue',
  GREEN: 'green',
  YELLOW: 'yellow',
  WHITE: 'white',
  BLACK: 'black'
};
var BoostColorIndex = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, BoostColor.NONE, 255), BoostColor.RED, 9), BoostColor.BLUE, 3), BoostColor.GREEN, 5), BoostColor.YELLOW, 7), BoostColor.WHITE, 10), BoostColor.BLACK, 0);

/**
 * Protocol message types
 * @readonly
 * @enum {number}
 */
var BoostMessage = {
  HUB_PROPERTIES: 0x01,
  HUB_ACTIONS: 0x02,
  HUB_ALERTS: 0x03,
  HUB_ATTACHED_IO: 0x04,
  ERROR: 0x05,
  PORT_INPUT_FORMAT_SETUP_SINGLE: 0x41,
  PORT_INPUT_FORMAT_SETUP_COMBINED: 0x42,
  PORT_INFORMATION: 0x43,
  PORT_MODEINFORMATION: 0x44,
  PORT_VALUE: 0x45,
  PORT_VALUE_COMBINED: 0x46,
  PORT_INPUT_FORMAT: 0x47,
  PORT_INPUT_FORMAT_COMBINED: 0x48,
  OUTPUT: 0x81,
  PORT_FEEDBACK: 0x82
};

/**
 * Hub properties and operations
 * @readonly
 */
var BoostHubProperty = {
  ADVERTISEMENT_NAME: 0x01,
  BUTTON: 0x02,
  FW_VERSION: 0x03,
  HW_VERSION: 0x04,
  RSSI: 0x05,
  BATTERY_VOLTAGE: 0x06,
  BATTERY_TYPE: 0x07,
  MANUFACTURER_NAME: 0x08,
  RADIO_FW_VERSION: 0x09,
  LEGO_WP_VERSION: 0x0A,
  SYSTEM_TYPE_ID: 0x0B,
  HW_NETWORK_ID: 0x0C,
  PRIMARY_MAC: 0x0D,
  SECONDARY_MAC: 0x0E,
  HW_NETWORK_FAMILY: 0x0F
};
var BoostHubPropertyOperation = {
  SET: 0x01,
  ENABLE_UPDATES: 0x02,
  DISABLE_UPDATES: 0x03,
  RESET: 0x04,
  REQUEST_UPDATE: 0x05,
  UPDATE: 0x06
};
var BoostHubAction = {
  SWITCH_OFF_HUB: 0x01,
  DISCONNECT: 0x02,
  VCC_PORT_CONTROL_ON: 0x03,
  VCC_PORT_CONTROL_OFF: 0x04,
  ACTIVATE_BUSY_INDICATION: 0x05,
  RESET_BUSY_INDICATION: 0x06
};
var BoostAlert = {
  LOW_VOLTAGE: 0x01,
  HIGH_CURRENT: 0x02,
  LOW_SIGNAL_STRENGTH: 0x03,
  OVER_POWER_CONDITION: 0x04
};
var BoostAlertOperation = {
  ENABLE_UPDATES: 0x01,
  DISABLE_UPDATES: 0x02,
  REQUEST_UPDATES: 0x03,
  UPDATE: 0x04
};

/**
 * Motor control commands and settings
 * @readonly
 */
var BoostOutputSubCommand = {
  START_POWER: 0x01,
  START_POWER_PAIR: 0x02,
  SET_ACC_TIME: 0x05,
  SET_DEC_TIME: 0x06,
  START_SPEED: 0x07,
  START_SPEED_PAIR: 0x08,
  START_SPEED_FOR_TIME: 0x09,
  START_SPEED_FOR_TIME_PAIR: 0x0A,
  START_SPEED_FOR_DEGREES: 0x0B,
  START_SPEED_FOR_DEGREES_PAIR: 0x0C,
  GO_TO_ABS_POSITION: 0x0D,
  GO_TO_ABS_POSITION_PAIR: 0x0E,
  PRESET_ENCODER: 0x14,
  WRITE_DIRECT_MODE_DATA: 0x51
};
var BoostOutputExecution = {
  BUFFER_IF_NECESSARY: 0x00,
  EXECUTE_IMMEDIATELY: 0x10,
  NO_ACTION: 0x00,
  COMMAND_FEEDBACK: 0x01
};
var BoostMotorEndState = {
  FLOAT: 0,
  HOLD: 126,
  BRAKE: 127
};
var BoostMotorProfile = {
  DO_NOT_USE: 0x00,
  ACCELERATION: 0x01,
  DECELERATION: 0x02
};
var BoostIOEvent = {
  ATTACHED: 0x01,
  DETACHED: 0x00,
  ATTACHED_VIRTUAL: 0x02
};

/**
 * Sensor mode definitions
 * @readonly
 * @enum {number}
 */
var BoostMode = {
  TILT: 0,
  // Tilt sensor angle mode
  LED: 1,
  // LED RGB mode
  COLOR: 0,
  // Color detection mode
  DISTANCE: 1,
  // Distance measurement mode
  REFLECTION: 3,
  // Reflection/ambient light mode
  AMBIENT: 4,
  // Ambient light mode
  MOTOR_SENSOR: 2,
  // Motor position/rotation mode
  FORCE: 0,
  // Force measurement mode
  TOUCHED: 1,
  // Touch detection mode
  UNKNOWN: 0 // Default/unknown mode
};

/**
 * Motor state tracking
 * @readonly
 * @enum {number}
 */
var BoostMotorState = {
  OFF: 0,
  ON_FOREVER: 1,
  ON_FOR_TIME: 2,
  ON_FOR_ROTATION: 3
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert JavaScript number to little-endian INT32 array
 * @param {number} number - Input number
 * @return {Array<number>} 4-byte array representation
 */
var numberToInt32Array = function numberToInt32Array(number) {
  var buffer = new ArrayBuffer(4);
  var dataview = new DataView(buffer);
  dataview.setInt32(0, number, true); // Little-endian
  return [dataview.getInt8(0), dataview.getInt8(1), dataview.getInt8(2), dataview.getInt8(3)];
};

/**
 * Convert little-endian INT32 array to JavaScript number
 * @param {Array<number>} array - 4-byte array
 * @return {number} Converted number
 */
var int32ArrayToNumber = function int32ArrayToNumber(array) {
  var i = Uint8Array.from(array);
  var d = new DataView(i.buffer);
  return d.getInt32(0, true);
};

/**
 * Decode firmware version from protocol format
 * @param {number} version - Version as 32-bit integer
 * @return {string} Formatted version string
 */
var decodeVersion = function decodeVersion(version) {
  var buffer = new ArrayBuffer(4);
  var view = new DataView(buffer);
  view.setInt32(0, version, true);
  var major = view.getUint8(3) >> 4;
  var minor = view.getUint8(3) & 0x0F;
  var bugfix = view.getUint8(2);
  var build = view.getUint16(0, true);
  return "".concat(major, ".").concat(minor, ".").concat(bugfix.toString().padStart(2, '0'), ".").concat(build.toString().padStart(4, '0'));
};

// ============================================================================
// MOTOR CLASS
// ============================================================================

/**
 * Enhanced motor management with advanced control features
 */
var BoostMotor = /*#__PURE__*/function () {
  function BoostMotor(parent, index) {
    _classCallCheck(this, BoostMotor);
    this._parent = parent;
    this._index = index;

    // Basic motor properties
    this._direction = 1;
    this._power = 50;
    this._position = 0;
    this._status = BoostMotorState.OFF;

    // Advanced motor features
    this._stopMode = BoostMotorEndState.BRAKE;
    this._accelerationTime = 0;
    this._decelerationTime = 0;
    this._useProfile = BoostMotorProfile.DO_NOT_USE;

    // State management
    this._pendingDurationTimeoutId = null;
    this._pendingDurationTimeoutStartTime = null;
    this._pendingDurationTimeoutDelay = null;
    this._pendingRotationDestination = null;
    this._pendingRotationPromise = null;
    this.turnOff = this.turnOff.bind(this);
  }

  // Property getters and setters
  _createClass(BoostMotor, [{
    key: "direction",
    get: function get() {
      return this._direction;
    },
    set: function set(value) {
      this._direction = value < 0 ? -1 : 1;
    }
  }, {
    key: "power",
    get: function get() {
      return this._power;
    },
    set: function set(value) {
      if (value === 0) {
        this._power = 0;
      } else {
        // Scale power to ensure motors work under load
        this._power = MathUtil.scale(value, 1, 100, 10, 100);
      }
    }
  }, {
    key: "position",
    get: function get() {
      return this._position;
    },
    set: function set(value) {
      this._position = value;
    }
  }, {
    key: "status",
    get: function get() {
      return this._status;
    },
    set: function set(value) {
      this._clearRotationState();
      this._clearDurationTimeout();
      this._status = value;
    }
  }, {
    key: "stopMode",
    get: function get() {
      return this._stopMode;
    },
    set: function set(value) {
      this._stopMode = value;
    }
  }, {
    key: "pendingDurationTimeoutStartTime",
    get: function get() {
      return this._pendingDurationTimeoutStartTime;
    }
  }, {
    key: "pendingDurationTimeoutDelay",
    get: function get() {
      return this._pendingDurationTimeoutDelay;
    }
  }, {
    key: "pendingRotationDestination",
    get: function get() {
      return this._pendingRotationDestination;
    }
  }, {
    key: "pendingRotationPromise",
    get: function get() {
      return this._pendingRotationPromise;
    },
    set: function set(func) {
      this._pendingRotationPromise = func;
    }

    /**
     * Set motor acceleration profile
     * @param {number} time - Acceleration time in milliseconds
     */
  }, {
    key: "setAcceleration",
    value: function setAcceleration(time) {
      this._accelerationTime = MathUtil.clamp(time, 0, 10000);
      this._useProfile |= BoostMotorProfile.ACCELERATION;
      var cmd = this._parent.generateOutputCommand(this._index, BoostOutputExecution.EXECUTE_IMMEDIATELY, BoostOutputSubCommand.SET_ACC_TIME, [].concat(_toConsumableArray(numberToInt32Array(this._accelerationTime).slice(0, 2)), [0]));
      this._parent.send(BoostBLE.characteristic, cmd);
    }

    /**
     * Set motor deceleration profile
     * @param {number} time - Deceleration time in milliseconds
     */
  }, {
    key: "setDeceleration",
    value: function setDeceleration(time) {
      this._decelerationTime = MathUtil.clamp(time, 0, 10000);
      this._useProfile |= BoostMotorProfile.DECELERATION;
      var cmd = this._parent.generateOutputCommand(this._index, BoostOutputExecution.EXECUTE_IMMEDIATELY, BoostOutputSubCommand.SET_DEC_TIME, [].concat(_toConsumableArray(numberToInt32Array(this._decelerationTime).slice(0, 2)), [0]));
      this._parent.send(BoostBLE.characteristic, cmd);
    }

    /**
     * Reset motor position encoder
     * @param {number} newPosition - New position value (default: 0)
     */
  }, {
    key: "resetPosition",
    value: function resetPosition() {
      var newPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var cmd = this._parent.generateOutputCommand(this._index, BoostOutputExecution.EXECUTE_IMMEDIATELY, BoostOutputSubCommand.WRITE_DIRECT_MODE_DATA, [BoostMode.MOTOR_SENSOR].concat(_toConsumableArray(numberToInt32Array(newPosition))));
      return this._parent.send(BoostBLE.characteristic, cmd);
    }

    /**
     * Turn motor on with current settings
     * @private
     */
  }, {
    key: "_turnOn",
    value: function _turnOn() {
      var cmd = this._parent.generateOutputCommand(this._index, BoostOutputExecution.EXECUTE_IMMEDIATELY, BoostOutputSubCommand.START_SPEED, [this.power * this.direction, MathUtil.clamp(this.power + BoostMotorMaxPowerAdd, 0, 100), this._useProfile]);
      this._parent.send(BoostBLE.characteristic, cmd);
    }

    /**
     * Turn motor on indefinitely
     */
  }, {
    key: "turnOnForever",
    value: function turnOnForever() {
      this.status = BoostMotorState.ON_FOREVER;
      this._turnOn();
    }

    /**
     * Turn motor on for specific duration
     * @param {number} milliseconds - Duration in milliseconds
     */
  }, {
    key: "turnOnFor",
    value: function turnOnFor(milliseconds) {
      milliseconds = Math.max(0, milliseconds);
      this.status = BoostMotorState.ON_FOR_TIME;
      this._turnOn();
      this._setNewDurationTimeout(this.turnOff, milliseconds);
    }

    /**
     * Turn motor on for specific rotation
     * @param {number} degrees - Rotation in degrees
     * @param {number} direction - Direction multiplier (-1 or 1)
     */
  }, {
    key: "turnOnForDegrees",
    value: function turnOnForDegrees(degrees, direction) {
      degrees = Math.max(0, degrees);
      var cmd = this._parent.generateOutputCommand(this._index, BoostOutputExecution.EXECUTE_IMMEDIATELY | BoostOutputExecution.COMMAND_FEEDBACK, BoostOutputSubCommand.START_SPEED_FOR_DEGREES, [].concat(_toConsumableArray(numberToInt32Array(degrees)), [this.power * this.direction * direction, MathUtil.clamp(this.power + BoostMotorMaxPowerAdd, 0, 100), this._stopMode, this._useProfile]));
      this.status = BoostMotorState.ON_FOR_ROTATION;
      this._pendingRotationDestination = this.position + degrees * this.direction * direction;
      this._parent.send(BoostBLE.characteristic, cmd);
    }

    /**
     * Turn motor to absolute position
     * @param {number} position - Target position in degrees
     */
  }, {
    key: "turnToPosition",
    value: function turnToPosition(position) {
      var cmd = this._parent.generateOutputCommand(this._index, BoostOutputExecution.EXECUTE_IMMEDIATELY | BoostOutputExecution.COMMAND_FEEDBACK, BoostOutputSubCommand.GO_TO_ABS_POSITION, [].concat(_toConsumableArray(numberToInt32Array(position)), [this.power, MathUtil.clamp(this.power + BoostMotorMaxPowerAdd, 0, 100), this._stopMode, this._useProfile]));
      this.status = BoostMotorState.ON_FOR_ROTATION;
      this._pendingRotationDestination = position;
      this._parent.send(BoostBLE.characteristic, cmd);
    }

    /**
     * Turn motor off
     * @param {boolean} useLimiter - Whether to use rate limiter
     */
  }, {
    key: "turnOff",
    value: function turnOff() {
      var useLimiter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var cmd = this._parent.generateOutputCommand(this._index, BoostOutputExecution.EXECUTE_IMMEDIATELY, BoostOutputSubCommand.START_POWER, [this._stopMode === BoostMotorEndState.FLOAT ? BoostMotorEndState.FLOAT : 0]);
      this.status = BoostMotorState.OFF;
      this._parent.send(BoostBLE.characteristic, cmd, useLimiter);
    }

    /**
     * Clear duration timeout
     * @private
     */
  }, {
    key: "_clearDurationTimeout",
    value: function _clearDurationTimeout() {
      if (this._pendingDurationTimeoutId !== null) {
        clearTimeout(this._pendingDurationTimeoutId);
        this._pendingDurationTimeoutId = null;
        this._pendingDurationTimeoutStartTime = null;
        this._pendingDurationTimeoutDelay = null;
      }
    }

    /**
     * Set new duration timeout
     * @param {Function} callback - Function to call when timeout expires
     * @param {number} delay - Delay in milliseconds
     * @private
     */
  }, {
    key: "_setNewDurationTimeout",
    value: function _setNewDurationTimeout(callback, delay) {
      var _this = this;
      this._clearDurationTimeout();
      var timeoutID = setTimeout(function () {
        if (_this._pendingDurationTimeoutId === timeoutID) {
          _this._pendingDurationTimeoutId = null;
          _this._pendingDurationTimeoutStartTime = null;
          _this._pendingDurationTimeoutDelay = null;
        }
        callback();
      }, delay);
      this._pendingDurationTimeoutId = timeoutID;
      this._pendingDurationTimeoutStartTime = Date.now();
      this._pendingDurationTimeoutDelay = delay;
    }

    /**
     * Clear rotation state and promises
     * @private
     */
  }, {
    key: "_clearRotationState",
    value: function _clearRotationState() {
      if (this._pendingRotationPromise !== null) {
        this._pendingRotationPromise();
        this._pendingRotationPromise = null;
      }
      this._pendingRotationDestination = null;
    }
  }]);
  return BoostMotor;
}(); // ============================================================================
// BOOST PERIPHERAL CLASS
// ============================================================================
/**
 * Main Boost peripheral management class with enhanced capabilities
 */
var Boost = /*#__PURE__*/function () {
  function Boost(runtime, extensionId) {
    _classCallCheck(this, Boost);
    this._runtime = runtime;
    this._runtime.on('PROJECT_STOP_ALL', this.stopAll.bind(this));
    this._extensionId = extensionId;
    this._ble = null;
    this._rateLimiter = new RateLimiter(BoostBLE.sendRateMax);
    this._pingDeviceId = null;

    // Device state
    this._ports = [];
    this._motors = [];
    this._portModes = {};

    // Sensor data with organized structure
    this._sensors = {
      tiltX: 0,
      tiltY: 0,
      color: {},
      distance: {},
      reflection: {},
      ambient: {},
      force: {},
      pressed: {},
      previousColor: BoostColor.NONE
    };

    // Color detection state
    this._colorSamples = [];

    // Hub status monitoring
    this._hubStatus = {
      batteryLevel: 100,
      buttonPressed: false,
      rssi: 0,
      fwVersion: "0.0.0.0",
      hwVersion: "0.0.0.0",
      lowVoltage: false,
      highCurrent: false,
      overPower: false
    };
    this._runtime.registerPeripheralExtension(extensionId, this);
    this.reset = this.reset.bind(this);
    this._onConnect = this._onConnect.bind(this);
    this._onMessage = this._onMessage.bind(this);
    this._pingDevice = this._pingDevice.bind(this);
  }

  // Property getters for backward compatibility
  _createClass(Boost, [{
    key: "tiltX",
    get: function get() {
      return this._sensors.tiltX;
    }
  }, {
    key: "tiltY",
    get: function get() {
      return this._sensors.tiltY;
    }
  }, {
    key: "color",
    get: function get() {
      // Backward compatibility: return color from port C if available, otherwise first available
      return this._sensors.color[BoostPort.C] || Object.values(this._sensors.color)[0] || BoostColor.NONE;
    }
  }, {
    key: "previousColor",
    get: function get() {
      return this._sensors.previousColor;
    }
  }, {
    key: "hubStatus",
    get: function get() {
      return this._hubStatus;
    }

    // Enhanced sensor getters
  }, {
    key: "getColor",
    value: function getColor(port) {
      return this._sensors.color[port] || BoostColor.NONE;
    }
  }, {
    key: "getDistance",
    value: function getDistance(port) {
      return this._sensors.distance[port] || 0;
    }
  }, {
    key: "getReflection",
    value: function getReflection(port) {
      return this._sensors.reflection[port] || 0;
    }
  }, {
    key: "getAmbient",
    value: function getAmbient(port) {
      return this._sensors.ambient[port] || 0;
    }
  }, {
    key: "getForce",
    value: function getForce(port) {
      return this._sensors.force[port] || 0;
    }
  }, {
    key: "isForcePressed",
    value: function isForcePressed(port) {
      return this._sensors.pressed[port] || false;
    }

    /**
     * Get motor instance by port
     * @param {number} index - Port index
     * @return {BoostMotor|null} Motor instance or null
     */
  }, {
    key: "motor",
    value: function motor(index) {
      return this._motors[index];
    }

    /**
     * Convert color index to color name
     * @param {number} index - Color index from sensor
     * @return {string} Color name
     */
  }, {
    key: "boostColorForIndex",
    value: function boostColorForIndex(index) {
      var colorForIndex = Object.keys(BoostColorIndex).find(function (key) {
        return BoostColorIndex[key] === index;
      });
      return colorForIndex || BoostColor.NONE;
    }

    /**
     * Stop all motors immediately
     */
  }, {
    key: "stopAllMotors",
    value: function stopAllMotors() {
      this._motors.forEach(function (motor) {
        if (motor) {
          motor.turnOff(false); // Don't use rate limiter for emergency stop
        }
      });
    }

    /**
     * Shutdown the hub
     */
  }, {
    key: "shutdown",
    value: function shutdown() {
      if (!this.isConnected()) return;
      var cmd = [0, BoostMessage.HUB_ACTIONS, BoostHubAction.SWITCH_OFF_HUB];
      cmd.unshift(cmd.length + 1);
      this.send(BoostBLE.characteristic, cmd, false);
    }

    /**
     * Set LED color
     * @param {number} inputRGB - RGB color as 24-bit integer
     * @return {Promise} Send operation promise
     */
  }, {
    key: "setLED",
    value: function setLED(inputRGB) {
      var rgb = [inputRGB >> 16 & 0x000000FF, inputRGB >> 8 & 0x000000FF, inputRGB & 0x000000FF];
      var ledPortIndex = this._ports.indexOf(BoostIO.LED);
      if (ledPortIndex === -1) return Promise.resolve();
      var cmd = this.generateOutputCommand(ledPortIndex, BoostOutputExecution.EXECUTE_IMMEDIATELY | BoostOutputExecution.COMMAND_FEEDBACK, BoostOutputSubCommand.WRITE_DIRECT_MODE_DATA, [BoostMode.LED].concat(rgb));
      return this.send(BoostBLE.characteristic, cmd);
    }

    /**
     * Set LED to RGB mode
     * @return {Promise} Send operation promise
     */
  }, {
    key: "setLEDMode",
    value: function setLEDMode() {
      var ledPortIndex = this._ports.indexOf(BoostIO.LED);
      if (ledPortIndex === -1) return Promise.resolve();
      var cmd = this.generateInputCommand(ledPortIndex, BoostMode.LED, 0, false);
      return this.send(BoostBLE.characteristic, cmd);
    }

    /**
     * Stop all activities (called by runtime)
     */
  }, {
    key: "stopAll",
    value: function stopAll() {
      if (!this.isConnected()) return;
      this.stopAllMotors();
    }

    /**
     * Start scanning for Boost devices
     */
  }, {
    key: "scan",
    value: function scan() {
      if (this._ble) {
        this._ble.disconnect();
      }
      this._ble = new BLE(this._runtime, this._extensionId, {
        filters: [{
          services: [BoostBLE.service],
          manufacturerData: {
            0x0397: {
              dataPrefix: [0x00, 0x40],
              mask: [0x00, 0xFF]
            }
          }
        }],
        optionalServices: []
      }, this._onConnect, this.reset);
    }

    /**
     * Connect to specific device
     * @param {number} id - Device ID
     */
  }, {
    key: "connect",
    value: function connect(id) {
      if (this._ble) {
        this._ble.connectPeripheral(id);
      }
    }

    /**
     * Disconnect from current device
     */
  }, {
    key: "disconnect",
    value: function disconnect() {
      if (this._ble) {
        this._ble.disconnect();
      }
      this.reset();
    }

    /**
     * Reset all state
     */
  }, {
    key: "reset",
    value: function reset() {
      this._ports = [];
      this._motors = [];
      this._portModes = {};
      this._sensors = {
        tiltX: 0,
        tiltY: 0,
        color: {},
        distance: {},
        reflection: {},
        ambient: {},
        force: {},
        pressed: {},
        previousColor: BoostColor.NONE
      };
      this._colorSamples = [];
      this._hubStatus = {
        batteryLevel: 100,
        buttonPressed: false,
        rssi: 0,
        fwVersion: "0.0.0.0",
        hwVersion: "0.0.0.0",
        lowVoltage: false,
        highCurrent: false,
        overPower: false
      };
      if (this._pingDeviceId) {
        window.clearInterval(this._pingDeviceId);
        this._pingDeviceId = null;
      }
    }

    /**
     * Check if connected to device
     * @return {boolean} Connection status
     */
  }, {
    key: "isConnected",
    value: function isConnected() {
      return this._ble ? this._ble.isConnected() : false;
    }

    /**
     * Send message to device
     * @param {string} uuid - Characteristic UUID
     * @param {Array} message - Message bytes
     * @param {boolean} useLimiter - Whether to use rate limiter
     * @return {Promise} Send operation promise
     */
  }, {
    key: "send",
    value: function send(uuid, message) {
      var useLimiter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (!this.isConnected()) return Promise.resolve();
      if (useLimiter && !this._rateLimiter.okayToSend()) {
        return Promise.resolve();
      }
      return this._ble.write(BoostBLE.service, uuid, Base64Util.uint8ArrayToBase64(message), 'base64');
    }

    /**
     * Generate output command message
     * @param {number} portID - Target port
     * @param {number} execution - Execution flags
     * @param {number} subCommand - Sub-command ID
     * @param {Array} payload - Command payload
     * @return {Array} Complete message
     */
  }, {
    key: "generateOutputCommand",
    value: function generateOutputCommand(portID, execution, subCommand, payload) {
      var hubID = 0x00;
      var command = [hubID, BoostMessage.OUTPUT, portID, execution, subCommand].concat(_toConsumableArray(payload));
      command.unshift(command.length + 1);
      return command;
    }

    /**
     * Generate input format setup command
     * @param {number} portID - Target port
     * @param {number} mode - Sensor mode
     * @param {number} delta - Change threshold for notifications
     * @param {boolean} enableNotifications - Enable value notifications
     * @return {Array} Complete message
     */
  }, {
    key: "generateInputCommand",
    value: function generateInputCommand(portID, mode, delta, enableNotifications) {
      var command = [0x00, BoostMessage.PORT_INPUT_FORMAT_SETUP_SINGLE, portID, mode].concat(numberToInt32Array(delta)).concat([enableNotifications ? 1 : 0]);
      command.unshift(command.length + 1);
      return command;
    }

    /**
     * Set sensor input mode with mode switching support
     * @param {number} port - Port number
     * @param {number} mode - Desired mode
     * @return {Promise} Mode switch promise
     */
  }, {
    key: "_setInputMode",
    value: (function () {
      var _setInputMode2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(port, mode) {
        var cmd;
        return regenerator.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(this._portModes[port] === mode)) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return", Promise.resolve());
            case 2:
              this._portModes[port] = mode;
              cmd = this.generateInputCommand(port, mode, 1, true);
              _context.next = 6;
              return this.send(BoostBLE.characteristic, cmd);
            case 6:
              return _context.abrupt("return", new Promise(function (resolve) {
                return setTimeout(resolve, 50);
              }));
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function _setInputMode(_x, _x2) {
        return _setInputMode2.apply(this, arguments);
      }
      return _setInputMode;
    }()
    /**
     * Handle successful BLE connection
     * @private
     */
    )
  }, {
    key: "_onConnect",
    value: function _onConnect() {
      var _this2 = this;
      this._ble.startNotifications(BoostBLE.service, BoostBLE.characteristic, this._onMessage);
      this._pingDeviceId = window.setInterval(this._pingDevice, BoostPingInterval);

      // Request firmware version to determine port mapping
      setTimeout(function () {
        var command = [0x00, BoostMessage.HUB_PROPERTIES, BoostHubProperty.FW_VERSION, BoostHubPropertyOperation.REQUEST_UPDATE];
        command.unshift(command.length + 1);
        _this2.send(BoostBLE.characteristic, command, false);
      }, 500);

      // Enable comprehensive hub status monitoring
      var statusCommands = [[BoostMessage.HUB_PROPERTIES, BoostHubProperty.HW_VERSION, BoostHubPropertyOperation.REQUEST_UPDATE], [BoostMessage.HUB_PROPERTIES, BoostHubProperty.BATTERY_VOLTAGE, BoostHubPropertyOperation.ENABLE_UPDATES], [BoostMessage.HUB_PROPERTIES, BoostHubProperty.BUTTON, BoostHubPropertyOperation.ENABLE_UPDATES], [BoostMessage.HUB_PROPERTIES, BoostHubProperty.RSSI, BoostHubPropertyOperation.ENABLE_UPDATES], [BoostMessage.HUB_ALERTS, BoostAlert.LOW_VOLTAGE, BoostAlertOperation.ENABLE_UPDATES], [BoostMessage.HUB_ALERTS, BoostAlert.HIGH_CURRENT, BoostAlertOperation.ENABLE_UPDATES], [BoostMessage.HUB_ALERTS, BoostAlert.OVER_POWER_CONDITION, BoostAlertOperation.ENABLE_UPDATES]];
      statusCommands.forEach(function (cmdData) {
        var cmd = [0].concat(_toConsumableArray(cmdData));
        cmd.unshift(cmd.length + 1);
        _this2.send(BoostBLE.characteristic, cmd, false);
      });
    }

    /**
     * Handle incoming BLE messages
     * @param {string} base64 - Base64 encoded message
     * @private
     */
  }, {
    key: "_onMessage",
    value: function _onMessage(base64) {
      var data = Base64Util.base64ToUint8Array(base64);
      var messageType = data[2];
      var portID = data[3];
      switch (messageType) {
        case BoostMessage.HUB_PROPERTIES:
          {
            var property = data[3];
            var operation = data[4];
            if (operation !== BoostHubPropertyOperation.UPDATE) break;
            switch (property) {
              case BoostHubProperty.FW_VERSION:
                {
                  // Determine port mapping based on firmware version
                  var fwVersion10000224 = int32ArrayToNumber([0x24, 0x02, 0x00, 0x10]);
                  var fwHub = int32ArrayToNumber(data.slice(5, 9));
                  if (fwHub < fwVersion10000224) {
                    BoostPort = BoostPort10000223OrOlder;
                    log.info('Move Hub firmware older than version 1.0.00.0224 detected. Using old port mapping.');
                  } else {
                    BoostPort = BoostPort10000224OrNewer;
                  }
                  this._hubStatus.fwVersion = decodeVersion(fwHub);
                  break;
                }
              case BoostHubProperty.HW_VERSION:
                {
                  var hwVersion = int32ArrayToNumber(data.slice(5, 9));
                  this._hubStatus.hwVersion = decodeVersion(hwVersion);
                  break;
                }
              case BoostHubProperty.BATTERY_VOLTAGE:
                this._hubStatus.batteryLevel = data[5];
                break;
              case BoostHubProperty.BUTTON:
                this._hubStatus.buttonPressed = data[5] === 1;
                break;
              case BoostHubProperty.RSSI:
                // Handle potential missing readInt8 method
                this._hubStatus.rssi = data.readInt8 ? data.readInt8(5) : data[5];
                break;
            }
            break;
          }
        case BoostMessage.HUB_ALERTS:
          {
            var alertType = data[3];
            var _operation = data[4];
            if (_operation !== BoostAlertOperation.UPDATE) break;
            var status = data[5] === 0xFF;
            switch (alertType) {
              case BoostAlert.LOW_VOLTAGE:
                this._hubStatus.lowVoltage = status;
                break;
              case BoostAlert.HIGH_CURRENT:
                this._hubStatus.highCurrent = status;
                break;
              case BoostAlert.OVER_POWER_CONDITION:
                this._hubStatus.overPower = status;
                break;
            }
            break;
          }
        case BoostMessage.HUB_ATTACHED_IO:
          {
            var event = data[4];
            var typeId = data[5];
            switch (event) {
              case BoostIOEvent.ATTACHED:
                this._registerSensorOrMotor(portID, typeId);
                break;
              case BoostIOEvent.DETACHED:
                this._clearPort(portID);
                break;
            }
            break;
          }
        case BoostMessage.PORT_VALUE:
          {
            var type = this._ports[portID];
            var mode = this._portModes[portID];
            switch (type) {
              case BoostIO.TILT:
                this._sensors.tiltX = data[4];
                this._sensors.tiltY = data[5];
                break;
              case BoostIO.COLOR:
                if (mode === BoostMode.COLOR) {
                  // Advanced color detection with sampling for stability
                  this._colorSamples.unshift(data[4]);
                  if (this._colorSamples.length > BoostColorSampleSize) {
                    this._colorSamples.pop();
                    if (this._colorSamples.every(function (v, i, arr) {
                      return v === arr[0];
                    })) {
                      this._sensors.previousColor = this._sensors.color[portID] || BoostColor.NONE;
                      this._sensors.color[portID] = this.boostColorForIndex(this._colorSamples[0]);
                    } else {
                      this._sensors.color[portID] = BoostColor.NONE;
                    }
                  } else {
                    this._sensors.color[portID] = BoostColor.NONE;
                  }
                } else if (mode === BoostMode.DISTANCE) {
                  this._sensors.distance[portID] = data[4] * 10; // Convert to mm
                } else if (mode === BoostMode.REFLECTION) {
                  this._sensors.reflection[portID] = data[4];
                } else if (mode === BoostMode.AMBIENT) {
                  this._sensors.ambient[portID] = data[4];
                }
                break;
              case BoostIO.TECHNIC_FORCE_SENSOR:
                if (mode === BoostMode.FORCE) {
                  this._sensors.force[portID] = data[4] / 10; // Convert to Newtons
                } else if (mode === BoostMode.TOUCHED) {
                  this._sensors.pressed[portID] = data[4] > 0;
                }
                break;
              case BoostIO.MOTOREXT:
              case BoostIO.MOTORINT:
                if (this.motor(portID)) {
                  this.motor(portID).position = int32ArrayToNumber(data.slice(4, 8));
                }
                break;
              case BoostIO.CURRENT:
              case BoostIO.VOLTAGE:
              case BoostIO.LED:
                // These don't require special handling
                break;
              default:
                log.warn("Unknown sensor value! Type: ".concat(type));
            }
            break;
          }
        case BoostMessage.PORT_FEEDBACK:
          {
            var feedback = data[4];
            var motor = this.motor(portID);
            if (motor) {
              var isBusy = feedback & BoostPortFeedback.IN_PROGRESS;
              var commandCompleted = feedback & (BoostPortFeedback.COMPLETED | BoostPortFeedback.DISCARDED);
              if (!isBusy && commandCompleted) {
                if (motor.status === BoostMotorState.ON_FOR_ROTATION) {
                  motor.status = BoostMotorState.OFF;
                }
              }
            }
            break;
          }
        case BoostMessage.ERROR:
          log.warn("Error reported by hub: ".concat(Array.from(data)));
          break;
      }
    }

    /**
     * Ping device to maintain connection
     * @private
     */
  }, {
    key: "_pingDevice",
    value: function _pingDevice() {
      this._ble.read(BoostBLE.service, BoostBLE.characteristic, false);
    }

    /**
     * Register new sensor or motor
     * @param {number} portID - Port where device is connected
     * @param {number} type - Device type ID
     * @private
     */
  }, {
    key: "_registerSensorOrMotor",
    value: function _registerSensorOrMotor(portID, type) {
      this._ports[portID] = type;

      // Create motor instances for motor devices
      if (type === BoostIO.MOTORINT || type === BoostIO.MOTOREXT) {
        this._motors[portID] = new BoostMotor(this, portID);
      }

      // Configure sensor modes and initial settings
      var mode = null;
      var delta = 1;
      switch (type) {
        case BoostIO.MOTORINT:
        case BoostIO.MOTOREXT:
          mode = BoostMode.MOTOR_SENSOR;
          break;
        case BoostIO.COLOR:
          mode = BoostMode.COLOR;
          delta = 0; // Immediate notification for color changes
          break;
        case BoostIO.TECHNIC_FORCE_SENSOR:
          mode = BoostMode.FORCE;
          break;
        case BoostIO.LED:
          mode = BoostMode.LED;
          // Set LED to blue to indicate successful connection
          this.setLEDMode();
          this.setLED(0x0000FF);
          break;
        case BoostIO.TILT:
          mode = BoostMode.TILT;
          break;
        default:
          mode = BoostMode.UNKNOWN;
      }
      var cmd = this.generateInputCommand(portID, mode, delta, true);
      this.send(BoostBLE.characteristic, cmd);
    }

    /**
     * Clear port when device is disconnected
     * @param {number} portID - Port to clear
     * @private
     */
  }, {
    key: "_clearPort",
    value: function _clearPort(portID) {
      var type = this._ports[portID];

      // Clear sensor data
      if (type === BoostIO.TILT) {
        this._sensors.tiltX = this._sensors.tiltY = 0;
      }
      if (type === BoostIO.COLOR) {
        delete this._sensors.color[portID];
        delete this._sensors.distance[portID];
        delete this._sensors.reflection[portID];
        delete this._sensors.ambient[portID];
      }
      if (type === BoostIO.TECHNIC_FORCE_SENSOR) {
        delete this._sensors.force[portID];
        delete this._sensors.pressed[portID];
      }

      // Clear port assignments
      this._ports[portID] = 'none';
      this._motors[portID] = null;
      delete this._portModes[portID];
    }
  }]);
  return Boost;
}(); // ============================================================================
// SCRATCH EXTENSION CLASS
// ============================================================================
/**
 * Enum for motor specification in blocks
 * @readonly
 */
var BoostMotorLabel = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  AB: 'AB',
  ALL: 'ALL'
};
var BoostMotorDirection = {
  FORWARD: 'this way',
  BACKWARD: 'that way',
  REVERSE: 'reverse'
};
var BoostTiltDirection = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
  ANY: 'any'
};

/**
 * Main Scratch extension class with comprehensive Boost support
 */
var Scratch3BoostBlocks = /*#__PURE__*/function () {
  function Scratch3BoostBlocks(runtime) {
    _classCallCheck(this, Scratch3BoostBlocks);
    this.runtime = runtime;
    this._peripheral = new Boost(this.runtime, Scratch3BoostBlocks.EXTENSION_ID);
  }
  _createClass(Scratch3BoostBlocks, [{
    key: "getInfo",
    value: function getInfo() {
      return {
        id: Scratch3BoostBlocks.EXTENSION_ID,
        name: 'legoboost Enhanced',
        blockIconURI: iconURI,
        showStatusButton: true,
        blocks: [
        // Basic motor control
        {
          opcode: 'motorOnFor',
          text: formatMessage({
            id: 'legoboost.motorOnFor',
            default: 'turn motor [MOTOR_ID] for [DURATION] seconds',
            description: 'turn a motor on for some time'
          }),
          blockType: BlockType.COMMAND,
          arguments: {
            MOTOR_ID: {
              type: ArgumentType.STRING,
              menu: 'MOTOR_ID',
              defaultValue: BoostMotorLabel.A
            },
            DURATION: {
              type: ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        }, {
          opcode: 'motorOnForRotation',
          text: formatMessage({
            id: 'legoboost.motorOnForRotation',
            default: 'turn motor [MOTOR_ID] for [ROTATION] rotations',
            description: 'turn a motor on for rotation'
          }),
          blockType: BlockType.COMMAND,
          arguments: {
            MOTOR_ID: {
              type: ArgumentType.STRING,
              menu: 'MOTOR_ID',
              defaultValue: BoostMotorLabel.A
            },
            ROTATION: {
              type: ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        }, {
          opcode: 'motorRunToPosition',
          text: formatMessage({
            id: 'legoboost.motorRunToPosition',
            default: 'turn motor [MOTOR_ID] to position [POSITION]',
            description: 'turn a motor to absolute position'
          }),
          blockType: BlockType.COMMAND,
          arguments: {
            MOTOR_ID: {
              type: ArgumentType.STRING,
              menu: 'MOTOR_ID_SINGLE',
              defaultValue: BoostMotorLabel.A
            },
            POSITION: {
              type: ArgumentType.ANGLE,
              defaultValue: 0
            }
          }
        }, {
          opcode: 'motorOn',
          text: formatMessage({
            id: 'legoboost.motorOn',
            default: 'turn motor [MOTOR_ID] on',
            description: 'turn a motor on indefinitely'
          }),
          blockType: BlockType.COMMAND,
          arguments: {
            MOTOR_ID: {
              type: ArgumentType.STRING,
              menu: 'MOTOR_ID',
              defaultValue: BoostMotorLabel.A
            }
          }
        }, {
          opcode: 'motorOff',
          text: formatMessage({
            id: 'legoboost.motorOff',
            default: 'turn motor [MOTOR_ID] off',
            description: 'turn a motor off'
          }),
          blockType: BlockType.COMMAND,
          arguments: {
            MOTOR_ID: {
              type: ArgumentType.STRING,
              menu: 'MOTOR_ID',
              defaultValue: BoostMotorLabel.A
            }
          }
        }, '---',
        // Separator

        // Advanced motor control
        {
          opcode: 'setMotorPower',
          text: formatMessage({
            id: 'legoboost.setMotorPower',
            default: 'set motor [MOTOR_ID] speed to [POWER] %',
            description: 'set the motor speed without turning it on'
          }),
          blockType: BlockType.COMMAND,
          arguments: {
            MOTOR_ID: {
              type: ArgumentType.STRING,
              menu: 'MOTOR_ID',
              defaultValue: BoostMotorLabel.ALL
            },
            POWER: {
              type: ArgumentType.NUMBER,
              defaultValue: 100
            }
          }
        }, {
          opcode: 'setMotorDirection',
          text: formatMessage({
            id: 'legoboost.setMotorDirection',
            default: 'set motor [MOTOR_ID] direction [MOTOR_DIRECTION]',
            description: 'set the motor turn direction without turning it on'
          }),
          blockType: BlockType.COMMAND,
          arguments: {
            MOTOR_ID: {
              type: ArgumentType.STRING,
              menu: 'MOTOR_ID',
              defaultValue: BoostMotorLabel.A
            },
            MOTOR_DIRECTION: {
              type: ArgumentType.STRING,
              menu: 'MOTOR_DIRECTION',
              defaultValue: BoostMotorDirection.FORWARD
            }
          }
        }, {
          opcode: 'setMotorStopAction',
          text: formatMessage({
            id: 'legoboost.setMotorStopAction',
            default: 'set motor [MOTOR_ID] stop action to [ACTION]',
            description: 'set how the motor stops'
          }),
          blockType: BlockType.COMMAND,
          arguments: {
            MOTOR_ID: {
              type: ArgumentType.STRING,
              menu: 'MOTOR_ID',
              defaultValue: BoostMotorLabel.A
            },
            ACTION: {
              type: ArgumentType.STRING,
              menu: 'STOP_ACTION',
              defaultValue: 'brake'
            }
          }
        }, {
          opcode: 'setMotorAcceleration',
          text: formatMessage({
            id: 'legoboost.setMotorAcceleration',
            default: 'set motor [MOTOR_ID] acceleration to [TIME] ms',
            description: 'set motor acceleration time'
          }),
          blockType: BlockType.COMMAND,
          arguments: {
            MOTOR_ID: {
              type: ArgumentType.STRING,
              menu: 'MOTOR_ID',
              defaultValue: BoostMotorLabel.A
            },
            TIME: {
              type: ArgumentType.NUMBER,
              defaultValue: 300
            }
          }
        }, {
          opcode: 'setMotorDeceleration',
          text: formatMessage({
            id: 'legoboost.setMotorDeceleration',
            default: 'set motor [MOTOR_ID] deceleration to [TIME] ms',
            description: 'set motor deceleration time'
          }),
          blockType: BlockType.COMMAND,
          arguments: {
            MOTOR_ID: {
              type: ArgumentType.STRING,
              menu: 'MOTOR_ID',
              defaultValue: BoostMotorLabel.A
            },
            TIME: {
              type: ArgumentType.NUMBER,
              defaultValue: 300
            }
          }
        }, {
          opcode: 'resetMotorPosition',
          text: formatMessage({
            id: 'legoboost.resetMotorPosition',
            default: 'reset motor [MOTOR_ID] position to [POSITION]',
            description: 'reset motor position counter'
          }),
          blockType: BlockType.COMMAND,
          arguments: {
            MOTOR_ID: {
              type: ArgumentType.STRING,
              menu: 'MOTOR_ID',
              defaultValue: BoostMotorLabel.A
            },
            POSITION: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        }, {
          opcode: 'getMotorPosition',
          text: formatMessage({
            id: 'legoboost.getMotorPosition',
            default: 'motor [MOTOR_REPORTER_ID] position',
            description: 'the position returned by the motor'
          }),
          blockType: BlockType.REPORTER,
          arguments: {
            MOTOR_REPORTER_ID: {
              type: ArgumentType.STRING,
              menu: 'MOTOR_REPORTER_ID',
              defaultValue: BoostMotorLabel.A
            }
          }
        }, '---',
        // Separator

        // Color and distance sensor
        {
          opcode: 'whenColor',
          text: formatMessage({
            id: 'legoboost.whenColor',
            default: 'when [PORT] sees [COLOR] brick',
            description: 'check for when color'
          }),
          blockType: BlockType.HAT,
          arguments: {
            PORT: {
              type: ArgumentType.STRING,
              menu: 'SENSOR_PORTS',
              defaultValue: 'C'
            },
            COLOR: {
              type: ArgumentType.STRING,
              menu: 'COLOR',
              defaultValue: BoostColor.ANY
            }
          }
        }, {
          opcode: 'seeingColor',
          text: formatMessage({
            id: 'legoboost.seeingColor',
            default: '[PORT] seeing [COLOR] brick?',
            description: 'is the color sensor seeing a certain color?'
          }),
          blockType: BlockType.BOOLEAN,
          arguments: {
            PORT: {
              type: ArgumentType.STRING,
              menu: 'SENSOR_PORTS',
              defaultValue: 'C'
            },
            COLOR: {
              type: ArgumentType.STRING,
              menu: 'COLOR',
              defaultValue: BoostColor.ANY
            }
          }
        }, {
          opcode: 'getDistance',
          text: formatMessage({
            id: 'legoboost.getDistance',
            default: '[PORT] distance (mm)',
            description: 'distance from color/distance sensor'
          }),
          blockType: BlockType.REPORTER,
          arguments: {
            PORT: {
              type: ArgumentType.STRING,
              menu: 'SENSOR_PORTS',
              defaultValue: 'C'
            }
          }
        }, {
          opcode: 'getReflection',
          text: formatMessage({
            id: 'legoboost.getReflection',
            default: '[PORT] reflection (%)',
            description: 'reflection from color/distance sensor'
          }),
          blockType: BlockType.REPORTER,
          arguments: {
            PORT: {
              type: ArgumentType.STRING,
              menu: 'SENSOR_PORTS',
              defaultValue: 'C'
            }
          }
        }, '---',
        // Separator

        // Force sensor
        {
          opcode: 'getForce',
          text: formatMessage({
            id: 'legoboost.getForce',
            default: '[PORT] force (N)',
            description: 'force from force sensor'
          }),
          blockType: BlockType.REPORTER,
          arguments: {
            PORT: {
              type: ArgumentType.STRING,
              menu: 'SENSOR_PORTS',
              defaultValue: 'C'
            }
          }
        }, {
          opcode: 'isForceSensorPressed',
          text: formatMessage({
            id: 'legoboost.isForceSensorPressed',
            default: '[PORT] force sensor pressed?',
            description: 'is force sensor pressed'
          }),
          blockType: BlockType.BOOLEAN,
          arguments: {
            PORT: {
              type: ArgumentType.STRING,
              menu: 'SENSOR_PORTS',
              defaultValue: 'C'
            }
          }
        }, {
          opcode: 'whenForceSensorPressed',
          text: formatMessage({
            id: 'legoboost.whenForceSensorPressed',
            default: 'when [PORT] force sensor pressed',
            description: 'when force sensor is pressed'
          }),
          blockType: BlockType.HAT,
          arguments: {
            PORT: {
              type: ArgumentType.STRING,
              menu: 'SENSOR_PORTS',
              defaultValue: 'C'
            }
          }
        }, '---',
        // Separator

        // Tilt sensor
        {
          opcode: 'whenTilted',
          text: formatMessage({
            id: 'legoboost.whenTilted',
            default: 'when tilted [TILT_DIRECTION_ANY]',
            description: 'check when tilted in a certain direction'
          }),
          func: 'isTilted',
          blockType: BlockType.HAT,
          arguments: {
            TILT_DIRECTION_ANY: {
              type: ArgumentType.STRING,
              menu: 'TILT_DIRECTION_ANY',
              defaultValue: BoostTiltDirection.ANY
            }
          }
        }, {
          opcode: 'isTilted',
          text: formatMessage({
            id: 'legoboost.isTilted',
            default: 'tilted [TILT_DIRECTION_ANY]?',
            description: 'is the hub tilted in a direction'
          }),
          blockType: BlockType.BOOLEAN,
          arguments: {
            TILT_DIRECTION_ANY: {
              type: ArgumentType.STRING,
              menu: 'TILT_DIRECTION_ANY',
              defaultValue: BoostTiltDirection.ANY
            }
          }
        }, {
          opcode: 'getTiltAngle',
          text: formatMessage({
            id: 'legoboost.getTiltAngle',
            default: 'tilt angle [TILT_DIRECTION]',
            description: 'the angle returned by the tilt sensor'
          }),
          blockType: BlockType.REPORTER,
          arguments: {
            TILT_DIRECTION: {
              type: ArgumentType.STRING,
              menu: 'TILT_DIRECTION',
              defaultValue: BoostTiltDirection.UP
            }
          }
        }, '---',
        // Separator

        // Hub control and monitoring
        {
          opcode: 'setLightHue',
          text: formatMessage({
            id: 'legoboost.setLightHue',
            default: 'set light color to [HUE]',
            description: 'set the LED color'
          }),
          blockType: BlockType.COMMAND,
          arguments: {
            HUE: {
              type: ArgumentType.NUMBER,
              defaultValue: 50
            }
          }
        }, {
          opcode: 'shutdown',
          text: formatMessage({
            id: 'legoboost.shutdown',
            default: 'shutdown hub',
            description: 'turn off the hub'
          }),
          blockType: BlockType.COMMAND
        }, {
          opcode: 'whenButtonPressed',
          text: formatMessage({
            id: 'legoboost.whenButtonPressed',
            default: 'when hub button pressed',
            description: 'when the hub button is pressed'
          }),
          blockType: BlockType.HAT
        }, {
          opcode: 'isButtonPressed',
          text: formatMessage({
            id: 'legoboost.isButtonPressed',
            default: 'hub button pressed?',
            description: 'is the hub button pressed'
          }),
          blockType: BlockType.BOOLEAN
        }, {
          opcode: 'getBatteryLevel',
          text: formatMessage({
            id: 'legoboost.getBatteryLevel',
            default: 'battery level (%)',
            description: 'the hub battery level'
          }),
          blockType: BlockType.REPORTER
        }, {
          opcode: 'getFirmwareVersion',
          text: formatMessage({
            id: 'legoboost.getFirmwareVersion',
            default: 'firmware version',
            description: 'the hub firmware version'
          }),
          blockType: BlockType.REPORTER
        }, {
          opcode: 'getRSSI',
          text: formatMessage({
            id: 'legoboost.getRSSI',
            default: 'Bluetooth signal strength',
            description: 'the Bluetooth signal strength'
          }),
          blockType: BlockType.REPORTER
        }, '---',
        // Separator

        // Hub alerts
        {
          opcode: 'whenBatteryLow',
          text: formatMessage({
            id: 'legoboost.whenBatteryLow',
            default: 'when battery is low',
            description: 'when the battery voltage is low'
          }),
          blockType: BlockType.HAT
        }, {
          opcode: 'whenMotorOverloaded',
          text: formatMessage({
            id: 'legoboost.whenMotorOverloaded',
            default: 'when motor overloaded',
            description: 'when a motor is drawing too much current'
          }),
          blockType: BlockType.HAT
        }],
        menus: {
          MOTOR_ID: {
            acceptReporters: true,
            items: [{
              text: 'A',
              value: BoostMotorLabel.A
            }, {
              text: 'B',
              value: BoostMotorLabel.B
            }, {
              text: 'C',
              value: BoostMotorLabel.C
            }, {
              text: 'D',
              value: BoostMotorLabel.D
            }, {
              text: 'AB',
              value: BoostMotorLabel.AB
            }, {
              text: 'ALL',
              value: BoostMotorLabel.ALL
            }]
          },
          MOTOR_ID_SINGLE: {
            acceptReporters: true,
            items: [{
              text: 'A',
              value: BoostMotorLabel.A
            }, {
              text: 'B',
              value: BoostMotorLabel.B
            }, {
              text: 'C',
              value: BoostMotorLabel.C
            }, {
              text: 'D',
              value: BoostMotorLabel.D
            }]
          },
          MOTOR_REPORTER_ID: {
            acceptReporters: true,
            items: [{
              text: 'A',
              value: BoostMotorLabel.A
            }, {
              text: 'B',
              value: BoostMotorLabel.B
            }, {
              text: 'C',
              value: BoostMotorLabel.C
            }, {
              text: 'D',
              value: BoostMotorLabel.D
            }]
          },
          SENSOR_PORTS: {
            acceptReporters: true,
            items: [{
              text: 'A',
              value: 'A'
            }, {
              text: 'B',
              value: 'B'
            }, {
              text: 'C',
              value: 'C'
            }, {
              text: 'D',
              value: 'D'
            }]
          },
          STOP_ACTION: {
            acceptReporters: true,
            items: [{
              text: formatMessage({
                id: 'legoboost.stopAction.float',
                default: 'float',
                description: 'motor stop action'
              }),
              value: 'float'
            }, {
              text: formatMessage({
                id: 'legoboost.stopAction.brake',
                default: 'brake',
                description: 'motor stop action'
              }),
              value: 'brake'
            }, {
              text: formatMessage({
                id: 'legoboost.stopAction.hold',
                default: 'hold',
                description: 'motor stop action'
              }),
              value: 'hold'
            }]
          },
          MOTOR_DIRECTION: {
            acceptReporters: true,
            items: [{
              text: formatMessage({
                id: 'legoboost.motorDirection.forward',
                default: 'this way',
                description: 'label for forward element in motor direction menu'
              }),
              value: BoostMotorDirection.FORWARD
            }, {
              text: formatMessage({
                id: 'legoboost.motorDirection.backward',
                default: 'that way',
                description: 'label for backward element in motor direction menu'
              }),
              value: BoostMotorDirection.BACKWARD
            }, {
              text: formatMessage({
                id: 'legoboost.motorDirection.reverse',
                default: 'reverse',
                description: 'label for reverse element in motor direction menu'
              }),
              value: BoostMotorDirection.REVERSE
            }]
          },
          TILT_DIRECTION: {
            acceptReporters: true,
            items: [{
              text: formatMessage({
                id: 'legoboost.tiltDirection.up',
                default: 'up',
                description: 'label for up element in tilt direction menu'
              }),
              value: BoostTiltDirection.UP
            }, {
              text: formatMessage({
                id: 'legoboost.tiltDirection.down',
                default: 'down',
                description: 'label for down element in tilt direction menu'
              }),
              value: BoostTiltDirection.DOWN
            }, {
              text: formatMessage({
                id: 'legoboost.tiltDirection.left',
                default: 'left',
                description: 'label for left element in tilt direction menu'
              }),
              value: BoostTiltDirection.LEFT
            }, {
              text: formatMessage({
                id: 'legoboost.tiltDirection.right',
                default: 'right',
                description: 'label for right element in tilt direction menu'
              }),
              value: BoostTiltDirection.RIGHT
            }]
          },
          TILT_DIRECTION_ANY: {
            acceptReporters: true,
            items: [{
              text: formatMessage({
                id: 'legoboost.tiltDirection.up',
                default: 'up'
              }),
              value: BoostTiltDirection.UP
            }, {
              text: formatMessage({
                id: 'legoboost.tiltDirection.down',
                default: 'down'
              }),
              value: BoostTiltDirection.DOWN
            }, {
              text: formatMessage({
                id: 'legoboost.tiltDirection.left',
                default: 'left'
              }),
              value: BoostTiltDirection.LEFT
            }, {
              text: formatMessage({
                id: 'legoboost.tiltDirection.right',
                default: 'right'
              }),
              value: BoostTiltDirection.RIGHT
            }, {
              text: formatMessage({
                id: 'legoboost.tiltDirection.any',
                default: 'any',
                description: 'label for any element in tilt direction menu'
              }),
              value: BoostTiltDirection.ANY
            }]
          },
          COLOR: {
            acceptReporters: true,
            items: [{
              text: formatMessage({
                id: 'legoboost.color.red',
                default: 'red',
                description: 'the color red'
              }),
              value: BoostColor.RED
            }, {
              text: formatMessage({
                id: 'legoboost.color.blue',
                default: 'blue',
                description: 'the color blue'
              }),
              value: BoostColor.BLUE
            }, {
              text: formatMessage({
                id: 'legoboost.color.green',
                default: 'green',
                description: 'the color green'
              }),
              value: BoostColor.GREEN
            }, {
              text: formatMessage({
                id: 'legoboost.color.yellow',
                default: 'yellow',
                description: 'the color yellow'
              }),
              value: BoostColor.YELLOW
            }, {
              text: formatMessage({
                id: 'legoboost.color.white',
                default: 'white',
                description: 'the color white'
              }),
              value: BoostColor.WHITE
            }, {
              text: formatMessage({
                id: 'legoboost.color.black',
                default: 'black',
                description: 'the color black'
              }),
              value: BoostColor.BLACK
            }, {
              text: formatMessage({
                id: 'legoboost.color.any',
                default: 'any color',
                description: 'any color'
              }),
              value: BoostColor.ANY
            }]
          }
        }
      };
    }

    // ========================================================================
    // UTILITY METHODS
    // ========================================================================

    /**
     * Get port ID from motor/sensor label
     * @param {string} label - Motor or sensor label
     * @return {number|null} Port ID or null if invalid
     */
  }, {
    key: "_getPortFromLabel",
    value: function _getPortFromLabel(label) {
      switch (label) {
        case 'A':
          return BoostPort.A;
        case 'B':
          return BoostPort.B;
        case 'C':
          return BoostPort.C;
        case 'D':
          return BoostPort.D;
        default:
          return null;
      }
    }

    /**
     * Execute callback for each motor specified by motor ID
     * @param {string} motorID - Motor specification
     * @param {Function} callback - Function to call for each motor
     */
  }, {
    key: "_forEachMotor",
    value: function _forEachMotor(motorID, callback) {
      var motors;
      switch (motorID) {
        case BoostMotorLabel.A:
          motors = [BoostPort.A];
          break;
        case BoostMotorLabel.B:
          motors = [BoostPort.B];
          break;
        case BoostMotorLabel.C:
          motors = [BoostPort.C];
          break;
        case BoostMotorLabel.D:
          motors = [BoostPort.D];
          break;
        case BoostMotorLabel.AB:
          motors = [BoostPort.A, BoostPort.B];
          break;
        case BoostMotorLabel.ALL:
          motors = [BoostPort.A, BoostPort.B, BoostPort.C, BoostPort.D];
          break;
        default:
          log.warn("Invalid motor ID: ".concat(motorID));
          motors = [];
          break;
      }
      var _iterator = _createForOfIteratorHelper(motors),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var index = _step.value;
          callback(index);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    // ========================================================================
    // MOTOR CONTROL BLOCKS
    // ========================================================================

    /**
     * Turn specified motor(s) on for a specified duration
     */
  }, {
    key: "motorOnFor",
    value: function motorOnFor(args) {
      var _this3 = this;
      var durationMS = Cast.toNumber(args.DURATION) * 1000;
      durationMS = MathUtil.clamp(durationMS, 0, 15000);
      return new Promise(function (resolve) {
        _this3._forEachMotor(args.MOTOR_ID, function (motorIndex) {
          var motor = _this3._peripheral.motor(motorIndex);
          if (motor) motor.turnOnFor(durationMS);
        });
        // Resolve after duration even if no motors connected
        setTimeout(resolve, durationMS);
      });
    }

    /**
     * Turn specified motor(s) on for a specified rotation
     */
  }, {
    key: "motorOnForRotation",
    value: function motorOnForRotation(args) {
      var _this4 = this;
      var degrees = Cast.toNumber(args.ROTATION) * 360;
      var sign = Math.sign(degrees);
      degrees = Math.abs(MathUtil.clamp(degrees, -360000, 360000));
      var motors = [];
      this._forEachMotor(args.MOTOR_ID, function (motorIndex) {
        motors.push(motorIndex);
      });
      var promises = motors.map(function (portID) {
        var motor = _this4._peripheral.motor(portID);
        if (motor) {
          if (motor.power === 0) return Promise.resolve();
          return new Promise(function (resolve) {
            motor.turnOnForDegrees(degrees, sign);
            motor.pendingRotationPromise = resolve;
          });
        }
        return null;
      });
      return Promise.all(promises).then(function () {});
    }

    /**
     * Turn motor to absolute position
     */
  }, {
    key: "motorRunToPosition",
    value: function motorRunToPosition(args) {
      var _this5 = this;
      var position = Cast.toNumber(args.POSITION);
      var promises = [];
      this._forEachMotor(args.MOTOR_ID, function (motorIndex) {
        var motor = _this5._peripheral.motor(motorIndex);
        if (motor) {
          promises.push(new Promise(function (resolve) {
            motor.turnToPosition(position);
            motor.pendingRotationPromise = resolve;
          }));
        }
      });
      return Promise.all(promises).then(function () {});
    }

    /**
     * Turn specified motor(s) on indefinitely
     */
  }, {
    key: "motorOn",
    value: function motorOn(args) {
      var _this6 = this;
      this._forEachMotor(args.MOTOR_ID, function (motorIndex) {
        var motor = _this6._peripheral.motor(motorIndex);
        if (motor) motor.turnOnForever();
      });
      return new Promise(function (resolve) {
        window.setTimeout(function () {
          resolve();
        }, BoostBLE.sendInterval);
      });
    }

    /**
     * Turn specified motor(s) off
     */
  }, {
    key: "motorOff",
    value: function motorOff(args) {
      var _this7 = this;
      this._forEachMotor(args.MOTOR_ID, function (motorIndex) {
        var motor = _this7._peripheral.motor(motorIndex);
        if (motor) motor.turnOff();
      });
      return new Promise(function (resolve) {
        window.setTimeout(function () {
          resolve();
        }, BoostBLE.sendInterval);
      });
    }

    /**
     * Set the power level of specified motor(s)
     */
  }, {
    key: "setMotorPower",
    value: function setMotorPower(args) {
      var _this8 = this;
      this._forEachMotor(args.MOTOR_ID, function (motorIndex) {
        var motor = _this8._peripheral.motor(motorIndex);
        if (motor) {
          motor.power = MathUtil.clamp(Cast.toNumber(args.POWER), 0, 100);
          // Update running motors
          switch (motor.status) {
            case BoostMotorState.ON_FOREVER:
              motor.turnOnForever();
              break;
            case BoostMotorState.ON_FOR_TIME:
              motor.turnOnFor(motor.pendingDurationTimeoutStartTime + motor.pendingDurationTimeoutDelay - Date.now());
              break;
          }
        }
      });
      return new Promise(function (resolve) {
        window.setTimeout(function () {
          resolve();
        }, BoostBLE.sendInterval);
      });
    }

    /**
     * Set the direction of rotation for specified motor(s)
     */
  }, {
    key: "setMotorDirection",
    value: function setMotorDirection(args) {
      var _this9 = this;
      this._forEachMotor(args.MOTOR_ID, function (motorIndex) {
        var motor = _this9._peripheral.motor(motorIndex);
        if (motor) {
          switch (args.MOTOR_DIRECTION) {
            case BoostMotorDirection.FORWARD:
              motor.direction = 1;
              break;
            case BoostMotorDirection.BACKWARD:
              motor.direction = -1;
              break;
            case BoostMotorDirection.REVERSE:
              motor.direction = -motor.direction;
              break;
            default:
              log.warn("Unknown motor direction in setMotorDirection: ".concat(args.MOTOR_DIRECTION));
              break;
          }

          // Update running motors
          switch (motor.status) {
            case BoostMotorState.ON_FOREVER:
              motor.turnOnForever();
              break;
            case BoostMotorState.ON_FOR_TIME:
              motor.turnOnFor(motor.pendingDurationTimeoutStartTime + motor.pendingDurationTimeoutDelay - Date.now());
              break;
          }
        }
      });
      return new Promise(function (resolve) {
        window.setTimeout(function () {
          resolve();
        }, BoostBLE.sendInterval);
      });
    }

    /**
     * Set motor stop action (float, brake, hold)
     */
  }, {
    key: "setMotorStopAction",
    value: function setMotorStopAction(args) {
      var _this10 = this;
      var stopModeMap = {
        float: BoostMotorEndState.FLOAT,
        brake: BoostMotorEndState.BRAKE,
        hold: BoostMotorEndState.HOLD
      };
      var action = stopModeMap[args.ACTION] || BoostMotorEndState.BRAKE;
      this._forEachMotor(args.MOTOR_ID, function (motorIndex) {
        var motor = _this10._peripheral.motor(motorIndex);
        if (motor) {
          motor.stopMode = action;
        }
      });
    }

    /**
     * Set motor acceleration time
     */
  }, {
    key: "setMotorAcceleration",
    value: function setMotorAcceleration(args) {
      var _this11 = this;
      var time = Cast.toNumber(args.TIME);
      this._forEachMotor(args.MOTOR_ID, function (motorIndex) {
        var motor = _this11._peripheral.motor(motorIndex);
        if (motor) {
          motor.setAcceleration(time);
        }
      });
    }

    /**
     * Set motor deceleration time
     */
  }, {
    key: "setMotorDeceleration",
    value: function setMotorDeceleration(args) {
      var _this12 = this;
      var time = Cast.toNumber(args.TIME);
      this._forEachMotor(args.MOTOR_ID, function (motorIndex) {
        var motor = _this12._peripheral.motor(motorIndex);
        if (motor) {
          motor.setDeceleration(time);
        }
      });
    }

    /**
     * Reset motor position
     */
  }, {
    key: "resetMotorPosition",
    value: function resetMotorPosition(args) {
      var _this13 = this;
      var position = Cast.toNumber(args.POSITION);
      this._forEachMotor(args.MOTOR_ID, function (motorIndex) {
        var motor = _this13._peripheral.motor(motorIndex);
        if (motor) {
          motor.resetPosition(position);
        }
      });
    }

    /**
     * Get motor position
     */
  }, {
    key: "getMotorPosition",
    value: function getMotorPosition(args) {
      var portID = null;
      switch (args.MOTOR_REPORTER_ID) {
        case BoostMotorLabel.A:
          portID = BoostPort.A;
          break;
        case BoostMotorLabel.B:
          portID = BoostPort.B;
          break;
        case BoostMotorLabel.C:
          portID = BoostPort.C;
          break;
        case BoostMotorLabel.D:
          portID = BoostPort.D;
          break;
        default:
          log.warn('Asked for a motor position that doesnt exist!');
          return 0;
      }
      if (portID !== null && this._peripheral.motor(portID)) {
        var val = this._peripheral.motor(portID).position;
        // Boost motor A position direction is reversed by design
        if (portID === BoostPort.A) {
          val *= -1;
        }
        return MathUtil.wrapClamp(val, 0, 360);
      }
      return 0;
    }

    // ========================================================================
    // SENSOR BLOCKS
    // ========================================================================

    /**
     * Check color sensor for specific color with port support
     */
  }, {
    key: "_checkColor",
    value: function () {
      var _checkColor2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(args) {
        var port, currentColor;
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              port = this._getPortFromLabel(args.PORT);
              if (!(port === null)) {
                _context2.next = 3;
                break;
              }
              return _context2.abrupt("return", false);
            case 3:
              _context2.next = 5;
              return this._peripheral._setInputMode(port, BoostMode.COLOR);
            case 5:
              currentColor = this._peripheral.getColor(port);
              if (!(args.COLOR === BoostColor.ANY)) {
                _context2.next = 8;
                break;
              }
              return _context2.abrupt("return", currentColor !== BoostColor.NONE);
            case 8:
              return _context2.abrupt("return", currentColor === args.COLOR);
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function _checkColor(_x3) {
        return _checkColor2.apply(this, arguments);
      }
      return _checkColor;
    }()
    /**
     * When color detected (hat block)
     */
  }, {
    key: "whenColor",
    value: function whenColor(args) {
      // For backward compatibility, also check global color property
      if (args.COLOR === BoostColor.ANY) {
        return this._peripheral.color !== BoostColor.NONE && this._peripheral.color !== this._peripheral.previousColor;
      }
      return args.COLOR === this._peripheral.color || this._checkColor(args);
    }

    /**
     * Check if seeing specific color (boolean block)
     */
  }, {
    key: "seeingColor",
    value: function seeingColor(args) {
      return this._checkColor(args);
    }

    /**
     * Get distance from color/distance sensor
     */
  }, {
    key: "getDistance",
    value: (function () {
      var _getDistance = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(args) {
        var port;
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              port = this._getPortFromLabel(args.PORT);
              if (!(port === null)) {
                _context3.next = 3;
                break;
              }
              return _context3.abrupt("return", 0);
            case 3:
              _context3.next = 5;
              return this._peripheral._setInputMode(port, BoostMode.DISTANCE);
            case 5:
              return _context3.abrupt("return", this._peripheral.getDistance(port));
            case 6:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function getDistance(_x4) {
        return _getDistance.apply(this, arguments);
      }
      return getDistance;
    }()
    /**
     * Get reflection from color/distance sensor
     */
    )
  }, {
    key: "getReflection",
    value: (function () {
      var _getReflection = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(args) {
        var port;
        return regenerator.wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              port = this._getPortFromLabel(args.PORT);
              if (!(port === null)) {
                _context4.next = 3;
                break;
              }
              return _context4.abrupt("return", 0);
            case 3:
              _context4.next = 5;
              return this._peripheral._setInputMode(port, BoostMode.REFLECTION);
            case 5:
              return _context4.abrupt("return", this._peripheral.getReflection(port));
            case 6:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function getReflection(_x5) {
        return _getReflection.apply(this, arguments);
      }
      return getReflection;
    }()
    /**
     * Get force from force sensor
     */
    )
  }, {
    key: "getForce",
    value: (function () {
      var _getForce = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(args) {
        var port;
        return regenerator.wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              port = this._getPortFromLabel(args.PORT);
              if (!(port === null)) {
                _context5.next = 3;
                break;
              }
              return _context5.abrupt("return", 0);
            case 3:
              _context5.next = 5;
              return this._peripheral._setInputMode(port, BoostMode.FORCE);
            case 5:
              return _context5.abrupt("return", this._peripheral.getForce(port));
            case 6:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function getForce(_x6) {
        return _getForce.apply(this, arguments);
      }
      return getForce;
    }()
    /**
     * Check if force sensor is pressed
     */
    )
  }, {
    key: "isForceSensorPressed",
    value: (function () {
      var _isForceSensorPressed = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6(args) {
        var port;
        return regenerator.wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              port = this._getPortFromLabel(args.PORT);
              if (!(port === null)) {
                _context6.next = 3;
                break;
              }
              return _context6.abrupt("return", false);
            case 3:
              _context6.next = 5;
              return this._peripheral._setInputMode(port, BoostMode.TOUCHED);
            case 5:
              return _context6.abrupt("return", this._peripheral.isForcePressed(port));
            case 6:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function isForceSensorPressed(_x7) {
        return _isForceSensorPressed.apply(this, arguments);
      }
      return isForceSensorPressed;
    }()
    /**
     * When force sensor pressed (hat block)
     */
    )
  }, {
    key: "whenForceSensorPressed",
    value: function whenForceSensorPressed(args) {
      return this.isForceSensorPressed(args);
    }

    /**
     * Test whether the tilt sensor is currently tilted (hat block)
     */
  }, {
    key: "whenTilted",
    value: function whenTilted(args) {
      return this._isTilted(args.TILT_DIRECTION_ANY);
    }

    /**
     * Test whether the tilt sensor is currently tilted (boolean block)
     */
  }, {
    key: "isTilted",
    value: function isTilted(args) {
      return this._isTilted(args.TILT_DIRECTION_ANY);
    }

    /**
     * Get tilt angle in specific direction
     */
  }, {
    key: "getTiltAngle",
    value: function getTiltAngle(args) {
      return this._getTiltAngle(args.TILT_DIRECTION);
    }

    /**
     * Internal tilt detection logic
     * @param {string} direction - Tilt direction
     * @return {boolean} Whether tilted in that direction
     * @private
     */
  }, {
    key: "_isTilted",
    value: function _isTilted(direction) {
      switch (direction) {
        case BoostTiltDirection.ANY:
          return Math.abs(this._peripheral.tiltX) >= Scratch3BoostBlocks.TILT_THRESHOLD || Math.abs(this._peripheral.tiltY) >= Scratch3BoostBlocks.TILT_THRESHOLD;
        default:
          return this._getTiltAngle(direction) >= Scratch3BoostBlocks.TILT_THRESHOLD;
      }
    }

    /**
     * Internal tilt angle calculation
     * @param {string} direction - Tilt direction
     * @return {number} Tilt angle in degrees
     * @private
     */
  }, {
    key: "_getTiltAngle",
    value: function _getTiltAngle(direction) {
      switch (direction) {
        case BoostTiltDirection.UP:
          return this._peripheral.tiltY > 90 ? 256 - this._peripheral.tiltY : -this._peripheral.tiltY;
        case BoostTiltDirection.DOWN:
          return this._peripheral.tiltY > 90 ? this._peripheral.tiltY - 256 : this._peripheral.tiltY;
        case BoostTiltDirection.LEFT:
          return this._peripheral.tiltX > 90 ? this._peripheral.tiltX - 256 : this._peripheral.tiltX;
        case BoostTiltDirection.RIGHT:
          return this._peripheral.tiltX > 90 ? 256 - this._peripheral.tiltX : -this._peripheral.tiltX;
        default:
          log.warn("Unknown tilt direction in _getTiltAngle: ".concat(direction));
          return 0;
      }
    }

    // ========================================================================
    // HUB CONTROL BLOCKS
    // ========================================================================

    /**
     * Set the LED's hue
     */
  }, {
    key: "setLightHue",
    value: function setLightHue(args) {
      var inputHue = Cast.toNumber(args.HUE);
      inputHue = MathUtil.wrapClamp(inputHue, 0, 100);
      var hue = inputHue * 360 / 100;
      var rgbObject = color.hsvToRgb({
        h: hue,
        s: 1,
        v: 1
      });
      var rgbDecimal = color.rgbToDecimal(rgbObject);
      this._peripheral.setLED(rgbDecimal);
      return new Promise(function (resolve) {
        window.setTimeout(function () {
          resolve();
        }, BoostBLE.sendInterval);
      });
    }

    /**
     * Shutdown the hub
     */
  }, {
    key: "shutdown",
    value: function shutdown() {
      this._peripheral.shutdown();
    }

    /**
     * When hub button pressed (hat block)
     */
  }, {
    key: "whenButtonPressed",
    value: function whenButtonPressed() {
      return this._peripheral.hubStatus.buttonPressed;
    }

    /**
     * Check if hub button is pressed (boolean block)
     */
  }, {
    key: "isButtonPressed",
    value: function isButtonPressed() {
      return this._peripheral.hubStatus.buttonPressed;
    }

    /**
     * Get battery level
     */
  }, {
    key: "getBatteryLevel",
    value: function getBatteryLevel() {
      return this._peripheral.hubStatus.batteryLevel;
    }

    /**
     * Get firmware version
     */
  }, {
    key: "getFirmwareVersion",
    value: function getFirmwareVersion() {
      return this._peripheral.hubStatus.fwVersion;
    }

    /**
     * Get Bluetooth signal strength
     */
  }, {
    key: "getRSSI",
    value: function getRSSI() {
      return this._peripheral.hubStatus.rssi;
    }

    /**
     * When battery is low (hat block)
     */
  }, {
    key: "whenBatteryLow",
    value: function whenBatteryLow() {
      return this._peripheral.hubStatus.lowVoltage;
    }

    /**
     * When motor is overloaded (hat block)
     */
  }, {
    key: "whenMotorOverloaded",
    value: function whenMotorOverloaded() {
      return this._peripheral.hubStatus.highCurrent || this._peripheral.hubStatus.overPower;
    }
  }], [{
    key: "EXTENSION_ID",
    get: function get() {
      return 'legoboost';
    }
  }, {
    key: "TILT_THRESHOLD",
    get: function get() {
      return 15;
    }
  }]);
  return Scratch3BoostBlocks;
}();
var blockClass = Scratch3BoostBlocks;

export { blockClass, entry };
