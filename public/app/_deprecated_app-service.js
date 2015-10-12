angular.module('ThisApp')
  .factory('myModal', function (btfModal) {
    return btfModal({
      controller: 'MyModalCtrl',
      controllerAs: 'modal',
      templateUrl: 'my-modal.html'
    });
});
