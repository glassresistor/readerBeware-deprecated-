exports.blocks = require('./blocks');
$ = require('jquery');

exports.start = function() {
  $('body').ready(exports.blocks.buildBooks);
};
