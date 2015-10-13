routerApp
  .controller('ThisAppCtrl',
    function($rootScope, $scope, $http, $state, $location, GifUrl, AlertBlock, AuthenticationBlock){

      // variables //
      $scope.loginData = {};
      $scope.signupData = {};
      $scope.alert = {};
      $scope.custom = false;

      $scope.init = function(){
        // check for session.
        // if session, set logged in on service.
        $http.get('/api/getSession').success(
            function(data){
              if(data){
                AuthenticationBlock.setLoggedIn();
              }
        });

        // else redirect to login

      };
      $scope.init();

      // check loggedIn or not so views can hide/show
      $scope.$watch(function () { return AuthenticationBlock.checkLoggedIn(); }, function (newValue, oldValue) {
        if (newValue !== oldValue) {
          $scope.loggedIn = AuthenticationBlock.checkLoggedIn().loggedIn;
        }
      }, true);




      //login & signup //
      $scope.login_or_signup = function(){
        $scope.custom = AuthenticationBlock.checkLoggedIn().loginSignupToggle;
        return $scope.custom;
      };

    });
  // .controller('MyModalCtrl', function (myModal) {
  //   this.closeMe = myModal.deactivate;
  //   })

  // .controller('MyCtrl', function (myModal) {
  //   this.showModal = myModal.activate;
  //   });
