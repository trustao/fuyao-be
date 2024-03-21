import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize";
import sequelize from "../util/db";

export enum UserStatus {
  Default,
  Disabled
}

export enum Role {
  ADMIN = 'ad',
  Operator = 'op'
}

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  public id!: CreationOptional<number>;
  public phone!: string;
  public username!: CreationOptional<string>;
  public password!: CreationOptional<string>;
  public role!: CreationOptional<string>;
  public status!: CreationOptional<UserStatus>;
  public createdAt!: CreationOptional<Date>;
  public updatedAt!: CreationOptional<Date>;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  status: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: UserStatus.Default
  },
  phone: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING(10),
    defaultValue: Role.Operator,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {sequelize, tableName: 'users'})
