import prisma from "../../data/sqlite/sqlite-database";
import {
  AuthDatasource,
  CustomError,
  SignUpUserDTO,
  UserEntity,
} from "../../domain";

export class AuthDataSourceImpl implements AuthDatasource {
  async signUp(signUpUserDTO: SignUpUserDTO): Promise<UserEntity> {
    const { email, name, password } = signUpUserDTO;

    try {
      const existsUser = await prisma.user.findFirst({ where: { email } });

      if (existsUser) throw CustomError.badRequest("Email already taken");

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
          roles: {
            connect: {
              name: "USER",
            },
          },
        },
        include: {
          roles: true,
        },
      });

      return new UserEntity(user.id, name, email, password, user.roles);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServerError();
    }
  }
}
