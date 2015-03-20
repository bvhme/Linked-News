'use strict';

describe('Controller: WhatarewenotdoingCtrl', function () {

  // load the controller's module
  beforeEach(module('linkedNewsApp'));

  var WhatarewenotdoingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WhatarewenotdoingCtrl = $controller('WhatarewenotdoingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
