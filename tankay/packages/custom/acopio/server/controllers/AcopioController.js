'use strict';

/**
 * Module dependencies.
 */
//var winston = require('winston');
var Module = require('meanio').Module;
var path = require('path');
var db = require('../../../persister');
db.loadModels(path.resolve(__dirname, '../models/'));

var Lote = db.getModel('Lote');

module.exports = function (acopio) {

    acopio.settings({'dir_module': path.resolve(__dirname, '../models/')});

    //var HomeM = new Module('home');
    //var home = require('../../../home/server/controllers/HomeController')(HomeM);

    var Dashboard = db.getModelModule('Dashboard', 'home');

    return {
        model: Lote,

        save: function (req, res) {
            console.log('Guardar lote: ' + req.body);
            //req.body.step_detail = "Iniciar Clasificación";
            //req.body.next_step = "/clasificacion";
            if (req.body.category) {
                req.body.category = req.body.category.label;
            }

            Lote.create(req.body)
                .then(function (lote) {
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
