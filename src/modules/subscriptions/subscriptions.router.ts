import express, { NextFunction, Request, Response } from 'express'
import * as SC from '../subscriptions/subscriptions.controller'
import { ApiResponse } from '../../common/api_response'
import { CreateSubscriptionRQ } from '../../common/request/create_subscription.request'
import { CreateSubscriptionRS } from '../../common/resposne/create_subscription.response'
import { DeleteSubscriptionRQ } from '../../common/request/delete_subscription.request'
import { DeleteSubscriptionRS } from '../../common/resposne/delete_subscription.response'

export type ADD_SUBSCRIPTION_RQ = CreateSubscriptionRQ
export type ADD_SUBSCRIPTION_RS = ApiResponse<CreateSubscriptionRS>

export type REMOVE_SUBSCRIPTION_RQ = DeleteSubscriptionRQ
export type REMOVE_SUBSCRIPTION_RS = ApiResponse<DeleteSubscriptionRS>

export default express.Router()
  .post('/createSubscription', (
    req: Request<any, ADD_SUBSCRIPTION_RS, ADD_SUBSCRIPTION_RQ, {}>,
    res: Response<ADD_SUBSCRIPTION_RS, any>,
    next: NextFunction) =>
    SC.create_subscription(req, res, next))
  .post('/removeSubscription', (
    req: Request<any, REMOVE_SUBSCRIPTION_RS, REMOVE_SUBSCRIPTION_RQ, {}>,
    res: Response<REMOVE_SUBSCRIPTION_RS, any>,
    next: NextFunction) =>
    SC.remove(req, res, next))
  // TODO: should be authorized
  .get('/getAllSubscriptions', (req: Request, res: Response) => SC.get_all(req, res))

