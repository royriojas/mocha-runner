'use strict';

module.exports = {
  dirname: __dirname,
  run: function ( args, callback ) {
    var sFormat = require( 'stringformat' );
    var path = require( 'path' );
    var process = require( './process' );
    var console = require( './console' );

    var options = require( './options' );
    var fs = require( 'fs' );

    var readJSON = require( 'read-json-sync' );
    var expand = require( 'glob-expand' );

    var opts = options.parse( args );

    var showHelp = function () {
      console.log( options.generateHelp() );
    };

    if ( opts.help ) {
      showHelp();
      return;
    }

    if ( opts.version ) {
      console.log( readJSON( path.resolve( this.dirname, '../package.json' ) ).version );
      return;
    }

    var files = opts._.map( function ( glob ) {
      return path.resolve( process.cwd(), glob );
    } );

    files = expand.apply( null, files );

    var pathToConfig;
    if ( !opts.config ) {
      var localConfig = path.resolve( process.cwd(), './mocha.json' );
      pathToConfig = fs.existsSync( localConfig ) ? localConfig : path.resolve( this.dirname, '../configs/mocha.json' );
    } else {
      pathToConfig = path.resolve( process.cwd(), opts.config );
    }

    var cfg = {};

    try {
      cfg = readJSON( pathToConfig );
    } catch (ex) {
      throw new Error( sFormat( 'Error loading config {0}, Error: {1}', pathToConfig, ex.message ) );
    }

    if ( process.env.TRAVIS ) {
      cfg.reporter = 'dot'; // works better on travis
    }

    if ( files.length === 0 ) {
      console.log( 'No specs to test.\n' );
      showHelp();
      return;
    }

    console.log( 'using cache:', !!opts.useCache );

    try {
      require( './mocha-runner' ).run( files, {
        useCache: opts.useCache,
        mochaOptions: cfg
      }, callback );
    } catch (ex) {
      throw new Error( sFormat( 'error trying to run mocha. \nopts:\n {0}\n\n Error: {1}, Stack: {2}', JSON.stringify( opts, null, 2 ), ex.message, ex.stack ) );
    }
  }
};
