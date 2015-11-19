'use strict';

/* jshint -W098 */
angular.module('mean.clasificacion')
    .controller('ClasificacionController', ['$scope', 'Global', 'Clasificacion', '$location', 'categories',
        'errorMessage', 'updateBar', 'ClasificacionQuery',
        function ($scope, Global, Clasificacion, $location, categories, errorMessage, updateBar, ClasificacionQuery) {

            $scope.selectCategory = categories.get();
            var params = $location.search();
            var lote = params.lote;

            if (params.query) {
                var clasification = ClasificacionQuery.get({lote: lote},
                    function () {
                        $scope.clasification = clasification;
                        $scope.updateBarPeeled(clasification.peeled_fruit);
                        $scope.updateBarClasified(clasification.clasified_fruit);
                        $scope.updateBarFruitFlow(clasification.fruit_flow);
                    });
                $scope.showButton = false;
                $scope.disabled = true;
            } else {
                $scope.disabled = false;
                if (lote) {
                    $scope.hideMenu = false;
                    $scope.showButton = true;
                } else {
                    $scope.hideMenu = true;
                }
                $scope.clasification = {
                    presion: 0,
                    temperature: 0,
                    light: 0,
                    id: lote
                };
            }

            $scope.global = Global;
            $scope.package = {
                name: 'Clasificación'
            };

            $scope.save = function () {
                var clasificacion = new Clasificacion($scope.clasification);

                clasificacion.$save(function (response) {
                    if (response.status === 'OK') {
                        $location.path('/secado').search('clasification', $scope.clasification.id);
                        $scope.clasification = {};
                    } else {
                        errorMessage.show(true, response.msg);
                        $scope.error = response.error;
                    }
                });

            };

            $scope.anterior = function () {
                $location.path('/acopio')
                    .search('lote', $scope.clasification.id)
                    .search('query', true);
                $scope.clasification = {};
            };

            $scope.siguiente = function () {
                $location.path('/secado')
                    .search('clasification', $scope.clasification.id)
                    .search('query', true);
                $scope.clasification = {};
            };

            $scope.updateBarPeeled = function (peeled_fruit) {
                var max = 500;
                var meta = 140;
                var lim_low = 50;
                var bar = {read: peeled_fruit};
                bar = updateBar.progress(max, meta, lim_low, bar);

                $scope.maxPeeled = max;
                $scope.showWarning = bar.showWarning;
                $scope.dynamicPeeled = bar.dynamic;
                $scope.typePeeled = bar.type;
            };
            $scope.updateBarClasified = function (clasified_fruit) {
                var max = 500;
                var meta = 120;
                var lim_low = 50;
                var bar = {read: clasified_fruit};
                bar = updateBar.progress(max, meta, lim_low, bar);

                $scope.maxClasified = max;
                $scope.showWarning = bar.showWarning;
                $scope.dynamicClasified = bar.dynamic;
                $scope.typeClasified = bar.type;
            };
            $scope.updateBarFruitFlow = function (fruit_flow) {
                var max = 5000;
                var meta = 1200;
                var lim_low = 500;
                var bar = {read: fruit_flow};
                bar = updateBar.progress(max, meta, lim_low, bar);

                $scope.maxFlow = max;
                $scope.showWarning = bar.showWarning;
                $scope.dynamicFlow = bar.dynamic;
                $scope.typeFlow = bar.type;
            };

        }
    ]);
