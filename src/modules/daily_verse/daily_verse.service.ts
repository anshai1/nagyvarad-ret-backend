import { DailyVerse } from '../../../database/models/daily_verse.model'
import { isSome, Option } from 'fp-ts/Option'
import * as DVR from '../../../database/repository/daily_verse.repository'
import * as DVS from './daily_verse.scraper'
import { DailyVerseDTO } from '../../common/dto/daily_verse.dto'
import { GetDailyVerseRS } from '../../common/resposne/get_daily_verse.response'
import { GetAllDailyVersesRS } from '../../common/resposne/get_all_daily_verses.response'
import { pipe } from 'fp-ts/lib/function'

export async function get_daily_verse_by_date(date: Date): Promise<GetDailyVerseRS> {
  let existing_daily_verse: Option<DailyVerse> = await fetch_daily_verse_by_date(date)

  if (isSome(existing_daily_verse)) {
    return new GetDailyVerseRS(daily_verse_to_dto(existing_daily_verse.value))
  }

  const daily_verse = await get_and_save_dv_by_date(date)
  return new GetDailyVerseRS(daily_verse_to_dto(daily_verse))
}

export async function get_all(): Promise<GetAllDailyVersesRS> {
  return pipe(
    await DVR.find_all(),
    daily_verses => daily_verses.map(daily_verse_to_dto),
    daily_verse_dtos => new GetAllDailyVersesRS(daily_verse_dtos)
  )
}

async function get_and_save_dv_by_date(date: Date): Promise<DailyVerse> {
  const date_string = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  const daily_verse = await DVS.scrape_daily_verse_by_date(date_string)

  return await save_daily_verse(daily_verse)
}

const fetch_daily_verse_by_date = async (date: Date): Promise<Option<DailyVerse>> =>
  await DVR.find_by_date(date)

async function save_daily_verse(daily_verse_dto: DailyVerseDTO): Promise<DailyVerse> {
  const daily_verse: DailyVerse = DailyVerse.build({
    ...daily_verse_dto
  })

  return await DVR.save(daily_verse)
}

function daily_verse_to_dto(daily_verse: DailyVerse) {
  return new DailyVerseDTO(
    daily_verse.date,
    daily_verse.date_label,
    daily_verse.name_day,
    daily_verse.song_index,
    daily_verse.song_name,
    daily_verse.new_verse_title,
    daily_verse.new_verse_location,
    daily_verse.new_verse,
    daily_verse.new_explanation_title,
    daily_verse.new_explanation,
    daily_verse.old_verse_title,
    daily_verse.old_verse_location,
    daily_verse.old_verse,
    daily_verse.old_explanation_title,
    daily_verse.old_explanation_subtitle,
    daily_verse.old_explanation
  )
}
