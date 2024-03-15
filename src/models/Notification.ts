import { Model, DataTypes } from 'sequelize';
import sequelize from '../util/db';

export const Notification = sequelize.define('notification', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  logistics_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  order_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  type:{
    type :DataTypes.STRING(10),
    allowNull:false
  },
  use_phone:{
    type :DataTypes.STRING(20),
    allowNull:false
  },
  template_id:{
    type :DataTypes.STRING(20),
    allowNull:false
  },
  params:{
    type :DataTypes.STRING(200),
    allowNull:false
  },
  status:{
    type :DataTypes.STRING(10),
    allowNull:false
  },
  back_time:{
    type :DataTypes.DATE(),
    allowNull:true
  },
  message:{
    type :DataTypes.TEXT(),
    allowNull:false
  },
  back_info:{
    type :DataTypes.TEXT(),
    allowNull:true
  }
})
