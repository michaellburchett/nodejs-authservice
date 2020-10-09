'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('user_clients', {
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
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('user_clients');
    }
  };