'use strict';

/**
 * Module dependencies.
 */
var Module = require('meanio').Module;
var path = require('path');
var moment = require('moment');
var db = require('../../../persister');

module.exports = function (empacado) {

    empacado.settings({'dir_module': path.resolve(__dirname, '../models/')});

    var Empacado = db.getModelModule('Empacado', 'empacado');
    var Secado = db.getModelModule('Secado', 'secado');
    var Dashboard = db.getModelModule('Dashboard', 'home');

    return {
        save: function (req, res, next) {
            console.log('Guardar Empacado: ' + req.body);
            Empacado.create(req.body)
                .then(function (empacado) {
                    saveDashboard(req.body, Dashboard);
                    res.json({status: 'OK'});
                }).catch(function (error) {
                    var response = db.util().getErrorResponse(error);
                    res.json(response);
                });

            var hour = 0;

            Secado.findById(req.body.id).then(function (lote) {
                var mayor = moment().toDate().getTime();
                var menor = moment(lote.createdAt).toDate().getTime();
                console.log(mayor + ' - ' + menor + " = " + ((((mayor - menor) / 1000) / 60) / 60));
                hour = ((((mayor - menor) / 1000) / 60) / 60);

                console.log('Horas transcurridas Secado: ' + hour);
                Secado.update({
                    drying_time: hour
                }, {
                    where: {id: req.body.id}
                });
            });

        },
        get: function (req, res) {
            console.log(req.params);

            Empacado.findById(req.params.lote).then(function (lote) {
                res.json(lote);
            });

        },
        model: Empacado
    };

};

function saveDashboard(body, Dashboard) {
    var detail = 'Iniciar Almacenado';
    var next = '/almacenado';
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
            Dashboard.update(
                {
                    step_detail: detail,
                    next_step: next
                }, {
                    where: {
                        id: dash.id
                    }
                }
            );
        }
    });

}
