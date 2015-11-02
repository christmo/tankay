'use strict';

//var db_app = require('../../../../../config/sequelize');

module.exports = function(sequelize, DataTypes) {
    var Lote = sequelize.define('lote', {
            lote:{
                type:DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            start_date: DataTypes.DATE,
            start_time: DataTypes.TIME,
            capacity:DataTypes.INTEGER,
            category:DataTypes.STRING,
            storage_time:DataTypes.STRING,
            presion:DataTypes.BOOLEAN,
            temperature:DataTypes.BOOLEAN,
            sector:DataTypes.STRING,
            phase:DataTypes.STRING,
            reponsible:DataTypes.STRING
        }
    );

    return Lote;
};
/*
var User = db_app.sequelize.define('lote', {
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({force: true}).then(function () {
    // Table created
    return User.create({
        firstName: 'John',
        lastName: 'Hancock'
    });
});
*/
