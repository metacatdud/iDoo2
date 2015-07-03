/**
 * Exceptions - Error prototype extension to better accommodate error handling
 *
 * @package core
 * @author Tibi
 * @version 0.1.0
 */

(function () {
	'use strict';

	var Exceptions = {};

	Exceptions.instence = function (type, message, code) {
		this.name = type;

        if (undefined === code) {
            this.message = ' ' + message;
        } else {
            this.code = code;
            this.message = '[errcode ' + this.code + ']:: ' + message;
        }
	};

	Exceptions.instence.prototype = Object.create(Error.prototype);
	
	/**
	 * Mount this on window DOM
	 */
	window.Exception = function (type, message, code) {
		
		if ('string' !== typeof type) {
            throw new Exceptions.instence('IllegalArgumentException', 'Exception type must be a string', '100');
        }
        
        if (undefined !== code && 'string' !== typeof code) {
            throw new Exceptions.instence('IllegalArgumentException', 'Exception code must be a string and must be specified', '101');
        }

        return new Exceptions.instence(type, message, code);
	};

} ());