// angular.module('ThisApp', [])
routerApp
  .controller('HistoryCtrl',
    function($rootScope, $scope, $http, GifUrl){


      $scope.showHistory = function(){
        $http.get('/api/searchHistory').success(function(data){
          $scope.searches = data;
          console.log($scope.searches);
        });
      };

    });
