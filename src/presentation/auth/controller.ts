import type { RequestHandler } from "express";
import { AuthRepository, SignUpUserDTO } from "../../domain";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  signUpUser: RequestHandler = (req, res) => {
    const [error, signUpUserDTO] = SignUpUserDTO.create(req.body);

    if (error || !signUpUserDTO) {
      res.status(400).json({ error });
      return;
    }

    this.authRepository
      .signUp(signUpUserDTO)
      .then((user) => res.json(user))
      .catch((error) => res.status(500).json(error));
  };

  signInUser: RequestHandler = (req, res) => {
    res.json("signInUser controller");
  };
}
