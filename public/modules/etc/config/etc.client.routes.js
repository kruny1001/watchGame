'use strict';

//Setting up route
angular.module('etc').config(['$stateProvider',
	function($stateProvider) {
		// Etc state routing
		$stateProvider.
			state('menu', {
				url: '/',
				templateUrl: 'modules/etc/views/menu.client.view.html',
				controller:'MenuController'
			}).
			state('watch-game', {
				url: '/watch-game',
				templateUrl: 'modules/etc/views/watch-game.client.view.html',
				controller:'WatchGameController'
			})
			.state('watch-game2', {
				url: '/watch-game2',
				templateUrl: 'modules/etc/views/watch-game2.client.view.html',
				controller:'WatchGame2Controller'
			}).
			state('watch-game2-re', {
				url: '/watch-game2/:problemId',
				templateUrl: 'modules/etc/views/watch-game2.client.view.html',
				controller:'WatchGame2Controller'

			}).
			state('watch-game-re', {
				url: '/:problemId',
				templateUrl: 'modules/etc/views/watch-game.client.view.html',
				controller:'WatchGameController'
			});

	}
]);