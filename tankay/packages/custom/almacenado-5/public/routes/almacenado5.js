'use strict';

angular.module('mean.almacenado-5').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('almacenado', {
      url: '/almacenado',
      templateUrl: 'almacenado-5/views/index.html'
    });
  }
]);
