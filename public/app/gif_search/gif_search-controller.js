routerApp
  .controller('ScrapesCtrl',
    function($rootScope, $scope, $http, GifUrl, AuthenticationBlock){
      // search models
      $scope.gifs = [];
      $scope.formInfo = {};
      $scope.gifSearch = {};

      // gif select models
      $scope.loadedGif = {};
      $scope.loadResponse = '';

      $scope.loggedIn = AuthenticationBlock.checkLoggedIn().loggedIn;
        if($scope.loggedIn === true){
        $scope.nickName = AuthenticationBlock.checkLoggedIn().name;
      }

      // gif scrape functions
      $scope.searchGifs = function(){
        $http.post('/api/searchGifs', $scope.gifSearch).success(function(data){
            console.log(data);

            // clear $scope.gifSearch
            $scope.gifSearch = {};

            if(data == 'fail'){
              $scope.searchResult = 'That search yielded no results!';
            } else {
              $scope.searchResult = '';

            }

            // then get scrapes again
            $http.get('/api/scrapes').success(function(data){
              $scope.gifs = data;
              $scope.tag = data[0].tag;
              console.log($scope.tag);
            });

        });
      };

      $scope.showScrapes = function(){
        $http.get('/api/scrapes').success(function(data){
          $scope.gifs = data;
          $scope.tag = data[0].tag;
          console.log($scope.gifs);
          console.log($scope.tag);
        });

          var test_answer = AuthenticationBlock.checkLoggedIn();
          console.log(test_answer);

      };

      $scope.setUrl = function($rootScope){
        $scope.loadResponse = GifUrl.setUrl($scope.loadedGif.url);
        console.log($scope.loadResponse);
      };


    });
