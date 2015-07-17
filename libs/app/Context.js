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
 * TODO - Make this available for components only.
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
            'libs.html.Selector'
        ];


        console = I.instance('tools.console');

        Context.instance = function (name) {
            //this.name = name;
            var context = {};

            for (i_silo = 0; i_silo < Silo.length; i_silo +=1) {
                var tmpComponent;

                tmpComponent = I.require(Silo[i_silo]);

                if ('function' === typeof  tmpComponent) {
                    tmpComponent = new tmpComponent(name);
                }

                context.setValueOf(Silo[i_silo], tmpComponent);
            }

            return context;
        };

        I.register(Context.instance);
    });
} ());