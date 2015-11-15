'use strict';

angular.module('mean.home')
    // =========================================================================
    // Curved Line Chart
    // =========================================================================

    .directive('graph', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var updateChart = element.injector().get('updateChart');
                updateChart.filter(scope,element);
            }
        }
    });
/*.directive('curvedlineChart',
 function () {
 return {
 restrict: 'A',
 link: function (scope, element, attrs) {

 console.log(getDataFn().hola);

 var d1 = [];
 var d2 = [];
 var d3 = [];

 for (var i = 0; i <= 10; i += 1) {
 d1.push([i, parseInt(Math.random() * 30)]);
 }

 for (var i = 0; i <= 20; i += 1) {
 d2.push([i, parseInt(Math.random() * 30)]);
 }

 for (var i = 0; i <= 10; i += 1) {
 d3.push([i, parseInt(Math.random() * 30)]);
 }


 var serie = [];

 scope.lotes.$promise.then(function (data) {
 for (var lote in data) {
 if (data.hasOwnProperty(lote)) {
 if (data[lote].start_date) {
 if (data[lote].capacity) {

 console.log(moment(data[lote].start_date).toDate().getTime(), data[lote].capacity);

 serie.push([moment(data[lote].start_date).toDate().getTime(), data[lote].capacity]);
 } else {
 serie.push([moment(data[lote].start_date).toDate().getTime(), 0]);
 }
 } else {
 if (data[lote].capacity) {
 serie.push([0, data[lote].capacity]);
 } else {
 serie.push([0, 0]);
 }
 }
 }
 }
 scope.draw(serie);
 });


 scope.draw = function (serie) {
 var dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

 var options = {
 series: {
 shadowSize: 5
 },
 xaxes: [{
 mode: "time",
 tickFormatter: function (val, axis) {
 return dayOfWeek[new Date(val).getDay()];
 },
 color: "black",
 position: "top",
 axisLabel: "Day of week",
 axisLabelUseCanvas: true,
 axisLabelFontSizePixels: 12,
 axisLabelFontFamily: 'Verdana, Arial',
 axisLabelPadding: 5
 },
 {
 mode: "time",
 timeformat: "%m/%d",
 tickSize: [3, "day"],
 color: "black",
 axisLabel: "Date",
 axisLabelUseCanvas: true,
 axisLabelFontSizePixels: 12,
 axisLabelFontFamily: 'Verdana, Arial',
 axisLabelPadding: 10
 }],
 yaxis: {
 color: "black",
 tickDecimals: 2,
 axisLabel: "Gold Price  in USD/oz",
 axisLabelUseCanvas: true,
 axisLabelFontSizePixels: 12,
 axisLabelFontFamily: 'Verdana, Arial',
 axisLabelPadding: 5
 },
 legend: {
 noColumns: 0,
 labelFormatter: function (label, series) {
 return "<font color=\"white\">" + label + "</font>";
 },
 backgroundColor: "#000",
 backgroundOpacity: 0.9,
 labelBoxBorderColor: "#000000",
 position: "nw"
 },
 grid: {
 hoverable: true,
 clickable: true
 }
 /*grid: {
 hoverable: true,
 borderWidth: 3,
 mouseActiveRadius: 50,
 backgroundColor: {colors: ["#ffffff", "#EDF5FF"]},
 axisMargin: 20
 }*/
//};*/

/* Chart Options */
//var options = {
//    /*series: {
//        shadowSize: 0,
//        curvedLines: { //This is a third party plugin to make curved lines
//            apply: true,
//            active: true,
//            monotonicFit: true
//        },
//        lines: {
//            show: false,
//            lineWidth: 0
//        }
//    },*/
//    lines: { show: true },
//    points: { fillColor: "#0062E3", show: true },
//    /*grid: {
//        borderWidth: 0,
//        labelMargin: 10,
//        hoverable: true,
//        clickable: true,
//        mouseActiveRadius: 6
//
//                    //    },
//                    //    xaxis: {
//                    //        tickDecimals: 0,
//                    //        ticks: false
//                    //    },*/
//                    //    xaxis: {
//                    //        mode: "time",
//                    //        min: (new Date(2015, 10, 1)).getTime(),
//                    //        max: (new Date(2015, 10, 20)).getTime()
//                    //    },
//
//    yaxis: {
//        tickDecimals: 0,
//        ticks: false
//    },
//
//    legend: {
//        show: false
//    }
//};

/* Let's create the chart */

/*  $.plot($(element), [
 //{data: d1, lines: {show: true, fill: 0.98}, label: 'Product 1', stack: true, color: '#e3e3e3'},
 //{data: d3, lines: {show: true, fill: 0.98}, label: 'Product 2', stack: true, color: '#f1dd2c'},
 {
 data: serie,
 lines: {show: true, fill: 0.98},
 label: 'Product 2',
 stack: true,
 color: '#f1dd2c'
 }
 ], options);*/

/* Tooltips for Flot Charts */
/*
 if ($(".flot-chart")[0]) {
 $(".flot-chart").bind("plothover", function (event, pos, item) {
 if (item) {
 var x = item.datapoint[0].toFixed(2),
 y = item.datapoint[1].toFixed(2);
 $(".flot-tooltip").html(item.series.label + " of " + x + " = " + y).css({
 top: item.pageY + 5,
 left: item.pageX + 5
 }).show();
 }
 else {
 $(".flot-tooltip").hide();
 }
 });

 $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body");
 }
 };

 }
 }
 }
 );*/


function draw(serie, element,filter) {
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
        }
    };

    var data = [
        {
            data: serie,
            lines: {show: true, fill: 0.50},
            label: 'Producción Día',
            stack: true,
            color: '#f1dd2c'
        }
    ];

    $.plot($(element), data, options);

    window.onresize = function(event) {
        $.plot($(element), data, options);
    };


    if ($(element)[0]) {
        $(element).bind("plothover", function (event, pos, item) {
            if (item) {
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);
                $(".flot-tooltip").html(item.series.label + " of " + x + " = " + y).css({
                    top: item.pageY + 5,
                    left: item.pageX + 5
                }).show();
            }
            else {
                $(".flot-tooltip").hide();
            }
        });

        $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body");
    }

}
