"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _list = require("../controllers/banks/list.js");

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ria/kach
 *
 * /src/routes/banks.js - API Routes for banks
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/10/2016
*/

var oRouter = new _express.Router();

oRouter.get("/banks", _list2.default);

exports.default = oRouter;