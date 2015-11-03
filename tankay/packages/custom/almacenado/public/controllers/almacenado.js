'use strict';

/* jshint -W098 */
angular.module('mean.almacenado')
    .controller('AlmacenadoController', ['$scope', 'Global', 'Almacenado','$location',
        function ($scope, Global, Almacenado,$location) {

            $scope.almacenado = {
                humidity_control:0,
                temperature:0,
                dehumidifier:0,
                fourth_aroma:0,
                packing_list:0
            };

            $scope.global = Global;
            $scope.package = {
                name: 'Almacenado'
            };

            $scope.save = function () {
                var almacenado = new Almacenado($scope.almacenado);

                almacenado.$save(function (response) {
                    if (response.status === 'OK') {
                        $location.path('/');
                        $scope.almacenado = {};
                    } else {
                        $scope.error = response.error;
                        $location.path('/almacenado');
                    }
                });

            };
        }
    ]);
