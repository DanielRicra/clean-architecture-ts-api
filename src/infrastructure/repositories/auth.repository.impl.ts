import {
  AuthDatasource,
  AuthRepository,
  SignUpUserDTO,
  UserEntity,
} from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {}

  signUp(signUpUserDTO: SignUpUserDTO): Promise<UserEntity> {
    return this.authDatasource.signUp(signUpUserDTO);
  }
}
