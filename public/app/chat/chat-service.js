angular.module('ThisApp')
  .factory('ChatSocket', function(socketFactory) {
    var socket = socketFactory();
    socket.forward('broadcast');
    return socket;
  });
