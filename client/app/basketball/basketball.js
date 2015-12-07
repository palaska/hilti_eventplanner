'use strict';

angular.module('hiltiEventplannerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/basketball', {
        templateUrl: 'app/basketball/basketball.html',
        controller: 'BasketballCtrl',
        controllerAs: 'basketball'
      });
  });
