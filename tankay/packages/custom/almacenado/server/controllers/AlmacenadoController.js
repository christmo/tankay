'use strict';

/**
 * Module dependencies.
 */
var Module = require('meanio').Module;
var path = require('path');
var db = require('../../../persister');

module.exports = function (almacenado) {

    almacenado.settings({'dir_module': path.resolve(__dirname, '../models/')});
    syncDataBase(db);

    var Almacenado = db.getModelModule('Almacenado', 'almacenado');
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
                    var response = db.util().getErrorResponse(error);
                    res.json(response);
                });
        },
        get: function (req, res) {
            console.log(req.params);

            Almacenado.findById(req.params.lote).then(function (lote) {
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
            Dashboard.update({
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


function syncDataBase(db) {
    var Almacenado = db.getModelModule('Almacenado', 'almacenado');
    var Empacado = db.getModelModule('Empacado', 'empacado');
    var Secado = db.getModelModule('Secado', 'secado');
    var Clasification = db.getModelModule('Clasification', 'clasificacion');
    var Dashboard = db.getModelModule('Dashboard', 'home');
    var Lote = db.getModelModule('Lote', 'acopio');

    Almacenado.belongsTo(Empacado, {foreignKey: 'id'});
    Empacado.belongsTo(Secado, {foreignKey: 'id'});
    Secado.belongsTo(Clasification, {foreignKey: 'id'});
    Clasification.belongsTo(Lote, {foreignKey: 'id'});
    Dashboard.belongsTo(Lote, {foreignKey: 'id'});

    db.sync();
    console.log('All syncronized');
}
