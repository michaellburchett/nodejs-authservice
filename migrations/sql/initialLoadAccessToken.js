'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('accesstokens', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            clientId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            authorizationCodeId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            token: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            refreshToken: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            expirationDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('accesstokens');
    }
  };