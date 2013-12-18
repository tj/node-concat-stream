
var Readable = require('stream').Readable;

module.exports = function concat(stream, fn) {
  
  if (!fn)
    throw new Error('callback should be a function');
  
  if (!stream || !(stream instanceof Readable))
    return fn(new Error('stream should be an instance of stream.Readable'));
  
  var buf = [];
  var fnCalled = false;

  stream.on('data', function(c){
    buf.push(c);
  });

  stream.on('end', function(){
    if (!fnCalled) {
      fnCalled = true;
      fn(null, Buffer.concat(buf));
    }
  });
  
  stream.on('error', function(e){
    if (!fnCalled) {
      fnCalled = true;
      fn(e);
    }
  });
  
}
