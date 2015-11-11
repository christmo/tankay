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
                //console.log(moment(lotes[0].dataValues.start_date).format("YYYY-MM-DD HH:mm"));

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
        }
    };

};
