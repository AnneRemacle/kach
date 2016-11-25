"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkBank = undefined;

exports.default = function () {
    return _mongodb.db.collection("banks");
};

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongodb = require("../core/mongodb");

var _mongodb2 = require("mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ria/kach
 *
 * /src/models/banks.js - Model for banks
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/10/2016
*/

var fCheckBank = void 0;

exports.checkBank = fCheckBank = function fCheckBank(sBankID) {
    var oBankID = void 0;

    // si la bank n'existe pas déjà on renvoit false.
    if (!sBankID) {
        return _bluebird2.default.resolve(false);
    }

    // le try permet de ne pas faire planter le tout, mais il passe à catch à la place.
    // Si ça fonctionne on à un objet oBank.
    try {
        oBankID = new _mongodb2.ObjectID(sBankID);
    } catch (oError) {
        return _bluebird2.default.reject(new Error("Invalid Bank ID !"));
    }

    return _mongodb.db.collection("banks").findOne({
        "_id": oBankID
    }).then(function (oBank) {
        if (oBank) {
            return _bluebird2.default.resolve(true);
        }

        return _bluebird2.default.reject(new Error("Unknown Bank !"));
    });
};

exports.checkBank = fCheckBank;