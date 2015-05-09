'use strict';

angular.module('etc').controller('MenuController', ['$scope','$state',
	function($scope, $state) {

        $scope.goTo = function(name){
            $state.go(name)
        }
	}
]);