import sequelize from "../util/db";
import {DataTypes} from "sequelize";
import logger from "../util/logger";

export const OrderNotification = sequelize.define('OrderNotification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  time: {
    type: DataTypes.TIME
  }
}, {tableName: 'notification', timestamps: false})


export function sync() {
  sequelize.sync()
    .then(v => logger.log('OrderNotification Sync Complete'))
    .catch(e => {
      logger.log('OrderNotification Sync Failed');
      logger.error(e)
    })
}

