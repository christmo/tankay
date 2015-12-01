'use strict';

angular.module('mean.home')
    .factory('Home', ['$resource',
        function ($resource) {
            return $resource('/api/home/query', {
                lote: '@lote'
            });
        }
    ])
    .factory('DeleteLote', ['$resource',
        function ($resource) {
            return $resource('/api/home/delete', {
                lote: '@lote'
            }, {
                delete: {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
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
    //----------------------------------------------------------------------
    // Permite compartir los filtros de las graficas para llamarlos de todos
    // los lugares para refrescar las graficas
    //----------------------------------------------------------------------
    .service('chartsFilter', function () {
        var filter = {};

        return {
            getFilter: function () {
                return filter;
            },
            setFilter: function (value) {
                filter = value;
            }
        };
    });


/**
 * Grafica de Empaquetado, esta es la segunda grafica mostrada en el dashboard
 * @returns data -> retorna los datos de la grafica
 */
function empacadoGraph() {
    var element = angular.element(".flot-chart-empacado");
    var factory = element.injector().get('DataEmpacadoGraph');
    var chartsFilter = element.injector().get('chartsFilter');

    var data = factory.query(chartsFilter.getFilter(), function () {
        var serie = [];

        for (var row in data) {
            if (data[row].packed_date) {
                serie.push([moment(data[row].packed_date).startOf('day').toDate().getTime(), data[row].fruit_flow]);
            }
        }

        draw(serie, element, chartsFilter.getFilter());
    });

    return data;
}


/**
 * Grafica de Acopio, esta es la primera grafica mostrada en el dashboard
 * @returns data -> retorna los datos de la grafica
 */
function acopioGraph() {
    var element = angular.element(".flot-chart");
    var factory = element.injector().get('DataAcopioGraph');
    var chartsFilter = element.injector().get('chartsFilter');

    var data = factory.query(chartsFilter.getFilter(), function () {
        var serie = [];

        for (var row in data) {
            if (data[row].start_date) {
                serie.push([moment(data[row].start_date).toDate().getTime(), data[row].capacity]);
            }
        }

        draw(serie, element, chartsFilter.getFilter());
    });

    return data;
}
