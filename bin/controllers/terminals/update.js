"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (oRequest, oResponse) {

	// 1. get values

	var POST = oRequest.body;

	var oTerminalID = void 0,
	    sAddress = (POST.address || "").trim(),
	    bEmpty = !!POST.empty,
	    iLatitude = POST.latitude,
	    iLongitude = POST.longitude,
	    sBankID = (POST.bank || "").trim(),
	    oPosition = void 0,
	    aModifications = [];

	try {
		// on converti en objet pour mongodb
		oTerminalID = new _mongodb.ObjectID(oRequest.params.id);
	} catch (oError) {
		return (0, _api.error)(oRequest, oResponse, new Error("invalid ID!"), 400);
	}

	// 2. check if terminal exists

	(0, _terminals2.default)().findOne({
		"_id": oTerminalID
	}).then(function (oTerminal) {
		var oModificationsToApply = {};

		if (!oTerminal) {
			return (0, _api.error)(oRequest, oResponse, new Error("Unknown Terminal", 404));
		}

		// 3. check values
		// 3a. check position
		if (iLatitude != null && iLongitude != null) {
			oPosition = (0, _position2.default)(+iLatitude, +iLongitude);
			if (!oPosition) {
				return (0, _api.error)(oRequest, oResponse, new Error("Invalid Position"), 400);
			}

			// if position ≠ old position, check move distance
			if (oTerminal.latitude !== oPosition.latitude || oTerminal.longitude !== oPosition.longitude) {
				if ((0, _jeyoDistans2.default)(oPosition, oTerminal) > MAX_MOVE_DISTANCE) {
					return (0, _api.error)(oRequest, oResponse, new Error("Movment is too big"), 400);
				}

				oTerminal.latitude = oPosition.latitude;
				oTerminal.longitude = oPosition.longitude;
				aModifications.push("latitude", "longitude");
			}
		}

		// 3b. check address
		if (sAddress) {
			oTerminal.address = sAddress;
			aModifications.push("address");
		}

		// 3c. check empty
		if (bEmpty) {
			oTerminal.empty = true;
			aModifications.push("empty");
		}

		// 3d. if bank changes, check bank
		return (0, _banks.checkBank)(sBankID).then(function (bHasBank) {
			if (bHasBank) {
				oTerminal.bank = new _mongodb.ObjectID(sBankID);
				aModifications.push("bank");
			}

			if (aModifications.length === 0) {
				return (0, _api.error)(oRequest, oResponse, new Error("No changes"), 400);
			}

			aModifications.forEach(function (sPorpertyName) {
				oModificationsToApply[sPorpertyName] = oTerminal[sPorpertyName];
			});

			oModificationsToApply.updated_at = new Date();

			return (0, _terminals2.default)().updateOne({
				"_id": oTerminal._id
			}, {
				"$set": oModificationsToApply
			}).then(function (_ref) {
				var matchedCount = _ref.matchedCount;
				var modifiedCount = _ref.modifiedCount;

				if (matchedCount !== 1 || modifiedCount !== 1) {
					return (0, _api.error)(oRequest, oResponse, new Error("Unknown save error"), 500);
				}

				(0, _api.send)(oRequest, oResponse, null, 204);
			});
		});
	}).catch(function (oError) {
		return (0, _api.error)(oRequest, oResponse, oError);
	});

	// 4. apply modifications
};

var _mongodb = require("mongodb");

var _terminals = require("../../models/terminals");

var _terminals2 = _interopRequireDefault(_terminals);

var _banks = require("../../models/banks");

var _api = require("../../core/utils/api");

var _jeyoDistans = require("jeyo-distans");

var _jeyoDistans2 = _interopRequireDefault(_jeyoDistans);

var _position = require("../../core/utils/position");

var _position2 = _interopRequireDefault(_position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ria/kach
 *
 * /src/controllers/terminals/update.js - Controller for terminal update
 *
 * Coded by Anne
 * started at 25/11/2016
*/

var MAX_MOVE_DISTANCE = 0.1; // in km