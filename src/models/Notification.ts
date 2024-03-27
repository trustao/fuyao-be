import {Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional} from 'sequelize';
import sequelize from '../util/db';

export enum NotificationType {
  SMS = 'sms',
  VMS = 'vms'
}

export enum NotificationStatus {
  Pending,
  Success,
  Failed
}

export class Notification extends Model<InferAttributes<Notification>, InferCreationAttributes<Notification>> {
  public id!: CreationOptional<number>;
  public order_id!: string;
  public logistics_id!: number;
  public type!: NotificationType;
  public use_phone!: string;
  public template_id!: string;
  public params!: string;
  public status!: NotificationStatus;
  public back_time!: CreationOptional<Date>;
  public call_id!: CreationOptional<string>;
  public back_info!: CreationOptional<string>;
  public createdAt!: CreationOptional<Date>;
  public updatedAt!: CreationOptional<Date>;
}

Notification.init({
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
  type: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  use_phone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  template_id: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  params: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  back_time: {
    type: DataTypes.DATE(),
    allowNull: true
  },
  back_info: {
    type: DataTypes.TEXT(),
    allowNull: true
  },
  call_id: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {sequelize, tableName: 'notifications'})
