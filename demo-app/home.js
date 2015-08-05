/**
 * DEMO ENTITY
 * 	- Create interaction design
 */
 
(function () {
    'use strict';

    var HomeComp,
        home,
        ajax;

    // Should be in other file
    HomeComp = new iDoo.Component('HomeComp');

    // Deps
    // MOVE THESE INSIDE A CONTEXT
    ajax = iDoo.V('aja');

    // Declaration
    home = new iDoo.Entity('home');

    home.action('index', function () {

        var name = 'Tibi Georgescu',
            age = 31,
            view;

        view = this.view();
        view({
            name: name,
            age: age
        });

        // This works only here because is when DOM is ready
        /*ajax.html({}, function(res){
            console.debug('Ajax resp::', res);
        });*/
    });

    //--- Register entity to a component
    home.registerToComponent('HomeComp');

} ());