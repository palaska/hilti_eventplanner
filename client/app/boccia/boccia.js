'use strict';

angular.module('hiltiEventplannerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/boccia', {
        templateUrl: 'app/boccia/boccia.html',
        controller: 'BocciaCtrl',
        controllerAs: 'boccia'
      });
  });
