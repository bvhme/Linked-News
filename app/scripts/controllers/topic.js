'use strict';

/**
 * @ngdoc function
 * @name linkedNewsApp.controller:TopicCtrl
 * @description
 * # TopicCtrl
 * Controller of the linkedNewsApp
 */
angular.module('linkedNewsApp')
  .controller('TopicCtrl', ['$scope', '$routeParams', 'juicer', 'dbpedia', function ($scope, $routeParams, juicer, dbpedia) {

    $scope.uri = decodeURIComponent($routeParams.topicId);

    $scope.juice = {};
    $scope.articles = [];

    juicer.getArticles({
    	facets: $scope.uri,
    	recentFirst: true
    }, function (data) {
    	console.log(data);
		$scope.juice = data;
		$scope.articles = data.hits;
    });

    // $scope.dbpediaGraph = {}
    // $scope.dbpediaInfo = {}

    if ($scope.dbpediaAlso === true) {
        dbpedia.get({
          uri: $scope.uri
        }, function (data) {
          $scope.dbpediaGraph = data[$scope.uri];
          $scope.dbpediaInfo.name = $scope.dbpediaGraph['http://dbpedia.org/property/name'][0].value;
          console.log($scope.dbpediaGraph); 
        });
    }

    
  }]);
