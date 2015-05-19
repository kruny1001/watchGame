'use strict';

angular.module('etc').controller('MenuController', ['$scope','$state','gameStatus','notify', 'notify2',
	function($scope, $state, gameStatus, notify, notify2) {

    $scope.isDone = false;
        $scope.goTo = function(name){
            $state.go(name)
        }

    $scope.init = function(){
      if(gameStatus.getGamesNotDone().length !== 0)
        $scope.isDone = true;
    }
    $scope.init();

    $scope.reset = function(){
      notify.reset();
      notify2.reset();
      gameStatus.reset();
      $scope.goTo('watch-game');
    }
	}
]);