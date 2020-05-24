const Sequelize = require('sequelize')
const connection = require('../utils/connection')

const Order = connection.define('Order', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    manager: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    store: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Stores',
            key: 'id'
        }
    }
})

module.exports = Order
