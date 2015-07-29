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

	 home.action('index', function() {
		 console.log('action:: home.index');
	 });

	 home.action('other', function() {
		 console.log('action:: home.other');
	 });

	 home.registerToComponent('HomeComp');
	 home.registerToComponent('HomeComp');
	 
 } ());