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
