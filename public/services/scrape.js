angular.module('ThisApp')
  .factory('Scrape', ['$resource', function($resource) {
    return $resource('/all_scrapes');
  }]);
