/**
 * Application's kit will be exposed through here for end user developer
 * 
 * @package libs/app
 * @author Tibi
 * @version 0.1.0
 */

(function () {
	'use strict';

	iDoo.libs.install('app.App', function (I) {
		
		/**
		 * iDoo App main instance
		 */
		var App,
		
		/**
		 * Dependencies
		 */
		 	console,
			events,
		 	registry;
		
		console = I.instance('tools.console');
		registry = I.require('core.registry');
		//events = I.instance('libs.events.Dispatcher');

		/**
		 * Will instantiate a new application handler
		 * @constructor
		 */
		App = function(config) {
			var options = {
				entrypoint: false,
				load: 'sync',
				serverURL: false,
				namespace: 'demo-01' //This should be genereated
			};
			
			// Check loading type
			if(undefined === config.load) {
				console.warn('Loading methid not specified. Assuming: sync');
			} else {
				if ('string' !== typeof config.load) {
					throw new Exception('AppConfigException', 'Param "load" should be a string, ' + typeof config.load + ' provided');
				} else {
					if ('sync' !== config.load && 'async' !== config.load) {
						throw new Exception('AppConfigException', 'Param "load" has unknown value: ' + config.load);
					} else {
						options.updateValueOf('load', config.load);
					}
				}
			}
			
			// Check serverURL
			if ('async' === options.load && false === options.serverURL) {
					console.log('Should add serverURL');
				if (undefined === config.serverURL) {
					throw new Exception('AppConfigException', 'Param "serverURL" is not provided but async loading was specified');	
				} else {
					if ('string' !== typeof config.serverURL) {
						throw new Exception('AppConfigException', 'Param "serverURL" should be a valid address URL');
					} else {
						options.updateValueOf('serverURL', config.serverURL);
					}
				}
			}
			
			if (false === options.entrypoint) {
				if(undefined === config.entrypoint) {
					throw new Exception('AppConfigException', 'Param "seentrypointrverURL" is not provided');	
				} else {
					if ('string' !== typeof config.entrypoint) {
						throw new Exception('AppConfigException', 'Param "entrypoint" should be a string, ' + typeof config.entrypoint + ' provided');
					} else {
						options.updateValueOf('entrypoint', config.entrypoint);
					}
				}
			}
			
			this.init(options);
		};
		
		/**
		 * Init applicaiton. Load entrypoint
		 */
		App.prototype.init = function (options) {
			console.log('APP INIT Config->', options);	
		};
		
		/**
		 * Attach custom events
		 */
		App.prototype.event = {};
		
		/**
		 * //
		 */
		
		/**
		 * Mount this into iDoo CORE
		 */
		this.exposer.register({
			namespace: 'app',
			body: App
		});
	});
	
} ());