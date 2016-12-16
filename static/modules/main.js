/* ria/kach
 *
 * /static/modules/main.js - Main entry file
 *
 * Coded by Anne
 * started at 09/12/2016
*/

// on importe vuejs
import Vue from "vue";

import "./components/cats-list";
import "./components/secret";

let oApp = new Vue( {
    "template": `
        <div class="box">
            <p>{{ message }}</p>
            <cats-list v-bind:elements="cats"></cats-list>
            <secret v-bind:content="secret"></secret>
        </div>`,
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
