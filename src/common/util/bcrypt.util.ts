import * as bcrypt from 'bcrypt'

const SALT_ROUNDS = 2

export const encrypt = (password: string): string =>
  bcrypt.hashSync(password, SALT_ROUNDS)

export const verify = (password: string, hash: string): boolean =>
  bcrypt.compareSync(password, hash)
