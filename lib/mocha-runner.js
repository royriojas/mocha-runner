var merge = require( 'lodash.merge' );
var fileEntryCache = require( 'file-entry-cache' );
module.exports = {
  dirname: __dirname,
  run: function ( files, args, callback ) {
    'use strict';

    files = files || [];

    console.log( files );

    var cache = fileEntryCache.create( '__mocha_runner__' );

    if ( args.useCache ) {
      //console.log( 'use cache' );
      files = cache.getUpdatedFiles( files );
    } else {
      //console.log( 'not using cache' );
      cache.deleteCacheFile();
    }

    args = args || {};

    var opts = merge( {
      ui: 'bdd',
      bail: false,
      reporter: 'spec',
      grep: null,
      colors: true,
      invert: false
    }, args.mochaOptions );

    var Mocha = require( 'mocha' );

    var m = new Mocha( opts );

    var path = require( 'path' );
    m.addFile( path.resolve( this.dirname, './chai-init' ) );

    files.forEach( function ( file ) {
      m.addFile( file );
    } );

    m.run( function ( result ) {
      if ( result === 0 ) {
        cache && cache.reconcile();
      }
      callback && callback( result );
    } );
  }
};
