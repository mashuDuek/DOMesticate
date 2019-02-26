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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// const DomNodeHandles = require('./dom_node_handles.js');
var docReadyCallbacks = [];
var docReady = false;

window.$domesticate = function (arg) {
  switch (_typeof(arg)) {
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
  for (var _len = arguments.length, otherObjs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
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
    options.url += "?".concat(stringToQuery(options.data));
  }

  request.open(options.method, options.url, true);
  request.setRequestHeader('Access-Control-Allow-Headers', '*');
  request.setRequestHeader('Access-Control-Allow-Credentials', true);
  request.setRequestHeader('Access-Control-Allow-Origin', '*');

  request.onload = function (e) {
    // Triggered when request.readyState === XMLHttpRequest.DONE ===  4
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
}; // helper


function stringToQuery(obj) {
  var result = "";

  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      result += "".concat(prop, "=").concat(obj[prop], "&");
    }
  }

  return result.substring(0, result.length - 1);
} // helper


function registerCallback(func) {
  if (!docReady) {
    docReadyCallbacks.push(func);
  } else {
    func();
  }
} // helper


function nodesFromDom(selector) {
  var nodes = document.querySelectorAll(selector);
  var nodesArray = Array.from(nodes);
  return new DomNodeHandles(nodesArray);
} // setup listeners/callbacks once doc is ready


document.addEventListener('DOMContentLoaded', function () {
  docReady = true;
  docReadyCallbacks.forEach(function (func) {
    return func();
  });
});

/***/ })

/******/ });
//# sourceMappingURL=main.js.map