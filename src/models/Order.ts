import {
  Model, DataTypes,
  InferAttributes, InferCreationAttributes,
  ModelStatic,
  ModelAttributeColumnOptions,
  CreationOptional,
  Attributes
} from 'sequelize';
import sequelize from '../util/db';

export enum OrderStatus {
  Ordered,
  Transiting,
  Completed
}

export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  public id!: CreationOptional<number>;
  public order_id!: string;
  public status!: OrderStatus;
  public described!: boolean;
  public user_phone!: CreationOptional<string>;
  public logistics_status!: CreationOptional<string>;
  public logistics_code!: CreationOptional<string>;
  public logistics_company!: CreationOptional<string>;
  public shipper_code!: CreationOptional<string>;
  public operator_phone!: CreationOptional<string>;
  public account!: CreationOptional<string>;
  public product_name!: CreationOptional<string>;
  public status_update_at!: CreationOptional<Date>;
  public describe_at!: CreationOptional<Date>;
  public createdAt!: CreationOptional<Date>;
  public updatedAt!: CreationOptional<Date>;


  async updateData(data: Partial<Attributes<Order>>) {
    if ('described' in data && data.described !== this.described) {
      this.describe_at = new Date()
    }
    Object.keys(data).forEach((k) => {
      if (k in this) {
        // @ts-ignore
        this[k] = data[k]
      }
    })
    return await this.save()
  }
}

Order.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '订单ID',
    unique: true,
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: OrderStatus.Ordered,
    comment: '状态，0已下单 1运输中 2已完结',
    allowNull: false,
  },
  described: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  user_phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  logistics_status: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  logistics_code: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  logistics_company: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  shipper_code: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  operator_phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  account: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  product_name: {
    type: DataTypes.TEXT(),
    allowNull: true
  },
  status_update_at: {
    type: DataTypes.DATE(),
    allowNull: true
  },
  describe_at: {
    type: DataTypes.DATE(),
    allowNull: true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {sequelize, tableName: 'orders'})


export interface OrderParams {
  order_id: string //  必填，订单ID
  account?: string // 首次必填， 后面填则更新。当前淘宝账号
  operator_phone?: string // 首次必填， 后面填则更新。运营手机
  product_name?: string // 首次必填， 后面填则更新。 商品名称
  user_phone?: string // 首次必填， 后面填则更新。用户手机
  logistics_code?: string //  快递单号 未填按待发货状态
  logistics_company?: string // 快递公司
}
