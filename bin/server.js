"use strict";

var _mongodb = require("./core/mongodb");

var _express = require("./core/express");

/* ria/kach
 *
 * /src/server.js - main entry point
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/10/2015
*/

var APP_PORT = 12345;

(0, _mongodb.init)().then(function () {
  return (0, _express.init)(APP_PORT);
});