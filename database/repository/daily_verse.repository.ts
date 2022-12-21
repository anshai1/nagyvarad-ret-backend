import { log } from '../../src/logger'
import { DailyVerse } from '../models/daily_verse.model'
import { fromNullable, Option } from 'fp-ts/Option'

export const find_by_date = async (date: Date): Promise<Option<DailyVerse>> =>
  DailyVerse.findOne({
    where: {date: date}
  })
    .then(daily_verse => fromNullable(daily_verse))
    .catch((error: Error) => {
      const error_message = `Failed to fetch daily verse by date: ${date}, ERROR: ${error.message}`
      log.error(error_message)

      throw new Error(error_message)
    })

export const save = async (daily_verse: DailyVerse): Promise<DailyVerse> =>
  daily_verse.save()
    .then((daily_verse: DailyVerse) => daily_verse)
    .catch((error: Error) => {
      const error_message = `Failed to save daily verse, ERROR: ${error.message}`
      log.error(error_message)

      throw new Error(error_message)
    })

export const find_all = async (): Promise<Array<DailyVerse>> =>
  DailyVerse.findAll()
    .then(daily_verses => daily_verses)
    .catch(error => {
      const error_message = `Failed to fetch all daily verses, ERROR: ${error.message}`
      log.error(error_message)

      throw new Error(error_message)
    })

// TODO: should implement modify and delete here
// on FE side we should make a list with all the verses for each day, selectable / deleteable / modifiy