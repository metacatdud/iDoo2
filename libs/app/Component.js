/**
 * iDoo entity designer - define components that will be mounted into your app instance
 *
 * @package libs/app
 * @authir Tibi
 * @version 0.1.0
 *
 * TODO - Grab entities and put them together into a component instance ns and store it to App instance
 */

(function () {
    'use strict';

    iDoo.libs.install('app.Component', function(I) {
        var Component = {
                entity: {}
            },
            console,
            events,
            Event;


        console = I.instance('tools.console');
        events = I.require('libs.events.Dispatcher');
        Event = new events('Component');

        /**
         * Entity handlers
         */
        Component.entity.register = function (entity) {
            console.log('Register entity', entity.data.name, 'to component', entity.component, entity);
        };

        /**
         * ------------------
         * Component events
         * ------------------
         */
        Event.listen({
            action: 'entity-register'
        }, Component.entity.register);

        /**
         * @constructor
         * @param {string} name
         */
        Component.instance = function (name) {
            console.log('Instantiate:', name);
        };


        /**
         * Register Component lib
         */
        this.exposer.register({
            namespace: 'Component',
            body: Component.instance
        });
    });

} ());