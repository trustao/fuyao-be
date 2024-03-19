import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize";
import sequelize from "../util/db";

export const SESSION_KEY = '_s'

export enum CodeType {
  Login,
  Auth,
}

export class Authentication extends Model<InferAttributes<Authentication>, InferCreationAttributes<Authentication>> {
  public id!: CreationOptional<number>;
  public user_id!: CreationOptional<number>;
  public phone!: CreationOptional<string>;
  public code_type!: CodeType;
  public code!: string;
  public expire_time!: Date;

}


Authentication.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  code_type: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  expire_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {sequelize, tableName: 'authentication'})
