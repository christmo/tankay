'use strict';

/**
 * Module dependencies.
 */
var Module = require('meanio').Module;
//var winston = require('winston');
var path = require('path');
var db = require('../../../persister');
db.loadModels(path.resolve(__dirname,'../models/'));

var Empacado = db.getModel('Empacado');


module.exports = function(empacado) {

    empacado.settings({'dir_module': path.resolve(__dirname,'../models/')});

    var secado = new Module('secado');

    secado.settings(function(err,settings){
        console.log('controller: '+settings.settings.dir_module);
        db.loadModels(settings.settings.dir_module);
        var Secado = db.getModel('Secado');

        console.log('empacado: '+ Empacado);
        Empacado.belongsTo(Secado, {foreignKey: 'id'});

        /**
         * Al ser el ultimo modelo que carga se debe sincronizar
         * la base de datos con todas las relaciones cargadas, si
         * se incluye un nuevo modelo esto se debe mover hasta el
         * modulo que cargue despues.
         * @christmo
         */
        db.sync();
    });


    return {
        save:function(req, res,next){
            console.log('Guardar Empacado: '+req.body);
            Empacado.create(req.body)
                .then(function(empacado) {
                    res.json({status:'OK'});
                }).catch(function(error) {
                    var response = {
                        status:'NOK',
                        error: error
                    };
                    res.json(response);
                });

        }
    };

}
