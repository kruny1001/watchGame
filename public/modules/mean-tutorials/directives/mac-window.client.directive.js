'use strict';

angular.module('mean-tutorials').directive('macWindow', [
	function() {
		return {
			scope: {
				projectInfos: '=info'
			},
            //template: macWindowTpl,
			templateUrl: 'modules/mean-tutorials/directives/templates/mac-window.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				scope.description = 'hello';
				scope.minimizeMacWindow = function(event){
					console.log('Click minimize');
					var pageElement = event.target.parentElement.parentElement.getElementsByClassName('page');
					//TweenMax.to(pageElement, 1.2, {display:'none', height:'0%'});
				}
				scope.maximizeMacWindow = function(event){
					console.log('Click maximize');
					var pageElement = event.target.parentElement.parentElement.getElementsByClassName('page');
					//TweenMax.to(pageElement, 1.2, {display:'block',height:'100%'});
				}
			}
		};
	}
]);
