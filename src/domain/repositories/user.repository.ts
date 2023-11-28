import { UpdateUserDTO } from "../dtos/user/update-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {
  abstract getUsers(): Promise<UserEntity[]>;
  abstract getUser(id: string): Promise<UserEntity>;
  abstract updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<UserEntity>;
}
