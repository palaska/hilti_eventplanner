'use strict';

describe('Controller: BillardCtrl', function () {

  // load the controller's module
  beforeEach(module('hiltiEventplannerApp'));

  var BillardCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BillardCtrl = $controller('BillardCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
