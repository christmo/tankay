'use strict';

/**
 * Module dependencies.
 */
var Module = require('meanio').Module;
var path = require('path');
var db = require('../../../persister');
var moment = require('moment');

module.exports = function (home) {

    var Almacenado = db.getModelModule('Almacenado', 'almacenado');
    var Empacado = db.getModelModule('Empacado', 'empacado');
    var Secado = db.getModelModule('Secado', 'secado');
    var Clasification = db.getModelModule('Clasification', 'clasificacion');
    var Dashboard = db.getModelModule('Dashboard', 'home');
    var Lote = db.getModelModule('Lote', 'acopio');

    return {
        model: Dashboard,
        queryAllLotes: function (req, res, next) {
            Dashboard.findAll({
                include: [
                    Lote
                ]
            }).then(function (lotes) {
                res.send(lotes);
            });
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
                order: 'start_date',
                group: ['start_date', 'lote'],
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

           /* db.sequelize
                .query('select e.packed_date as "createdAt",\
                        sum(e.fruit_flow) as fruit_flow\
                        from empacados e \
                        where e."createdAt" > ? and e."createdAt" < ? \
                        GROUP BY e.packed_date',
                {
                    replacements: [
                        moment(req.query.start_date_emp).toDate(),
                        moment(req.query.end_date_emp).toDate()
                    ],
                    type: db.sequelize.QueryTypes.SELECT,
                    model: Empacado
                })
                .then(function (lotes) {
                    var data = [];
                    for (var row in lotes) {
                        var dateCreation = lotes[row].createdAt;
                        if (dateCreation) {
                            data.push([moment(dateCreation).toDate().getTime(), lotes[row].fruit_flow]);
                        }
                    }
                    res.send(lotes);
                });*/

            Empacado.findAll({
                where: {
                    createdAt: {
                        $gt: moment(req.query.start_date_emp).toDate(),
                        $lt: moment(req.query.end_date_emp).toDate()
                    }
                },
                attributes: [ 'packed_date',
                    [db.sequelize.fn('SUM', db.sequelize.col('fruit_flow')), 'fruit_flow']
                ],
                order: 'packed_date',
                group: ['packed_date']
            }).then(function (lotes) {
                res.send(lotes);
            });

        },
        deleteLote: function (req, res, next) {
            console.log(req.query);

            /**
             * Borrado en cascada de todos los datos del lotes
             */
            deleteDataModel(req.query.lote, Dashboard, res)
                .then(function () {
                    deleteDataModel(req.query.lote, Almacenado, res)
                        .then(function () {
                            deleteDataModel(req.query.lote, Empacado, res)
                                .then(function () {
                                    deleteDataModel(req.query.lote, Secado, res)
                                        .then(function () {
                                            deleteDataModel(req.query.lote, Clasification, res)
                                                .then(function () {
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

function deleteDataModel(id, model, res) {
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
