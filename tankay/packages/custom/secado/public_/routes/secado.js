'use strict';

angular.module('mean.secado').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('secado example page', {
      url: '/secado/example',
      templateUrl: 'secado/views/index.html'
    });
  }
]);
