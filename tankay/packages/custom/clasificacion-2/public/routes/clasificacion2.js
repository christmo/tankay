'use strict';

angular.module('mean.clasificacion-2').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('clasificacion', {
      url: '/clasificacion',
      templateUrl: 'clasificacion-2/views/index.html'
    });
  }
]);
