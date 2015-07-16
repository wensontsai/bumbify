routerApp
  .controller('FriendsListCtrl',
    function($rootScope, $scope, $http, GifUrl, AuthenticationBlock, ChatSocket){
      // objects
      $scope.userSearch = {};
      $scope.userSearchResult = {};
      $scope.friendsList = {};
      $scope.friendActionObject = {};


      // logged in check
      $scope.loggedIn = AuthenticationBlock.checkLoggedIn().loggedIn;
        if($scope.loggedIn === true){
          $scope.nickName = AuthenticationBlock.checkLoggedIn().name;
          $scope.userId = AuthenticationBlock.checkLoggedIn().userId;
        }


      // friend/user search function
      $scope.queryForFriend = function(){
        $scope.userSearch.user = $scope.nickName;
        $scope.userSearch.userId = $scope.userId;

        console.log($scope.userSearch);
        $http.post('/api/queryForFriend', $scope.userSearch).success(function(data){

          console.log(data);

          $scope.userSearchResult = data;
        });



      };



      $scope.showFriendsList = function(){
        $scope.userSearch.userId = $scope.userId;

        $http.post('/api/getAllFriends', $scope.userSearch).success(function(data){
          console.log($scope.userSearch);
          console.log(data);

          $scope.friendsList = data;

        });
      };



      $scope.addFriend = function(friendName, friendId){
        friendObject = {
          user : $scope.nickName,
          userId : $scope.userId,
          friendName : friendName,
          friendId : friendId
        };

        console.log("adding freendd");
        console.log(friendObject);

        $http.post('/api/addFriend', friendObject).success(function(data){
          //clear search field
          $scope.userSearch.friendName = '';
          $scope.userSearchResult = '';

            console.log(data);
          $scope.showFriendsList();
        });

      };


      $scope.deleteFriend = function(){
        $scope.friendActionObject.userId = $scope.userId;

        console.log($scope.friendActionObject);

        $http.post('/api/deleteFriend', $scope.friendActionObject).success(function(data){
            console.log(data);

          // reload friends list
          $scope.showFriendsList();
        });
      };


      // $scope.createChatroom = function(){
      //   console.log($scope.friendActionObject);

      //   $http.post('/api/createChatroom', $scope.friendActionObject).success(function(data){
      //       console.log(data);

      //   // reload friends list
      //   $scope.showFriendsList();
      //   });
      // };




    });
