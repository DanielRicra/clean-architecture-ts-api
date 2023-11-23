import { Router } from "express";
import { UserController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class UserRouter {
  static get routes(): Router {
    const router = Router();

    const controller = new UserController();

    router.get("/", [AuthMiddleware.validateJwt], controller.getUsers);

    return router;
  }
}
