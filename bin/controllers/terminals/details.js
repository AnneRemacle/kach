"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (oRequest, oResponse) {
	var sTerminalID = (oRequest.params.id || "").trim();

	if (sTerminalID) {
		(0, _api.error)(oRequest, oResponse, "Invalid ID!", 400);
	}

	(0, _terminals2.default)().findOne({
		"_id": new ObjectID(sTerminalID), // plus propre de mettre new, mais on pourrait ne pas le mettre
		"deleted_at": null
	})
	// .then( ( oTerminal ) => {

	// 	let oCleanTerminal;

	// 	if ( !oTerminal ) {
	// 		return error( oRequest, oResponse, "Unknown terminal", 404 );
	// 	}

	// 	oCleanTerminal = {
	// 		"_id": oTerminal.id,
	// 		"bank": oTerminal.bank,
	// 		"latitude": oTerminal.latitude,
	// 		"longitude": oTerminal.longitude,
	// 		"empty": !!oTerminal.empty,
	// 	}

	.then(function (_ref) {
		var _id = _ref._id;
		var bank = _ref.bank;
		var latitude = _ref.latitude;
		var longitude = _ref.longitude;
		var address = _ref.address;
		var empty = _ref.empty;


		var oCleanTerminal = void 0;

		if (!_id) {
			return (0, _api.error)(oRequest, oResponse, "Unknown terminal", 404);
		}

		oCleanTerminal = {
			"_id": oTerminal.id,
			"empty": !!empty, // !! force un booléen
			bank: bank, latitude: latitude, longitude: longitude, address: address
		};

		(0, _api.send)(oRequest, oResponse, oTerminal, oCleanTerminal);
	}).catch(function (oError) {
		return (0, _api.error)(oRequest, oResponse, oError);
	});
};

var _terminals = require("../../models/terminals");

var _terminals2 = _interopRequireDefault(_terminals);

var _api = require("../../core/utils/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }