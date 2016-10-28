"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _mongodb.db.collection("terminals");
};

var _mongodb = require("../core/mongodb");