var $ = require('jquery');
var Promise = require('promise-polyfill'); //TODO: ADD setimmediate
var Serializer = require("mousse").Serializer;
var lzstring = require('lz-string');
var errors = require('./errors');

exports.changeState = function(book, passage) {
  //Update Game State and change passage
  $(book.el).children('passage').hide();
  passage.el.show();
  book.state.history.push(passage.name);
  //Build hash and change url
  //We have to maintain and serialize the history.  Normal back will cause
  //speedrun like behaviour not go backwards like we want.
  //This way the link contains all history and functions as a save game.
  var hash = new Serializer().serializeObject(book.state);
  hash = lzstring.compressToBase64(hash);
  history.pushState(0, document.title,
      '#' + book.name + '/' + hash);
};

exports.clickExplore = function(book, passage) {
  exports.changeState(book, passage);
};

exports.buildExplore = function(book, i, el) {
  el = $(el);
  var link = el.attr('link');
  var passage = book.getPassage(link);
  if (passage) {
    el.click(function() {
      exports.clickExplore(book, passage);
    });
  }
};

exports.clickChoice = function(book, passage, name, id, el) {
  el = $(el);
  if (!el.hasClass('notChosen')) {
    exports.clickExplore(book, passage);
    book.state.choices.append([book, name, id]); //whatever save data
    el.addClass('chosenOne'); //highlander joke
    var choices = book.contrib.choices[name];
    choices.each(function(i, el) {
      if(i != id) {
        $(el).addClass('notChosen'); //no highlander joke
      }
    });
  }
};

exports.buildChoice = function(book, i, el) {
  el = $(el);
  var passage = book.getPassage(el.attr('link'));
  var id = el.attr('id');
  var name = el.attr('name');
  var choice = book.contrib.choices[name];
  if (!choice) {
    choice = {};
  }
  choice[id] = el;
  if (passage) {
    el.click(function() {
      exports.clickChoice(book, passage, name, id, el);
    });
  }
};

exports.buildPassage = function(book, i, el) {
  el = $(el);
  var name = el.attr('name');
  book.state.passages[name] = {};
  book.passages[name] = new exports.Passage(book, el);
};


/// "initPassage"
exports.Passage = function(book, el) {
  this.book = book;
  this.name = el.attr('name');
  this.el = el;
  this.state = book.state.passages[this.name];
};


/// "initBook"
exports.Book = function(el) {
  this.el = el;
  this.name = $(this.el).attr('name');
  this.passages = {};
  this.state = {
    'history': [],
    'passages': {}
  };
  this.contrib = {};
  //FIXME: dear god make this something others can jack into.
  $(this.el).children('passage').each(exports.buildPassage.bind(null, this));
  $(this.el).find('explore').each(exports.buildExplore.bind(null, this));
  this.contrib.choices = {};
  this.state.choices = [];
  $(this.el).find('choice').each(exports.buildChoice.bind(null, this));
};

exports.Book.prototype.getPassage = function(name) {
  var passage = this.passages[name];
  if (!passage) {
    console.warn('missing passage ' + name);
    return undefined;
  }
  return passage;
};


exports.buildBooks = function() {
  window.books = {};
  $('book').each(function(i, el){
    var name = $(el).attr('name');
    var book = window.books[name] = new exports.Book(el);
  });
};
