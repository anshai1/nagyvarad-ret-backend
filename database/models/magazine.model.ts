import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import sequelize from '../database'
import { Holiday } from '../../src/common/types/holiday.type'

export class Magazine extends Model<InferAttributes<Magazine>, InferCreationAttributes<Magazine>> {
  declare id: CreationOptional<number>
  declare created_at: CreationOptional<Date>

  declare title: string
  declare year: number
  declare file_path: string
  declare holiday: Holiday
  declare description: string
}

Magazine.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  created_at: DataTypes.DATE,
  title: DataTypes.STRING,
  year: DataTypes.STRING,
  file_path: DataTypes.STRING,
  holiday: DataTypes.STRING,
  description: DataTypes.STRING
}, {sequelize})