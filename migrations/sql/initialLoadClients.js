'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('clients', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            clientId: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            clientSecret: {
                type: Sequelize.STRING,
                allowNull: false
            },
            isTrusted: {
                type: Sequelize.STRING,
                allowNull: false
            },
            redirectURI: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('clients');
    }
  };