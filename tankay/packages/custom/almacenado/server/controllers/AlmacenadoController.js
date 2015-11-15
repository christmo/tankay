'use strict';

/**
 * Module dependencies.
 */
var Module = require('meanio').Module;
//var winston = require('winston');
var path = require('path');
var db = require('../../../persister');
db.loadModels(path.resolve(__dirname, '../models/'));

var Almacenado = db.getModel('Almacenado');


module.exports = function (almacenado) {

    almacenado.settings({'dir_module': path.resolve(__dirname, '../models/')});

    var Empacado = db.getModelModule('Empacado', 'empacado');
    Almacenado.belongsTo(Empacado, {foreignKey: 'id'});

    /*var empacado = new Module('empacado');

     empacado.settings(function(err,settings){
     console.log('controller: '+settings.settings.dir_module);
     db.loadModels(settings.settings.dir_module);
     var Empacado = db.getModel('Empacado');

     Almacenado.belongsTo(Empacado,{foreignKey: 'id'});
     });*/

    var Dashboard = db.getModelModule('Dashboard', 'home');

    return {
        save: function (req, res, next) {
            req.body.step_detail = "Flujo Finalizado";
            req.body.next_step = "/";
            console.log('Guardar Almacenado: ' + req.body);
            Almacenado.create(req.body)
                .then(function (almacenado) {
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

            Almacenado.findById(req.params.lote).then(function(lote){
                res.json(lote);
            });

        }
    };

};

function saveDashboard(body, Dashboard) {
    var detail = 'Flujo Finalizado';
    var next = '/';
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

