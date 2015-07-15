/**
 * DEMO ENTITY
 * 	- Create interaction design
 */
 
 (function () { 
	 'use strict';
	 
	 var Home = new iDoo.entity('home');
	 
	 Home.event('event', function() {
		console.log('action:: home.index'); 
	 });
	 
	 Home.action('index', function() {
		console.log('action:: home.index'); 
	 });
	 
	 Home.action('other', function() {
		console.log('action:: home.index'); 
	 });
	 
	 
 } ());