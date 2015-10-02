// var routerApp = angular.module('ThisApp', ['ui.router', 'wu.masonry']);

var routerApp = angular.module('ThisApp', ['ui.router', 'btford.socket-io', 'luegg.directives']);


routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'app/history/history.html',
            controller: 'HistoryCtrl'
        })

        // CHAT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('chat', {
            url: '/chat',
            views: {
                '': {
                    templateUrl: 'app/chat/chatpage_main.html'
                },
                'columnOne@chat': {
                    templateUrl: 'app/chat/chatroom.html',
                    controller: 'ChatCtrl'
                },
                'columnTwo@chat': {
                    templateUrl: 'app/chat/gif_nav_module.html',
                    params: {
                        autoActivateChild: 'chat.gif_add_search'
                    },
                    controller: 'ChatCtrl'
                }
            }
        })

         // CHAT PAGE GIF SEARCH  =================================
        .state('chat.gif_add_search', {
            parent: 'chat',
            url: '/gif_add_search',
            templateUrl: 'app/gif_search/gif_add.html',
            controller: 'ScrapesCtrl'
        })

         // CHAT PAGE RECENTS =================================
        .state('chat.recent', {
            parent: 'chat',
            url: '/recent_searches',
            templateUrl: 'app/recent_gifs/recent.html',
            controller: 'RecentsCtrl'
        })

        // CHAT PAGE FAVORITES =================================
        .state('chat.favorites', {
            parent: 'chat',
            url: '/favorites',
            templateUrl: 'app/favorites/favorites.html',
            controller: 'FavoritesCtrl'
        })

        // CHAT PAGE FRIENDS LIST =================================
        .state('chat.friendsList', {
            parent: 'chat',
            url: '/friendsList',
            templateUrl: 'app/friendsList/friendsList.html',
            controller: 'FriendsListCtrl'
        })
        // CHAT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('room', {
            url: '/room/:id',
            views: {
                '': {
                    templateUrl: 'app/chat/chatpage_main.html'
                },
                'columnOne@chat': {
                    templateUrl: 'app/chat/chatroom.html',
                    controller: 'ChatCtrl'
                },
                'columnTwo@chat': {
                    templateUrl: 'app/chat/gif_nav_module.html',
                    params: {
                        autoActivateChild: 'chat.gif_add_search'
                    },
                    controller: 'ChatCtrl'
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
            templateUrl: 'app/user/signup.html',
            controller: 'SignupCtrl'
        })

         //  LOGIN PAGE  =================================
        .state('login', {
            url: '/login',
            templateUrl: 'app/user/login.html',
            controller: 'LoginCtrl'
        });

});





