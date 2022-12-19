export class AuthTokenDTO {
  constructor(
    public user_id: number,
    public token: string
  ) {}
}