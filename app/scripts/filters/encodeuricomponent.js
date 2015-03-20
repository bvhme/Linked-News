'use strict';

/**
 * @ngdoc filter
 * @name linkedNewsApp.filter:encodeUriComponent
 * @function
 * @description
 * # encodeUriComponent
 * Filter in the linkedNewsApp.
 */
angular.module('linkedNewsApp')
  .filter('encodeUriComponent', function () {
    return function (input) {
      return encodeURIComponent(input);
    };
  });
