import { RequestHandler, Response } from "express";
import {
  CustomError,
  GetUser,
  GetUsers,
  UpdateUser,
  UserRepository,
} from "../../domain";
import { UpdateUserDTO } from "../../domain/dtos/user/update-user.dto";

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

  updateUser: RequestHandler = (req, res) => {
    const { id } = req.params;

    // TODO: check if it is admin too, in a middleware
    if (req.body.user.id !== id) {
      res.status(403).json({ error: "Forbidden operation" });
      return;
    }

    const [error, updateUserDTO] = UpdateUserDTO.create(req.body);

    if (error || !updateUserDTO) {
      res.status(400).json({ error });
      return;
    }

    new UpdateUser(this.userRepository)
      .execute(id, updateUserDTO)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
