'use strict';

/* jshint -W098 */
angular.module('mean.acopio')
    .controller('AcopioController', ['$scope', 'Global', 'Acopio', '$location',
        function ($scope, Global, Acopio, $location) {

            $scope.lote = {
                start_date: new Date(),
                start_time: new Date(),
                presion: 0,
                temperature: 0
            };

            $scope.global = Global;
            $scope.package = {
                name: 'Centro de Acopio'
            };

            $scope.save = function () {
                var lote = new Acopio($scope.lote);

                lote.$save(function (response) {
                    if (response.status === 'OK') {
                        $location.path('/clasificacion').search('lote',$scope.lote.lote);
                        $scope.lote = {};
                    } else {
                        $scope.error = response.error;
                        $location.path('/acopio');
                    }
                });

            };

        }

    ]);
