var $ = require('jquery');
var blocks = require('../src/blocks');

describe("block elements", function() {
  describe("book", function() {
    before(function() {
      $('body').html('<book></book>');
    });
    it("book initializes event binding for children", function() {
      blocks.buildBook();
    });
  });
});
