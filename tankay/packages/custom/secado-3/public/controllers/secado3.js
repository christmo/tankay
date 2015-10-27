'use strict';

/* jshint -W098 */
angular.module('mean.secado-3').controller('Secado3Controller', ['$scope', 'Global', 'Secado3',
  function($scope, Global, Secado3) {
    $scope.global = Global;
    $scope.package = {
      name: 'secado-3'
    };
  }
]);
