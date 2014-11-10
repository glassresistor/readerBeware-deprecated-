var $ = require('jquery');
var blocks = require('../src/blocks');
var should = require('chai').should();
var sinon = require('sinon');

describe("block elements", function() {
  describe("book", function() {
    beforeEach(function() {
      sinon.stub(blocks, 'buildPassage');
      sinon.stub(blocks, 'buildExplore');
    });
    afterEach(function() {
      $('body').html('');
      window.books = undefined;
      blocks.buildPassage.restore();
      blocks.buildExplore.restore();
    });
    it("adds book to global books object", function() {
      $('body').html('<book name="MyBook"></book>');
      blocks.buildBooks();
      should.exist(window.books);
      var bookObject = blocks.Book(el);
      window.books.should.have.property('MyBook', bookObject);
      var book = window.books.MyBook;
      var el = $('book[name="MyBook"]')[0];
      book.should.have.property('el', el);
      var state = {
        'history' : [],
        'passages' : {},
        'choices': {}
      };
      book.should.have.property('state').and.eql(state);
    });
    it("adds two book to global books object", function() {
      var bookOne = $('<book></book>');
      var bookTwo = bookOne.clone();
      bookOne.attr('name', 'One');
      bookTwo.attr('name', 'Two');
      $('body').html(bookOne);
      $('body').append(bookTwo);
      blocks.buildBooks();
      Object.keys(window.books).should.be.length(2);
      window.books['One'].el.should.be.eql(bookOne.get()[0]);
      window.books['Two'].el.should.be.eql(bookTwo.get()[0]);
    });
    it("calls buildPassage", function() {
      $('body').html('<book name="MyBook"><passage></passage></book>');
      blocks.buildBooks();
      blocks.buildPassage.calledOnce.should.be.true;
    });
    it("calls buildExplore", function() {
      $('body').html('<book name="MyBook"><passage></passage></book>');
      blocks.buildBooks();
      blocks.buildPassage.calledOnce.should.be.true;
    });
  });

});
