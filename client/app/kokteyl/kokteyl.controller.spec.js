'use strict';

describe('Controller: KokteylCtrl', function () {

  // load the controller's module
  beforeEach(module('hiltiEventplannerApp'));

  var KokteylCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KokteylCtrl = $controller('KokteylCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
