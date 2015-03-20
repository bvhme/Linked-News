'use strict';

describe('Filter: onlyLimitedOtherSources', function () {

  // load the filter's module
  beforeEach(module('linkedNewsApp'));

  // initialize a new instance of the filter before each test
  var onlyLimitedOtherSources;
  beforeEach(inject(function ($filter) {
    onlyLimitedOtherSources = $filter('onlyLimitedOtherSources');
  }));

  it('should return the input prefixed with "onlyLimitedOtherSources filter:"', function () {
    var text = 'angularjs';
    expect(onlyLimitedOtherSources(text)).toBe('onlyLimitedOtherSources filter: ' + text);
  });

});
