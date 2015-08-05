/**
 * Vendor interface - Will add a simple wrapper over various 3rd party scripts to be able to use them with app context
 *
 * NOTE
 * @package libs/vendors
 * @author Tibi
 * @version 0.1.0
 *
 * todo - Should expose API to create vendors wrappers
 */

(function () {
    'use strict';

    iDoo.libs.install('vendors.Interface', function (I) {

        var Vendor = {
                facade: {}
            },
            console,
            registry;


        registry = I.instance('core.registry');
        console = I.instance('tools.console');

        /**
         * @constructor
         * @param {String} name
         */
        Vendor.instance = function (name) {
            this.name = name;
            this.property = {};
            registry.set(name, this);
        };

        /**
         * Set vendor ownership
         * @param {String} ownerInfo - e.g. Tibi<tiberiu.georgescu84@gmail.com>
         * @return void
         */
        Vendor.instance.prototype.setOwner = function (ownerInfo) {
            this.owner = ownerInfo;
        };

        /**
         * Get owner
         * @returns {String}
         */
        Vendor.instance.prototype.getOwner = function () {
            return this.owner;
        };

        /**
         * Set version
         * @param {String} version
         */
        Vendor.instance.prototype.setVersion = function (version) {
            this.version = version;
        };

        /**
         * Get version
         * @return {String}
         */
        Vendor.instance.prototype.getVersion = function () {
            return this.version;
        };

        /**
         * Vendor main object registration
         */
        Vendor.instance.prototype.setSrc = function (src) {
            if (undefined === src) {
                throw new Exception('VendorException', 'Vendor [' + this.name + '] source is undefined');
            }

            this.src = src;
        };

        /**
         * Set properties shortcuts for ease of access
         * @param {String} name
         * @param {Mixed} value
         */
        Vendor.instance.prototype.setProperty = function (name, value) {
            this.property.setValueOf(name, value);
        };

        /**
         * Get a vendor instance for use
         */
        Vendor.get = function(name) {
            return registry.get(name).property;
        };

        /**
         * --FACADE ------------------------
         * Create facade
         */

        /**
         * get a vendor
         * @param name
         */
        Vendor.facade.get = function (name) {
            return Vendor.get(name);
        };

        /**
         * Get prop of a vendor
         * todo - Check if this is needed
         */


        /**
         * Expose API
         */
        this.exposer.register({
            namespace: 'Vendor',
            body: Vendor.instance
        });

        /**
         * Expose Interface for end dev
         */
        this.exposer.register({
            namespace: 'V',
            body: Vendor.get
        });
    });
} ());