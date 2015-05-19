'use strict';

angular.module('etc').factory('gameStatus', function(){
	var games = [
		{
			type:'game1',
			isDone: false

		},
		{
			type:'game2',
			isDone: false
		}
	];

	return {
		changeStatus: function(target){
			var index = _.findIndex(games, {'type':target});
			games[index].isDone = true;
		},
		getInfo: function(target){
			var index = _.findIndex(games, {'type':target});
			return games[index];
		},
		getGamesNotDone: function(){
			return _.filter(games, function(item){return item.isDone === false})
		},
		reset: function(){
			games = [
				{
					type:'game1',
					isDone: false

				},
				{
					type:'game2',
					isDone: false
				}
			];
		}
	}
});
angular.module('etc').factory('notify', [function() {
    var inputs = [];
    return {
        push: function(msg) {
            inputs.push(msg);
        },
        get: function(){
            return inputs;
        },
	      reset: function(){
		      inputs = [];
	      },
	      getProblem: function(index){
		      return inputs[index];
	      },
	      updateProblem: function(item, index){
		      //problem:{game: $scope.crntTargetName, num:$scope.totalProbb, hh:$scope.hourQ, mm:$scope.minQ}}
		      //{ name: '문제'+$scope.totalProbb, icon: wrong, class: wrongStyle, problem:{game: $scope.crntTargetName, num:$scope.totalProbb, hh:$scope.hourQ, mm:$scope.minQ}}
		      item.icon = "modules/etc/img/triangle.svg";
		      item.class = 'reCorrectProblem';
		      return inputs[index] = item;
	      },
	      getProblemsNum: function(){
		      console.log('getProblemNum is executed');
		      return{
			      'hh': _.filter(inputs, function(item){ return item.problem.game === 'hh'}).length,
			      'mm': _.filter(inputs, function(item){ return item.problem.game === 'mm'}).length,
			      'hm': _.filter(inputs, function(item){ return item.problem.game === 'hm'}).length
		      }
	      }

    }
}]);
angular.module('etc').factory('notify2', [ function() {
	var inputs = [];
	return {
		push: function (msg) {
			inputs.push(msg);
		},
		get: function () {
			return inputs;
		},
		reset: function () {
			inputs = [];
		},
		getProblem: function (index) {
			return inputs[index];
		},
		updateProblem: function (item, index) {
			//problem:{game: $scope.crntTargetName, num:$scope.totalProbb, hh:$scope.hourQ, mm:$scope.minQ}}
			//{ name: '문제'+$scope.totalProbb, icon: wrong, class: wrongStyle, problem:{game: $scope.crntTargetName, num:$scope.totalProbb, hh:$scope.hourQ, mm:$scope.minQ}}
			item.icon = "modules/etc/img/triangle.svg";
			item.class = 'reCorrectProblem';
			return inputs[index] = item;
		},
		getProblemsNum: function () {
			console.log('getProblemNum is executed');
			return {
				'hm': _.filter(inputs, function (item) {
					return item.problem.game === 'hm2'
				}).length
			}
		}
	}
}]);
angular.module('etc').controller('GridCtrl', GridCtrl);
angular.module('etc').controller('WatchGameController', WatchGameController);

function GridCtrl($scope, $state, $mdBottomSheet, notify, notify2){
    $scope.items = notify.get();
		$scope.items2 = notify2.get();

    $scope.listItemClick = function($index, game) {
	    if(game === 1){
		    console.log($scope.items[$index]);
		    var clickedItem = $scope.items[$index];
		    $mdBottomSheet.hide(clickedItem);
		    if(clickedItem.class !== 'correctProblem'){
			    $state.go('watch-game-re',{problemId:$index});
		    }

	    }else{
		    console.log(2);
		    console.log($scope.items2[$index]);
		    var clickedItem = $scope.items2[$index];
		    $mdBottomSheet.hide(clickedItem);
		    if(clickedItem.class !== 'correctProblem') {
			    $state.go('watch-game2-re', {problemId: $index});
		    }
	    }
    };

    //console.log($scope.items);
}
function WatchGameController($scope, $timeout, $mdDialog, $state, $stateParams,
                             $mdToast, $mdBottomSheet, $interval, notify, $mdGridLayout, gameStatus) {

	$scope.reTrial = false;
	$scope.mmWorking = true;
	$scope.hhWorking = true;
	$scope.mmhhWorking = true;
	$scope.crntTry = 3;
	var status = gameStatus.getInfo('game1');
	console.log(status);

	if(status.isDone === true){
		$scope.mmWorking = false;
		$scope.hhWorking = false;
		$scope.mmhhWorking = false;
	}

	//notify.reset();
	var stop;
	var numTotalGame = 4;

	var wrong = 'modules/core/img/svg/android-close.svg';
	var correct = 'modules/core/img/svg/android-radio-button-off.svg';
	var notYet = 'modules/core/img/svg/android-checkbox-outline-blank.svg';
	var reCorrect = "modules/etc/img/triangle.svg";
	var correctStyle = 'correctProblem';
	var wrongStyle = 'wrongProblem';

	var clock = document.querySelector('#utility-clock');
	var grid = document.querySelector('md-grid-list');
	var hourArmDrag;
	var minArmDrag;
	$scope.crntTargetName = ""; //mm, hh, mh
	$scope.problemSet = [
		{
			name:'mm',
			numTrial: 0,
			totalProb: 3,
			isDone: false,
			problems:[]
		},
		{
			name:'hh',
			numTrial: 0,
			totalProb: 3,
			isDone: false,
			problems:[]
		},
		{
			name:'hm',
			numTrial: 0,
			totalProb: 4,
			isDone: false,
			problems:[]
		}
	];
	$scope.updateProblemBtn = function(targetName, crntNumber, totalTargetProb){
		if(crntNumber == totalTargetProb){
			var index = _.findIndex($scope.problemSet, function(chr) {
				return chr.name == targetName;
			});
			$scope.problemSet[index].isDone = true;
		};
	};


	$scope.crntNumProbMM = 0;
	$scope.crntNumProbHH = 0;
	$scope.crntNumProbMMHH = 0;
	$scope.totalProbb = 0;


	$scope.crntProbWorking = false;
	$scope.crntProbCorrect = false;

	$scope.probMMDone =false;



	$scope.availProbbHH = 3;
  $scope.availProbbMM = 3;
  $scope.availProbbMMHH = 4;

	$scope.availProbb = 10;

	$scope.determinateValue = 0;

	$scope.items = [];

	$scope.quizValue={
		hour: 0,
		min: 0
	}
	$scope.hourQ = 0;
	$scope.minQ = 0;

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

		minArmDrag = Draggable.create("#minC", {
			type: "rotation", throwProps: true
		});
		hourArmDrag = Draggable.create("#hourC", {
			type: "rotation", throwProps: true
		});
		minArmDrag[0].disable();
		hourArmDrag[0].disable();
		TweenLite.to('.element.minute-line.whole', 1, {backgroundColor:"yellow"});
		updateNumProblems();
		reSolve();

	}, 500);

	$scope.startQuiz = function(quizCase, problemRe) {
		minArmDrag[0].enable();
		hourArmDrag[0].enable();
		$scope.crntTargetName = quizCase;
		var problem = {hh:0, mm:0};
		var index = _.findIndex($scope.problemSet, function(chr) {
			return chr.name == quizCase;
		});

		var probProp = $scope.problemSet[index];
		problem.hh = Math.floor((Math.random() * 12) + 1);
		problem.mm = Math.floor((Math.random() * 60) + 1);
		probProp.problems.push(problem);

		//console.log(problem);
		//console.log(probProp);

		if(problemRe !== undefined){
			$scope.reTrial = true;
			var randHour = problemRe.problem.hh;
			var randMin = problemRe.problem.hh;
			quizCase = problemRe.problem.game;
		}
		else{
			var randHour = Math.floor((Math.random() * 12) + 1);
			var randMin = Math.floor((Math.random() * 60) + 1);
		}

		var clock = document.querySelector('#utility-clock');
		var hourElement = clock.querySelector('.hour');
		var minuteElement = clock.querySelector('.minute');

		var rotate = function(element, second) {
			//console.log(second*6);
			TweenLite.to(element, 2.5, {rotation:second * 6});
		}

		if(quizCase == 'mm'){
			//$scope.crntNumProbMM++;
			//$scope.totalProbb++;
			var time = randHour * 3600 + randMin * 60;
			TweenLite.to('#minC', 1, {rotation:0});
			rotate(hourElement, time / 60 / 12);
		}
		else if(quizCase == 'hh'){
			//$scope.crntNumProbHH++;
			//$scope.totalProbb++;
			randMin = 0;
			TweenLite.to('#minC', 1, {rotation:0})
		}
		else if(quizCase == 'hm'){
			var h=10, m=10;
			var time = h * 3600 + m * 60;
			//$scope.crntNumProbMMHH++;
			//$scope.totalProbb++;
			rotate(hourElement, time / 60 / 12);
			rotate(minuteElement, time / 60)
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
			if(quizCase == 'mm'){
				$scope.mmWorking = false;
				$scope.hhWorking = false;
				$scope.mmhhWorking = false;}
			else if(quizCase == 'hh'){
				$scope.mmWorking = false;
				$scope.hhWorking = false;
				$scope.mmhhWorking = false;}
			else if(quizCase == 'hm'){
				$scope.mmWorking = false;
				$scope.hhWorking = false;
				$scope.mmhhWorking = false;
			}
			startTimer();
			$scope.removeTiles();
			$scope.crntProbWorking=true;
		}, function() {
			$scope.alert = 'You decided to keep your debt.';
		});
	};


	$scope.submitAnswer = function(ev){

		$scope.getCurrentHour();
		if($scope.crntTry > 1){
			$scope.crntTry--;
			var quizContent = ''
			if($scope.hh == $scope.hourQ && $scope.mm == $scope.minQ){
				minArmDrag[0].disable();
				hourArmDrag[0].disable();
				quizContent = '정답입니다.';
				$scope.crntTry = 3;
				$scope.crntProbCorrect = true;
				$scope.mmWorking = true;
				$scope.hhWorking = true;
				$scope.mmhhWorking = true;
				var name = '';
				if($scope.crntTargetName == 'hh'){
					name=' 시침';
				}
				else if($scope.crntTargetName == 'mm'){
					name=' 분침';
				}
				else if($scope.crntTargetName == 'hm'){
					name=' 시침분침';
				}

				if(!$scope.reTrial){
					notify.push({ name: name, icon: correct, class: correctStyle, problem:{game: $scope.crntTargetName, num:$scope.totalProbb, hh:$scope.hourQ, mm:$scope.minQ}});
					updateNumProblems();
				}
				else{
					notify.updateProblem($scope.reProblem, $scope.reProblemIndex);
					$state.go('watch-game');
				}

				$scope.crntProbWorking=false;
				$scope.removeTiles();
				$interval.cancel(stop);
				stop = undefined;
				// End Game 1
				if($scope.totalProbb==numTotalGame){
					$scope.mmWorking = false;
					$scope.hhWorking = false;
					$scope.mmhhWorking = false;
					gameStatus.changeStatus('game1');
					var remainGame = gameStatus.getGamesNotDone();
					if(remainGame.length > 0)
						console.log(remainGame);
						//$scope.goNextGame();
				}
			}
			else{
				quizContent = '틀렸습니다.'+$scope.hh +'시'+ $scope.mm + '분은 오답입니다.('+$scope.crntTry+'기회가 남았습니다.)';
			}
			$scope.showSimpleToast(quizContent);
		}
		else{
			minArmDrag[0].disable();
			hourArmDrag[0].disable();
			$scope.crntProbWorking=false;
			$scope.removeTiles();
			var name = '';
			if($scope.crntTargetName == 'hh'){
				name=' 시침';
			}
			else if($scope.crntTargetName == 'mm'){
				name=' 분침';
			}
			else if($scope.crntTargetName == 'hm'){
				name=' 시침분침';
			}
			if(!$scope.reTrial){
				notify.push({ name: name, icon: wrong, class: wrongStyle, problem:{game: $scope.crntTargetName, num:$scope.totalProbb, hh:$scope.hourQ, mm:$scope.minQ}});
				updateNumProblems();

			}
			else{
				$state.go('watch-game');
			}
			$scope.items.push({ name: '문제'+$scope.totalProbb, icon: wrong, class: wrongStyle});
			//$scope.mmWorking = true;
			//$scope.hhWorking = true;
			//$scope.mmhhWorking = true;
			$scope.crntTry = 3;
			// End Game 1
			$interval.cancel(stop);
			stop = undefined;
			if($scope.totalProbb==numTotalGame){
				$scope.mmWorking = false;
				$scope.hhWorking = false;
				$scope.mmhhWorking = false;
				gameStatus.changeStatus('game1');
				var remainGame = gameStatus.getGamesNotDone();
				if(remainGame.length > 0)
					console.log(remainGame);
					//$scope.goNextGame();
			}
		}
	};

	$scope.goNextGame = function(){
		var quizResult = '몇 시 몇 분! 퀴즈를 시작합니다.';
		var confirm = $mdDialog.confirm()
			.title('시침이와 분침이를 돌려라가 끝났습니다.')
			.content(quizResult)
			.ok('계속하기');

		$mdDialog.show(confirm).then(function() {
			$state.go('watch-game2');
		}, function() {
			$scope.alert = 'You decided to keep your debt.';
		});
	};



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
		//console.log("update size");
		var update = function() {
			var parent = $('.fill');
			var scale = Math.min(parent.outerWidth(), parent.outerHeight()) / nativeSize;
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
		//console.log('hour: '+ hourDeg + 'min: '+minDeg)
		TweenLite.to("#hourC", 5, {rotation:hourDeg})
		TweenLite.to("#minC", 5, {rotation:minDeg})
	}

	$scope.getCurrentHour = function(){
		var hourDeg = getDegreeCrnt('hourC');
		var minDeg = getDegreeCrnt('minC');
		var hour = 0;
		var min= 0;
		//console.log('time');
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

		//console.log("hourDeg: "+ hourDeg + " minDeg: "+minDeg);
		//console.log("hour: "+ hour + " min: "+min);

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

		var values = tr.split('(')[1].split(')')[0].split(',');
		var a = values[0];
		var b = values[1];
		var c = values[2];
		var d = values[3];

		var scale = Math.sqrt(a*a + b*b);
		var sin = b/scale;
		var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

		return angle;
	}



	$scope.showGridBottomSheet = function($event) {
		//console.log('d');
		$mdBottomSheet.show({
			templateUrl: 'modules/etc/template/gridBottom.html',
			controller: 'GridCtrl',
			preserveScope: true,
			targetEvent: $event
		}).then(function(clickedItem) {
		});
	};
	$scope.zoom = function(op){
		var cs = $('.centre').children();
		if(op=="in") {TweenLite.to(cs, 1, {scale:'+=.1'});}
		else {TweenLite.to(cs, 1, {scale:'-=.1'});}
	}

	$scope.goTo = function(name){
		$state.go(name);
		//console.log(name);
	}

	$scope.menu = function(name){
		if(name="start")
			$scope.startQuiz();
	};

	var startTimer = function(){
		$scope.determinateValue = 0;
		stop = $interval(function() {
			$scope.determinateValue += 1;
			if ($scope.determinateValue >= 100) {

				if($scope.crntTry > 1){
					$scope.crntTry--;
					var quizContent = '시간초과 입니다.('+$scope.crntTry+'기회가 남았습니다.)';
					$scope.showSimpleToast(quizContent);
					$scope.determinateValue = 0;

				}else{
					$scope.crntTry=3;
					$scope.determinateValue = 100;
					minArmDrag[0].disable();
					hourArmDrag[0].disable();
					$scope.crntProbWorking=false;
					$scope.removeTiles();

					var name = '';
					if($scope.crntTargetName == 'hh'){
						name=' 시침';
					}
					else if($scope.crntTargetName == 'mm'){
						name=' 분침';
					}
					else if($scope.crntTargetName == 'hm'){
						name=' 시침분침';
					}

					if(!$scope.reTrial){
						notify.push({ name: name, icon: wrong, class: wrongStyle, problem:{game: $scope.crntTargetName, num:$scope.totalProbb, hh:$scope.hourQ, mm:$scope.minQ}});
						updateNumProblems();
					}
					else{
						$state.go('watch-game');
					}

					$scope.items.push({ name: '문제'+$scope.totalProbb, icon: wrong, class: wrongStyle});
					$scope.mmWorking = true;
					$scope.hhWorking = true;
					$scope.mmhhWorking = true;

					if($scope.totalProbb==numTotalGame){
						$scope.mmWorking = false;
						$scope.hhWorking = false;
						$scope.mmhhWorking = false;
						gameStatus.changeStatus('game1');
						var remainGame = gameStatus.getGamesNotDone();
						if(remainGame.length > 0){
							console.log(remainGame);
						}
						else{
							console.log('done');
						}
					}
					$interval.cancel(stop);
					stop = undefined;
				}
			}
		}, 300);
	};

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
	$scope.toastPosition = {
		bottom: false,
		top: true,
		left: true,
		right: false
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
	$scope.tiles=[1];
	$scope.removeTiles=function(){
		$scope.tiles.pop();
		$timeout(function(){
			$scope.tiles.push(1);
		}, 100);

	}
	var reSolve = function(){
		var currentState = $state.current.name;
		if(currentState === 'watch-game-re'){
			var problemReIndex = $stateParams.problemId;
			console.log('!!!!!!!');
			console.log(problemReIndex);
			var targetProblem = notify.getProblem(problemReIndex);
			$scope.reProblemIndex = problemReIndex;
			$scope.reProblem = targetProblem;

			$scope.startQuiz(targetProblem.problem.game,targetProblem);
		};
	}
	var updateNumProblems = function(){
		var numProblems = notify.getProblemsNum();
		$scope.crntNumProbMM = numProblems.mm;
		$scope.crntNumProbHH = numProblems.hh;
		$scope.crntNumProbMMHH = numProblems.hm;
		$scope.totalProbb = numProblems.mm + numProblems.hh + numProblems.hm;

		$scope.availProbbHH = 3;
		$scope.availProbbMM = 3;
		$scope.availProbbMMHH = 4;

		if($scope.totalProbb < numTotalGame){
			$scope.mmWorking = true;
			$scope.hhWorking = true;
			$scope.mmhhWorking = true;
			if($scope.crntNumProbHH === $scope.availProbbMM){
				$scope.hhWorking = false;
			}
			else if($scope.crntNumProbMM === $scope.availProbbMM){
				$scope.mmWorking = false;
			}
			else if($scope.crntNumProbMMHH === $scope.availProbbMM){
				$scope.mmhhWorking = false;
			}
		}
		else{ // game1 done
			$scope.mmWorking = false;
			$scope.hhWorking = false;
			$scope.mmhhWorking = false;
			$scope.isDone = true;
			$scope.removeTiles();

			if(gameStatus.getGamesNotDone().length !== 0)
				$scope.goNextGame();
		}
	}
}
