'use strict';

describe('Controller: FootballCtrl', function () {

  // load the controller's module
  beforeEach(module('hiltiEventplannerApp'));

  var FootballCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FootballCtrl = $controller('FootballCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
