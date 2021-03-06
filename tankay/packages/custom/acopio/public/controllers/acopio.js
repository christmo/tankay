'use strict';

/* jshint -W098 */
angular.module('mean.acopio')
    .controller('AcopioController', ['$scope', 'Global', 'Acopio', '$location', 'errorMessage', 'categories',
        'updateBar', 'AcopioQuery', '$filter',
        function ($scope, Global, Acopio, $location, errorMessage, categories, updateBar, AcopioQuery, $filter) {

            $scope.selectCategory = categories.get();
            var params = $location.search();

            if (params.query) {
                var lote = AcopioQuery.get({lote: params.lote},
                    function () {
                        lote.start_date = moment(lote.start_date).toDate();
                        $scope.lote = lote;
                        $scope.lote.storage_time = $filter('number')($scope.lote.storage_time,2);
                        $scope.updateBar(lote.capacity);
                        picker.set('select', moment(lote.start_time, 'HH:mm:ss').toDate());
                    });
                $scope.showButton = false;
                $scope.disabled = true;
            } else {
                $scope.disabled = false;
                $scope.showButton = true;
                $scope.lote = {
                    start_date: moment().startOf('day').toDate(),
                    start_time: '',
                    presion: 0,
                    temperature: 0
                };
                $scope.lote.category = $scope.selectCategory[0];
            }


            var $input = $('.datepicker').pickatime({
                interval: 60,
                format: 'HH:i A',
                min: [6, 0],
                max: [19, 0],
                onSet: function (event) {
                    $scope.$watch('name', function (newValue, oldValue) {
                        var time = angular.fromJson(picker.get('select', '{"!hour":"HH","m!inute":"i"}'));
                        $scope.lote.start_time = moment(time).format("HH:mm:ss");
                    });
                }
            });
            var picker = $input.pickatime('picker');

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
                        errorMessage.show(true, response.msg);
                        $scope.error = response.error;
                    }
                });

            };

            $scope.updateBar = function (capacity) {
                $scope.max = 10000;
                var meta = 5000;
                var lim_low = 2000;
                var bar = {read: capacity};
                bar = updateBar.progress($scope.max, meta, lim_low, bar);

                $scope.showWarning = bar.showWarning;
                $scope.dynamic = bar.dynamic;
                $scope.type = bar.type;
            };

            $scope.siguiente = function () {
                $location.path('/clasificacion')
                    .search('lote', $scope.lote.lote)
                    .search('query', true);
                $scope.lote = {};
            };

        }

    ]);
