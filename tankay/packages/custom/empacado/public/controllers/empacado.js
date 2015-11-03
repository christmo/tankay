'use strict';

/* jshint -W098 */
angular.module('mean.empacado').controller('EmpacadoController', ['$scope', 'Global', 'Empacado',
  function($scope, Global, Empacado) {
    $scope.global = Global;
    $scope.package = {
      name: 'empacado'
    };
  }
]);
