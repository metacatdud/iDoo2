/**
 * iDoo - Main event handler. Will control events throughout the system
 * 
 * @package libs/events
 * @author Tibi
 * @version 0.1.0
 */

(function () {
    'use strict';

	iDoo.libs.install('events', function (I) {
		var console = I.instance('tools.console'),
			reg = I.require('core.registry');
		
		
		reg.set('test', '[test] -> Simple key setup');
		reg.set('complex.test', '[complex.test] -> complex key setup');
		reg.set('complex.obj', {test: '[complex.obj] -> complex obj'});
		
		console.log(reg.get('test'));
		console.log(reg.get('complex.test'));
		console.log(reg.get('complex.obj'));
		console.log('Test');
	});
	
} ());