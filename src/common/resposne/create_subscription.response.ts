import { SubscriptionDTO } from '../dto/subscription.dto'

export class CreateSubscriptionRS {
  constructor(
    public subscription: SubscriptionDTO
  ) {
  }
}