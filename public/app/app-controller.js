routerApp
  .controller('ThisAppCtrl',
    function($rootScope, $scope, $http, $state, $location, GifUrl, AlertBlock, AuthenticationBlock){

      // variables //
      $scope.loginData = {};
      $scope.signupData = {};
      $scope.alert = {};
      $scope.custom = false;

     $scope.loggedIn = AuthenticationBlock.checkLoggedIn().loggedIn;
        if($scope.loggedIn === true){
        $scope.nickName = AuthenticationBlock.checkLoggedIn().name;
      }


//////      ///////////////////////////
      // for testing  only  //
      // $scope.loggedIn = true;
//////      /////////////////////////


      //login & signup //
      $scope.login_or_signup = function(){
        return $scope.custom = AuthenticationBlock.checkLoggedIn().loginSignupToggle;
      };

      // $scope.AuthResult = function(action){
      //   $scope.logInCheckResult = AuthenticationBlock.checkLoggedIn().loggedIn;
      //   // console.log($scope.logInCheckResult);
      //   return $scope.logInCheckResult;
      // };


      // Login - add new user
      $scope.logIn = function(){
        // validations go here
        console.log($scope.loginData);

        // if all good, then hit up api
        $http.post('/api/login', $scope.loginData).success(function(data){
            // console.log("controller callback:");
            // console.log(data);


          // set loggedin
          AuthenticationBlock.setLoggedIn($scope.loginData);

          // clear $scope.loginData
          $scope.loginData = {};
          // redirect to login page
          $state.go('chat');
          $location.path('/home');

        });

      };

      $scope.logOut = function(){
        AuthenticationBlock.unsetLoggedIn();
      };

      // Signup - add new user
      $scope.signUp = function(){
        // validations go here

        // if all good, then hit up api
        $http.post('/api/signup', $scope.signupData).success(function(data){
            console.log(data);

          // clear $scope.signupData
          // $scope.signupData = {};
          // redirect to login page
          $scope.alert.signupSuccess = "Your account has been successfully created.  Please log in now!";
          // console.log($scope.alert.signupSuccess);

          $scope.loginSignupToggle();
          // $location.path('/login');

        });

      };


    })



  .controller('MyModalCtrl', function (myModal) {
    this.closeMe = myModal.deactivate;
    })

  .controller('MyCtrl', function (myModal) {
    this.showModal = myModal.activate;
    });
