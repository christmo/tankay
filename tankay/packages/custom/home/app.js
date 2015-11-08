'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Home = new Module('home');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Home.register(function (app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Home.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Home.menus.add({
        title: 'Home',
        link: 'dash',
        roles: ['authenticated'],
        menu: 'main',
        order: 0,
        icon: 'zmdi-home'
    });

    //Home.aggregateAsset('css', 'home.css');


    return Home;
});
