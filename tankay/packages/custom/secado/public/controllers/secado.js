'use strict';

/* jshint -W098 */
angular.module('mean.secado')
    .controller('SecadoController', ['$scope', 'Global', 'Secado', '$location', 'errorMessage', 'updateBar',
        function ($scope, Global, Secado, $location, errorMessage,updateBar) {

            var id = $location.search().clasification;

            $scope.secado = {
                air_flow: 0,
                hot_air_control: 0,
                humidity_control: 0,
                temperature:0,
                id: id
            };

            $scope.global = Global;
            $scope.package = {
                name: 'Secado'
            };

            $scope.save = function () {
                var secado = new Secado($scope.secado);

                secado.$save(function (response) {
                    if (response.status === 'OK') {
                        $location.path('/empacado').search('secado',$scope.secado.id);
                        $scope.secado = {};
                    } else {
                        errorMessage.show(true, response.msg);
                        $scope.error = response.error;
                        //$location.path('/secado');
                    }
                });

            };

            $scope.updateBarFruitFlowSecado = function (){
                $scope.$watch('name', function () {
                    var max = 5000;
                    var meta = 3000;
                    var lim_low = 1000;
                    var bar = {read: $scope.secado.fruit_flow};
                    bar = updateBar.progress(max, meta, lim_low, bar);

                    $scope.maxFlow = max;
                    $scope.showWarning = bar.showWarning;
                    $scope.dynamicFlow = bar.dynamic;
                    $scope.typeFlow = bar.type;
                });
            };
        }
    ]);
