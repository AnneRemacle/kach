/* anne/hepl/ria/kach
 *
 * /src/controllers/terminals/details.js - Controller for terminal details
 *
 * coded by Anne
 * started at 28/10/2016
 */

import getTerminals from "../../models/terminals";
import { send, error } from "../../core/utils/api";
import { objectID } from "mongodb";
import distance from "jeyo-distans";

import checkPosition from "../../core/utils/position";

export default function ( oRequest, oResponse ) {
	let sTerminalID = ( oRequest.params.id || "" ).trim(),
		oCurrentPosition;

	if ( sTerminalID ) {
		error( oRequest, oResponse, "Invalid ID!", 400 );
	}

	oCurrentPosition = checkPosition( +oRequest.query.latitude, +oRequest.query.longitude );

	getTerminals()
		.findOne( {
			"_id": new ObjectID( sTerminalID ), // plus propre de mettre new, mais on pourrait ne pas le mettre
			"deleted_at": null,
		} )
		// .then( ( oTerminal ) => {

		// 	let oCleanTerminal;

		// 	if ( !oTerminal ) {
		// 		return error( oRequest, oResponse, "Unknown terminal", 404 );
		// 	}

		// 	oCleanTerminal = {
		// 		"_id": oTerminal.id,
		// 		"bank": oTerminal.bank,
		// 		"latitude": oTerminal.latitude,
		// 		"longitude": oTerminal.longitude,
		// 		"empty": !!oTerminal.empty,
		// 	}

		.then( ( { _id, bank, latitude, longitude, address, empty } ) => {

			let oCleanTerminal;

			if ( !_id ) {
				return error( oRequest, oResponse, "Unknown terminal", 404 );
			}

			oCleanTerminal = {
				"_id": oTerminal.id,
				"empty": !!empty, // !! force un booléen
				bank, latitude, longitude, address, 
			};

			if ( oCurrentPosition ) {
				// TODO: compute distance
				oCleanTerminal.distance = distance( oCurrentPosition, oCleanTerminal ) * 1000;
			}

			send( oRequest, oResponse, oTerminal, oCleanTerminal );
		} )
		.catch( ( oError ) => error( oRequest, oResponse, oError ) );
}

/* on donne une fonction à then et cette fonction sera appelée après que findOne sera terminé */