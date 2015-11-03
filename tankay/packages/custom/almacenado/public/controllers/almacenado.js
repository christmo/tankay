'use strict';

/* jshint -W098 */
angular.module('mean.almacenado')
    .controller('AlmacenadoController', ['$scope', 'Global', 'Almacenado','$location',
        function ($scope, Global, Almacenado,$location) {

            $scope.almacenado = {
                temperature:0
            };

            $scope.global = Global;
            $scope.package = {
                name: 'Almacenado'
            };

            $scope.save = function () {
                console.log($scope.almacenado);
                var almacenado = new Almacenado($scope.almacenado);

                almacenado.$save(function (response) {
                    console.log(response);
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
