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
    code: Sequelize.STRING,
    redirectURI: Sequelize.STRING,
    ares_scope: Sequelize.STRING
}, { sequelize, modelName: 'AuthorizationCode' });

// const AuthorizationCode = sequelize.define('AuthorizationCode', {
//     code: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     redirectURI: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     ares_scope: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// }, {
//     // Other model options go here
// });

module.exports = AuthorizationCode;