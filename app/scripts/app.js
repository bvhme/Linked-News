'use strict';

/**
 * @ngdoc overview
 * @name linkedNewsApp
 * @description
 * # linkedNewsApp
 *
 * Main module of the application.
 */
angular
  .module('linkedNewsApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'bbcjuicer',
    'bbcldp',
    'dbpedia'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/whatarewenotdoing/:page', {
        templateUrl: 'views/whatarewenotdoing.html',
        controller: 'WhatarewenotdoingCtrl'
      })
      .when('/whatarewenotdoing', {
        templateUrl: 'views/whatarewenotdoing.html',
        controller: 'WhatarewenotdoingCtrl'
      })
      .when('/topics/:topicId*', {
        templateUrl: 'views/topic.html',
        controller: 'TopicCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
