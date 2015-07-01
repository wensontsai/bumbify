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
      setUrl: function(obj){
        data.url = obj.url;
        data.tag = obj.tag;
        data.user = obj.user;
        data.userId = obj.userId;
        data.timestamp = obj.timestamp;
        // data.loadResponse = "GIF is successfully loaded!";
        // console.log(data.url);

        this.getUrl();
        return "GIF is successfully loaded!";
      }
    };
  });



