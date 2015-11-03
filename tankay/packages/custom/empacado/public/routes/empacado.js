'use strict';

angular.module('mean.empacado')
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('empacado', {
                url: '/empacado',
                templateUrl: 'empacado/views/index.html'
            });
        }
    ]);
