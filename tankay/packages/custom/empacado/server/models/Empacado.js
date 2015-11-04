'use strict';

module.exports = function(sequelize, DataTypes) {
    var Empacado = sequelize.define('empacado', {
            loteId:{
                type:DataTypes.INTEGER
            },
            production: DataTypes.INTEGER,
            fruit_flow:DataTypes.INTEGER,
            capacity:DataTypes.INTEGER,
            responsible: DataTypes.STRING,
            temperature:DataTypes.BOOLEAN
        }, {
            classMethods: {
                associate: function(models) {
                    console.log('Models');
                    console.log(models);
                    Empacado.belongsTo(models.Secado, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            allowNull: false
                        }
                    });
                }
            }
        }
    );

    return Empacado;
};
