import * as UR from '../../../database/repository/user.repository'
import * as ATR from '../../../database/repository/auth_token.repository'
import {NextFunction, Request, Response} from 'express'
import {pipe} from 'fp-ts/function'
import * as O from 'fp-ts/lib/Option'
import {fromNullable, getOrElse, isNone, isSome, map} from 'fp-ts/lib/Option'
import {ApiError} from '../../common/api_error'
import {ApiResponse} from '../../common/api_response'
import {AuthToken} from '../../../database/models/auth_token.model'
import * as BCRYPT from '../../common/util/bcrypt.util'
import * as JWT from '../../common/util/jwt.util'
import {Option} from 'fp-ts/Option'
import {log} from '../../logger'
import {LogInRQ} from '../../common/request/log_in.request'
import {LogInRS} from '../../common/resposne/log_in.response'

export async function log_in(request: LogInRQ): Promise<ApiResponse<LogInRS>> {
  const {username, password} = request

  const user = await UR.find_by_username(username)
  if (isNone(user)) {
    const error = new ApiError('NO_SUCH_USERNAME', `No such username: ${username}`)
    return ApiResponse.for_failure([error])
  }

  const is_password_valid = BCRYPT.verify(password, user.value.get().password)
  if (!is_password_valid) {
    const error = new ApiError('INVALID_PASSWORD', `Invalid password`)
    return ApiResponse.for_failure([error])
  }

  return pipe(
    await get_existing_or_create_new_token(user.value.id),
    map(auth_token => auth_token.token),
    getOrElse(() => ''),
    token => new LogInRS(token),
    ApiResponse.for_success
  )
}

export async function logOut(userId: number): Promise<void> {
  const user = await UR.find_by_id(userId)
  if (isNone(user)) {
    log.log({
      level: 'info',
      message: `Trying to log out from a non existing user with ID: ${userId}`
    })
  }

  const token = await ATR.find_by_user_id(userId)
  if (isNone(token)) {
    log.log({
      level: 'info',
      message: `NO auth token was found for user with ID: ${userId}`
    })
  } else {
    await token.value.destroy()
  }
}

export const authorize_request = (req: Request, res: Response, next: NextFunction): void => {
  const has_access = pipe(
    parse_auth_token(req),
    getOrElse(() => ''),
    auth_token => JWT.verify(auth_token))

  if (!has_access) res
    .status(401)
    .send('UNAUTHORIZED')

  next()
}

const parse_auth_token = (req: Request): O.Option<string> =>
  fromNullable(req.headers.authorization?.split(' ')[1])

async function get_existing_or_create_new_token(user_id: number) {
  return await ATR.find_by_user_id(user_id) || await create_new_token(user_id)
}

const create_new_token = async (userId: number): Promise<AuthToken> => {
  const token = JWT.sign({user_id: userId})
  const auth_token: Option<AuthToken> = await ATR.create_for_user(userId, token)
  if(isSome(auth_token)) {
    return auth_token.value
  } else {
    throw new Error(`Error while creating new auth token for user with id: ${userId}`)
  }
}
