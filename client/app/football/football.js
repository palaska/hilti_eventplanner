'use strict';

angular.module('hiltiEventplannerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/football', {
        templateUrl: 'app/football/football.html',
        controller: 'FootballCtrl',
        controllerAs: 'football'
      });
  });
