import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize";
import sequelize from "../util/db";


export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  public id!: CreationOptional<number>;
  public phone!: string;
  public username!: CreationOptional<string>;
  public password!: CreationOptional<string>;
  public role!: CreationOptional<string>;
  public createdAt!: CreationOptional<Date>;
  public updatedAt!: CreationOptional<Date>;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {sequelize, tableName: 'users'})
