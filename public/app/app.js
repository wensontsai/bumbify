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
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'app/about/partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': {
                    templateUrl: 'app/about/table-data.html',
                    controller: 'scotchController'
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



