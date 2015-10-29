'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Almacenado5 = new Module('almacenado-5');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Almacenado5.register(function (app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Almacenado5.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Almacenado5.menus.add({
        title: 'Almacenado',
        link: 'almacenado',
        roles: ['authenticated'],
        menu: 'main',
        order: '5'
    });

    Almacenado5.aggregateAsset('css', 'almacenado5.css');

    /**
     //Uncomment to use. Requires meanio@0.3.7 or above
     // Save settings with callback
     // Use this for saving data from administration pages
     Almacenado5.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

     // Another save settings example this time with no callback
     // This writes over the last settings.
     Almacenado5.settings({
        'anotherSettings': 'some value'
    });

     // Get settings. Retrieves latest saved settigns
     Almacenado5.settings(function(err, settings) {
        //you now have the settings object
    });
     */

    return Almacenado5;
});
