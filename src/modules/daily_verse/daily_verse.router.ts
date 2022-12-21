import express, { NextFunction, Request, Response } from 'express'
import * as DVC from './daily_verse.controller'
import { authorize_request } from '../auth/auth.service'

export default express.Router()
  .get('', (req: Request, res: Response, next: NextFunction) => {
    return DVC.get_dv_by_date(req, res, next)
  })
  .get('/getAll', (req: Request, res: Response) =>{
   return DVC.get_all(req, res)
  })
