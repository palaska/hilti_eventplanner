'use strict';

describe('Controller: BowlingCtrl', function () {

  // load the controller's module
  beforeEach(module('hiltiEventplannerApp'));

  var BowlingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BowlingCtrl = $controller('BowlingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
