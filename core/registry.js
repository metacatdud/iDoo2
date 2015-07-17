/**
 * iDoo core registry - Simple key value temporary storage for internal use purposes
 *
 * @package core
 * @author Tibi
 * @version 0.1.0
 */

(function () {
    'use strict';

    iDoo.core.install('registry', function (I) {
        
        /**
         * Registry object
         */
        var Registry = {
            container: {},
            static: {},
            facade: {}
        };

        
        /**
         * Set a key value pait to registry
         * 
         * @param {String} key
         * @param {Any} value
         * @return {any|throw} value
         */
        Registry.static.set = function (key, value) {
            var registryEntry;

            if (true === this instanceof Registry.instance) {
                key = this.key + '.' + key
            }

            registryEntry = Registry.container.getValueOf(key, false);

            if (false !== registryEntry) {
                throw new Exception('RegistryException', 'Key ' + key + ' is already registered', 'idoo200');
            }

            Registry.container.setValueOf(key, value);
        };
        
        /**
         * Get the value of a key from registry
         * @param {String} key
         * @return {MIxed} value of the key or false if nothing found
         */
        Registry.static.get = function (key) {
            var registryEntry;

            if (true === this instanceof Registry.instance) {
                key = this.key + '.' + key
            }

            registryEntry = Registry.container.getValueOf(key, false);

            if (false === registryEntry) {
                return false;
            }

            return registryEntry;
        };
        
        /**
         * Delete something from registry
         * @param {String} key
         * @return {Boolean}
         */
        Registry.static.delete = function (key) {
            var registryEntry;

            if (true === this instanceof Registry.instance) {
                key = this.key + '.' + key
            }

            registryEntry = Registry.container.getValueOf(key, false);

            if (false === registryEntry) {
                return false;
            }

            Registry.container.unsetValueOf(key);
            return true;
        };

        /**
         * @constructor
         * Instantiate registry for private storage
         */
        Registry.instance = function () {
            this.key = I.require('tools.generator').keygen();
        };

        /**
         * Copy main object proto to instance
         */
        Registry.instance.prototype = Object.create(Registry.static);
        
        /**
         * Registry facade
         */
        Registry.facade = {
            get: function (key) {
                return Registry.static.get(key);
            },
            set: function (key, value) {
                return Registry.static.set(key, value);
            },
            delete: function (key) {
                return Registry.static.delete(key);
            },
            instance: Registry.instance
        };
        
        I.register(Registry.facade);
        window.reg = Registry.container;
    });
} ());
