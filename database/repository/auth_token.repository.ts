import { AuthToken } from '../models/auth_token.model'
import { fromNullable, Option } from 'fp-ts/Option'
import { log } from '../../src/logger'

export const find_by_user_id = (user_id: number): Promise<Option<AuthToken>> => AuthToken.findOne(
  {where: {user_id: user_id}})
  .then(auth_token => fromNullable(auth_token))
  .catch(error => {
    const error_message = `Failed to fetch auth token for user id: ${user_id}, ERROR: ${error.message}`
    log.error(error_message)

    throw new Error(error_message)
  })

export const create_for_user = (user_id: number, token: string): Promise<Option<AuthToken>> => AuthToken.build({
  user_id: user_id,
  token: token,
  created_at: new Date(),
  updated_at: new Date()
})
  .save()
  .then(auth_token => fromNullable(auth_token))
  .catch(error => {
    const error_message = `Failed to create new auth token for user with id: ${user_id}, ERROR: ${error.message}`
    log.error(error_message)

    throw new Error(error_message)
  })

export const remove = async (token: AuthToken): Promise<void> => token.destroy()
  .then(deleted_count => deleted_count)
  .catch(error => {
    const error_message = `Failed to delete auth token with id: ${token.id}, ERROR: ${error.message}`
    log.error(error_message)

    throw new Error(error_message)
  })