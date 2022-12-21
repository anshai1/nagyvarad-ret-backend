import { MessageDTO } from '../dto/messageDTO'

export class GetAllMessagesRS {
  constructor(
    public messages: Array<MessageDTO>
  ) {
  }
}