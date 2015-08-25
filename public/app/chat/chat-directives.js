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
      templateUrl: 'app/chat/chatwindow.html',
      bindToController: true,
      controller: 'ChatCtrl'
    };
  });


