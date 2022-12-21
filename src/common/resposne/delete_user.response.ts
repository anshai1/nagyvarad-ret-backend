export class DeleteUserRS {
  constructor(
    public deleted_count: number,
    public deleted_user_id: number
  ) {
  }
}