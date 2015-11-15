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

    var Dashboard = db.getModelModule('Dashboard', 'home');

    return {
        model: Clasification,
        save: function (req, res, next) {
            console.log('Guardar clasificacion: ' + req.body);

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

        },
        get: function(req, res){
            console.log(req.params);

            Clasification.findById(req.params.lote).then(function(lote){
                res.json(lote);
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
