'use strict';

angular.module('hiltiEventplannerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/yemek', {
        templateUrl: 'app/yemek/yemek.html',
        controller: 'YemekCtrl',
        controllerAs: 'yemek'
      });
  });
