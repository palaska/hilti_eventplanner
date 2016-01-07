'use strict';

describe('Controller: YemekCtrl', function () {

  // load the controller's module
  beforeEach(module('hiltiEventplannerApp'));

  var YemekCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    YemekCtrl = $controller('YemekCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
