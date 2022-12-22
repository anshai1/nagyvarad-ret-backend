import express, { NextFunction, Request, Response } from 'express'
import AuthRouter from './modules/auth/auth.router'
import UsersRouter from './modules/user/user.router'
import DailyVerseRouter from './modules/daily_verse/daily_verse.router'
import MessagesRouter from './modules/messages/messages.router'
import SubscriptionsRouter from './modules/subscriptions/subscriptions.router'
import MediaRouter from './modules/media/media.router'
import PresbyterRouter from './modules/presbyter/presbyter.router'

export default express.Router()
  .use('/auth', AuthRouter)
  .use('/users', UsersRouter)
  .use('/dailyVerse', DailyVerseRouter)
  .use('/messages', MessagesRouter)
  .use('/subscriptions', SubscriptionsRouter)
  .use('/media', MediaRouter)
  .use('/presbyter', PresbyterRouter)
