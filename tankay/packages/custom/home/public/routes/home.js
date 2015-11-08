'use strict';

angular.module('mean.home')
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('dash', {
                    url: '/home',
                    templateUrl: 'home/views/index.html'
                });
        }
    ]);
