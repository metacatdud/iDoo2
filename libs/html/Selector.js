/**
 * Data selector wrapper with dataset support
 * !!! Very low level. Should not be used by end-dev for application
 * 
 * @package helpers
 * @author Tibi
 * @version 0.1.0
 * 
 * //TODO - Remove
 */
(function () {
	'use strict';

	iDoo.libs.install('html.Selector', function (I) {

		var DOM = {
			container: {},
			facade: {},
			instance: {}
		},
			registry,
			console;

		registry = I.instance('core.registry');
		console = I.instance('tools.console');

		/**
		 * Init new dom container
		 */
		DOM.init = function () {};
		
		/**
		 * @constructor
		 * @param string selector
		 * @return HTMLElement
		 */
		DOM.instance = function (selector, value) {
			var queryString;
			
			queryString = '[data-'+ selector + '="' + value + '"]';
			
			this.element = document.querySelector(queryString);
			
			if (null === this.element) {
				return false;
			}
			
			if(false === registry.get(selector)) {
				registry.set(selector, this.element);
			}
		};
		
		/**
		 * Set/Get attributes
		 * @param string attrName
		 * @param string attrValue
		 */
		DOM.instance.prototype.attr = function (attrName, attrValue) {
			
			if (undefined !== attrName && 'string' !== typeof attrName) {
				throw new Exception('BadSelectorException', 'Attribute name shoud be a string ' + typeof attrName + ' provided');
			}
			
			if(undefined === attrValue) {
				return this.element.getAttribute(attrName);
			} else {
				if ('string' !== typeof attrValue) {
					throw new Exception('BadSelectorException', 'Attribute value shoud be a string ' + typeof attrValue + ' provided');
				}

				this.element.setAttribute(attrName, attrValue);
			}
		};
		
		/**
		 * Get element from internal DOM storage
		 * @return mixed boolean|HTMLElement
		 */
		DOM.get = function(dataname) {
			return registry.get(dataname)
		};
		
		/**
		 * Remove element from internal DOM storage
		 * @return mixed boolean|HTMLElement
		 */
		DOM.delete = function (dataname) {
			return registry.delete(dataname);
		};
		 
		/**
		 * Register selector helper to internal facade
		 */
		I.register({
			instance: function (selector, value) {
				return new DOM.instance(selector, value);
			},
			get: function (dataname) {
				return DOM.get(dataname);
			},
			delete: function (dataname) {
				return DOM.delete(dataname);
			}
		});
		 
		/**
		 * Init this component
		 */
		 DOM.init();		
	});
} ());