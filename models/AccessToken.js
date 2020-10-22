const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_TABLE,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
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
    refreshToken: Sequelize.STRING,
    expirationDate: Sequelize.DATE,
}, { sequelize, modelName: 'AccessToken' });

module.exports = AccessToken;