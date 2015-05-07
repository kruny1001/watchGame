'use strict';

angular.module('mean-tutorials').controller('Project2Controller', ['$scope',
	function($scope,$rootScope) {
        // Disqus ID
		$scope.id='meanT-project2';

        // Listen event
        $scope.$on('handleEmit', function(event, args) {
            $scope.$broadcast('handleBroadcast', args);
        });

        $scope.password = '';
        $scope.grade = function(){
            var size = $scope.password.length;
            if (size > 8) {
                $scope.strength = 'strong';
            } else if (size > 3) {
                $scope.strength = 'medium';
            } else {
                $scope.strength = 'weak';
            }
        }
	}
]);
