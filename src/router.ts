import express, { NextFunction, Request, Response } from 'express'
import { log } from './logger'
import db from '../database/surrealdb'
import { user, UserModel } from '../database/entity/user.model'

export default express.Router()
  .get('', async (req: Request, res: Response, next: NextFunction) => {
      const user_data = new UserModel();

    const saved = await db.create('user', user_data)
    const fetched = await db.select('user')
    res.send(fetched)
    // res.send({test_response: 'test response'})
  })
// .use('/auth', AuthRouter)
// .use('/users', UsersRouter)
// .use('/dv', DailyVerseRouter)
// .use('/messages', MessagesRouter)
// .use('/subscriptions', SubscriptionsRouter)
// .use('/media', MediaRouter)
