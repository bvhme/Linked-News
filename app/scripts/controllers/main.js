'use strict';

/**
 * @ngdoc function
 * @name linkedNewsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the linkedNewsApp
 */
angular.module('linkedNewsApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
