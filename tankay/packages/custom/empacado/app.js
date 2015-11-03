'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Empacado = new Module('empacado');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Empacado.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Empacado.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Empacado.menus.add({
    title: 'empacado example page',
    link: 'empacado example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Empacado.aggregateAsset('css', 'empacado.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Empacado.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Empacado.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Empacado.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Empacado;
});
