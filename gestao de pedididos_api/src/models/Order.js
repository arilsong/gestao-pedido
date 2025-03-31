const {Model, DataTypes} = require("sequelize")
const sequelize = require("../config/db");

class Order extends Model {}


Order.init({
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },

    valor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM('aprovado', 'pendente', 'rejeitado'),
        defaultValue: 'pendente',
        allowNull: false
    },

    processado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },

    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, { sequelize, 
    modelName: 'order',
    tableName: 'orders'
});

module.exports = Order;