import { isSome, Option } from 'fp-ts/Option'
import { SubscriptionDTO } from '../../common/dto/subscription.dto'
import { SubscriptionType as ST } from '../../common/types/subscription_type'
import { Subscription } from '../../../database/models/subscription.model'
import { DeleteSubscriptionRQ } from '../../common/request/delete_subscription.request'
import { DeleteSubscriptionRS } from '../../common/resposne/delete_subscription.response'
import * as SR from '../../../database/repository/subscription.repository'
import { CreateSubscriptionRQ } from '../../common/request/create_subscription.request'
import { CreateSubscriptionRS } from '../../common/resposne/create_subscription.response'
import { GetAllSubscriptionsRS } from '../../common/resposne/get_all_subscriptions.response'
import { if_present_or_else } from '../../common/util/option.util'

export async function remove_subscription(request: DeleteSubscriptionRQ): Promise<DeleteSubscriptionRS> {
  const subscription: Option<Subscription> = await SR.find_by_email(request.email)

  if_present_or_else(
    subscription,
    (sub: Subscription) => {
      const update_params: Partial<SubscriptionDTO> = {}

      if (request.types_to_unsubscribe_from.includes(ST.CIRCULAR)) update_params.circular_letter = false
      if (request.types_to_unsubscribe_from.includes(ST.MAGAZINE)) update_params.magazine = false

      sub.update({...update_params})
    },
    () => {
    }
  )

  return new DeleteSubscriptionRS(true)
}

export async function add_subscription(request: CreateSubscriptionRQ): Promise<CreateSubscriptionRS> {
  const existing_subscription: Option<Subscription> = await SR.find_by_email(request.subscription.email)

  let result_subscription
  if (isSome(existing_subscription)) {
    result_subscription = await existing_subscription.value.update({
      first_name: request.subscription.first_name,
      last_name: request.subscription.last_name,
      magazine: request.subscription.magazine,
      circular_letter: request.subscription.circular_letter
    })
  } else {
    const new_subscription = Subscription.from_dto(request.subscription)
    result_subscription = await SR.save(new_subscription)
  }

  return new CreateSubscriptionRS(result_subscription)
}

export async function get_all_subscriptions(): Promise<GetAllSubscriptionsRS> {
  const subscriptions: Array<Subscription> = await SR.find_all()
  return {subscriptions: subscriptions.map(subscription => SubscriptionDTO.from_subscription(subscription))}
}
