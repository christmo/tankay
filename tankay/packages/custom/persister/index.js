'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var _ = require('lodash');
var mean = require('meanio');
var config = mean.loadConfig();
var winston = require('winston');
var db_app = {};

var modelPath = "";
winston.info('Initializing Sequelize...');

// create your instance of sequelize
var sequelize = new Sequelize(config.db_app.name, config.db_app.username, config.db_app.password, {
    host: config.db_app.host,
    port: config.db_app.port,
    dialect: 'mysql',
    storage: config.db_app.storage,
    logging: config.enableSequelizeLog ? winston.verbose : false
});

function loadModels(pathModels) {


    modelPath = pathModels;
    fs.readdirSync(pathModels)
        .filter(function (file) {
            return (file.indexOf('.') !== 0) && (file !== 'index.js')
        })
        // import model files and save model names
        .forEach(function (file) {
            winston.info('Loading model file ' + pathModels + '/' + file);
            var model = sequelize.import(path.join(pathModels, file));
            console.log(' model: ' + model);
            db_app[model.name] = model;
        });

    // invoke associations on each of the models
    Object.keys(db_app).forEach(function (modelName) {
        if (db_app[modelName].options.hasOwnProperty('associate')) {
            db_app[modelName].options.associate(db_app)
        }
    });


    // Synchronizing any model changes with database.
    // WARNING: this will DROP your database everytime you re-run your application
    //sync();
}

function getModelModule(model, module) {
    console.log('Cargando model from ' + module + ': ' + model);
    return sequelize.import(path.resolve(__dirname, '../' + module + '/server/models/') + path.sep + model);
}
function getModel(model) {
    console.log('Cargando model: ' + model);
    return sequelize.import(modelPath + path.sep + model);
}

// assign the sequelize variables to the db object and returning the db.
module.exports = _.extend({
    sequelize: sequelize,
    Sequelize: Sequelize,
    loadModels: loadModels,
    getModel: getModel,
    getModelModule: getModelModule,
    sync: sync,
    util:util
}, db_app);


function sync() {
    sequelize
        .sync({force: config.forceSequelizeSync, logging: console.log})
        .then(function () {
            console.log('Database ' + (config.forceSequelizeSync ? '*DROPPED* and ' : '') + 'synchronized');
            winston.info('Database ' + (config.forceSequelizeSync ? '*DROPPED* and ' : '') + 'synchronized');
        }).catch(function (err) {
            winston.error('An error occured: %j', err);
        });
}


function util() {
    return {
        getErrorResponse: function (error) {
            winston.error(error);
            var msg = '';

            if (error.name === 'SequelizeUniqueConstraintError') {
                msg = 'El código de lote ya existe. Debe modificarlo para poder guardar el registro.';
            }else if (error.name === 'SequelizeForeignKeyConstraintError') {
                msg = 'No se puede eliminar la información porque depende de otra etapa del flujo.';
            }

            var response = {
                status: 'NOK',
                msg: msg,
                error: error
            };

            return response;
        }
    };
}