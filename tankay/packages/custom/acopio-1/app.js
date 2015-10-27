'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Acopio1 = new Module('acopio-1');


/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Acopio1.register(function (app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Acopio1.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Acopio1.menus.add({
        title: 'Centro de Acopio',
        link: 'acopio',
        roles: ['authenticated'],
        menu: 'main'
    });

    //Acopio1.aggregateAsset('css', 'acopio1.css');

    return Acopio1;
});
