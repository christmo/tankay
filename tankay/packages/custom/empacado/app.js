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
Empacado.register(function (app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Empacado.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Empacado.menus.add({
        title: 'Empacado',
        link: 'empacado',
        roles: ['authenticated'],
        menu: 'main',
        order: '4',
        icon: 'zmdi-case'
    });


    return Empacado;
});
