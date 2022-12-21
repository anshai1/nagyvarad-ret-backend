import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize";
import sequelize from "../database";
import { MessageDTO } from '../../src/common/dto/messageDTO'

export class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
  declare id: CreationOptional<number>;
  declare created_at: CreationOptional<Date>;

  declare sender_name: string;
  declare title: string;
  declare message: string;
  declare opened: boolean;

  public static from_dto = (message_dto: MessageDTO): Message =>
    Message.build({
      ...message_dto,
      created_at: new Date(),
      opened: false
    })
}

Message.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  created_at: DataTypes.DATE,
  opened: DataTypes.BOOLEAN,

  sender_name: DataTypes.STRING,
  title: DataTypes.STRING,
  message: DataTypes.STRING
}, {sequelize})
