'use strict';

//Setting up route
angular.module('etc').config(['$stateProvider',
	function($stateProvider) {
		// Etc state routing
		$stateProvider.
		state('menu', {
			url: '/menu',
			templateUrl: 'modules/etc/views/menu.client.view.html'
		}).
		state('watch-game', {
			url: '/',
			templateUrl: 'modules/etc/views/watch-game.client.view.html'
		}).
		state('wigs', {
			url: '/wigs',
			templateUrl: 'modules/etc/views/wigs.client.view.html'
		}).
		state('etc', {
			url: '/etc',
			templateUrl: 'modules/etc/views/etc.client.view.html'
		});
	}
]);