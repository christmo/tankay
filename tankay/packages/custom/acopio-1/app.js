'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;
var mean = require('meanio');
var config = mean.loadConfig();

var Acopio1 = new Module('acopio-1');


//winston.info();
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


    Acopio1.settings({'dir_module': __dirname},
        function (err, settings) {
            // You will receive the settings object on success
            //winston.info(settings.settings.dir_module);
        });
/*
    for (var i = 0; i < Acopio1.menus.length; i++) {
        winston.info(Acopio1.menus[i]);
    }

    //Acopio1.aggregateAsset('css', 'acopio1.css');

    Lote.create({sector:'hola'+Math.random(),campacity:Math.random(),start_date:new Date(),start_time:new Date()})
        .then(function(lote){
            var l = Lote.build({sector:'test'});
            //console.log(lote.sector);
        });

    Lote.findById(3).then(function(a) {
        // project will be an instance of Project and stores the content of the table entry
        // with id 123. if such an entry is not defined you will get null
        console.log(a.sector);
        //a.sector = 'overrided for christmo';
        a.update({
            sector: 'a very different title now'
        }).then(function() {console.log('hecho')})
    });

    Lote.findAll({ limit: 10 }).then(function(projects) {console.log(projects)});
*/
    return Acopio1;
});
