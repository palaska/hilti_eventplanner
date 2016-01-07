'use strict';

angular.module('hiltiEventplannerApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {

    $scope.isAdmin = Auth.isAdmin;

    $scope.menu = [
    {
      'title': 'Basketbol',
      'link': '/basketball',
    },
    {
      'title': 'Futbol',
      'link': '/football',
    },
    {
      'title': 'Yemek atölyesi',
      'link': '/yemek',
    },
    {
      'title': 'Kokteyl atölyesi',
      'link': '/kokteyl',
    },
    {
      'title': 'Bilardo',
      'link': '/billard',
    },
    {
      'title': 'Masa Tenisi',
      'link': '/tennis',
    },
    {
      'title': 'Bowling',
      'link': '/bowling',
    },
    {
      'title': 'Boccia',
      'link': '/boccia',
    },
    {
      'title': 'Mini Golf',
      'link': '/minigolf',
    }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
