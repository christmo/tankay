'use strict';

angular.module('mean.home')
    // =========================================================================
    // Curved Line Chart
    // =========================================================================

    .directive('graph', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var updateChartAcopio = element.injector().get('updateChartAcopio');
                updateChartAcopio.filter(scope, element);
            }
        }
    })
    .directive('graphEmpacado', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $(window).load(function() {
                    var updateChartEmpacado = element.injector().get('updateChartEmpacado');
                    updateChartEmpacado.getData(scope, element);
                });
            }
        }
    });

function draw(serie, element, filter) {
    var options = {
        lines: {show: true},
        points: {fillColor: "#0062E3", show: true},
        /*xaxis: { mode: "time" }*/
        xaxis: {
            mode: "time",
            timeformat: "%m/%d",
            minTickSize: [1, "day"],
            min: filter.start_date,
            max: filter.end_date,
            timezone: "browser"
        },
        grid: {
            hoverable: true,
            clickable: false
        },
        legend: {
            /*backgroundOpacity: 0.5,
             noColumns: 0,
             backgroundColor: "green",*/
            position: 'se'
        }
    };

    var data = [
        {
            data: serie,
            lines: {show: true, fill: 0.50},
            label: 'Producción Día',
            stack: true,
            color: '#f1dd2c',
            curvedLines: { //This is a third party plugin to make curved lines
                apply: true,
                active: true,
                monotonicFit: true
            }
        }
    ];

    $.plot($(element), data, options);

    window.onresize = function (event) {
        $.plot($(element), data, options);
    };

    if ($(element)[0]) {
        $(element).bind("plothover", function (event, pos, item) {
            if (item) {
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);
                $(".flot-tooltip")
                    .html(item.series.label + ' ' + moment(item.datapoint[0]).format('YYYY/MM/DD') + ': ' + y + ' Kg')
                    .css({
                        top: item.pageY + 5,
                        left: item.pageX + 5
                    })
                    .show();

            }
            else {
                $(".flot-tooltip").hide();
            }
        });
        if ($(".flot-tooltip")[0] === undefined) {
            $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body");
        }
    }

}
