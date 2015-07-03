/**
 * Config file - Main iDoo config file
 *
 * @package config
 * @author Tibi
 * @version 0.1.0
 */

(function (window) {
    'use strict';

    window.iDooConfig = {
        version: '0.1.0',
        components: ['app', 'core', 'helpers', 'libs', 'tools'],
        debug: {
            level: 4
        },
        env: 'dev'
    };

}(window));
