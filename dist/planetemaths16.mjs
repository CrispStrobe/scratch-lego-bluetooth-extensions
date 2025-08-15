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
  return "object" === _typeof$1(a) && null !== a && a.$$typeof === p$1;
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
  var d = _typeof$1(a);
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
  } else if (null === a || "object" !== _typeof$1(a) ? f = null : (f = B && a[B] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), k = 0; !(d = a.next()).done;) d = d.value, f = b + U(d, k++), g += T(d, f, c, e);else if ("object" === d) throw c = "" + a, Error(C(31, "[object Object]" === c ? "object with keys {" + Object.keys(a).join(", ") + "}" : c, ""));
  return g;
}
function V(a, b, c) {
  return null == a ? 0 : T(a, "", b, c);
}
function U(a, b) {
  return "object" === _typeof$1(a) && null !== a && null != a.key ? escape$1(a.key) : b.toString(36);
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
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + _typeof$1(typeSpecs[typeSpecName]) + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$2);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning$1((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + _typeof$1(error) + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
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
  if ("object" === _typeof$1(a) && null !== a) {
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
  return z(a) === f$1;
};
reactIs_production_min.isSuspense = function (a) {
  return z(a) === p;
};
reactIs_production_min.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f$1 || a === p || a === q || "object" === _typeof$1(a) && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
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
  browser(intl, '[React Intl] Could not find required `intl` object. ' + '<IntlProvider> needs to exist in the component ancestry.');
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

var img$1 = "data:image/png;base64,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fwj/jWdm8GlxAOAAMn9HIRriAcA+ZC43Rsxk5N4P0QAPANvaSvVvESfb2szEUiMh+TdMTg7aIXtyAPj25+Tk2Mjk5HgpADhk3ikumpnrp/9iEF98HwB2ql3Q9qp/z9QzM/93Pf57BdIK/rH+B9ugF/t5sIPOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFz2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4wLWMwMDAgNzkuZGFiYWNiYiwgMjAyMS8wNC8xNC0wMDozOTo0NCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjUgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA4LTI0VDEyOjA4OjI2KzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0xMC0zMVQwMDoyNzo1MiswMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0xMC0zMVQwMDoyNzo1MiswMjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDMyNzhiMDYtZGJiYS00YWMyLTlhNjktZTdmMzQwNDAzMmQ3IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6OWIwMmM3ZjEtY2M0My1mOTQ5LThlODEtNzk0ODEzN2E0YTRkIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MTgzZDAwNGYtZGJhNy00ZDRjLWE0ODQtMmQwMDZjOGE1YzYwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxODNkMDA0Zi1kYmE3LTRkNGMtYTQ4NC0yZDAwNmM4YTVjNjAiIHN0RXZ0OndoZW49IjIwMjEtMDgtMjRUMTI6MDg6MjYrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowMzI3OGIwNi1kYmJhLTRhYzItOWE2OS1lN2YzNDA0MDMyZDciIHN0RXZ0OndoZW49IjIwMjEtMTAtMzFUMDA6Mjc6NTIrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pl/pauEAAH/FSURBVHja7Z0HYBTV1se39/TeO4HQu/TeuyCCiIggCCqIVKU36SACYkEBFQSkQ+i919BrqAFSCIT0bN93kvXFze4m7GZndmdmz//z8SU303Z25v7uOfecc9mD5l9hWSmxkCvkc1hUUk6BWqPRsWgruJ9wV1moIinV2gKFRmfl9+ku49P082bmquj+lbHZLFcpn22Xc2XlqXQ6Rj3wLhIe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";

var img = "data:image/svg+xml,%3c%3fxml version='1.0' standalone='no'%3f%3e%3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 20010904//EN' 'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg version='1.0' xmlns='http://www.w3.org/2000/svg' width='1280.000000pt' height='1280.000000pt' viewBox='0 0 1280.000000 1280.000000' preserveAspectRatio='xMidYMid meet'%3e%3cmetadata%3eCreated by potrace 1.15%2c written by Peter Selinger 2001-2017%3c/metadata%3e%3cg transform='translate(0.000000%2c1280.000000) scale(0.100000%2c-0.100000)'fill='white' stroke='none'%3e%3cpath d='M4225 11533 c-100 -6 -311 -23 -335 -27 -14 -3 -59 -10 -100 -16-408 -60 -813 -229 -1110 -465 -98 -77 -307 -287 -393 -395 -37 -47 -74 -93-82 -102 -7 -9 -22 -29 -32 -45 -9 -15 -20 -30 -23 -33 -16 -13 -139 -202-225 -345 -94 -157 -256 -467 -330 -635 -21 -47 -48 -108 -60 -136 -71 -158-234 -584 -250 -654 -2 -8 -8 -37 -14 -63 -27 -117 -16 -290 23 -366 40 -76162 -100 372 -73 118 16 204 44 274 92 61 41 136 119 179 185 14 22 28 42 3145 3 3 19 25 35 50 17 25 34 50 38 55 4 6 34 46 65 90 101 143 233 300 336398 289 278 518 397 871 452 58 10 122 14 328 25 184 10 214 9 256 -5 106 -35121 -98 96 -410 -3 -38 -7 -104 -10 -145 -17 -256 -42 -587 -50 -670 -20 -206-26 -262 -39 -400 -19 -190 -34 -332 -41 -385 -3 -22 -10 -76 -15 -120 -6 -44-17 -132 -25 -195 -8 -63 -19 -142 -24 -175 -5 -33 -14 -94 -20 -135 -15 -102-38 -247 -57 -355 -9 -49 -18 -101 -20 -115 -5 -26 -42 -220 -50 -255 -8 -40-24 -120 -28 -140 -24 -118 -69 -303 -131 -535 -146 -551 -395 -1063 -780-1610 -25 -36 -53 -76 -63 -90 -9 -14 -19 -27 -22 -30 -17 -17 -182 -264 -250-375 -152 -247 -219 -413 -276 -680 -27 -127 -26 -365 2 -505 64 -314 256-557 538 -685 244 -110 548 -108 857 5 74 26 235 110 272 140 152 125 200 168241 219 27 33 52 61 55 61 4 0 15 13 24 30 10 16 23 35 30 42 7 7 26 33 43 58184 265 381 726 493 1154 89 340 192 880 255 1346 70 507 116 894 162 1355 228 6 66 9 85 5 43 11 101 30 310 8 91 17 188 20 215 5 52 21 236 30 340 3 3310 112 15 175 9 106 63 792 75 955 3 39 7 99 10 135 7 94 14 192 20 295 3 508 119 10 155 3 36 10 135 15 220 37 580 40 602 75 657 9 14 38 35 63 46 47 2249 22 963 25 862 2 919 2 965 -15 33 -13 56 -30 72 -53 23 -33 24 -41 18 -140-3 -58 -8 -121 -11 -140 -2 -19 -9 -82 -15 -140 -5 -58 -14 -150 -20 -205 -24-227 -44 -430 -55 -550 -3 -27 -7 -72 -10 -100 -14 -139 -14 -137 -45 -465-30 -318 -48 -523 -55 -615 -2 -33 -7 -85 -10 -115 -2 -30 -7 -86 -10 -125 -3-38 -7 -92 -10 -120 -3 -27 -7 -84 -10 -125 -20 -286 -26 -373 -35 -512 -5-86 -11 -190 -14 -230 -3 -40 -8 -127 -11 -193 -3 -66 -10 -219 -16 -340 -20-390 6 -1130 52 -1530 6 -49 12 -107 15 -127 2 -21 9 -68 15 -105 6 -38 12-79 14 -93 3 -31 32 -192 44 -245 111 -505 245 -828 465 -1115 27 -36 56 -7265 -81 9 -8 32 -34 51 -58 61 -75 230 -220 345 -297 333 -222 693 -309 1115-270 217 21 480 98 697 206 120 59 284 160 348 212 229 190 372 331 457 45112 18 30 41 40 51 10 11 18 23 18 27 0 4 6 14 13 21 62 66 217 356 300 563157 394 304 1011 333 1401 20 271 -119 446 -361 453 -165 5 -295 -61 -373-191 -17 -30 -52 -107 -77 -171 -109 -290 -191 -439 -303 -553 -85 -88 -95-96 -167 -140 -229 -138 -516 -160 -774 -57 -70 28 -167 83 -216 123 -47 39-148 142 -175 178 -14 18 -33 43 -43 54 -33 40 -126 243 -156 343 -59 191 -96423 -109 670 -18 350 -2 1241 33 1805 15 249 36 562 40 615 3 33 7 85 10 11539 461 86 924 130 1275 71 571 75 585 180 632 37 17 101 18 915 23 771 4 8837 940 22 36 9 107 24 158 33 52 9 118 27 148 40 101 45 175 134 211 254 14 4917 128 20 596 3 360 1 568 -7 625 -20 157 -96 273 -216 330 -132 64 90 60-3744 58 -1917 -1 -3507 -3 -3535 -5z'/%3e%3c/g%3e%3c/svg%3e";

var entry = {
  name: /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: "Maths Planet",
    description: "Perform a few more maths and strings operations",
    id: "gui.extension.planetemaths.name"
  }),
  extensionId: 'planetemaths',
  // match the id in the index.js file
  collaborator: 'Planète Maths',
  iconURL: img$1,
  insetIconURL: img,
  description: /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: "Use mathematics tools.",
    description: "Perform a few more maths and strings operations",
    id: "gui.extension.planetemaths.description"
  }),
  featured: true,
  disabled: false,
  bluetoothRequired: false,
  internetConnectionRequired: false
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function toPrimitive(t, r) {
  if ("object" != _typeof$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof$1(i) ? i : String(i);
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
    } else if (element[2] && _typeof$1(element[2]) === 'object') {
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
      var id = _typeof$1(msg) === 'object' && msg.id || generateId(pattern);
      var translated = translate(pattern, id, locales || currentLocales);
      var format = translated.format || (translated.format = interpret(parse(translated.message), locales || currentLocales, types));
      return format(args);
    }
    formatMessage.rich = function rich(msg /*: Message */, args /*:: ?: Object */, locales /*:: ?: Locales */) {
      var pattern = typeof msg === 'string' ? msg : msg.default;
      var id = _typeof$1(msg) === 'object' && msg.id || generateId(pattern);
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
        var props = _typeof$1(style) === 'object' ? mapObject(style, args) : style;
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
      if (_typeof$1(offset) === 'object' && _typeof$1(options) !== 'object') {
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
var color$3 = Color$1;

var Color = color$3;

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
function color$2(fg, isInverse) {
  if (isInverse) {
    return 'color: #fff; background: ' + hex[fg] + ';';
  } else {
    return 'color: ' + hex[fg] + ';';
  }
}
var util = color$2;

var Transform$5 = transform,
  color$1 = util;
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
    fn.apply(console, ['%c' + name + ' %c' + level, color$1('gray'), color$1.apply(color$1, colors$1[level])].concat(args));
  }
};

// NOP, because piping the formatted logs can only cause trouble.
logger$4.pipe = function () {};
var color_1 = logger$4;

var Transform$4 = transform,
  color = util,
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
    fn.apply(console, ['%c' + name + ' ' + args.slice(0, i).join(' '), color.apply(color, colors[level])].concat(args.slice(i)));
  } else {
    fn.apply(console, ['%c' + name, color.apply(color, colors[level])].concat(args));
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
minilog('vm');

var formatMessage = formatMessage$1.exports;
var ArgumentType = argumentType;
var BlockType = blockType;
var Cast = cast;
var MathUtil = mathUtil;

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// Simple mathematical icon as base64 SVG
var blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iNCIgZmlsbD0iIzQ4NzliNyIvPgo8dGV4dCB4PSIyMCIgeT0iMjgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7ijJg8L3RleHQ+Cjwvc3ZnPgo=';
var extensionTranslations = {
  'de': {
    'pm.mathop': '[OPERATOR] von [NUM1]',
    'pm.mathopdiv': '[OPERATOR] der Division von [NUM1] durch [NUM2]',
    'pm.mathop2': '[OPERATOR] von [NUM1] und [NUM2]',
    'text.pgcd': 'ggT',
    'text.ppcm': 'kgV',
    'text.reste': 'Rest',
    'text.quotient': 'Quotient',
    'pm.multiple': '[NUM1] ist ein [choix1] von [NUM2]',
    'text.multiple': 'Vielfaches',
    'text.diviseur': 'Teiler',
    'text.vad': 'Abrundung',
    'text.vae': 'Aufrundung',
    'text.arrondi': 'Rundung',
    'text.c1': 'Einerstelle',
    'text.c2': 'Zehnerstelle',
    'text.c3': 'Hunderterstelle',
    'text.c4': 'Tausenderstelle',
    'text.c5': 'Zehntausenderstelle',
    'text.c6': 'Hunderttausenderstelle',
    'text.c7': 'Einmillionstelle',
    'text.c8': 'Zehnmillionstelle',
    'text.c9': 'Hundertmillionstelle',
    'text.c10': 'Einmilliardenstelle',
    'text.c11': 'Zehnmilliardenstelle',
    'text.c12': 'Hundertmilliardenstelle',
    'pm.pentiere': '[choix1] von [NUM1]',
    'pm.pdecimale': '[choix1] von [NUM1]',
    'pm.sommechiffres': 'Quersumme von [NUM1]',
    'pm.arrondis': '[TYPE] von [NUM1] auf [CHIFFRE]',
    'pm.random': 'Zufallszahl von [NUM1] bis [NUM2]',
    'pm.min': 'Mininum von [NUM1] und [NUM2]',
    'pm.max': 'Maximum von [NUM1] und [NUM2]',
    'pm.and': '[OPERAND1] und [OPERAND2]',
    'pm.or': '[OPERAND1] oder [OPERAND2]',
    'pm.not': 'nicht [OPERAND1]',
    'pm.join': 'verbinde [STRING1] und [STRING2]',
    'pm.letterof': 'Zeichen [LETTER] von [STRING]',
    'pm.length': 'Länge von [STRING]',
    'pm.contains': '[STRING1] enthält [STRING2] ?',
    'pm.extract': 'Extrahieren der Zeichen [NUM1] bis [NUM2] aus [STRING]',
    'pm.inverse': '1 geteilt durch [NUM1]',
    'text.d1': 'Zehntelstelle',
    'text.d2': 'Hundertstelstelle',
    'text.d3': 'Tausendstelstelle',
    'text.d4': 'Zehntausendstelstelle',
    'text.d5': 'Hunderttausendstelstelle',
    'text.d6': 'Millionstelstelle',
    'text.a0': 'Einer',
    'text.a1': 'Zehntel',
    'text.a2': 'Hundertstel',
    'text.a3': 'Tausendstel',
    'text.a4': 'Zehntausendstel',
    'text.a5': 'Hunderttausendstel',
    'text.a6': 'Millionstel',
    'pm.title': 'Mathe'
  },
  'fr': {
    'pm.mathop': '[OPERATOR] de [NUM1]',
    'pm.mathopdiv': '[OPERATOR] de [NUM1] divisé par [NUM2]',
    'pm.mathop2': '[OPERATOR] de [NUM1] et [NUM2]',
    'text.pgcd': 'PGCD',
    'text.ppcm': 'PPCM',
    'text.reste': 'reste',
    'text.quotient': 'quotient',
    'pm.multiple': '[NUM1] est un [choix1] de [NUM2]',
    'text.multiple': 'multiple',
    'text.diviseur': 'diviseur',
    'text.vad': 'Valeur approchée par défaut',
    'text.vae': 'Valeur approchée par excès',
    'text.arrondi': 'Arrondi',
    'text.c1': 'unités',
    'text.c2': 'dizaines',
    'text.c3': 'centaines',
    'text.c4': 'unités de mille',
    'text.c5': 'dizaines de mille',
    'text.c6': 'centaines de mille',
    'text.c7': 'unités de millions',
    'text.c8': 'dizaines de millions',
    'text.c9': 'centaines de millions',
    'text.c10': 'unités de milliards',
    'text.c11': 'dizaines de milliards',
    'text.c12': 'centaines de milliards',
    'pm.pentiere': 'chiffre des [choix1] de [NUM1]',
    'pm.pdecimale': 'chiffre des [choix1] de [NUM1]',
    'pm.sommechiffres': 'somme des chiffres de [NUM1]',
    'pm.arrondis': '[TYPE] de [NUM1] [CHIFFRE]',
    'pm.random': 'nombre aléatoire entre [NUM1] et [NUM2]',
    'pm.min': 'mininum de [NUM1] et [NUM2]',
    'pm.max': 'maximum de [NUM1] et [NUM2]',
    'pm.and': '[OPERAND1] et [OPERAND2]',
    'pm.or': '[OPERAND1] ou [OPERAND2]',
    'pm.not': 'non [OPERAND1]',
    'pm.join': 'regrouper [STRING1] et [STRING2]',
    'pm.letterof': 'lettre [LETTER] de [STRING]',
    'pm.length': 'longueur de [STRING]',
    'pm.contains': '[STRING1] contient [STRING2] ?',
    'pm.extract': 'extraire caractères [NUM1] à [NUM2] de [STRING]',
    'pm.inverse': '1 divisé par [NUM1]',
    'text.d1': 'dixièmes',
    'text.d2': 'centièmes',
    'text.d3': 'millièmes',
    'text.d4': 'dix-millièmes',
    'text.d5': 'cent-millièmes',
    'text.d6': 'millionièmes',
    'text.a0': 'à l\'unité',
    'text.a1': 'au dixième',
    'text.a2': 'au centième',
    'text.a3': 'au millième',
    'text.a4': 'au dix-millième',
    'text.a5': 'au cent-millième',
    'text.a6': 'au millionième',
    'pm.title': 'Maths'
  },
  'en': {
    'pm.mathop': '[OPERATOR] of [NUM1]',
    'pm.mathopdiv': '[OPERATOR] of [NUM1] divided by [NUM2]',
    'pm.mathop2': '[OPERATOR] of [NUM1] and [NUM2]',
    'text.pgcd': 'GCD',
    'text.ppcm': 'LCM',
    'text.reste': 'remainder',
    'text.quotient': 'quotient',
    'pm.multiple': '[NUM1] is a [choix1] of [NUM2]',
    'text.multiple': 'multiple',
    'text.diviseur': 'divisor',
    'text.vad': 'Approximate value by defect',
    'text.vae': 'Approximate value by excess',
    'text.arrondi': 'Round',
    'text.c1': 'units',
    'text.c2': 'tens',
    'text.c3': 'hundreds',
    'text.c4': 'thousands',
    'text.c5': 'ten thousands',
    'text.c6': 'hundred thousands',
    'text.c7': 'millions',
    'text.c8': 'ten millions',
    'text.c9': 'hundred millions',
    'text.c10': 'billions',
    'text.c11': 'ten billions',
    'text.c12': 'hundred billions',
    'pm.pentiere': '[choix1] digit of [NUM1]',
    'pm.pdecimale': '[choix1] digit of [NUM1]',
    'pm.sommechiffres': 'sum of digits of [NUM1]',
    'pm.arrondis': '[TYPE] [NUM1] to [CHIFFRE]',
    'pm.random': 'random number from [NUM1] to [NUM2]',
    'pm.min': 'minimum of [NUM1] and [NUM2]',
    'pm.max': 'maximum of [NUM1] and [NUM2]',
    'pm.and': '[OPERAND1] and [OPERAND2]',
    'pm.or': '[OPERAND1] or [OPERAND2]',
    'pm.not': 'not [OPERAND1]',
    'pm.join': 'join [STRING1] [STRING2]',
    'pm.letterof': 'letter [LETTER] of [STRING]',
    'pm.length': 'length of [STRING]',
    'pm.contains': '[STRING1] contains [STRING2] ?',
    'pm.extract': 'extract characters from [NUM1] to [NUM2] of [STRING]',
    'pm.inverse': '1 divided by [NUM1]',
    'text.d1': 'tenths',
    'text.d2': 'hundredths',
    'text.d3': 'thousandths',
    'text.d4': 'ten thousandths',
    'text.d5': 'hundred thousandths',
    'text.d6': 'millionths',
    'text.a0': 'the unit',
    'text.a1': 'tenth',
    'text.a2': 'hundredth',
    'text.a3': 'thousandth',
    'text.a4': 'ten thousandth',
    'text.a5': 'hundred thousandth',
    'text.a6': 'millionth',
    'pm.title': 'Maths'
  }
};
var Scratch3PMBlocks = /*#__PURE__*/function () {
  function Scratch3PMBlocks(runtime) {
    _classCallCheck(this, Scratch3PMBlocks);
    this.runtime = runtime;
    this.locale = this.getLocale();
    this.setupTranslations();
  }
  _createClass(Scratch3PMBlocks, [{
    key: "setupTranslations",
    value: function setupTranslations() {
      // Setup formatMessage with current locale and all translations
      formatMessage.setup({
        locale: this.locale,
        translations: extensionTranslations
      });
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      // Try to get locale from runtime first
      if (this.runtime && this.runtime.getLocale) {
        var runtimeLocale = this.runtime.getLocale();
        if (runtimeLocale && extensionTranslations[runtimeLocale]) {
          return runtimeLocale;
        }
      }

      // Check browser locale
      var browserLocale = typeof navigator !== 'undefined' && navigator.language || typeof navigator !== 'undefined' && navigator.userLanguage || 'en';
      var shortLocale = browserLocale.split('-')[0];

      // Return supported locale or fallback to English
      return extensionTranslations[shortLocale] ? shortLocale : 'en';
    }

    // Helper function to get translated text
  }, {
    key: "_t",
    value: function _t(id) {
      var defaultText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      return formatMessage({
        id: id,
        default: defaultText,
        description: description
      });
    }
  }, {
    key: "getInfo",
    value: function getInfo() {
      // Ensure translations are set up before creating blocks
      this.setupTranslations();
      return {
        id: 'planetemaths',
        name: this._t('pm.title', 'Maths'),
        blockIconURI: blockIconURI,
        color1: '#4879b7',
        color2: '#000000',
        blocks: [{
          opcode: 'add',
          text: '[NUM1] + [NUM2]',
          blockType: BlockType.REPORTER,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, {
          opcode: 'substract',
          text: '[NUM1] - [NUM2]',
          blockType: BlockType.REPORTER,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, {
          opcode: 'multiply',
          text: '[NUM1] × [NUM2]',
          blockType: BlockType.REPORTER,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, {
          opcode: 'divide',
          text: '[NUM1] ÷ [NUM2]',
          blockType: BlockType.REPORTER,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, '---', {
          opcode: 'pow',
          text: '[NUM1] ^ [NUM2]',
          blockType: BlockType.REPORTER,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, '---', {
          opcode: 'mathop',
          text: this._t('pm.mathop', '[OPERATOR] of [NUM1]'),
          blockType: BlockType.REPORTER,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            OPERATOR: {
              type: ArgumentType.STRING,
              menu: 'LIST_MATHOP',
              defaultValue: 'sqrt'
            }
          }
        }, '---', {
          opcode: 'mathopdiv',
          text: this._t('pm.mathopdiv', '[OPERATOR] of [NUM1] divided by [NUM2]'),
          blockType: BlockType.REPORTER,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            OPERATOR: {
              type: ArgumentType.STRING,
              menu: 'LIST_MATHOPDIV',
              defaultValue: 'reste'
            }
          }
        }, {
          opcode: 'mathop2',
          text: this._t('pm.mathop2', '[OPERATOR] of [NUM1] and [NUM2]'),
          blockType: BlockType.REPORTER,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            OPERATOR: {
              type: ArgumentType.STRING,
              menu: 'LIST_MATHOP2',
              defaultValue: 'pgcd'
            }
          }
        }, {
          opcode: 'multiple',
          text: this._t('pm.multiple', '[NUM1] is a [choix1] of [NUM2]'),
          blockType: BlockType.BOOLEAN,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            choix1: {
              type: ArgumentType.STRING,
              menu: 'MULTIPLE_DIVISEUR',
              defaultValue: 'multiple'
            }
          }
        }, '---', {
          opcode: 'arrondis',
          text: this._t('pm.arrondis', '[TYPE] [NUM1] to [CHIFFRE]'),
          blockType: BlockType.REPORTER,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            TYPE: {
              type: ArgumentType.STRING,
              menu: 'ARRONDIS',
              defaultValue: 'arrondi'
            },
            CHIFFRE: {
              type: ArgumentType.STRING,
              menu: 'CHIFFRE_ARRONDIS',
              defaultValue: '0'
            }
          }
        }, '---', {
          opcode: 'chiffre_pentiere',
          text: this._t('pm.pentiere', '[choix1] digit of [NUM1]'),
          blockType: BlockType.REPORTER,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            choix1: {
              type: ArgumentType.STRING,
              menu: 'PARTIE_ENTIERE',
              defaultValue: '0'
            }
          }
        }, {
          opcode: 'chiffre_pdecimale',
          text: this._t('pm.pdecimale', '[choix1] digit of [NUM1]'),
          blockType: BlockType.REPORTER,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            choix1: {
              type: ArgumentType.STRING,
              menu: 'PARTIE_DECIMALE',
              defaultValue: '1'
            }
          }
        }, {
          opcode: 'sommechiffres',
          text: this._t('pm.sommechiffres', 'sum of digits of [NUM1]'),
          blockType: BlockType.REPORTER,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, '---', {
          opcode: 'nombre_pi',
          text: 'π',
          blockType: BlockType.REPORTER
        }, {
          opcode: 'oppose',
          text: '- [NUM1]',
          blockType: BlockType.REPORTER,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, {
          opcode: 'inverse',
          text: this._t('pm.inverse', '1 divided by [NUM1]'),
          blockType: BlockType.REPORTER,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, {
          opcode: 'pourcent',
          text: '[NUM1] %',
          blockType: BlockType.REPORTER,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, '---', {
          opcode: 'random',
          text: this._t('pm.random', 'random number from [NUM1] to [NUM2]'),
          blockType: BlockType.REPORTER,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: '1'
            },
            NUM2: {
              type: ArgumentType.NUMBER,
              defaultValue: '10'
            }
          }
        }, '---', {
          opcode: 'gt',
          text: '[NUM1] < [NUM2]',
          blockType: BlockType.BOOLEAN,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: ArgumentType.NUMBER,
              defaultValue: '50'
            }
          }
        }, {
          opcode: 'gte',
          text: '[NUM1] ≤ [NUM2]',
          blockType: BlockType.BOOLEAN,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: ArgumentType.NUMBER,
              defaultValue: '50'
            }
          }
        }, {
          opcode: 'equals',
          text: '[NUM1] = [NUM2]',
          blockType: BlockType.BOOLEAN,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: ArgumentType.NUMBER,
              defaultValue: '50'
            }
          }
        }, {
          opcode: 'lt',
          text: '[NUM1] > [NUM2]',
          blockType: BlockType.BOOLEAN,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: ArgumentType.NUMBER,
              defaultValue: '50'
            }
          }
        }, {
          opcode: 'lte',
          text: '[NUM1] ≥ [NUM2]',
          blockType: BlockType.BOOLEAN,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: ArgumentType.NUMBER,
              defaultValue: '50'
            }
          }
        }, {
          opcode: 'min',
          text: this._t('pm.min', 'minimum of [NUM1] and [NUM2]'),
          blockType: BlockType.REPORTER,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, {
          opcode: 'max',
          text: this._t('pm.max', 'maximum of [NUM1] and [NUM2]'),
          blockType: BlockType.REPORTER,
          arguments: {
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            },
            NUM2: {
              type: ArgumentType.NUMBER,
              defaultValue: ' '
            }
          }
        }, '---', {
          opcode: 'and',
          text: this._t('pm.and', '[OPERAND1] and [OPERAND2]'),
          blockType: BlockType.BOOLEAN,
          arguments: {
            OPERAND1: {
              type: ArgumentType.BOOLEAN,
              defaultValue: ' '
            },
            OPERAND2: {
              type: ArgumentType.BOOLEAN,
              defaultValue: ' '
            }
          }
        }, {
          opcode: 'or',
          text: this._t('pm.or', '[OPERAND1] or [OPERAND2]'),
          blockType: BlockType.BOOLEAN,
          arguments: {
            OPERAND1: {
              type: ArgumentType.BOOLEAN,
              defaultValue: ' '
            },
            OPERAND2: {
              type: ArgumentType.BOOLEAN
            }
          }
        }, {
          opcode: 'not',
          text: this._t('pm.not', 'not [OPERAND1]'),
          blockType: BlockType.BOOLEAN,
          arguments: {
            OPERAND1: {
              type: ArgumentType.BOOLEAN,
              defaultValue: ' '
            }
          }
        }, '---', {
          opcode: 'join',
          text: this._t('pm.join', 'join [STRING1] [STRING2]'),
          blockType: BlockType.REPORTER,
          arguments: {
            STRING1: {
              type: ArgumentType.STRING,
              defaultValue: 'Planète '
            },
            STRING2: {
              type: ArgumentType.STRING,
              defaultValue: 'Maths'
            }
          }
        }, {
          opcode: 'letterOf',
          text: this._t('pm.letterof', 'letter [LETTER] of [STRING]'),
          blockType: BlockType.REPORTER,
          arguments: {
            STRING: {
              type: ArgumentType.STRING,
              defaultValue: 'Maths'
            },
            LETTER: {
              type: ArgumentType.NUMBER,
              defaultValue: '1'
            }
          }
        }, {
          opcode: 'length',
          text: this._t('pm.length', 'length of [STRING]'),
          blockType: BlockType.REPORTER,
          arguments: {
            STRING: {
              type: ArgumentType.STRING,
              defaultValue: 'Maths'
            }
          }
        }, {
          opcode: 'contains',
          text: this._t('pm.contains', '[STRING1] contains [STRING2] ?'),
          blockType: BlockType.BOOLEAN,
          arguments: {
            STRING1: {
              type: ArgumentType.STRING,
              defaultValue: 'Maths'
            },
            STRING2: {
              type: ArgumentType.STRING,
              defaultValue: 's'
            }
          }
        }, {
          opcode: 'extract',
          text: this._t('pm.extract', 'extract characters from [NUM1] to [NUM2] of [STRING]'),
          blockType: BlockType.REPORTER,
          arguments: {
            STRING: {
              type: ArgumentType.STRING,
              defaultValue: 'Planète Maths'
            },
            NUM1: {
              type: ArgumentType.NUMBER,
              defaultValue: '1'
            },
            NUM2: {
              type: ArgumentType.NUMBER,
              defaultValue: '7'
            }
          }
        }],
        menus: this.getMenus()
      };
    }
  }, {
    key: "getMenus",
    value: function getMenus() {
      return {
        PARTIE_ENTIERE: {
          items: [{
            text: this._t('text.c1', 'units'),
            value: '0'
          }, {
            text: this._t('text.c2', 'tens'),
            value: '1'
          }, {
            text: this._t('text.c3', 'hundreds'),
            value: '2'
          }, {
            text: this._t('text.c4', 'thousands'),
            value: '3'
          }, {
            text: this._t('text.c5', 'ten thousands'),
            value: '4'
          }, {
            text: this._t('text.c6', 'hundred thousands'),
            value: '5'
          }, {
            text: this._t('text.c7', 'millions'),
            value: '6'
          }, {
            text: this._t('text.c8', 'ten millions'),
            value: '7'
          }, {
            text: this._t('text.c9', 'hundred millions'),
            value: '8'
          }, {
            text: this._t('text.c10', 'billions'),
            value: '9'
          }, {
            text: this._t('text.c11', 'ten billions'),
            value: '10'
          }, {
            text: this._t('text.c12', 'hundred billions'),
            value: '11'
          }]
        },
        PARTIE_DECIMALE: {
          items: [{
            text: this._t('text.d1', 'tenths'),
            value: '1'
          }, {
            text: this._t('text.d2', 'hundredths'),
            value: '2'
          }, {
            text: this._t('text.d3', 'thousandths'),
            value: '3'
          }, {
            text: this._t('text.d4', 'ten thousandths'),
            value: '4'
          }, {
            text: this._t('text.d5', 'hundred thousandths'),
            value: '5'
          }, {
            text: this._t('text.d6', 'millionths'),
            value: '6'
          }]
        },
        CHIFFRE_ARRONDIS: {
          items: [{
            text: this._t('text.a0', 'the unit'),
            value: '0'
          }, {
            text: this._t('text.a1', 'tenth'),
            value: '1'
          }, {
            text: this._t('text.a2', 'hundredth'),
            value: '2'
          }, {
            text: this._t('text.a3', 'thousandth'),
            value: '3'
          }, {
            text: this._t('text.a4', 'ten thousandth'),
            value: '4'
          }, {
            text: this._t('text.a5', 'hundred thousandth'),
            value: '5'
          }, {
            text: this._t('text.a6', 'millionth'),
            value: '6'
          }]
        },
        LIST_MATHOP: {
          items: [{
            text: '√',
            value: 'sqrt'
          }, {
            text: 'cos',
            value: 'cos'
          }, {
            text: 'sin',
            value: 'sin'
          }, {
            text: 'tan',
            value: 'tan'
          }, {
            text: 'arccos',
            value: 'acos'
          }, {
            text: 'arcsin',
            value: 'asin'
          }, {
            text: 'arctan',
            value: 'atan'
          }, {
            text: '10 ^',
            value: '10 ^'
          }]
        },
        LIST_MATHOP2: {
          items: [{
            text: this._t('text.pgcd', 'GCD'),
            value: 'pgcd'
          }, {
            text: this._t('text.ppcm', 'LCM'),
            value: 'ppcm'
          }]
        },
        LIST_MATHOPDIV: {
          items: [{
            text: this._t('text.reste', 'remainder'),
            value: 'reste'
          }, {
            text: this._t('text.quotient', 'quotient'),
            value: 'quotient'
          }]
        },
        ARRONDIS: {
          items: [{
            text: this._t('text.vad', 'Approximate value by defect'),
            value: 'vad'
          }, {
            text: this._t('text.vae', 'Approximate value by excess'),
            value: 'vae'
          }, {
            text: this._t('text.arrondi', 'Round'),
            value: 'arrondi'
          }]
        },
        MULTIPLE_DIVISEUR: {
          items: [{
            text: this._t('text.multiple', 'multiple'),
            value: 'multiple'
          }, {
            text: this._t('text.diviseur', 'divisor'),
            value: 'diviseur'
          }]
        }
      };
    }

    // All the implementation methods remain the same
  }, {
    key: "add",
    value: function add(args) {
      return Cast.toNumber(args.NUM1) + Cast.toNumber(args.NUM2);
    }
  }, {
    key: "substract",
    value: function substract(args) {
      return Cast.toNumber(args.NUM1) - Cast.toNumber(args.NUM2);
    }
  }, {
    key: "multiply",
    value: function multiply(args) {
      return Cast.toNumber(args.NUM1) * Cast.toNumber(args.NUM2);
    }
  }, {
    key: "divide",
    value: function divide(args) {
      return Cast.toNumber(args.NUM1) / Cast.toNumber(args.NUM2);
    }
  }, {
    key: "pow",
    value: function pow(args) {
      var n = Cast.toNumber(args.NUM1);
      var m = Cast.toNumber(args.NUM2);
      return Math.pow(n, m);
    }
  }, {
    key: "gt",
    value: function gt(args) {
      return Cast.compare(args.NUM1, args.NUM2) < 0;
    }
  }, {
    key: "gte",
    value: function gte(args) {
      return Cast.compare(args.NUM1, args.NUM2) <= 0;
    }
  }, {
    key: "equals",
    value: function equals(args) {
      return Cast.compare(args.NUM1, args.NUM2) === 0;
    }
  }, {
    key: "lt",
    value: function lt(args) {
      return Cast.compare(args.NUM1, args.NUM2) > 0;
    }
  }, {
    key: "lte",
    value: function lte(args) {
      return Cast.compare(args.NUM1, args.NUM2) >= 0;
    }
  }, {
    key: "min",
    value: function min(args) {
      return Math.min(Cast.toNumber(args.NUM1), Cast.toNumber(args.NUM2));
    }
  }, {
    key: "max",
    value: function max(args) {
      return Math.max(Cast.toNumber(args.NUM1), Cast.toNumber(args.NUM2));
    }
  }, {
    key: "oppose",
    value: function oppose(args) {
      return -1 * Cast.toNumber(args.NUM1);
    }
  }, {
    key: "inverse",
    value: function inverse(args) {
      return 1 / Cast.toNumber(args.NUM1);
    }
  }, {
    key: "random",
    value: function random(args) {
      var nFrom = Cast.toNumber(args.NUM1);
      var nTo = Cast.toNumber(args.NUM2);
      var low = nFrom <= nTo ? nFrom : nTo;
      var high = nFrom <= nTo ? nTo : nFrom;
      if (low === high) return low;

      // If both arguments are ints, truncate the result to an int.
      if (Cast.isInt(args.NUM1) && Cast.isInt(args.NUM2)) {
        return low + Math.floor(Math.random() * (high + 1 - low));
      }
      return Math.random() * (high - low) + low;
    }
  }, {
    key: "and",
    value: function and(args) {
      return Cast.toBoolean(args.OPERAND1) && Cast.toBoolean(args.OPERAND2);
    }
  }, {
    key: "or",
    value: function or(args) {
      return Cast.toBoolean(args.OPERAND1) || Cast.toBoolean(args.OPERAND2);
    }
  }, {
    key: "not",
    value: function not(args) {
      return !Cast.toBoolean(args.OPERAND1);
    }
  }, {
    key: "pourcent",
    value: function pourcent(args) {
      return Cast.toNumber(args.NUM1) / 100;
    }
  }, {
    key: "mathop",
    value: function mathop(args) {
      var operator = Cast.toString(args.OPERATOR).toLowerCase();
      var n = Cast.toNumber(args.NUM1);
      switch (operator) {
        case 'sqrt':
          return Math.sqrt(n);
        case 'sin':
          return parseFloat(Math.sin(Math.PI * n / 180).toFixed(10));
        case 'cos':
          return parseFloat(Math.cos(Math.PI * n / 180).toFixed(10));
        case 'tan':
          return MathUtil.tan(n);
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
      var operator = Cast.toString(args.OPERATOR).toLowerCase();
      var n1 = Cast.toNumber(args.NUM1);
      var n2 = Cast.toNumber(args.NUM2);
      if (Number.isInteger(n1) && Number.isInteger(n2)) {
        switch (operator) {
          case 'pgcd':
            return this.pgcd(n1, n2);
          case 'ppcm':
            return Math.abs(n1 * n2) / this.pgcd(n1, n2);
        }
      }
      return 0;
    }
  }, {
    key: "mathopdiv",
    value: function mathopdiv(args) {
      var operator = Cast.toString(args.OPERATOR).toLowerCase();
      var n1 = Cast.toNumber(args.NUM1);
      var n2 = Cast.toNumber(args.NUM2);
      if (Number.isInteger(n1) && Number.isInteger(n2) && n2 !== 0) {
        var result = n1 % n2;
        if (result / n2 < 0) result += n2;
        switch (operator) {
          case 'reste':
            return result;
          case 'quotient':
            return (n1 - result) / n2;
        }
      }
      return 0;
    }
  }, {
    key: "arrondis",
    value: function arrondis(args) {
      var type = Cast.toString(args.TYPE).toLowerCase();
      var n1 = Cast.toNumber(args.NUM1);
      var c = Cast.toNumber(args.CHIFFRE);
      switch (type) {
        case 'vad':
          return Math.floor(n1 * Math.pow(10, c)) / Math.pow(10, c);
        case 'vae':
          return Math.floor(n1 * Math.pow(10, c) + 1) / Math.pow(10, c);
        case 'arrondi':
          return Math.round(n1 * Math.pow(10, c)) / Math.pow(10, c);
      }
      return 0;
    }
  }, {
    key: "chiffre_pentiere",
    value: function chiffre_pentiere(args) {
      var num = Math.abs(Cast.toNumber(args.NUM1));
      var pos = Cast.toNumber(args.choix1);
      return Math.floor(num / Math.pow(10, pos)) % 10;
    }
  }, {
    key: "chiffre_pdecimale",
    value: function chiffre_pdecimale(args) {
      var num = Cast.toNumber(args.NUM1);
      var pos = Cast.toNumber(args.choix1);
      return Math.floor(num * Math.pow(10, pos) % 10);
    }
  }, {
    key: "multiple",
    value: function multiple(args) {
      var type = Cast.toString(args.choix1).toLowerCase();
      var n1 = Cast.toNumber(args.NUM1);
      var n2 = Cast.toNumber(args.NUM2);
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
      var value = Math.abs(Cast.toNumber(args.NUM1));
      var somme = 0;
      if (Number.isInteger(value)) {
        while (value) {
          somme += value % 10;
          value = Math.floor(value / 10);
        }
        return somme;
      }
      return 0;
    }
  }, {
    key: "pgcd",
    value: function pgcd(a, b) {
      a = Math.abs(a);
      b = Math.abs(b);
      if (b) {
        return this.pgcd(b, a % b);
      } else {
        return a;
      }
    }
  }, {
    key: "nombre_pi",
    value: function nombre_pi() {
      return Math.PI;
    }
  }, {
    key: "join",
    value: function join(args) {
      return Cast.toString(args.STRING1) + Cast.toString(args.STRING2);
    }
  }, {
    key: "letterOf",
    value: function letterOf(args) {
      var index = Cast.toNumber(args.LETTER) - 1;
      var str = Cast.toString(args.STRING);

      // Out of bounds?
      if (index < 0 || index >= str.length) {
        return '';
      }
      return str.charAt(index);
    }
  }, {
    key: "length",
    value: function length(args) {
      return Cast.toString(args.STRING).length;
    }
  }, {
    key: "contains",
    value: function contains(args) {
      var format = function format(string) {
        return Cast.toString(string).toLowerCase();
      };
      return format(args.STRING1).includes(format(args.STRING2));
    }
  }, {
    key: "reverseString",
    value: function reverseString(str) {
      if (str === '') {
        return '';
      } else {
        return this.reverseString(str.substr(1)) + str.charAt(0);
      }
    }
  }, {
    key: "extract",
    value: function extract(args) {
      var from = Cast.toNumber(args.NUM1) - 1;
      var to = Cast.toNumber(args.NUM2) - Cast.toNumber(args.NUM1) + 1;
      var str = Cast.toString(args.STRING);

      // Out of bounds?
      if (to < 0) {
        var rts = this.reverseString(str);
        return rts.substr(rts.length - from - 1, 2 - to);
      }
      return str.substr(from, to);
    }
  }]);
  return Scratch3PMBlocks;
}();
var blockClass = Scratch3PMBlocks;

export { blockClass, entry };
