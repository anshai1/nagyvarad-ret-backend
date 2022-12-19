import express, {NextFunction, Request, Response} from 'express'
import AuthRouter from './modules/auth/auth.router'

export default express.Router()
.use('/auth', AuthRouter)
// .use('/users', UsersRouter)
// .use('/dv', DailyVerseRouter)
// .use('/messages', MessagesRouter)
// .use('/subscriptions', SubscriptionsRouter)
// .use('/media', MediaRouter)
