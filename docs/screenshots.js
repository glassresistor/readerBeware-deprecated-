/// @export "setup"
var casper = require('casper').create({
    viewportSize : {width : 800, height : 600}
});

/// @export "initial"
casper.start("file:///home/ana/dev/readerBeware/samples/book1.html", function() {
    this.wait(500);
    this.capture("index.pdf");
    this.capture("index.png");
});

casper.then(function() {
    this.captureSelector("opendoor.png", "passage[name=openDoor]");
});


/// @export "run"
casper.run();
