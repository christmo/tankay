'use strict';

angular.module('mean.clasificacion')
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('clasificacion', {
                url: '/clasificacion',
                templateUrl: 'clasificacion/views/index.html',
                controller:function($stateParams){
                    console.log('Pasar');
                    console.log($stateParams);
                }
            });
        }
    ]);
