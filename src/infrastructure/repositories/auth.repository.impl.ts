import {
  AuthDatasource,
  AuthRepository,
  SignInUserDTO,
  SignUpUserDTO,
  UserEntity,
} from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {}
  signIn(signInUserDTO: SignInUserDTO): Promise<UserEntity> {
    return this.authDatasource.signIn(signInUserDTO);
  }

  signUp(signUpUserDTO: SignUpUserDTO): Promise<UserEntity> {
    return this.authDatasource.signUp(signUpUserDTO);
  }
}
