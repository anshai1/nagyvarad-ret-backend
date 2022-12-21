import {NextFunction, Request, Response} from "express";
import MS from "./messages.service";
import {MessageDTO} from "../../common/dto/messageDTO";
import {pipe} from 'fp-ts/function';
import { Message } from '../../../database/models/message.model'
import { CreateMEssageRS } from '../../common/resposne/create_message.response'
import { ApiResponse } from '../../common/api_response'
import { ApiError } from '../../common/api_error'
import { GetAllMessagesRS } from '../../common/resposne/get_all_messages.response'

const save_message = async (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(Message.from_dto(req.body.message))
    .then(async message => await MS.save_message(message))
    .then(message => MessageDTO.fromMessage(message))
    .then(message_dto => new CreateMEssageRS(message_dto))
    .then(save_message_response =>
      res.send(ApiResponse.for_success(save_message_response)))
    .catch(err =>
      res.send(ApiResponse.for_failure(err)))

const get_all_messages = async (req: Request, res: Response, next: NextFunction) =>
  MS.get_all_messages()
    .then(messages => res.send(messages))
    .catch(error => res.send(ApiResponse.for_failure([new ApiError('UNEXPECTED_ERROR', error.message)])))

const open_message = async(req: Request, res: Response, next: NextFunction) =>
  pipe(
    req.params.id,
    id => MS.open_message(+id)
  )
    .then(message => res.send(ApiResponse.for_success(message)))
    .catch(error => res.send(ApiResponse.for_failure([new ApiError('UNEXPECTED_ERROR', error.message)])))

export default {
  save_message,
  get_all_messages,
  open_message
}
