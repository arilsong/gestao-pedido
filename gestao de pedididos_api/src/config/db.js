const {Sequelize} = require("sequelize")


const sequelize = new Sequelize('gestao_pedido', 'root', '',{
    host: 'localhost',
    dialect: "mysql",
    logging: false
});
  

module.exports = sequelize;