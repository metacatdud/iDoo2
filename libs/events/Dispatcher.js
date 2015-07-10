/**
 * iDoo - Main event handler. Will control events throughout the system
 * 
 * @package libs/events
 * @author Tibi
 * @version 0.1.0
 */

(function () {
    'use strict';

	iDoo.libs.install('events.Dispatcher', function (I) {
		var EventBus = {
			container: {},
            queue: {},
            temporary: []
		},
			Event = {},
			console,
			reg;

		console = I.instance('tools.console');
		reg = I.require('core.registry');

        /**
         * create - Creates a new event listener
         */
         EventBus.create = function (context, header, body, persistent) {
            var event = {
                persistent: true  
            };
            
            console.debug(header.sortProperties())
            
            if ('string' !== typeof header) {
                throw new Exception('BadEventHeaderException', 'Event header should be a string, ' + typeof header + ' was provided');
            }

            if ('function' !== typeof body) {
                throw new Exception('BadEventHeaderException', 'Event "' + header + '" should be a function, ' + typeof body + 'was provided');
            }

            if (undefined !== persistent && false === persistent) {
                event.updateValueOf('persistent', false);
            }
            
            /**
             * Construct the rest of the event body
             */
            event.setValueOf('module', context.namespace);
            event.setValueOf('action', header);
            event.setValueOf('body', body);
            
            console.debug(event);
         };
         
         /**
          * dispatch - Will dispatch a message to an event listener 
          */
         EventBus.dispatch = {};
         
         /**
          * exec - Execute a dispatch
          */
         EventBus.exec = {};
         
		/**
		 * setupNamespace - EventBus will agregate all the events throughout the system
		 */
		 EventBus.setupNamespace = function (EventInstance) {
			
            if ('string' !== typeof EventInstance.namespace) {
                throw new Exception('EventsSetupException', 'Namespace name should be a string, ' + typeof EventInstance.namespace + ' was provided');
            }

            if (false !== EventBus.container.getValueOf(EventInstance.namespace, false)) {
                throw new Exception('EventsSetupException', 'Namespace "' + EventInstance.namespace + '" is already registered');
            }
            
            EventBus.container.setValueOf(EventInstance.namespace, {});
		 };
		 
		 
		 /**
		  * Event - main event controller. Will create a private stack for every instance
		  * @constructor
		  * 
		  * @param string namespace
		  */
		Event.instance = function (namespace) {
			this.namespace = namespace.replace(/\./g, "-");;
            EventBus.setupNamespace(this);
		};	  
		
		/**
         * Listen
         */
        Event.instance.prototype.listen = function (header, body) {
            EventBus.create(this, header, body);
        };

        /**
         * Listen once and destroy
         */
        Event.instance.prototype.listenOnce = function (header, body) {
            EventBus.create(this, header, body, false);
        };

        /**
         * Dispatch
         */
        Event.instance.prototype.dispatch = function (header, body) {
            EventBus.dispatch(this, header, body);
        };

        /**
         * Destroy
         * TODO
         */
        Event.instance.prototype.destroy = function () {

        };
		
		I.register(Event.instance);
	});
} ());