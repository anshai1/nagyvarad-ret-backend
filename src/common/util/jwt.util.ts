import * as jwt from 'jsonwebtoken'
import {pipe} from 'fp-ts/function'
import {fromNullable, tryCatch} from 'fp-ts/Option'

// TODO: move this to .env file
const PRIVATE_KEY = 'PRIVATE_KEY_590318'

export const sign = (body: any): string =>
  jwt.sign(body, PRIVATE_KEY)

export function verify(token: string): boolean {
  try {
    const decoded = jwt.verify(token, PRIVATE_KEY);
    return true;
  } catch (err) {
    return false;
  }
}
