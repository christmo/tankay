'use strict';

/**
 * Module dependencies.
 */
var Module = require('meanio').Module;
var path = require('path');
var moment = require('moment');
var db = require('../../../persister');

module.exports = function (clasificacion) {

    clasificacion.settings({'dir_module': path.resolve(__dirname, '../models/')});

    var Clasification = db.getModelModule('Clasification', 'clasificacion');
    var Lote = db.getModelModule('Lote', 'acopio');
    var Dashboard = db.getModelModule('Dashboard', 'home');

    return {
        model: Clasification,
        save: function (req, res, next) {
            Clasification.create(req.body)
                .then(function (clasification) {
                    saveDashboard(req.body, Dashboard);
                    res.json({status: 'OK'});
                }).catch(function (error) {
                    var response = db.util().getErrorResponse(error);
                    res.json(response);
                });

            var hour = 0;

            Lote.findById(req.body.id).then(function (lote) {
                var mayor = moment().toDate().getTime();
                var menor = moment(lote.createdAt).toDate().getTime();
                console.log(mayor + ' - ' + menor + " = " + ((((mayor - menor) / 1000) / 60) / 60));
                hour = ((((mayor - menor) / 1000) / 60) / 60);

                console.log('Horas transcurridas Acopio: ' + hour);
                Lote.update({
                    storage_time: hour
                }, {
                    where: {lote: req.body.id}
                });
            });

        },
        get: function (req, res) {
            console.log(req.params);
            Clasification.findById(req.params.lote).then(function (lote) {
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


