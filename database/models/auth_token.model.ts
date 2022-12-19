import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize} from "sequelize";
import sequelize from "../database";

export class AuthToken extends Model<InferAttributes<AuthToken>, InferCreationAttributes<AuthToken>> {
  declare id: CreationOptional<number>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare user_id: number;
  declare token: string;
}

AuthToken.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: DataTypes.BIGINT,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  token: DataTypes.STRING,
}, { sequelize });