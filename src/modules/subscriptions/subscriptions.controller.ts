import {NextFunction, Request, Response} from 'express';
import * as SubscriptionService from '../subscriptions/subscriptions.service';
import {
  ADD_SUBSCRIPTION_RQ,
  ADD_SUBSCRIPTION_RS,
  REMOVE_SUBSCRIPTION_RQ,
  REMOVE_SUBSCRIPTION_RS
} from './subscriptions.router';
import { ApiResponse } from '../../common/api_response'
import { ApiError } from '../../common/api_error'

export function create_subscription(
  req: Request<any, ADD_SUBSCRIPTION_RS, ADD_SUBSCRIPTION_RQ>,
  res: Response<ADD_SUBSCRIPTION_RS>,
  next: NextFunction) {
  SubscriptionService.add_subscription(req.body)
    .then(result => res.send(ApiResponse.for_success(result)))
    .catch(err => res.send(ApiResponse.for_failure(err)))
}

export function remove(
  req: Request<any, REMOVE_SUBSCRIPTION_RS, REMOVE_SUBSCRIPTION_RQ>,
  res: Response<REMOVE_SUBSCRIPTION_RS>,
  next: NextFunction) {
  SubscriptionService.remove_subscription(req.body)
    .then(result => res.send(ApiResponse.for_success(result)))
    .catch(err => res.send(ApiResponse.for_failure(err)))
}

export function get_all(req: Request, res: Response) {
  SubscriptionService.get_all_subscriptions()
    .then(get_all_subs_rs => res.send(ApiResponse.for_success(get_all_subs_rs)))
    .catch(error => res.send(ApiResponse.for_failure([new ApiError('UNEXPECTED_ERROR', error.message)])))
}
