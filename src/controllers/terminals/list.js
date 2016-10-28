/* anne/hepl/ria/kach
 *
 * /src/controllers/terminals/list.js - Controller for terminal list
 *
 * coded by Anne
 * started at 28/10/2016
 */

import getTerminals from "../../models/terminals";
import { send, error } from "../../core/utils/api";
import distance from "jeyo-distans";
import checkPosition from "../../core/utils/position";

const ARC_KILOMETER = 0.009259, // 1 décimale de lat/lng vaut X km
	DEFAULT_RADIUS = 1,
	MAX_RADIUS = 10;

export default function( oRequest, oResponse ) {
	let oCurrentPosition = checkPosition( +oRequest.query.latitude, +oRequest.query.longitude ),
		iSearchRadius = +oRequest.query.radius;

	if ( !oCurrentPosition ) {
		return error( oRequest, oResponse, "Invalid position!", 400 );
	}

	// check & cap radius
	// si ce qui est à gauche est vrai on fait ce qui est à droite
	( isNaN( iSearchRadius ) ) && ( iSearchRadius = DEFAULT_RADIUS ); 
	( iSearchRadius < DEFAULT_RADIUS ) && ( iSearchRadius = DEFAULT_RADIUS );
	( iSearchRadius > MAX_RADIUS ) && ( iSearchRadius = MAX_RADIUS );

	iSearchRadius *= ARC_KILOMETER; // convert radius from kilometer to arc

	getTerminals()
		.find( {
			"latitude": {
				"$gt": oCurrentPosition.latitude - iSearchRadius,
				"$lt": oCurrentPosition.latitude + iSearchRadius
			},
			"longitude": {
				"$gt": oCurrentPosition.longitude - iSearchRadius,
				"$lt": oCurrentPosition.longitude + iSearchRadius
			}
			"deleted_at": null,
		})
		// $gt et $lt sont des opérateurs de query, on fait des selects
		.toArray()
		.then( ( aTerminals = [] ) => {
			let aCleanTerminals;

			// 1. compute distances AND clean useless properties
			aCleanTerminals.map( ( { _id, bank, latitude, longitude, address, empty } ) => ( {
				"id": _id,
				"empty": !!empty,
				"distance": distance( oCurrentPosition, { latitude, longitude } ) *1000,
				bank, latitude, longitude, address,
			}) );
			
			// 2. sort by distances
			aCleanTerminals.sort( ( oTerminalOne, oTerminalTwo )  => oTerminalOne.distance - oTerminalTwo.distance);
			// il remplit deux terminaux dans le fonction et compare les distances, il va le faire autant de fois qu'il faut jusqu'à avoir fait tout le tableau et tout trié

			send( oRequest, oResponse, oTerminal, aCleanTerminals );
		} )
		.catch( ( oError ) => error( oRequest, oResponse, oError ) );
}