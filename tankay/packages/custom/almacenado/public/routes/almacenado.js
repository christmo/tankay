'use strict';

angular.module('mean.almacenado').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('almacenado example page', {
      url: '/almacenado/example',
      templateUrl: 'almacenado/views/index.html'
    });
  }
]);
