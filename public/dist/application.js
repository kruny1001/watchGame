'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'clockgame';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',
		'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils',
		'ngMaterial'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('etc');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('mean-tutorials');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider', '$compileProvider','$mdThemingProvider',
	function($stateProvider, $urlRouterProvider, $compileProvider, $mdThemingProvider) {

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();

		// disable dubug data Information
		$compileProvider.debugInfoEnabled(false);

		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');
		// Home state routing
		$stateProvider.
		state('link-list', {
			url: '/link-list',
			templateUrl: 'modules/core/views/link-list.client.view.html'
		}).
		state('home', {
			url: '/dev',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]).constant("devConfig", {
		"directive": "red"
	})
	.constant('clientTokenPath', 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiIyYmFjOWMxNjE4ZjA3Mzg2YjFmNjRkYTk1Mjc1MTliOWQ3NzMyMjIxOTIxOWUzZDgzOGI4MDVlZWExYzBkY2JhfGNyZWF0ZWRfYXQ9MjAxNS0wMy0wNlQxOTo1NToxOC45MTE2MTMxMjcrMDAwMFx1MDAyNm1lcmNoYW50X2lkPWRjcHNweTJicndkanIzcW5cdTAwMjZwdWJsaWNfa2V5PTl3d3J6cWszdnIzdDRuYzgiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL2RjcHNweTJicndkanIzcW4vY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIn0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsInRocmVlRFNlY3VyZSI6eyJsb29rdXBVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi90aHJlZV9kX3NlY3VyZS9sb29rdXAifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwibWVyY2hhbnRBY2NvdW50SWQiOiJzdGNoMm5mZGZ3c3p5dHc1IiwiY3VycmVuY3lJc29Db2RlIjoiVVNEIn0sImNvaW5iYXNlRW5hYmxlZCI6dHJ1ZSwiY29pbmJhc2UiOnsiY2xpZW50SWQiOiIxMWQyNzIyOWJhNThiNTZkN2UzYzAxYTA1MjdmNGQ1YjQ0NmQ0ZjY4NDgxN2NiNjIzZDI1NWI1NzNhZGRjNTliIiwibWVyY2hhbnRBY2NvdW50IjoiY29pbmJhc2UtZGV2ZWxvcG1lbnQtbWVyY2hhbnRAZ2V0YnJhaW50cmVlLmNvbSIsInNjb3BlcyI6ImF1dGhvcml6YXRpb25zOmJyYWludHJlZSB1c2VyIiwicmVkaXJlY3RVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbS9jb2luYmFzZS9vYXV0aC9yZWRpcmVjdC1sYW5kaW5nLmh0bWwifSwibWVyY2hhbnRJZCI6ImRjcHNweTJicndkanIzcW4iLCJ2ZW5tbyI6Im9mZmxpbmUiLCJhcHBsZVBheSI6eyJzdGF0dXMiOiJtb2NrIiwiY291bnRyeUNvZGUiOiJVUyIsImN1cnJlbmN5Q29kZSI6IlVTRCIsIm1lcmNoYW50SWRlbnRpZmllciI6Im1lcmNoYW50LmNvbS5icmFpbnRyZWVwYXltZW50cy5kZXYtZGNvcGVsYW5kIiwic3VwcG9ydGVkTmV0d29ya3MiOlsidmlzYSIsIm1hc3RlcmNhcmQiLCJhbWV4Il19fQ==');


/**
 * Binds a TinyMCE widget to <textarea> elements.
 */
angular.module('ui.tinymce', [])
	.value('uiTinymceConfig', {
		plugins: "image, link, fullscreen, code, table, contextmenu, media",
		contextmenu: "link media image inserttable | cell row column deletetable",
		image_advtab: true,
		image_class_list: [
			{title: 'Responsive Size', value: 'img-responsive'}

		],
		fullscreen_new_window : true,
		fullscreen_settings : {
			theme_advanced_path_location : "top"
		}
	})
	.directive('uiTinymce', ['uiTinymceConfig', function(uiTinymceConfig) {
		uiTinymceConfig = uiTinymceConfig || {};
		var generatedIds = 0;
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ngModel) {
				var expression, options, tinyInstance;
				// generate an ID if not present
				if (!attrs.id) {
					attrs.$set('id', 'uiTinymce' + generatedIds++);
				}
				options = {
					// Update model when calling setContent (such as from the source editor popup)
					setup: function(ed) {
						ed.on('init', function(args) {
							ngModel.$render();
						});
						// Update model on button click
						ed.on('ExecCommand', function(e) {
							ed.save();
							ngModel.$setViewValue(elm.val());
							if (!scope.$$phase) {
								scope.$apply();
							}
						});
						// Update model on keypress
						ed.on('KeyUp', function(e) {
							console.log(ed.isDirty());
							ed.save();
							ngModel.$setViewValue(elm.val());
							if (!scope.$$phase) {
								scope.$apply();
							}
						});
					},
					mode: 'exact',
					elements: attrs.id
				};
				if (attrs.uiTinymce) {
					expression = scope.$eval(attrs.uiTinymce);
				} else {
					expression = {};
				}
				angular.extend(options, uiTinymceConfig, expression);
				setTimeout(function() {
					tinymce.init(options);
				});


				ngModel.$render = function() {
					if (!tinyInstance) {
						tinyInstance = tinymce.get(attrs.id);
					}
					if (tinyInstance) {
						tinyInstance.setContent(ngModel.$viewValue || '');
					}
				};
			}
		};
	}]);

'use strict';

angular.module('core').controller('CoreHeadController',coreHeadCtrl);

function coreHeadCtrl($scope, $rootScope,$window, $mdSidenav, $location, $state, $timeout, $log) {
  $scope.title = "시간여행";
  $scope.subTitle = "";
  $scope.link = "";
  $scope.classroom = false;
  $scope.goTo = function(name){
    $state.go(name);
  };
  $scope.toggleLeft = function() {
    $mdSidenav('left').toggle()
      .then(function(){
        $log.debug("toggle left is done");
      });
  };
  $scope.toggleRight = function() {
    //TweenMax.from($('#menuBtn'),2.5, {x:50, ease:Bounce.easeOut});
    $mdSidenav('right').toggle()
      .then(function(){
        $log.debug("toggle RIGHT is done");
        //TweenMax.set($("md-backdrop"),{position:'fixed'});
      });
  };
  var scrollTo = function(){
    console.log('scrollTo funciton');
  };

  $scope.change = function(){
    console.log("changed");
    if(user._id !== undefined){
      $location.path('/d2l-classes/'+user._id);
    }
  };

  $scope.loadUsers = function() {

    return $timeout(function() {
      $scope.users = D2lClassesOwnership.query();
    }, 650);
  }

  $scope.tiles = buildGridModel({
    icon : "avatar:svg-",
    title: "Svg-",
    background: ""
  });
  function buildGridModel(tileTmpl){
    var it, results = [ ];
    for (var j=0; j<6; j++) {
      it = angular.extend({},tileTmpl);
      it.icon  = it.icon + (j+1);
      //it.title = it.title + (j+1);
      it.span  = { row : "1", col : "1" };
      switch(j+1) {
        case 1:
          it.ifCondition = "Authentication.user";
          it.id="profile";
          it.background = "red";
          it.title = "Profile";
          it.span.row = it.span.col = 2;
          break;
        case 2:
          it.ifCondition = "!Authentication.user";
          it.id="signIn";
          it.title = "Sign In";
          it.background = "green";
          it.span.row = it.span.col = 1;
          break;
        case 3:
          it.ifCondition = "Authentication.user";
          it.id="signOut";
          it.title = "Sign Out";
          it.background = "darkBlue";
          break;
        case 4:
          it.ifCondition = true;
          it.id="tutorial";
          it.title = "Tutorial";
          it.background = "blue";
          it.span.col = 2;
          break;
        case 5:
          it.ifCondition = "Authentication.user";
          it.id="urClass";
          it.background = "yellow";
          it.span.col = 2;
          it.title = "Your Classes";
          break;
        case 6:
          it.ifCondition = "Authentication.user";
          it.id="allClass";
          it.background = "red";
          it.span.col = 2;
          it.title = "All Classes";
          break;


      }
      results.push(it);
    }
    return results;
  }

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    console.log('closed');
    if(toState.name === "openboard"){
      $scope.title = "Getting Started";
      $scope.subTitle = "Tutorial";
    }
    else if(toState.name === "mean-home")
    {
      $scope.title = "Open Board";
      $scope.subTitle = " ";
    }
    else if(toState.name ==="d2l-home"){
      $scope.title = "Classroom";
      $scope.subTitle = " ";
    }
    else if(toState.name ==="listD2lClasses"){
      $scope.title = "Class List";
      $scope.subTitle = "Select a Class";
    }
    else if(toState.name ==='profile'){
      $scope.title = "Profile";
      $scope.subTitle = "Edit Profile";
    }

  });

  $scope.sliderNavEvent = function(name, target){
    var targetEl = $('#'+target+' figure md-grid-tile-footer h3');
    //TweenLite.from(targetEl, 0.8, {scale:1.7});
    $mdSidenav('left').close()
      .then(function(){
        $log.debug("close LEFT is done");
        //console.log(target);
        //TweenMax.to($window, 1.2, {scrollTo:{y:target}, ease:Power4.easeOut});
      });
    console.log(name);
    if(name === 'Your Classes'){
      $state.go('listD2lClasses');
    }
    else if(name ==='Profile'){
      $state.go('profile');
    }
    else if(name ==='Tutorial'){
      $state.go('openboard');
    }
    else if(name ==='All Classes'){
      $state.go('listD2lClassesAll');
    }
    else if(name ==='Sign In'){
      console.log('sign in ');
      $location.path('/signin');
    }
    else if(name ==='Sign Out'){
      $window.location.href = 'auth/signout';
    }
  }

}
coreHeadCtrl.$inject = ["$scope", "$rootScope", "$window", "$mdSidenav", "$location", "$state", "$timeout", "$log"];

'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

        $(document).on( 'scroll', function(){
            console.log('11111');
            //if($(document).scrollTop() > 150)
            //    TweenMax.to($('header'), 1, {y:-51});
            //else
            //    TweenMax.set($('header'), {y:0});
        });
	}
]);

'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication, YT_event) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.firstJumbo = 'first-jumbo-content';
		$scope.secondJumbo = 'second-jumbo-content';
		$scope.thirdJumbo = 'third-jumbo-content';
		var texts = angular.element(document.querySelector('.core-text-anni'));
		var tl = new TimelineMax({repeat:6, repeatDelay:1, yoyo:true});
		tl.staggerTo(texts, 0.2, {className:'+=superShadow', top:'-=10px', ease:Power1.easeIn}, '0.3', 'start');
	}
]);

'use strict';

angular.module('core').controller('LinklistController', ['$scope',
	function($scope) {
		// Link list controller logic
		// ...
		$scope.modules = [
			{
				name:'Animation',
				links:[
					{linkName: 'svg1', linkHref:'/#!/svg1'},
					{linkName: 'ryuhm12', linkHref:'/#!/ryuhm12'},
					{linkName: 'j1', linkHref:'/#!/j1'},
					{linkName: 'three', linkHref:'/#!/three'}
				]
			},
			{
				name:'Banners',
				links:[
					{linkName: 'List', linkHref:'/#!/banners'},
					{linkName: 'Create', linkHref:'/#!/banners/create'},
					{linkName: 'Banner', linkHref:'/#!/banners/:bannerId'},
					{linkName: 'Edit', linkHref:'/#!/banners/:bannerId/edit'}
				]
			},
			{
				name:'Core',
				links:[
					{linkName: 'Dev', linkHref:'/#!/dev'}
				]
			},
			{
				name:'SDSUMAP',
				links:[
					{linkName: 'SDSU Map', linkHref:'/#!/sdsumap-main'}
				]
			},
			{
				name:'Spec-view',
				links:[
					{linkName: 'Jarvis', linkHref:'/#!/jarvis'},
					{linkName: 'Spec Home', linkHref:'/#!/spec-home'}
				]
			},
			{
				name:'Tj-main',
				links:[
					{linkName: 'tj-main', linkHref:'/#!/tj-main'}
				]
			},
			{
				name:'User-interface',
				links:[
					{linkName: 'MCMU', linkHref:'/#!/mcmu'},
					{linkName: 'Front -1 ', linkHref:'/#!/front-1'},
					{linkName: 'Experimental Interface', linkHref:'/#!/experimental-interface'},
					{linkName: 'Product List', linkHref:'/#!/'},
					{linkName: 'detail-product', linkHref:'/#!/detail-product/:productId'}
				]
			},
			{
				name:'Utility',
				links:[
					{linkName: 'test-page-generator', linkHref:'/#!/test-page-generator'}
				]
			}
		]
	}
]);

/**
 * Created by KevinSo on 9/3/2014.
 */

'use strict';


angular.module('core').controller('PlanController', ['$scope', '$element', 'Authentication', 'Getplans',
    function($scope, $element, Authentication, Getplans) {
        //$scope.plans = Getplans;

        $scope.find = function() {
            $scope.plans = Getplans.query();
            //$scope.plans.contents = $sce.trustAsHtml($scope.plans.contents);
        };
        $scope.find();
        //$scope.plans = [{title: 'test1', body:'content', date:""}];
    }

]);


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

'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);

'use strict';

//Setting up route
angular.module('etc').config(['$stateProvider',
	function($stateProvider) {
		// Etc state routing
		$stateProvider.
		state('watch-game2', {
			url: '/watch-game2',
			templateUrl: 'modules/etc/views/watch-game2.client.view.html'
		}).
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
'use strict';

angular.module('etc').controller('EtcController', ['$scope',
	function($scope) {
		// Etc controller logic
		// ...

		$scope.todos = [
			{
				face : '/modules/etc-products/img/icon1.png',
				what: 'Brunch this weekend?',
				who: 'Min Li Chan',
				when: '3:08PM',
				notes: " I'll be in your neighborhood doing errands"
			},
			{

				face : '/modules/etc-products/img/icon1.png',
				what: 'Brunch this weekend?',
				who: 'Min Li Chan',
				when: '3:08PM',
				notes: " I'll be in your neighborhood doing errands"
			},
			{
				face : '/modules/etc-products/img/icon1.png',
				what: 'Brunch this weekend?',
				who: 'Min Li Chan',
				when: '3:08PM',
				notes: " I'll be in your neighborhood doing errands"
			},
			{
				face : '/modules/etc-products/img/icon1.png',
				what: 'Brunch this weekend?',
				who: 'Min Li Chan',
				when: '3:08PM',
				notes: " I'll be in your neighborhood doing errands"
			},
			{
				face : '/modules/etc-products/img/icon1.png',
				what: 'Brunch this weekend?',
				who: 'Min Li Chan',
				when: '3:08PM',
				notes: " I'll be in your neighborhood doing errands"
			},
		];
	}
]);
'use strict';

angular.module('etc').controller('MenuController', ['$scope','$state',
	function($scope, $state) {

        $scope.goTo = function(name){
            $state.go(name)
        }
	}
]);
'use strict';

angular.module('etc').controller('WatchGameController', WatchGameController);

function WatchGameController($scope, $timeout, $mdDialog, $state, $mdToast, $mdBottomSheet, $interval) {

    $scope.determinateValue = 0;

    var startTimer = function(){
        $scope.determinateValue = 0;
        $interval(function() {
            $scope.determinateValue += 1;
            if ($scope.determinateValue >= 100) {
                $scope.determinateValue = 100;
            }
        }, 100, 0, true);
    };

    $scope.items = [
        { name: '문제1', icon: 'hangout' },
        { name: '문제2', icon: 'mail' },
        { name: '문제3', icon: 'message' },
        { name: '문제4', icon: 'copy2' },
        { name: '문제5', icon: 'facebook' },
        { name: '문제6', icon: 'twitter' },
        { name: '문제7', icon: 'copy2' },
        { name: '문제8', icon: 'facebook' },
        { name: '문제9', icon: 'twitter' },
        { name: '문제10', icon: 'twitter' },
    ];
    $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
    };

    $scope.showGridBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
            templateUrl: 'modules/etc/template/gridBottom.html',
            controller: 'WatchGameController',
            targetEvent: $event
        }).then(function(clickedItem) {
            $scope.alert = clickedItem.name + ' clicked!';
        });
    };

    $scope.zoom = function(op){
        var cs = $('.centre').children();
        if(op=="in") {TweenLite.to(cs, 1, {scale:'+=.1'});}
        else {TweenLite.to(cs, 1, {scale:'-=.1'});}
    }
    $scope.goTo = function(name){
        $state.go(name);
        console.log(name);
    }
    $scope.menu = function(name){
        if(name="start")
            $scope.startQuiz();
    };
    $scope.hourQ = 0;
    $scope.minQ = 0;
    $scope.rotationArm = function(target, op){
        if(target == "hh"){
            if(op == "+"){
                TweenMax.to('#hourC', 0.5, {rotation: "+=30"});
            }
            else
                TweenMax.to('#hourC', 0.5, {rotation: "-=30"});
        }
        else if(target == "mm"){
            if(op == "+")
                TweenMax.to('#minC', 0.5, {rotation: "+=6"});
            else
                TweenMax.to('#minC', 0.5, {rotation: "-=6"});
        }
        var audio = document.getElementsByTagName("audio")[0];
        audio.play();
    };

    $scope.startQuiz = function(quizCase){
        var randHour = Math.floor((Math.random() * 12) + 1);
        var randMin = Math.floor((Math.random() * 60) + 1);
        var clock = document.querySelector('#utility-clock');
        var hourElement = clock.querySelector('.hour');
        var minuteElement = clock.querySelector('.minute');
        var rotate = function(element, second) {
            console.log(second*6);
            TweenLite.to(element, 2.5, {rotation:second * 6});
        }

        if(quizCase == 'mm'){
            var time = randHour * 3600;
            console.log(randHour, randMin);
            rotate(minuteElement, time / 60);
            rotate(hourElement, time / 60 / 12);
        }
        else if(quizCase == 'hh'){
            TweenLite.to('#minC', 1, {rotation:0})
        }
        else if(quizCase == 'hm'){
            randHour = Math.floor((Math.random() * 12) + 1);
            randMin = Math.floor((Math.random() * 60) + 1);
        }

        $scope.hourQ = randHour;
        $scope.minQ = randMin;
        var quizContent = randHour+'시 '+randMin+'분에 맞춰주세요.';
        $scope.quiz = randHour+'시 '+randMin+'분';

        var confirm = $mdDialog.confirm()
            .title('퀴즈를 시작합니다.')
            .content(quizContent)
            .ok('시작하기')

        $mdDialog.show(confirm).then(function() {
            //$scope.time = randHour * 3600 + randMin * 60;
            //rotate(hourElement, $scope.time / 60 / 12);
            startTimer();
        }, function() {
            $scope.alert = 'You decided to keep your debt.';
        });
    };

    $scope.submitAnswer = function(ev){

        $scope.toastPosition = {
            bottom: true,
            top: false,
            left: false,
            right: true
        };
        $scope.getToastPosition = function() {
            return Object.keys($scope.toastPosition)
                .filter(function(pos) { return $scope.toastPosition[pos]; })
                .join(' ');
        };
        $scope.showSimpleToast = function(msg) {
            $mdToast.show(
                $mdToast.simple()
                    .content(msg)
                    .position($scope.getToastPosition())
                    .hideDelay(3000)
            );
        };
        $scope.getCurrentHour();
        var quizContent = ''
        if($scope.hh == $scope.hourQ && $scope.mm == $scope.minQ){
            quizContent = '정답입니다.';
        }
        else{
            quizContent = '틀렸습니다.'+$scope.hh +'시'+ $scope.mm + '분은 오답입니다.';
        }
        $scope.showSimpleToast(quizContent);
    }

    var clock = document.querySelector('#utility-clock');
    $timeout(function() {
        utilityClock(clock);
        autoResize(clock, 500);
        //autoResize(clock, 350);
        choose(clock, [
            //['hour', ['text', 'text-quarters', 'pill']],
            ['hour', ['text', 'text-quarters', 'pill']],
            ['hour-text', ['large', 'small']],
            ['hour-display', ['all', 'quarters', 'none']],
            ['minute', ['line', 'dot']],
            ['minute-display', ['fine', 'fine-2', 'coarse', 'major', 'none']],
            ['minute-text', ['inside', 'outside', 'none']],
            ['hand', ['normal', 'hollow']]
        ]);

        Draggable.create("#minC", {
            type: "rotation", throwProps: true
        });
        Draggable.create("#hourC", {
            type: "rotation", throwProps: true
        });
        TweenLite.to('.element.minute-line.whole', 1, {backgroundColor:"yellow"})
    }, 500);

    function utilityClock(container) {

        var dynamic = container.querySelector('.dynamic')
        var hourElement = container.querySelector('.hour')
        var minuteElement = container.querySelector('.minute')
        var secondElement = container.querySelector('.second')

        var div = function(className, innerHTML) {
            var element = document.createElement('div')
            element.className = className
            element.innerHTML = innerHTML || ''
            return element
        }

        var append = function(element) {
            return {
                to: function(parent) {
                    parent.appendChild(element)
                    return append(parent)
                }
            }
        }

        var anchor = function(element, rotation) {
            var anchor = div('anchor')
            rotate(anchor, rotation)
            append(element).to(anchor).to(dynamic)
        }

        var minute = function(n) {
            var klass = n % 5 == 0 ? 'major' : n % 1 == 0 ? 'whole' : 'part'
            var line = div('element minute-line ' + klass)
            anchor(line, n)
            if (n % 5 == 0) {
                var text = div('anchor minute-text ' + klass)
                var content = div('expand content', (n < 10 ? '0' : '') + n)
                append(content).to(text)
                rotate(text, -n)
                anchor(text, n)
            }
        }

        var hour = function(n) {
            var klass = 'hour-item hour-' + n
            var line = div('element hour-pill ' + klass)
            anchor(line, n * 5)
            var text = div('anchor hour-text ' + klass)
            var content = div('expand content', n)
            append(content).to(text)
            rotate(text, -n * 5)
            anchor(text, n * 5)
            return
        }

        var position = function(element, phase, r) {
            var theta = phase * 2 * Math.PI
            element.style.top = (-r * Math.cos(theta)).toFixed(1) + 'px'
            element.style.left = (r * Math.sin(theta)).toFixed(1) + 'px'
        }

        var rotate = function(element, second) {
            element.style.transform =
                element.style.webkitTransform = 'rotate(' + (second * 6) + 'deg)';
        }

        $scope.animate = function() {
            var now = new Date();
            var time = now.getHours() * 3600 +
                now.getMinutes() * 60 +
                now.getSeconds() * 1 +
                now.getMilliseconds() / 1000;
            //rotate(secondElement, time)
            //rotate(minuteElement, time / 60)
            //rotate(hourElement, time / 60 / 12)
            requestAnimationFrame($scope.animate);
        };

        $scope.setTime = function(){
            var now = new Date()
            $scope.time = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds() * 1 + now.getMilliseconds() / 1000;
            $scope.min = $scope.time / 60;
            $scope.hour = $scope.time / 60 / 12;
            rotate(minuteElement, $scope.time / 60)
            rotate(hourElement, $scope.time / 60 / 12)
            requestAnimationFrame($scope.animate);
        };
        for (var i = 1 / 4; i <= 60; i += 1 / 4) minute(i)
        for (var i = 1; i <= 12; i ++) hour(i)
        $scope.animate();
    }

    function autoResize(element, nativeSize) {
        console.log("update size");
        var update = function() {
            var parent = element.offsetParent
            var scale = Math.min(parent.offsetWidth, parent.offsetHeight) / nativeSize;
            element.style.transform = element.style.webkitTransform = 'scale(' + scale.toFixed(3) + ')'

        }
        update();

        window.addEventListener('resize', update)
    }

    function choose(clock, items) {
        var chooser = document.querySelector('#chooser')
        items.forEach(function(item) {
            var name = item[0]
            var styles = item[1]
            var element = document.createElement('div')
            element.addEventListener('click', click, false)
            update();
            //chooser.appendChild(element)
            function update() {
                element.innerHTML = name + '-style-<b>' + getValue() + '</b>'
            }
            function klass(c) {
                return name + '-style-' + c
            }
            function getValue() {
                for (var i = 0; i < styles.length; i ++) {
                    if (clock.classList.contains(klass(styles[i]))) return styles[i]
                }
            }
            function click(e) {
                for (var i = 0; i < styles.length; i ++) {
                    if (clock.classList.contains(klass(styles[i]))) {
                        clock.classList.remove(klass(styles[i]))
                        clock.classList.add(klass(styles[(i + 1) % styles.length]))
                        break
                    }
                }
                update()
                e.preventDefault()
            }
        })
    }

    $scope.setNow = function(){
        var now = new Date()
        var time = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds() * 1 + now.getMilliseconds() / 1000;
        var min =  time / 60;
        var hour = time / 60 / 12;
        var hourDeg = hour * 6;
        var minDeg = min * 6;
        console.log('hour: '+ hourDeg + 'min: '+minDeg)
        TweenLite.to("#hourC", 5, {rotation:hourDeg})
        TweenLite.to("#minC", 5, {rotation:minDeg})
    }

    $scope.getCurrentHour = function(){
        var hourDeg = getDegreeCrnt('hourC');
        var minDeg = getDegreeCrnt('minC');
        var hour = 0;
        var min= 0;
        console.log('time');
        if(hourDeg < 0){
            hour = (360 + hourDeg) /30;
            if(hour<1)
                hour = 12;
        }else{
            hour = hourDeg/30;
            if(hour<1)
                hour = 12;
        }

        if(minDeg < 0){
            min = (360 + minDeg)/6;
        }else{
            min = minDeg/6;
        }

        console.log("hourDeg: "+ hourDeg + " minDeg: "+minDeg);
        console.log("hour: "+ hour + " min: "+min);

        $scope.hh = parseInt(hour);
        $scope.mm = parseInt(min);
    }

    function getDegreeCrnt(id) {

        var el = document.getElementById(id);
        var st = window.getComputedStyle(el, null);
        var tr = st.getPropertyValue("-webkit-transform") ||
            st.getPropertyValue("-moz-transform") ||
            st.getPropertyValue("-ms-transform") ||
            st.getPropertyValue("-o-transform") ||
            st.getPropertyValue("transform") ||
            "FAIL";

        // With rotate(30deg)...
        // matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)
        //		console.log('Matrix: ' + tr);

        // rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix

        var values = tr.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var c = values[2];
        var d = values[3];

        var scale = Math.sqrt(a*a + b*b);

//			console.log('Scale: ' + scale);

        // arc sin, convert from radians to degrees, round
        var sin = b/scale;
        // next line works for 30deg but not 130deg (returns 50);
        // var angle = Math.round(Math.asin(sin) * (180/Math.PI));
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

        return angle;
    }
}
WatchGameController.$inject = ["$scope", "$timeout", "$mdDialog", "$state", "$mdToast", "$mdBottomSheet", "$interval"];


'use strict';

angular.module('etc').controller('WatchGame2Controller',  WatchGame2Controller);

    function WatchGame2Controller ($scope, $timeout, $mdDialog, $state, $mdToast, $mdBottomSheet, $interval) {

        $scope.determinateValue = 0;
        $interval(function() {
            $scope.determinateValue += 1;
            if ($scope.determinateValue > 100) {
                $scope.determinateValue = 0;
            }
        }, 100, 0, true);

        $scope.items = [
            { name: '문제1', icon: 'hangout' },
            { name: '문제2', icon: 'mail' },
            { name: '문제3', icon: 'message' },
            { name: '문제4', icon: 'copy2' },
            { name: '문제5', icon: 'facebook' },
            { name: '문제6', icon: 'twitter' },
            { name: '문제7', icon: 'copy2' },
            { name: '문제8', icon: 'facebook' },
            { name: '문제9', icon: 'twitter' },
            { name: '문제10', icon: 'twitter' },
        ];
        $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
        };

        $scope.showGridBottomSheet = function($event) {
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'modules/etc/template/gridBottom.html',
                controller: 'WatchGame2Controller',
                targetEvent: $event
            }).then(function(clickedItem) {
                $scope.alert = clickedItem.name + ' clicked!';
            });
        };

        $scope.zoom = function(op){
            var cs = $('.centre').children();

            if(op=="in")
            {
                TweenLite.to(cs, 1, {scale:'+=.1'});
            }
            else
            {
                TweenLite.to(cs, 1, {scale:'-=.1'});
            }
        }

        $scope.goTo = function(name){
            $state.go(name);
        }
        $scope.menu = function(name){
            if(name="start")
                $scope.startQuiz();
        };
        $scope.hourQ = 0;
        $scope.minQ = 0;
        $scope.rotationArm = function(target, op){
            if(target == "hh"){
                if(op == "+"){
                    TweenMax.to('#hourC', 0.5, {rotation: "+=30"});
                }
                else
                    TweenMax.to('#hourC', 0.5, {rotation: "-=30"});
            }
            else if(target == "mm"){
                if(op == "+")
                    TweenMax.to('#minC', 0.5, {rotation: "+=6"});
                else
                    TweenMax.to('#minC', 0.5, {rotation: "-=6"});
            }
            var audio = document.getElementsByTagName("audio")[0];
            audio.play();
        };

        $scope.startQuiz = function(ev){
            var clock = document.querySelector('#utility-clock');
            var hourElement = clock.querySelector('.hour');
            var minuteElement = clock.querySelector('.minute');

            var rotate = function(element, second) {
                element.style.transform =
                    element.style.webkitTransform = 'rotate(' + (second * 6) + 'deg)';
            }

            var randHour = Math.floor((Math.random() * 12) + 1);
            var randMin = Math.floor((Math.random() * 60) + 1);

            $scope.quizAnswer = {hour: randHour, min:randMin};

            var now = new Date()
            $scope.time = randHour * 3600 + randMin * 60;

            $scope.hourQ = $scope.time / 60;
            $scope.minQ = $scope.time / 60 / 12;
            rotate(minuteElement, $scope.time / 60)
            rotate(hourElement, $scope.time / 60 / 12)
            requestAnimationFrame($scope.animate);


            //$scope.hourQ = randHour;
            //$scope.minQ = randMin;
            var quizContent = '시간을 읽어 주세요';
            $scope.quiz = randHour+'시 '+randMin+'분';
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title('퀴즈를 시작합니다.')
                    .content(quizContent)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('시작하기')
                    .targetEvent(ev)
            );
        };

        $scope.submitAnswer = function(ev){

            $scope.toastPosition = {
                bottom: true,
                top: false,
                left: false,
                right: true
            };



            $scope.getToastPosition = function() {
                return Object.keys($scope.toastPosition)
                    .filter(function(pos) { return $scope.toastPosition[pos]; })
                    .join(' ');
            };

            $scope.showSimpleToast = function(msg) {
                $mdToast.show(
                    $mdToast.simple()
                        .content(msg)
                        .position($scope.getToastPosition())
                        .hideDelay(3000)
                );
            };

            $scope.getCurrentHour();
            var quizContent = ''
            if($scope.inputHour == $scope.quizAnswer.hour && $scope.inputMin == $scope.quizAnswer.min){
                quizContent = '정답입니다.';
            }
            else{
                quizContent = '틀렸습니다.'+$scope.hh +'시'+ $scope.mm + '분은 오답입니다.';
            }
            console.log(quizContent);
            $scope.showSimpleToast(quizContent);
        }

        var clock = document.querySelector('#utility-clock');
        $timeout(function() {
            utilityClock(clock);
            autoResize(clock, 420);
            //autoResize(clock, 350);
            choose(clock, [
                //['hour', ['text', 'text-quarters', 'pill']],
                ['hour', ['text', 'text-quarters', 'pill']],
                ['hour-text', ['large', 'small']],
                ['hour-display', ['all', 'quarters', 'none']],
                ['minute', ['line', 'dot']],
                ['minute-display', ['fine', 'fine-2', 'coarse', 'major', 'none']],
                ['minute-text', ['inside', 'outside', 'none']],
                ['hand', ['normal', 'hollow']]
            ]);

            Draggable.create("#minC", {
                type: "rotation", throwProps: true
            });
            Draggable.create("#hourC", {
                type: "rotation", throwProps: true
            });


            //TweenLite.to('.fill', 2, {x:250})
            //TweenLite.to('.gameCtrl', 2, {x:300})
            TweenLite.to('.element.minute-line.whole', 1, {backgroundColor:"yellow"})
            //TweenLite.to('.fill', 0.5, {left:'+100px'});
        }, 500);

        function utilityClock(container) {

            var dynamic = container.querySelector('.dynamic')
            var hourElement = container.querySelector('.hour')
            var minuteElement = container.querySelector('.minute')
            var secondElement = container.querySelector('.second')

            var div = function(className, innerHTML) {
                var element = document.createElement('div')
                element.className = className
                element.innerHTML = innerHTML || ''
                return element
            }

            var append = function(element) {
                return {
                    to: function(parent) {
                        parent.appendChild(element)
                        return append(parent)
                    }
                }
            }

            var anchor = function(element, rotation) {
                var anchor = div('anchor')
                rotate(anchor, rotation)
                append(element).to(anchor).to(dynamic)
            }

            var minute = function(n) {
                var klass = n % 5 == 0 ? 'major' : n % 1 == 0 ? 'whole' : 'part'
                var line = div('element minute-line ' + klass)
                anchor(line, n)
                if (n % 5 == 0) {
                    var text = div('anchor minute-text ' + klass)
                    var content = div('expand content', (n < 10 ? '0' : '') + n)
                    append(content).to(text)
                    rotate(text, -n)
                    anchor(text, n)
                }
            }

            var hour = function(n) {
                var klass = 'hour-item hour-' + n
                var line = div('element hour-pill ' + klass)
                anchor(line, n * 5)
                var text = div('anchor hour-text ' + klass)
                var content = div('expand content', n)
                append(content).to(text)
                rotate(text, -n * 5)
                anchor(text, n * 5)
                return
            }

            var position = function(element, phase, r) {
                var theta = phase * 2 * Math.PI
                element.style.top = (-r * Math.cos(theta)).toFixed(1) + 'px'
                element.style.left = (r * Math.sin(theta)).toFixed(1) + 'px'
            }

            var rotate = function(element, second) {
                element.style.transform =
                    element.style.webkitTransform = 'rotate(' + (second * 6) + 'deg)';
            }

            $scope.animate = function() {
                var now = new Date();
                var time = now.getHours() * 3600 +
                    now.getMinutes() * 60 +
                    now.getSeconds() * 1 +
                    now.getMilliseconds() / 1000;
                //rotate(secondElement, time)
                //rotate(minuteElement, time / 60)
                //rotate(hourElement, time / 60 / 12)
                requestAnimationFrame($scope.animate);
            };

            $scope.setTime = function(){
                var now = new Date()
                $scope.time = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds() * 1 + now.getMilliseconds() / 1000;
                $scope.min = $scope.time / 60;
                $scope.hour = $scope.time / 60 / 12;
                rotate(minuteElement, $scope.time / 60)
                rotate(hourElement, $scope.time / 60 / 12)
                requestAnimationFrame($scope.animate);
            };
            for (var i = 1 / 4; i <= 60; i += 1 / 4) minute(i)
            for (var i = 1; i <= 12; i ++) hour(i)
            $scope.animate();
        }

        function autoResize(element, nativeSize) {
            console.log("update size");
            var update = function() {
                var parent = element.offsetParent
                var scale = Math.min(parent.offsetWidth, parent.offsetHeight) / nativeSize;
                element.style.transform = element.style.webkitTransform = 'scale(' + scale.toFixed(3) + ')'

            }
            update();

            window.addEventListener('resize', update)
        }

        function choose(clock, items) {
            var chooser = document.querySelector('#chooser')
            items.forEach(function(item) {
                var name = item[0]
                var styles = item[1]
                var element = document.createElement('div')
                element.addEventListener('click', click, false)
                update();
                //chooser.appendChild(element)
                function update() {
                    element.innerHTML = name + '-style-<b>' + getValue() + '</b>'
                }
                function klass(c) {
                    return name + '-style-' + c
                }
                function getValue() {
                    for (var i = 0; i < styles.length; i ++) {
                        if (clock.classList.contains(klass(styles[i]))) return styles[i]
                    }
                }
                function click(e) {
                    for (var i = 0; i < styles.length; i ++) {
                        if (clock.classList.contains(klass(styles[i]))) {
                            clock.classList.remove(klass(styles[i]))
                            clock.classList.add(klass(styles[(i + 1) % styles.length]))
                            break
                        }
                    }
                    update()
                    e.preventDefault()
                }
            })
        }

        $scope.setNow = function(){
            var now = new Date()
            var time = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds() * 1 + now.getMilliseconds() / 1000;
            var min =  time / 60;
            var hour = time / 60 / 12;


            var hourDeg = hour * 6;
            var minDeg = min * 6;
            console.log('hour: '+ hourDeg + 'min: '+minDeg)
            TweenLite.to("#hourC", 5, {rotation:hourDeg})
            TweenLite.to("#minC", 5, {rotation:minDeg})
        }

        //Draggable.create("#secC", {type: "rotation", throwProps: true});
        $scope.getCurrentHour = function(){
            var hourDeg = getDegreeCrnt('hourC');
            var minDeg = getDegreeCrnt('minC');
            var hour = 0;
            var min= 0;
            console.log('time');
            if(hourDeg < 0){
                hour = (360 + hourDeg) /30;
                if(hour<1)
                    hour = 12;
            }else{
                hour = hourDeg/30;
                if(hour<1)
                    hour = 12;
            }

            if(minDeg < 0){
                min = (360 + minDeg)/6;
            }else{
                min = minDeg/6;
            }

            console.log("hourDeg: "+ hourDeg + " minDeg: "+minDeg);
            console.log("hour: "+ hour + " min: "+min);

            $scope.hh = parseInt(hour);
            $scope.mm = parseInt(min);
        }

        function getDegreeCrnt(id) {

            var el = document.getElementById(id);
            var st = window.getComputedStyle(el, null);
            var tr = st.getPropertyValue("-webkit-transform") ||
                st.getPropertyValue("-moz-transform") ||
                st.getPropertyValue("-ms-transform") ||
                st.getPropertyValue("-o-transform") ||
                st.getPropertyValue("transform") ||
                "FAIL";

            // With rotate(30deg)...
            // matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)
            //		console.log('Matrix: ' + tr);

            // rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix

            var values = tr.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var c = values[2];
            var d = values[3];

            var scale = Math.sqrt(a*a + b*b);

//			console.log('Scale: ' + scale);

            // arc sin, convert from radians to degrees, round
            var sin = b/scale;
            // next line works for 30deg but not 130deg (returns 50);
            // var angle = Math.round(Math.asin(sin) * (180/Math.PI));
            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

            return angle;
        }
    }
    WatchGame2Controller.$inject = ["$scope", "$timeout", "$mdDialog", "$state", "$mdToast", "$mdBottomSheet", "$interval"];

'use strict';

angular.module('etc').controller('WigsController', ['$scope',
	function($scope) {
        $scope.degree = 0;
        $scope.flipCard = function(targetId){
            var target = $('#'+targetId);
            $scope.degree += 180;
            TweenMax.to(target, 0.4 , {rotationY: $scope.degree});
            console.log($scope.degree);
        }
		// Wigs controller logic
		// ...
	}
]);
'use strict';

angular.module('etc').directive('colorPicker', [
	function() {
		ColorPickerCtrl.$inject = ["$scope"];
		return {
			templateUrl: 'modules/etc/directives/template/color-picker.html',
			restrict: 'E',
			controller: ColorPickerCtrl,
			controllerAs: 'vm',
			link: function postLink(scope, element, attrs) {

			}
		};

		function ColorPickerCtrl($scope) {
			this.items=[
				{imgSrc:"modules/etc/img/1.jpg", title:"Color 1"},
				{imgSrc:"modules/etc/img/2.jpg", title:"Color 2"},
				{imgSrc:"modules/etc/img/3.jpg", title:"Color 3"},
				{imgSrc:"modules/etc/img/4.jpg", title:"Color 4"},
				{imgSrc:"modules/etc/img/5.jpg", title:"Color 5"},
				{imgSrc:"modules/etc/img/6.jpg", title:"Color 6"},
				{imgSrc:"modules/etc/img/7.jpg", title:"Color 7"},
				{imgSrc:"modules/etc/img/8.jpg", title:"Color 8"},
				{imgSrc:"modules/etc/img/9.jpg", title:"Color 9"},
				{imgSrc:"modules/etc/img/10.jpg", title:"Color 10"},
				{imgSrc:"modules/etc/img/11.jpg", title:"Color 11"},
				{imgSrc:"modules/etc/img/12.jpg", title:"Color 12"},
				{imgSrc:"modules/etc/img/13.jpg", title:"Color 13"},
				{imgSrc:"modules/etc/img/14.jpg", title:"Color 14"},
				{imgSrc:"modules/etc/img/15.jpg", title:"Color 15"},
				{imgSrc:"modules/etc/img/16.jpg", title:"Color 16"},
			];

			this.coverSelected = function(event) {
				console.log("selected");
				//console.log(event);
				console.log(event.path[2].outerHTML)
				//TweenLite.to(event.path[2].outerHTML, 1, {display:"block"});
			}

			this.tiles = buildGridModel({
				icon : "avatar:svg-",
				title: "Svg-",
				background: ""
			});
			function buildGridModel(tileTmpl){
				var it, results = [ ];
				for (var j=0; j<18; j++) {
					it = angular.extend({},tileTmpl);
					it.icon  = it.icon + (j+1);
					it.title = it.title + (j+1);
					it.span  = { row : "1", col : "1" };
					switch(j+1) {
						case 1:
							it.background = "red"; it.img="modules/etc/img/1.jpg"
							it.span.row = it.span.col = 2;
							break;
						case 2: it.background = "green"; it.img="modules/etc/img/2.jpg"; break;
						case 3: it.background = "darkBlue"; it.img="modules/etc/img/3.jpg"; break;
						case 4:
							it.background = "blue";
							it.span.row = it.span.col = 2;
							it.img="modules/etc/img/4.jpg";
							break;
						case 5:
							it.background = "yellow";
							it.span.row = it.span.col = 2;
							it.img="modules/etc/img/5.jpg";
							break;
						case 6:
							//it.span.row = it.span.col = 4;
							it.background = "pink";it.img="modules/etc/img/6.jpg"; break;
						case 7: it.background = "darkBlue";it.img="modules/etc/img/7.jpg"; break;
						case 8:
							//it.span.row = it.span.col = 6;
							it.background = "purple";it.img="modules/etc/img/8.jpg"; break;
						case 9: it.background = "deepBlue";it.img="modules/etc/img/9.jpg"; break;
						case 10: it.span.row = it.span.col = 2; it.background = "lightPurple";it.img="modules/etc/img/10.jpg"; break;
						case 11: it.background = "yellow";it.img="modules/etc/img/11.jpg"; break;
						case 12: it.background = "deepBlue";it.img="modules/etc/img/9.jpg"; break;
						case 13: it.background = "lightPurple";it.img="modules/etc/img/10.jpg"; break;
						case 14: it.background = "yellow";it.img="modules/etc/img/11.jpg"; break;
						case 15: it.background = "deepBlue";it.img="modules/etc/img/9.jpg"; break;
						case 16: it.background = "lightPurple";it.img="modules/etc/img/10.jpg"; break;
						case 17: it.background = "yellow";it.img="modules/etc/img/11.jpg"; break;
						case 18: it.background = "yellow";it.img="modules/etc/img/12.jpg"; break;
					}
					results.push(it);
				}
				return results;
			}
		}
	}
]);
'use strict';

angular.module('etc').directive('gallery', [
	function() {
        galleryCtrl.$inject = ["$scope"];
		return {
			templateUrl: 'modules/etc/directives/template/gallery.html',
			restrict: 'E',
            controller: galleryCtrl,
            controllerAs: 'vm',
			link: function postLink(scope, element, attrs) {
			}
		};

        function galleryCtrl($scope) {
            $scope.title = "DD";
            var COLORS = ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c', '#ff8a80', '#ff5252', '#ff1744', '#d50000', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f', '#ff80ab', '#ff4081', '#f50057', '#c51162', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#4a148c', '#ea80fc', '#e040fb', '#d500f9', '#aa00ff', '#ede7f6', '#d1c4e9', '#b39ddb', '#9575cd', '#7e57c2', '#673ab7', '#5e35b1', '#4527a0', '#311b92', '#b388ff', '#7c4dff', '#651fff', '#6200ea', '#c5cae9', '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f', '#283593', '#1a237e', '#8c9eff', '#536dfe', '#3d5afe', '#304ffe', '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#82b1ff', '#448aff', '#2979ff', '#2962ff', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b', '#80d8ff', '#40c4ff', '#00b0ff', '#0091ea', '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064', '#84ffff', '#18ffff', '#00e5ff', '#00b8d4', '#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c', '#a7ffeb', '#64ffda', '#1de9b6', '#00bfa5', '#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20', '#b9f6ca', '#69f0ae', '#00e676', '#00c853', '#f1f8e9', '#dcedc8', '#c5e1a5', '#aed581', '#9ccc65', '#8bc34a', '#7cb342', '#689f38', '#558b2f', '#33691e', '#ccff90', '#b2ff59', '#76ff03', '#64dd17', '#f9fbe7', '#f0f4c3', '#e6ee9c', '#dce775', '#d4e157', '#cddc39', '#c0ca33', '#afb42b', '#9e9d24', '#827717', '#f4ff81', '#eeff41', '#c6ff00', '#aeea00', '#fffde7', '#fff9c4', '#fff59d', '#fff176', '#ffee58', '#ffeb3b', '#fdd835', '#fbc02d', '#f9a825', '#f57f17', '#ffff8d', '#ffff00', '#ffea00', '#ffd600', '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00', '#ffe57f', '#ffd740', '#ffc400', '#ffab00', '#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#ffd180', '#ffab40', '#ff9100', '#ff6d00', '#fbe9e7', '#ffccbc', '#ffab91', '#ff8a65', '#ff7043', '#ff5722', '#f4511e', '#e64a19', '#d84315', '#bf360c', '#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00', '#d7ccc8', '#bcaaa4', '#795548', '#d7ccc8', '#bcaaa4', '#8d6e63', '#eceff1', '#cfd8dc', '#b0bec5', '#90a4ae', '#78909c', '#607d8b', '#546e7a', '#cfd8dc', '#b0bec5', '#78909c'];
            $scope.colorTiles = (function() {
                var tiles = [];
                for (var i = 0; i < 46; i++) {
                    tiles.push({
                        color: randomColor(),
                        colspan: randomSpan(),
                        rowspan: randomSpan()
                    });
                }
                return tiles;
            })();

            function randomColor() {
                return COLORS[Math.floor(Math.random() * COLORS.length)];
            }
            function randomSpan() {
                var r = Math.random();
                if (r < 0.8) {
                    return 1;
                } else if (r < 0.9) {
                    return 2;
                } else {
                    return 3;
                }
            }
        };
	}
]);
'use strict';

angular.module('etc').directive('productDetail', [
	function() {
		ProductDetailCtrl.$inject = ["$scope"];
		return {
			templateUrl: 'modules/etc/directives/template/product-detail.html',
			restrict: 'E',
			controller: ProductDetailCtrl,
			controllerAs: 'vm',
			link: function postLink(scope, element, attrs) {

			}
		};

		function ProductDetailCtrl($scope) {

		};
	}
]);
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

'use strict';

angular.module('mean-tutorials').controller('HomeDialogtmpController', ['$scope','$mdDialog',
	function($scope, $mdDialog) {
		// Home dialogtmp controller logic
		// ...
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
	}
]);

'use strict';

angular.module('mean-tutorials')
	.controller('MeanLoginCtrl', MeanLoginCtrl)
	.controller('MeanHomeController',MeanHomeController);

function MeanLoginCtrl($scope, $mdDialog){
	//$scope.authentication = Authentication;
}
MeanLoginCtrl.$inject = ["$scope", "$mdDialog"];

function MeanHomeController($scope, $state, $mdDialog, $mdSidenav, $log) {


	//Initialization

	$scope.homeContents = {
		mainTitle : "Open Board",
		subTitleText: "is an e-Learning Management System. Save time to manage contents and assignments for Instructor. Easy to access and manage assignment and contents for students"
	};

	$scope.notice = "Prototype";

	$scope.date = {
		month: moment().format("MMM").toUpperCase(),
		date: moment().date(),
		year: moment().year()
	}

	$scope.goTo = function(stateName){
		$state.go(stateName);
	}

	$scope.colorBorder = {
		header: "blue"
	}

	$scope.close = function() {
		$mdSidenav('left').close();
	};

	$scope.gotoState = function(state) {
		$state.go(state);
	}

	$scope.toggleLeft = function() {
		$mdSidenav('left').toggle()
			.then(function(){
				$log.debug("toggle left is done");
			});
	};
	$scope.toggleRight = function() {
		//TweenMax.from($('#menuBtn'),2.5, {x:50, ease:Bounce.easeOut});
		$mdSidenav('right').toggle()
			.then(function(){
				$log.debug("toggle RIGHT is done");
				//TweenMax.set($("md-backdrop"),{position:'fixed'});
			});

	};

	$scope.goGetStarted = function(){
		$state.go('');
	};

	$scope.showSignUp = function(ev) {
		$mdDialog.show({
			controller: 'AuthenticationController',
			templateUrl: 'modules/mean-tutorials/template/authentication/signup-dialog.tpl.html',
			targetEvent: ev
		})
			.then(function(answer) {
				$scope.alert = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.alert = 'You cancelled the dialog.';
			});
	};
	$scope.showSignIn = function(ev) {
		$mdDialog.show({
			controller: 'AuthenticationController',
			templateUrl: 'modules/mean-tutorials/template/authentication/signin-dialog.tpl.html',
			targetEvent: ev
		})
			.then(function(answer) {
				$scope.alert = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.alert = 'You cancelled the dialog.';
			});
	};

	$scope.loginBtn = function(){
		$state.go('signin');
	};
	$scope.signupBtn = function(){
		$state.go('signup');
	};


	// This function should be combined later
	$scope.showSignUpTutorial = function(ev) {
		console.log('mean home');
		$mdDialog.show({
			controller: DialogController,
			templateUrl: 'modules/mean-tutorials/template/authentication/signup-dialog.tpl.html',
			targetEvent: ev
		})
		//TweenMax.to($("md-backdrop.md"),0.5,{position:'fixed'});
	};

	$scope.showSignInTutorial = function(ev, elementId) {
		console.log('mean home');
		$mdDialog.show({
			controller: DialogController,
			templateUrl: 'modules/mean-tutorials/template/authentication/signin-dialog.tpl.html',
			targetEvent: ev,
			clickOutsideToClose: true
		}).then(function(answer){
				//var target = $("#"+elementId).offset().top;
				//TweenMax.to($window, 1.2, {scrollTo:{y:target}, ease:Power4.easeOut});
				console.log('first');

			},function(){
				console.log('cancel');
			}
		);
	};
	function DialogController($scope, $mdDialog){
		$scope.hide = function() {
			$mdDialog.hide();
			//console.log('cancel');
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		$scope.answer = function(answer) {
			$mdDialog.hide(answer);
		};
	}
}
MeanHomeController.$inject = ["$scope", "$state", "$mdDialog", "$mdSidenav", "$log"];

'use strict';

angular.module('mean-tutorials')
    .controller('Project1Controller', ['$scope','$document','$timeout','$log','$mdSidenav',
        function($scope, $document, $timeout, $log, $mdSidenav) {
            $scope.snippet = 'angular.module(\'mean-tutorials\')'+
                '.controller(\'Project1Controller\', [\'$scope\',\'$document\',\'$timeout\',\'$log\',\'$mdSidenav\','+
                    'function($scope, $document, $timeout, $log, $mdSidenav) {';
            $scope.toggleLeft = function() {
                $mdSidenav('left').toggle()
                    .then(function(){
                        $log.debug("toggle left is done");
                    });
            };
            $scope.toggleRight = function() {
                $mdSidenav('right').toggle()
                    .then(function(){
                        $log.debug("toggle RIGHT is done");
                    });
            };

            $scope.id='meanT-project1';
            var width = 960,
                height = 500,
                centered;

            var projection = d3.geo.albersUsa()
                .scale(1070)
                .translate([width / 2, height / 2]);

            var path = d3.geo.path()
                .projection(projection);

            var aspect = 500 / 950;

            var svg = d3.select("#geo").append("svg")
                .attr("viewBox", "0 0 960 500")
                .attr("preserveAspectRatio", "xMidMid")

            svg.append("rect")
                .attr("class", "background")
                .attr("width", width)
                .attr("height", height)
                .on("click", clicked);

            var g = svg.append("g");

            d3.json("/modules/mean-tutorials/img/us.json"
                , function(error, us){
                    g.append("g")
                        .attr("id", "states")
                        .selectAll("path")
                        .data(topojson.feature(us, us.objects.states).features)
                        .enter().append("path")
                        .attr("d", path)
                        .on("click", clicked);

                    g.append("path")
                        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
                        .attr("id", "state-borders")
                        .attr("d", path);
                }
            );

            function clicked(d) {
                var x, y, k;

                if (d && centered !== d) {
                    var centroid = path.centroid(d);
                    x = centroid[0];
                    y = centroid[1];
                    k = 4;
                    centered = d;
                } else {
                    x = width / 2;
                    y = height / 2;
                    k = 1;
                    centered = null;
                }

                g.selectAll("path")
                    .classed("active", centered && function (d) {
                        return d === centered;
                    });

                g.transition()
                    .duration(750)
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
                    .style("stroke-width", 1.5 / k + "px");
            }

        }
]).controller('LeftCtrl12', ["$scope", "$timeout", "$mdSidenav", "$log", function($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function() {
            $mdSidenav('left').close()
                .then(function(){
                    $log.debug("close LEFT is done");
                });
        };
    }])
    .controller('RightCtrl11', ["$scope", "$timeout", "$mdSidenav", "$log", function($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function() {
            $mdSidenav('right').close()
                .then(function(){
                    $log.debug("close RIGHT is done");
                });
        };
    }]);;

'use strict';

angular.module('mean-tutorials').controller('Project2Controller', ['$scope',
	function($scope,$rootScope) {
        // Disqus ID
		$scope.id='meanT-project2';

        // Listen event
        $scope.$on('handleEmit', function(event, args) {
            $scope.$broadcast('handleBroadcast', args);
        });

        $scope.password = '';
        $scope.grade = function(){
            var size = $scope.password.length;
            if (size > 8) {
                $scope.strength = 'strong';
            } else if (size > 3) {
                $scope.strength = 'medium';
            } else {
                $scope.strength = 'weak';
            }
        }
	}
]);

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

'use strict';

angular.module('mean-tutorials').controller('ProjectviewdashboardController', ['$scope',
    '$window', '$state', '$http', '$q', '$mdDialog', '$mdSidenav', 'configGdrive',
    'Googledrive', 'GooglePlus', 'Products', 'Authentication', 'ProductByUserId','UtCalendar',
    '$timeout', '$mdBottomSheet', //Material Design
    'MeanEvents',
    function ($scope,
              $window, $state, $http, $q, $mdDialog, $mdSidenav, configGdrive,
              Googledrive, GooglePlus, Products, Authentication, ProductByUserId,UtCalendar,
              $timeout, $mdBottomSheet, //material Design
              MeanEvents // mean-events
             ) {
        $scope.authentication = Authentication;

        $scope.foo = 'tbody';

        // Find a list of Mean events
        $scope.findEvents = function() {
            $scope.meanEvents = MeanEvents.query();
        };

        $scope.testCreateFolder = function(){
            //console.log(accessToken);
            Googledrive.createFolder('chulwoo Fuck1', accessToken);
        };

        $scope.testGetGoogleDriveInfo = function() {
            Googledrive.getGoogleDriveInfo();
        }

        //
        var accessToken;
        $scope.permalLink = 'http://drive.google.com/uc?export=view&id=';
        $scope.arrive = false;
        $scope.authName = 'Authorize';
        $scope.isAuth = false;
        $scope.init = function init(){
            window.gapi.load('auth', $scope.authenticateWithGoogle);
            window.gapi.load('picker');
            gapi.client.load('urlshortener', 'v1');
        }
        $scope.authenticateWithGoogle =function authenticateWithGoogle(){
            window.gapi.auth.authorize({
                'client_id': configGdrive.clientId,
                'scope':configGdrive.scopes,
                'immediate': false
            }, handleAuthentication);
        }

        function handleAuthentication(result){
            if(result && !result.error){
                $scope.isAuth = true;
                $scope.authName = 'Deauthorize';
                accessToken = result.access_token;
                //console.log(accessToken);

                /*
                 callGooglePlus();
                 setFilePicker();
                 listFolder();
                 getGoogleDriveInfo();
                 createFolder();
                 */
                createNewAccountFolder();
                setFilePicker(); // singleFile
                //findTargetUriFolder();
            }else{
                console.log(result);
                console.log(result.error);
                console.log('fail to authentication')
            }
            $scope.$digest();
        }

        function listFolder() {
            Googledrive.listFolder()
        }
        /*
         function createFolder(){
         var folderName;
         Googledrive.createFolder(folderName, accessToken);
         }
         */
        function getGoogleDriveInfo(){
            Googledrive.getGoogleDriveInfo();
        }

        /// Custom file Picker Start ----------------------------------------------------------
        /*
         function setFilePicker() {
         var filePicker = document.getElementById('filePicker');

         filePicker.style.display = 'none';

         // Access token has been successfully retrieved, requests can be sent to the API.
         filePicker.style.display = 'block';
         filePicker.onchange = uploadFile;
         }

         function uploadFile(evt) {
         var callback = function(file) {
         console.log('!!File!!');
         console.log(file);
         }
         gapi.client.load('drive', 'v2', function() {
         var file = evt.target.files[0];
         insertFile(file, callback);
         });
         }

         function insertFile(fileData, callback) {
         var boundary = '-------314159265358979323846';
         var delimiter = "\r\n--" + boundary + "\r\n";
         var close_delim = "\r\n--" + boundary + "--";

         var reader = new FileReader();
         reader.readAsBinaryString(fileData);
         reader.onload = function(e) {
         var contentType = fileData.type || 'application/octet-stream';
         var metadata = {
         'title': fileData.name,
         'mimeType': contentType,
         'writersCanShare':true,
         'parents': [{
         'kind': "drive#fileLink",
         'id': "0B8FisuvAYPTfN1o1Q0d4T2JLTk0"
         }]

         };

         var base64Data = btoa(reader.result);
         var multipartRequestBody =
         delimiter +
         'Content-Type: application/json\r\n\r\n' +
         JSON.stringify(metadata) +
         delimiter +
         'Content-Type: ' + contentType + '\r\n' +
         'Content-Transfer-Encoding: base64\r\n' +
         '\r\n' +
         base64Data +
         close_delim;
         console.log(multipartRequestBody);

         var request = gapi.client.request({
         'path': '/upload/drive/v2/files',
         'method': 'POST',
         'params': {'uploadType': 'multipart'},
         'headers': {
         'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
         },
         'body': multipartRequestBody});
         if (!callback) {
         callback = function(file) {
         console.log(file)
         };
         }
         request.execute(callback);
         }
         }
         */
        /// Custom file Picker End ----------------------------------------------------------

        function callGooglePlus(){
            function callback(resp) {
                console.log(resp);
                var heading = document.createElement('h4');
                var image = document.createElement('img');
                image.src = resp.result.image.url;
                heading.appendChild(image);
                heading.appendChild(document.createTextNode(resp.result.displayName));

                document.getElementById('content').appendChild(heading);
            }
            GooglePlus.callGooglePlus(callback);
        }

        // Google PlatForm Service
        $scope.setupPicker = function() {
            function pickerCallback(data) {
                if(data.action == google.picker.Action.PICKED){
                    //do something
                    $scope.files = data.docs;
                    $scope.arrive = true;

                    // make shorten URL
                    var request = gapi.client.urlshortener.url.get({
                        'shortUrl': 'http://goo.gl/fbsS'
                    });
                    request.then(function(response) {
                        appendResults(response.result.longUrl);
                    }, function(reason) {
                        console.log('Error: ' + reason.result.error.message);
                    });

                    //alert('URL: ' + data.docs[0].url);
                    $scope.$digest()
                }else if(data.action ==google.picker.Action.CANCEL){
                    //alert('goodbye');
                }
            }
            Googledrive.setupPicker(accessToken, pickerCallback);
        }

	    $scope.listFolderInformation = function(){
		    Googledrive.listFolder();
	    }

        function createNewAccountFolder(){
            //Pre. Get User Information
            //check if there exists an
            // API /users/me (only allow to have)

            var callback = function(resp){
                console.log(resp.result.items.length);
                if(resp.result.items.length == 0){
                    $http.get('users/me')
                        .success(function(response) {
                            console.log(response);
                            var folderName = 'D2l-'+response._id;
                            //1. Create A New Folder
                            Googledrive.createFolder(folderName, accessToken);
                            //2. Update User Information
                            //$http.get()
                        });
                }
                else{
                    console.log('there is already exist')
                    $scope.rootGdriveFolderID = resp.result.items[0].id
                    $scope.$digest();
                }
            }
            Googledrive.findFolder(callback);
        }

        ////////marterial Design //////////
        $scope.alert = '';
        $scope.showListBottomSheet = function($event) {
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'modules/mean-tutorials/template/bottom-sheet-list-template.html',
                controller: 'BottomSheetListCtrl',
                targetEvent: $event
            }).then(function(clickedItem) {
                $scope.alert = clickedItem.name + ' clicked!';
            });
        };
        $scope.showGridBottomSheet = function($event) {
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'modules/mean-tutorials/template/bottom-sheet-grid-template.html',
                controller: 'BottomSheetGridCtrl',
                targetEvent: $event
            }).then(function(clickedItem) {
                $scope.alert = clickedItem.name + ' clicked!';
            });
        };
        ////////End Material Design



        //////////DATEPicker/////////////
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        ///////////END//////////////////

    }
])

	.controller('gDriveDashCtrl', ["$scope", "Googledrive", function($scope, Googledrive){
		$scope.googleDrive={info:'gDriveCtrl'};

		$scope.listingFolderInfo = function(){
			$scope.gDocs = 'dd';
			console.log('gDriveDashCtrl');
			$scope.gDocs = Googledrive.listFolder();
			var request = gapi.client.drive.files.get({
				'fileId': "1Q_CJwJftcL-zabVm0USc1px5HDfbpxu6Klav-XYOzNg"
			});
			request.execute(function(resp) {
				if (!resp.error) {
					console.log('Title: ' + resp.title);
					console.log('Description: ' + resp.description);
					console.log('MIME type: ' + resp.mimeType);
					console.log(resp);
					$scope.gDocs = resp;

				} else if (resp.error.code == 401) {
					// Access token might have expired.
					checkAuth();
				} else {
					console.log('An error occured: ' + resp.error.message);
				}
			});
		}
	}])

    .controller('BottomSheetListCtrl', ["$scope", "$mdBottomSheet", function($scope, $mdBottomSheet) {
        $scope.items = [
            { name: 'Upload New Image (Google Drive)', icon: 'share' },
            { name: 'Select Existing Image (Google Drive)', icon: 'upload' },
            { name: 'Product History (Google Sheets)', icon: 'copy' },
            { name: 'Print this page (PDF Printer)', icon: 'print' },
        ];

        $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
        }
    }])
    .controller('BottomSheetGridCtrl', ["$scope", "$mdBottomSheet", function($scope, $mdBottomSheet) {
        $scope.items = [
            { name: 'Hangout', icon: 'hangout' },
            { name: 'Mail', icon: 'mail' },
            { name: 'Message', icon: 'message' },
            { name: 'Copy', icon: 'copy' },
        ];
        $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
        };
    }]);

var CalendarException = function CalendarException(message) {
    this.message = message;
    this.toString = function() {
        return this.constructor.name + ": " + this.message
    };
}

var Calendar = function Calendar(firstWeekDay) {
    //properties
    this.firstWeekDay = firstWeekDay || 0; // 0 = Sunday
};

Calendar.prototype = {
    constructor : Calendar,
    weekStartDate : function weekStartDate(date) {
        var startDate = new Date(date.getTime());
        while (startDate.getDay() !== this.firstWeekDay) {
            startDate.setDate(startDate.getDate() - 1);
        }
        return startDate;
    },
    monthDates : function monthDates(year, month, dayFormatter, weekFormatter) {
        if ((typeof year !== "number") || (year < 1970)) {
            throw new CalendarException('year must be a number >= 1970');
        };
        if ((typeof month !== "number") || (month < 0) || (month > 11)) {
            throw new CalendarException('month must be a number (Jan is 0)');
        };
        var weeks = [],
            week = [],
            i = 0,
            date = this.weekStartDate(new Date(year, month, 1));
        do {
            for (i=0; i<7; i++) {
                week.push(dayFormatter ? dayFormatter(date) : date);
                date = new Date(date.getTime());
                date.setDate(date.getDate() + 1);
            }
            weeks.push(weekFormatter ? weekFormatter(week) : week);
            week = [];
        } while ((date.getMonth()<=month) && (date.getFullYear()===year));
        return weeks;
    },
    monthDays : function monthDays(year, month) {
        var getDayOrZero = function getDayOrZero(date) {
            return date.getMonth() === month ? date.getDate() : 0;
        };
        return this.monthDates(year, month, getDayOrZero);
    },
    monthText : function monthText(year, month) {
        if (typeof year === "undefined") {
            var now = new Date();
            year = now.getFullYear();
            month = now.getMonth();
        };
        var getDayOrBlank = function getDayOrBlank(date) {
            var s = date.getMonth() === month ? date.getDate().toString() : "  ";
            while (s.length < 2) s = " "+s;
            return s;
        };
        var weeks = this.monthDates(year, month, getDayOrBlank,
            function (week) { return week.join(" ") });
        return weeks.join("\n");
    }
};
var months = "JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split(" ");
for (var i=0; i<months.length; i++)
    Calendar[months[i]] = i;

window.Calendar = Calendar;
window.consts = {
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    dayNames: [
        '일',
        '월',
        '화',
        '수',
        '목',
        '금',
        'S'
    ]
};

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

'use strict';

angular.module('mean-tutorials').directive('utCalendar', ['UtCalendar',
	function(UtCalendar) {
		return {
			template: '<div class="container" style="margin-top:20px">'+
                        '<table id="calendar" class="meanT-calendar"></table>'+
                      '</div>',
            scope:{

            },
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
                UtCalendar.calendar();

                element.bind('click', function(val){

                    if($('#calSvg').length === 0){
                        var position = $(val.target.parentElement.parentElement).position({of:$(window)})

                        //TweenLite.to(val.target, 1, {x: position.top, y: position.left, transformOrigin:"50% 50%", transformPerspective:500, backgroundColor:'red', scale:2});
                        var width = $(val.target.parentElement.parentElement).width()
                        var height = $(val.target.parentElement.parentElement).height()
                        //var center = $(val.target.parentElement.parentElement).height()

                        var margin = {top: -5, right: -5, bottom: -5, left: -5},
                            width = width - margin.left - margin.right,
                            height = height - margin.top - margin.bottom;

                        var zoom = d3.behavior.zoom()
                            .center([width / 2, height / 2])
                            .scaleExtent([1, 10])
                            .on("zoom", zoomed);

                        scope.svg = d3.select("#calendar").append("svg")
                            .attr("id", 'calSvg')
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                            .style("position","absolute")
                            .style("top", position.top)
                            .append("g")
                            .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
                            .call(zoom);

                        var container = scope.svg.append("g");

                        container.append("g")
                            .attr("class", "axis")
                            .selectAll("circle")
                            .data(d3.range(10, width, 10))
                            .enter().append("circle")
                            .attr("cx", width / 2)
                            .attr("cy", height / 2)
                            .attr("r", function(d) { return d; });

                        var center = scope.svg.append("circle")
                            .style("fill", "red")
                            .attr("cx", width / 2)
                            .attr("cy", height / 2)
                            .attr("r", 10);

                        var zoomed = function zoomed() {
                            container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                        }
                    }
                })
			}
		};
	}
]);

'use strict';

angular.module('mean-tutorials').factory('UtCalendar', [
	function() {
		// Ut calendar service logic
		// ...

		// Public API
		return {
			calendar: calendar
		};

        function calendar() {
            //Start Calendar
            var cal = new Calendar();

            var month = 0;
            var year = 2015;
            var weeks = cal.monthDays(year, month);

            var table = d3.select('#calendar');
            var header = table.append('thead');
            var body = table.append('tbody');

            header
                .append('tr')
                .append('td')
                .attr('colspan', 7)
                .style('text-align', 'center')
                .style('font-size', '16px')
                .text(consts.monthNames[month]);

            header
                .append('tr')
                .selectAll('td')
                .data(consts.dayNames)
                .enter()
                .append('td')
                .style('text-align', 'center')
                .text(function (d) {
                    return d;
                });

            weeks.forEach(function (week) {
                body
                    .append('tr')
                    .selectAll('td')
                    .data(week)
                    .enter()
                    .append('td')
                    .attr('class', function (d) {
                        return d > 0 ? 'date' : 'empty';
                    })
                    .text(function (d) {
                        return d > 0 ? d : '';
                    });
            });
        }
	}
]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);