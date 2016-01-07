'use strict';

angular.module('hiltiEventplannerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/kokteyl', {
        templateUrl: 'app/kokteyl/kokteyl.html',
        controller: 'KokteylCtrl',
        controllerAs: 'kokteyl'
      });
  });
