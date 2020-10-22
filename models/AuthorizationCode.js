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

class AuthorizationCode extends Model {}
AuthorizationCode.init({
    userId: Sequelize.INTEGER,
    clientId: Sequelize.INTEGER,
    code: Sequelize.STRING,
    redirectURI: Sequelize.STRING,
    ares_scope: Sequelize.STRING
}, { sequelize, modelName: 'AuthorizationCode' });

module.exports = AuthorizationCode;