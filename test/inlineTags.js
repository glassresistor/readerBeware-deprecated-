var $ = require('jquery');
var should = require('chai').should();
var sinon = require('sinon');
var blocks = require('../src/blocks');


describe("buildChoice", function() {
  afterEach(function() {
    $('body').html('');
    window.books = undefined;
  });
  it('adds choice to contrib object', function() {
    $('body').html(
        '<book name="MyBook"><passage><choice name="cN" id="theOne" ></choice></passage></book>'
    );
    blocks.buildBooks();
    var book = window.books.MyBook;
    var el = $('choice').get()[0];
    book.contrib.choices.should.be.eql({ 'cN': { 'theOne': el }});
  });
});
