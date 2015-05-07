'use strict';

angular.module('mean-tutorials')
    .controller('GapiCtrlController', ['$scope','$http',
	function($scope, $http) {
		// Gapi ctrl controller logic
		// ...
        $scope.googleAccess = function(){
            $http.get('/gapi').success(function(data, status, headers, config) {
                $scope.url = data;
                    $http.get($scope.url).success(function(data){
                        console.log(data);
                    })

            }).
                error(function(data, status, headers, config) {
                    $scope.url = 'Error';
                });
        }
	}
]);
