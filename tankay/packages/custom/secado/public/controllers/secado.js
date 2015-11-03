'use strict';

/* jshint -W098 */
angular.module('mean.secado')
    .controller('SecadoController', ['$scope', 'Global', 'Secado',
        function ($scope, Global, Secado) {
            $scope.global = Global;
            $scope.package = {
                name: 'Secado'
            };
        }
    ]);
