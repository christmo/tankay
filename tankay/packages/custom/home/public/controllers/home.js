'use strict';

/* jshint -W098 */
angular.module('mean.home')
    .controller('HomeController', ['$scope', 'Global', 'Home', '$location', 'NgTableParams','updateChartAcopio',
        'categories','$filter','updateChartEmpacado',
        function ($scope, Global, Home, $location, NgTableParams,updateChartAcopio,categories,$filter,
                  updateChartEmpacado) {
            var that = this;
            var categoriesData = categories.get();
            $scope.global = Global;
            $scope.package = {
                name: 'home'
            };

            $scope.filter = {
                start_date:moment().subtract(1,'month').startOf('day').toDate(),
                end_date: moment().add(1,'days').startOf('day').toDate()
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
                        row.category = getCategory(data[lote].lote.category,categoriesData,$filter);
                        row.capacity = data[lote].lote.capacity;
                        row.next_step = data[lote].next_step;
                        row.step_detail = data[lote].step_detail;
                        rows.push(row);
                    }
                }

                $scope.rows = rows;
                updateTable(rows, NgTableParams, that);
            });

            $scope.continuar = function (data) {
                var lote = data.lote;

                if(data.next_step === '/'){
                    $location.path('/acopio')
                        .search('lote', lote)
                        .search('query', true);
                }

                if (data.next_step.indexOf('clasificacion') > -1) {
                    $location.path(data.next_step)
                        .search('lote', lote);
                } else if (data.next_step.indexOf('secado') > -1) {
                    $location.path(data.next_step)
                        .search('lote', lote)
                        .search('clasification', lote);
                } else if (data.next_step.indexOf('empacado') > -1) {
                    $location.path(data.next_step)
                        .search('lote', lote)
                        .search('clasification', lote)
                        .search('secado', lote);
                } else if (data.next_step.indexOf('almacenado') > -1) {
                    $location.path(data.next_step)
                        .search('lote', lote)
                        .search('clasification', lote)
                        .search('secado', lote)
                        .search('empacado', lote);
                }
            };

            $scope.updateChartAcopio = function(){
                var element = angular.element(".flot-chart")
                updateChartAcopio.filter($scope,element);
            };

            $scope.updateChartEmpacado = function(){
                var element = angular.element(".flot-chart-empacado")
                updateChartEmpacado.getData($scope,element);
            };

            var mayor = moment().toDate().getTime();
            var menor = moment().subtract(1,'days').toDate().getTime();
            console.log(mayor +' - '+ menor + " = "+ ((((mayor-menor)/1000)/60)/60));

        }
    ]);


function updateTable(data, NgTableParams, that) {

    //Basic Example
    that.tableBasic = new NgTableParams({
        page: 1,            // show first page
        count: 5           // count per page
    }, {
        total: data.length, // length of data
        getData: function ( params) {
            return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
        }
    });
}


function getCategory(category,categoriesData,$filter){
    var label = "";
    var found = $filter('filter')(categoriesData, {id: category}, true);
    if (found.length) {
        label = found[0].label;
    } else {
        label = 'Not found';
    }

    return label;
}
