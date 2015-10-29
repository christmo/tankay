'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Secado3 = new Module('secado-3');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Secado3.register(function (app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Secado3.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Secado3.menus.add({
        title: 'Secado',
        link: 'secado',
        roles: ['authenticated'],
        menu: 'main',
        order: '3'
    });

    Secado3.aggregateAsset('css', 'secado3.css');

    /**
     //Uncomment to use. Requires meanio@0.3.7 or above
     // Save settings with callback
     // Use this for saving data from administration pages
     Secado3.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

     // Another save settings example this time with no callback
     // This writes over the last settings.
     Secado3.settings({
        'anotherSettings': 'some value'
    });

     // Get settings. Retrieves latest saved settigns
     Secado3.settings(function(err, settings) {
        //you now have the settings object
    });
     */

    return Secado3;
});
