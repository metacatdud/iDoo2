/**
 * DEMO App init file
 * 
 * @package app
 * @author Tibi
 * @version 0.1.0
 * 
 * //TODO
 * 	- Should be able to take settings
 * 		- Resource load
 * 		- Namespace
 * 		- Default entry point	
 * 		- App private core components
 * 		- App components loading type sync/async (as they are needed)
 * 	- Should have control events
 * 		- When to boot
 * 		- When to load a component
 */
(function () {
	
	var Demo = new iDoo.app({
		entrypoint: 'home.index',
		htmlNode: 'demo-app',
		load: 'async',
		serverURL: '//localhost/demo-app',
		version: '0.1.0'	
	});
	
	Demo.boot();
} ());