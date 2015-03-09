'use strict';
var optionator = require( 'optionator' );
module.exports = optionator( {
  prepend: 'Usage: mocha-runner [globs] [options]',
  concatRepeatedArrays: true,
  mergeRepeatedObjects: true,
  options: [
    {
      heading: 'Options'
    },
    {
      option: 'help',
      alias: 'h',
      type: 'Boolean',
      description: 'Show this help'
    },
    {
      option: 'config',
      alias: 'c',
      type: 'path::String',
      description: 'path to your mocha config. If none provided, it will first try to find a `./mocha.json` file in the current directory. If none found it will use the default ones. See mocha options here: http://mochajs.org/'
    },
    {
      option: 'version',
      alias: 'v',
      type: 'Boolean',
      description: 'Outputs the version number'
    },
    {
      option: 'useCache',
      alias: 'u',
      type: 'Boolean',
      default: false,
      description: 'If true will filter the files returning only the ones that changed after the last run, if this is false the cache will be destroyed and created again the next time this flag is set to true. By default this is false'
    }
  ]
} );
