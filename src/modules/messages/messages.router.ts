import express, {NextFunction, Request, Response} from "express";
import MC from "./messages.controller";
import {authorize_request} from '../auth/auth.service';

export default express.Router()
  .post('/createMessage', (req: Request, res: Response, next: NextFunction) => MC.save_message(req, res, next))
  .get('/getAllMessages', (req: Request, res: Response, next: NextFunction) => {
    return MC.get_all_messages(req, res, next)
  })
  .get('/open/:id',  (req: Request, res: Response, next: NextFunction) => {
    return MC.open_message(req, res, next)
  })
