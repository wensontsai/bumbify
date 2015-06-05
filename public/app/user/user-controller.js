routerApp
  .controller('SignupCtrl',
    function($rootScope, $scope, $http, $location, AlertBlock, AuthenticationBlock){

      $scope.alert = '';
      $scope.signupData = {};

      // Signup - add new user
      $scope.signUp = function(){
        $scope.alert = '';

        $http.post('/api/signup', $scope.signupData).success(function(data){
            console.log(data);

          // clear $scope.signupData
          $scope.signupData = {};

          if(data === 'exists'){
            $scope.signupData = {};
            $scope.alert = "Username already exists.  Please sign up with another!";
          } else {
              // set alert to display on login view
              AlertBlock.setSignupAlert("Please log in to your new account now!");
              // toggle login view
              AuthenticationBlock.loginSignupToggle();
          }

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
      $scope.alert = '';

      // check for signup result
      $scope.$watch(function () { return AlertBlock.getAlert(); }, function (newValue, oldValue) {
        if (newValue !== oldValue) {
          $scope.alert = AlertBlock.getAlert().signupResult;
          console.log($scope.alert);
        }
      }, true);


      // Login - add new user
      $scope.logIn = function(){
        $http.post('/api/login', $scope.loginData).success(function(data){
            console.log('inside user controller now');
            console.log(data);

          if(data === 'password failed'){
            $scope.loginData.password = '';
            $scope.alert = "Login failed - Incorrect password.  Please try again!";
          } else if(data === 'username failed'){
            $scope.loginData = {};
            $scope.alert = "Login failed - Incorrect username.  Please try again!";
          } else {
              // set loggedin
              AuthenticationBlock.setLoggedIn($scope.loginData);

              // clear $scope.loginData
              $scope.loginData = {};
          }

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
