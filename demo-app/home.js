/**
 * DEMO ENTITY
 * 	- Create interaction design
 */
 
 (function () { 
	 'use strict';

	 var HomeComp = new iDoo.Component('HomeComp'),
		 home = new iDoo.Entity('home');

	 home.registerToComponent('HomeComp');

	 /*
	 // Events
	 Home.event('event', function() {
		console.log('action:: home.event'); 
	 });
	 
	 // Actions
	 Home.action('index', function(test) {
		//this.DOM.get('app').innerHTML = '<p> THIS IS THE HOME PAGE!</p>';
	 });
	 
	 Home.action('other', function() {
		console.log('action:: home.other'); 
	 });*/
	 
	 
 } ());