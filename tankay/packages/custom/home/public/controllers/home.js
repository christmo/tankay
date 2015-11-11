'use strict';

/* jshint -W098 */
angular.module('mean.home')
    .controller('HomeController', ['$scope', 'Global', 'Home', '$location', 'ngTableParams',
        function ($scope, Global, Home, $location, ngTableParams) {
            var that = this;
            $scope.global = Global;
            $scope.package = {
                name: 'home'
            };

            $scope.lotes = Home.query();

            $scope.lotes.$promise.then(function (data) {
                var rows = [];
                for (var lote in data) {
                    if (lote.charAt(0) != '$' && data[lote].lote) {
                        var row = {};
                        row.lote = data[lote].lote.lote;
                        row.start_date = data[lote].lote.start_date;
                        row.start_time = data[lote].lote.start_time;
                        row.category = data[lote].lote.category;
                        row.capacity = data[lote].lote.capacity;
                        row.next_step = data[lote].next_step;
                        row.step_detail = data[lote].step_detail;
                        rows.push(row);
                    }
                }

                console.log(rows);
                $scope.rows = rows;
                updateTable(rows, ngTableParams, that);
            });

            $scope.continuar = function (data) {
                var lote = data.lote;
                console.log('lote:' + lote);

                if (data.next_step.indexOf('clasificacion') > -1) {
                    $location.path(data.next_step)
                        .search('lote', data.lote);
                } else if (data.next_step.indexOf('secado') > -1) {
                    $location.path(data.next_step)
                        .search('lote', data.lote)
                        .search('clasification', data.lote);
                } else if (data.next_step.indexOf('empacado') > -1) {
                    $location.path(data.next_step)
                        .search('lote', data.lote)
                        .search('clasification', data.lote)
                        .search('secado', data.lote);
                } else if (data.next_step.indexOf('almacenado') > -1) {
                    $location.path(data.next_step)
                        .search('lote', data.lote)
                        .search('clasification', data.lote)
                        .search('secado', data.lote)
                        .search('empacado', data.lote);
                }
            };

        }
    ]);


function updateTable(data, ngTableParams, that) {

    //Basic Example
    that.tableBasic = new ngTableParams({
        page: 1,            // show first page
        count: 5           // count per page
    }, {
        total: data.length, // length of data
        //dataset:data

        getData: function ($defer, params) {
            console.log(params.page());
            console.log(params.count());
            console.log((params.page() - 1) * params.count(), params.page() * params.count());
            console.log($defer);
            return $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            //$defer.resolve(data.slice());
        }
    });
}
