import { UserDTO } from '../dto/user.dto'

export class GetAllUsersRS {
  constructor(
    public users: Array<UserDTO>
  ) {
  }
}