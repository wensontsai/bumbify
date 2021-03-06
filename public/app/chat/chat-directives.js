routerApp
  .directive('tab', function() {
    return {
      restrict: 'E',
      transclude: true,
      template: '<h2>Hello world!</h2> <div role="tabpanel" ng-transclude></div>',
      scope: { },
      link: function(scope, elem, attr) {}
    };
  });

routerApp
  .directive('tabset', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: { },
      bindToController: true,
      controller: 'ChatCtrl',
      template: '<ul class="nav nav-tabs">' +
                      '<li ng-repeat="room in chatRooms">' +
                          '<a ui-sref="chatSpace.currentRoom">{{room.chatPartnerName}}</a>' +
                      '</li>' +
                '</ul>'+
                '<div ui-view="chatSpace">'+
                  '<div ui-view="currentRoom"></div>'+
                '</div>'

    };
  });


