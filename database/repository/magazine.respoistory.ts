import { Magazine } from '../models/magazine.model'
import { log } from '../../src/logger'

export function save(magazine: Magazine): Promise<Magazine> {
  return magazine.save()
    .then(magazine => magazine)
    .catch(error => {
      const error_message = `Failed to save magazine (kurtszo) data, ERROR: ${error}`
      log.error(error_message)

      throw new Error(error_message)
    })
}

export function find_all(): Promise<Array<Magazine>> {
  return Magazine.findAll()
    .then(magazines => magazines)
    .catch(error => {
      const error_message = `Failed to fetch magazines, ERROR: ${error}`
      log.error(error_message)

      throw new Error(error_message)
    })
}

export function remove(magazine: Magazine): Promise<void> {
 return magazine.destroy()
   .then(deleted => deleted)
   .catch(error => {
     const error_message = `Failed to delete magazine with id: ${magazine.id}, ERROR: ${error}`
     log.error(error_message)

     throw new Error(error_message)
   })
}