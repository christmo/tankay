'use strict';

/* jshint -W098 */
angular.module('mean.almacenado')
    .controller('AlmacenadoController', ['$scope', 'Global', 'Almacenado','$location', 'errorMessage',
        function ($scope, Global, Almacenado,$location, errorMessage) {

            var id = $location.search().empacado;

            $scope.almacenado = {
                humidity_control:0,
                temperature:0,
                dehumidifier:0,
                fourth_aroma:0,
                packing_list:0,
                id:id
            };

            $scope.global = Global;
            $scope.package = {
                name: 'Almacenado'
            };

            $scope.save = function () {
                var almacenado = new Almacenado($scope.almacenado);

                almacenado.$save(function (response) {
                    if (response.status === 'OK') {
                        $location.path('/').search('almacenado',$scope.almacenado.id);
                        $scope.almacenado = {};
                    } else {
                        errorMessage.show(true, response.msg);
                        $scope.error = response.error;
                        //$location.path('/almacenado');
                    }
                });

            };
        }
    ]);
