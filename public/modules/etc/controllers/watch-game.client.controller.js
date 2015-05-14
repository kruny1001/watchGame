'use strict';

angular.module('etc').controller('WatchGameController', WatchGameController);

function WatchGameController($scope, $timeout, $mdDialog, $state, $mdToast, $mdBottomSheet, $interval) {

	var wrong = 'modules/core/img/svg/android-close.svg';
	var correct = 'modules/core/img/svg/android-radio-button-off.svg';
	var notYet = 'modules/core/img/svg/android-checkbox-outline-blank.svg';
	var correctStyle = 'correctProblem';
	var wrongStyle = 'wrongProblem';

	var clock = document.querySelector('#utility-clock');
	$scope.mmWorking = true;
	$scope.hhWorking = true;
	$scope.mmhhWorking = true;
	var crntTry = 3;
	$scope.crntProbCorrect = false;

	$scope.crntNumProbMM = 0;
	$scope.crntNumProbHH = 0;
	$scope.crntNumProbMMHH = 0;
	$scope.totalProbb = 0;
	$scope.availProbb = 10;
	$scope.determinateValue = 0;
	$scope.items = [];
	$scope.hourQ = 0;
	$scope.minQ = 0;


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
			$scope.mmWorking = true;
			$scope.hhWorking = false;
			$scope.mmhhWorking = false;

			$scope.crntNumProbMM++;
			$scope.totalProbb++;
			var time = randHour * 3600;
			console.log(randHour, randMin);
			TweenLite.to('#minC', 1, {rotation:0})
			rotate(hourElement, time / 60 / 12);
		}
		else if(quizCase == 'hh'){
			$scope.mmWorking = false;
			$scope.hhWorking = true;
			$scope.mmhhWorking = false;

			$scope.crntNumProbHH++;
			$scope.totalProbb++;
			randMin = 0;
			TweenLite.to('#minC', 1, {rotation:0})
		}
		else if(quizCase == 'hm'){
			$scope.mmWorking = false;
			$scope.hhWorking = false;
			$scope.mmhhWorking = true;

			$scope.crntNumProbMMHH++;
			$scope.totalProbb++;
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
		$scope.getCurrentHour();
		if(crntTry > 1){
			crntTry--;
			var quizContent = ''
			if($scope.hh == $scope.hourQ && $scope.mm == $scope.minQ){
				quizContent = '정답입니다.';
				crntTry = 3;
				$scope.crntProbCorrect = true;
				$scope.mmWorking = true;
				$scope.hhWorking = true;
				$scope.mmhhWorking = true;
				$scope.items.push({ name: '문제', icon: correct, class: correctStyle});
			}
			else{
				quizContent = '틀렸습니다.'+$scope.hh +'시'+ $scope.mm + '분은 오답입니다.('+crntTry+'기회가 남았습니다.)';
			}
			$scope.showSimpleToast(quizContent);
		}
		else{
			$scope.items.push({ name: '문제'+$scope.totalProbb, icon: wrong, class: wrongStyle});
			$scope.mmWorking = true;
			$scope.hhWorking = true;
			$scope.mmhhWorking = true;
		}
	};

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

	$scope.listItemClick = function($index) {
		var clickedItem = $scope.items[$index];
		$mdBottomSheet.hide(clickedItem);
	};

	$scope.showGridBottomSheet = function($event) {
		console.log('d');
		$mdBottomSheet.show({
			templateUrl: 'modules/etc/template/gridBottom.html',
			controller: 'WatchGameController',
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
		console.log(name);
	}

	$scope.menu = function(name){
		if(name="start")
			$scope.startQuiz();
	};

	var startTimer = function(){
		$scope.determinateValue = 0;
		$interval(function() {
			$scope.determinateValue += 1;
			if ($scope.determinateValue >= 100) {
				$scope.determinateValue = 100;
			}
		}, 300, 0, true);
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

}
