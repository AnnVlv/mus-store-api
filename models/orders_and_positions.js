const Sequelize = require('sequelize')
const connection = require('../utils/connection')
const Position = require('./position')
const Order = require('./order')

const Orders_and_positions = connection.define('Orders_and_positions', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    position_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    position_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    position_count: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Order.belongsToMany(Position, {through: Orders_and_positions})

module.exports = Orders_and_positions
