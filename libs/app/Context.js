/**
 * Context creator for entities and components.
 * This will prepare super facades for end to use
 * !!! For safety DO NOT BY PASS THIS
 * 
 * @package libs/app
 * @author Tibi
 * @version 0.1.0
 *
 * TODO - Remove Silo static array. Make Exposer more smart
 */
 
(function () {
	'use strict';

	iDoo.libs.install('app.Context', function (I) {

        var Context = {},
            Silo,
            console,
            i_silo;

        /**
         * @type {string[]}
         * What can be exposed to end dev
         */
        Silo = [
            'tools.console',
            'libs.events.Dispatcher',
            'libs.html.Selector',
            'core.registry'
        ];


        console = I.instance('tools.console');

        Context.instance = function (name) {
            this.name = name;
            console.log('Prepare context for', this.name);
        };

        I.register(Context.instance);
    });
} ());