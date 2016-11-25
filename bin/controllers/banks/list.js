"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (oRequest, oResponse) {
    var sCountryCode = (oRequest.query.country || "").toUpperCase();

    if (!sCountryCode) {
        (0, _api.error)(oRequest, oResponse, "Mandatory country query params not found!", 400);
    }

    (0, _banks2.default)().find({
        "country": sCountryCode
    }).toArray().then(function (aBanks) {
        var aParsedBanks = void 0;

        // aParsedBanks = aBanks.filter( ( oBank ) => {
        //     return !oBank.deleted_at;
        // } );
        // aParsedBanks = aBanks.filter( ( oBank ) => !oBank.deleted_at );
        aParsedBanks = aBanks.filter(function (_ref) {
            var deleted_at = _ref.deleted_at;
            return !deleted_at;
        });

        aParsedBanks = aParsedBanks.map(function (_ref2) {
            var _id = _ref2._id;
            var country = _ref2.country;
            var color = _ref2.color;
            var name = _ref2.name;
            var icon = _ref2.icon;
            var url = _ref2.url;
            return {
                "id": _id,
                country: country, color: color, name: name, icon: icon, url: url
            };
        });

        (0, _api.send)(oRequest, oResponse, aParsedBanks);
    }).catch(function (oError) {
        return (0, _api.error)(oRequest, oResponse, oError);
    });
};

var _banks = require("../../models/banks");

var _banks2 = _interopRequireDefault(_banks);

var _api = require("../../core/utils/api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }