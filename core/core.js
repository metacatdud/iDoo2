/**
 * iDoo Core - Everything gets connected through here
 *
 * @package core
 * @author Tibi
 * @version 0.1.0
 * 
 * //TODO - Add exception mechanism and validate this file instructions
 */

window.iDoo = (function (iDooConfig) {
    'use strict';

    var Core = {
        container: {}
    },
        CoreFacade = {},
        Exposer = {
            container: {},
            instances: {}
        },
        Facade = {
            container: {},
            instances: {}
        },
        Install;

    console.log('iDoo2 Core ver ' + iDooConfig.version);

    /**
     * --------------------------
     * CORE components handlers
     * Install - Default function to add ability to install functionlities into components containers
     * Exposer - Will expose iddo functionalities for further use
     * Facade  - Will prepare components internal facades
     * --------------------------
     */
    /**
     * Install - Install functionelity into 
     */
    Install = function (namespace, body) {

        var context,
            facade,
            callee;

        context = Object.copy({
            namespace: this.component + '.' + namespace
        });
        
        // Add exposer
        context.setValueOf('exposer', new Exposer.instance(context.namespace));
        
        // Add facade
        facade = new Facade.instance(context.namespace);
        
        // Store component
        Core.container.setValueOf(context.namespace, body);
        
        // Call for execution immediately
        callee = Core.container.getValueOf(context.namespace);
       
        // Shift component cb context to install caller level scope
        callee.call(context, facade);
    };
    
    /**
     * Exposer instance constructor
     * @param string name - should have namespace.name
     */
    Exposer.instance = function (namespace) {
        this.namespace = namespace;
         
        // Store instance on creation
        if (false === Exposer.instances.getValueOf(namespace, false)) {
            Exposer.instances.setValueOf(namespace, this);
        }
    };
     
    /**
     * Add new functionalities to Idoo pubic object
     * - Examples
     *     iDoo.core.install
     *     iDoo.core.something_1
     *     iDoo.app.init
     * @param object componentRecipe - functionality to be apendet to newly created ns
     * @return mixed void|Exception
     * 
     * //TODO - See if we can find a way to bin internal facade
     */
    Exposer.instance.prototype.register = function (componentRecipe) {

        if (undefined === componentRecipe.namespace) {
            throw new Exception('ComponentRegisterException', 'Component namesapce not defined');
        } else {

            if (false !== Core.container.getValueOf(componentRecipe.namespace, false)) {
                throw new Exception('ComponentRegisterException', 'Component namespace [' + componentRecipe.namespace + '] is already regitered');
            }

            if (undefined !== componentRecipe.namespace && 'string' !== typeof componentRecipe.namespace) {
                throw new Exception('ComponentRegisterException', 'Component namespace should be a string, ' + typeof componentRecipe.namespace + ' provided');
            }
        }

        if ('function' !== typeof componentRecipe.body) {
            throw new Exception('ComponentRegisterException', 'Component mount point should be a function, ' + typeof componentRecipe.body + ' provided');
        }

        Core.container.setValueOf(componentRecipe.namespace, componentRecipe.body);
        CoreFacade.build.inject(componentRecipe.namespace);
    };
     
    /**
     * Facade - Will prepare components for further use into new component facades
     * @constructor
     */
    Facade.instance = function (namespace) {
        this.namespace = namespace;
         
        // Store instance on creation
        if (false === Facade.instances.getValueOf(namespace, false)) {
            Facade.instances.setValueOf(namespace, this);
        }
    };

    /**
     * Get a component as static
     * !!! If it can be instatiated a user will be able to do that
     */
    Facade.instance.prototype.require = function (componentNs) {
        var facade = Facade.container.getValueOf(componentNs, false);

        if (false === facade) {
            throw new Exception('BadFacadeException', 'Component-> [' + componentNs + '] does not exist', '1002');
        }

        return facade;
    };
    
    /**
     * Get a component as instance
     * 
     * // TODO - validate consistency
     */
    Facade.instance.prototype.instance = function (componentNs) {
        var facade = Facade.container.getValueOf(componentNs, false),
            output;

        if (false === facade) {
            throw new Exception('BadFacadeException', 'Component-> [' + componentNs + '] does not exist', '1002');
        }

        if ('function' === typeof facade) {
            return new facade(this.namespace);
        } else {
            if ('object' === typeof facade && false !== facade.getValueOf('instance')) {
                return new facade.instance(this.namespace);
            } else {
                throw new Exception('BadFacadeException', 'Component-> [' + componentNs + '] should be a function to be instatiated', '1003');
            }
        }
    };
    
    /**
     * Register a component facade for next components to use
     */

    Facade.instance.prototype.register = function (componentFacade) {
        var newFacade = Facade.container.getValueOf(this.namespace, false);

        if (false === newFacade) {
            Facade.container.setValueOf(this.namespace, componentFacade);
        } else {
            throw new Exception('FacadeRegisterException', 'Facade-> [' + this.namespace + '] is already registered', '1004');
        }
    };
   
    /**
     * Core facade handler
     * @constructor
     */
    CoreFacade.instance = function () {
        this.export = {};
    };

    /**
     * defaults - Create a facade instance for each component type
     */
    CoreFacade.instance.prototype.defaults = function () {
        var i_comp;

        for (i_comp = 0; i_comp < iDooConfig.components.length; i_comp += 1) {
            this.export[iDooConfig.components[i_comp]] = {
                install: Install,
                component: iDooConfig.components[i_comp]
            };
        }
    };
    
    /**
     * Inject new functionalities through here
     * !!! This is vaidate in Exposer
     */
    CoreFacade.instance.prototype.inject = function (namespace) {
        this.export.setValueOf(namespace, Core.container.getValueOf(namespace));
    };

    /**
     * Run facade creation and export
     */
    CoreFacade.build = new CoreFacade.instance();
    CoreFacade.build.defaults();

    window.comp = Core.container;
    window.facade = Facade;
    window.expose = Exposer;

    return CoreFacade.build.export;

} (iDooConfig));