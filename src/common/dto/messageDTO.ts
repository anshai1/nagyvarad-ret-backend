import { Message } from '../../../database/models/message.model'

export class MessageDTO {
  constructor(
    public sender_name: string,
    public title: string,
    public message: string,

    public id?: number,
    public created_at?: Date,
  ) {}

  public static fromMessage(message: Message): MessageDTO {
    return new MessageDTO(
      message.sender_name,
      message.title,
      message.message,
      message.id,
      message.created_at
    );
  }
}