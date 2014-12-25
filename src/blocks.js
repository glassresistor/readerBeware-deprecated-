var $ = require('jquery');
var Promise = require('promise-polyfill'); //TODO: ADD setimmediate
var errors = require('./errors');
var inline = require('./inline');


exports.buildPassage = function(book, i, el) {
  el = $(el);
  var name = el.attr('name');
  book.state.passages[name] = {};
  book.passages[name] = new exports.Passage(book, el);
};


exports.buildBooks = function() {
  window.books = {};
  $('book').each(function(i, el){
    var name = $(el).attr('name');
    var book = window.books[name] = new exports.Book(el);
  });
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
  $(this.el).find('explore').each(inline.buildExplore.bind(null, this));
  this.contrib.choices = {};
  this.state.choices = [];
  $(this.el).find('choice').each(inline.buildChoice.bind(null, this));
};

exports.Book.prototype.getPassage = function(name) {
  var passage = this.passages[name];
  if (!passage) {
    console.warn('missing passage ' + name);
    return undefined;
  }
  return passage;
};

