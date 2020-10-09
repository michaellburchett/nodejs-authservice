'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('authorizationcodes', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            clientId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            code: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            redirectURI: {
                type: Sequelize.STRING,
                allowNull: false
            },
            ares_scope: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('authorizationcodes');
    }
  };