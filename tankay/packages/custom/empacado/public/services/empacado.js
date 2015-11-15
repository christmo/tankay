'use strict';

angular.module('mean.empacado')
    .factory('Empacado', ['$resource',
        function($resource) {
            return $resource('/api/empacado/step-4/save', {
                lote: '@lote'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }
    ])
    .factory('EmpacadoQuery', ['$resource',
        function ($resource) {
            return $resource('/api/empacado/step-4/:lote');
        }
    ]);
