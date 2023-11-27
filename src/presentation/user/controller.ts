import { RequestHandler, Response } from "express";
import { CustomError, UserRepository } from "../../domain";
import { GetUsers } from "../../domain/use-cases/user/get-users.use-case";

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
}
