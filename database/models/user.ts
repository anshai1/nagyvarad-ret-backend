import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize} from 'sequelize'
import sequelize from '../database'

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>
  declare first_name: string
  declare last_name: string
  declare middle_name: string
  declare username: string
  declare password: string
  declare email: string
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  middle_name: DataTypes.STRING,
  email: DataTypes.STRING,
  username: DataTypes.STRING,
  password: DataTypes.STRING
}, {sequelize})