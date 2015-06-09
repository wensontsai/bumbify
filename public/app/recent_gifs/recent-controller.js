routerApp
  .controller('RecentsCtrl',
    function($rootScope, $scope, $http, GifUrl, AuthenticationBlock){

      $scope.recentsObject = {};
      $scope.recentsObject.user = AuthenticationBlock.checkLoggedIn().name;

      $scope.recentUsedGifs = {};

     $scope.showAllRecents = function(){
      console.log("hear me man!");
      console.log($scope.recentsObject);
        $http.post('/api/getRecents', $scope.recentsObject).success(function(data){
          console.log(data);
          $scope.recentUsedGifs = data;
        });
      };
});
