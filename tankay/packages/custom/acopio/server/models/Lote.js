'use strict';

module.exports = function(sequelize, DataTypes) {
    var Lote = sequelize.define('lote', {
            lote:{
                type:DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            start_date: DataTypes.DATE,
            start_time: DataTypes.STRING,
            capacity:DataTypes.INTEGER,
            category:DataTypes.INTEGER,
            storage_time:DataTypes.STRING,
            presion:DataTypes.BOOLEAN,
            temperature:DataTypes.BOOLEAN,
            sector:DataTypes.STRING,
            phase:DataTypes.STRING,
            responsible:DataTypes.STRING
        }
    );

    return Lote;
};

