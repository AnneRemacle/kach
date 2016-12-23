/* ria/kach
 *
 * /static/modules/main.js - Main entry file
 *
 * Coded by Anne
 * started at 09/12/2016
*/

// on importe vuejs
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use( VueRouter );

import TerminalsList from "./components/terminals-list";
import TerminalDetails from "./components/terminal-details";

let oRouter = new VueRouter( {
    "routes": [
        { "path": "/", "component": TerminalsList },
        { "path": "/:id", "component": TerminalDetails },
    ]
});

let oApp = new Vue( {
    "template": `
        <div class="wrapper">
            <header>
                <h1> Kach </h1>
            </header>
            <router-view></router-view>
            <footer>
                <a href="https://www.github.com/hepl-ria/kach">hepl-ria/kach</a>
            </footer>
        </div>
    `,
    "router": oRouter,
    "data": {
        "message": "Hey from Vue!",
        "secret": "I'm not a dog person!",
        "cats": [
            { "name": "Argus", "age": 4 },
            { "name": "Isis", "age": 8 },
        ],
    },
} );

oApp.$mount( "#app" );
