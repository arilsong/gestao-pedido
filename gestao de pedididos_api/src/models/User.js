const {Model, DataTypes} = require("sequelize")
const sequelize = require("../config/db");


class User extends Model {}

User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    nif: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
        
    },
    
    role: {
        type: DataTypes.STRING,
        defaultValue: "user"
    }

  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });


module.exports = User;