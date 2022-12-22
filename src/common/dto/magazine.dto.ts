import { Holiday } from '../types/holiday.type'

export class MagazineDTO {
  constructor(
    public title: string,
    public year: number,
    public holiday: Holiday,
    public description: string,
    public file_path: string
  ) {
  }
}