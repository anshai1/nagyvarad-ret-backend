import express, { Request, Response } from 'express'
import mime from 'mime-types'
import { UploadedFile } from 'express-fileupload'
import { Presbyter } from '../../../database/models/presbyter.model'

export default express.Router()
  .post('/createPresbyterProfile', async (req: Request, res: Response) => {

  })
  .get('/getAllPresbyters', () => {})
  .delete('/deletePresbyterProfile', () => {})
