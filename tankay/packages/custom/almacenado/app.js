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
Almacenado.register(function (app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Almacenado.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Almacenado.menus.add({
        title: 'Almacenado',
        link: 'almacenado',
        roles: ['authenticated'],
        menu: 'main',
        order: '5',
        icon: 'zmdi-store'
    });

    Almacenado.aggregateAsset('css', 'almacenado.css',{weight: 16});

    return Almacenado;
});
