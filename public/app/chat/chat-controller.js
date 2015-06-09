routerApp
  .controller('ChatCtrl',
    function($rootScope, $http, $log, $scope, ChatSocket, GifUrl, AuthenticationBlock, $location){

      $scope.chatSession = [];
      $scope.chatLine = {};
      $scope.gifCheck = '';
      $scope.chatSessionData = {};
      $scope.chatSessionData.sessionId = null;


      $scope.loggedIn = AuthenticationBlock.checkLoggedIn().loggedIn;
        if($scope.loggedIn === true){
        $scope.nickName = AuthenticationBlock.checkLoggedIn().name;

        // start a chatroom session //

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



      // initiate chatroom session in DB
      // get and store _id as $scope.chatSessionData.sessionID
      $scope.createChatSession = function(){
        console.log($scope.chatSessionData.sessionId);


        if($scope.chatSessionData.sessionId !== null){

          $scope.showChatroom();

        } else {
          $http.post('/api/createChatSession').success(function(data){
            console.log("creating chat session ");
            console.log(data);
            $scope.chatSessionData.sessionId = data._id;
            console.log($scope.chatSessionData);
          });
        }
      };


      // grab chat Session
      $scope.showChatSession = function(){
        $http.post('/api/getChatSession', $scope.chatSessionData).success(function(data){
            console.log("storing chatline below..");
            console.log(data);
          });
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
              $scope.chatLine.sessionId = $scope.chatSessionData.sessionId;
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
            $scope.chatLine.sessionId = $scope.chatSessionData.sessionId;
            $scope.chatLine.timestamp = unixDatestamp +", "+ unixTimestamp;
            $scope.chatLine.user = data.source;
            $scope.chatLine.text = data.payload;
            $scope.chatSession.push($scope.chatLine);


            console.log("chat line yoooo...");
            console.log($scope.chatLine);

            // store line to DB for session
            $http.post('/api/addChatLine', $scope.chatLine).success(function(data){
              console.log("storing chatline raight hayrr..");
              console.log(data);
            });

            // display in View
            var elem = document.getElementById('chatroom');

          }


        });
      });

    });
