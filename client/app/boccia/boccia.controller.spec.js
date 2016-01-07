'use strict';

describe('Controller: BocciaCtrl', function () {

  // load the controller's module
  beforeEach(module('hiltiEventplannerApp'));

  var BocciaCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BocciaCtrl = $controller('BocciaCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
