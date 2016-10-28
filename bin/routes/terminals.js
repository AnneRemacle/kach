"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _list = require("../controllers/terminals/list");

var _list2 = _interopRequireDefault(_list);

var _details = require("../controllers/terminals/details");

var _details2 = _interopRequireDefault(_details);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import create from "../controllers/terminals/create";
// import update from "../controllers/terminals/update";
// import destroy from "../controllers/terminals/destroy";

var oRouter = new _express.Router(); /* anne/hepl/ria/kach
                                      *
                                      * /src/routes/terminals.js - API Routes for terminals
                                      *
                                      * coded by Anne
                                      * started at 28/10/2016
                                      */

oRouter.get("/terminals", _list2.default);
oRouter.get("/terminals/:id", _details2.default);
//oRouter.post(  "/terminals", create );
//oRouter.patch(  "/terminals", update );
//oRouter.delete(  "/terminals", destroy );

exports.default = oRouter;