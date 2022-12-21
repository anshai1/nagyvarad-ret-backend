import * as express from 'express'
import * as AuthController from './auth.controller'

export default express.Router()
  .post('/logIn', (req: express.Request, res: express.Response) => AuthController.log_in(req, res))
  .post('/logOut', (req: express.Request, res: express.Response) => AuthController.log_out(req, res))