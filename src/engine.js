var $ = require('jquery');
var Promise = require('promise-polyfill'); //TODO: ADD setimmediate
var Serializer = require("mousse").Serializer;
var Deserializer = require("mousse").deserialize;
var lzstring = require('lz-string');
var errors = require('./errors');
var inline = require('./inline');


exports.changeState = function(book, passage) {
  //Update Game State and change passage
  $(book.el).children('passage').hide();
  passage.el.show();
  book.state.history.push(passage.name);
  dumpState(book.state);
};

exports.dumpState = function(state) {
  //Build hash and change url
  //We have to maintain and serialize the history.  Normal back will cause
  //speedrun like behaviour not go backwards like we want.
  //This way the link contains all history and functions as a save game.
  var hash = new Serializer().serializeObject(state);
  hash = lzstring.compressToBase64(hash);
  history.pushState(0, document.title,
      '#' + book.name + '/' + hash);
}

exports.loadState = function(state) {
  /*
  deserialize(serializationString).then(function(object) {
    
  });
  */
};
