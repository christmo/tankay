'use strict';

angular.module('mean.acopio-1')
    .factory('Acopio1', ['$resource',
        function($resource) {
            return $resource('step-1/save', {
                lote: '@lote'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }
    ]);
