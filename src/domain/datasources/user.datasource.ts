import { UpdateUserDTO } from "../dtos/user/update-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UserDatasource {
  abstract getUsers(): Promise<UserEntity[]>;
  abstract getUser(id: string): Promise<UserEntity>;
  abstract updateUser(updateUserDTO: UpdateUserDTO): Promise<UserEntity>;
}
