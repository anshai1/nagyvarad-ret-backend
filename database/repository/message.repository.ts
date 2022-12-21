import { Message } from '../models/message.model'
import { log } from '../../src/logger'

const save = (message: Message): Promise<Message> =>
  message.save()
    .then(message => message)
    .catch(error => {
      const error_message = `Failed to save message: ${message.message}, ERROR: ${error}`
      log.error(error_message)

      throw new Error(error_message)
    })

const find_all = (): Promise<Array<Message>> =>
  Message.findAll()
    .then(messages => messages)
    .catch(error => {
      const error_message = `Failed fetch messages, ERROR: ${error}`
      log.error(error_message)

      throw new Error(error_message)
    })

export default {
  save,
  find_all
}
