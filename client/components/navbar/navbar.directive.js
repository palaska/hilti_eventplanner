'use strict';

angular.module('hiltiEventplannerApp')
  .directive('navbar', function () {

    return {
      templateUrl: 'components/navbar/navbar.html',
      restrict: 'E',
      controller: 'NavbarCtrl'
    };
  });
