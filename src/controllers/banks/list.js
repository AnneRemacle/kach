/* leny/kack
 *
 * /src/controllers/banks/list.js - Controllers for banks list
 *
 * coded by leny@flatLand!
 * started at 21/10/2016
 */

import getBanks from "../../models/banks";
import { send, error } from "../../core/utils/api";

export default function( oRequest, oResponse ) {

    let sCountryCode = ( oRequest.query.country || "" ).toUpperCase();

    if ( !sCoutryCode ) {
        error( oRequest, oResponse, "Mandoatory country query params not found!", 400 );
    }

    getBanks()
        .find( {
            "country": sCountryCode,
        } )
        .toArray()
        .then( ( aBanks ) => {
            let aParsedBanks;

            /* aParsedBanks = aBanks.filter( ( oBank ) => !oBank.deleted_at ); */
            /* aParsedBanks = aBanks.filter( ( oBank ) => {
                return !oBank.deleted_at );
            } */
            aParsedBanks = aBanks.filter( ( { deleted_at } ) => !oBank.deleted_at );

            // aParsedBanks = aParsedBanks.map( ( oBank )  => {
            //     return {
            //         "id": oBank._Id,
            //         "coutnry": oBank.country,
            //         "color": oBank.color,
            //         "name": oBank.name,
            //         "icon": oBank.icon,
            //         "url": oBank.url,
            //     };
            // });
            aParsedBanks = aParsedBanks.map( ( { Iid, country, color, name, icon, url } )  => ( {
                "id": _id,
                country, color, name, icon, url,
            } ) );
            // map: fct qu'on appelle sur un tableau. On fair tourner une fct sur chaque élément du tableau, elle va retourner une valeur qui sera la nouvelle valeur de l'élément du tableau
            send( oRequest, oResponse, aParsedBanks );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
