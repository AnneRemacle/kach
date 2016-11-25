"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = undefined;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _responseTime = require("response-time");

var _responseTime2 = _interopRequireDefault(_responseTime);

var _mitanEko = require("mitan-eko");

var _mitanEko2 = _interopRequireDefault(_mitanEko);

var _zouti = require("zouti");

var _zouti2 = _interopRequireDefault(_zouti);

var _system = require("../routes/system");

var _system2 = _interopRequireDefault(_system);

var _banks = require("../routes/banks");

var _banks2 = _interopRequireDefault(_banks);

var _terminals = require("../routes/terminals");

var _terminals2 = _interopRequireDefault(_terminals);

var _pages = require("../routes/pages");

var _pages2 = _interopRequireDefault(_pages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var APP_PORT = "12345"; /* ria/kach
                         *
                         * /src/core/express.js - Express configuration
                         *
                         * Coded by Mucht - Mathieu Claessens
                         * started at 21/10/2016
                        */

var oApp = void 0,
    fInit = void 0;

exports.init = fInit = function fInit() {
    var iAppPort = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : APP_PORT;

    if (oApp) {
        return oApp;
    }

    oApp = (0, _express2.default)();

    // config middlewares
    oApp.use((0, _mitanEko2.default)("kach"));
    oApp.use((0, _responseTime2.default)());
    oApp.use(_bodyParser2.default.json());
    oApp.use(_bodyParser2.default.urlencoded({
        "extended": true
    }));

    // routes
    oApp.use(_system2.default);
    oApp.use(_banks2.default);
    oApp.use(_terminals2.default);
    oApp.use(_pages2.default);

    // Listening
    oApp.listen(iAppPort, function () {
        _zouti2.default.success("Server is listening on " + iAppPort, "kach");
    });
};

exports.init = fInit;