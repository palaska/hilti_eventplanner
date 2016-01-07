'use strict';

angular.module('hiltiEventplannerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/tennis', {
        templateUrl: 'app/tennis/tennis.html',
        controller: 'TennisCtrl',
        controllerAs: 'tennis'
      });
  });
