import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import sequelize from '../database';
import { SubscriptionDTO } from '../../src/common/dto/subscription.dto'

export class Subscription extends Model<InferAttributes<Subscription>, InferCreationAttributes<Subscription>> {
  declare id: CreationOptional<number>;
  declare created_at: CreationOptional<Date>;

  declare first_name: string;
  declare last_name: string;
  declare email: string;
  declare circular_letter: boolean;
  declare magazine: boolean;

  static from_dto(dto: SubscriptionDTO) {
    return Subscription.build({
      ...dto,
      created_at: new Date()
    })
  }
}

Subscription.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  created_at: DataTypes.DATE,

  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  email: DataTypes.STRING,
  circular_letter: DataTypes.BOOLEAN,
  magazine: DataTypes.BOOLEAN
}, { sequelize })
