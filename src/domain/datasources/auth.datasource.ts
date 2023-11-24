import { SignInUserDTO } from "../dtos/auth/signin-user.dto";
import { SignUpUserDTO } from "../dtos/auth/signup-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDatasource {
  abstract signIn(signInUserDTO: SignInUserDTO): Promise<UserEntity>;
  abstract signUp(signUpUserDTO: SignUpUserDTO): Promise<UserEntity>;
}
