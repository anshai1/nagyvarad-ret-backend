import * as jwt from 'jsonwebtoken'

const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || 'qFqws2_3-2!!-a07'

export const sign = (body: any): string =>
  jwt.sign(body, PRIVATE_KEY)

export function verify(token: string): string {
  try {
    const decoded = jwt.verify(token, PRIVATE_KEY);
    return <string>decoded;
  } catch (err) {
    return '';
  }
}
