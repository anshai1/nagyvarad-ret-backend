export class CreateUserRQ {
  constructor(
    public username: string,
    public password: string,
    public first_name: string,
    public last_name: string,
    public middle_name: string,
  ) {
  }
}