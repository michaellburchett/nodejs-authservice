const { Sequelize, DataTypes, Model } = require('sequelize');
const User = require('./User.js');

const sequelize = new Sequelize(
    'auth',
    'root',
    'password', {
            host: '127.0.0.1',
            dialect: 'mysql',
            logging: false
        }
    );

class Client extends Model {}
Client.init({
    name: Sequelize.STRING,
    clientId: Sequelize.STRING,
    clientSecret: Sequelize.STRING,
    isTrusted: Sequelize.STRING,
    redirectURI: Sequelize.STRING,
}, { sequelize, modelName: 'Client' });

module.exports = Client;