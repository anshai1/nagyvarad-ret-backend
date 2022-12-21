import {Request, Response} from 'express'
import * as authService from './auth.service'
import {LogInRQ} from '../../common/request/log_in.request'
import {ApiError} from '../../common/api_error'
import {ApiResponse} from '../../common/api_response'

const USER_ID_PARAM_KEY = 'userId'

export async function log_in(req: Request, res: Response) {
  const log_in_request: LogInRQ = req.body
  const response = await authService.log_in(log_in_request)
    .catch(error => {
      const api_error = new ApiError('LOGIN_ERROR', error.message)
      const response = ApiResponse.for_failure([api_error])

      res
        .status(200)
        .send(response)
    })

  return res
    .status(200)
    .send(response)
}

export async function log_out(req: Request, res: Response) {
  const user_id = req.params[USER_ID_PARAM_KEY]

  const response = await authService.logOut(+user_id)
    .catch(exception => {
      const error = new ApiError('LOGOUT_ERROR', exception)
      const response = ApiResponse.for_failure([error])

      res
        .status(200)
        .send(response)
    })

  res
    .status(200)
    .send(response)
}