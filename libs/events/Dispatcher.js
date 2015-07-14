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
            temporary: [],
            types: ['action', 'shout', 'chain', 'to']
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
            
            if ('object' !== typeof header) {
                throw new Exception('BadEventHeaderException', 'Event header should be a object, ' + typeof header + ' was provided');
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
            event.setValueOf('namespace', context.namespace);
            
            if (undefined !== header.action && 'string' === typeof header.action) {
                event.setValueOf('action', header.action);
            }
            
            event.setValueOf('body', body);
            
            console.debug('Parsed event:::', event);
            
            /**
             * If event is temporary put it into temporary array queue to be removed after first call
             */
            if (false === event.persistent) {
                EventBus.temporary.push(context.namespace + '.' + event.action);
            }
            
            EventBus.container.setValueOf(context.namespace + '.' + event.action, event.body);
         };
         
         /**
          * dispatch - Will dispatch a message to an event listener 
          */
         EventBus.dispatch = function (context, header, body) {
             var event = {
                type: {}
            };

            if ('object' !== typeof header) {
                throw new Exception('EventDispatcherException', 'Event dispatcher header should be object, ' + typeof header + ' was provided');
            }

            if (undefined === header.namespace) {
                event.setValueOf('namespace', context.namespace);
            } else {
                event.setValueOf('namespace', header.namespace);
            }

            if (undefined === header.type) {
                //Throw
                console.log('Header type undefined');
            } else {
                if(-1 === EventBus.types.indexOf(header.type)) {
                    //Throw
                    console.log('Header type not in list');
                }
                event.updateValueOf('type', header.type);
                
                //TODO - handle all posibilities
                event.setValueOf('action', header.action);
            }

            if (undefined !== body) {
                event.setValueOf('body', body);
            }
            
            console.debug('Exec ', event);
            this.exec(event);
         };
         
         /**
          * exec - Execute a dispatch
          */
         EventBus.exec = function (event) {
            var actionIsPersistent,
                dispatchCb,
                targetContainer;
            
            targetContainer =  EventBus.container.getValueOf(event.namespace);
            
            //TODO - Handle other types
            if ('action' === event.type) {
                actionIsPersistent = (-1 !== EventBus.temporary.indexOf(event.namespace + '.' + event.action) ? false : true);
                dispatchCb = EventBus.container.getValueOf(event.namespace + '.' + event.action, false);
                
                /**
                 * Unset listener if it's a temp
                 */
                if (false === actionIsPersistent) {
                    EventBus.temporary.splice(EventBus.temporary.indexOf(event.namespace + '.' + event.action), 1);
                    EventBus.container.unsetValueOf(event.namespace + '.' + event.action);
                }

                /**
                 * If no more listeners into module, remove module object also
                 */
                if (undefined !==  targetContainer && 0 === Object.getOwnPropertyNames(targetContainer).length) {
                    EventBus.container.unsetValueOf(event.namespace);
                }
                
                if(undefined !== dispatchCb && 'function' === typeof dispatchCb) {    
                    dispatchCb(event.body);
                }
            }        
                 
         };
         
		/**
		 * setupNamespace - EventBus will agregate all the events throughout the system
		 */
		 EventBus.setupNamespace = function (EventInstance) {
			
            if ('string' !== typeof EventInstance.namespace) {
                throw new Exception('EventsSetupException', 'Namespace name should be a string, ' + typeof EventInstance.namespace + ' was provided');
            }

            if (-1 !== EventInstance.namespace.indexOf('.')) {
                throw new Exception('EventsSetupException', 'Namespace "' + EventInstance.namespace + '" contains illegal characters "." ');
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
			this.namespace = namespace; 
            //namespace.replace(/\./g, "-");
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
		window.EventBus = EventBus;
		I.register(Event.instance);
	});
} ());