"use strict";

var _mongodb = require("./core/mongodb");

var _express = require("./core/express");

/* leny/kach
 *
 * /src/server.js - main entry point
 *
 * coded by leny@flatLand!
 * started at 21/10/2016
 */

var APP_PORT = 12345;

(0, _mongodb.init)().then(function () {
  return (0, _express.init)(APP_PORT);
});