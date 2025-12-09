const { sequelize } = require('./index');
const { DataTypes } = require('sequelize');
const User = require('./User');

const Order = sequelize.define('Order', {
  items: { type: DataTypes.JSON, allowNull: false },
  total: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'pending' }
});

Order.belongsTo(User);
User.hasMany(Order);

module.exports = Order;