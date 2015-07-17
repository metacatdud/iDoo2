/**
 * iDoo entity designer - define enities that will be mounted into your app instance 
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
		var Entity = {
			instance: {}
		},
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

			Event.dispatch({
				namespace: 'App',
				type: 'action',
				action: 'entity-register'
			}, this.name);
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
		
		/**
		 * Register Entity component
		 */
		this.exposer.register({
			namespace: 'entity',
			body: Entity.instance
		});
	});
} ());