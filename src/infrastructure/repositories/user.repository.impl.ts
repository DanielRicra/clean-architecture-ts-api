import { UserDatasource, UserEntity, UserRepository } from "../../domain";
import { UpdateUserDTO } from "../../domain/dtos/user/update-user.dto";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDatasource: UserDatasource) {}

  getUsers(): Promise<UserEntity[]> {
    return this.userDatasource.getUsers();
  }

  getUser(id: string): Promise<UserEntity> {
    return this.userDatasource.getUser(id);
  }

  updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<UserEntity> {
    return this.userDatasource.updateUser(id, updateUserDTO);
  }
}
