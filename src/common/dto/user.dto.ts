import { User } from '../../../database/models/user'

export class UserDTO {
  constructor(
    public first_name: string,
    public last_name: string,
    public middle_name: string,
    public username: string,
    public email: string,
    public password?: string,

  ) {}

  public static from_user(user: User): UserDTO {
   return new UserDTO(
     user.first_name,
     user.last_name,
     user.middle_name,
     user.username,
     user.email
   )
  }
}