"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (oRequest, oResponse) {

    var POST = oRequest.body;

    // le + converti directement en nombre.
    var iLatitude = +POST.latitude,
        iLongitude = +POST.longitude,
        sBankID = (POST.bank || "").trim(),
        sAddress = (POST.address || "").trim(),
        oPosition = (0, _position2.default)(iLatitude, iLongitude),
        oTerminal = void 0,
        fCreateTerminal = void 0;

    // 1er chose on vérifie sur latitude et longitude sont correct.
    if (!oPosition) {
        return (0, _api.error)(oRequest, oResponse, "Invalid position", 400);
    }
    // Pour tester si ça marche dans insomnia
    // send( oRequest, oResponse, true );

    // Si lat et long sont correct on enregistre les donnée
    oTerminal = {
        "latitude": oPosition.latitude,
        "longitude": oPosition.longitude,
        "created_at": new Date(),
        "updated_at": new Date()
    };

    // Si on à l'adresse, on l'ajoute dans le tableau oTerminal.
    sAddress && (oTerminal.adress = sAddress);

    fCreateTerminal = function fCreateTerminal(bHasBank) {
        if (bHasBank) {
            oTerminal.bank = new _mongodb.ObjectID(sBankID);
        }

        // On fait un return de promise (insertOne) pour pouvoir l'insérer dans les promise plus bas.
        return (0, _terminals2.default)().insertOne(oTerminal);
    };

    (0, _banks.checkBank)(sBankID).then(fCreateTerminal).then(function () {
        // if all is ok.
        (0, _api.send)(oRequest, oResponse, {
            "id": oTerminal._id,
            "address": oTerminal.address || null,
            "bank": oTerminal.bank || null,
            "latitude": oTerminal.latitude,
            "longitude": oTerminal.longitude
        }, 201);
    }).catch(function (oError) {
        return (0, _api.error)(oRequest, oResponse, oError);
    });
};

var _mongodb = require("mongodb");

var _terminals = require("../../models/terminals");

var _terminals2 = _interopRequireDefault(_terminals);

var _banks = require("../../models/banks");

var _api = require("../../core/utils/api");

var _position = require("../../core/utils/position");

var _position2 = _interopRequireDefault(_position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }