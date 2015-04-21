angular.module('ThisApp', [])
  .controller('ScrapesCtrl',
    function($scope, $http){
      $scope.gifs = [];

      $scope.showScrapes = function(){
        $http.get('/api/all_scrapes').success(function(data){
          console.log(data);
          $scope.gifs = data.gifs;
        });
      };


    });
