
module.exports = function concat(stream, fn) {
  var buf = [];

  stream.on('data', function(c){
    buf.push(c)
  });

  stream.on('end', function(){
    fn(null, Buffer.concat(buf));
  });
}