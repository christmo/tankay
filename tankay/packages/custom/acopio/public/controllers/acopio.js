'use strict';

/* jshint -W098 */
angular.module('mean.acopio')
    .controller('AcopioController', ['$scope', 'Global', 'Acopio', '$location','errorMessage','categories',
        function ($scope, Global, Acopio, $location, errorMessage,categories) {

            $scope.lote = {
                start_date: new Date(),
                start_time: '',
                presion: 0,
                temperature: 0
            };

            var $input = $('.datepicker').pickatime({
                interval: 60,
                format: 'HH:i A',
                min: [6, 0],
                max: [19, 0],
                onSet: function (event) {
                    $scope.$watch('name', function (newValue, oldValue) {
                        var time = angular.fromJson(picker.get('select', '{"!hour":"HH","m!inute":"i"}'));
                        $scope.lote.start_time = moment(time).format("HH:mm:ss");
                        console.log($scope.lote);
                    });
                }
            });
            var picker = $input.pickatime('picker')

            $scope.selectCategory = categories.get();

            $scope.global = Global;
            $scope.package = {
                name: 'Centro de Acopio'
            };

            $scope.save = function () {
                var lote = new Acopio($scope.lote);

                lote.$save(function (response) {
                    if (response.status === 'OK') {
                        $location.path('/clasificacion').search('lote', $scope.lote.lote);
                        $scope.lote = {};
                    } else {
                        errorMessage.show(true,response.msg);
                        $scope.error = response.error;
                        //$location.path('/acopio');
                    }
                });

            };

            $scope.updateBar = function () {
                var type;
                $scope.max = 10000;
                var meta = 5000;
                var lim_low = 2000;

                var value = ($scope.lote.capacity * 100) / $scope.max;
                if (value >= (meta * 100) / $scope.max) {
                    type = 'success';
                }
                else if (value > (lim_low * 100) / $scope.max && value < (meta * 100) / $scope.max) {
                    type = 'warning';
                }
                else {
                    type = 'danger';
                }

                $scope.showWarning = (type === 'danger' || type === 'warning');

                $scope.dynamic = value;
                $scope.type = type;
            };

            //var User = $resource('/api/acopio/step-1/all');
            //var user = User.query();

            console.log(user);

        }

    ]);
