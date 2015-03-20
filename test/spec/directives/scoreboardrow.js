'use strict';

describe('Directive: scoreBoardRow', function () {

  // load the directive's module
  beforeEach(module('linkedNewsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<score-board-row></score-board-row>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the scoreBoardRow directive');
  }));
});
