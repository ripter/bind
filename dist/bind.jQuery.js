(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["bindEvent"] = factory();
	else
		root["bindEvent"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

// Split event names that include a selector
const eventSplitter = /^(\S+)\s*(.*)$/;

/**
 * Bind for jQuery on/off Event Interface.
 * @param {jQuery} $elm - jQuery element with [on](https://api.jquery.com/on/) and [off](https://api.jquery.com/off/) methods.
 * @param {String|Object} eventName - the event name, or an event object to bind.
 * @param {Function} callback - function bind to eventName.
 * @return {Function} a function the unbinds/off/stoplistening to the created bindings.
 */
function bind($elm, eventName, callback) {
  if (typeof $elm.on !== 'function') { throw new Error('$elm is missing the on method from jQuery API.'); }
  if (typeof $elm.off !== 'function') { throw new Error('$elm is missing the off method from jQuery API.'); }

  if (typeof eventName === 'string') {
    return bindjQuery($elm, eventName, callback);
  }

  // eventName is an eventObject
  const unbindArray = Object.keys(eventName).map((rawEventName) => {
    const method = eventName[rawEventName];
    return bindjQuery($elm, rawEventName, method);
  });

  // return a function that unbind the entire eventObject
  return function unbind() {
    unbindArray.forEach((remove) => {
      remove();
    });
  };
}

// Export it
module.exports = bind;


/**
 * Bind for jQuery on/off Event Interface.
 * This just binds a single event to a single callback.
 * @param {jQuery} $elm - jQuery element with [on](https://api.jquery.com/on/) and [off](https://api.jquery.com/off/) methods.
 * @param {String} eventNameOptionalSelector - the event name to bind with optional selector.
 * @param {Function} callback - function bind to event.
 * @return {Function} a function the unbinds/off/stoplistening to the created bindings.
 */
function bindjQuery($elm, eventNameOptionalSelector, callback) {
  if (typeof callback !== 'function') { throw new Error('callback must be a function'); }
  const matches = eventNameOptionalSelector.match(eventSplitter);
  const eventName = matches[1];
  const selector = matches[2];
  let args;

  // Selector is optional
  if (selector && selector.length > 0) {
    args = [eventName, selector, callback];
  }
  else {
    args = [eventName, callback];
  }

  // bind the event
  $elm.on.apply($elm, args);

  // return an unbind function.
  return function unbind() {
    $elm.off.apply($elm, args);
  };
}


/***/ })
/******/ ]);
});