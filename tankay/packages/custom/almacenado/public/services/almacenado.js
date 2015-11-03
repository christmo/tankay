'use strict';

angular.module('mean.almacenado')
    .factory('Almacenado', ['$resource',
        function($resource) {
            return $resource('/api/almacenado/step-5/save', {
                lote: '@lote'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }
    ]);
