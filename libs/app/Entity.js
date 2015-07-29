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

		// Event instance for entity
		Event = new EventInstance('Entity');
		
		/**
		 * @constructor
		 */
		Entity.instance = function (name) {
			this.name = name;

			this.actions = {};
			this.events = {};
		};
		
		/**
		 * Define an action fot entity
		 */
		Entity.instance.prototype.action = function (header, body) {

			if (false !== this.actions.getValueOf(header, false)) {
				throw new Exception ('EntityActionException', 'Action [' + header + '] is already defined');
			}

			this.actions.setValueOf(header, body.bind(new Context(this.name)));
		};
		
		/**
		 * Define an event fot entity
		 * TODO - Add event functionality
		 * TODO - Subscribe to component not to main App
		 */
		/*Entity.instance.prototype.event = function (header, body) {
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
		};*/

		/**
		 * Register this entity to a component owner
		 * @param component
		 */
		Entity.instance.prototype.registerToComponent = function (component) {
			Event.dispatch({
				namespace: 'Component',
				type: 'action',
				action: 'entity-register'
			}, {
				component: component,
				entity: this
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