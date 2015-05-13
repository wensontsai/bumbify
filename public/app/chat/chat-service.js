angular.module('ThisApp')
  .factory('chatSocket', function(socketFactory) {
  var socket = socketFactory();
  socket.forward('broadcast');
  return socket;
});
