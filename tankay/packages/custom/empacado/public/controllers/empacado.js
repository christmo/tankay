'use strict';

/* jshint -W098 */
angular.module('mean.empacado')
    .controller('EmpacadoController', ['$scope', 'Global', 'Empacado', '$location',
        function ($scope, Global, Empacado, $location) {

            $scope.secado = {
                temperature:0
            };

            $scope.global = Global;
            $scope.package = {
                name: 'Empacado'
            };

            $scope.save = function () {
                var empacado = new Empacado($scope.empacado);

                empacado.$save(function (response) {
                    if (response.status === 'OK') {
                        $location.path('/almacenado');
                        $scope.empacado = {};
                    } else {
                        $scope.error = response.error;
                        $location.path('/empacado');
                    }
                });

            };
        }
    ]);
