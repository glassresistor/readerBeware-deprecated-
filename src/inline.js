var $ = require('jquery');
var errors = require('./errors');
var engine = require('./engine');

exports.clickExplore = function(book, passage) {
  engine.changeState(book, passage);
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
    book.state.choices.push([book.name, passage.name, name, id])//whatever save data
    el.addClass('chosenOne'); //highlander joke
    var choices = book.contrib.choices[name];
    Object.forEach(choices, function(el, i) {
      if(i != id) {
        $(el).addClass('notChosen'); //no highlander joke
      }
    });
  }
};

exports.buildChoice = function(book, i, el) {
  var $el = $(el);
  var passage = book.getPassage($el.attr('link'));
  var id = $el.attr('id');
  var name = $el.attr('name');
  var choice = book.contrib.choices[name];
  if (!choice) {
    choice = book.contrib.choices[name] = {};
  }
  choice[id] = el;
  if (passage) {
    $el.click(function() {
      exports.clickChoice(book, passage, name, id, el);
    });
  }
};
