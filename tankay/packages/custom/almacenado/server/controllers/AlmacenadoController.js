'use strict';

/**
 * Module dependencies.
 */
var Module = require('meanio').Module;
//var winston = require('winston');
var path = require('path');
var db = require('../../../persister');
db.loadModels(path.resolve(__dirname,'../models/'));

var Almacenado = db.getModel('Almacenado');


module.exports = function(almacenado) {

    almacenado.settings({'dir_module': path.resolve(__dirname,'../models/')});

    var empacado = new Module('empacado');

    empacado.settings(function(err,settings){
        console.log('controller: '+settings.settings.dir_module);
        db.loadModels(settings.settings.dir_module);
        var Empacado = db.getModel('Empacado');

        Empacado.belongsTo(Almacenado, {foreignKey: 'fk_almacenado', targetKey: 'lote'});
    });

    return {
        save:function(req, res,next){
            console.log('Guardar Almacenado: '+req.body);
            Almacenado.create(req.body)
                .then(function(almacenado) {
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