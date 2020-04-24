const Sequelize = require('sequelize')
const connection = require('../utils/connection')

const Position = connection.define('Position', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    category: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Categories',
            key: 'id',
            // hooks: true
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    updatedBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    deletedBy: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    deletedAt: {
        type: Sequelize.DATE
    }
})

module.exports = Position