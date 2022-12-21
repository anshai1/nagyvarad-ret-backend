import { SubscriptionDTO } from '../dto/subscription.dto'

export class GetAllSubscriptionsRS {
  constructor(
    public subscriptions: Array<SubscriptionDTO>
  ) {}
}