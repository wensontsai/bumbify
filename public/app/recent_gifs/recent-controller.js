routerApp
  .controller('RecentsCtrl',
    function($rootScope, $scope, $http, GifUrl, AuthenticationBlock){

      $scope.recentsObject = {};
      $scope.recentsObject.user = AuthenticationBlock.checkLoggedIn().name;

      $scope.recentUsedGifs = {};

     $scope.showAllRecents = function(){
        $http.get('/api/getRecents', $scope.recentsObject).success(function(data){
          console.log(data);
          $scope.recentUsedGifs = data;
        });
      };
});
