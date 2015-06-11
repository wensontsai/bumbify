routerApp
  .controller('FavoritesCtrl',
    function($rootScope, $scope, $http, GifUrl, AuthenticationBlock, ChatSocket){

      $scope.allFavorites = {};
      $scope.allUniqueTags = [];

      $scope.favoriteObject = {};
      $scope.favoriteObject.user = AuthenticationBlock.checkLoggedIn().name;

      $scope.loadedGif = {};
      $scope.loadResponse = '';

      // function getAllUniqueTags(){
      //   for(var i=0; i<$scope.allFavorites.length){
      //     console.log($scope.allFavorites[i]);
      //     // if(!$scope..indexOf)
      //   }
      // }

      function getAllUniqueTags(){
        for (var key in $scope.allFavorites) {
          if ($scope.allFavorites.hasOwnProperty(key)) {
            if($scope.allUniqueTags.indexOf($scope.allFavorites[key].tag) < 0 ){
              console.log($scope.allFavorites[key].tag);
              $scope.allUniqueTags.push($scope.allFavorites[key].tag);
            }
          }
        }
        return $scope.allUniqueTags;
      }

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

      $scope.showAllFavorites = function(){
        $http.post('/api/getAllFavorites', $scope.favoriteObject).success(function(data){

          $scope.allFavorites = data;
          // console.log($scope.allFavorites);
          // getAllUniqueTags();
        });
      };

      $scope.setUrl = function($rootScope){

      storeUsedGif();

      $scope.loadResponse = GifUrl.setUrl($scope.loadedGif);
      ChatSocket.emit('message', $scope.nickName, $scope.message, $scope.loadedGif);
      // console.log($scope.loadResponse);

      };


      $scope.deleteFavorite = function(){
        $scope.favoriteObject = {
              url : $scope.loadedGif.url,
              user : $scope.favoriteObject.user,
          };
        $http.post('/api/deleteFavorite', $scope.favoriteObject).success(function(data){
          // console.log(data);
          // on success reload favorites view
          $scope.showAllFavorites();
        });
      };


      // $scope.showTags = function(tag){
      //     // var element = document.getElementById(id+ "_toprefs");
      //     // var arrow = element.parentNode.firstElementChild;

      //     // toggle //
      //     // hide
      //     if(element.style.display == "block") {
      //       element.style.display = "none";
      //     } else {
      //     //show
      //     // hide all elements so only the clicked one shows at a time
      //       var all_top_refs = document.getElementsByClassName('toprefs_container');
      //         for(var i=0; i< all_top_refs.length; i++){
      //              all_top_refs[i].style.display = "none";
      //         }
      //       element.style.display = "block";
      //     }

      // };

});
