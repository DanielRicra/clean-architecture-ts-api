export class SignInUserDTO {
  private constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, SignInUserDTO?] {
    const { email, password } = object;

    if (!email) return ["Missing email"];
    if (!password) return ["Missing password"];
    if (typeof email !== "string") return ["Email must be an string"];
    if (typeof password !== "string") return ["Password must be an string"];

    return [undefined, new SignInUserDTO(email, password)];
  }
}
