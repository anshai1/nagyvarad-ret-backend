import { isNone } from 'fp-ts/Option'
import { isSome, Option } from 'fp-ts/Option'
import { CreateUserRQ } from '../../common/request/create_user.request'
import { ApiResponse } from '../../common/api_response'
import { User } from '../../../database/models/user'
import * as UR from '../../../database/repository/user.repository'
import * as TR from '../../../database/repository/auth_token.repository'
import { ApiError } from '../../common/api_error'
import * as BCRYPT from '../../common/util/bcrypt.util'
import { CreateUserRS } from '../../common/resposne/create_user.response'
import { log } from '../../logger'
import { GetAllUsersRS } from '../../common/resposne/get_all_users.response'
import { UserDTO } from '../../common/dto/user.dto'
import { DeleteUserRS } from '../../common/resposne/delete_user.response'

export async function create_user(request: CreateUserRQ): Promise<CreateUserRS> {
  const user_by_username: Option<User> = await UR.find_by_username(request.username)
  if (isSome(user_by_username)) {
    throw new ApiError('USERNAME_ALREADY_EXISTS', 'The username entered already exists')
  }

  const encrypted_password = BCRYPT.encrypt(request.password)
  const user: User = User.build({
    ...request,
    password: encrypted_password
  })

  return UR.save(user)
    .then(saved_user => {
      const response: CreateUserRS = new CreateUserRS(UserDTO.from_user(saved_user))
      return response
    })
    .catch(err => {
      throw new ApiError('FAILED_TO_SAVE_USER', err)
    })
}

export async function get_all_users(): Promise<GetAllUsersRS> {
  return UR.find_all()
    .then(users => {
      const user_dto_list: Array<UserDTO> = users.map((user: User) => user_to_dto(user))
      return new GetAllUsersRS(user_dto_list)
    })
    .catch(error => {
      throw new ApiError('FAILED_TO_FETCH_USERS', error.message)
    })
}

function user_to_dto(user: User): UserDTO {
  const { password, ...rest } = user
  return rest
}

export async function delete_user(user_id: number): Promise<ApiResponse<DeleteUserRS>> {
  const user = await UR.find_by_id(user_id)
  if (isNone(user)) {
    const api_error = new ApiError('FAILED_TO_DELETE_USER', 'Failed to delete user, user does not exist')
    return ApiResponse.for_failure([api_error])
  }

 delete_auth_token_fur_user(user.value.id)

  return UR.remove(user.value)
    .then(deleted_count => {
      const payload = new DeleteUserRS(deleted_count, user_id)
      return ApiResponse.for_success(payload)
    })
    .catch(error => {
      const api_error = new ApiError('FAILED_TO_DELETE_USER', error)
      return ApiResponse.for_failure([api_error])
    })
}

async function delete_auth_token_fur_user(user_id: number) {
  const token = await TR.find_by_user_id(user_id)
  if (isNone(token)) {
    log.log({
      level: 'info',
      message: `NO auth token was found for user with ID: ${user_id}`
    })
  } else {
    log.log({
      level: 'info',
      message: `Deleting auth token for user id: ${user_id}`
    })
    await TR.remove(token.value)
  }
}

// TODO: implement update
// export async function updateUser(request: UpdateUserRequest): Promise<ApiResponse<UpdateUserResponse>> {
//   let user = await UsersRepository.find_by_user_id(request.id)
//   if (!user) return ApiResponse.forFailure<UpdateUserResponse>([new ApiError(FAILED_TO_UPDATE_USER, 'Failed to update user, user does not exist')])
//
//   const {id, password, ...updateData} = request
//
//   return User.update({...updateData}, {
//     where: {
//       id: id
//     }
//   })
//     .then(([affectedCount]) => {
//       if (!affectedCount) throw new Error(FAILED_TO_UPDATE_USER)
//
//       const responseData: UpdateUserResponse = userModelToPartial({id, ...updateData})
//       return ApiResponse.forSuccess<UpdateUserResponse>(responseData)
//     })
//     .catch(exception => {
//       const error = new ApiError(FAILED_TO_UPDATE_USER, exception)
//       return ApiResponse.forFailure<UpdateUserResponse>([error])
//     })
// }


