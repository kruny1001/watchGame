'use strict';

//Setting up route
angular.module('mean-tutorials').config(['$stateProvider',
    function($stateProvider) {
        // Mean tutorials state routing
        $stateProvider.
            //state('projectview', {
            //    abstract: true,
            //    url: '/projects',
            //    templateUrl: 'modules/mean-tutorials/views/projectView.client.view.html'
            //}).
            //    state('projectview.dashboard', {
            //        url: '/dashboard',
            //        templateUrl: 'modules/mean-tutorials/template/projectView.dashboard.tmp.html'
            //    }).
            //    state('projectview.projects', {
            //        url: '/projectlist',
            //        templateUrl: 'modules/mean-tutorials/template/projectView.projects.tmp.html'
            //    }).
            //    state('projectview.articles', {
            //        url: '/articleslist',
            //        templateUrl: 'modules/mean-tutorials/template/projectView.articles.tmp.html'
            //    }).

            state('versioning', {
                url: '/versioning',
                templateUrl: 'modules/mean-tutorials/views/versioning.client.view.html'
            }).
            //state('project2', {
            //    url: '/project2',
            //    templateUrl: 'modules/mean-tutorials/views/project2.client.view.html'
            //}).
            //state('project1', {
            //    url: '/project1',
            //    templateUrl: 'modules/mean-tutorials/views/project1.client.view.html'
            //}).
            state('mean-home', {
			        url: '/home',
			        templateUrl: 'modules/mean-tutorials/views/mean-home.client.view.html'
			        //views:{
				       // "":{templateUrl: 'modules/mean-tutorials/views/mean-home.client.view.html'},
				       // "tt":{template:"<h1>Hello World</h1>"}
			        //}
            });
    }
]);
