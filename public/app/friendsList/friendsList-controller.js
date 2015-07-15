routerApp
  .controller('FriendsListCtrl',
    function($rootScope, $scope, $http, GifUrl, AuthenticationBlock, ChatSocket){
      // search models
      $scope.userSearch = {};
      $scope.userSearchResult = {};


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

            // if(data == 'fail'){
            //   $scope.searchResult = '';
            //   $scope.tag = '';
            // } else {
            //   $scope.searchResult = '';
            // }

            // show Friends List again
            // $scope.showFriendsList();

          $scope.userSearchResult.name = data.name;
        });



      };



      $scope.showFriendsList = function(){
        $scope.userSearch.userId = $scope.userId;

        $http.post('/api/getAllFriends', $scope.userSearch).success(function(data){
          console.log($scope.userSearch);
          console.log(data);

        });
      };



      $scope.addFriend = function(){
        friendObject = {
          user : $scope.nickName,
          userId : $scope.userId,
          friendName : $scope.friendName,
          friendId : $scope.friendId
        };

        $http.post('/api/addFriend', friendObject).success(function(data){
            console.log(data);
        });
      };


      $scope.deleteFriend = function(){
        $http.post('/api/deleteFriend', friendObject).success(function(data){
            console.log(data);
        });
      };


    });
