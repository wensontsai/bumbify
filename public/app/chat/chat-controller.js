routerApp
  .controller('ChatCtrl',
    function($rootScope, $log, $scope, ChatSocket, messageArrayer, nickName, GifUrl){

      $scope.nickName = nickName;
      $scope.chatSession = [];
      $scope.chatLine = {};

      //listen for gif loads
      // trigger sendMessage

      // $rootScope.$on('gifLoaded', function(event, data){
      //   console.log(data);
      //   console.log("heard it thru gravepine");
      //   $scope.sendMessage();
      // });

      $scope.$watch(function () { return GifUrl.getUrl(); }, function (newValue, oldValue) {
        if (newValue !== null) {
          console.log("worrrking");
            // $scope.= newValue;
        $log.debug('sending message', $scope.message);
        ChatSocket.emit('message', nickName, $scope.message);
        $log.debug('message sent', $scope.message);
        $scope.message = '';        }
      }, true);


      $scope.sendMessage = function(){
        // var match = $scope.message.match('^\/nick (.*)');

        // if(angular.isDefined(match) && angular.isArray(match) && match.length === 2){
        //   var oldNick = nickName;
        //   nickName = match[1];

        //   $scope.message = '';
        //   $scope.messageLog = messageFormatter(new Date(), nickName, 'nickname changed - from ' +oldNick+ ' to ' +nickName+ '!') + $scope.messageLog;
        //   $scope.nickName = nickName;
        // }


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
        // if(!data.payload){
        //   $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
        //   return;
        // }

        $scope.$apply(function(){
          $scope.chatLine = Object.create(null);

          // this fetches loaded GIF, and clears data object
          var response = GifUrl.getUrl();
          GifUrl.resetUrl();

          // if response is not null
          if(response.url !== null){
            $scope.chatLine.url = response.url;
          }

          // assemble chat session
          $scope.messageToAdd = messageArrayer(new Date(), data.source, data.payload);

          console.log(data);
          console.log($scope.messageToAdd);

          $scope.chatLine.text = $scope.messageToAdd;
          $scope.chatSession.push($scope.chatLine);
          console.log($scope.chatSession);

        });
      });

    });
