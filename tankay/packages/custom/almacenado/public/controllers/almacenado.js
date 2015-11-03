'use strict';

/* jshint -W098 */
angular.module('mean.almacenado').controller('AlmacenadoController', ['$scope', 'Global', 'Almacenado',
  function($scope, Global, Almacenado) {
    $scope.global = Global;
    $scope.package = {
      name: 'almacenado'
    };
  }
]);
