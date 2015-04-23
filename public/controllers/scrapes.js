angular.module('ThisApp', [])
  .controller('ScrapesCtrl',
    function($scope, $http){
      $scope.gifs = [];
      $scope.formInfo = {};
      $scope.gifSearch = {};

      //validations
      $scope.nameRequired = '';
      $scope.emailRequired = '';
      $scope.passwordRequired = '';

      // user functions
      $scope.saveData = function(){
        if (!$scope.formInfo.name) {
          $scope.nameRequired = '* Name Required *';
        }
        else if (!$scope.formInfo.email) {
          $scope.emailRequired = '* Email Required *';
        }
        else if (!$scope.formInfo.password) {
          $scope.passwordRequired = '* Password Required *';
        }
        else {
          $http.post('/api/createUser', $scope.formInfo)
            .success(function(data){
              if(data){
                console.log(data);
              }
          });
        }
      };


      // gif scrape functions
      $scope.searchGifs = function(){
        $http.post('/api/searchGifs', $scope.gifSearch).success(function(data){
          if(data){
            console.log(JSON.stringify(data));
          }
        })
      };

      $scope.showScrapes = function(){
        $http.get('/api/scrapes').success(function(data){
          $scope.gifs = data;
          console.log($scope.gifs);
        });
      };


    });
