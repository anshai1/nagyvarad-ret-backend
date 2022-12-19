import * as express from 'express'

import * as LogInController from './auth.controller'

export default express.Router()
  .post('/logIn', (req: express.Request, res: express.Response) => LogInController.log_in(req, res))
  .post('/logOut', (req: express.Request, res: express.Response) => LogInController.log_out(req, res))
