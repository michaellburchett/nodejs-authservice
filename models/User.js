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

class User extends Model {}
User.init({
    email: Sequelize.STRING,
    password: Sequelize.STRING
}, { sequelize, modelName: 'User' });

module.exports = User;