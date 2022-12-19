import {Request, Response} from "express";

const USER_ID_PARAM_KEY = 'userId';

export async function getAllUsers(req: Request, res: Response) {
  const result = await US.getAllUsers()
    .catch(exception => {
      logger.log({
        level: 'error',
        message: `Error code: ${FAILED_TO_FETCH_USERS}, ERROR: ${exception}`
      });
      const error = new ApiError(UNEXPECTED_ERROR, `${exception}`);
      return res.send(ApiResponse.forFailure([error]));
    });

  return res.send(result);
}

export async function saveUser(req: Request, res: Response) {
  const request: NewUserRequest = req.body.payload;

  const result = await UserService.saveUser(request)
    .catch(exception => {
      logger.log({
        level: 'error',
        message: `Error code: ${FAILED_TO_SAVE_USER}, ${exception}`
      });

      const error = new ApiError(UNEXPECTED_ERROR, `${exception}`);
      res.send(ApiResponse.forFailure([error]));
    });

  res.send(result);
}

export async function updateUser(req: Request, res: Response) {
  const request: UpdateUserRequest = req.body.payload;

  const result = await UserService.updateUser(request)
    .catch(exception => {
      logger.log({
        level: 'error',
        message: `Error code: ${FAILED_TO_UPDATE_USER}, ERROR: ${exception}`
      });
      const error = new ApiError(UNEXPECTED_ERROR, `${exception}`);
      return res.send(ApiResponse.forFailure([error]));
    })

  return res.send(result);
}

export async function deleteUser(req: Request, res: Response) {
  const userId: number = +req.params[USER_ID_PARAM_KEY];

  const result = await UserService.deleteUser(userId)
    .catch(exception => {
      logger.log({
        level: 'error',
        message: `Error code: ${FAILED_TO_DELETE_USER}, ERROR: ${exception}`
      });
      const error = new ApiError(UNEXPECTED_ERROR, `${exception}`);
      return res.send(ApiResponse.forFailure([error]));
    });

  return res.send(result);
}
