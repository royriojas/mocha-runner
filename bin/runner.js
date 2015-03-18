#!/usr/bin/env node
var process = require( '../lib/process' );
var console = require( '../lib/console' );

try {
  require( '../lib/cli' ).run( process.argv, function ( err ) {
    var exitCode = err ? 1 : 0;
    if ( err ) {
      console.error( '>>> failed tests: ' + err );
    }
    /*eslint-disable*/
    process.exit( exitCode );
    /*eslint-enable*/
  } );
} catch (ex) {
  console.error( ex.message );
  /*eslint-disable*/
  process.exit( 1 );
  /*eslint-enable*/
}
