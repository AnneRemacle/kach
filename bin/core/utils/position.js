"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (iLatitude, iLongitude) {

    var oPosition = void 0;

    if (isNaN(iLatitude) || isNaN(iLongitude)) {
        return false;
    }

    if (iLatitude < -90 || iLatitude > 90) {
        return false;
    }

    if (iLongitude < -180 || iLongitude > 180) {
        return false;
    }

    return {
        "latitude": iLatitude,
        "longitude": iLongitude
    };
};