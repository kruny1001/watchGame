'use strict';

angular.module('mean-tutorials').directive('mjHomeAni', [
	function() {
		return {
			templateUrl: 'modules/mean-tutorials/directives/templates/mjHomeAni.tpl.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Animation //
				var title = $('.ani-title');
				var youtubePlayBtn = $('#youtubePlayButton');
				var techIcons = $('.ani-techs');
				var meanTotem = $('#meanTotem');
				var meanTotemDesc = $('#meanTotem-desc');

				//scope.clickPlayBtn = function() {
				//	TweenMax.fromTo(youtubePlayBtn, 1.5, {scale:2}, {scale:0.8, opacity:0});
				//	TweenMax.to(title, 2.5, {x:-1200});
				//	TweenMax.to('.ani-techs', 0.1, {opacity:1});
				//	TweenMax.to([meanTotem,meanTotemDesc], 1.3, {display:'block', height: '100%', opacity:1});
				//}
				//
				//scope.resetPlayBtn = function() {
				//	TweenMax.to(youtubePlayBtn, 0.5, {scale:1, opacity:1});
				//	TweenMax.to(title, 0.5, {x:0});
				//	TweenMax.to([meanTotem, meanTotemDesc], 1.3, {display:'none', height: '0%', opacity:0});
				//}
				//
         //       scope.aniTrigger = function(){
         //           var tl = new TimelineMax();
         //           var t1 = TweenMax.to($('#meanTotem'), 1, {yPercent:-45, force3D:true});
         //           var t2 = TweenMax.to($('#meanTotem'), 1, {yPercent:0, force3D:true});
         //           tl.add(t1).add(t2);
         //       }
				//// End Animation //
			}
		};
	}
]);
