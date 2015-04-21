// angular.module('MyApp')
//   .controller('ScrapesCtrl', ['$scope', 'Scraper', function($scope, Scraper){

//     $scope.gifs = Scraper.query();

//     $scope.showAllGifs = function(gifs){
//       $scope.gifs = Scraper.query({url : url});
//     };

//   }]);


angular.module('ThisApp', [])
  .controller('ScrapesCtrl',
    function($scope, $http){
      $scope.gifs = [];

      $scope.showScrapes = function(){
        $http.get('/api/all_scrapes').success(function(data){
          console.log(data);
          $scope.gifs = data;
        });
      };


    });