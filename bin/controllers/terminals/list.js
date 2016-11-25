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

	// check & cap radius
	// si ce qui est à gauche est vrai on fait ce qui est à droite
	isNaN(iSearchRadius) && (iSearchRadius = DEFAULT_RADIUS);
	iSearchRadius < DEFAULT_RADIUS && (iSearchRadius = DEFAULT_RADIUS);
	iSearchRadius > MAX_RADIUS && (iSearchRadius = MAX_RADIUS);

	iSearchRadius *= ARC_KILOMETER; // convert radius from kilometer to arc

	(0, _terminals2.default)().find({
		"latitude": {
			"$gt": oCurrentPosition.latitude - iSearchRadius,
			"$lt": oCurrentPosition.latitude + iSearchRadius
		},
		"longitude": {
			"$gt": oCurrentPosition.longitude - iSearchRadius,
			"$lt": oCurrentPosition.longitude + iSearchRadius
		},
		"deleted_at": null
	})
	// $gt et $lt sont des opérateurs de query, on fait des selects
	.toArray().then(function () {
		var aTerminals = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

		var aCleanTerminals = void 0;

		// 1. compute distances AND clean useless properties
		aCleanTerminals = aTerminals.map(function (_ref) {
			var _id = _ref._id;
			var bank = _ref.bank;
			var latitude = _ref.latitude;
			var longitude = _ref.longitude;
			var address = _ref.address;
			var empty = _ref.empty;
			return {
				"id": _id,
				"empty": !!empty,
				"distance": (0, _jeyoDistans2.default)(oCurrentPosition, { latitude: latitude, longitude: longitude }) * 1000,
				bank: bank, latitude: latitude, longitude: longitude, address: address
			};
		});

		// 2. sort by distances
		aCleanTerminals.sort(function (oTerminalOne, oTerminalTwo) {
			return oTerminalOne.distance - oTerminalTwo.distance;
		});
		// il remplit deux terminaux dans le fonction et compare les distances, il va le faire autant de fois qu'il faut jusqu'à avoir fait tout le tableau et tout trié

		(0, _api.send)(oRequest, oResponse, aCleanTerminals);
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

/* anne/hepl/ria/kach
 *
 * /src/controllers/terminals/list.js - Controller for terminal list
 *
 * coded by Anne
 * started at 28/10/2016
 */

var ARC_KILOMETER = 0.009259,
    // 1 décimale de lat/lng vaut X km
DEFAULT_RADIUS = 1,
    MAX_RADIUS = 10;