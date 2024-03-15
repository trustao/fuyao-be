import { Model, DataTypes } from 'sequelize';
import sequelize from '../util/db';

export const RetryQueue =  sequelize.define('retryQueue', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  logistics_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  retry_count:{
    type :DataTypes.TINYINT.UNSIGNED,
    defaultValue :0
  },
  status:{
    type :DataTypes.STRING(20),
    allowNull:false
  },
  next_retry_time:{
    type :DataTypes.DATE(),
    allowNull:false
  },
  created_at:{
    type :DataTypes.DATE(),
    allowNull:false
  },
  updated_at:{
    type :DataTypes.DATE(),
    allowNull:false
  }
})


