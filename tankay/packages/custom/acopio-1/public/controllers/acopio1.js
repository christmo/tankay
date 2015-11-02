'use strict';

/* jshint -W098 */
angular.module('mean.acopio-1')
    .controller('Acopio1Controller', ['$scope', 'Global', 'Acopio1',
        function ($scope, Global, Acopio1) {
            $scope.global = Global;
            $scope.package = {
                name: 'Centro de Acopio'
            };

            $scope.save = function(){
                console.log($scope.lote);
                var lote = new Acopio1($scope.lote);

                lote.$save(function(response) {
                    $location.path('articles/' + response.lote);
                });

                $scope.lote = {};
            }

        }

    ]);
