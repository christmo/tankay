'use strict';

angular.module('mean.home').factory('Home', ['$resource',
    function ($resource) {
        return $resource('/api/home/query', {
            lote: '@lote'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
