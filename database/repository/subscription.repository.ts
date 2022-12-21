import { isSome, Option } from 'fp-ts/Option'
import { fromNullable } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/function'
import { log } from '../../src/logger'
import { Subscription } from '../models/subscription.model'

// TODO: implement a mail that will be sent for every new subscriber, with a welcome message or something like that
// TODO: implement a mail that will be sent for every unsubscriber
export const save = async (subscription: Subscription): Promise<Subscription> =>
  subscription.save()
    .then(subscription => subscription)
    .catch(error => {
      const error_message = `Failed to save subscription with id: ${subscription.id}, ERROR: ${error}`
      log.error(error_message)

      throw new Error(error_message)
    })

export const remove = async (subscription: Subscription) =>
  subscription.destroy()
    .then(deleted => deleted)
    .catch(error => {
      const error_message = `Failed to save subscription with id: ${subscription.id}, ERROR: ${error}`
      log.error(error_message)

      throw new Error(error_message)
    })

export const remove_by_email = async (email: string): Promise<void> => {
  const sub: Option<Subscription> = await find_by_email(email)

  if (isSome(sub)) {
    await remove(sub.value)
  } else {
    log.log({
      level: 'info',
      message: `No subscription found with email: ${email}`
    })
  }
}

export const find_by_email = async (email: string): Promise<Option<Subscription>> =>
  pipe(
    await Subscription.findOne({
      where: {email: email}
    }),
    fromNullable
  )

export const find_all = async (): Promise<Array<Subscription>> =>
  Subscription.findAll()
    .then(subscriptions => subscriptions)
    .catch(error => {
      const error_message = `Failed to fetch subscriptions, ERROR: ${error}`
      log.error(error_message)

      throw new Error(error_message)
    })
