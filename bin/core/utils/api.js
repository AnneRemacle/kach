"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* ria/kach
 *
 * /src/core/utils/ipa.js - API utils
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/10/2016
*/

var fSend = void 0,
    fError = void 0;

exports.send = fSend = function fSend(oRequest, oResponse) {
    var oData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var iStatus = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 200;

    oResponse.status(iStatus).json({
        "url": "[" + oRequest.method + "] " + oRequest.url,
        "timestamp": Date.now(),
        "data": oData,
        "error": false
    });
};

exports.error = fError = function fError(oRequest, oResponse, mError) {
    var iStatus = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;

    oResponse.status(iStatus).json({
        "url": "[" + oRequest.method + "] " + oRequest.url,
        "timestamp": Date.now(),
        "data": null,
        "error": mError instanceof Error ? mError.message : mError
    });
};

exports.send = fSend;
exports.error = fError;