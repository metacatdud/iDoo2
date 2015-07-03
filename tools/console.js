/**
 * Console warpper to adapt context and keep track of the environment
 * 
 * @package tools
 * @author Tibi
 * @version 0.1.0
 */
(function () {
    'use strict';
    
    iDoo.tools.install('console', function (I) {
        
        /**
         * Console constructor
         */
        var Console = {
            instance: {}
        };
        
        Console.instance = function (name, type) {
			this.name = name.toUpperCase();
            this.type = type;
		};
        
        /**
		 * -------------------------------
		 * Console instance protos
		 * -------------------------------
		 */
		
		/**
		 * log
		 * @param {Any}
		 * @return {Console.log} any
		 */
		Console.instance.prototype.log = function () {
			console.log.apply(console, ['[' + this.name + ']::'].concat(Array.prototype.slice.call(arguments, 0)));
		};
        
        /**
		 * warn
		 * @param {Any}
		 * @return {Console.warn} any
		 */
		Console.instance.prototype.warn = function () {
			console.warn.apply(console, ['[' + this.name + ']::'].concat(Array.prototype.slice.call(arguments, 0)));
		};
		
		/**
		 * info
		 * @param {Any}
		 * @return {Console.info} any
		 */
		Console.instance.prototype.info = function () {
			console.info.apply(console, ['[' + this.name + ']::'].concat(Array.prototype.slice.call(arguments, 0)));
		};
		
		/**
		 * debug
		 * @param {Any}
		 * @return {Console.debug} any
		 */
		Console.instance.prototype.debug = function () {
			console.debug.apply(console, ['[' + this.name + ']::'].concat(Array.prototype.slice.call(arguments, 0)));
		};
        
        /**
         * Export facade
         */
        I.register(Console.instance);
        
    });
}());