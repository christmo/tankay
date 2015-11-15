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
    .factory('Graph', ['$resource',
        function ($resource) {
            return $resource('/api/home/graph');
        }
    ])
    .factory('updateChart', [function () {

        return {
            filter: function (scope,element){
                var factory = element.injector().get('Graph');

                var data = factory.query(scope.filter, function () {
                    var serie = [];

                    for (var row in data) {
                        if (data[row].start_date) {
                            serie.push([moment(data[row].start_date).toDate().getTime(), data[row].capacity]);
                        }
                    }

                    draw(serie, element,scope.filter);
                });

                return data;
            }
        };
    }]);
