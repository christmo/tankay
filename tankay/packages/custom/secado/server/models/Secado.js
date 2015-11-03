'use strict';

module.exports = function(sequelize, DataTypes) {
    var Secado = sequelize.define('secado', {
            lote:{
                type:DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            drying_time: DataTypes.INTEGER,
            fruit_flow:DataTypes.INTEGER,
            capacity:DataTypes.INTEGER,
            responsible: DataTypes.STRING,
            air_flow:DataTypes.BOOLEAN,
            hot_air_control:DataTypes.BOOLEAN,
            humidity_control:DataTypes.BOOLEAN,
            temperature:DataTypes.BOOLEAN
        }
    );

    return Secado;
};
