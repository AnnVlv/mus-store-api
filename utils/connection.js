const Sequelize = require('sequelize')

const DB_NAME = 'heroku_22f87be3376fde8';
const USER_NAME = 'b93b0002a56f65'; 
const PASSWORD = '839e24ae';

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
    host: 'us-cdbr-iron-east-01.cleardb.net',
    dialect: 'mysql'
});

// const DB_NAME = 'mus-store';
// const USER_NAME = 'root'; 
// const PASSWORD = '1234qwerty';

// const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
//     host: 'localhost',
//     dialect: 'mysql'
// });

module.exports = sequelize;
