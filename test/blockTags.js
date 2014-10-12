var $ = require('jquery');
var blocks = require('../src/blocks');
var should = require('chai').should();

describe("block elements", function() {
  describe("book", function() {
    beforeEach(function() {
      $('body').html('<book name="MyBook"></book>');
    });
    afterEach(function() {
      $('body').html('');
      window.books = undefined;
    });
    it("adds book to global books object", function() {
      blocks.buildBooks();
      should.exist(window.books);
      var bookObject = blocks.Book(el);
      window.books.should.have.property('MyBook', bookObject);
      var book = window.books.MyBook;
      var el = $('book[name="MyBook"]')[0];
      book.should.have.property('el', el);
      var state = {
        'history' : [],
        'passages' : {}
      };
      book.should.have.property('state').and.eql(state);
    });
  });
});
