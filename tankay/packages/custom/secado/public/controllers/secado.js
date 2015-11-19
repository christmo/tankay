'use strict';

/* jshint -W098 */
angular.module('mean.secado')
    .controller('SecadoController', ['$scope', 'Global', 'Secado', '$location', 'errorMessage', 'updateBar',
        'SecadoQuery', '$filter',
        function ($scope, Global, Secado, $location, errorMessage, updateBar, SecadoQuery,$filter) {

            var params = $location.search();
            var id = params.clasification;

            if (params.query) {
                var drying = SecadoQuery.get({lote: id},
                    function () {
                        $scope.secado = drying;
                        $scope.secado.drying_time = $filter('number')($scope.secado.drying_time,2);
                        $scope.updateBarFruitFlowSecado(drying.fruit_flow);
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
                $scope.secado = {
                    air_flow: 0,
                    hot_air_control: 0,
                    humidity_control: 0,
                    temperature: 0,
                    id: id
                };
            }

            $scope.global = Global;
            $scope.package = {
                name: 'Secado'
            };

            $scope.save = function () {
                var secado = new Secado($scope.secado);

                secado.$save(function (response) {
                    if (response.status === 'OK') {
                        $location.path('/empacado').search('secado', $scope.secado.id);
                        $scope.secado = {};
                    } else {
                        errorMessage.show(true, response.msg);
                        $scope.error = response.error;
                        //$location.path('/secado');
                    }
                });

            };

            $scope.anterior = function () {
                if($scope.secado.id) {
                    $location.path('/clasificacion')
                        .search('lote', $scope.secado.id)
                        .search('query', true);
                    $scope.secado = {};
                }
            };

            $scope.siguiente = function () {
                if($scope.secado.id) {
                    $location.path('/empacado')
                        .search('secado', $scope.secado.id)
                        .search('query', true);
                    $scope.secado = {};
                }
            };

            $scope.updateBarFruitFlowSecado = function (fruit_flow) {
                var max = 5000;
                var meta = 3000;
                var lim_low = 1000;
                var bar = {read: fruit_flow};
                bar = updateBar.progress(max, meta, lim_low, bar);

                $scope.maxFlow = max;
                $scope.showWarning = bar.showWarning;
                $scope.dynamicFlow = bar.dynamic;
                $scope.typeFlow = bar.type;
            };
        }
    ]);
