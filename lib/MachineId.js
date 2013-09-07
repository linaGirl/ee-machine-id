


	var   Class 		= require( "ee-class" )
		, log 			= require( "ee-log" )
		, Waiter 		= require( "ee-waiter" )
		, path 			= require( "path" )
		, fs 			= require( "fs" )
		, crypto 		= require( "crypto" )
		, os 			= require( "os" );


	module.exports = new Class( {

		  loaded 		: false
		, directory 	: "/sys/class/net/"
		, id 			: null
		, queue 		: []


		, init: function(){
			this.fetchMacAddresses();
		}


		, fetchMacAddresses: function(){
			var uid = "";

			fs.readdir( this.directory, function( err, devices ){
				if ( err  ) throw err;
				else if ( devices ){
					var waiter = new Waiter();


					devices.forEach( function( device ){
						waiter.add( function( cb ){


							fs.readFile( [ this.directory, device, "address" ].join( "/" ), function( err, data ){
								if ( !err && data && data.length > 0 ){
									uid += data.toString();
								}
								cb();
							}.bind( this ) );
						}.bind( this ) );
					}.bind( this ) );

					waiter.start( function(){
						if ( uid.length === 0 ) throw new Error( "failed to load network device information from «"+this.directory+"»!" );
						else {
							uid += os.totalmem();
							uid += os.cpus().map( function( cpu ){ return cpu.model } ).join( ":" );

							this.id = crypto.createHash( "md5" ).update( uid ).digest( "HEX" );
							this.loaded = true;

							this.queue.forEach( function( callback ){
								callback( this.id );
							}.bind( this ) );

							this.queue = [];
						}
					}.bind( this ) );
				}
				else throw new Error( "failed to load network device list from «"+this.directory+"»!" );
			}.bind( this ) );
		}



		, get: function( callback ){
			if ( callback ){
				if ( this.loaded ) callback( this.id );
				else this.queue.push( callback );
			}
			else return this.id;
		}
	} );