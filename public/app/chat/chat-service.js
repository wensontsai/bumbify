angular.module('ThisApp')
  .factory('ChatSocket', function(socketFactory) {
    var socket = socketFactory();
    socket.forward('broadcast');
    return socket;
  })
  .factory('ChatSession', function(){
    var chatData = {
      sessionId : null
    };
    return {
      setChatSessionId: function(obj){
        console.log("NEW CHCATT SESSION CREATED");
        chatData.sessionId = obj.sessionId;
      },
      getChatSessionId: function(){
        return chatData;
      }
    };

  });
