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

	if (isNaN(iSearchRadius)) {
		iSearchRadius = DEFAULT_RADIUS;
	}

	if (iSearchRadius < DEFAULT_RADIUS) {
		iSearchRadius = DEFAULT_RADIUS;
	}

	if (iSearchRadius > MAX_RADIUS) {
		iSearchRadius = MAX_RADIUS;
	}

	(0, _terminals2.default)().find({}).toArray().then(function () {
		var aTerminals = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];


		(0, _api.send)(oRequest, oResponse, oTerminal, aTerminals);
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