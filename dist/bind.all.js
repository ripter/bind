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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * bind - listens to event on element, returning a function to stop listening to the event.
 * @param {EventTarget} element - https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
 * @param {String} eventName - Name of the event. Like 'click', or 'did-custom-event'
 * @param {Function} callback -
 * @return unbind - function that unbinds the callback from the event on element.
 */
function bind(element, eventName, callback) {
  element.addEventListener(eventName, callback);

  return function unbind() {
    element.removeEventListener(eventName, callback);
  };
}

// Exports
module.exports = bind;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * bind - listens to event on element, returning a function to stop listening to the event.
 * https://api.jquery.com/on/
 * https://api.jquery.com/off/
 * @param {jQuery} $obj - a jQuery object.
 * @param {String} eventName - Name of the event. Like 'click', or 'did-custom-event'
 * @param {Function} callback - function that will be called every time eventName happens.
 * @return unbind - function that unbinds the callback from the event on element.
 */
function bind($obj, eventName, callback) {
  // remove the $obj from the arguments and make an array
  const args = Array.prototype.slice.call(arguments, 1);

  // Add the event listener
  $obj.on.apply(this, args);

  return function unbind() {
    // remove the event listener
    $obj.off.apply(this, args);
  }
}

// Export it
module.exports = bind;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const bindjQuery = __webpack_require__(1);
const bindDOM = __webpack_require__(0);

// Exports
module.exports = {
  bindjQuery,
  bindDOM,
};


/***/ })
/******/ ]);
});