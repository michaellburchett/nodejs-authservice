'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('authorizationcodes', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userId: Sequelize.INTEGER,
            clientId: Sequelize.INTEGER,
            code: Sequelize.STRING,
            redirectURI: Sequelize.STRING,
            ares_scope: Sequelize.STRING,
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('authorizationcodes');
    }
  };