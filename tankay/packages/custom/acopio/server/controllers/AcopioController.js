'use strict';

/**
 * Module dependencies.
 */
//var winston = require('winston');
var Module = require('meanio').Module;
var path = require('path');
var db = require('../../../persister');

module.exports = function (acopio) {

    acopio.settings({'dir_module': path.resolve(__dirname, '../models/')});

    var Lote = db.getModelModule('Lote', 'acopio');
    var Dashboard = db.getModelModule('Dashboard', 'home');

    return {
        model: Lote,

        save: function (req, res) {
            console.log('Guardar lote: ' + req.body);

            Lote.create(req.body)
                .then(function (lote) {
                    saveDashboard(req.body, Dashboard);
                    res.json({status: 'OK'});
                }).catch(function (error) {
                    var response = db.util().getErrorResponse(error);
                    res.json(response);
                });

        },

        get: function(req, res){
            console.log(req.params);

            Lote.findById(req.params.lote).then(function(lote){
                res.json(lote);
            });

        },

        queryAll: function (req, res) {
            Lote.findAll().then(function (lotes) {
                // projects will be an array of all Project instances
                console.log('Lote Query All: ' + lotes);
                return lotes;
            })

        }
    };

};

function saveDashboard(body, Dashboard) {
    var detail = 'Iniciar Clasificación';
    var next = '/clasificacion';
    Dashboard.findOrCreate({
        where: {id: body.lote},
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

