'use strict';

module.exports = function(sequelize, DataTypes) {
    var Clasification = sequelize.define('clasification', {
            lote:{
                type:DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            peeled_fruit: DataTypes.INTEGER,
            clasified_fruit: DataTypes.INTEGER,
            fruit_flow:DataTypes.INTEGER,
            category:DataTypes.STRING,
            capacity:DataTypes.INTEGER,
            reponsible:DataTypes.STRING,
            light:DataTypes.BOOLEAN,
            presion:DataTypes.BOOLEAN,
            temperature:DataTypes.BOOLEAN
        }
    );

    return Clasification;
};
