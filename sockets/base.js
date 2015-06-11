exports.runIO = function(io){
  console.log(io);
  // 'use strict';
  io.on('connection', function(socket){
    socket.on('message', function(from, msg, url){
      console.log('received message from', from, 'msg', JSON.stringify(msg));
      console.log('broadcasting message');
      console.log('payload is', msg);
      io.sockets.emit('broadcast', {
        payload: msg,
        gif: url,
        source: from
      });
      console.log('broadcast complete');
    });
  });
};
