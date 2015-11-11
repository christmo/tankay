'use strict';

/* jshint -W098 */
angular.module('mean.clasificacion')
    .controller('ClasificacionController', ['$scope', 'Global', 'Clasificacion', '$location', 'categories',
        'errorMessage', 'updateBar',
        function ($scope, Global, Clasificacion, $location, categories,errorMessage,updateBar) {

            var lote = $location.search().lote;

            $scope.clasification = {
                presion: 0,
                temperature: 0,
                light: 0,
                id: lote
            };

            $scope.selectCategory = categories.get();

            $scope.global = Global;
            $scope.package = {
                name: 'Clasificación'
            };

            $scope.save = function () {
                var clasificacion = new Clasificacion($scope.clasification);

                clasificacion.$save(function (response) {
                    console.log(response);
                    if (response.status === 'OK') {
                        $location.path('/secado').search('clasification', $scope.clasification.id);
                        $scope.clasification = {};
                    } else {
                        errorMessage.show(true, response.msg);
                        $scope.error = response.error;
                        //$location.path('/clasificacion');
                    }
                });

            };

            $scope.updateBarPeeled = function (){
                $scope.$watch('name', function () {
                    var max = 500;
                    var meta = 140;
                    var lim_low = 50;
                    var bar = {read: $scope.clasification.peeled_fruit};
                    bar = updateBar.progress(max, meta, lim_low, bar);

                    $scope.maxPeeled = max;
                    $scope.showWarning = bar.showWarning;
                    $scope.dynamicPeeled = bar.dynamic;
                    $scope.typePeeled = bar.type;
                });
            };
            $scope.updateBarClasified = function (){
                $scope.$watch('name', function () {
                    var max = 500;
                    var meta = 120;
                    var lim_low = 50;
                    var bar = {read: $scope.clasification.clasified_fruit};
                    bar = updateBar.progress(max, meta, lim_low, bar);

                    $scope.maxClasified = max;
                    $scope.showWarning = bar.showWarning;
                    $scope.dynamicClasified = bar.dynamic;
                    $scope.typeClasified = bar.type;
                });
            };
            $scope.updateBarFruitFlow = function (){
                $scope.$watch('name', function () {
                    var max = 5000;
                    var meta = 1200;
                    var lim_low = 500;
                    var bar = {read: $scope.clasification.fruit_flow};
                    bar = updateBar.progress(max, meta, lim_low, bar);

                    $scope.maxFlow = max;
                    $scope.showWarning = bar.showWarning;
                    $scope.dynamicFlow = bar.dynamic;
                    $scope.typeFlow = bar.type;
                });
            };

        }
    ]);
