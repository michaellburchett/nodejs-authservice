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

// const Client = sequelize.define('Client', {
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     clientId: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     clientSecret: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     isTrusted: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     redirectURI: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// }, {
//     // Other model options go here
// });

module.exports = Client;