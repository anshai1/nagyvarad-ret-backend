import { MessageDTO } from '../dto/message.dto'

export class CreateMEssageRS {
  constructor(
    public message: MessageDTO
  ) {
  }
}