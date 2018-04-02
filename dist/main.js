/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// const DomNodeHandles = require('./dom_node_handles.js');

var docReadyCallbacks = [];
var docReady = false;

window.$domesticate = function (arg) {
  switch (typeof arg === "undefined" ? "undefined" : _typeof(arg)) {
    case "function":
      return registerCallback(arg);
    case "string":
      return nodesFromDom(arg);
    case "object":
      if (arg instanceof HTMLElement) {
        return new DomNodeHandles([arg]);
      }
  }
};

$domesticate.extend = function (base) {
  for (var _len = arguments.length, otherObjs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    otherObjs[_key - 1] = arguments[_key];
  }

  otherObjs.forEach(function (obj) {
    for (var prop in obj) {
      base[prop] = obj[prop];
    }
  });
  return base;
};

$domesticate.ajax = function (options) {
  var request = new XMLHttpRequest();
  var defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: function success() {},
    error: function error() {},
    data: {}
  };
  options = $domesticate.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === "GET") {
    options.url += "?" + stringToQuery(options.data);
  }

  request.open(options.method, options.url, true);
  request.onload = function (e) {
    // Triggered when request.readyState === XMLHttpRequest.DONE ===  4
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};

// helper
function stringToQuery(obj) {
  var result = "";
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      result += prop + "=" + obj[prop] + "&";
    }
  }
  return result.substring(0, result.length - 1);
}

// helper
function registerCallback(func) {
  if (!docReady) {
    docReadyCallbacks.push(func);
  } else {
    func();
  }
}

// helper
function nodesFromDom(selector) {
  var nodes = document.querySelectorAll(selector);
  var nodesArray = Array.from(nodes);
  return new DomNodeHandles(nodesArray);
}

// setup listeners/callbacks once doc is ready
document.addEventListener('DOMContentLoaded', function () {
  docReady = true;
  docReadyCallbacks.forEach(function (func) {
    return func();
  });
});

/***/ })

/******/ });
//# sourceMappingURL=main.js.map