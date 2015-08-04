/**
 * DEMO ENTITY
 * 	- Create interaction design
 */
 
(function () {
    'use strict';

    var HomeComp,
        home;


    HomeComp = new iDoo.Component('HomeComp');

    home = new iDoo.Entity('home');

    home.action('index', function () {
        console.log('action:: home.index');

        //todo - Rethink this! It's ugly!
        this.libs.html.Selector.get('app').innerHTML = 'HOMEPAGE LOADED!';

        //todo - test case - context carry - validate(data) / view(data) / crud(data)
    });

    home.registerToComponent('HomeComp');

} ());