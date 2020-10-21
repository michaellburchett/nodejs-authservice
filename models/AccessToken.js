const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize(
    'auth',
    'root',
    'password', {
            host: '127.0.0.1',
            dialect: 'mysql',
            logging: false
        }
    );

class AccessToken extends Model {}
AccessToken.init({
    userId: Sequelize.INTEGER,
    clientId: Sequelize.INTEGER,
    authorizationCodeId: Sequelize.INTEGER,
    token: Sequelize.STRING,
    type: Sequelize.STRING,
    expirationDate: Sequelize.DATE,
}, { sequelize, modelName: 'AccessToken' });

module.exports = AccessToken;