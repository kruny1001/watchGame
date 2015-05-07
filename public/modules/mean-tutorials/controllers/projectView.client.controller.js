'use strict';

angular.module('mean-tutorials').controller('ProjectViewController', ['$scope', '$stateParams', '$state', '$timeout', 'Articles',
	function($scope, $stateParams, $state, $timeout, Articles) {
		$scope.title= 'Project3';
        $scope.body= '';
        $scope.menus = [
            {icon:'', name:'Dashboard', state:'projectview.dashboard'},
            {icon:'', name:'Project', state:'projectview.projects'},
            {icon:'', name:'Article', state:'projectview.articles'},
            {icon:'', name:'Comments', state:'projectview.dashboard'},
            {icon:'', name:'Survey', state:'projectview.dashboard'},
        ];

        $scope.goChildView = function(stateName){
            $state.go(stateName);
        }

        $scope.find = function() {
            $scope.articles = Articles.query();
        };

        $scope.findOne = function() {
            $scope.article = Articles.get({
                articleId: $stateParams.articleId
            });
        };

        $scope.shrinkleftPane = function(){
            //TweenLite.to('.leftPane', 1, {x:'-75px'});
            //TweenLite.to('.rightPane', 1, {x:'-75px'});
            //TweenLite.to('.svgBtnLeftPane', 1, {x:'75px'});

        }
	}
]);
