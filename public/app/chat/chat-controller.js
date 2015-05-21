routerApp
  .controller('ChatCtrl',
    function($log, $scope, ChatSocket, messageArrayer, nickName, GifUrl){

      $scope.nickName = nickName;
      $scope.chatSession = [];
      $scope.chatLine = {};

      //
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
        ChatSocket.emit('message', nickName, $scope.message);
        $log.debug('message sent', $scope.message);
        $scope.message = '';
      };


      // on socket broadcast
      $scope.$on('socket:broadcast', function(event, data){
        // console logging
        $log.debug('got a message', event.name);
        if(!data.payload){
          $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
          return;
        }

        $scope.$apply(function(){
          $scope.messageToAdd = messageArrayer(new Date(), data.source, data.payload);

          console.log(data);
          console.log($scope.messageToAdd);

          $scope.chatLine = Object.create(null);
          $scope.chatLine.text = $scope.messageToAdd;


          // call this function through GIF controller, or share service
          var url = GifUrl.getUrl();
          if(url !== null){
            $scope.chatLine.url = url;
          }
          $scope.chatSession.push($scope.chatLine);
          console.log($scope.chatSession);
        });
      });

    });
