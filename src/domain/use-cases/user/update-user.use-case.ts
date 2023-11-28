import { UpdateUserDTO } from "../../dtos/user/update-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";

interface UpdateUserUseCase {
  execute(id: string, updateUserDTO: UpdateUserDTO): Promise<UserEntity>;
}

export class UpdateUser implements UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(id: string, updateUserDTO: UpdateUserDTO): Promise<UserEntity> {
    return this.userRepository.updateUser(id, updateUserDTO);
  }
}
