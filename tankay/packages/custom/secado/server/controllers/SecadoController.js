'use strict';

/**
 * Module dependencies.
 */
var Module = require('meanio').Module;
//var winston = require('winston');
var path = require('path');
var db = require('../../../persister');
db.loadModels(path.resolve(__dirname,'../models/'));

var Secado = db.getModel('Secado');


module.exports = function(secado) {

    secado.settings({'dir_module': path.resolve(__dirname,'../models/')});

    var clasificacion = new Module('clasificacion');
    clasificacion.settings(function(err,settings){
        console.log('controller: '+settings.settings.dir_module);
        db.loadModels(settings.settings.dir_module);
        var Clasification = db.getModel('Clasification');

        Secado.belongsTo(Clasification,{foreignKey: 'id'});
    });

    return {
        save:function(req, res,next){
            req.body.step_detail="Iniciar Empacado";
            req.body.next_step="/empacado";
            console.log('Guardar secado'+req.body);
                Secado.create(req.body)
                .then(function(secado) {
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
