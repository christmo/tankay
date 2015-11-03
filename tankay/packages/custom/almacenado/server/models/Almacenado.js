'use strict';

module.exports = function(sequelize, DataTypes) {
    var Almacenado = sequelize.define('almacenado', {
            lote:{
                type:DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            responsible: DataTypes.STRING,
            humidity_control:DataTypes.BOOLEAN,
            temperature:DataTypes.BOOLEAN,
            dehumidifier: DataTypes.BOOLEAN,
            fourth_aroma: DataTypes.BOOLEAN,
            packing_list: DataTypes.BOOLEAN
        }
    );

    return Almacenado;
};
