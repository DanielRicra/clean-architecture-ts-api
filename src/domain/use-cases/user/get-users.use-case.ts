import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";

interface GetUsersUseCase {
  execute(): Promise<UserEntity[]>;
}

export class GetUsers implements GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  execute = async (): Promise<UserEntity[]> => {
    return await this.userRepository.getUsers();
  };
}
