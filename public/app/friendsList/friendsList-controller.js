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
      $scope.searchUsers = function(){
        $scope.userSearch.user = $scope.nickName;
        $scope.userSearch.userId = $scope.userId;

        $scope.userSearchResult.name = "yup working";

        // $http.post('/api/queryForFriend', $scope.gifSearch).success(function(data){
        //     $scope.gifSearch = {};

        //     if(data == 'fail'){
        //       $scope.searchResult = 'That search yielded no results!';
        //       $scope.tag = '';
        //     } else {
        //       $scope.searchResult = '';

        //     }
        // });
      };

      $scope.showFriendsList = function(){
        $scope.userSearch.userId = $scope.userId;

        $http.post('/api/getAllFriends', $scope.userSearch).success(function(data){


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
