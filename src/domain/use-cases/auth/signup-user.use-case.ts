import { JwtAdapter } from "../../../config";
import { SignUpUserDTO } from "../../dtos/auth/signup-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface SignUpUserUseCase {
  execute(signUpUserDTO: SignUpUserDTO): Promise<UserToken>;
}

export class SignUpUser implements SignUpUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(signUpUserDTO: SignUpUserDTO): Promise<UserToken> {
    const user = await this.authRepository.signUp(signUpUserDTO);

    const token = await this.signToken({ id: user.id }, "3h");

    if (!token) {
      throw CustomError.internalServerError("Error generating token");
    }

    return {
      token: "token",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
