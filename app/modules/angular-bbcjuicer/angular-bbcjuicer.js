'use strict';

/**
 * @ngdoc module
 * @name bbcjuicer
 * @description
 * # BBC News Labs Juicer
 * Module in Linked-News.
 */

angular.module('bbcjuicer', [])
	.factory('juicer', ['$http', '$log',
		function($http, $log) {
			var factory = {};

			var apiKey = '9OHbOpZpVh9tQZBDjwTlTmsCF2Ce0yGQ'; // factory is the public one
			var host = 'http://data.test.bbc.co.uk/bbcrd-juicer/';
			// var host = 'http://new.juicer.bbcnewslabs.co.uk/';

			var dateToString = function(date) {
				if (Object.prototype.toString.call(date) === '[object Date]') {
					return date.toISOString();
				}
				if (typeof date === 'string') {
					return date;
				}
				if (typeof date === 'number') {
					var string = new Date(date).toISOString();
					return string;
				}
			};

			var buildURLParams = function(params) {
				var paramsString = '?';

				if (params.apiKey) {
					paramsString += '&apikey=' + params.apiKey;
				} else {
					$log.error('There is no API Key specified for the Juicer, thus API calls will be futile.');
					return false;
				}

				if (params.query) {
					paramsString += '&q=' + params.query;
				}
				if (params.size) {
					paramsString += '&size=' + params.size;
				}
				if (params.offset) {
					paramsString += '&offset=' + params.offset;
				}
				if (params.publishedAfter) {
					paramsString += '&published_after=' + dateToString(params.publishedAfter);
				}
				if (params.publishedBefore) {
					paramsString += '&published_before=' + dateToString(params.publishedBefore);
				}
				if (params.recentFirst) {
					paramsString += '&recent_first=' + params.recentFirst;
				}
				if (params.likeText) {
					paramsString += '&like-text=' + params.likeText;
				}
				if (params.name) {
					paramsString += '&name=' + params.likeText;
				}

				var i;
				var value;
				if (typeof params.sources === 'string') {
					value = params.sources;
					params.sources = [];
					params.sources[0] = value;
				}
				if (typeof params.facets === 'string') {
					value = params.facets;
					params.facets = [];
					params.facets[0] = value;
				}
				if (typeof params.likeIds === 'string') {
					value = params.likeIds;
					params.likeIds = [];
					params.likeIds[0] = value;
				}
				if (params.sources) {
					for (i = params.sources.length - 1; i >= 0; i--) {
						paramsString += '&sources[]=' + params.sources[i];
					}
				}
				if (params.facets) {
					for (i = params.facets.length - 1; i >= 0; i--) {
						paramsString += '&facets[]=' + params.facets[i];
					}
				}
				if (params.likeIds) {
					for (i = params.likeIds.length - 1; i >= 0; i--) {
						paramsString += '&like-ids[]=' + params.likeIds[i];
					}
				}

				// $log.log(paramsString);
				return paramsString;
			};

			factory.getJSON = function(endpoint, params, callback) {
				if (typeof params !== 'object' || params === null) {
					params = {};
				}

				params.apiKey = apiKey;
				// console.log(params);
				var getUrl = host + endpoint + buildURLParams(params);
				// console.log(getUrl);

				// $log.log(params);

				$http({
						method: 'GET',
						url: getUrl,
						headers: {'Accept': 'application/json'}
					})
					.success(
						function(data, status, headers, config) {
							if (callback) {
								return callback(data, status, headers, config);
							}
							return console.log(data);
						}
					)
					.error(
						function(data, status, headers, config) {
							if (callback) {
								return callback(data, status, headers, config);
							}
							return console.error(data);
						}
					);
			};

			factory.getArticles = function(params, callback) {
				factory.getJSON('articles', params, callback);
			};

			factory.getArticle = function(articleId, callback) {
				factory.getJSON('articles/' + articleId, null, callback);
			};

			factory.getSources = function(sourceQuery, callback) {
				factory.getJSON('sources', {
					name: sourceQuery
				}, callback);
			};

			return factory;
		}
	]);