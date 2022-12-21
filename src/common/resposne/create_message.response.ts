import { MessageDTO } from '../dto/messageDTO'

export class CreateMEssageRS {
  constructor(
    public message: MessageDTO
  ) {
  }
}