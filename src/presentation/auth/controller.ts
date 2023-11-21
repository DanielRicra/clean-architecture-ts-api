import type { RequestHandler } from "express";
import { SignUpUserDTO } from "../../domain";

export class AuthController {
  constructor() {}

  signUpUser: RequestHandler = (req, res) => {
    const [error, userDTO] = SignUpUserDTO.create(req.body);

    if (error) {
      res.status(400).json({ error });
      return;
    }

    res.status(201).json(userDTO);
  };

  signInUser: RequestHandler = (req, res) => {
    res.json("signInUser controller");
  };
}
