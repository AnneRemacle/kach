"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (oRequest, oResponse) {
  (0, _api.error)(oRequest, oResponse, { "message": "There's an error!" });
};

var _api = require("../../core/utils/api");