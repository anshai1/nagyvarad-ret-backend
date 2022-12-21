export class ApiError extends Error {
  constructor(
    private error_code: string,
    private error_message: string) {
    super(error_message)
  }
}
