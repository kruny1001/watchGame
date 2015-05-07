'use strict';

angular.module('mean-tutorials').controller('HomeDialogtmpController', ['$scope','$mdDialog',
	function($scope, $mdDialog) {
		// Home dialogtmp controller logic
		// ...
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
	}
]);
