'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Almacenado = new Module('almacenado');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Almacenado.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Almacenado.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Almacenado.menus.add({
    title: 'almacenado example page',
    link: 'almacenado example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Almacenado.aggregateAsset('css', 'almacenado.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Almacenado.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Almacenado.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Almacenado.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Almacenado;
});
