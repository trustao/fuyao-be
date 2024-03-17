import {Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional} from 'sequelize';
import sequelize from '../util/db';

export class Logistics extends Model<InferAttributes<Logistics>, InferCreationAttributes<Logistics>> {
  public id!: CreationOptional<number>;
  public order_id!: string;
  public logistics_info!: CreationOptional<string>;
  public logistics_status!: string;
  public logistics_code!: CreationOptional<string>;
  public logistics_time!: CreationOptional<Date>;
}

Logistics.init({
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
    allowNull: true,
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
}, {
  sequelize, tableName: 'logistics'
})
