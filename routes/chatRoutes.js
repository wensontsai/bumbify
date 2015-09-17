var express = require('express');
var io = require('socket.io');
var http = require('http');
var port = process.env.PORT || 5000;

var app = express();
var server = http.createServer(app);

// socket.io ////////
io = io.listen(server);


// for persisting chatroom
exports.showChatSession = function(ChatSession){
  return function(req, res, next){

      console.dir(req.body);

      // ChatSession.findOne({ '_id' :  req.body }, function(error, chatSession){
      //   if(error) return console.error(error);
      //   // console.dir(scrapes);
      //   res.send(chatSession);
      // });
    };
};

exports.createChatSession = function(ChatSession){
  return function(req, res, next){
      var chatSession = new ChatSession();

      chatSession.save(function(error, chatSession){
        if(error) return console.error(error);
        res.send(chatSession);
      });
  };
};

exports.addChatLine = function(ChatLine){
  return function(req, res, next){
      console.log(req.body);

      var chatLine = new ChatLine({
        chatSession : req.body.sessionId,
        url : req.body.url,
        text : req.body.text,
        user: req.body.user,
        timestamp: req.body.timestamp
      });

      chatLine.save(function(error, chatLine){
        if(error) return console.error(error);
        res.send(chatLine);
      });
  };
};

exports.createChatroom = function(ChatRoom){

  return function(req, res, next){
    var chatRoom = new ChatRoom({
      initiatorId : req.body.initiatorId,
      initiatorName: req.body.initiatorName,
      chatPartnerId : req.body.chatPartnerId,
      chatPartnerName : req.body.chatPartnerName,
    });

    console.dir(chatRoom);

    chatRoom.save(function(error, chatRoom){
      if(error) return console.error(error);
      console.dir(chatRoom);
      res.send(chatRoom);


      console.dir("wtf mann why you die");
      // new socket address for chatroom from mongodb
      var roomAddress = "/"+chatRoom._id;

      console.dir(roomAddress);



      // var nsp = io.of(roomAddress);

      // console.log(nsp);

      // nsp.on('connection', function(socket){
      //   socket.on('message', function(from, msg){
      //     console.log('received message from', from, 'msg', JSON.stringify(msg));
      //     console.log('broadcasting message');
      //     console.log('payload is', msg);
      //     io.sockets.emit('broadcast', {
      //       payload: msg,
      //       source: from
      //     });
      //   console.log('broadcast complete');

      // });
      //   nsp.emit('hi', 'everyone!');

    });




    // });


  };
};




