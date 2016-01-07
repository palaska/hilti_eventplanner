'use strict';

angular.module('hiltiEventplannerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/minigolf', {
        templateUrl: 'app/minigolf/minigolf.html',
        controller: 'MinigolfCtrl',
        controllerAs: 'minigolf'
      });
  });
