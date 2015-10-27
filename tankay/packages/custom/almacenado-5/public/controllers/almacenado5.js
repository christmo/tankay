'use strict';

/* jshint -W098 */
angular.module('mean.almacenado-5').controller('Almacenado5Controller', ['$scope', 'Global', 'Almacenado5',
  function($scope, Global, Almacenado5) {
    $scope.global = Global;
    $scope.package = {
      name: 'almacenado-5'
    };
  }
]);
