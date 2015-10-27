'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Empacado4 = new Module('empacado-4');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Empacado4.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Empacado4.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Empacado4.menus.add({
    title: 'Empacado',
    link: 'empacado',
    roles: ['authenticated'],
    menu: 'main'
  });

  Empacado4.aggregateAsset('css', 'empacado4.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Empacado4.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Empacado4.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Empacado4.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Empacado4;
});
