'use strict';

/**
 * @ngdoc function
 * @name linkedNewsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the linkedNewsApp
 */
angular.module('linkedNewsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
