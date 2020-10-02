const { Sequelize, DataTypes, Model } = require('sequelize');
const User = require('./User.js');
const Client = require('./Client.js');
const AuthorizationCode = require('./AuthorizationCode.js');

const setAssociations = function() {
    User.belongsToMany(Client, { through: 'User_Clients' });
    Client.belongsToMany(User, { through: 'User_Clients' });
    AuthorizationCode.belongsTo(User);
    AuthorizationCode.belongsTo(Client);
};

module.exports = setAssociations;
