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
