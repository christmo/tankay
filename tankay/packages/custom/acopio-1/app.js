'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;
var mean = require('meanio');
var config = mean.loadConfig();
var winston = require('winston');
var Acopio1 = new Module('acopio-1');
var db = require('persister');
db.loadModels(__dirname+'/server/models/');
//winston.info(db.Lote.findAll().success(function(lotes){
//    winston.info(lotes);
//}));
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
        menu: 'main',
        order: '1'
    });

    Acopio1.settings({'menu_order': '1'},
        function (err, settings) {
            // You will receive the settings object on success
            winston.info(settings.settings.menu_order);
        });

    for (var i = 0; i < Acopio1.menus.length; i++) {
        winston.info(Acopio1.menus[i]);
    }

    //Acopio1.aggregateAsset('css', 'acopio1.css');

    /*var User = db.define('user', {
     firstName: {
     type: db.STRING,
     field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
     },
     lastName: {
     type: db.STRING
     }
     }, {
     freezeTableName: true // Model tableName will be the same as the model name
     });

     User.sync({force: true}).then(function () {
     // Table created
     return User.create({
     firstName: 'John',
     lastName: 'Hancock'
     });
     });*/

    return Acopio1;
});
