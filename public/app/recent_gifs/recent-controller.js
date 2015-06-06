routerApp
  .controller('RecentsCtrl',
    function($rootScope, $scope, $http, GifUrl, AuthenticationBlock){

      $scope.gifObject = {};

      $scope.saveUsedGif = function(){

        $http.post('/api/saveUsedGif', $scope.gifObject).success(function(data){

          console.log(data);

        });

      };


});
