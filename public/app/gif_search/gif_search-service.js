angular.module('ThisApp')
  .factory('ScrapeAll', ['$resource', function($resource) {
    return $resource('/all_scrapes');
  }])

  .factory('GetUrl', function () {

    // var data = {
    //     FirstName: ''
    // };

    // return {
    //     getFirstName: function () {
    //         return data.FirstName;
    //     },
    //     setFirstName: function (firstName) {
    //         data.FirstName = firstName;
    //     }
    // };
    var url = "https://media1.giphy.com/media/fRezK8aTNYz6M/200.gif";

    return {
      getUrl: function(){
        return url;
      }


    }
});
