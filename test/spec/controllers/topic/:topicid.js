'use strict';

describe('Controller: TopicTopicidCtrl', function () {

  // load the controller's module
  beforeEach(module('linkedNewsApp'));

  var TopicTopicidCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TopicTopicidCtrl = $controller('TopicTopicidCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
