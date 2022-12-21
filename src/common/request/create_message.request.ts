import { MessageDTO } from '../dto/messageDTO'

export class CreateMessageRQ {
  constructor(
    public message: MessageDTO
  ) {
  }
}