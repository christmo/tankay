'use strict';

/* jshint -W098 */
angular.module('mean.clasificacion')
    .controller('ClasificacionController', ['$scope', 'Global', 'Clasificacion', '$location',
        function ($scope, Global, Clasificacion, $location) {

            var lote = $location.search().lote;

            $scope.clasification = {
                presion: 0,
                temperature: 0,
                light:0,
                id_clasification:lote.lote
            };

            $scope.global = Global;
            $scope.package = {
                name: 'Clasificación'
            };

            $scope.save = function () {
                var clasificacion = new Clasificacion($scope.clasification);

                clasificacion.$save(function (response) {
                    console.log(response);
                    if (response.status === 'OK') {
                        $location.path('/secado').search('clasification',$scope.clasification);
                        $scope.clasification = {};
                    } else {
                        $scope.error = response.error;
                        $location.path('/clasificacion');
                    }
                });

            };

        }
    ]);
