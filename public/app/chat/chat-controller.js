routerApp
  .controller('ChatCtrl',
    function($rootScope, $http, $log, $scope, ChatSocket, GifUrl, AuthenticationBlock, $location, ChatSession, Chatrooms){

      $scope.message = {};
      $scope.chatSession = [];
      $scope.chatLine = {};
      $scope.gifCheck = '';
      $scope.chatRooms = {};

      // $scope.chatRooms = {
      //   room98ueo3980 : {'id' : '89sdjlff',
      //     'partner' : 'jesse'
      //   },
      //   room098239s09 : {'id' : '8weafsdfadaww',
      //     'partner' : 'elisabeth'
      //   }
      // };
      $scope.$watch(function () { return Chatrooms.getChatrooms(); }, function (newValue, oldValue) {
        if (newValue !== oldValue) {
           $scope.chatRooms = Chatrooms.getChatrooms();
           console.log($scope.chatRooms);
        }
      }, true);


      $scope.loggedIn = AuthenticationBlock.checkLoggedIn().loggedIn;
        if($scope.loggedIn === true){
        $scope.nickName = AuthenticationBlock.checkLoggedIn().name;
        $scope.userId = AuthenticationBlock.checkLoggedIn().userId;
      }

      // initiate chatroom persistence to DB//
      // createChatSession();



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
            // console.log(viewLocation);
            // console.log($location.path().substr(0, viewLocation.length));
      };



      // initiate chatroom session in DB
      // get and store _id as $scope.chatSessionData.sessionID
      // function createChatSession(){
      //   $scope.chatSessionId = ChatSession.getChatSessionId().sessionId;

      //   if($scope.chatSessionId !== null){

      //     $http.post('/api/getChatSession', $scope.chatSessionId).success(function(data){
      //       // console.log("we have a chat session with data below!");

      //       // console.log(data);
      //     });

      //   } else {
      //     $http.post('/api/createChatSession').success(function(data){
      //       // console.log("creating chat session ");
      //       // console.log(data);
      //       $scope.chatSessionId = data._id;

      //       ChatSession.setChatSessionId(data);
      //     });
      //   }
      // };


      // watch for update for GIF url passes
      // $scope.$watch(function () { return GifUrl.getUrl(); }, function (newValue, oldValue) {
      //   if (newValue !== oldValue) {
      //     $scope.gifCheck = 'gif';

      //     $scope.message = '';
      //     $log.debug('sending message', $scope.message);
      //     ChatSocket.emit('message', $scope.nickName, $scope.message);
      //     $log.debug('message sent', $scope.message);
      //   }
      // }, true);


      $scope.sendMessage = function(){
        // console logging
        $log.debug('sending message', $scope.message.text, $scope.roomId);

        ChatSocket.emit('message', $scope.nickName, $scope.message);

        $log.debug('message sent', $scope.message.text);
        $scope.message.text = '';
      };


      // on socket broadcast
      $scope.$on('socket:broadcast', function(event, data){
        // console logging
        $log.debug('got a message', event.name);
        // console.log("data payload text = " +data.payload.text);
        // console.log("data payload url = " +data.payload.url);
        // console.log("data payload source = " +data.source);

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
              $scope.chatLine.sessionId = $scope.chatSessionId;
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
            $scope.chatLine.sessionId = $scope.chatSessionId;
            $scope.chatLine.timestamp = unixDatestamp +", "+ unixTimestamp;
            $scope.chatLine.user = data.source;
            if(data.payload.url !== null){
              $scope.chatLine.url = data.payload.url;
            }
            if(data.payload.text !== null){
              $scope.chatLine.text = data.payload.text;
            }
            $scope.chatSession.push($scope.chatLine);


            // store line to DB for session
            // $http.post('/api/addChatLine', $scope.chatLine).success(function(data){
            //   console.log("storing chatline raight hayrr..");
            //   console.log(data);
            // });

            // display in View
            var elem = document.getElementById('chatroom');

          }


        });
      });

    });
