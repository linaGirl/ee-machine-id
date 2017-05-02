## ee-machine-id

[![Greenkeeper badge](https://badges.greenkeeper.io/eventEmitter/ee-machine-id.svg)](https://greenkeeper.io/)

creates a uniquie id for the macine this is running on. the id is created using all mac addresses of the system, the cpu model and the systems total memory amount.
the id is returned in form of a md5 hash.

## ee software

All ee modules are free and MIT licenced. They never block, they never store data on the disk if not needed. They are built for creating fast & scalable applications.

## installation
	
	npm install ee-machine-id

##

	var machineId = require( "ee-machine-id" );

	console.log( machineId.id ); // undefined because the information was not laoded yet

	machineId.get( function( id ){
		console.log( id ); // 5ccbe155d5440cd06e3664c0ae3e811e
	} );