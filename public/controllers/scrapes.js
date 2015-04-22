angular.module('ThisApp', [])
  .controller('ScrapesCtrl',
    function($scope, $http){
      $scope.gifs = [];
      $scope.formInfo = {};

      //validations
      $scope.nameRequired = '';
      $scope.emailRequired = '';
      $scope.passwordRequired = '';

      $scope.saveData = function(){
        console.log($scope.formInfo);
        if (!$scope.formInfo.Name) {
        $scope.nameRequired = '* Name Required *';
      }

      if (!$scope.formInfo.Email) {
        $scope.emailRequired = '* Email Required *';
      }

      if (!$scope.formInfo.Password) {
        $scope.passwordRequired = '* Password Required *';
      }
      };


      $scope.showScrapes = function(){
        $http.get('/api/scrapes').success(function(data){
          $scope.gifs = data;
          console.log($scope.gifs);
        });
      };


    });
