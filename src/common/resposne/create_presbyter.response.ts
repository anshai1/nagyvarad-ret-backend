import { PresbyterDTO } from '../dto/presbyter.dto'

export class CreatePresbyterRS {
  constructor(
    public presbyter: PresbyterDTO
  ) {
  }
}