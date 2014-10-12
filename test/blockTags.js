var $ = require('jquery');
var should = require('should');
var blocks = require('../src/blocks');

describe("block elements", function() {
  describe("book", function() {
    beforeEach(function() {
      $('body').html('<book name="MyBook"></book>');
    });
    afterEach(function() {
      $('body').html('');
      window.books = undefined;
    });
    it("book initializes event binding for children", function() {
      blocks.buildBooks();
      should.exist(window.books);
      window.books.should.have.property('MyBook', blocks.Book($('book[name="MyBook"]')[0]));
    });
  });
});
