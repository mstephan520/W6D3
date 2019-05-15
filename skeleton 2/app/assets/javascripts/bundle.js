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
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const APIUtil = {
    followUser: id => {
        this.followState = 'following';
        $.ajax({
            method: "POST",
            url: `/users/${this.userId}/follow`,
            dataType: "json"
        }).then(() => {
            this.followState = 'followed';
            this.render();
        });
    },

    unfollowUser: id => {
        this.followState = 'unfollowing';
        $.ajax({
            method: "DELETE",
            url: `/users/${this.userId}/follow`,
            dataType: "json"
        }).then(() => {
            this.followState = 'unfollowed';
            this.render();
        });
    }
};



module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APITUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");

class FollowToggle {
    constructor($el) {
        this.el = $el;
        this.userId = $el.data('user-id');
        this.followState = $el.data('initial-follow-state');
        this.render = this.render.bind(this);
        // this.handleClick = this.handleClick.bind(this, e)
        this.render();
        this.el.on('click', this.handleClick.bind(this));
    }

    //followState = unfollowed => followed

    render() {
        if (this.followState === 'following' || 'unfollowing') {
            this.el.prop("disabled", true);

        } else if (this.followState === 'unfollowed') {
            this.el.text('Follow!');
            this.el.prop("disabled", false);
            
        } else if (this.followState === 'followed') {
            this.el.text('UnFollow!');
            this.el.prop("disabled", false);
        }
    }

    handleClick(e) {
        console.log('clicked');
        e.preventDefault();

        if (this.followState === 'unfollowed') {
            return APIUtil.followUser(this.userId).bind(this);

        } else if (this.followState === 'followed') {
            return APIUtil.unfollowUser(this.userId).bind(this);
        }
    }
}


module.exports = FollowToggle;

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

let FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");

$( () => {
    $('button').each( (index, el) => {
        new FollowToggle($(el));
    });
} );

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map