'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var _ = require('lodash');
var mean = require('meanio');
var config = mean.loadConfig();
var winston = require('winston');
var db_app = {};


winston.info('Initializing Sequelize...');

// create your instance of sequelize
var sequelize = new Sequelize(config.db_app.name, config.db_app.username, config.db_app.password, {
    host: config.db_app.host,
    port: config.db_app.port,
    dialect: 'mysql',
    storage: config.db_app.storage,
    logging: config.enableSequelizeLog ? winston.verbose : false
});

// loop through all files in models directory ignoring hidden files and this file
//fs.readdirSync(config.modelsDir)
fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    // import model files and save model names
    .forEach(function (file) {
        winston.info('Loading model file '+ __dirname + file);
        var model = sequelize.import(path.join(__dirname, file));
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
/*sequelize
    .sync({force: config.forceSequelizeSync})
    .then(function () {
        winston.info('Database ' + (config.forceSequelizeSync ? '*DROPPED* and ' : '') + 'synchronized');
    }).catch(function (err) {
        winston.error('An error occured: %j', err);
    });*/

// assign the sequelize variables to the db object and returning the db.
module.exports = _.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db_app);

