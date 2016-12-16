/* Anne/kach
 *
 * /static/modules/components/secret.js - Secret Vue component
 *
 * coded by Anne
 * started at 16/09/2016
 */

 import Vue from "vue";

 Vue.component( "secret", {
     "props": [ "content" ],
     "data": function() {
         return {
             "reveal": {
                 "show": "Reveal my secrets!",
                 "hide": "Hide my secrets",
                 "value": "Reveal my secrets!",
             },
             "state": false,
         };
     },
     "template": `
         <div>
             <button v-on:click="revealSecret">{{ reveal.value }}</button>
             <p v-if="state">{{ content }}</p>
         </div>
     `,
     "methods": {
         "revealSecret": function() {
             this.state = !this.state;
             this.reveal.value = this.state ? this.reveal.hide : this.reveal.show;
         },
     }
 } );
