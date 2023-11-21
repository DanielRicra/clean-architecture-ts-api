import { Validators } from "../../../config";

export class SignUpUserDTO {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, SignUpUserDTO?] {
    const { name, email, password } = object;

    if (!name) return ["Missing name"];
    if (!email) return ["Missing email"];
    if (!password) return ["Missing password"];
    if (typeof name !== "string") return ["Name must a string"];
    if (typeof email !== "string") return ["Email must a string"];
    if (typeof password !== "string") return ["Password must a string"];
    if (!Validators.email.test(email)) return ["Email is not valid"];
    if (password.length < 6)
      return ["Password must be greater than 6 characters"];

    return [undefined, new SignUpUserDTO(name, email.toLowerCase(), password)];
  }
}
