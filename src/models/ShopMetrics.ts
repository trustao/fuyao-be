import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize";
import sequelize from "../util/db";

export class ShopMetrics extends Model<InferAttributes<ShopMetrics>, InferCreationAttributes<ShopMetrics>> {
  public date!: CreationOptional<Date>;
  public shop_name!: string;
  public star!: CreationOptional<number>;
  public product_count!: CreationOptional<number>;
  public release_time!: CreationOptional<Date>;
  public visitor_count!: CreationOptional<number>;
  public volume!: CreationOptional<number>;
  public turnover!: CreationOptional<number>;
  public pct!: CreationOptional<number>;
  public tcr!: CreationOptional<number>;
  public mcta!: CreationOptional<number>;
  public acta!: CreationOptional<number>;
  public jzt_cost!: CreationOptional<number>;
  public acc!: CreationOptional<number>;
  public roi!: CreationOptional<number>;
  public jzt_mc!: CreationOptional<number>;
  public amcc!: CreationOptional<number>;
  public mroi!: CreationOptional<number>;
}


ShopMetrics.init({
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: '数据日期'
  },
  shop_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '店铺名'
  },
  star: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    comment: '店铺星级',
  },
  product_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '在售商品数',
  },
  release_time: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: '最新上架时间'
  },
  visitor_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '访客  visitor_count',
  },
  volume: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '成交单量  volume',
  },
  turnover: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    comment: '成交金额 turnover',
  },
  pct: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    comment: '客单价  Per customer transaction',
  },
  tcr: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    comment: '成交转化率 Transaction conversion rate',
  },
  mcta: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    comment: '月累计成交金额  Monthly cumulative transaction amount',
  },
  acta: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    comment: '年累计成交金额 Annual cumulative transaction amount',
  },
  jzt_cost: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    comment: '京准通花费 Jingzhuntong cost',
  },
  acc: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    comment: '平均点击成本 average click cost',
  },
  roi: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    comment: 'roi',
  },
  jzt_mc: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    comment: '月度京准通花费 Jingzhuntong Monthly cost',
  },
  amcc: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    comment: '月度平均点击成本 Average monthly click cost',
  },
  mroi: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    comment: '月度roi monthly ROI',
  },

}, {sequelize, tableName: 'shop_metrics'})
