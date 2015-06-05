routerApp
  .controller('SignupCtrl',
    function($rootScope, $scope, $http, $location, AlertBlock, AuthenticationBlock){

      $scope.signupData = {};
      $scope.alert = {};

      // Signup - add new user
      $scope.signUp = function(){

        $http.post('/api/signup', $scope.signupData).success(function(data){
            console.log(data);

          // clear $scope.signupData
          $scope.signupData = {};

          // set alert to display on login view
          AlertBlock.setSignupAlert("Your account has been successfully created!");

          // toggle login view
          AuthenticationBlock.loginSignupToggle();

        });

      };

      //login & signup //
      $scope.loginSignupToggle = function() {
          $scope.signupData = {};
          AuthenticationBlock.loginSignupToggle();
      };

    })


  .controller('LoginCtrl',
    function($rootScope, $scope, $http, $location, $state, AlertBlock, AuthenticationBlock){

      $scope.loginData = {};
      $scope.alert = AlertBlock.getAlert().signupResult;
      console.log($scope.alert);

      // Login - add new user
      $scope.logIn = function(){

        $http.post('/api/login', $scope.loginData).success(function(data){
            console.log('inside user controller now');
            console.log(data);
          // set loggedin
          AuthenticationBlock.setLoggedIn($scope.loginData);

          // clear $scope.loginData
          $scope.loginData = {};

        });

      };

      //login & signup //
      $scope.loginSignupToggle = function() {
          $scope.loginData = {};
          AuthenticationBlock.loginSignupToggle();
      };

      $scope.logOut = function(){
          AuthenticationBlock.unsetLoggedIn();
      };




    });
