'use strict';

angular.module('mean.empacado-4').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('empacado', {
      url: '/empacado',
      templateUrl: 'empacado-4/views/index.html'
    });
  }
]);
