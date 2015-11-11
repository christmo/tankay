'use strict';

module.exports = function(sequelize, DataTypes) {
    var Dashboard = sequelize.define('dashboard', {
            /*lote:{
                type:DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },*/
            step_detail:DataTypes.STRING,
            next_step:DataTypes.STRING
        }
    );

    return Dashboard;
};

