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

    var Lote = db.getModelModule('Lote', 'acopio');;
    Clasification.belongsTo(Lote, {foreignKey: 'id'});

    clasificacion.settings({'dir_module': path.resolve(__dirname, '../models/')});
    /*var acopio = new Module('acopio');

    acopio.settings(function (err, settings) {
        console.log('controller: ' + settings.settings.dir_module);
        db.loadModels(settings.settings.dir_module);
        Lote = db.getModel('Lote');

        Clasification.belongsTo(Lote, {foreignKey: 'id'});
    });*/

    var Dashboard = db.getModelModule('Dashboard', 'home');

    return {
        model: Clasification,
        save: function (req, res, next) {
            //req.body.step_detail = "Iniciar Secado";
            //req.body.next_step = "/secado";
            console.log('Guardar clasificacion: ' + req.body);

            if (req.body.category) {
                req.body.category = req.body.category.label;
            }

            Clasification.create(req.body)
                .then(function (clasification) {
                    saveDashboard(req.body, Dashboard);
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

            var hour = 0;

            Lote.findById(req.body.id).then(function (lote) {
                hour = moment().subtract(moment(lote.createdAt)).millisecond();
                console.log(hour);
            });

            Lote.update({
                storage_time: hour
            }, {
                where: {lote: req.body.id}
            });

        }
    };

};

function saveDashboard(body, Dashboard) {
    var detail = 'Iniciar Secado';
    var next = '/secado';

    Dashboard.findOrCreate({
        where: {id: body.id},
        defaults: {
            step_detail: detail,
            next_step: next
        }
    }).spread(function (dash, created) {
        console.log(dash.get({
            plain: true
        }));
        console.log('created:' + created);
        if (!created) {
            Dashboard.update({
                step_detail: detail,
                next_step: next
            }, {
                where: {
                    id: dash.id
                }
            });
        }
    });

}
