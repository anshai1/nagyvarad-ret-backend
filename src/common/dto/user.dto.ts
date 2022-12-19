export class UserDTO {
  constructor(
    public first_name: string,
    public last_name: string,
    public middle_name: string,
    public username: string,
    public password?: string,
  ) {
  }
}