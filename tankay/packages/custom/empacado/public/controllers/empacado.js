'use strict';

/* jshint -W098 */
angular.module('mean.empacado')
    .controller('EmpacadoController', ['$scope', 'Global', 'Empacado', '$location',
        function ($scope, Global, Empacado, $location) {

            var id = $location.search().secado;

            $scope.empacado = {
                temperature:0,
                id:id
            };

            $scope.global = Global;
            $scope.package = {
                name: 'Empacado'
            };

            $scope.save = function () {
                var empacado = new Empacado($scope.empacado);

                empacado.$save(function (response) {
                    if (response.status === 'OK') {
                        $location.path('/almacenado').search('empacado',$scope.empacado.id);
                        $scope.empacado = {};
                    } else {
                        $scope.error = response.error;
                        $location.path('/empacado');
                    }
                });

            };
        }
    ]);
