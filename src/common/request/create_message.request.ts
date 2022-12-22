import { MessageDTO } from '../dto/message.dto'

export class CreateMessageRQ {
  constructor(
    public message: MessageDTO
  ) {
  }
}