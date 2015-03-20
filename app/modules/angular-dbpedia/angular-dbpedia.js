'use strict';

/**
 * @ngdoc module
 * @name bbcjuicer
 * @description
 * # Angular DBPedia
 * Angular DBPedia
 */

angular.module('dbpedia', [])
    .factory('dbpedia', ['$http', '$log',
        function($http, $log) {
            var factory = this;

            var host = 'http://dbpedia.org/';
            var endpoint = 'sparql';

            var buildURLParams = function(params) {
            	var paramsString = '?query=';

            	if (params.uri) {
            		// DESCRIBE+%3Chttp://dbpedia.org/resource/BBC%3E
					paramsString += 'DESCRIBE+%3C' + encodeURIComponent(params.uri) + '%3E'; 
				}

				// paramsString += '&format=application%2Fsparql-results%2Bjson';
				paramsString += '&timeout=30000&debug=on';

				return paramsString;
            };

            factory.getJSON = function(params, callback) {

                var getUrl = host + endpoint + buildURLParams(params);

                $http({
                    method: 'GET',
                    url: getUrl,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                    .success(
                        function(data, status, headers, config) {
                            if (callback) {
                                return callback(data, status, headers, config);
                            }
                            console.log(headers)
                            return $log.log(data);
                        }
                )
                    .error(
                        function(data, status, headers, config) {
                            if (callback) {
                                return callback(data, status, headers, config);
                            }
                            return $log.error(data);
                        }
                );
            };

            factory.get = function(params, callback) {
                factory.getJSON(params, callback);
            };

            return this;
        }
    ]);