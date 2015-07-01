srouterApp


appControllers.controller('AdminUserCtrl', ['$scope', '$location', '$window', 'UserService', 'AuthenticationService',
    function AdminUserCtrl($scope, $location, $window, UserService, AuthenticationService) {

        // Signup
        $scope.signUp = function(username, password) {
            if (username !== undefined && password !== undefined) {

                UserService.logIn(username, password).success(function(data) {
                    AuthenticationService.isLogged = true;
                    $window.sessionStorage.token = data.token;
                    $location.path("/admin");
                }).error(function(status, data) {
                    // console.log(status);
                    // console.log(data);
                });
            }
        }


        //Admin User Controller (login, logout)
        $scope.logIn = function(username, password) {
            if (username !== undefined && password !== undefined) {

                UserService.logIn(username, password).success(function(data) {
                    AuthenticationService.isLogged = true;
                    $window.sessionStorage.token = data.token;
                    $location.path("/admin");
                }).error(function(status, data) {
                    // console.log(status);
                    // console.log(data);
                });
            }
        }

        $scope.logout = function() {
            if (AuthenticationService.isLogged) {
                AuthenticationService.isLogged = false;
                delete $window.sessionStorage.token;
                $location.path("/");
            }
        }
    }
]);
