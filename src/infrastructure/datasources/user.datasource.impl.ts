import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import prisma from "../../data/sqlite/sqlite-database";
import { CustomError, UserDatasource, UserEntity } from "../../domain";
import { UpdateUserDTO } from "../../domain/dtos/user/update-user.dto";
import { UserMapper } from "../mappers/user.mapper";

export class UserDatasourceImpl implements UserDatasource {
  async getUsers(): Promise<UserEntity[]> {
    try {
      const users = await prisma.user.findMany({ include: { roles: true } });

      return users.map((user) => UserMapper.userEntityFromObject(user));
    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw CustomError.internalServerError();
    }
  }

  async getUser(id: string): Promise<UserEntity> {
    try {
      const user = await prisma.user.findFirst({
        where: { id },
        include: { roles: true },
      });

      if (!user) throw CustomError.notFound("User not found");

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw CustomError.internalServerError();
    }
  }

  async updateUser(
    id: string,
    updateUserDTO: UpdateUserDTO
  ): Promise<UserEntity> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: updateUserDTO,
        include: { roles: true },
      });

      return UserMapper.userEntityFromObject(updatedUser);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw CustomError.notFound("User not found");
        }
      }

      throw CustomError.internalServerError();
    }
  }
}
