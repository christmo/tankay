'use strict';

module.exports = function(sequelize, DataTypes) {
    var Secado = sequelize.define('secado', {
            drying_time: DataTypes.INTEGER,
            fruit_flow:DataTypes.INTEGER,
            capacity:DataTypes.INTEGER,
            responsible: DataTypes.STRING,
            air_flow:DataTypes.BOOLEAN,
            hot_air_control:DataTypes.BOOLEAN,
            humidity_control:DataTypes.BOOLEAN,
            temperature:DataTypes.BOOLEAN/*,
            step_detail:DataTypes.STRING,
            next_step:DataTypes.STRING*/
        }
    );

    return Secado;
};
