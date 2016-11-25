"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (oRequest, oResponse) {

    var oTerminalID = void 0;

    // 1. Verify ID
    try {
        oTerminalID = new _mongodb.ObjectID(oRequest.params.id);
    } catch (oError) {
        return (0, _api.error)(oRequest, oResponse, new Error("invalid ID!"), 400);
    }

    // 2. Delete
    (0, _terminals2.default)().deleteOne({
        "_id": oTerminalID
    }).then(function (_ref) {
        var deletedCount = _ref.deletedCount;

        if (deletedCount === 1) {
            return (0, _api.send)(oRequest, oResponse, null, 204);
        }

        return (0, _api.error)(oRequest, oResponse, "Unknown deletion error", 500);
    }).catch(function (oError) {
        return (0, _api.error)(oRequest, oResponse, oError);
    });
};

var _mongodb = require("mongodb");

var _terminals = require("../../models/terminals");

var _terminals2 = _interopRequireDefault(_terminals);

var _api = require("../../core/utils/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }