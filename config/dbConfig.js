const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('railway_management', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
