// angular.module('ThisApp', [])
routerApp
  .controller('HistoryCtrl',
    function($rootScope, $scope, $http, GifUrl){
      // search models
      $scope.gifs = [];
      $scope.formInfo = {};
      $scope.gifSearch = {};

      // gif select models
      $scope.loadedGif = {};
      $scope.loadResponse = '';


      $scope.showHistory = function(){
        $http.get('/api/searchHistory').success(function(data){
          $scope.searches = data;
          console.log($scope.searches);
        });
      };

    });
