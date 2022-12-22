import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import sequelize from '../database'

export class Presbyter extends Model <InferAttributes<Presbyter>, InferCreationAttributes<Presbyter>> {
  declare id: CreationOptional<number>
  declare created_at: CreationOptional<Date>

  declare first_name: string
  declare last_name: string
  declare middle_name: string
  declare photo_path: string
}

Presbyter.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },

  created_at: DataTypes.DATE,
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  middle_name: DataTypes.STRING,
  photo_path: DataTypes.STRING
}, {sequelize})