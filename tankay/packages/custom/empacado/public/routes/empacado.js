'use strict';

angular.module('mean.empacado').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('empacado example page', {
      url: '/empacado/example',
      templateUrl: 'empacado/views/index.html'
    });
  }
]);
