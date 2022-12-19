import {isNone} from 'fp-ts/Option';
import {isSome, Option} from 'fp-ts/Option';
import {CreateUserRQ} from '../../common/request/create_user.request'
import {ApiResponse} from '../../common/api_response'
import {User} from '../../../database/models/user'
import * as UR from '../../../database/repository/user.repository'
import {ApiError} from '../../common/api_error'
import * as BCRYPT from '../../common/util/bcrypt.util'

export async function saveUser(request: CreateUserRQ): Promise<ApiResponse<CreateUserRQ>> {
  const userByUsername: Option<User> = await UR.find_by_username(request.username);
  if (isSome(userByUsername)) {
    const error = new ApiError('USERNAME_ALREADY_EXISTS', 'The username entered already exists');
    return ApiResponse.for_failure([error]);
  }

  const encryptedPassword = BCRYPT.encrypt(request.password);
  const user: User = User.build({
    ...request,
    password: encryptedPassword
  });

  return UsersRepository.save_user(user)
    .then(res => {
      return ApiResponse.forSuccess(res);
    })
    .catch(err => {
      const error = new ApiError(FAILED_TO_SAVE_USER, err);
      return ApiResponse.forFailure<NewUserResponse>([error]);
    });
}

export async function getAllUsers(): Promise<ApiResponse<GetAllUsersResponse>> {
  return UsersRepository.find_all()
    .then(res => {
      const users = res.map((user: User) => userModelToPartial(user));
      const responseData = new GetAllUsersResponse(users);

      return ApiResponse.forSuccess(responseData);
    })
    .catch(err => {
      const error = new ApiError(FAILED_TO_FETCH_USERS, err);
      return ApiResponse.forFailure<GetAllUsersResponse>([error]);
    });
}

export async function updateUser(request: UpdateUserRequest): Promise<ApiResponse<UpdateUserResponse>> {
  let user = await UsersRepository.find_by_user_id(request.id);
  if (!user) return ApiResponse.forFailure<UpdateUserResponse>([new ApiError(FAILED_TO_UPDATE_USER, 'Failed to update user, user does not exist')]);

  const {id, password, ...updateData} = request;

  return User.update({...updateData}, {
      where: {
        id: id
      }
    })
    .then(([affectedCount]) => {
      if (!affectedCount) throw new Error(FAILED_TO_UPDATE_USER);

      const responseData: UpdateUserResponse = userModelToPartial({id, ...updateData});
      return ApiResponse.forSuccess<UpdateUserResponse>(responseData);
    })
    .catch(exception => {
      const error = new ApiError(FAILED_TO_UPDATE_USER, exception);
      return ApiResponse.forFailure<UpdateUserResponse>([error]);
    });
}

export async function deleteUser(userId: number): Promise<ApiResponse<DeleteUserReponse>> {
  const user = await UsersRepository.find_by_user_id(userId);
  if (isNone(user)) return ApiResponse.forFailure([new ApiError(FAILED_TO_DELETE_USER, 'Failed to delete user, user does not exist')]);

  deleteAuthTokenForUser(user.value.id);

  return UsersRepository.delete_user(user.value)
    .then(result => {
      const responseData = new DeleteUserReponse(true, userId);
      return ApiResponse.forSuccess<DeleteUserReponse>(responseData);
    })
    .catch(exception => {
      const error = new ApiError(FAILED_TO_DELETE_USER, exception);
      return ApiResponse.forFailure<DeleteUserReponse>([error]);
    });
}

function userModelToPartial(user: any): Partial<User> {
  return {
    id: user?.id,
    firstName: user?.firstName,
    lastName: user?.lastName,
    username: user?.username,
  }
}

async function deleteAuthTokenForUser(userId: number) {
  const token = await tokenRepository.find_by_user_id(userId);
  if (isNone(token)) {
    logger.log({
      level: 'info',
      message: `NO auth token was found for user with ID: ${userId}`
    });
  } else {
    await token.value.destroy();
  }
}
