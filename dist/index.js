(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["DiscordEco"] = factory();
	else
		root["DiscordEco"] = factory();
})(global, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(__webpack_require__(3));
const Enum_1 = __webpack_require__(4);
class SQLAdapter {
    constructor(opt) {
        this.timestamp = new Date();
        if (opt.name == null) {
            opt.name = 'shared';
        }
        const debug = (message) => {
            opt.debugger.emit('debug', message);
        };
        opt.dbopt.verbose = debug;
        this.db = new better_sqlite3_1.default(`${opt.path}/${this.timestamp}-${opt.name}.db`, opt.dbopt);
        this.db.prepare(Enum_1.SQLQueryTemplate).run();
    }
    insert(uuid, money) {
        this.db.prepare(`INSERT INTO ${Enum_1.SQLTableName} (uuid, money) VALUES (?, ?)`).run(uuid, money);
    }
    update(uuid, money) {
        this.db.prepare(`UPDATE ${Enum_1.SQLTableName} SET money=?, WHERE uuid=?`).run(money, uuid);
    }
    delete(uuid) {
        this.db.prepare(`DELETE FROM ${Enum_1.SQLTableName} WHERE uuid=?`).run(uuid);
    }
    select(uuid) {
        return this.db.prepare('SELECT * FROM economy WHERE id=?').run(uuid);
    }
}
exports.SQLAdapter = SQLAdapter;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const DiscordEconomy_1 = __webpack_require__(2);
exports.DiscordEconomy = DiscordEconomy_1.DiscordEconomy;
const SQLAdapter_1 = __webpack_require__(0);
exports.SQLAdapter = SQLAdapter_1.SQLAdapter;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SQLAdapter_1 = __webpack_require__(0);
const lodash_1 = __importDefault(__webpack_require__(5));
const events_1 = __webpack_require__(6);
class DiscordEconomy extends events_1.EventEmitter {
    constructor(opt = { defaultBalance: undefined, path: undefined }) {
        super();
        if (opt.defaultBalance !== undefined) {
            this.defaultBalance = lodash_1.default.toNumber(opt.defaultBalance);
        }
        else {
            this.defaultBalance = 0;
        }
        if (opt.shared.enabled) {
            this.name = opt.shared.name;
        }
        else {
            this.name = 'shared';
        }
        if (opt.path !== undefined) {
            this.path = opt.path;
        }
        else {
            this.path = 'discordeco';
        }
        this.db = new SQLAdapter_1.SQLAdapter({
            path: this.path,
            dbopt: {},
            debugger: this,
            name: this.name,
        });
    }
    fetchBalance(uuid) {
        if (!uuid) {
            throw new TypeError("ONORE DIDN'T PUT THE UUID INSIDE THE fetchBalance() METHOD!!!");
        }
        if (isNaN(parseInt(uuid))) {
            throw new TypeError('ONORE UUID IS NOT A NUMBER!!!');
        }
        const balance = this.db.select(uuid);
        if (balance == null) {
            this.db.insert(uuid, this.defaultBalance);
        }
        else {
            return lodash_1.default.toNumber(balance);
        }
    }
    addBalance() {
    }
    updateBalance() {
    }
    setBalance() {
    }
    getDaily() {
    }
}
exports.DiscordEconomy = DiscordEconomy;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("better-sqlite3");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLTableName = 'economy';
exports.SQLQueryTemplate = `CREATE TABLE IF NOT EXISTS ${exports.SQLTableName} (uuid VARCHAR, money INTEGER)`;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ })
/******/ ]);
});
