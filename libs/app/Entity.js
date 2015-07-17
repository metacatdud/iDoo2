/**
 * iDoo entity designer - define entities that will be mounted into your Components
 * 
 * @package libs/app
 * @authir Tibi
 * @version 0.1.0
 */
(function () {
	'use strict';

	iDoo.libs.install('app.Entity', function (I) { 
		
		/**
		 * Entity main object
		 */
		var Entity = {},
			console,
			Context,
			EventInstance,
			Event;
		
		// Dependencies	
		console = I.instance('tools.console');
		Context = I.require('libs.app.Context');
		EventInstance = I.require('libs.events.Dispatcher');


		Event = new EventInstance('Entity');
		
		/**
		 * @constructor
		 */
		Entity.instance = function (name) {
			this.name = name;

			this.context = new Context(this.name);
		};
		
		/**
		 * Define an action fot entity
		 */
		Entity.instance.prototype.action = function (header, body) {
			var entity;

			entity = {
				name: this.name,
				header: header,
				type: 'action'	
			};
			entity.setValueOf('body', body.bind(this.context));
			
			Event.dispatch({
				namespace: 'App',
				type: 'action',
				action: 'entity-update'
			}, entity);
		};
		
		/**
		 * Define an event fot entity
		 * TODO - Add event functionality
		 */
		Entity.instance.prototype.event = function (header, body) {
			var entity;

			entity = {
				name: this.name,
				header: header,
				type: 'event'	
			};

			entity.setValueOf('body', body.bind(this.context));
			
			Event.dispatch({
				namespace: 'App',
				type: 'action',
				action: 'entity-update'
			}, entity);
		};

		Entity.instance.prototype.registerToComponent = function (component) {
			Event.dispatch({
				namespace: 'Component',
				type: 'action',
				action: 'entity-register'
			}, {
				component: component,
				data: this
			});
		};

		/**
		 * Register Entity component
		 */
		this.exposer.register({
			namespace: 'Entity',
			body: Entity.instance
		});
	});
} ());