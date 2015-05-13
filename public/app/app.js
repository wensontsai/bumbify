// angular.module('ThisApp', ['ngCookies', 'ngResource', 'ngMessages', 'ui.router', 'wu.masonry'])

//   .config(function($stateProvider, $urlRouterProvider) {
//   //
//   // For any unmatched url, redirect to /state1
//   $urlRouterProvider.otherwise("/state1");
//   //
//   // Now set up the states
//   $stateProvider
//     .state('state1', {
//       url: "/",
//       templateUrl: "index.html"
//     })
//     .state('state1.gifs', {
//       url: "/gifs",
//       templateUrl: "views/gifs.html",
//       controller: ScopeCtrl
//     })



// });

// var routerApp = angular.module('ThisApp', ['ui.router', 'wu.masonry']);
var routerApp = angular.module('ThisApp', ['ui.router']);
var chatApp = angular.module('ChatApp', ['btford.socket-io', 'ui.router'])
    .value('nickName', 'anonymous')
    .value('messageFormatter', function(date, nick, message){
        return date.toLocaleTimeString() + ' - ' +nick+ ' - ' +message+ '\n';
    });


routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'app/main/partial-main.html'
        })

        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: 'app/main/partial-main-list.html',
            controller: function($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })

        // nested list with just some random string data
        .state('home.gif_search', {
            url: '/gif_search',
            templateUrl: 'app/gif_search/gif_search.html',
            controller: 'ScrapesCtrl'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('chat', {
            url: '/chat',
            views: {
                '': { templateUrl: 'app/about/partial-about.html' },
                // 'columnOne@chat': { template: 'Look I am a column!' },
                'columnOne@chat': {
                    templateUrl: 'app/chat/chatroom.html',
                    controller: 'ChatCtrl'
                },
                'columnTwo@chat': {
                    templateUrl: 'app/gif_search/gif_search.html',
                    controller: 'ScrapesCtrl'
                }
            }
        })

         //  SIGNUP PAGE  =================================
        .state('gif_search', {
            url: '/gif_search',
            templateUrl: 'app/gif_search/gif_search.html',
            controller: 'ScrapesCtrl'
        })

         //  SIGNUP PAGE  =================================
        .state('signup', {
            url: '/signup',
            templateUrl: 'app/user/partial-signup.html'
        });

});



