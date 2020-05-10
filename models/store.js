const Sequelize = require('sequelize')
const connection = require('../utils/connection')

const Store = connection.define('Store', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    street: {
        type: Sequelize.STRING,
        allowNull: false
    },
    house: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Store