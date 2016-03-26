var path = require( 'path' );

module.exports = {
  pkgJSONPath: path.resolve( __dirname, '../package.json' ),
  configFile: {
    defaultName: 'mocha.json',
    pathToLocalConfig: path.resolve( __dirname, '../configs/mocha.json' ),
    description: 'path to your mocha config. If none provided, it will first try to find a `./mocha.json` file in the current directory. If none found it will use the default ones. See mocha options here: http://mochajs.org/'
  },
  //useDefaultOptions: true,
  optionator: {
    prepend: '`mocha-runner` is yet another mocha cli with includes sinon, mocha and chai\n\n========================================================\nUsage: mocha-runner [options] glob [glob1] [glob2]..[globN]\n========================================================',
    options: [
      {
        heading: 'Options'
      },
      {
        option: 'use-cache',
        alias: 'u',
        type: 'Boolean',
        default: false,
        description: 'If true will filter the files returning only the ones that changed after the last run, if this is false the cache will be destroyed and created again the next time this flag is set to true. By default this is false'
      },
      {
        option: 'grep',
        alias: 'g',
        type: 'String',
        description: 'only run tests matching '
      },
      {
        option: 'fgrep',
        alias: 'f',
        type: 'String',
        description: 'only run tests matching '
      },
      {
        option: 'bail',
        alias: 'b',
        type: 'Boolean',
        description: 'fail on the first error'
      },
      {
        option: 'reporter',
        alias: 'r',
        type: 'String',
        description: 'Reporter, default to spec'
      },
      {
        option: 'timeout',
        alias: 't',
        type: 'Number',
        description: 'mocha tests timeout'
      }
    ]
  }
};
