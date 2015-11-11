'use strict';

/* jshint -W098 */
angular.module('mean.empacado')
    .controller('EmpacadoController', ['$scope', 'Global', 'Empacado', '$location', 'errorMessage', 'updateBar',
        function ($scope, Global, Empacado, $location,errorMessage,updateBar) {

            var id = $location.search().secado;

            $scope.empacado = {
                temperature:0,
                id:id
            };

            $scope.global = Global;
            $scope.package = {
                name: 'Empacado'
            };

            $scope.save = function () {
                var empacado = new Empacado($scope.empacado);

                empacado.$save(function (response) {
                    if (response.status === 'OK') {
                        $location.path('/almacenado').search('empacado',$scope.empacado.id);
                        $scope.empacado = {};
                    } else {
                        errorMessage.show(true, response.msg);
                        $scope.error = response.error;
                        //$location.path('/empacado');
                    }
                });

            };

            $scope.updateBarFruitFlowEmpacado = function (){
                $scope.$watch('name', function () {
                    var max = 5000;
                    var meta = 3000;
                    var lim_low = 1000;
                    var bar = {read: $scope.empacado.fruit_flow};
                    bar = updateBar.progress(max, meta, lim_low, bar);

                    $scope.maxFlow = max;
                    $scope.showWarning = bar.showWarning;
                    $scope.dynamicFlow = bar.dynamic;
                    $scope.typeFlow = bar.type;
                });
            };

            $scope.updateBarProduction = function (){
                $scope.$watch('name', function () {
                    var max = 500;
                    var meta = 200;
                    var lim_low = 100;
                    var bar = {read: $scope.empacado.production};
                    bar = updateBar.progress(max, meta, lim_low, bar);

                    $scope.maxProduction = max;
                    $scope.showWarning = bar.showWarning;
                    $scope.dynamicProduction = bar.dynamic;
                    $scope.typeProduction = bar.type;
                });
            };
        }
    ]);
