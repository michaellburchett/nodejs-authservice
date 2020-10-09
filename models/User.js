const { Sequelize, DataTypes, Model } = require('sequelize');
const Client = require('./Client.js');

const sequelize = new Sequelize(
    'auth',
    'root',
    'password', {
            host: '127.0.0.1',
            dialect: 'mysql',
            logging: false
        }
    );

class User extends Model {}
User.init({
    email: Sequelize.STRING,
    password: Sequelize.STRING
}, { sequelize, modelName: 'User' });

module.exports = User;