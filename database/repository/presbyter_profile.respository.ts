import { Presbyter } from '../models/presbyter.model'
import { log } from '../../src/logger'
import { fromNullable, isSome, Option } from 'fp-ts/Option'

export async function delete_by_id(id: number): Promise<void> {
  const presbyter = await find_by_id(id)

  if(isSome(presbyter)) {
    await presbyter.value.destroy()
  }
}


export function save(presbyter_profile: Presbyter): Promise<Presbyter> {
  return presbyter_profile.save()
    .then(presbyter => presbyter)
    .catch(error => {
      const error_message = `Failed to save presbyter profile with, ERROR: ${error}`
      log.error(error_message)

      throw new Error(error_message)
    })
}

export function find_all(): Promise<Array<Presbyter>> {
  return Presbyter.findAll()
    .then(presbyters => presbyters)
    .catch(error => {
      const error_message = `Failed to fetch presbyters, ERROR: ${error}`
      log.error(error_message)

      throw new Error(error_message)
    })
}

export function remove(presbyter: Presbyter): Promise<void> {
  return presbyter.destroy()
    .then(deleted => deleted)
    .catch(error => {
      const error_message = `failed to delete presbyter with id: ${presbyter.id}, error: ${error}`
      log.error(error_message)

      throw new error(error_message)
    })
}

export function find_by_id(id: number): Promise<Option<Presbyter>> {
  return Presbyter.findOne({
    where: {
      id: id
    }
  })
    .then(presbyter => fromNullable(presbyter))
    .catch(error => {
      const error_message = `failed to fetch presbyter by id: ${id}, error: ${error}`
      log.error(error_message)

      throw new error(error_message)
    })
}