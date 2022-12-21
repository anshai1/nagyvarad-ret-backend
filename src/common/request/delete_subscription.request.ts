import { SubscriptionType } from '../types/subscription_type'

export class DeleteSubscriptionRQ {
  constructor(
    public email: string,
    public types_to_unsubscribe_from: Array<SubscriptionType>
  ) {
  }
}