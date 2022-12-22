import { MessageDTO } from '../dto/message.dto'

export class GetAllMessagesRS {
  constructor(
    public messages: Array<MessageDTO>
  ) {
  }
}