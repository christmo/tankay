'use strict';

angular.module('mean.secado')
    .factory('Secado', ['$resource',
        function($resource) {
            return $resource('/api/secado/step-3/save', {
                lote: '@lote'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }
    ]);
