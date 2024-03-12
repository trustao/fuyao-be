import sequelize from "../util/db";
import {DataTypes} from "sequelize";

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

})
