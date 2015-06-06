routerApp
  .controller('ChatCtrl',
    function($rootScope, $log, $scope, ChatSocket, GifUrl, AuthenticationBlock, $location){

      $scope.chatSession = [];
      $scope.chatLine = {};
      $scope.gifCheck = '';


      $scope.loggedIn = AuthenticationBlock.checkLoggedIn().loggedIn;
        if($scope.loggedIn === true){
        $scope.nickName = AuthenticationBlock.checkLoggedIn().name;
      }

      // internal functions
      function messageArrayer(date, nick, message){
        return date.toLocaleTimeString() + ' - ' +nick+ ' - ' +message+ '\n';
      }

      // for menu bar styling
      $scope.isActive = function (viewLocation) {
           if ($location.path().substr(0, viewLocation.length) == viewLocation) {
              return true;
            } else {
              return false;
            }
            console.log(viewLocation);
            console.log($location.path().substr(0, viewLocation.length));
      };


      // watch for update for GIF url passes
      $scope.$watch(function () { return GifUrl.getUrl(); }, function (newValue, oldValue) {
        if (newValue !== oldValue) {
          $scope.gifCheck = 'gif';

          $scope.message = '';
          $log.debug('sending message', $scope.message);
          ChatSocket.emit('message', $scope.nickName, $scope.message);
          $log.debug('message sent', $scope.message);
        }
      }, true);


      $scope.sendMessage = function(){
        // console logging
        $log.debug('sending message', $scope.message);
        ChatSocket.emit('message', $scope.nickName, $scope.message);
        $log.debug('message sent', $scope.message);
        $scope.message = '';
      };


      // on socket broadcast
      $scope.$on('socket:broadcast', function(event, data){
        // console logging
        $log.debug('got a message', event.name);
        // console.log("data payload = " +data.payload);

        if(!data.payload && $scope.gifCheck !== 'gif'){
          $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
          return;
        }

        $scope.$apply(function(){
          $scope.chatLine = Object.create(null);

          // this fetches loaded GIF, and clears data object
          var response = GifUrl.getUrl();
          GifUrl.resetUrl();



          if(data.payload || response.url != null){// if response is not null
            if(response.url !== null){
              $scope.chatLine.url = response.url;
              $scope.gifCheck = '';
            }

            // date time stamp formatting
            var unixDatestamp = [
                 new Date().getMonth()+1,
                 new Date().getDate(),
                 new Date().getFullYear()
              ];
            var unixTimestamp = [
                new Date().getHours(),
                new Date().getMinutes(),
                new Date().getSeconds()
              ];
            unixDatestamp = unixDatestamp.join('-');
            unixTimestamp = unixTimestamp.join(':');

            // assembling chatLine
            $scope.chatLine.timestamp = unixDatestamp +", "+ unixTimestamp;
            $scope.chatLine.user = data.source;
            $scope.chatLine.text = data.payload;
            $scope.chatSession.push($scope.chatLine);

            var elem = document.getElementById('chatroom');

          }


        });
      });

    });
