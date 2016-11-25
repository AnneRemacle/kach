"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.db = exports.init = undefined;

var _mongodb = require("mongodb");

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _zouti = require("zouti");

var _zouti2 = _interopRequireDefault(_zouti);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MONGO_URL = "mongodb://127.0.0.1:27017/kach"; /* ria/kach
                                                   *
                                                   * /src/core/mongodb.js - Connector for mongodb
                                                   *
                                                   * Coded by Mucht - Mathieu Claessens
                                                   * started at 21/10/2016
                                                  */

var oDB = void 0,
    fInit = void 0;

exports.init = fInit = function fInit() {
    return new _bluebird2.default(function (fResolve, fReject) {
        _mongodb.MongoClient.connect(MONGO_URL, function (oError, oLinkedDB) {
            if (oError) {
                return fReject(oError);
            }
            _zouti2.default.success("Connected to DB", "kach");
            fResolve(exports.db = oDB = oLinkedDB);
        });
    });
};

exports.init = fInit;
exports.db = oDB;