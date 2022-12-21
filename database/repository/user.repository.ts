import {User} from '../models/user'
import {fromNullable, Option} from 'fp-ts/Option'
import {log} from '../../src/logger'

export const find_all = async (): Promise<Array<User>> => User.findAll()
  .then(users => users)
  .catch(error => {
    const error_message = `Failed to fetch users, ERROR: ${error.message}`
    log.error(error_message)

    throw new Error(error_message)
  })

export const save = async (user: User): Promise<User> => user.save()
  .then(user => user)
  .catch(error => {
    const error_message = `Failed to save user with name: ${user.username}, ERROR: ${error.message}`
    log.error(error_message)

    throw new Error(error_message)
  })

export const remove = async (user: User): Promise<number> => User.destroy({where: {id: user.id}})
  .then(deleted_count => deleted_count)
  .catch(error => {
    const error_message = `Failed to delete user with ID: ${user.id}, ERROR: ${error.message}`
    log.error(error_message)

    throw new Error(error_message)
  })

export const find_by_username = async (username: string): Promise<Option<User>> => User.findOne({where: {username: username}})
  .then(user => fromNullable(user))
  .catch(error => {
    const error_message = `Failed to find user by name: ${username}, ERROR: ${error.message}`
    log.error(error_message)

    throw new Error(error_message)
  })

export const find_by_id = async (id: number): Promise<Option<User>> => User.findByPk(id)
  .then(user => fromNullable(user))
  .catch(error => {
    const error_message = `Failed to find user by id: ${id}, ERROR: ${error.message}`
    log.error(error_message)

    throw new Error(error_message)
  })