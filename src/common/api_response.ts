import {ApiError} from './api_error'

export class ApiResponse<T> {
  constructor(
    public errors: ApiError[],
    public payload: T | null) {}

  public static for_success<T>(payload: T, errors: ApiError[] = []) {
    return new ApiResponse<T>(errors, payload);
  }

  public static for_failure<T>(errors: ApiError[], payload = null) {
    return new ApiResponse<T>(errors, payload);
  }
}