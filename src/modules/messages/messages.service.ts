import { Option } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { fromNullable } from 'fp-ts/lib/Option'
import { Message } from '../../../database/models/message.model'
import MR from '../../../database/repository/message.repository'
import { GetAllMessagesRS } from '../../common/resposne/get_all_messages.response'

const save_message = async (message: Message): Promise<Message> => {
  return MR.save(message)
}

const get_all_messages = async (): Promise<GetAllMessagesRS> =>
  pipe(
    await MR.find_all(),
    messages => new GetAllMessagesRS(messages)
  )

const open_message = async (id: number): Promise<Message> => {
  const message = await Message.findByPk(id)
  if (!message) {
    throw  new Error(`Cannot find message with id: ${id}`)
  }

  const updated = await message?.update({
    opened: true
  })

  return updated
}

export default {
  save_message,
  get_all_messages,
  open_message
}
