'use strict';

angular.module('mean-tutorials')
	.controller('MeanLoginCtrl', MeanLoginCtrl)
	.controller('MeanHomeController',MeanHomeController);

function MeanLoginCtrl($scope, $mdDialog){
	//$scope.authentication = Authentication;
}

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
