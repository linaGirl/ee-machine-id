


	var mid = require( "./" );


	console.log( mid.get(), mid.id );


	mid.get( function( id ){
		console.log( id );
	} );