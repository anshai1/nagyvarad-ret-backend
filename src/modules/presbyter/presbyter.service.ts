import { PresbyterDTO } from '../../common/dto/presbyter.dto'
import { Presbyter } from '../../../database/models/presbyter.model'
import * as PR from '../../../database/repository/presbyter_profile.respository'
import { CreatePresbyterRS } from '../../common/resposne/create_presbyter.response'
import { log } from '../../logger'
import { isSome } from 'fp-ts/Option'

export function create_presbyter(presbyter_dto: PresbyterDTO): Promise<CreatePresbyterRS> {
  const presbyter = Presbyter.build({
    ...presbyter_dto,
    created_at: new Date(),
    photo_path: ''
  })

  return PR.save(presbyter)
    .then(presbyter => {
      return new CreatePresbyterRS(PresbyterDTO.from_model(presbyter))
    })
    .catch(error => {
      const error_message = 'Failed to save presbyter data'
      log.log({
        level: 'error',
        message: error_message
      })
      throw new Error(error_message)
    })
}

export async function delete_presbyter_by_id(id: number): Promise<void> {
  await PR.delete_by_id(id)
}

export async function update_photo_path_for_id(id: number, photo_path: string): Promise<Presbyter> {
  const presbyter = await PR.find_by_id(id)
  if(isSome(presbyter)) {
    presbyter.value.photo_path = photo_path
    return await presbyter.value.save()
  } else {
    throw new Error('could not update photo path')
  }
}