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
         * EventBus
         * //TODO
         */
         EventBus.create = {};
         EventBus.dispatch = {};
         EventBus.exec = {};
         
		/**
		 * EventBus will agregate all the events throughout the system
		 */
		 EventBus.setupNamespace = function() {
			 
		 };
		 
		 
		 /**
		  * Event - main event controller. Will create a private stack for every instance
		  * @constructor
		  * 
		  * @param string namespace
		  */
		Event.instance = function (namespace) {
			this.namespace = namespace;
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