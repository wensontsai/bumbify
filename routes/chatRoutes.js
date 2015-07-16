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




