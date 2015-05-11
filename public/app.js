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

var routerApp = angular.module('ThisApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: '/views/partial-home.html'
        })

        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: '/views/partial-home-list.html',
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
                '': { templateUrl: '/views/partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': {
                    templateUrl: '/views/table-data.html',
                    controller: 'scotchController'
                }
            }

        })

         //  SIGNUP PAGE  =================================
        .state('gif_search', {
            url: '/gif_search',
            templateUrl: '/views/gif_search.html',
            controller: 'ScrapesCtrl'
        })

         //  SIGNUP PAGE  =================================
        .state('signup', {
            url: '/signup',
            templateUrl: '/views/partial-signup.html'
        });

});

// angular.module('ThisApp', [])
routerApp
  .controller('ScrapesCtrl',
    function($scope, $http){
      $scope.gifs = [];
      $scope.formInfo = {};
      $scope.gifSearch = {};

      //user AUTH validations
      $scope.nameRequired = '';
      $scope.emailRequired = '';
      $scope.passwordRequired = '';

      // user AUTH functions
      $scope.saveData = function(){
        if (!$scope.formInfo.name) {
          $scope.nameRequired = '* Name Required *';
        }
        else if (!$scope.formInfo.email) {
          $scope.emailRequired = '* Email Required *';
        }
        else if (!$scope.formInfo.password) {
          $scope.passwordRequired = '* Password Required *';
        }
        else {
          $http.post('/api/createUser', $scope.formInfo)
            .success(function(data){
              if(data){
                console.log(data);
              }
          });
        }
      };



      // gif scrape functions
      $scope.searchGifs = function(){
        $http.post('/api/searchGifs', $scope.gifSearch).success(function(data){
            console.log(data);

            // clear $scope.gifSearch
            $scope.gifSearch = {};

            if(data == 'fail'){
              $scope.searchResult = 'That search yielded no results!';
            } else {
              $scope.searchResult = '';

            }

            // then get scrapes again
            $http.get('/api/scrapes').success(function(data){
            $scope.gifs = data;


            });
        });
      };

      $scope.showScrapes = function(){

        $http.get('/api/scrapes').success(function(data){
          $scope.gifs = data;
          console.log($scope.gifs);
        });
      };


    });


routerApp.controller('scotchController', function($scope) {

    $scope.message = 'test';

    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];

});

