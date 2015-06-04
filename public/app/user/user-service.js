angular.module('ThisApp')
  .factory('AlertBlock', function () {
    var alerts = {};

    return {
      getAlert: function(){
        return alerts;
      },
      setSignupAlert: function(message){
        alerts.signupResult = message;

      },
      setLoginAlert: function(message){
        alerts.loginResult = message;
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
                $state.go('chat');
                return auth;
            },
            unsetLoggedIn: function(){
                auth.loggedIn = false;
            },
            loginSignupToggle: function(){
              auth.loginSignupToggle = auth.loginSignupToggle === false ? true: false;
            }

        };
     }
  ]);

// appServices.factory('AuthenticationService', function() {
//     var auth = {
//         isLogged: false
//     }

//     return auth;
// });
// appServices.factory('UserService', function($http) {
//     return {
//         logIn: function(username, password) {
//             return $http.post(options.api.base_url + '/login', {username: username, password: password});
//         },

//         logOut: function() {

//         }
//     }
// });
