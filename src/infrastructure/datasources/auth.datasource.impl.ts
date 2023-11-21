import {
  AuthDatasource,
  CustomError,
  SignUpUserDTO,
  UserEntity,
} from "../../domain";

export class AuthDataSourceImpl implements AuthDatasource {
  signUp(signUpUserDTO: SignUpUserDTO): Promise<UserEntity> {
    const { email, name, password } = signUpUserDTO;

    try {
      return Promise.resolve(
        new UserEntity("12se", name, email, password, ["ADMIN"])
      );
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServerError();
    }
  }
}
