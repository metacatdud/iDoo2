/**
 * Binds data to specified views
 *
 * @package libs/html
 * @author Tibi
 * @version 0.1.0
 *
 */

(function() {
    'use strict';

    iDoo.libs.install('html.View', function (I) {

        var View = {},
            registry,
            console;


        // Dependencies
        console = I.instance('tools.console');
        registry = I.instance('core.registry');


        View.instance = function (name) {
            this.name = name;

            registry.set(name, this);
        };

        View.instance.prototype.data = function(data) {
            console.log('parse data::', data, 'Context', this);
        };

        I.register({
            instance: View.instance
        });

    });

} ());