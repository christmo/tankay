'use strict';

/**
 * Module dependencies.
 */
//var winston = require('winston');
var path = require('path');
var db = require('../../../persister');
db.loadModels(path.resolve(__dirname,'../models/'));

var Lote = db.getModel('Lote');

module.exports = function(acopio) {

    acopio.settings({'dir_module': path.resolve(__dirname,'../models/')});

    return {
        model: Lote,

        save:function(req, res){
            console.log('Guardar lote: '+req.body);
            req.body.step_detail="Iniciar Clasificación";
            req.body.next_step="/clasificacion";
            if(req.body.category) {
                req.body.category = req.body.category.label;
            }

            Lote.create(req.body)
                .then(function(lote) {
                    res.json({status:'OK'});
                }).catch(function(error) {
                    var msg='';
                    if(error.name === 'SequelizeUniqueConstraintError'){
                        msg = 'El código de lote ya existe. Debe modificarlo para poder guardar el registro.';
                    }

                    var response = {
                        status:'NOK',
                        msg: msg,
                        error: error
                    };
                    res.json(response);
                });

        },

        queryAll:function(req, res){
            Lote.findAll().then(function(lotes) {
                // projects will be an array of all Project instances
                console.log('Lote Query All: '+lotes);
                return lotes;
            })

        }
    };

}
