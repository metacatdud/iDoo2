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
            var context = {};

            /**
             * HARDCODED PATHS FOR TESTING PURPOSES
             */
            //View
            var view = I.require('libs.html.View');
            view = new view.instance(name);

            context.setValueOf('view', function() {
                return view.data.bind(view);
            });


            return context;
        };

        I.register(Context.instance);
    });
} ());