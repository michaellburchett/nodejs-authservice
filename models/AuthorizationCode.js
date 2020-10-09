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

class AuthorizationCode extends Model {}
AuthorizationCode.init({
    userId: Sequelize.INTEGER,
    clientId: Sequelize.INTEGER,
    code: Sequelize.STRING,
    redirectURI: Sequelize.STRING,
    ares_scope: Sequelize.STRING
}, { sequelize, modelName: 'AuthorizationCode' });

module.exports = AuthorizationCode;