import { RequestHandler, Response } from "express";
import { CustomError, GetUser, GetUsers, UserRepository } from "../../domain";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  };

  getUsers: RequestHandler = (req, res) => {
    new GetUsers(this.userRepository)
      .execute()
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getUser: RequestHandler = (req, res) => {
    new GetUser(this.userRepository)
      .execute(req.params.id)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
