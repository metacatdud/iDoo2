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
		var console,
			reg;

		console = I.instance('tools.console');
		reg = I.require('core.registry');

	});
} ());