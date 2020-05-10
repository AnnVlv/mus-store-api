const Sequelize = require('sequelize')
const connection = require('../utils/connection')

const Profession = connection.define('Profession', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Profession
