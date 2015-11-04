'use strict';

/* jshint -W098 */
angular.module('mean.secado')
    .controller('SecadoController', ['$scope', 'Global', 'Secado', '$location',
        function ($scope, Global, Secado, $location) {

            var id = $location.search().clasification;

            $scope.secado = {
                air_flow: 0,
                hot_air_control: 0,
                humidity_control: 0,
                temperature:0,
                id: id
            };

            $scope.global = Global;
            $scope.package = {
                name: 'Secado'
            };

            $scope.save = function () {
                var secado = new Secado($scope.secado);

                secado.$save(function (response) {
                    if (response.status === 'OK') {
                        $location.path('/empacado').search('secado',$scope.secado.id);
                        $scope.secado = {};
                    } else {
                        $scope.error = response.error;
                        $location.path('/secado');
                    }
                });

            };
        }
    ]);
