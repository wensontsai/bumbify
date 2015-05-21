// angular.module('ThisApp', [])
routerApp
  .controller('ScrapesCtrl',
    function($scope, $http, GifUrl){
      $scope.gifs = [];
      $scope.formInfo = {};
      $scope.gifSearch = {};

      // //user AUTH validations
      // $scope.nameRequired = '';
      // $scope.emailRequired = '';
      // $scope.passwordRequired = '';

      // // user AUTH functions
      // $scope.saveData = function(){
      //   if (!$scope.formInfo.name) {
      //     $scope.nameRequired = '* Name Required *';
      //   }
      //   else if (!$scope.formInfo.email) {
      //     $scope.emailRequired = '* Email Required *';
      //   }
      //   else if (!$scope.formInfo.password) {
      //     $scope.passwordRequired = '* Password Required *';
      //   }
      //   else {
      //     $http.post('/api/createUser', $scope.formInfo)
      //       .success(function(data){
      //         if(data){
      //           console.log(data);
      //         }
      //     });
      //   }
      // };


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
            console.log(tag);

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
      };

      $scope.setUrl = function(){
        var gifUrl = GifUrl.setUrl();
        console.log(gifUrl);
      };


    });
