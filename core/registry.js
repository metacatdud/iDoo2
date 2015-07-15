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
            facade: {}
        };
        
        /**
         * Set a key value pait to registry
         * 
         * @param {String} key
         * @param {Any} value
         * @return {any|throw} value
         */
        Registry.set = function (key, value) {
            var registryEntry = this.container.getValueOf(key, false);

            if (false !== registryEntry) {
                throw new Exception('RegistryException', 'Key ' + key + ' is already registered', 'idoo200');
            }

            this.container.setValueOf(key, value);
        };
        
        /**
         * Get the value of a key from registry
         * @param {String} key
         * @return {MIxed} value of the key or false if nothing found
         */
        Registry.get = function (key) {
            var registryEntry = this.container.getValueOf(key, false);

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
        Registry.delete = function (key) {
            var registryEntry = this.container.getValueOf(key, false);

            if (false === registryEntry) {
                return false;
            }

            this.container.unsetValueOf(key);
            return true;
        };
        
        /**
         * Registry facade
         */
        Registry.facade = {
            get: function (key) {
                return Registry.get(key);
            },
            set: function (key, value) {
                return Registry.set(key, value);
            },
            delete: function (key) {
                return Registry.delete(key);
            }
        };
        
        I.register(Registry.facade);
        window.reg = Registry.container;
    });
} ());
