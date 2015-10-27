'use strict';

angular.module('mean.acopio-1').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('acopio', {
      url: '/acopio',
      templateUrl: 'acopio-1/views/index.html'
    });
  }
]);
