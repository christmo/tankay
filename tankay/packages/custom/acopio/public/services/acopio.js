'use strict';

angular.module('mean.acopio')
    .factory('Acopio', ['$resource',
        function($resource) {
            return $resource('/api/acopio/step-1/save', {
                lote: '@lote'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }
    ]);
