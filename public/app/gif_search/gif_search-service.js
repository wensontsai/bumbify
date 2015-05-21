angular.module('ThisApp')
  .factory('ScrapeAll', ['$resource', function($resource) {
    return $resource('/all_scrapes');
  }])

  .factory('GifUrl', function () {
    var data = {};

    // data.url = "https://media1.giphy.com/media/fRezK8aTNYz6M/200.gif";

    return {
      getUrl: function(){
        return data.url;
      },
      setUrl: function(url){
        data.url = url;
        return data.url;
      }

    };
});
