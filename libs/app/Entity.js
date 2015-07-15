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
			registry,
			EventInstance,
			Event;
		
		// Dependencies	
		console = I.instance('tools.console');
		registry = I.require('core.registry');
		EventInstance = I.require('libs.events.Dispatcher');
		Event = new EventInstance('Entity');
		
		/**
		 * @constructor
		 */
		Entity.instance = function (name) {
			this.name = name;
		};
		
		/**
		 * Define an action fot entity
		 */
		Entity.instance.prototype.action = function (header, body) {
			var entity = {};
			
			entity.setValueOf('header', this.name + '.' + header);
			entity.setValueOf('body', body);
			entity.setValueOf('type', 'action');
			
			Event.dispatch({
				namespace: 'App',
				type: 'action',
				action: 'entity-register'
			}, entity);
		};
		
		/**
		 * Define an event fot entity
		 */
		Entity.instance.prototype.event = function (header, body) {
			var entity = {};
			
			entity.setValueOf('header', this.name + '.' + header);
			entity.setValueOf('body', body);
			entity.setValueOf('type', 'action');
			
			Event.dispatch({
				namespace: 'App',
				type: 'action',
				action: 'entity-register'
			}, entity);
		};
		
		/**
		 * Register component
		 */
		this.exposer.register({
			namespace: 'entity',
			body: Entity.instance
		});
	});
} ());