'use strict';

/**
 * Module dependencies.
 */
var Module = require('meanio').Module;
var path = require('path');
var db = require('../../../persister');

module.exports = function (secado) {

    secado.settings({'dir_module': path.resolve(__dirname, '../models/')});

    var Secado = db.getModelModule('Secado', 'secado');
    var Dashboard = db.getModelModule('Dashboard', 'home');

    return {
        model: Secado,
        save: function (req, res, next) {
            console.log('Guardar secado' + req.body);
            Secado.create(req.body)
                .then(function (secado) {
                    saveDashboard(req.body, Dashboard);
                    res.json({status: 'OK'});
                }).catch(function (error) {
                    var response = db.util().getErrorResponse(error);
                    res.json(response);
                });
        },
        get: function (req, res) {
            console.log(req.params);

            Secado.findById(req.params.lote).then(function (lote) {
                res.json(lote);
            });

        }
    };

};

function saveDashboard(body, Dashboard) {
    var detail = 'Iniciar Empacado';
    var next = '/empacado';
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
