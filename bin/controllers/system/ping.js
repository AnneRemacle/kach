"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (oRequest, oResponse) {
  (0, _api.send)(oRequest, oResponse, true);
};

var _api = require("../../core/utils/api");