// var routerApp = angular.module('ThisApp', ['ui.router', 'wu.masonry']);

var routerApp = angular.module('ThisApp', ['ui.router', 'btford.socket-io', 'luegg.directives'])
    .value('nickName', 'pizzaMOMMAa')
    .value('messageArrayer', function(date, nick, message){
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

        // CHAT PAGE AND MULTIPLE NAMED VIEWS =================================
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
                    templateUrl: 'app/gif_search/gif_add.html',
                    controller: 'ScrapesCtrl'
                }
            }
        })

         //  GIF SEARCH PAGE  =================================
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



