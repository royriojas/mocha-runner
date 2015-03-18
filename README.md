[![NPM Version](http://img.shields.io/npm/v/mocha-runner.svg?style=flat)](https://npmjs.org/package/mocha-runner)
[![Build Status](http://img.shields.io/travis/royriojas/mocha-runner.svg?style=flat)](https://travis-ci.org/royriojas/mocha-runner)

# mocha-runner
> A simple mocha runner that includes chai, sinon, sinon-chai and chai-fuzzy and accepts a list of globs to run

## Motivation



## install

```bash
# usually is enough to install it as a dev dependency since this is for testing 
npm i --save-dev mocha-runner 
```

## usage 

### Options
```
Usage: mocha-runner [globs] [options]

Options:
  -h, --help                 Show this help
  -c, --config path::String  path to your mocha config. If none provided, it will first try to find a
                             `./mocha.json` file in the current directory. If none found it will use the default
                             ones. See mocha options here: http://mochajs.org/
  -v, --version              Outputs the version number
  -u, --useCache
      If true will filter the files returning only the ones that changed after the last run, if this is false the
      cache will be destroyed and created again the next time this flag is set to true. By default this is false
```

### Example

From the command line

```bash
# or node node_modules/mocha-runner/bin/runner.js if installed as dev-dependency
mocha-runner --config='./path-to-mocha-config.json' 'specs/**/*.js' 'another/directory/**/*.js'
```
or in your package.json, **(Recommended)**, paired with [istanbul](https://www.npmjs.com/package/istanbul) and 
[watch-spawn](https://www.npmjs.com/package/watch-spawn)

```javascript
{
  "scripts": {
     // simple example for running tests
     "test": "mocha-runner 'specs/**/*.js'",
     // use it with istanbul to generate nice coverage reports
     "coverage": "istanbul cover -x 'specs/**/*.js' ./bin/runner.js 'specs/**/*.js' html text-summary",
     // use the useCache option to only run the tests that changed
     "coverage-cache": "istanbul cover -x 'specs/**/*.js' ./bin/runner.js 'specs/**/*.js' html text-summary -- --useCache=true",
     // pair it with watch-spawn and execute the tests only on the specs that changed
     // or when the sources files change, this will save tons of time if running this on a project with several files
     // Or at least save some noise to focus only on the modified specs. 
     "watch": "npm run coverage && watch-spawn -p 'specs/**/*.js' -p 'bin/**/*.js' -p 'lib/**/*.js' npm run coverage-cache" 
  }
}
```

then you can do

```bash
npm run test # will execute the tests
npm run coverage # will generate a coverage report
npm run coverage-cache # will execute only the test that changed. Coverage report is only of the changed files
npm run watch # will watch for changes on the specified files and run
```

## [Changelog](./changelog.md)

