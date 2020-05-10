const Sequelize = require('sequelize')
const connection = require('../utils/connection')

const Client = connection.define('Client', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING
    },
    tel: {
        type: Sequelize.STRING
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

module.exports = Client