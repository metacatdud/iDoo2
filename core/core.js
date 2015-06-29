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
        Tools = {
            build:{}
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
        var context;
        
        context = Object.copy({
            name: this.name + '.' + name,
            body: body
        });
        
        Tools.build.toolbox(context);
        
        Core.container.setValueOf(this.name + '.' + name, body);
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
     * -----------------------------------------------------------
     *  Core internal tools for building and augmenting components
     * -----------------------------------------------------------
     */
     
     /**
      * Tools box will be attached to component callback function
      * @return {Object}
      */
     Tools.build.toolbox = function () {
         console.log('Build toolbox for::', this);
     };
    
     Tools.build.augments = function () {
         console.log('Build augments for::', this);
     };
     
     
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
window.comp = Core.container;
    return Facade.build.export;

}(iDooConfig));