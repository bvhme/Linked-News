'use strict';

describe('Filter: urlToLabel', function () {

  // load the filter's module
  beforeEach(module('linkedNewsApp'));

  // initialize a new instance of the filter before each test
  var urlToLabel;
  beforeEach(inject(function ($filter) {
    urlToLabel = $filter('urlToLabel');
  }));

  it('should return the input prefixed with "urlToLabel filter:"', function () {
    var text = 'angularjs';
    expect(urlToLabel(text)).toBe('urlToLabel filter: ' + text);
  });

});
