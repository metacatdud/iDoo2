/**
 * DEMO ENTITY
 * 	- Create interaction design
 */
 
 (function () { 
	 'use strict';
	 
	 var Home = new iDoo.entity('home');
	 
	 // Events
	 Home.event('event', function() {
		console.log('action:: home.event'); 
	 });
	 
	 // Actions
	 Home.action('index', function() {

		console.log(Home);
		//this.DOM.get('app').innerHTML = '<p> THIS IS THE HOME PAGE!</p>';
	 });
	 
	 Home.action('other', function() {
		console.log('action:: home.other'); 
	 });
	 
	 
 } ());