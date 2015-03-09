describe('runner', function () {
  var proxyquire = require('proxyquire').noCallThru().noPreserveCache();;

  var processMock;
  var cliMock;
  var mockConsole = {
    log: function () {

    },
    error: function () {

    }
  };
  beforeEach(function () {
    var me = this;
    processMock = me.sandbox.createSpyObj('process', ['exit']);
    processMock.argv = ['node', 'bin/runner.js', 'some/**/*.js'];
  });

  afterEach(function () {
    processMock = cliMock = null;
  });

  it('should terminate the app in case of an error', function () {
    cliMock = {
      run: function (args, callback) {
        callback(2);
      }
    };
    var runner = proxyquire('../../bin/runner.js', {
      '../lib/console': mockConsole,
      '../lib/process': processMock,
      '../lib/cli': cliMock
    });

    expect(processMock.exit).to.have.been.calledWith(1);

  });

  it ('should do nothing in case in case of a successful execution', function () {
    cliMock = {
      run: function (args, callback) {
        callback(0);
      }
    };
    var runner = proxyquire('../../bin/runner.js', {
      '../lib/process': processMock,
      '../lib/cli': cliMock
    });

    expect(processMock.exit).to.have.been.calledWith(0);
  });

  it ('should do nothing in case in case of a successful execution', function () {
    cliMock = {
      run: function (args, callback) {
        throw new Error('Some Error');
      }
    };
    var runner = proxyquire('../../bin/runner.js', {
      '../lib/process': processMock,
      '../lib/cli': cliMock
    });

    expect(processMock.exit).to.have.been.calledWith(1);
  });
});