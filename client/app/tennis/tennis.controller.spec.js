'use strict';

describe('Controller: TennisCtrl', function () {

  // load the controller's module
  beforeEach(module('hiltiEventplannerApp'));

  var TennisCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TennisCtrl = $controller('TennisCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
