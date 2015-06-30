/**
 * iDoo core registry - Simple key value temporary storage for internal use purposes
 *
 * @package core
 * @author Tibi
 * @version 0.1.0
 */

(function () {
    'use strict';

    Idoo.core.install('registry', function (I) {

        console.log('registry body scope', this, 'Internal lib::', I);
        I.load('tools.console', 'instance'); 
        
        this.install({
            test: 'lorem ipsum'
        });  
        
    });
}());
