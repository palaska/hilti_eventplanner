'use strict';

angular.module('hiltiEventplannerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/billard', {
        templateUrl: 'app/billard/billard.html',
        controller: 'BillardCtrl',
        controllerAs: 'billard'
      });
  });
