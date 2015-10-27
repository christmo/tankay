'use strict';

/* jshint -W098 */
angular.module('mean.clasificacion-2').controller('Clasificacion2Controller', ['$scope', 'Global', 'Clasificacion2',
  function($scope, Global, Clasificacion2) {
    $scope.global = Global;
    $scope.package = {
      name: 'clasificacion-2'
    };
  }
]);
