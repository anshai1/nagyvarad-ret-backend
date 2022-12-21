import { SubscriptionDTO } from '../dto/subscription.dto'

export class CreateSubscriptionRQ {
  constructor(
    public subscription: SubscriptionDTO
  ) {
  }
}
