const Sequelize = require('sequelize');

const connection = new Sequelize('postgres://:5432/acme-redux');
const Model = Sequelize.Model;

module.exports = {
  connection,
  Model,
};
