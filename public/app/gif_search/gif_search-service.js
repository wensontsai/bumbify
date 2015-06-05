angular.module('ThisApp')
  .factory('ScrapeAll', ['$resource', function($resource) {
    return $resource('/all_scrapes');
  }])

  .factory('GifUrl', function () {
    var data = {};

    return {
      getUrl: function(){
        // console.log("inside getUrl now");
        return data;
      },
      resetUrl: function(){
        data = {};
      },
      setUrl: function(url){
        data.url = url;
        // data.loadResponse = "GIF is successfully loaded!";
        // console.log(data.url);
        this.getUrl();
        return "GIF is successfully loaded!";
      }
    };
  });


