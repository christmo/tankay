'use strict';

angular.module('mean.secado')
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('secado', {
                url: '/secado',
                templateUrl: 'secado/views/index.html'
            });
        }
    ]);
