var osc = require('osc-min')
  , dgram = require('dgram')
  , EventEmitter = require('events').EventEmitter;

module.exports = Rail;

function Rail() {
  this.sock = dgram.createSocket('udp4');
  this.sock.bind(50001, 'localhost');
}

Rail.prototype.__proto__ = EventEmitter.prototype;

Rail.prototype.reset = function() {
  this._send(osc.toBuffer({
      address: '/reset'
    , args: []
  }));
};

Rail.prototype.forward = function(val) {
  this._send(osc.toBuffer({
      address: '/forward'
    , args: [val]
  }));
};

Rail.prototype.back = function(val) {
  this._send(osc.toBuffer({
      address: '/back'
    , args: [val]
  }));
};

Rail.prototype.left = function(val) {
  this._send(osc.toBuffer({
      address: '/left'
    , args: [val]
  }));
};

Rail.prototype.right = function(val) {
  this._send(osc.toBuffer({
      address: '/right'
    , args: [val]
  }));
};

Rail.prototype._send = function(buf) {
  this.sock.send(buf, 0, buf.length, 50000, 'localhost');
};
