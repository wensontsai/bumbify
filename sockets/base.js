exports.runIO = function(io){
  console.log(io);
  // 'use strict';
  io.on('connection', function(socket){
    // socket.on('message', function(from, msg){
    //   console.log('received message from', from, 'msg', JSON.stringify(msg));
    //   console.log('broadcasting message');
    //   console.log('payload is', msg);
    //   io.sockets.emit('broadcast', {
    //     payload: msg,
    //     source: from
    //   });
    //   console.log('broadcast complete');
    // });


    socket.on('message', function(from, msg, roomId){
      console.log('received message from', from, 'msg', JSON.stringify(msg), 'for room', roomId);
      console.log('broadcasting message');
      io.sockets.in(roomId).emit('broadcast',{
        payload: msg,
        source: from
      });
      console.log('broadcast complete');
    });


    socket.on('newChatroom', function(roomId, createdBy, chatPartner){
      socket.join(roomId);
      console.log(roomId+ " has officially been created.");
    });


  });


};
