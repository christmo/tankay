'use strict';

/**
 * Module dependencies.
 */
var Module = require('meanio').Module;
var path = require('path');
var db = require('../../../persister');
var moment = require('moment');
var Lote = null;

db.loadModels(path.resolve(__dirname,'../models/'));
var Dashboard = db.getModel('Dashboard');
var Empacado = db.getModelModule('Empacado','empacado');

module.exports = function (home) {

    var acopioM = new Module('acopio');
    var acopio = require('../../../acopio/server/controllers/AcopioController')(acopioM);

    Lote = acopio.model;

    var clasificacionM = new Module('clasificacion');
    var clasification = require('../../../clasificacion/server/controllers/ClasificationController')(clasificacionM);

    var Clasificacion = clasification.model;
        Dashboard.belongsTo(Lote, {foreignKey: 'id'});

    var acopio = new Module('acopio');



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
            }).then(function(lotes){
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
        getDataGraph: function(req, res, next){
            console.log(req.query);
            Lote.findAll({
                where:{
                    createdAt: {
                        $gt: moment(req.query.start_date).toDate(),
                        $lt: moment(req.query.end_date).toDate()
                    }
                },
                group:['start_date'],
                attributes: ['lote', 'start_date', 'capacity',
                    [db.sequelize.fn('SUM', db.sequelize.col('capacity')),'capacity']
                ]
            }).then(function(lotes){
                var data = [];
                for (var row in lotes){
                    if(lotes[row].start_date) {
                        data.push([moment(lotes[row].start_date).toDate().getTime(), lotes[row].capacity]);
                    }
                }
                res.send(lotes);
            });

        },
        getDataGraphEmpacado: function(req, res, next){
            console.log(req.query);
            Empacado.findAll({
                where:{
                    createdAt: {
                        $gt: moment(req.query.start_date).toDate(),
                        $lt: moment(req.query.end_date).toDate()
                    }
                },
                group:['id'],
                attributes: ['id', 'createdAt', 'fruit_flow',
                    [db.sequelize.fn('SUM', db.sequelize.col('fruit_flow')),'fruit_flow']
                ]
            }).then(function(lotes){
                var data = [];
                for (var row in lotes){
                    var dateCreation = lotes[row].createdAt;
                    if(dateCreation) {
                        data.push([moment(dateCreation).toDate().getTime(), lotes[row].capacity]);
                    }
                }
                res.send(lotes);
            });

        }
    };

};
