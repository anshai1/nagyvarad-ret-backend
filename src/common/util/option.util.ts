import { isSome, Option } from 'fp-ts/Option'

export function if_present_or_else<T>(o: Option<T>, if_some: Function, if_none: Function) {
  if (isSome(o)) {
    return if_some(o.value)
  } else {
    return if_none()
  }
}
