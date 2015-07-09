/**
 * Data selector wrapper with dataset support
 * 
 * @package helpers
 * @author Tibi
 * @version 0.1.0
 */
(function () {
	'use strict';

	iDoo.helpers.install('selector', function (I) {

		var DOM = {
			container: {},
			facade: {},
			instance: {}
		},
			registry,
			console;

		registry = I.require('core.registry');
		console = I.instance('tools.console');
		


		/**
		 * Init new dom container
		 */
		DOM.init = function () {
			this.key = I.require('tools.generator').keygen({ length: 10 });
			registry.set(this.key, {});
		};
		
		/**
		 * @constructor
		 * @param string selector
		 * @return HTMLElement
		 */
		DOM.instance = function (selector) {
			this.element = document.querySelector(selector);
			
			if (null === this.element) {
				//throw new Exception('BadSelectorException', 'Selector "' + selector + '" does not match any HTML node');
				return false;
			}
			
			// TODO - Figure a safe way to store elements
		};
		
		/**
		 * Set/Get attributes
		 * @param string attrName
		 * @param string attrValue
		 */
		DOM.instance.prototype.attr = function (attrName, attrValue) {
			
			if (undefined !== attrName && 'string' !== attrName) {
				throw new Exception('BadSelectorException', 'Attribute name shoud be a string ' + typeof attrName + ' provided');
			}
			
			if(undefined === attrValue) {
				console.log('get attr ['+ attrName +'] for element', this.element);
			} else {
				if ('string' !== typeof attrValue) {
					throw new Exception('BadSelectorException', 'Attribute value shoud be a string ' + typeof attrValue + ' provided');
				}
				
				console.log('set attr ['+ attrName +'] with value [' + attrValue + '] for element', this.element);
			}
		};
		
		 /**
		  * Data set handler
		  *
		 DOM.handler.data = function(dataname) {
			 
		 };
		*/
		
		/**
		 * Register selector helper to internal facade
		 */
		 I.register(DOM.instance);
		 
		/**
		 * Init this component
		 */
		 DOM.init();		
	});
} ());