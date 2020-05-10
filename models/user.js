const Sequelize = require('sequelize')
const connection = require('../utils/connection')

const User = connection.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    store: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Stores',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    profession: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Professions',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
})

module.exports = User