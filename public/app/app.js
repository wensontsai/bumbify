// var routerApp = angular.module('ThisApp', ['ui.router', 'wu.masonry']);

var routerApp = angular.module('ThisApp', ['ui.router', 'btford.socket-io', 'luegg.directives']);
    // .value('nickName', 'pizzaMOMMAa')
    // .value('messageArrayer', function(date, nick, message){
    //     return date.toLocaleTimeString() + ' - ' +nick+ ' - ' +message+ '\n';
    // });


routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'app/history/history.html',
            controller: 'HistoryCtrl'
        })

        // nested list with custom controller
        // .state('home.list', {
        //     url: '/list',
        //     templateUrl: 'app/main/partial-main-list.html',
        //     controller: function($scope) {
        //         $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
        //     }
        // })


        // .state('home.gif_search', {
        //     url: '/gif_search',
        //     templateUrl: 'app/gif_search/gif_search.html',
        //     controller: 'ScrapesCtrl'
        // })

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
                // 'columnTwo@chat': {
                //     templateUrl: 'app/gif_search/gif_add.html',
                //     controller: 'ScrapesCtrl'
                // }
                'columnTwo@chat': {
                    templateUrl: 'app/chat/gif_nav_module.html',
                    params: {
                        autoActivateChild: 'chat.gif_add_search'
                    },
                    controller: 'ChatCtrl'
                }
                // 'columnTwo@chat': {
                //     abstract: true,
                //     views: {
                //         '' : {
                //             templateUrl: 'app/chat/gif_nav_module.html'
                //         },
                //         'gif_add_search' : {
                //             parent: 'chat',
                //             url: '/gif_add_search',
                //             templateUrl: 'app/gif_search/gif_add.html',
                //             controller: 'ScrapesCtrl'
                //         },
                //         'recent' : {
                //             parent: 'chat',
                //             url: '/recent_searches',
                //             templateUrl: 'app/gif_search/gif_add.html',
                //             controller: 'ScrapesCtrl'
                //         },
                //         'favorites' : {
                //             parent: 'chat',
                //             url: '/favorite_searches',
                //             templateUrl: 'app/gif_search/gif_add.html',
                //             controller: 'ScrapesCtrl'
                //         }
                //     }
                // }
            }
        })

         // CHAT PAGE GIF SEARCH FAVORITES =================================
        .state('chat.gif_add_search', {
            parent: 'chat',
            url: '/gif_add_search',
            templateUrl: 'app/gif_search/gif_add.html',
            controller: 'ScrapesCtrl'
        })

         // CHAT PAGE GIF SEARCH RECENTS =================================
        .state('chat.recent', {
            parent: 'chat',
            url: '/recent_searches',
            templateUrl: 'app/gif_search/gif_add.html',
            controller: 'ScrapesCtrl'
        })

        // CHAT PAGE GIF SEARCH FAVORITES =================================
        .state('chat.favorites', {
            parent: 'chat',
            url: '/favorite_searches',
            templateUrl: 'app/gif_search/gif_add.html',
            controller: 'ScrapesCtrl'
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
            controller: 'UserCtrl'
        })

         //  LOGIN PAGE  =================================
        .state('login', {
            url: '/login',
            templateUrl: 'app/user/login.html',
            controller: 'UserCtrl'
        });

});





