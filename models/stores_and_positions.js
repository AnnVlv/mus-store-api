const Sequelize = require('sequelize')
const connection = require('../utils/connection')
const Store = require('./store')
const Position = require('./position')

const Stores_and_positions = connection.define('Stores_and_positions', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    position_count: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Store.belongsToMany(Position, {through: Stores_and_positions})
Position.belongsToMany(Store, {through: Stores_and_positions})

module.exports = Stores_and_positions
