const sequelize = require('./config/db');
const Order = require('./models/order');

const User = require('./models/User');


User.hasMany(Order, { foreignKey: 'userId', as : 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as : 'users' });


async function syncAndSeed() {
    await sequelize.sync({ force: true }); 
    console.log('Banco de dados sincronizado.');
}

syncAndSeed();
