'use strict';

angular.module('ChatApp').factory('chatSocket', function(socketFactory) {
  var socket = socketFactory();
  socket.forward('broadcast');
  return socket;
});
