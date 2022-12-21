import { DailyVerseDTO } from '../dto/daily_verse.dto'

export class GetDailyVerseRS {
  constructor(
    public daily_verse: DailyVerseDTO
  ) {
  }
}