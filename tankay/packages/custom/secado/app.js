'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Secado = new Module('secado');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Secado.register(function (app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Secado.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Secado.menus.add({
        title: 'Secado',
        link: 'secado',
        roles: ['authenticated'],
        menu: 'main',
        order: '3',
        icon:'zmdi-sun'
    });

    return Secado;
});
