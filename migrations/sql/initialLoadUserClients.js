'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('user_clients', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userId: Sequelize.STRING,
            clientId: Sequelize.STRING
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('user_clients');
    }
  };