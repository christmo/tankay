'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Clasificacion = new Module('clasificacion');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Clasificacion.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Clasificacion.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Clasificacion.menus.add({
        title: 'Clasificación',
        link: 'clasificacion',
        roles: ['authenticated'],
        menu: 'main',
        order: '2'
    });

    //console.log(acopio1.settings);

    //Clasificacion.aggregateAsset('css', 'clasificacion2.css');

    return Clasificacion;
});
