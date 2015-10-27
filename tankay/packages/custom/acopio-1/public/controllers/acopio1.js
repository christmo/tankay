'use strict';

/* jshint -W098 */
angular.module('mean.acopio-1').controller('Acopio1Controller', ['$scope', 'Global', 'Acopio1',
  function($scope, Global, Acopio1) {
    $scope.global = Global;
    $scope.package = {
      name: 'acopio-1'
    };
  }
]);
