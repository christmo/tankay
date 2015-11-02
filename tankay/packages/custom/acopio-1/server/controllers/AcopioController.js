'use strict';

/**
 * Module dependencies.
 */
//var winston = require('winston');
var path = require('path');
var db = require('../../../persister');
db.loadModels(path.resolve(__dirname,'../models/'));

//var Lote = db.getModel('Lote');

module.exports = function(Acopio1) {

    return {
        save:function(req, res){
            console.log('Guardar lote'+req.body);
        }
    };

}
