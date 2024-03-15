import { Model, DataTypes } from 'sequelize';
import sequelize from '../util/db';

export const Logistics = sequelize.define('logistics', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  logistics_info: {
    type: DataTypes.TEXT(),
    allowNull: false,
  },
  logistics_status:{
    type :DataTypes.STRING(20),
    allowNull:false
  },
  logistics_code:{
    type :DataTypes.STRING(50),
    allowNull:false
  },
  logistics_time:{
    type :DataTypes.DATE(),
    defaultValue:new Date()
  }
})

