/* RIA/Kach
 *
 * /static/modules/components/termlinal-details.js - Terminal details Vue component
 *
 * coded by Anne
 * started at 23/12/2016
 */

import Vue from "vue";
import reqwest from "reqwest";

let oTerminalDetails = Vue.component( "terminal-details", {
    "data": function() {
        return {
            "loaded": false,
            "terminal": {},
            "error": null,
        };
    },
    "template": `
    <div class="terminal-details">
        <div class="loading" v-if="!loaded">
            <p>loading…</p>
        </div>
        <div class="error" v-if='loaded && error'>
            <p>
                <strong>Error:</strong>
                {{ error.message }}
            </p>
        </div>
        <div v-if="loaded">
            <h2>Détails d'un terminal</h2>
            <p>(Ici on devrait afficher le nom de la banque)</p>
            <address>{{terminal.address}}</address>
        </div>
        <router-link to="/">Retour</router-link>
    </div>
    `,
    mounted() {
        console.log( "Détails d'un terminal:", this.$route.params.id );
        reqwest( {
            "url": `/terminals/${ this.$route.params.id }`,
            "method": "get",
            "data": {},
            "error": ( oError ) => {
                this.loaded = true;
                this.error = oError.message;
            },
            "success": ( oResponse ) => {
                this.loaded = true;
                this.terminal = oResponse.data;
            },
        } );
    }
} );

export default oTerminalDetails;
