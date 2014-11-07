exports.NotImplementedError = function() {
  this.name="NotImplementedError";
  this.message="not implemented";
};
exports.NotImplementedError.protoype=Object.create(Error.prototype);

