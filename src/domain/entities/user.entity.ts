export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public roles: { id: string; name: string }[],
    public password?: string,
    public imgUrl?: string
  ) {}
}
