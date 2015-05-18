routerApp
  .controller('ChatCtrl',
    function($log, $scope, chatSocket, messageArrayer, nickName){

      $scope.nickName = nickName;
      // $scope.messageLog = 'Ready to chat!';
      $scope.messageArray = [];

      $scope.sendMessage = function(){
        var match = $scope.message.match('^\/nick (.*)');

        if(angular.isDefined(match) && angular.isArray(match) && match.length === 2){
          var oldNick = nickName;
          nickName = match[1];

          $scope.message = '';
          $scope.messageLog = messageFormatter(new Date(), nickName, 'nickname changed - from ' +oldNick+ ' to ' +nickName+ '!') + $scope.messageLog;
          $scope.nickName = nickName;
        }

        // console logging
        $log.debug('sending message', $scope.message);
        chatSocket.emit('message', nickName, $scope.message);
        $log.debug('message sent', $scope.message);
        $scope.message = '';
      };


      $scope.$on('socket:broadcast', function(event, data){
        // console logging
        $log.debug('got a message', event.name);
        if(!data.payload){
          $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
          return;
        }

        $scope.$apply(function(){
          // $scope.messageLog = messageFormatter(
          //   new Date(), data.source, data.payload) + $scope.messageLog;

          $scope.messageToAdd = messageArrayer(new Date(), data.source, data.payload);
          console.log($scope.messageToAdd);

          $scope.messageArray.push($scope.messageToAdd);
          $scope.messageLog = $scope.messageArray;
          console.log($scope.messageLog);
        });
      });

    });