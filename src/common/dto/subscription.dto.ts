import { Subscription } from '../../../database/models/subscription.model'

export class SubscriptionDTO {
  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public email: string,
    public circular_letter: boolean,
    public magazine: boolean
  ) {}

  public static from_subscription(subscription: Subscription): SubscriptionDTO {
    return {
     id: subscription.id,
     first_name: subscription.first_name,
     last_name: subscription.last_name,
     email: subscription.email,
     circular_letter: subscription.circular_letter,
     magazine: subscription.magazine
    }
  }
}
