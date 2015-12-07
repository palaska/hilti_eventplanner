'use strict';

angular.module('hiltiEventplannerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/bowling', {
        templateUrl: 'app/bowling/bowling.html',
        controller: 'BowlingCtrl',
        controllerAs: 'bowling'
      });
  });
