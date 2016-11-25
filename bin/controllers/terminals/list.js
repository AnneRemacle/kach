"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (oRequest, oResponse) {

    var oCurrentPosition = (0, _position2.default)(+oRequest.query.latitude, +oRequest.query.longitude),
        iSearchRadius = +oRequest.query.radius;

    if (!oCurrentPosition) {

        return (0, _api.error)(oRequest, oResponse, "Invalid position!", 400);
    }

    // Check & cap radius
    isNaN(iSearchRadius) && (iSearchRadius = DEFAULT_RADIUS);
    // if ( isNaN( iSearchRadius ) ) {
    //     iSearchRadius = DEFAULT_RADIUS;
    // }

    iSearchRadius < DEFAULT_RADIUS && (iSearchRadius = DEFAULT_RADIUS);
    // if ( iSearchRadius < DEFAULT_RADIUS ) {
    //     iSearchRadius = DEFAULT_RADIUS;
    // }

    iSearchRadius > MAX_RADIUS && (iSearchRadius = MAX_RADIUS);
    // if ( iSearchRadius > MAX_RADIUS ) {
    //     iSearchRadius = MAX_RADIUS;
    // }

    iSearchRadius *= ARC_KILOMETER; // convert radius kilometer to arc

    (0, _terminals2.default)().find({
        "latitude": {
            // $gt et $lt sont des opérateurs
            "$gt": oCurrentPosition.latitude - iSearchRadius,
            "$lt": oCurrentPosition.latitude + iSearchRadius
        },
        "longitude": {
            "$gt": oCurrentPosition.longitude - iSearchRadius,
            "$lt": oCurrentPosition.longitude + iSearchRadius
        },
        "deleted_at": null
    }).toArray().then(function () {
        var aTerminals = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];


        var aCleanedTerminals = void 0,
            aTerminalsToReset = void 0;

        // 1. Compute distances
        // 3. Clean useless properties
        aCleanedTerminals = aTerminals.map(function (_ref) {
            var _id = _ref._id;
            var bank = _ref.bank;
            var latitude = _ref.latitude;
            var longitude = _ref.longitude;
            var address = _ref.address;
            var empty = _ref.empty;
            var updated_at = _ref.updated_at;

            var bEmptyState = empty;

            if (Date.now() - new Date(updated_at).getTime() > 24 * 3600 * 1000 && bEmptyState) {
                empty = false;
                aTerminalsToReset.push(_id);
            }

            return {
                "id": _id,
                "empty": bEmptyState,
                "distance": (0, _jeyoDistans2.default)(oCurrentPosition, { latitude: latitude, longitude: longitude }) * 1000,
                bank: bank, latitude: latitude, longitude: longitude, address: address
            };
        });

        (0, _terminals2.default)().update({
            "_id": { $in: aTerminalsToReset }
        }, {
            "$et": { "empty": false, "updated_at": new Date() }
        });
        // 2. Sort by distances
        aCleanedTerminals.sort(function (oTerminalOne, oTerminalTwo) {
            return oTerminalOne.distance - oTerminalTwo.distance;
        });

        (0, _api.send)(oRequest, oResponse, aCleanedTerminals);
    }).catch(function (oError) {
        return (0, _api.error)(oRequest, oResponse, oError);
    });
};

var _terminals = require("../../models/terminals");

var _terminals2 = _interopRequireDefault(_terminals);

var _api = require("../../core/utils/api");

var _jeyoDistans = require("jeyo-distans");

var _jeyoDistans2 = _interopRequireDefault(_jeyoDistans);

var _position = require("../../core/utils/position");

var _position2 = _interopRequireDefault(_position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ria/kach
 *
 * /src/controllers/terminals/list.js - Controllers for terminals list
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 28/10/2016
*/

var ARC_KILOMETER = 0.009259,
    // 1 decimale de lat/long vaut x Km
DEFAULT_RADIUS = 1,
    MAX_RADIUS = 10;