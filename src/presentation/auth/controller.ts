import { Request, Response } from "express";

export class AuthController {
  constructor() {}

  signUpUser = (req: Request, res: Response) => {
    res.json("signUpUser controller");
  };

  signInUser = (req: Request, res: Response) => {
    res.json("signInUser controller");
  };
}
