'use strict';

module.exports = function(sequelize, DataTypes) {
    var Empacado = sequelize.define('empacado', {
            production: DataTypes.INTEGER,
            fruit_flow:DataTypes.INTEGER,
            capacity:DataTypes.INTEGER,
            responsible: DataTypes.STRING,
            temperature:DataTypes.BOOLEAN,
            step_detail:DataTypes.STRING,
            next_step:DataTypes.STRING
        }
    );

    return Empacado;
};
