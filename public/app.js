angular.module('ThisApp', ['ngCookies', 'ngResource', 'ngMessages', 'ui.router', 'wu.masonry'])

  .config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/state1");
  //
  // Now set up the states
  $stateProvider
    .state('state1', {
      url: "/",
      templateUrl: "index.html"
    })
    .state('state1.gifs', {
      url: "/gifs",
      templateUrl: "views/gifs.html",
      controller: ScopeCtrl
    })



});



