'use strict';

angular.module('core').factory('Getplans', ['$resource',
	function($resource) {
		// Getplans service logic
		// ...

		// Public API
        return $resource('/articles', {
            userID: '@_id'
        }, {
            update: {
                method: 'GET'
            }
        });
	}
]);
