'use strict';

/**
 * @ngdoc filter
 * @name linkedNewsApp.filter:orderObjectBy
 * @function
 * @description
 * # orderObjectBy
 * Filter in the linkedNewsApp.
 */
angular.module('linkedNewsApp')
.filter('orderObjectBy', function() {
        return function(items, field, reverse) {
            var filtered = [];
            angular.forEach(items, function(item) {
                filtered.push(item);
            });
            filtered.sort(function(a, b) {
                return (a[field] > b[field] ? 1 : -1);
            });
            if (reverse) {
                filtered.reverse();
            }
            return filtered;
        };
    });