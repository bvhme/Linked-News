'use strict';

/**
 * @ngdoc filter
 * @name linkedNewsApp.filter:urlToLabel
 * @function
 * @description
 * # urlToLabel
 * Filter in the linkedNewsApp.
 */
angular.module('linkedNewsApp')
    .filter('urlToLabel', function() {
        return function(input) {
            if ( input === undefined ) {
                return '';
            }
            var conceptLabel = function(item) {
                var label = '';
                var last = '';
                last = item.split('/');
                if (last) {
                    label = last[last.length - 1].split('_').join(' ');
                }
                return decodeURIComponent(label);
            };
            return conceptLabel(input);
        };
    });