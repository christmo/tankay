'use strict';

angular.module('mean.clasificacion')
    .factory('Clasificacion', ['$resource',
        function($resource) {
            return $resource('/api/clasificacion/step-2/save', {
                lote: '@lote'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }
    ]);
