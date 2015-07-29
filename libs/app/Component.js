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
                entity: {},
                entities: {},
                event: {}
            },
            console,
            events,
            Event;


        console = I.instance('tools.console');
        events = I.require('libs.events.Dispatcher');
        Event = new events('Component');

        /**
         * --------------------
         * Entity handlers
         * --------------------
         */

        /**
         * Register an entity to component
         * @param event
         */
        Component.event.register = function (event) {
            var regResult;

            if (false === Component.entities.getValueOf(event.component, false)) {
                throw new Exception ('EntityRegisterException', 'Entity [' + event.component + '] does not exist');
            }

            regResult = Component.entity.register(event);

            /**
             * Signal app that this component is ready and loaded
             */
            if(true === regResult) {
                console.log('Register component to app');
            }

        };

        /**
         * ------------------
         * Component events
         * ------------------
         */
        Event.listen({
            action: 'entity-register'
        }, Component.event.register);

        /**
         * @constructor
         * @param {string} name
         */
        Component.instance = function (name) {
            if (false !== Component.entities.getValueOf(name, false)) {
                throw new Exception ('ComponentException', 'Component [' + name + '] is already registered');
            }

            Component.entities.setValueOf(name, {});
        };

        /**
         * Component entity register
         * @return mixed
         */
        Component.entity.register = function (eventData) {
            var component,
                i_action,
                i_event;

            component = Component.entities.getValueOf(eventData.component, false);

            if(false !== component.getValueOf(eventData.entity.name, false)) {
                //throw new Exception ('EntityRegisterException', 'Entity [' + eventData.entity.name + '] is already registered');
            }

            for (i_action in eventData.entity.actions) {
                console.log('Register action', eventData.entity.name, eventData.entity.actions.getValueOf(i_action));
                component.setValueOf(eventData.entity.name + '.' + i_action, eventData.entity.actions.getValueOf(i_action));
            }

            console.log(Component.entities);
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