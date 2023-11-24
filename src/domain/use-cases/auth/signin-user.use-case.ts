import { JwtAdapter } from "../../../config";
import { SignInUserDTO } from "../../dtos/auth/signin-user.dto";
import { CustomError } from "../../errors/custom.error";
import type { SignToken, UserToken } from "../../interfaces-types";
import { AuthRepository } from "../../repositories/auth.repository";

interface SignInUserUseCase {
  execute(signInUSerDTO: SignInUserDTO): Promise<UserToken>;
}

export class SignInUser implements SignInUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(signInUserDTO: SignInUserDTO): Promise<UserToken> {
    const user = await this.authRepository.signIn(signInUserDTO);

    const token = await this.signToken({ id: user.id }, "3h");

    if (!token) throw CustomError.internalServerError("Error generating token");

    return {
      token,
      user: {
        email: user.email,
        id: user.id,
        name: user.name,
      },
    };
  }
}
