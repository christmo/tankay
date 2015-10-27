'use strict';

/* jshint -W098 */
angular.module('mean.empacado-4').controller('Empacado4Controller', ['$scope', 'Global', 'Empacado4',
  function($scope, Global, Empacado4) {
    $scope.global = Global;
    $scope.package = {
      name: 'empacado-4'
    };
  }
]);
