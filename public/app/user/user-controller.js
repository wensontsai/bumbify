routerApp
  .controller('UserCtrl',
    function($rootScope, $scope, $http, $location){

      $scope.signupData = {};

      // Signup - add new user
      $scope.signUp = function(){
        // validations go here

        // if all good, then hit up api
        $http.post('/api/signup', $scope.signupData).success(function(data){
            console.log(data);

          // clear $scope.signupData
          $scope.signupData = {};
          // redirect to login page
          $location.path('/login');
        });

      };

    });
