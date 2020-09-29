const { Sequelize, DataTypes } = require('sequelize');
const User = require('User.js');
const Client = require('Client.js');

const sequelize = new Sequelize(
    'auth',
    'root',
    'password', {
            host: '127.0.0.1',
            dialect: 'mysql',
            logging: false
        }
    );

const AuthorizationCode = sequelize.define('AuthorizationCode', {
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    redirectURI: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ares_scope: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Other model options go here
});

AuthorizationCode.belongsTo(User);
AuthorizationCode.belongsTo(Client);

module.exports = AuthorizationCode;