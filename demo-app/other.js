/**
 * DEMO ENTITY
 * 	- Create interaction design
 */
 
 (function () { 
	 'use strict';
	 
	var Other = new iDoo.entity('other');
	 
	// Events
	Other.event('event', function() {
		console.log('action:: Other.event'); 
	});
	 
	// Actions
	Other.action('index', function() {
		console.log('action:: Other.index'); 
	});
	 
	Other.action('other', function() {
		console.log('action:: Other.other'); 
	});
	
 } ());