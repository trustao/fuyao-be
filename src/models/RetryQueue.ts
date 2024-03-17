import {Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional} from 'sequelize';
import sequelize from '../util/db';

export enum QueueStatus {
  WaitRetry,
  OnCalling,
  Complete
}

export class RetryQueue extends Model<InferAttributes<RetryQueue>, InferCreationAttributes<RetryQueue>> {
  public id!: CreationOptional<number>;
  public order_id!: string;
  public logistics_id!: number;
  public retry_count!: number;
  public status!: QueueStatus;
  public next_retry_time!: CreationOptional<Date>;
  public createdAt!: CreationOptional<Date>;
  public updatedAt!: CreationOptional<Date>;
}

RetryQueue.init({
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
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull:false
  },
  next_retry_time:{
    type :DataTypes.DATE(),
    allowNull: true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {sequelize, tableName: 'retry_queue'});



