'use strict';

/* jshint -W098 */
angular.module('mean.almacenado')
    .controller('AlmacenadoController', ['$scope', 'Global', 'Almacenado', '$location', 'errorMessage',
        'AlmacenadoQuery',
        function ($scope, Global, Almacenado, $location, errorMessage, AlmacenadoQuery) {

            var params = $location.search();
            var id = params.empacado;

            if (params.query) {
                var storing = AlmacenadoQuery.get({lote: id},
                    function () {
                        $scope.almacenado = storing;
                    });
                $scope.showButton = false;
                $scope.disabled = true;
            } else {
                $scope.disabled = false;
                if (id) {
                    $scope.hideMenu = false;
                    $scope.showButton = true;
                } else {
                    $scope.hideMenu = true;
                }
                $scope.almacenado = {
                    humidity_control: 0,
                    temperature: 0,
                    dehumidifier: 0,
                    fourth_aroma: 0,
                    packing_list: 0,
                    id: id
                };
            }

            $scope.global = Global;
            $scope.package = {
                name: 'Almacenado'
            };

            $scope.save = function () {
                var almacenado = new Almacenado($scope.almacenado);

                almacenado.$save(function (response) {
                    if (response.status === 'OK') {
                        $scope.siguiente();
                    } else {
                        errorMessage.show(true, response.msg);
                        $scope.error = response.error;
                    }
                });

            };

            $scope.anterior = function () {
                if(id) {
                    $location.path('/empacado')
                        .search('secado', id)
                        .search('query', true);
                    $scope.almacenado = {};
                }
            };

            $scope.siguiente = function () {
                $location.path('/home');
                $scope.almacenado = {};
            };
        }
    ]);
