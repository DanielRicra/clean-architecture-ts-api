import { SignUpUserDTO } from "../dtos/auth/signup-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDatasource {
  // TODO: abstract signIn(): any;
  abstract signUp(signUpUserDTO: SignUpUserDTO): Promise<UserEntity>;
}
