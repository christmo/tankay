'use strict';

angular.module('mean.home')
    .factory('Home', ['$resource',
        function ($resource) {
            return $resource('/api/home/query', {
                lote: '@lote'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }
    ])
    .factory('DataAcopioGraph', ['$resource',
        function ($resource) {
            return $resource('/api/home/graph/acopio');
        }
    ])
    .factory('DataEmpacadoGraph', ['$resource',
        function ($resource) {
            return $resource('/api/home/graph/empacado');
        }
    ])
    .factory('updateChartAcopio', [function () {

        return {
            filter: function (scope, element) {
                var data = {};
                if (element.prop('class') === 'flot-chart') {
                    data = acopioGraph(scope,element);
                } else {
                    data = empacadoGraph(scope,element);
                }

                return data;
            }
        };
    }])
    .factory('updateChartEmpacado', [function () {

        return {
            getData: function (scope, element) {
                var data = empacadoGraph(scope,element);
                return data;
            }
        };
    }]);


function empacadoGraph(scope,element) {
    var factory = element.injector().get('DataEmpacadoGraph');

    var data = factory.query(scope.filter, function () {
        var serie = [];

        for (var row in data) {
            if (data[row].createdAt) {
                serie.push([moment(data[row].createdAt).startOf('day').toDate().getTime(), data[row].fruit_flow]);
            }
        }

        draw(serie, element, scope.filter);
    });

    return data;
}

function acopioGraph(scope,element){
    var factory = element.injector().get('DataAcopioGraph');

    var data = factory.query(scope.filter, function () {
        var serie = [];

        for (var row in data) {
            if (data[row].start_date) {
                serie.push([moment(data[row].start_date).toDate().getTime(), data[row].capacity]);
            }
        }

        draw(serie, element, scope.filter);
    });

    return data;
}
