'use strict';
var optionator = require( 'optionator' );
module.exports = optionator( {
  prepend: 'mocha-runner [globs] [options]',
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
      description: 'Show help'
    },
    {
      option: 'config',
      alias: 'c',
      type: 'path::String',
      description: 'path to your mocha config'
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
      description: 'If true will filter the files passed to mocha to only the ones that changed after the last run'
    }
  ]
} );
