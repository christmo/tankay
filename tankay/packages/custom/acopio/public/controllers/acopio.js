'use strict';

/* jshint -W098 */
angular.module('mean.acopio')
    .controller('AcopioController', ['$scope', 'Global', 'Acopio', '$location', 'errorMessage', 'categories',
        'updateBar','AcopioQuery',
        function ($scope, Global, Acopio, $location, errorMessage, categories, updateBar, AcopioQuery) {

            var params = $location.search();
            console.log(params);
            if (params.query) {
                var lote = AcopioQuery.get({lote:params.lote},function(){
                    console.log(lote);
                    lote.start_date = moment(lote.start_date).toDate();
                    lote.start_time = new Date();
                    console.log(moment(lote.start_time).toDate());

                    $('.datepicker').pickatime('setDate', new Date());
                    $scope.lote = lote;
                });
            } else {
                $scope.lote = {
                    start_date: new Date(),
                    start_time: '',
                    presion: 0,
                    temperature: 0//,
                    //capacity: 0
                };
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
                        errorMessage.show(true, response.msg);
                        $scope.error = response.error;
                    }
                });

            };

            $scope.updateBar = function () {
                $scope.$watch('name', function () {
                    $scope.max = 10000;
                    var meta = 5000;
                    var lim_low = 2000;
                    var bar = {read: $scope.lote.capacity};
                    bar = updateBar.progress($scope.max, meta, lim_low, bar);

                    $scope.showWarning = bar.showWarning;
                    $scope.dynamic = bar.dynamic;
                    $scope.type = bar.type;
                });
            };

        }

    ]);
