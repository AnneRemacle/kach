"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _ping = require("../controllers/system/ping.js");

var _ping2 = _interopRequireDefault(_ping);

var _echo = require("../controllers/system/echo.js");

var _echo2 = _interopRequireDefault(_echo);

var _error = require("../controllers/system/error.js");

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ria/kach
 *
 * /src/routes/system.js - System routes
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/10/2016
*/

var oRouter = new _express.Router();

oRouter.get("/sys/ping", _ping2.default);
oRouter.get("/sys/echo", _echo2.default);
oRouter.get("/sys/error", _error2.default);

exports.default = oRouter;