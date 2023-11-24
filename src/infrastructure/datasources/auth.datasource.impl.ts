import { BcryptAdapter } from "../../config";
import prisma from "../../data/sqlite/sqlite-database";
import {
  AuthDatasource,
  CustomError,
  SignInUserDTO,
  SignUpUserDTO,
  UserEntity,
} from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDataSourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async signIn(signInUserDTO: SignInUserDTO): Promise<UserEntity> {
    const { email, password } = signInUserDTO;

    try {
      const user = await prisma.user.findFirst({
        where: { email },
        include: {
          roles: true,
        },
      });

      if (!user) throw CustomError.badRequest("Invalid credentials");

      const isValidPassword = this.comparePassword(password, user.password);

      if (!isValidPassword) throw CustomError.badRequest("Invalid credentials");

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServerError();
    }
  }

  async signUp(signUpUserDTO: SignUpUserDTO): Promise<UserEntity> {
    const { email, name, password } = signUpUserDTO;

    try {
      const existsUser = await prisma.user.findFirst({ where: { email } });

      if (existsUser) throw CustomError.badRequest("Email already taken");

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: this.hashPassword(password),
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

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServerError();
    }
  }
}
