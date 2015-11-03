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


module.exports = function() {

    var acopio = new Module('acopio');

    acopio.settings(function(err,settings){
        console.log('controller: '+settings.settings.dir_module);
        db.loadModels(settings.settings.dir_module);
        var Lote = db.getModel('Lote');

        Lote.belongsTo(Clasification, {foreignKey: 'fk_clasification', targetKey: 'lote'});
    });
    //var Lote = db.getModel('Lote');
    //Lote.belongsTo(Clasification);

    return {
        save:function(req, res,next){
            console.log('Guardar clasificacion'+req.body.presion);
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
