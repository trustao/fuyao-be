import {Model, DataTypes} from 'sequelize';
import sequelize from '../util/db';

export const Order  = sequelize.define('order', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  user_phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  logistics_status: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  logistics_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  logistics_company: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  logistics_code: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  operator_phone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  account: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  product_name: {
    type: DataTypes.TEXT(),
    allowNull: false
  },
  status_update_at: {
    type: DataTypes.DATE(),
    defaultValue: new Date()
  }
})

