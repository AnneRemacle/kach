/* ria/kach
 *
 * /static/modules/main.js - Main entry file
 *
 * Coded by Anne
 * started at 09/12/2016
*/

// on importe vuejs
import Vue from "vue";

let oApp = new Vue( {
    "template": `
        <div class="box">
            <p>{{ message }}</p>
            <ul>
                <li v-for="cat in cats">
                    <strong>{{ cat.name }}</strong>
                    <span>( {{ cat.age }} )</span>
                </li>
            </ul>
            <button v-on:click="revealSecret">{{ reveal.value }}</button>
            <p v-if="secret">I'm a cat person</p>
        </div>`,
    "data": {
        "message": "Hey from Vue!",
        "secret": false,
        "cats": [
            { "name": "Argus", "age": 4 },
            { "name": "Isis", "age": 8 },
        ],
        "reveal": {
            "show": "Reveal my secrets!",
            "hide": "Hide my secrets",
            "value": "Reveal my secrets!",
        },
    },
    "methods": {
        "revealSecret": function() {
            this.secret = !this.secret;
            this.reveal.value = this.secret ? this.reveal.hide : this.reveal.show;
        },
    },
} );

oApp.$mount( "#app" );
