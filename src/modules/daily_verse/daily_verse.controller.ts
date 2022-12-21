import { NextFunction, Request, Response } from 'express'
import moment from 'moment'
import * as DVS from './daily_verse.service'
import { ApiResponse } from '../../common/api_response'
import { ApiError } from '../../common/api_error'
import { ErrorCodes } from '../../common/error_codes'
import { GetDailyVerseRS } from '../../common/resposne/get_daily_verse.response'
import { GetAllDailyVersesRS } from '../../common/resposne/get_all_daily_verses.response'

export async function get_dv_by_date(req: Request, res: Response, next: NextFunction) {
  // If the request holds an invalid date string, we default with the current day's date
  const date = req.query.date?.toString() || new Date()
  const date_predicate = moment(date).startOf('day').toDate()

  DVS.get_daily_verse_by_date(date_predicate)
    .then((daily_verse_response: GetDailyVerseRS) => {
      const api_response = ApiResponse.for_success(daily_verse_response)

      return res.send(api_response)
    })
    .catch((error: Error) => {
      const api_error = new ApiError(ErrorCodes.UNEXPECTED_ERROR, error.message)
      const api_response = ApiResponse.for_failure([api_error])

      return res.send(api_response)
    })
}

export async function get_all(req: Request, res: Response) {
  DVS.get_all()
    .then((daily_verses: GetAllDailyVersesRS) => {
      const api_response = ApiResponse.for_success(daily_verses)

      return res.send(api_response)
    })
    .catch((error: Error) => {
      const api_error = new ApiError(ErrorCodes.UNEXPECTED_ERROR, error.message)
      const api_response = ApiResponse.for_failure([api_error])

      return res.send(api_response)
    })
}
