import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";

interface GetUserUseCase {
  execute(id: string): Promise<UserEntity>
}

export class GetUser implements GetUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<UserEntity> {
    return await this.userRepository.getUser(id);
  }
}