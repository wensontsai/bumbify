angular.module('ThisApp')
  .factory('AlertBlock', function () {
    var alert = {};

    return {
      getAlert: function(){
        return alert;
      },
      setSignupAlert: function(message){
        alert.signupResult = message;
        console.log("signup alert set up success");
        return alert;

      },
      setLoginAlert: function(message){
        alert.loginResult = message;
        return alert;
      }

    };
  })
  .factory('AuthenticationBlock', ['$rootScope', '$state', function($rootscope, $state){
        var auth = {
          loggedIn : false,
          loginSignupToggle : false
        };

        return {
            checkLoggedIn: function(key){
                console.log("logged in? : " +auth);
                return auth;
            },
            setLoggedIn: function(data){
                auth.loggedIn = true;
                console.log("inside set logged in func");
                console.log(data);
                auth.name = data.name;
                $state.go('home');
                return auth;
            },
            unsetLoggedIn: function(){
                auth.loggedIn = false;
                $state.go('home');
            },
            loginSignupToggle: function(){
              auth.loginSignupToggle = auth.loginSignupToggle === false ? true: false;
            }

        };
     }
  ]);
