angular.module('MyApp')
  .factory('Scrape', ['$resource', function($resource) {
    return $resource('/all_scrapes');
  }]);
