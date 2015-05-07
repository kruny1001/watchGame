'use strict';

angular.module('mean-tutorials').controller('ProjectviewProjectsController', ['$scope', '$resource', 'Articles',
	function($scope, $resource, Articles) {
        var Projects = $resource('/articles/projects/:docType',
            {docType: '@docType'},
            {
                getProjects: {
                    method: 'GET', isArray: true
                }
            });

        $scope.findProjects = function(type) {
            $scope.resultProjects = Projects.getProjects({docType:type});
            //console.log($scope.result);
        }
        $scope.selectProject = function(index) {
            //TweenLite.set('.rightPane', {'margin-left':'72px', position: 'inherit'});
            $scope.selectedProject = $scope.resultProjects[index];
        }
	}
]);
