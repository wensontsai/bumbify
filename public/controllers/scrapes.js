angular.module('ThisApp', [])
  .controller('ScrapesCtrl',
    function($scope, $http){
      $scope.gifs = [];

      $scope.showScrapes = function(){
        $http.get('/api/scrapes').success(function(data){
          $scope.gifs = data;
          console.log($scope);
        });
      };


    });
