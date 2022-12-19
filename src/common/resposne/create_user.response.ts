import {UserDTO} from '../dto/user.dto'

export class CreateUserRS {
  constructor(
    public user: UserDTO
  ) {
  }
}