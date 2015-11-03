'use strict';

angular.module('mean.almacenado')
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('almacenado', {
                url: '/almacenado',
                templateUrl: 'almacenado/views/index.html'
            });
        }
    ]);
