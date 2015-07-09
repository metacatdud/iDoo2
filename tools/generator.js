/**
 * String generator
 *
 * @author Tibi
 * version 0.1.0
 */

(function () {
    'use strict';


    iDoo.tools.install('generator', function (I) {
        
        /**
         * Generator main object
         */
        var Generator = {
            facade: {}
        };

        /**
         * Generate custom alpha-numeric string
         *
         * @param {Object} options - Give keygen new lenght and/or patern to follow
         * @retunr {string} generated string
         */
        Generator.keygen = function (options) {
            var defaults = {
                length: 5,
                pattern: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            },
                output = '';

            defaults.expand(options, true);

            for (var i = 0; i < defaults.length; i++) {
                output += defaults.pattern.charAt(Math.floor(Math.random() * defaults.pattern.length));
            }

            return output;
        };

        /**
         * Generate a timestamp
         * @param {String} dateStr - String with a valid date yyyy-mm-dd hh:mm:ss / yyyy-mm-dd
         * @return {String} Date.getTime
         */
        Generator.timestamp = function (dateStr) {
            var output;

            if (undefined !== dateStr) {
                output = new Date(dateStr).getTime();
                if (true === isNaN(output)) {
                    throw new Exception('InvelidDateFormat', 'Parameter for timestamp generator is invalid');
                }
            } else {
                output = new Date().getTime();
            }

            return output.toString(10);
        };

        Generator.facade = {
            keygen: function (keyOptions) {
                return Generator.keygen(keyOptions);
            },
            timestamp: function (dateStr) {
                return Generator.timestamp(dateStr);
            }
        };


        I.register(Generator.facade);
    });

} ());