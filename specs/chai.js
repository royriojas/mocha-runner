describe( 'chai', function () {
  it( 'should be defined globally', function () {
    var chai = require( 'chai' );
    expect( global.expect ).to.equal( chai.expect );
  } );
} );
