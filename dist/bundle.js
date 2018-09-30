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
/******/ 	__webpack_require__.p = "/Users/chang/Sites/test/poster-wall-device/dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/entry.js":
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

var timeline = new TimelineMax({
  repeat: -1,
  repeatDelay: 1
});
var storage = window.localStorage;
var socket = io();
var cardList = document.getElementsByClassName("card");
var alertText = document.getElementById("alert-text");
var alertWrapper = document.getElementById("alert"); // ==============
// === UUID Setup

var foundUID = storage.getItem("UID");

if (!foundUID) {} else {}

socket.on("MESSAGE", function (msg) {
  showAlert(msg);
});
socket.on("SET_PATTERN", function (pattern) {
  showAlert("switching pattern to: " + pattern); //Turn all posters off

  TweenLite.to(".card", 0.3, {
    opacity: 0,
    ease: Power1.easeIn
  }).eventCallback("onComplete", function () {
    // Execute pattern
    switch (pattern) {
      case "SPOTLIGHT":
        spotlight(timeline, cardList, []);
        break;

      case "PULSE":
        pulse(timeline, cardList);
        break;
    }
  });
}); // Executes appropriate command based on string identifier

socket.on("EXECUTE_COMMAND", executeCommand);

function executeCommand(command) {
  var alertUser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (alertUser) {
    showAlert("running command: " + command);
  }

  switch (command) {
    case "OFF":
      off(timeline);
      break;

    case "ON":
      on(timeline);
      break;

    case "REFRESH_BROWSER":
      refreshBrowser();
      break;
  }
}
/**
 * Temporarily displays an alert prompt on the screen with the passed in
 * message
 * @param {string} message - Message to be displayed
 */


function showAlert(message) {
  alertText.innerHTML = message;
  TweenLite.to(alertWrapper, 0.5, {
    opacity: 1,
    ease: Power1.easeIn
  });
  TweenLite.to(alertWrapper, 0.5, {
    opacity: 0,
    ease: Power1.easeIn,
    delay: 3
  });
}
/**
 * Returns a random integer between the min and max values provided
 * @param {number} min - (inclusive)
 * @param {number} max - (inclusive)
 * @return {number} randomNumber
 */


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
/**
 * Turns all poster off and clears timeline
 * @param {TimelineMax} timeline
 */


function off(timeline) {
  timeline.clear();
  TweenLite.to(".card", 0.3, {
    opacity: 0,
    ease: Power1.easeIn
  });
}
/**
 * Turns all poster on and clears timeline
 * @param {TimelineMax} timeline
 */


function on(timeline) {
  timeline.clear();
  TweenLite.to(".card", 0.3, {
    opacity: 1,
    ease: Power1.easeIn
  });
}
/**
 * Refreshes the browser window
 */


function refreshBrowser() {
  window.location.reload(true);
} // ========= Patterns


function spotlight(timeline, cardList, spotlightedArray) {
  console.log("spotlight");
  timeline.clear();
  timeline.repeat(0);
  var random;

  if (spotlightedArray.length === cardList.length) {
    spotlightedArray = [];
  }

  do {
    random = getRandomInt(0, cardList.length);
  } while (spotlightedArray.includes(random));

  spotlightedArray.push(random);
  console.log(spotlightedArray);
  timeline.add(TweenLite.to(cardList[random], 1, {
    opacity: 1
  }));
  timeline.add(TweenLite.to(cardList[random], 1, {
    opacity: 0,
    delay: 4
  }).eventCallback("onComplete", function () {
    spotlight(timeline, cardList, spotlightedArray);
  }));
}

function pulse(timeline) {
  console.log("pulse");
  timeline.clear();
  timeline.repeat(-1);
  timeline.yoyo(true);
  timeline.to(".card", 5, {
    opacity: 1
  }).to(".card", 5, {
    opacity: 0
  });
}

function scan(timeline, cardList) {
  timeline.clear();
  var scanSpeed = 30;
  var glowSpeed = 1.3;
  var delaySpeed = 2;

  var preDelayFunc = function preDelayFunc(i) {
    return (cardList[i].getBoundingClientRect().left * 0.0001 * scanSpeed).toFixed(3);
  };

  var max = preDelayFunc(0);

  for (var i = 0; i < cardList.length; i++) {
    max = Math.max(preDelayFunc(i), max);
  }

  var delayFunc = function delayFunc(i) {
    return (max - cardList[i].getBoundingClientRect().left * 0.0001 * scanSpeed).toFixed(3);
  };

  var delayMap = [];

  for (var _i = 0; _i < cardList.length; _i++) {
    delayMap.push(delayFunc(_i));
  }

  for (var _i2 = 0; _i2 < cardList.length; _i2++) {
    var loop = new TimelineMax(); // let tl = new TimelineLite();

    loop.to(cardList[_i2], glowSpeed, {
      opacity: 1,
      ease: Power1.easeIn,
      delay: delaySpeed
    }).to(cardList[_i2], glowSpeed, {
      opacity: 0,
      ease: Power1.easeOut
    }).repeat(-1); // tl.from( cardList[i], glowSpeed, { opacity: 1, ease: Power0.easeOut, delay: delayMap[i] })
    //   .add( loop )

    timeline.add(new TimelineLite().from(cardList[_i2], glowSpeed, {
      opacity: 1,
      ease: Power0.easeOut,
      delay: delayMap[_i2]
    }).add(loop));
  }
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL3NyYy9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9Vc2Vycy9jaGFuZy9TaXRlcy90ZXN0L3Bvc3Rlci13YWxsLWRldmljZS9kaXN0XCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2VudHJ5LmpzXCIpO1xuIiwidmFyIHRpbWVsaW5lID0gbmV3IFRpbWVsaW5lTWF4KHtcbiAgcmVwZWF0OiAtMSxcbiAgcmVwZWF0RGVsYXk6IDFcbn0pO1xudmFyIHN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xudmFyIHNvY2tldCA9IGlvKCk7XG52YXIgY2FyZExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY2FyZFwiKTtcbnZhciBhbGVydFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFsZXJ0LXRleHRcIik7XG52YXIgYWxlcnRXcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbGVydFwiKTsgLy8gPT09PT09PT09PT09PT1cbi8vID09PSBVVUlEIFNldHVwXG5cbnZhciBmb3VuZFVJRCA9IHN0b3JhZ2UuZ2V0SXRlbShcIlVJRFwiKTtcblxuaWYgKCFmb3VuZFVJRCkge30gZWxzZSB7fVxuXG5zb2NrZXQub24oXCJNRVNTQUdFXCIsIGZ1bmN0aW9uIChtc2cpIHtcbiAgc2hvd0FsZXJ0KG1zZyk7XG59KTtcbnNvY2tldC5vbihcIlNFVF9QQVRURVJOXCIsIGZ1bmN0aW9uIChwYXR0ZXJuKSB7XG4gIHNob3dBbGVydChcInN3aXRjaGluZyBwYXR0ZXJuIHRvOiBcIiArIHBhdHRlcm4pOyAvL1R1cm4gYWxsIHBvc3RlcnMgb2ZmXG5cbiAgVHdlZW5MaXRlLnRvKFwiLmNhcmRcIiwgMC4zLCB7XG4gICAgb3BhY2l0eTogMCxcbiAgICBlYXNlOiBQb3dlcjEuZWFzZUluXG4gIH0pLmV2ZW50Q2FsbGJhY2soXCJvbkNvbXBsZXRlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBFeGVjdXRlIHBhdHRlcm5cbiAgICBzd2l0Y2ggKHBhdHRlcm4pIHtcbiAgICAgIGNhc2UgXCJTUE9UTElHSFRcIjpcbiAgICAgICAgc3BvdGxpZ2h0KHRpbWVsaW5lLCBjYXJkTGlzdCwgW10pO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcIlBVTFNFXCI6XG4gICAgICAgIHB1bHNlKHRpbWVsaW5lLCBjYXJkTGlzdCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSk7XG59KTsgLy8gRXhlY3V0ZXMgYXBwcm9wcmlhdGUgY29tbWFuZCBiYXNlZCBvbiBzdHJpbmcgaWRlbnRpZmllclxuXG5zb2NrZXQub24oXCJFWEVDVVRFX0NPTU1BTkRcIiwgZXhlY3V0ZUNvbW1hbmQpO1xuXG5mdW5jdGlvbiBleGVjdXRlQ29tbWFuZChjb21tYW5kKSB7XG4gIHZhciBhbGVydFVzZXIgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHRydWU7XG5cbiAgaWYgKGFsZXJ0VXNlcikge1xuICAgIHNob3dBbGVydChcInJ1bm5pbmcgY29tbWFuZDogXCIgKyBjb21tYW5kKTtcbiAgfVxuXG4gIHN3aXRjaCAoY29tbWFuZCkge1xuICAgIGNhc2UgXCJPRkZcIjpcbiAgICAgIG9mZih0aW1lbGluZSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgXCJPTlwiOlxuICAgICAgb24odGltZWxpbmUpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFwiUkVGUkVTSF9CUk9XU0VSXCI6XG4gICAgICByZWZyZXNoQnJvd3NlcigpO1xuICAgICAgYnJlYWs7XG4gIH1cbn1cbi8qKlxuICogVGVtcG9yYXJpbHkgZGlzcGxheXMgYW4gYWxlcnQgcHJvbXB0IG9uIHRoZSBzY3JlZW4gd2l0aCB0aGUgcGFzc2VkIGluXG4gKiBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIE1lc3NhZ2UgdG8gYmUgZGlzcGxheWVkXG4gKi9cblxuXG5mdW5jdGlvbiBzaG93QWxlcnQobWVzc2FnZSkge1xuICBhbGVydFRleHQuaW5uZXJIVE1MID0gbWVzc2FnZTtcbiAgVHdlZW5MaXRlLnRvKGFsZXJ0V3JhcHBlciwgMC41LCB7XG4gICAgb3BhY2l0eTogMSxcbiAgICBlYXNlOiBQb3dlcjEuZWFzZUluXG4gIH0pO1xuICBUd2VlbkxpdGUudG8oYWxlcnRXcmFwcGVyLCAwLjUsIHtcbiAgICBvcGFjaXR5OiAwLFxuICAgIGVhc2U6IFBvd2VyMS5lYXNlSW4sXG4gICAgZGVsYXk6IDNcbiAgfSk7XG59XG4vKipcbiAqIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIHRoZSBtaW4gYW5kIG1heCB2YWx1ZXMgcHJvdmlkZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaW4gLSAoaW5jbHVzaXZlKVxuICogQHBhcmFtIHtudW1iZXJ9IG1heCAtIChpbmNsdXNpdmUpXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHJhbmRvbU51bWJlclxuICovXG5cblxuZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1pbiwgbWF4KSB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7XG59XG4vKipcbiAqIFR1cm5zIGFsbCBwb3N0ZXIgb2ZmIGFuZCBjbGVhcnMgdGltZWxpbmVcbiAqIEBwYXJhbSB7VGltZWxpbmVNYXh9IHRpbWVsaW5lXG4gKi9cblxuXG5mdW5jdGlvbiBvZmYodGltZWxpbmUpIHtcbiAgdGltZWxpbmUuY2xlYXIoKTtcbiAgVHdlZW5MaXRlLnRvKFwiLmNhcmRcIiwgMC4zLCB7XG4gICAgb3BhY2l0eTogMCxcbiAgICBlYXNlOiBQb3dlcjEuZWFzZUluXG4gIH0pO1xufVxuLyoqXG4gKiBUdXJucyBhbGwgcG9zdGVyIG9uIGFuZCBjbGVhcnMgdGltZWxpbmVcbiAqIEBwYXJhbSB7VGltZWxpbmVNYXh9IHRpbWVsaW5lXG4gKi9cblxuXG5mdW5jdGlvbiBvbih0aW1lbGluZSkge1xuICB0aW1lbGluZS5jbGVhcigpO1xuICBUd2VlbkxpdGUudG8oXCIuY2FyZFwiLCAwLjMsIHtcbiAgICBvcGFjaXR5OiAxLFxuICAgIGVhc2U6IFBvd2VyMS5lYXNlSW5cbiAgfSk7XG59XG4vKipcbiAqIFJlZnJlc2hlcyB0aGUgYnJvd3NlciB3aW5kb3dcbiAqL1xuXG5cbmZ1bmN0aW9uIHJlZnJlc2hCcm93c2VyKCkge1xuICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpO1xufSAvLyA9PT09PT09PT0gUGF0dGVybnNcblxuXG5mdW5jdGlvbiBzcG90bGlnaHQodGltZWxpbmUsIGNhcmRMaXN0LCBzcG90bGlnaHRlZEFycmF5KSB7XG4gIGNvbnNvbGUubG9nKFwic3BvdGxpZ2h0XCIpO1xuICB0aW1lbGluZS5jbGVhcigpO1xuICB0aW1lbGluZS5yZXBlYXQoMCk7XG4gIHZhciByYW5kb207XG5cbiAgaWYgKHNwb3RsaWdodGVkQXJyYXkubGVuZ3RoID09PSBjYXJkTGlzdC5sZW5ndGgpIHtcbiAgICBzcG90bGlnaHRlZEFycmF5ID0gW107XG4gIH1cblxuICBkbyB7XG4gICAgcmFuZG9tID0gZ2V0UmFuZG9tSW50KDAsIGNhcmRMaXN0Lmxlbmd0aCk7XG4gIH0gd2hpbGUgKHNwb3RsaWdodGVkQXJyYXkuaW5jbHVkZXMocmFuZG9tKSk7XG5cbiAgc3BvdGxpZ2h0ZWRBcnJheS5wdXNoKHJhbmRvbSk7XG4gIGNvbnNvbGUubG9nKHNwb3RsaWdodGVkQXJyYXkpO1xuICB0aW1lbGluZS5hZGQoVHdlZW5MaXRlLnRvKGNhcmRMaXN0W3JhbmRvbV0sIDEsIHtcbiAgICBvcGFjaXR5OiAxXG4gIH0pKTtcbiAgdGltZWxpbmUuYWRkKFR3ZWVuTGl0ZS50byhjYXJkTGlzdFtyYW5kb21dLCAxLCB7XG4gICAgb3BhY2l0eTogMCxcbiAgICBkZWxheTogNFxuICB9KS5ldmVudENhbGxiYWNrKFwib25Db21wbGV0ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgc3BvdGxpZ2h0KHRpbWVsaW5lLCBjYXJkTGlzdCwgc3BvdGxpZ2h0ZWRBcnJheSk7XG4gIH0pKTtcbn1cblxuZnVuY3Rpb24gcHVsc2UodGltZWxpbmUpIHtcbiAgY29uc29sZS5sb2coXCJwdWxzZVwiKTtcbiAgdGltZWxpbmUuY2xlYXIoKTtcbiAgdGltZWxpbmUucmVwZWF0KC0xKTtcbiAgdGltZWxpbmUueW95byh0cnVlKTtcbiAgdGltZWxpbmUudG8oXCIuY2FyZFwiLCA1LCB7XG4gICAgb3BhY2l0eTogMVxuICB9KS50byhcIi5jYXJkXCIsIDUsIHtcbiAgICBvcGFjaXR5OiAwXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzY2FuKHRpbWVsaW5lLCBjYXJkTGlzdCkge1xuICB0aW1lbGluZS5jbGVhcigpO1xuICB2YXIgc2NhblNwZWVkID0gMzA7XG4gIHZhciBnbG93U3BlZWQgPSAxLjM7XG4gIHZhciBkZWxheVNwZWVkID0gMjtcblxuICB2YXIgcHJlRGVsYXlGdW5jID0gZnVuY3Rpb24gcHJlRGVsYXlGdW5jKGkpIHtcbiAgICByZXR1cm4gKGNhcmRMaXN0W2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKiAwLjAwMDEgKiBzY2FuU3BlZWQpLnRvRml4ZWQoMyk7XG4gIH07XG5cbiAgdmFyIG1heCA9IHByZURlbGF5RnVuYygwKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcmRMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgbWF4ID0gTWF0aC5tYXgocHJlRGVsYXlGdW5jKGkpLCBtYXgpO1xuICB9XG5cbiAgdmFyIGRlbGF5RnVuYyA9IGZ1bmN0aW9uIGRlbGF5RnVuYyhpKSB7XG4gICAgcmV0dXJuIChtYXggLSBjYXJkTGlzdFtpXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICogMC4wMDAxICogc2NhblNwZWVkKS50b0ZpeGVkKDMpO1xuICB9O1xuXG4gIHZhciBkZWxheU1hcCA9IFtdO1xuXG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCBjYXJkTGlzdC5sZW5ndGg7IF9pKyspIHtcbiAgICBkZWxheU1hcC5wdXNoKGRlbGF5RnVuYyhfaSkpO1xuICB9XG5cbiAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgY2FyZExpc3QubGVuZ3RoOyBfaTIrKykge1xuICAgIHZhciBsb29wID0gbmV3IFRpbWVsaW5lTWF4KCk7IC8vIGxldCB0bCA9IG5ldyBUaW1lbGluZUxpdGUoKTtcblxuICAgIGxvb3AudG8oY2FyZExpc3RbX2kyXSwgZ2xvd1NwZWVkLCB7XG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgZWFzZTogUG93ZXIxLmVhc2VJbixcbiAgICAgIGRlbGF5OiBkZWxheVNwZWVkXG4gICAgfSkudG8oY2FyZExpc3RbX2kyXSwgZ2xvd1NwZWVkLCB7XG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgZWFzZTogUG93ZXIxLmVhc2VPdXRcbiAgICB9KS5yZXBlYXQoLTEpOyAvLyB0bC5mcm9tKCBjYXJkTGlzdFtpXSwgZ2xvd1NwZWVkLCB7IG9wYWNpdHk6IDEsIGVhc2U6IFBvd2VyMC5lYXNlT3V0LCBkZWxheTogZGVsYXlNYXBbaV0gfSlcbiAgICAvLyAgIC5hZGQoIGxvb3AgKVxuXG4gICAgdGltZWxpbmUuYWRkKG5ldyBUaW1lbGluZUxpdGUoKS5mcm9tKGNhcmRMaXN0W19pMl0sIGdsb3dTcGVlZCwge1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGVhc2U6IFBvd2VyMC5lYXNlT3V0LFxuICAgICAgZGVsYXk6IGRlbGF5TWFwW19pMl1cbiAgICB9KS5hZGQobG9vcCkpO1xuICB9XG59Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==