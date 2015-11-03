'use strict';

angular.module('mean.acopio')
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('acopio', {
                url: '/acopio',
                templateUrl: 'acopio/views/index.html'
            });
        }
    ]);
