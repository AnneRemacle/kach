"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (oRequest, oResponse) {
  var sEcho = oRequest.query.echo || "Hello, world!";

  (0, _api.send)(oRequest, oResponse, sEcho);
};

var _api = require("../../core/utils/api");