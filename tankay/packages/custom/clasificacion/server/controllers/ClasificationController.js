'use strict';

/**
 * Module dependencies.
 */
var Module = require('meanio').Module;
//var winston = require('winston');
var path = require('path');
var moment = require('moment');
var db = require('../../../persister');
db.loadModels(path.resolve(__dirname, '../models/'));

var Clasification = db.getModel('Clasification');


module.exports = function (clasificacion) {

    var Lote = {};
    clasificacion.settings({'dir_module': path.resolve(__dirname, '../models/')});
    var acopio = new Module('acopio');

    acopio.settings(function (err, settings) {
        console.log('controller: ' + settings.settings.dir_module);
        db.loadModels(settings.settings.dir_module);
        Lote = db.getModel('Lote');

        Clasification.belongsTo(Lote, {foreignKey: 'id'});
    });


    return {
        model: Clasification,
        save: function (req, res, next) {
            req.body.step_detail = "Iniciar Secado";
            req.body.next_step = "/secado";
            console.log('Guardar clasificacion: ' + req.body);

            if(req.body.category) {
                req.body.category = req.body.category.label;
            }

            Clasification.create(req.body)
                .then(function (clasification) {
                    res.json({status: 'OK'});
                }).catch(function (error) {
                    var msg = '';
                    if (error.name === 'SequelizeUniqueConstraintError') {
                        msg = 'El código de lote ya existe. Debe modificarlo para poder guardar el registro.';
                    }

                    var response = {
                        status: 'NOK',
                        msg: msg,
                        error: error
                    };
                    res.json(response);
                });

            Lote.findById(req.body.id).then(function(lote) {
                console.log(moment());
                console.log(moment().subtract(moment(lote.createdAt)));
            });

            Lote.update(
                {
                    storage_time: 26
                },
                {
                    where:{lote: req.body.id}
                });

        }
    };

}
