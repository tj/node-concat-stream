
var Readable = require('stream').Readable;

module.exports = function(stream, fn) {
  if (!fn) throw new Error('callback required');

  var buf = [];
  var done = false;

  stream.on('data', function(c){
    buf.push(c);
  });

  stream.on('end', function(){
    if (done) return;
    done = true;
    fn(null, Buffer.concat(buf));
  });

  stream.on('error', function(e){
    if (done) return;
    done = true;
    fn(e);
  });
}
