/* ria/kach
 *
 * /src/routes/pages.js - Pages routes
 *
 * Coded by Anne
 * started at 25/11/2016
*/

import { Router } from "express";

import homepageController from "../controllers/pages/home";

let oRouter = new Router();

oRouter.get( "/", homepageController );

export default oRouter;