'use strict';

describe('Controller: MinigolfCtrl', function () {

  // load the controller's module
  beforeEach(module('hiltiEventplannerApp'));

  var MinigolfCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MinigolfCtrl = $controller('MinigolfCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
