describe( 'sinon', function () {
  it( 'sinon should be defined', function () {
    var me = this;
    expect( me.sandbox ).to.be.defined;
    expect( me.sandbox.spy ).to.be.function;
  } );

  it( 'sinon chai can be used', function () {
    var me = this;
    var spy = me.sandbox.spy();

    spy( 'some', { arg: 'ument' } );

    expect( spy ).to.have.been.calledWith( 'some', { arg: 'ument' } );
  } );

  it( 'should be able to create multiple spies in an object', function () {
    var obj = {
      fn1: function () {
        return 1;
      },
      fn2: function () {
        return 2;
      }
    };

    this.sandbox.spyMany( obj, [ 'fn1', 'fn2' ] );

    obj.fn1( 'an Argument' );
    obj.fn2( 'another argument' );

    expect( obj.fn1 ).to.have.been.calledWith( 'an Argument' );
    expect( obj.fn2 ).to.have.been.calledWith( 'another argument' );

  } );

  it( 'should be able to create multiple stubs in an object', function () {
    var obj = {
      fn1: function () {
        return 1;
      },
      fn2: function () {
        return 2;
      }
    };

    this.sandbox.stubMany( obj, [ 'fn1', 'fn2' ] );

    obj.fn1( 'an Argument' );
    obj.fn2( 'another argument' );

    expect( obj.fn1 ).to.have.been.calledWith( 'an Argument' );
    expect( obj.fn2 ).to.have.been.calledWith( 'another argument' );

  } );

  it( 'should allow create spyObjects with no objects', function () {
    var me = this;
    var obj = me.sandbox.createSpyObj( 'someObj', [ 'fn1', 'fn2' ] );

    obj.fn1( 'an Argument' );
    obj.fn2( 'another argument' );

    expect( obj.fn1 ).to.have.been.calledWith( 'an Argument' );
    expect( obj.fn2 ).to.have.been.calledWith( 'another argument' );

  } );

  it( 'should allow do partial matches', function () {
    var me = this;
    var spy = me.sandbox.spy();
    spy( { type: 'foo:bar', prop: 'other' } );

    expect( spy ).to.have.been.calledWith( me.sandbox.match( {
      type: 'foo:bar'
    } ) );
  } );
} );
