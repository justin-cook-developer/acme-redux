const Sequelize = require('sequelize');
const { connection, Model } = require('./connection');

class Product extends Model {}
Product.init(
  {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { sequelize: connection, modelName: 'product' }
);

module.exports = Product;
