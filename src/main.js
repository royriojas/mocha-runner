module.exports = {
  run: function ( cli ) {
    var opts = cli.opts;
    var extend = require( 'extend' );

    var files = cli.expandGlobs( opts._, { resolvePaths: true } );

    var cfg = extend( true, { }, cli.getConfig(), opts );

    if ( process.env.TRAVIS ) {
      cfg.reporter = 'dot'; // works better on travis
    }

    if ( files.length === 0 ) {
      cli.ok( 'No specs to test. use -h for usage' );
      return;
    }

    require( '../lib/mocha-runner' ).run( files, {
      useCache: opts.useCache,
      mochaOptions: cfg
    }, function ( err ) {
      if ( err ) {
        throw err;
      }
    } );
  }
};
