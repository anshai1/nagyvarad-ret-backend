import { Presbyter } from '../../../database/models/presbyter.model'

export class PresbyterDTO {
  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public middle_name: string,
    public photo_path?: string
  ) {}

  public static from_model(presbyter: Presbyter): PresbyterDTO {
    return {
      id: presbyter.id,
      first_name: presbyter.first_name,
      last_name: presbyter.last_name,
      middle_name: presbyter.middle_name,
      photo_path: presbyter.photo_path
    }
  }
}