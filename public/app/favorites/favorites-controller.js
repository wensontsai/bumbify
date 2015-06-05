routerApp
  .controller('FavoritesCtrl',
    function($rootScope, $scope, $http, GifUrl, AuthenticationBlock){

      $scope.allFavorites = {};
      $scope.favoriteObject = {};
      $scope.favoriteObject.user = AuthenticationBlock.checkLoggedIn().name;

      $scope.loadedGif = {};
      $scope.loadResponse = '';

      // 1.  get all tags in favorites for this user id
      // 2.  for each tag query favorites for this user id, return results
      $scope.showAllFavorites = function(){
        $http.post('/api/getAllFavorites', $scope.favoriteObject).success(function(data){

          $scope.allFavorites = data;
          console.log($scope.allFavorites);
        });
      };

      $scope.setUrl = function($rootScope){
        $scope.loadResponse = GifUrl.setUrl($scope.loadedGif.url);
        console.log($scope.loadResponse);
      };

      $scope.deleteFavorite = function(){
        $scope.favoriteObject = {
              url : $scope.loadedGif.url,
              user : $scope.favoriteObject.user,
          };
        $http.post('/api/deleteFavorite', $scope.favoriteObject).success(function(data){
          console.log(data);
          // on success reload favorites view
          $scope.showAllFavorites();
        });
      };

    });
