'use strict';

/**
 * Module dependencies.
 */
var Module = require('meanio').Module;
//var winston = require('winston');
var path = require('path');
var db = require('../../../persister');
db.loadModels(path.resolve(__dirname,'../models/'));

var Clasification = db.getModel('Clasification');


module.exports = function(clasificacion) {

    clasificacion.settings({'dir_module': path.resolve(__dirname,'../models/')});
    var acopio = new Module('acopio');

    acopio.settings(function(err,settings){
        console.log('controller: '+settings.settings.dir_module);
        db.loadModels(settings.settings.dir_module);
        var Lote = db.getModel('Lote');

        Clasification.belongsTo(Lote,{foreignKey: 'id'});
    });


    return {
        save:function(req, res,next){
            console.log('Guardar clasificacion: '+req.body);
            Clasification.create(req.body)
                .then(function(clasification) {
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
