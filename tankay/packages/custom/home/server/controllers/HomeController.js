'use strict';

/**
 * Module dependencies.
 */
var Module = require('meanio').Module;
var path = require('path');
var db = require('../../../persister');
var moment = require('moment');

module.exports = function (home) {

    var Almacenado = db.getModelModule('Almacenado','almacenado');
    var Empacado = db.getModelModule('Empacado', 'empacado');
    var Secado = db.getModelModule('Secado', 'secado');
    var Clasification = db.getModelModule('Clasification', 'clasificacion');
    var Dashboard = db.getModelModule('Dashboard', 'home');
    var Lote = db.getModelModule('Lote', 'acopio');

    return {
        model: Dashboard,
        queryAllLotes: function (req, res, next) {
            var response = null;
            /*db.sequelize.query("SELECT * FROM `lotes`", {type: db.sequelize.QueryTypes.SELECT})
             .then(function (lotes) {
             // We don't need spread here, since only the results will be returned for select queries
             response = lotes;
             console.log(response);
             res.send(response);
             });*/

            Dashboard.findAll({
                include: [
                    Lote
                ]
            }).then(function (lotes) {
                res.send(lotes);
            });

            /*
             Lote.findAll({
             include: [
             Lote
             ]
             }).then(function(lotes){
             //console.log(moment(lotes[0].dataValues.start_date).format("YYYY-MM-DD HH:mm"));

             res.send(lotes);
             });
             */
        },
        getDataGraph: function (req, res, next) {
            console.log(req.query);
            Lote.findAll({
                where: {
                    createdAt: {
                        $gt: moment(req.query.start_date).toDate(),
                        $lt: moment(req.query.end_date).toDate()
                    }
                },
                group: ['start_date','lote'],
                attributes: ['lote', 'start_date', 'capacity',
                    [db.sequelize.fn('SUM', db.sequelize.col('capacity')), 'capacity']
                ]
            }).then(function (lotes) {
                var data = [];
                for (var row in lotes) {
                    if (lotes[row].start_date) {
                        data.push([moment(lotes[row].start_date).toDate().getTime(), lotes[row].capacity]);
                    }
                }
                res.send(lotes);
            });

        },
        getDataGraphEmpacado: function (req, res, next) {
            console.log(req.query);
            Empacado.findAll({
                where: {
                    createdAt: {
                        $gt: moment(req.query.start_date_emp).toDate(),
                        $lt: moment(req.query.end_date_emp).toDate()
                    }
                },
                group: ['id'],
                attributes: ['id', 'createdAt', 'fruit_flow',
                    [db.sequelize.fn('SUM', db.sequelize.col('fruit_flow')), 'fruit_flow']
                ]
            }).then(function (lotes) {
                var data = [];
                for (var row in lotes) {
                    var dateCreation = lotes[row].createdAt;
                    if (dateCreation) {
                        data.push([moment(dateCreation).toDate().getTime(), lotes[row].capacity]);
                    }
                }
                res.send(lotes);
            });

        },
        deleteLote: function (req, res, next) {
            console.log(req.query);

            deleteDataModel(req.query.lote,Dashboard,res)
                .then(function() {
                    deleteDataModel(req.query.lote, Almacenado,res)
                        .then(function() {
                            deleteDataModel(req.query.lote, Empacado,res)
                                .then(function() {
                                    deleteDataModel(req.query.lote, Secado,res)
                                        .then(function() {
                                            deleteDataModel(req.query.lote, Clasification,res)
                                                .then(function() {
                                                    Lote.destroy({
                                                        where: {
                                                            lote: req.query.lote
                                                        },
                                                        force: true
                                                    }).then(function () {
                                                        res.send({status: 'OK'});
                                                    }).catch(function (error) {
                                                        var response = db.util().getErrorResponse(error);
                                                        res.send(response);
                                                    });
                                                });
                                        });
                                });
                        });
                });
        }
    };

};

function deleteDataModel(id, model,res){
    var action = model.destroy({
        where: {
            id: id
        },
        force: true
    }).catch(function (error) {
        var response = db.util().getErrorResponse(error);
        res.send(response);
    });
    return action;
}
