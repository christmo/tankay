'use strict';

angular.module('mean.secado-3').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('secado', {
      url: '/secado',
      templateUrl: 'secado-3/views/index.html'
    });
  }
]);
