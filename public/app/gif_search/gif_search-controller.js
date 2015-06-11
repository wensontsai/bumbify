routerApp
  .controller('ScrapesCtrl',
    function($rootScope, $scope, $http, GifUrl, AuthenticationBlock, ChatSocket){
      // search models
      $scope.gifs = [];
      $scope.formInfo = {};
      $scope.gifSearch = {};
      $scope.timestamp = '';
      $scope.message = {};

      // gif select models
      $scope.loadedGif = {};
      $scope.loadResponse = '';

      $scope.loggedIn = AuthenticationBlock.checkLoggedIn().loggedIn;
        if($scope.loggedIn === true){
          $scope.nickName = AuthenticationBlock.checkLoggedIn().name;
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

      function storeUsedGif(){
        getDateTime();

        gifObject = {
          url : $scope.loadedGif.url,
          user : $scope.nickName,
          tag : $scope.tag,
          timestamp : $scope.timestamp
        };

        // console.log(gifObject);
        // store as a usedGif
        $http.post('/api/storeUsedGif', gifObject).success(function(data){
          // console.log(data);
        });
      };


     /////////////// service !!!  ////////////



      // gif scrape functions
      $scope.searchGifs = function(){
        $scope.gifSearch.user = $scope.nickName;
          console.log($scope.gifSearch);

        $http.post('/api/searchGifs', $scope.gifSearch).success(function(data){
            // console.log(data);

            // clear $scope.gifSearch
            $scope.gifSearch = {};

            if(data == 'fail'){
              $scope.searchResult = 'That search yielded no results!';
              $scope.tag = '';
            } else {
              $scope.searchResult = '';

            }

            // then get scrapes again
            $http.get('/api/scrapes').success(function(data){
              $scope.gifs = data;
              $scope.tag = data[0].tag;
              // console.log($scope.tag);
            });

        });
      };

      $scope.showScrapes = function(){
        $http.get('/api/scrapes').success(function(data){
          $scope.gifs = data;
          $scope.tag = data[0].tag;
          // console.log($scope.gifs);
          // console.log($scope.tag);
        });
      };

      $scope.setUrl = function($rootScope){

        storeUsedGif();

        $scope.loadResponse = GifUrl.setUrl($scope.loadedGif);

        $scope.message.url = $scope.loadedGif.url;
        console.log($scope.message.url);

        ChatSocket.emit('message', $scope.nickName, $scope.message);

        // console.log($scope.loadResponse);

      };


      $scope.addFavorite = function(){
        getDateTime();

        favoriteObject = {
          url : $scope.loadedGif.url,
          user : $scope.nickName,
          tag : $scope.tag,
          timestamp : $scope.timestamp
        };

        // $scope.favoriteResponse = Favorite.setFavorite(favoriteObject);
        // console.log($scope.favoriteResponse);

        $http.post('/api/addFavorite', favoriteObject).success(function(data){
            // console.log(data);
        });
      };


    });
