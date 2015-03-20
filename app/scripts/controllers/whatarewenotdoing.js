'use strict';

/**
 * @ngdoc function
 * @name linkedNewsApp.controller:WhatarewenotdoingCtrl
 * @description
 * # WhatarewenotdoingCtrl
 * Controller of the linkedNewsApp
 */
angular.module('linkedNewsApp')
    .controller('WhatarewenotdoingCtrl', ['juicer', '$routeParams', 'ldp', '$scope',
        function(juicer, $routeParams, ldp, $scope) {
            $scope.page = 'overview';

            if ( $routeParams.page ) {
                $scope.page = $routeParams.page
            }

            // Choose a date range, set the default to the last 24 hours
            $scope.resetDate = function() {
                $scope.date = new Date();
                $scope.beforeDate = new Date().setDate($scope.date.getDate());
                $scope.afterDate = new Date().setDate($scope.date.getDate() - 1);
            };
            $scope.resetDate();

            // The datePicker's opening and closing functions
            $scope.openAfter = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.openedAfter = true;
            };
            $scope.openBefore = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.openedBefore = true;
            };

            $scope.sources = [];
            // Get all available sources from the server
            juicer.getSources(null, function(data) {
                $scope.sources = data;
            });

            $scope.sourceInput = '';

            // toggle selection for a given fruit by name
            $scope.toggleSourceSelection = function toggleSourceSelection(sourceId) {
                var idx = $scope.theirSources.indexOf(sourceId);

                // is currently selected
                if (idx > -1) {
                    $scope.theirSources.splice(idx, 1);
                }

                // is newly selected
                else {
                    $scope.theirSources.push(sourceId);
                }

                return $scope.compareConceptsFromTwoSources();
            };

            $scope.selectSource = function(sourceId) {
                var idx = $scope.theirSources.indexOf(sourceId);

                // is currently selected
                if (idx > -1) {
                    return false;
                }
                // is newly selected
                else {
                    $scope.theirSources.push(sourceId);
                }

                $scope.sourceInput = '';

                return $scope.compareConceptsFromTwoSources();
            };

            // Set the sources to the default
            $scope.ourSources = [1];
            $scope.resetSources = function() {
                $scope.theirSources = [3, 8, 10, 11, 12, 21];
            };
            $scope.resetSources();

            $scope.selectNoSources = function() {
                for (var i = $scope.sources.length - 1; i >= 0; i--) {
                    var sourceId = $scope.sources[i].id;
                    var idx = $scope.theirSources.indexOf(sourceId);
                    // is currently selected
                    if (idx > -1) {
                        $scope.theirSources.splice(idx, 1);
                    }
                }
            };
            $scope.selectAllSources = function() {
                for (var i = $scope.sources.length - 1; i >= 0; i--) {
                    var sourceId = $scope.sources[i].id;
                    $scope.theirSources.push(sourceId);
                }
            };

            // Hide results under the median
            function calculateMedianFromArr(array) {
                array.sort(function(a, b) {
                    return a - b;
                });

                var half = Math.floor(array.length / 2);

                if (array.length % 2)
                    { return array[half]; }
                else
                    { return (array[half - 1] + array[half]) / 2.0; }
            }
            var calculateMedianFromObj = function(object, value) {
                var valuesArray = [];
                for (var key in object){
                    valuesArray.push(object[key][value]);
                }
                return calculateMedianFromArr(valuesArray);
            };
            $scope.showUnderMedian = false;
            $scope.$watch('showUnderMedian', function() {
                console.log($scope.showUnderMedian);
            });

            // Selector for the order the results will be in
            $scope.order = 'total';

            // $scope.totalSourceItems = $scope.sources.length;
            // $scope.currentSourcePage = 1;

            // $scope.setSourcePage = function (pageNo) {
            // 	$scope.currentPage = pageNo;
            // };

            // $scope.pageSourceChanged = function() {
            // 	$log.log('Page changed to: ' + $scope.currentPage);
            // };

            // $scope.maxSourcePaginationsSize = 5;

            $scope.topics = {};

            function compareConceptsFromTwoSources() {

                var conceptsVariable = $scope.topics;
                var newConcepts = {};
                var isWhoDone = {
                    us: false,
                    them: false
                };

                function makeNumber(num) {
                    if (typeof num !== 'number' || isNaN(num)) {
                        return 0;
                    }
                    return num;
                }

                function add(a, b) {
                    return makeNumber(a) + makeNumber(b);
                }

                function calculatePercentage(a, b) {
                    return makeNumber(a) / (makeNumber(a) + makeNumber(b)) * 100;
                }

                function queryCallbackAndPopulateObject(data, status, headers, config, who) {
                    for (var ontologyKey = data.aggregations.items.length - 1; ontologyKey >= 0; ontologyKey--) {
                        var ontologyItems = data.aggregations.items[ontologyKey].items;
                        for (var conceptKey in ontologyItems) {
                            var conceptObject = ontologyItems[conceptKey];
                            var conceptId = conceptObject.id;
                            if (!newConcepts[conceptId]) {
                                newConcepts[conceptId] = conceptObject;
                            }
                            newConcepts[conceptId][who] = 0;
                            newConcepts[conceptId][who] = conceptObject.count;
                            if (!newConcepts[conceptId].total) {
                                newConcepts[conceptId].total = 0;
                            }
                            newConcepts[conceptId].total = add(newConcepts[conceptId].us) + add(newConcepts[conceptId].them);
                            newConcepts[conceptId].usPercentage = calculatePercentage(newConcepts[conceptId].us, newConcepts[conceptId].them);
                            newConcepts[conceptId].themPercentage = calculatePercentage(newConcepts[conceptId].them, newConcepts[conceptId].us);
                            newConcepts[conceptId].count = undefined;
                        }
                    }
                    isWhoDone[who] = true;
                    donePopulating();
                }

                function donePopulating() {
                    if (isWhoDone.us && isWhoDone.them) {
                        // console.log(newConcepts);
                        conceptsVariable = undefined;
                        $scope.topics = newConcepts;
                        $scope.median = calculateMedianFromObj($scope.topics, 'total');
                    }
                }

                function queryCallbackAndPopulateObjectUs(data, status, headers, config) {
                    var who = 'us';
                    queryCallbackAndPopulateObject(data, status, headers, config, who);
                }

                function queryCallbackAndPopulateObjectThem(data, status, headers, config) {
                    var who = 'them';
                    queryCallbackAndPopulateObject(data, status, headers, config, who);
                }

                juicer.getArticles({
                    sources: $scope.ourSources,
                    publishedAfter: $scope.afterDate,
                    publishedBefore: $scope.beforeDate,
                    limit: 0
                }, queryCallbackAndPopulateObjectUs);

                juicer.getArticles({
                    sources: $scope.theirSources,
                    publishedAfter: $scope.afterDate,
                    publishedBefore: $scope.beforeDate,
                    limit: 0
                }, queryCallbackAndPopulateObjectThem);
            }
            $scope.compareConceptsFromTwoSources = function() {
                compareConceptsFromTwoSources();
            };
            $scope.compareConceptsFromTwoSources();

            // The mammoth function to compare concepts from two sources
        }
    ]);