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
		var App = {
			container: {},
			entity: {}
		},
			AppEvent,
			console,
			DOM,
			EventInstance,
			registry;

		// Dependencies	
		console = I.instance('tools.console');
		registry = I.require('core.registry');
		
		DOM = I.require('libs.html.Selector');
		EventInstance = I.require('libs.events.Dispatcher');
		AppEvent = new EventInstance('App');
		
		/**
		 * Will instantiate a new application handler
		 * @constructor
		 */
		App.instance = function (config) {
			this.options = {
				entryPoint: false,
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

			if (false === this.options.entryPoint) {
				if (undefined === config.entryPoint) {
					throw new Exception('AppConfigException', 'Param "seentrypointrverURL" is not provided');
				} else {
					if ('string' !== typeof config.entryPoint) {
						throw new Exception('AppConfigException', 'Param "entrypoint" should be a string, ' + typeof config.entryPoint + ' provided');
					} else {
						this.options.updateValueOf('entrypoint', config.entryPoint);
					}
				}
			}

			if (undefined !== config.htmlNode && 'string' !== typeof config.htmlNode) {
				throw new Exception('AppConfigException', 'Param "htmlNode" should be a string, ' + typeof config.htmlNode + ' provided');
			} else {
				this.options.updateValueOf('htmlNode', config.htmlNode);
			}
			
			// Add the rest of configs
			this.options.expand(config);

		};
		
		/**
		 * Init applicaiton.
		 *  - Store instance 
		 *  - Load entrypoint
		 */
		App.instance.prototype.boot = function () {
			
			App.updateValueOf('container', this);
			
			// Save main app element when DOM Ready!
			document.addEventListener('DOMContentLoaded', function (event) {
				console.info('Register main HTML node');
				DOM.instance('app', App.container.options.htmlNode);
				
				AppEvent.dispatch({
					type: 'action',
					action: 'dom-ready'
				});
			});
		};
				
		/**
		 * @event listener
		 * App entity registry handler
		 */
		App.entity.register = function (entity) {
			console.log('Regsiter', entity);
		};
		
		/**
		 * @event listener
		 * Page DOM ready
		 */
		App.domReady = function () {
			console.info('DOM loaded. Boot app');
			
			AppEvent.dispatch({
				type: 'action',
				action: 'app-ready'
			})	
		};
		
		/**
		 * @event listener
		 * App ready
		 */
		App.ready = function () {
			console.info('!!! BOOT !!!');	
		};
		 
	   	/**
	 	 * @event
		 * Register entity
		 */
		AppEvent.listen({
			action: 'entity-register'
		}, App.entity.register);
		
		/**
		 * @event
		 * App page DOM loaded
		 */
	 	AppEvent.listen({
			action: 'dom-ready'
		}, App.domReady);
		
		/**
		 * @event
		 * App boot when everything is ready
		 */
	 	AppEvent.listen({
			action: 'app-ready'
		}, App.ready);
		
		/**
		 * Mount this into iDoo CORE
		 */
		this.exposer.register({
			namespace: 'app',
			body: App.instance
		});
	});

} ());