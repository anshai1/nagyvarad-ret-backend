import * as US from './user.service'
import { log } from '../../logger'
import { ApiError } from '../../common/api_error'
import { ApiResponse } from '../../common/api_response'
import { CreateUserRQ } from '../../common/request/create_user.request'
import { CreateUserRS } from '../../common/resposne/create_user.response'
import { GetAllUsersRS } from '../../common/resposne/get_all_users.response'
import {
  CREATE_USER_RQ,
  CREATE_USER_RS,
  DELETE_USER_RQ,
  DELETE_USER_RS,
  GET_ALL_USERS_RQ,
  GET_ALL_USERS_RS
} from './user.router'

export async function get_all_users(req: GET_ALL_USERS_RQ, res: GET_ALL_USERS_RS): Promise<GET_ALL_USERS_RS> {
  return US.get_all_users()
    .then((get_all_users_rs: GetAllUsersRS) => {
      const response: ApiResponse<GetAllUsersRS> = ApiResponse.for_success(get_all_users_rs)

      return res
        .status(200)
        .send(response)
    })
    .catch((error: Error) => {
      log.log({
        level: 'error',
        message: `Error code: FAILED_TO_FETCH_USERS, ERROR: ${error.message}`
      })
      const api_error: ApiError = new ApiError('FAILED_TO_FETCH_USERS', `${error.message}`)
      const response: ApiResponse<null> = ApiResponse.for_failure([api_error])

      return res
        .status(200)
        .send(response)
    })
}

export async function create_user(req: CREATE_USER_RQ, res: CREATE_USER_RS): Promise<CREATE_USER_RS> {
  const request: CreateUserRQ = req.body

  return US.create_user(request)
    .then((create_user_rs: CreateUserRS) => {
      const response: ApiResponse<CreateUserRS> = ApiResponse.for_success(create_user_rs)

      return res
        .status(200)
        .send(response)
    })
    .catch((error: Error) => {
      log.log({
        level: 'error',
        message: `Error code: FAILED_TO_SAVE_USER, ${error}`
      })

      const api_error: ApiError = new ApiError('FAILED_TO_SAVE_USER', `${error.message}`)
      const response: ApiResponse<null> = ApiResponse.for_failure([api_error])

      return res
        .status(200)
        .send(response)
    })
}


export async function delete_user(req: DELETE_USER_RQ, res: DELETE_USER_RS): Promise<DELETE_USER_RS> {
  const user_id: number = +req.params.user_id

  return US.delete_user(user_id)
    .then(delete_user_rs => {
      const response = ApiResponse.for_success(delete_user_rs)

      return res
        .status(200)
        .send(response)
    })
    .catch(error => {
      log.log({
        level: 'error',
        message: `Error code: FAILED_TO_DELETE_USER, ERROR: ${error.message}`
      })

      const api_error = new ApiError('UNEXPECTED_ERROR', `${error.message}`)
      const response = ApiResponse.for_failure([api_error], null)

      return res
        .status(200)
        // TODO: remove this
        // @ts-ignore
        .send(response)
    })
}

// TODO: implement update
// export async function updateUser(req: Request, res: Response) {
//   const request: UpdateUserRequest = req.body.payload;
//
//   const result = await UserService.updateUser(request)
//     .catch(exception => {
//       logger.log({
//         level: 'error',
//         message: `Error code: ${FAILED_TO_UPDATE_USER}, ERROR: ${exception}`
//       });
//       const error = new ApiError(UNEXPECTED_ERROR, `${exception}`);
//       return res.send(ApiResponse.forFailure([error]));
//     })
//
//   return res.send(result);
// }
