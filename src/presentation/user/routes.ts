import { Router } from "express";
import { UserController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure";

export class UserRouter {
  static get routes(): Router {
    const router = Router();

    const datasource = new UserDatasourceImpl();
    const repository = new UserRepositoryImpl(datasource);

    const controller = new UserController(repository);

    router.get("/", [AuthMiddleware.validateJwt], controller.getUsers);

    return router;
  }
}
