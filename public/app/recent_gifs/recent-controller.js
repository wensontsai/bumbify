routerApp
  .controller('RecentsCtrl',
    function($rootScope, $scope, $http, GifUrl, AuthenticationBlock, ChatSocket){

      $scope.recentsObject = {};
      $scope.recentsObject.user = AuthenticationBlock.checkLoggedIn().name;

      $scope.recentUsedGifs = {};

      $scope.loadedGif = {};
      $scope.loadResponse = '';

      // put all this in service!!
      function getDateTime(){
        // date time stamp formatting
        var unixDatestamp = [
             new Date().getMonth()+1,
             new Date().getDate(),
             new Date().getFullYear()
          ];
        var unixTimestamp = [
            new Date().getHours(),
            new Date().getMinutes(),
            new Date().getSeconds()
          ];
        unixDatestamp = unixDatestamp.join('-');
        unixTimestamp = unixTimestamp.join(':');

        // assembling chatLine
        $scope.timestamp = unixDatestamp +", "+ unixTimestamp;
        return $scope.timestamp;
      }


      function getTag(url){
        for (var key in $scope.allFavorites) {
          if ($scope.allFavorites[key].url === url) {
            return $scope.allFavorites[key].tag;
          }
        }
      }


      function storeUsedGif(){
          getDateTime();

          var tag = getTag($scope.loadedGif.url);

          gifObject = {
            url : $scope.loadedGif.url,
            user : $scope.nickName,
            tag : tag,
            timestamp : $scope.timestamp
          };

          // console.log(gifObject);
          // store as a usedGif
          $http.post('/api/storeUsedGif', gifObject).success(function(data){
            console.log(data);
          });
        };

    /////////////// service !!!  ////////////

     $scope.showAllRecents = function(){
        $http.post('/api/getRecents', $scope.recentsObject).success(function(data){
          console.log(data);
          $scope.recentUsedGifs = data;
        });
      };


    $scope.setUrl = function($rootScope){

      storeUsedGif();

      $scope.loadResponse = GifUrl.setUrl($scope.loadedGif);
      ChatSocket.emit('message', $scope.nickName, $scope.loadedGif);
      // console.log($scope.loadResponse);

      };
});
