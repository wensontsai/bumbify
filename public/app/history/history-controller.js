routerApp
  .controller('HistoryCtrl',
    function($rootScope, $scope, $http, GifUrl){

      $scope.showHistory = function(){
        $http.get('/api/searchHistory').success(function(data){
          console.log(data);
          $scope.searches = data;

        });
      };

    });
