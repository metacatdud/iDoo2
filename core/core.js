/**
 * iDoo Core - Everything gets connected through here
 *
 * @package core
 * @author Tibi
 * @version 0.1.0
 * 
 * //TODO - Add exception mechanism and validate this file instructions
 */

window.Idoo = (function (iDooConfig) {
    'use strict';

    var Core = {
        component: {},
        container: {}
    },
        Tools = {
            augmentables: {},
            build: {},
            toolbox: {}
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
     * @param object name
     */
    Core.component.install = function (name, body) {
        var context,
            facade,
            callee;

        context = Object.copy({
            namespace: this.name + '.' + name
        });

        Tools.build.toolbox(context);
        
        // Build internal lib for this component
        facade = Tools.build.augments(context);
        
        // Store component to its corresponding container
        Core.container.setValueOf(this.name + '.' + name, body);
        
        // Call for execution immediately
        callee = Core.container.getValueOf(this.name + '.' + name);
        
        // Shift component cb context to intall function level call
        callee.call(context, facade);
    };

    /**
     * -----------------------------------------------------------
     *  Core internal tools for building and augmenting components
     * -----------------------------------------------------------
     */
     
    /**
     * Toolbox will be attached to component callback function scope
     * !!! Note that this will alter the reference
     * 
     * @param object context -  Context to create toolbox for
     * @return void
     */
    Tools.build.toolbox = function (context) {
        var i_toolbox;
        console.log(context);
        for (i_toolbox in Tools.toolbox) {
            context.setValueOf(i_toolbox, Tools.toolbox[i_toolbox]);   
        }
    };

    /**
     * Augments will be attached to component callback function param
     * 
     * @param object context -  Context to create toolbox for
     * @return void
     */
    Tools.build.augments = function (context) {
        var augmentation = {
            load: function (namespace, instance) {
                if ('instance' === instance) {
                    return Tools.augmentables.instance.call(context, namespace, instance);
                } else {
                    return Tools.augmentables.static.call(context, namespace, instance)
                }
            }
        };

        return augmentation;
    };
     
    /**
     * Augmentables handlers
     *  - Instance - Instantiate a component for current conmonent scope
     *  - Static - Receive a referince of the static object
     * //TODO - Wrap this functionality
     */
    Tools.augmentables.instance = function (namespace) {
        console.log('Instantiate component "' + namespace + '" for', this);
    };

    Tools.augmentables.static = function (namespace) {
        console.log('Static component "' + namespace + '" for', this);
    };
    
    /**
     * Toolbox will augment caller scope with extra functionality
     */
    Tools.toolbox.install = function (component) {
        console.log('Install', component, 'on behalf of', this);
    };
    
    /**
     * Core facade handler
     * @constructor
     */
    Facade.instance = function () { };

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
     * Facade inject - Update current facade instance ref
     * //TODO
     */
    Facade.instance.prototype.inject = function () {

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

} (iDooConfig));