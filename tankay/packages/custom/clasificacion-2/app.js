'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Clasificacion2 = new Module('clasificacion-2');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Clasificacion2.register(function (app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Clasificacion2.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Clasificacion2.menus.add({
        title: 'Clasificación',
        link: 'clasificacion',
        roles: ['authenticated'],
        menu: 'main',
        order: '2'
    });

    Clasificacion2.aggregateAsset('css', 'clasificacion2.css');

    /**
     //Uncomment to use. Requires meanio@0.3.7 or above
     // Save settings with callback
     // Use this for saving data from administration pages
     Clasificacion2.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

     // Another save settings example this time with no callback
     // This writes over the last settings.
     Clasificacion2.settings({
        'anotherSettings': 'some value'
    });

     // Get settings. Retrieves latest saved settigns
     Clasificacion2.settings(function(err, settings) {
        //you now have the settings object
    });
     */

    return Clasificacion2;
});
