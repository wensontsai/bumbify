routerApp
  .controller('SignupCtrl',
    function($rootScope, $scope, $http, $location, AlertBlock, AuthenticationBlock){

      $scope.signupData = {};
      $scope.alert = {};

      // Signup - add new user
      $scope.signUp = function(){
        // validations go here

        // if all good, then hit up api
        $http.post('/api/signup', $scope.signupData).success(function(data){
            console.log(data);

          // clear $scope.signupData
          $scope.signupData = {};
          // redirect to login page
          $scope.alert.signupSuccess = "Your account has been successfully created!";
          console.log($scope.alert.signupSuccess);
          // $location.path('/login');
          AuthenticationBlock.loginSignupToggle();

        });

      };

      //login & signup //
      $scope.loginSignupToggle = function() {
          AuthenticationBlock.loginSignupToggle();
      };

    })


  .controller('LoginCtrl',
    function($rootScope, $scope, $http, $location, AlertBlock, AuthenticationBlock){

      $scope.loginData = {};
      $scope.alert = {};

      // Login - add new user
      $scope.logIn = function(){
        // validations go here

        // if all good, then hit up api
        $http.post('/api/login', $scope.loginData).success(function(data){
            console.log(data);


          // set loggedin
          AuthenticationBlock.setLoggedIn($scope.loginData);

          // clear $scope.loginData
          // $scope.loginData = {};
          // redirect to login page
          $location.path('/home');

        });

      };

      //login & signup //
      $scope.loginSignupToggle = function() {
          AuthenticationBlock.loginSignupToggle();
      };

      $scope.logOut = function(){
          AuthenticationBlock.unsetLoggedIn();
      };




    });
