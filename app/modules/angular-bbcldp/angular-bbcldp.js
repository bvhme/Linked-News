'use strict';

/**
 * @ngdoc module
 * @name bbcldp
 * @description
 * # BBC Linked Data Platform
 * Module in Linked-News.
 */

angular.module('bbcldp', [])
	.factory('ldp', ['$http', '$log',
		function($http) {
			var factory = {};

			var apiKey = '9OHbOpZpVh9tQZBDjwTlTmsCF2Ce0yGQ'; // factory is the public one
			var host = 'http://data.test.bbc.co.uk/bbcrd-juicer/';
			// var host = 'http://new.juicer.bbcnewslabs.co.uk/';

			var parseValue = function(input) {
				if (Object.prototype.toString.call(input) === '[object Date]') {
					return input.toISOString();
				}
				return input;
			};

			var buildURLParams = function(params) {
				var paramsString = '?';

				for (var key in params) {
					var value = params[key];
					paramsString += '&' + key + '=' + parseValue(value);
				}

				return paramsString;
			};

			factory.getJSONLD = function(endpoint, params, callback) {
				// 'http://data.test.bbc.co.uk/bbcrd-juicer/articles?apikey=9OHbOpZpVh9tQZBDjwTlTmsCF2Ce0yGQ&published_after=2015-03-14T00:00:00.000Z&published_before=2015-03-15T00:00:00.000Z&q=' + query
				if (typeof params !== 'object' || params === null) {
					params = {};
				}

				params.apiKey = apiKey;
				// console.log(params);
				var getUrl = host + endpoint + buildURLParams(params);
				// console.log(getUrl);

				$http({
						method: 'GET',
						url: getUrl,
						headers: {'Accept': 'application/json-ld'}
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

			// Get one thing by it's unique UUID
			factory.getThing = function(thing, callback) {
				// Get a single thing
				factory.getJSONLD('/things/' + thing, null, callback);
			};

			// The latest creative works
			factory.getCreativeWorks = function(params, callback) {
				factory.getJSONLD('/creative-works-v2', params, callback);
			};
			// about: Restrict to Creative Works about this thing
			// about-sameAs: Restrict to Creative Works about this thing, where the thing is associated with a LOD URI
			// mentions: Restrict to Creative Works that mention this thing
			// audience: Restrict to Creative Works that are for a specific audience
			// category: Restrict to Creative Works that have a specific category
			// type: Restrict to Creative Works that have a specific type
			// format: Restrict to Creative Works that are of a specific format
			// about-tag-type: Restrict to Creative Works with an about tag of a specific type
			// about-tag-predicate: Restrict to Creative Works with an about tag having the supplied predicate
			// about-tag-object: Restrict to Creative Works with an about tag having the supplied object
			// about-tag-search: Restrict to Creative Works with an about tag matching this search item
			// since: Restrict to Creative Works that have been modified since a specified date
			// before: Restrict to Creative Works that have been modified before a specified date
			// createdBy: Restrict to Creative Works that have been created by the specified creator
			// show-query: Returns the SPARQL query that would be executed
			// mixin: The name of the additional feature set to mix into the query. Can either be 'coveredBy' to add news region data or 'totalResults' to add total number of Creative Works matched
			// within: Restrict to Creative Works within a region. Can either be 'birmingham' for Birmingham and the Black Country or 'derbyshire' Derbyshire
			// locator: Restrict to Creative Works with the specified locator(s). Up to a maximum of 20 locator parameters can be specified in each request.
			// page: Page number (20 creative works per page)
			// language: Restrict to Creative Works with this language

			// Basic information about concepts that can be used as tags on creative works
			factory.getTagConcepts = function(params, callback) {
				factory.getJSONLD('/tag-concepts', params, callback);
			};
			// uri: Restrict to only the things that have these URIs
			// language: Restrict to only the things that have specified language
			// legacy: If true, results are restricted to tag:TagConcept, if false, to tagging:TagConcept. Defaults to false.
			// type: Restrict to only things of this type (URI, CURIE, Local Name or GUID)
			// search: Restrict to only things that have a label containing this search term
			// sameAs: Restrict to only things that have these sameAs URIs
			// exclude: Exclude any things that have this type
			// page: Page number (50 things per page)
			// accept: Provide response in the given format (overrides accept header)
			// include-deprecated: Include deprecated things in the result (deprecated things ignored by default)
			// show-query: Returns the SPARQL query that would be executed.

			// Information about the most used tag concepts
			factory.getTagConceptsUsage = function(params, callback) {
				factory.getJSONLD('/tag-concepts-usage', params, callback);
			};
			// page: Page number (50 things per page)
			// since: Return the most used tag concepts since the specified date
			// before: Return the most used tag concepts before the specified date
			// type: Restrict to only things of this type (URI, CURIE, Local Name or GUID)
			// cwork-category: Restrict to only creative works of this category (URI, CURIE)

			// Information about concepts that are tagged together
			factory.getTagConceptsCooccurence = function(params, callback) {
				factory.getJSONLD('/tag-concepts/co-occurrence', params, callback);
			};
			// uri: The URI for which to fetch co-occurring tags
			// since: Restrict results based on creative works modified after this date
			// before: Restrict results based on creative works modified before this date
			// page: Page number

			// Basic information about resources
			factory.getResources = function(params, callback) {
				factory.getJSONLD('/resources', params, callback);
			};
			// uri: Restrict to only the thing that has this URI
			// type: Restrict to only things of this type (URI, CURIE, Local Name or GUID)
			// search: Restrict to only things that have a label containing this search term
			// include-deprecated: Include deprecated things in the result (deprecated things ignored by default)
			// page: Page number
			// page-size: Page size (defaults to 50, maximum of 50)
			// sort-by-created: Sort resources by date created
			// public: Only return properties that can be shown publicly
			
			// Paginated list of datasets
			factory.getDatasets = function(params, callback) {
				factory.getJSONLD('/datasets', params, callback);
			};
			// provider: Restrict to only datasets provided by this provider.
			// product: Restrict to only datasets related to this product. Can be URI, CURIE, Local Name or GUID.
			// hide-deprecated: Restrict to only datasets which are not deprecated.
			// page: Page number (10 datasets per page)

			// Retrieve the content of a Dataset (as Turtle)
			// TODO: Figure out what it means that you can only get it as TTL
			factory.getDatasetData = function(params, callback) {
				factory.getJSONLD('/dataset-data', params, callback);
			};
			// guid: GUID of the dataset to fetch

			// Retrieve the content of an Ontology (as Turtle)
			// TODO: Figure out what it means that you can only get it as TTL
			factory.getOntologyData = function(params, callback) {
				factory.getJSONLD('/ontology-data', params, callback);
			};
			// uri: URI of the ontology to fetch
			// slug: Slug of the ontology to fetch

			// List all ontologies in the store
			factory.getOntologies = function(params, callback) {
				factory.getJSONLD('/ontologies', params, callback);
			};
			// page: Page number (10 ontologies per page)
			// public-only: Whether to only return public ontologies (defaults to false)

			// Return a count for a Subject URI
			factory.getStats = function(params, callback) {
				factory.getJSONLD('/stats', params, callback);
			};
			// uri: URI to return statistics for
			// explicit: Whether to only count using 'FROM onto:explicit' (defaults to false)

			return factory;
		}
	]);