var mochify = require('mochify');
var istanbul = require('mochify-istanbul');

mochify('./test/*.test.js', {
  reporter : 'spec',
  port: 4444,
  cover: false,
  phantomjs: 'node_modules/.bin/phantomjs'
}).plugin(istanbul,{
    "exclude": ['**/test/*', '**/test/**/*', '**/test/fixtures/*', '**/node_modules/**/*',
      '**/*.json', '**/build/**/*.js'],
    "report": ['text'],
    "dir": './coverage'
  }).bundle();

