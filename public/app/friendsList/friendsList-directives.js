angular.module('ThisApp')
  .directive('addChatroomsHere', function() {
    // return {
    //     restrict: "E",
    //     controller: "FriendsListCtrl",
    //     template: "chatroom.html"
    // };
    return {
        restrict: 'AC',
        link: function($scope, $elem) {
            var target = $elem.attr('target');

            $elem.on('click', function(e) {
                target = $elem.attr('target');
                $elem.attr('target', '_blank');
            });

            $elem.on('blur', function() {
                $elem.attr('target', target);
            });
        }
    };
  });
