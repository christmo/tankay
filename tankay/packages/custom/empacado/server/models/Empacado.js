'use strict';

module.exports = function(sequelize, DataTypes) {
    var Empacado = sequelize.define('empacado', {
            lote:{
                type:DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            production: DataTypes.INTEGER,
            fruit_flow:DataTypes.INTEGER,
            capacity:DataTypes.INTEGER,
            responsible: DataTypes.STRING,
            temperature:DataTypes.BOOLEAN
        }
    );

    return Empacado;
};
