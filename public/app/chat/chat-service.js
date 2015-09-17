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
        // console.log("NEW CHCATT SESSION CREATED");
        chatData.sessionId = obj.sessionId;
      },
      getChatSessionId: function(){
        return chatData;
      }
    };

  })
 .factory('Chatrooms', function(){
  var chatrooms = [];

  return {
    setChatroomId: function(obj){
      console.log("NEW CHAT Room CREATED");
      chatrooms.push(obj);
      console.log(obj);
    },
    getChatrooms: function(){
      return chatrooms;
    }
  };

});
