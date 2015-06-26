/**
 * iDoo Core - Everything gets connected through here
 *
 * @package core
 * @author Tibi
 * @version 0.1.0
 */

window.Idoo = (function (iDooConfig) {
    'use strict';

    var Core = {
            component: {},
            container: {}
        },
        Facade = {
            build: {}
        };

    console.log('iDoo2 Core ver ' + iDooConfig.version);

    /**
     * --------------------------
     * CORE components handlers
     * --------------------------
     */

    /**
     * Core component install - Install a new component
     * @param {Object} Component info
     */

    Core.component.install = function (name, body) {
        console.log('Install::', name, body, 'INTO::', this);
    };

    /**
     * Core component request
     *
     * @param {String} component namespace
     * @param {String} component receiving type static|instance
     * @return {Object|Function}
     */
    Core.component.request = function (name, type) {
        console.log('Call::', name, 'as', type);
    }

    /**
     * Core facade handler
     * @constructor
     */
    Facade.instance = function () {

    };

    /**
     * Create a facade instance for each component type
     */
    Facade.instance.prototype.create = function () {
        var i_comp;

        for (i_comp = 0; i_comp < iDooConfig.components.length; i_comp += 1) {
            this.export[iDooConfig.components[i_comp]] = {
                install: Core.component.install,
                request: Core.component.request,
                name: iDooConfig.components[i_comp]
            };
        }
    };

    /**
     * Export the facade for public use
     */
    Facade.instance.prototype.export = {};


    /**
     * Run facade creation and export
     */
    Facade.build = new Facade.instance();
    Facade.build.create();
    console.log(Facade.build);
    return Facade.build.export;

}(iDooConfig));