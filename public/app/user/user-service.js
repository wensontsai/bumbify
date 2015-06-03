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
  .factory('AuthenticationBlock', function(){
    var auth = {};

    return {
        checkLoggedIn: function(key){
            console.log("logged in? : " +auth);
            return auth;
        },
        setLoggedIn: function(){
            auth.loggedIn = true;
        },
        unsetLoggedIn: function(){
            auth.loggedIn = false;
        }

    };
  })

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
