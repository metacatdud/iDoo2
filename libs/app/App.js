/**
 * Application's kit will be exposed through here for end user developer
 * 
 * @package libs/app
 * @author Tibi
 * @version 0.1.0
 *
 * TODO - Redesign architecture pattern Entity -> Component -> App
 */

(function () {
	'use strict';

	iDoo.libs.install('app.App', function (I) {
		
		/**
		 * iDoo App main instance
		 */
		var App = {
			container: {},
			entity: {},
			loader: {}
		},
			AppEvent,
			console,
			DOM,
			EventInstance,
			registry;

		// Dependencies	
		console = I.instance('tools.console');
		registry = I.instance('core.registry');


		DOM = I.require('libs.html.Selector');
                    EventInstance = I.require('libs.events.Dispatcher');
		AppEvent = new EventInstance('App');
		
		/**
		 * Will instantiate a new application handler
		 * @constructor
		 */
		App.instance = function (config) {
			var loadResources;
			
			this.options = {
				entryPoint: false,
				htmlNode: false,
				load: 'sync',
				serverURL: false,
				loadList: false,
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
			
			loadResources = App.loadResources({
				load: config.load,
				serverURL: config.serverURL,
				loadList: config.loadList
			});

			if ('fail' === loadResources.stauts) {
				throw new Exception('AppConfigException', loadResources.errorMsg);
			} else {
				this.options.expand(loadResources.data, true);
			}
				
			if (false === this.options.entryPoint) {
				if (undefined === config.entryPoint) {
					throw new Exception('AppConfigException', 'Param "entryPoint" is not provided');
				} else {
					if ('string' !== typeof config.entryPoint) {
						throw new Exception('AppConfigException', 'Param "entryPoint" should be a string, ' + typeof config.entryPoint + ' provided');
					} else {
						this.options.updateValueOf('entryPoint', config.entryPoint);
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
		 * Init application.
		 *  - Store instance 
		 *  - Load entrypoint
		 */
		App.instance.prototype.boot = function () {
			
			App.updateValueOf('container', {
				options:     this.options,
				entities:    {},
				components:  {}
			});
			
			// Save main app element when DOM Ready!
			document.addEventListener('DOMContentLoaded', function (event) {

				DOM.instance('app', App.container.options.htmlNode);

				AppEvent.dispatch({
					type: 'action',
					action: 'dom-ready'
				});
			});
		};
		
		/**
		 * App resource loading handler
		 * @params object loadInfo - how to load resources
		 * @return object status of parsing and message
		 * 
		 * //TODO - Add more validations
		 */
	 	App.loadResources = function (loadInfo) {
			var output = {};
			
			if (undefined === loadInfo.load) {
				loadInfo.setValueOf('load', 'sync');
			}
			
			if('sync' === loadInfo.load) {
				if(undefined === loadInfo.loadList) {
					output = {
						stauts: 'fail',
						errorMsg: 'Synchronous resources loading requested but loadList parameter was not specified'
					};
				} else {
					output = {
						status: 'success',
						data: {
							load: loadInfo.load,
							loadList: loadInfo.loadList
						}
					};
				}
			}
			
			if ('async' === loadInfo.load) {
				if(undefined === loadInfo.serverURL) {
					output = {
						stauts: 'fail',
						errorMsg: 'Asynchronous resources loading requested but serverURL parameter was not specified'
					};
				} else {
					output = {
						status: 'success',
						data: {
							load: loadInfo.load,
							loadList: loadInfo.loadList
						}
					};
				}
			}
			
			return output;
		};
		
		/**
		 * App loading handler available steps to load
		 */
		App.loader.currentStatus = {
			dom: 		false,
			app: 		false,
			entrypoint: false
		};
		
		/**
		 * @event listener
		 * Check current status for loader
		 */
		App.loader.check = function () {
		 	if (true === App.loader.currentStatus.dom && true === App.loader.currentStatus.app && true === App.loader.currentStatus.entrypoint) {
				AppEvent.dispatch({
					type: 'action',
					action: 'app-ready'
		 		});
			} else {
				// console.warn('App not ready', App.loader.currentStatus);
			}
		};
		
		/**
		 * Update a section that was just loaded
		 */
		App.loader.update = function (section) {

			this.currentStatus.updateValueOf(section.name, section.status);
		 	
            AppEvent.dispatch({
				type: 'action',
				action: 'load-check'
		 	});
		};
		
		/**
		 * @deprecated
		 * @event listener
		 * App entity registry handler
		 */
		App.entity.register = function (entityName) {
		
			if (false !== App.container.getValueOf(entityName, false)) {
				throw new Exception ('EntityRegisterException', 'Entity [' + entity.header + '] is already regstered');
			}
			
			App.container.entities.setValueOf(entityName, {});
			
			if('sync' === App.container.options.load) {
				App.container.options.loadList.splice(App.container.options.loadList.indexOf(entityName), 1);
			}
			
			if (0 === App.container.options.loadList.length) {
				App.loader.update({
					name: 'app',
					status: true
				});
			}
		};
		
		/**
		 * @deprecated
		 * @event lsitener
		 * App entity update
		 * 
		 * @param object entityPart
		 */
		App.entity.update = function (entityPart) {
			
			App.container.entities.setValueOf(entityPart.name + '.' + entityPart.header, {
				type: entityPart.type,
				body: entityPart.body
			});
			
			// If this is the entrypoint signal to loader
			if (App.container.options.entryPoint === entityPart.name + '.' + entityPart.header) {
				App.loader.update({
					name: 'entrypoint',
					status: true
				});
			}
		};
		
		/**
		 * @event listener
		 * Page DOM ready
		 */
		App.domReady = function () {
			App.loader.update({
				name: 'dom',
				status: true
			});
		};
		
		/**
		 * @event listener
		 * App ready
		 */
		App.ready = function (loaded) {
			var entryPointCb;
			
			entryPointCb = App.container.entities.getValueOf(App.container.options.entryPoint);
			
			if('action' === entryPointCb.type) {
				entryPointCb.body.call();
			}
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
		 * Update entity
		 */
		AppEvent.listen({
			action: 'entity-update'
		}, App.entity.update);
		
		/**
		 * @event
		 * App page DOM loaded
		 */
	 	AppEvent.listen({
			action: 'dom-ready'
		}, App.domReady);
		
		/**
		 * @event
		 * App loading status check
		 */
		 AppEvent.listen({
			action: 'load-check'
		}, App.loader.check);
		
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
			namespace: 'App',
			body: App.instance
		});
	});

} ());