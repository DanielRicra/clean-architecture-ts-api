import type { RequestHandler, Response } from "express";
import {
  AuthRepository,
  CustomError,
  SignUpUser,
  SignUpUserDTO,
} from "../../domain";
import { JwtAdapter } from "../../config";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  };

  signUpUser: RequestHandler = (req, res) => {
    const [error, signUpUserDTO] = SignUpUserDTO.create(req.body);

    if (error || !signUpUserDTO) {
      res.status(400).json({ error });
      return;
    }

    new SignUpUser(this.authRepository)
      .execute(signUpUserDTO)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  signInUser: RequestHandler = (req, res) => {
    res.json("signInUser controller");
  };
}
