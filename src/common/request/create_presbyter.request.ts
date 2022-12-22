import { PresbyterDTO } from '../dto/presbyter.dto'

export class CreatePresbyterRQ {
  constructor(
    public presbyter: PresbyterDTO
  ) {
  }
}