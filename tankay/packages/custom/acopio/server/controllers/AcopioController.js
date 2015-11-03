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
        save:function(req, res){
            console.log('Guardar lote'+req.body.presion);
            Lote.create(req.body)
                .then(function(lote) {
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
