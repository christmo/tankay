'use strict';

/**
 * Module dependencies.
 */
var Module = require('meanio').Module;
//var winston = require('winston');
var path = require('path');
var db = require('../../../persister');
db.loadModels(path.resolve(__dirname, '../models/'));

var Secado = db.getModel('Secado');


module.exports = function (secado) {

    secado.settings({'dir_module': path.resolve(__dirname, '../models/')});

    var Clasification = db.getModelModule('Clasification', 'clasificacion');
    Secado.belongsTo(Clasification, {foreignKey: 'id'});

    /*var clasificacion = new Module('clasificacion');
    clasificacion.settings(function (err, settings) {
        console.log('controller: ' + settings.settings.dir_module);
        db.loadModels(settings.settings.dir_module);
        var Clasification = db.getModel('Clasification');

        Secado.belongsTo(Clasification, {foreignKey: 'id'});
    });*/

    var Dashboard = db.getModelModule('Dashboard', 'home');

    return {
        save: function (req, res, next) {
            //req.body.step_detail="Iniciar Empacado";
            //req.body.next_step="/empacado";
            console.log('Guardar secado' + req.body);
            Secado.create(req.body)
                .then(function (secado) {
                    saveDashboard(req.body, Dashboard);
                    res.json({status: 'OK'});
                }).catch(function (error) {
                    var response = {
                        status: 'NOK',
                        error: error
                    };
                    res.json(response);
                });

        },
        get: function(req, res){
            console.log(req.params);

            Secado.findById(req.params.lote).then(function(lote){
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
