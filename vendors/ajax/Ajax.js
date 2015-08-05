/**
 * Vendor interface for aja lib - Simple ajax wrapper by Bertrand CHEVRIER
 * aja License: https://github.com/krampstudio/aja.js/blob/master/LICENSE
 *
 * @package vendors/ajax
 * @author Tibi
 * @version 0.1.0
 */

(function () {
    'use strict';

    var Vendor;

    Vendor = new iDoo.Vendor('aja');
    Vendor.setOwner('Bertrand CHEVRIER');
    Vendor.setVersion('0.3.4');

    Vendor.setSrc(aja());

    // Ugly property declaration
    Vendor.setProperty('get', function (data, cb) {

        if(undefined === data) {
            data = {};
        }

        Vendor.src
            .method('GET')
            .url('/demo-app/html/home_index.html')
            .data(data)
            .on(200, function(response){
                cb(response);
            })
            .go();
    });

    Vendor.setProperty('post', function (data, cb) {

        if(undefined === data) {
            data = {};
        }

        Vendor.src
            .method('POST')
            .url('/demo-app/html/home_index.html')
            .data(data)
            .on(200, function(response){
                cb(response);
            })
            .go();
    });

    Vendor.setProperty('html', function (data, cb) {

        if(undefined === data) {
            data = {};
        }

        Vendor.src
            .method('get')
            .type('html')
            .url('/demo-app/html/home_index.html')
            .data(data)
            .on(200, function(response){
                cb(response);
            })
            .go();
    });

} ());
