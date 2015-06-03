routerApp
  .controller('SignupCtrl',
    function($rootScope, $scope, $http, $location){

      $scope.signupData = {};
      $scope.newSignupMessage = '';

      // Signup - add new user
      $scope.signUp = function(){
        // validations go here

        // if all good, then hit up api
        $http.post('/api/signup', $scope.signupData).success(function(data){
            console.log(data);

          // clear $scope.signupData
          $scope.signupData = {};
          // redirect to login page
          $scope.newSignupMessage = "Your account has been successfully created!";
          console.log($scope.newSignupMessage);
          $location.path('/login');

        });

      };

    })
  .controller('LoginCtrl',
    function($rootScope, $scope, $http, $location){

      $scope.loginData = {};

      // Login - add new user
      $scope.logIn = function(){
        // validations go here

        // if all good, then hit up api
        $http.post('/api/login', $scope.loginData).success(function(data){
            console.log(data);

          // clear $scope.loginData
          $scope.loginData = {};
          // redirect to login page
          $location.path('/home');

        });

      };

    });
