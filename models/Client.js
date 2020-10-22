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

class Client extends Model {}
Client.init({
    name: Sequelize.STRING,
    clientId: Sequelize.STRING,
    clientSecret: Sequelize.STRING,
    isTrusted: Sequelize.STRING,
    redirectURI: Sequelize.STRING,
}, { sequelize , modelName: 'Client' });

module.exports = Client;