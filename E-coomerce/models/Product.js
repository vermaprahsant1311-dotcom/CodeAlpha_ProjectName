const { sequelize } = require('./index');
const { DataTypes } = require('sequelize');

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING }
});

module.exports = Product;
