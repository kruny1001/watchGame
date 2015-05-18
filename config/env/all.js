'use strict';

module.exports = {
	app: {
		title: '인성시계놀이',
		description: '시계개임',
		keywords: '시계 조작 개임'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/angular-material/angular-material.min.css',
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/angular-aria/angular-aria.min.js',
				'public/lib/angular-material/angular-material.min.js',
				'public/lib/moment/min/moment.min.js',
				'public/lib/gsap/src/minified/TimelineMax.min.js',
				'public/lib/gsap/src/minified/TweenMax.min.js',
				'public/lib/gsap/src/minified/utils/Draggable.min.js',
				'public/lib/jquery/dist/jquery.min.js',
				'public/lib/gsap/src/uncompressed/plugins/throwProps.js',
				'public/lib/lodash/lodash.min.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};