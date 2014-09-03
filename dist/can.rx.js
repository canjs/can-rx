(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("rx"), require("can"), require("can.eventstream"));
	else if(typeof define === 'function' && define.amd)
		define(["rx", "can", "can.eventstream"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("rx"), require("can"), require("can.eventstream")) : factory(root["Rx"], root["can"], root["can.eventstream"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __moduleName = "src/index";
	var rx = __webpack_require__(1);
	var can = __webpack_require__(2);
	__webpack_require__(3);
	rx.Observable.prototype.toCanCompute = function() {
	  var compute = arguments[0] !== (void 0) ? arguments[0] : can.compute();
	  return can.bindComputeFromStream(this, compute);
	};
	rx.Observable.prototype.toCanMap = function() {
	  var map = arguments[0] !== (void 0) ? arguments[0] : new can.Map();
	  return can.bindMapFromStream(this, map);
	};
	rx.Observable.prototype.toCanList = function() {
	  var list = arguments[0] !== (void 0) ? arguments[0] : new can.List();
	  return can.bindListFromStream(this, list);
	};
	can.isEventStream = (function(stream) {
	  return stream instanceof rx.Observable;
	});
	can.onEventStreamValue = (function(stream, callback) {
	  return stream.subscribe(callback);
	});
	can.bindEventStream = function(ctx, ev, selector) {
	  ev = ev == null ? "change" : ev;
	  var stream = rx.Observable.fromEventPattern(selector ? (function(cb) {
	    return can.delegate.call(ctx, selector, ev, cb);
	  }) : (function(cb) {
	    return can.bind.call(ctx, ev, cb);
	  }), selector ? (function(cb) {
	    return can.undelegate.call(ctx, selector, ev, cb);
	  }) : (function(cb) {
	    return can.unbind.call(ctx, ev, cb);
	  }), function() {
	    return chooseEventData(ctx, arguments, ev);
	  });
	  return stream;
	};
	can.eventStreamUntil = (function(stream, until) {
	  return stream.takeUntil(until);
	});
	function chooseEventData(ctx, eventArgs, evName) {
	  if (ctx.isComputed) {
	    return eventArgs[1];
	  } else if (ctx.getEventValueForStream) {
	    return ctx.getEventValueForStream(eventArgs, evName);
	  } else {
	    return eventArgs[0];
	  }
	}
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});

//# sourceMappingURL=can.rx.js.map