"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (oRequest, oResponse) {

    var sTerminalID = (oRequest.params.id || "").trim(),
        oCurrentPosition = void 0;

    if (!sTerminalID) {
        (0, _api.error)(oRequest, oResponse, "Invalid ID", 400);
    }

    oCurrentPosition = (0, _position2.default)(+oRequest.query.latitude, +oRequest.query.longitude);

    (0, _terminals2.default)().findOne({
        "_id": new _mongodb.ObjectID(sTerminalID),
        "deleted_at": null
    }).then(function (oTerminal) {

        if (!oTerminal) {
            return (0, _api.error)(oRequest, oResponse, "Unknown Terminal", 404);
        }

        var _id = oTerminal._id;
        var bank = oTerminal.bank;
        var latitude = oTerminal.latitude;
        var longitude = oTerminal.longitude;
        var address = oTerminal.address;
        var empty = oTerminal.empty;
        var oCleanedTerminal = void 0;

        oCleanedTerminal = {
            "id": _id,
            "empty": !!empty,
            bank: bank, latitude: latitude, longitude: longitude, address: address
        };

        if (oCurrentPosition) {
            oCleanedTerminal.distance = (0, _jeyoDistans2.default)(oCurrentPosition, oCleanedTerminal) * 1000;
        }

        (0, _api.send)(oRequest, oResponse, oCleanedTerminal);
    }).catch(function (oError) {
        return (0, _api.error)(oRequest, oResponse, oError);
    });
};

var _terminals = require("../../models/terminals");

var _terminals2 = _interopRequireDefault(_terminals);

var _api = require("../../core/utils/api");

var _mongodb = require("mongodb");

var _jeyoDistans = require("jeyo-distans");

var _jeyoDistans2 = _interopRequireDefault(_jeyoDistans);

var _position = require("../../core/utils/position");

var _position2 = _interopRequireDefault(_position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }