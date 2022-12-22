import { Request, Response } from 'express'
import { Presbyter } from '../../../database/models/presbyter.model'
import mime from 'mime-types'
import * as PS from './presbyter.service'
import { PresbyterDTO } from '../../common/dto/presbyter.dto'
import { CreatePresbyterRS } from '../../common/resposne/create_presbyter.response'

export async function create_presbyter_profile(req: Request, res: Response): Promise<Response> {
  PS.create_presbyter(req.body)
    .then(saved => {
      // @ts-ignore
      const photo_path = `presbyter_photos/p_${saved.presbyter.id}.${mime.extension(req.files?.photo.mimetype)}`
      // @ts-ignore
      req.files.photo.mv(`static/${photo_path}`)
      return {saved, photo_path}
    })
    .then(async data => {
      const updated = await PS.update_photo_path_for_id(data.saved.presbyter.id, data.photo_path)
      return PresbyterDTO.from_model(updated)
    })
    .then(presbyter_dto => new CreatePresbyterRS(presbyter_dto))
}

export async function remove_presbyter_profile(req: Request, res: Response): Promise<Response> {

}

export async function get_all_presbyters(req: Request, res: Response): Promise<Response> {

}