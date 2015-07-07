routerApp
  .controller('FriendsListCtrl',
    function($rootScope, $scope, $http, GifUrl, AuthenticationBlock, ChatSocket){
      // search models
      $scope.gifs = [];
      $scope.formInfo = {};
      $scope.gifSearch = {};
      $scope.timestamp = '';
      $scope.message = {};

      // gif select models
      $scope.loadedGif = {};
      $scope.loadResponse = '';

      $scope.loggedIn = AuthenticationBlock.checkLoggedIn().loggedIn;
        if($scope.loggedIn === true){
          $scope.nickName = AuthenticationBlock.checkLoggedIn().name;
          $scope.userId = AuthenticationBlock.checkLoggedIn().userId;
          // console.log("I'm in scrapes ctrl!!!");
          // console.log($scope.userId);
        }


      // gif scrape functions
      $scope.searchUsers = function(){
        $scope.gifSearch.user = $scope.nickName;
        $scope.gifSearch.userId = $scope.userId;
          // console.log($scope.gifSearch);

        $http.post('/api/searchGifs', $scope.gifSearch).success(function(data){
            // console.log(data);

            // clear $scope.gifSearch
            $scope.gifSearch = {};

            if(data == 'fail'){
              $scope.searchResult = 'That search yielded no results!';
              $scope.tag = '';
            } else {
              $scope.searchResult = '';

            }

            // then get scrapes again
            $scope.showScrapes();
            // $http.get('/api/scrapes').success(function(data){
            //   $scope.gifs = data;
            //   $scope.tag = data[0].tag;
              // console.log($scope.tag);
            // });

        });
      };

      $scope.showFriendsList = function(){
        $scope.gifSearch.userId = $scope.userId;

        $http.post('/api/scrapes', $scope.gifSearch).success(function(data){
          $scope.gifs = data;
          $scope.tag = data[0].tag;
          // console.log('showScrapes nowww ng-controller');
          // console.log($scope.gifs);
          // console.log($scope.tag);
        });
      };

      $scope.setUrl = function($rootScope){

        storeUsedGif();

        $scope.loadResponse = GifUrl.setUrl($scope.loadedGif);

        $scope.message.url = $scope.loadedGif.url;
        // console.log($scope.message.url);

        ChatSocket.emit('message', $scope.nickName, $scope.message);

        // console.log($scope.loadResponse);

      };


      $scope.addFriend = function(){
        getDateTime();

        favoriteObject = {
          url : $scope.loadedGif.url,
          user : $scope.nickName,
          userId : $scope.userId,
          tag : $scope.tag,
          timestamp : $scope.timestamp
        };

        // $scope.favoriteResponse = Favorite.setFavorite(favoriteObject);
        // console.log($scope.favoriteResponse);

        $http.post('/api/addFavorite', favoriteObject).success(function(data){
            // console.log(data);
        });
      };

      $scope.deleteFriend = function(){
        getDateTime();

        favoriteObject = {
          url : $scope.loadedGif.url,
          user : $scope.nickName,
          userId : $scope.userId,
          tag : $scope.tag,
          timestamp : $scope.timestamp
        };

        // $scope.favoriteResponse = Favorite.setFavorite(favoriteObject);
        // console.log($scope.favoriteResponse);

        $http.post('/api/addFavorite', favoriteObject).success(function(data){
            // console.log(data);
        });
      };


    });
