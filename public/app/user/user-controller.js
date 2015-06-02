routerApp
  .controller('UserCtrl',
    function($rootScope, $scope, $http){

      $scope.signupData = {};

      // Signup - add new user
      $scope.signUp = function(){
        $http.post('/api/signup', $scope.signupData).success(function(data){
            console.log(data);
        });

      console.log($scope.signupData);
      };

    });
