"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _list = require("../controllers/terminals/list.js");

var _list2 = _interopRequireDefault(_list);

var _details = require("../controllers/terminals/details.js");

var _details2 = _interopRequireDefault(_details);

var _create = require("../controllers/terminals/create.js");

var _create2 = _interopRequireDefault(_create);

var _update = require("../controllers/terminals/update.js");

var _update2 = _interopRequireDefault(_update);

var _destroy = require("../controllers/terminals/destroy.js");

var _destroy2 = _interopRequireDefault(_destroy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ria/kach
 *
 * /src/routes/terminals.js - API Routes for terminals
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 28/10/2016
*/

var oRouter = new _express.Router();

oRouter.get("/terminals", _list2.default);
oRouter.get("/terminals/:id", _details2.default);
oRouter.post("/terminals", _create2.default);
oRouter.patch("/terminals/:id", _update2.default);
oRouter.delete("/terminals/:id", _destroy2.default);

exports.default = oRouter;