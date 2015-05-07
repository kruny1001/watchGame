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
]).controller('LeftCtrl12', function($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function() {
            $mdSidenav('left').close()
                .then(function(){
                    $log.debug("close LEFT is done");
                });
        };
    })
    .controller('RightCtrl11', function($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function() {
            $mdSidenav('right').close()
                .then(function(){
                    $log.debug("close RIGHT is done");
                });
        };
    });;
