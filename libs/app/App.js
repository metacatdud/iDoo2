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
			console,
			DOM,
			Event,
			registry;

		console = I.instance('tools.console');
		registry = I.require('core.registry');
		DOM = I.require('helpers.selector');
				
		Event = I.instance('libs.events.Dispatcher');
		
		/**
		 * Will instantiate a new application handler
		 * @constructor
		 */
		App = function (config) {
			this.options = {
				entrypoint: false,
				htmlNode: false,
				load: 'sync',
				serverURL: false,
				namespace: 'demo-01' //This should be genereated
			};
			
			// Check loading type
			if (undefined === config.load) {
				console.warn('Loading method not specified. Assuming: sync');
			} else {
				if ('string' !== typeof config.load) {
					throw new Exception('AppConfigException', 'Param "load" should be a string, ' + typeof config.load + ' provided');
				} else {
					if ('sync' !== config.load && 'async' !== config.load) {
						throw new Exception('AppConfigException', 'Param "load" has unknown value: ' + config.load);
					} else {
						this.options.updateValueOf('load', config.load);
					}
				}
			}
			
			// Check serverURL
			if ('async' === this.options.load && false === this.options.serverURL) {
				if (undefined === config.serverURL) {
					throw new Exception('AppConfigException', 'Param "serverURL" is not provided but async loading was specified');
				} else {
					if ('string' !== typeof config.serverURL) {
						throw new Exception('AppConfigException', 'Param "serverURL" should be a valid address URL');
					} else {
						this.options.updateValueOf('serverURL', config.serverURL);
					}
				}
			}

			if (false === this.options.entrypoint) {
				if (undefined === config.entrypoint) {
					throw new Exception('AppConfigException', 'Param "seentrypointrverURL" is not provided');
				} else {
					if ('string' !== typeof config.entrypoint) {
						throw new Exception('AppConfigException', 'Param "entrypoint" should be a string, ' + typeof config.entrypoint + ' provided');
					} else {
						this.options.updateValueOf('entrypoint', config.entrypoint);
					}
				}
			}

			if (undefined !== config.htmlNode && 'string' !== typeof config.htmlNode) {
				throw new Exception('AppConfigException', 'Param "htmlNode" should be a string, ' + typeof config.htmlNode + ' provided');
			} else {
				this.options.updateValueOf('htmlNode', config.htmlNode);
			}

		};
		
		/**
		 * Init applicaiton. Load entrypoint
		 */
		App.prototype.boot = function (options) {
			var options = this.options;
			document.addEventListener("DOMContentLoaded", function (event) {
				//Move extra checks into a static area of this component
				//new DOM('[data-app="' + options.htmlNode + '"')
			});
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