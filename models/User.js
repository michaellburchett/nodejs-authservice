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

// const User = sequelize.define('User', {
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// }, {
//     // Other model options go here
// });

User.belongsToMany(Client, { through: 'User_Clients' });

module.exports = User;